// fix-unknown-cities.js
// Repairs shops where city is missing/unknown by reverse-geocoding lat/lng via Nominatim.
//
// Guards:
//   - State mismatch: if the reverse-geocode result's state != shop.state, the shop is
//     pushed to shops-needs-review.json and NOT modified. Prevents the "lat/lng in
//     Toronto tagged state=NY" class of bug from writing Toronto as a valid NY city.
//   - Resumable: progress checkpoint is written every 500 shops.
//   - Address-parse fast path: runs first (free, no API) for shops with address strings.
//
// Inputs:
//   src/data/mechanics.json
//
// Outputs (all written atomically at each checkpoint):
//   src/data/mechanics.json              (city fixed, id/slug regenerated for fixed rows)
//   src/data/slug-redirects.json         ({ oldId: newId, ... }) for redirect middleware
//   src/data/shops-needs-review.json     (state-mismatch + unfixable shops)
//   scripts/output/fix-cities-progress.json  (resume checkpoint)
//
// Usage:
//   node scripts/fix-unknown-cities.js          # fresh run or auto-resume
//   node scripts/fix-unknown-cities.js --reset  # restart from scratch

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MECHANICS_PATH = path.join(ROOT, "src/data/mechanics.json");
const REDIRECTS_PATH = path.join(ROOT, "src/data/slug-redirects.json");
const REVIEW_PATH = path.join(ROOT, "src/data/shops-needs-review.json");
const PROGRESS_PATH = path.join(ROOT, "scripts/output/fix-cities-progress.json");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";
const RATE_MS = 1100; // Nominatim ToS: max 1 req/sec. 1.1s for safety.
const CHECKPOINT_EVERY = 500;
const USER_AGENT = "MechanicSeeker/1.0 (admin@globalaibots.com)";

const STATE_ABBREVS = {
  "alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA","colorado":"CO",
  "connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID",
  "illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA",
  "maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN",
  "mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV",
  "new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY",
  "north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR",
  "pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD",
  "tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA",
  "west virginia":"WV","wisconsin":"WI","wyoming":"WY","district of columbia":"DC",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function readJsonOr(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJsonAtomic(filePath, data) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = filePath + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, filePath);
}

// Parse "123 Main St, Boise, ID 83702" → { city: "Boise", state: "ID" }
function parseCityFromAddress(address) {
  if (!address) return null;
  const m1 = address.match(/,\s*([^,]+),\s*([A-Z]{2})\s*\d{5}/);
  if (m1) return { city: m1[1].trim(), state: m1[2] };
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    const sm = parts[parts.length - 1].match(/^([A-Z]{2})/);
    if (sm) return { city: parts[parts.length - 2], state: sm[1] };
  }
  return null;
}

async function reverseGeocode(lat, lng) {
  const url = `${NOMINATIM_URL}?lat=${lat}&lon=${lng}&format=json&zoom=10&addressdetails=1`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (res.status === 429) {
    console.log("    429 rate limit — sleeping 120s");
    await sleep(120_000);
    return reverseGeocode(lat, lng);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.address) return null;
  const a = data.address;
  const state = STATE_ABBREVS[(a.state || "").toLowerCase()] || "";
  const city = a.city || a.town || a.village || a.hamlet || a.municipality || a.county || "";
  if (!state || !city) return null;
  return { city, state };
}

// Build a Set of every id currently in use so id regeneration can detect collisions.
function buildIdIndex(shops) {
  const index = new Set();
  for (const s of shops) if (s.id) index.add(s.id);
  return index;
}

function mintUniqueId(state, city, name, takenIds) {
  const base = `shop-${state.toLowerCase()}-${slugify(city)}-${slugify(name)}`;
  if (!takenIds.has(base)) return base;
  for (let n = 2; n < 100; n++) {
    const candidate = `${base}-${n}`;
    if (!takenIds.has(candidate)) return candidate;
  }
  // Last-resort suffix with lat/lng hash to guarantee uniqueness
  return `${base}-x`;
}

async function main() {
  const reset = process.argv.includes("--reset");

  const shops = JSON.parse(fs.readFileSync(MECHANICS_PATH, "utf8"));
  const redirects = reset ? {} : readJsonOr(REDIRECTS_PATH, {});
  const review = reset ? [] : readJsonOr(REVIEW_PATH, []);
  const progress = reset
    ? { lastIndex: -1, fixedByParse: 0, fixedByGeo: 0, flaggedMismatch: 0, flaggedNoData: 0 }
    : readJsonOr(PROGRESS_PATH, { lastIndex: -1, fixedByParse: 0, fixedByGeo: 0, flaggedMismatch: 0, flaggedNoData: 0 });

  // Build list of shops that still need fixing.
  const needsFix = [];
  for (let i = 0; i < shops.length; i++) {
    const s = shops[i];
    const missingCity = !s.city || s.city === "unknown" || s.city === "" || s.city === null;
    if (missingCity && s.lat && s.lng) needsFix.push(i);
  }

  // ID index must reflect live state of shops array (we mutate as we go).
  const takenIds = buildIdIndex(shops);

  console.log(`Total shops: ${shops.length}`);
  console.log(`Still need fixing: ${needsFix.length}`);
  console.log(`Resuming at checkpoint index: ${progress.lastIndex + 1}`);
  console.log(`Nominatim ETA for remainder: ~${Math.round((needsFix.length - progress.lastIndex - 1) * 1.1 / 60)} min`);
  console.log("");

  const save = () => {
    writeJsonAtomic(MECHANICS_PATH, shops);
    writeJsonAtomic(REDIRECTS_PATH, redirects);
    writeJsonAtomic(REVIEW_PATH, review);
    writeJsonAtomic(PROGRESS_PATH, progress);
  };

  // Ctrl-C safety
  let interrupted = false;
  process.on("SIGINT", () => {
    if (interrupted) process.exit(1);
    interrupted = true;
    console.log("\nSIGINT — saving checkpoint and exiting after current request...");
  });

  for (let k = progress.lastIndex + 1; k < needsFix.length; k++) {
    const idx = needsFix[k];
    const s = shops[idx];
    const oldId = s.id;
    let result = null;
    let source = null;

    // Fast path: address parsing
    if (s.address) {
      const parsed = parseCityFromAddress(s.address);
      if (parsed) {
        result = parsed;
        source = "parse";
      }
    }

    // Slow path: Nominatim reverse geocode
    if (!result) {
      try {
        result = await reverseGeocode(s.lat, s.lng);
        source = "geo";
      } catch (e) {
        console.log(`    [${k}] ${oldId} error: ${e.message}`);
      }
      await sleep(RATE_MS);
    }

    if (!result) {
      review.push({
        id: oldId,
        name: s.name,
        state: s.state,
        lat: s.lat,
        lng: s.lng,
        address: s.address || "",
        reason: "no-data",
      });
      progress.flaggedNoData++;
    } else if (s.state && result.state !== s.state) {
      // State mismatch guard: do not write. Flag for manual review.
      review.push({
        id: oldId,
        name: s.name,
        taggedState: s.state,
        geocodedState: result.state,
        geocodedCity: result.city,
        lat: s.lat,
        lng: s.lng,
        address: s.address || "",
        source,
        reason: "state-mismatch",
      });
      progress.flaggedMismatch++;
    } else {
      const stateCode = s.state || result.state;
      s.city = result.city;
      s.state = stateCode;

      // Regenerate id + slug; reserve the new id in takenIds so later shops collision-handle.
      if (takenIds.has(oldId)) takenIds.delete(oldId);
      const newId = mintUniqueId(stateCode, result.city, s.name, takenIds);
      takenIds.add(newId);
      if (newId !== oldId) {
        redirects[oldId] = newId;
        s.id = newId;
        s.slug = newId.startsWith("shop-") ? newId.slice(5) : newId;
      }

      if (source === "parse") progress.fixedByParse++;
      else progress.fixedByGeo++;
    }

    progress.lastIndex = k;

    if ((k + 1) % CHECKPOINT_EVERY === 0 || interrupted) {
      save();
      console.log(
        `  ${k + 1}/${needsFix.length} — ` +
          `parsed: ${progress.fixedByParse}, geo: ${progress.fixedByGeo}, ` +
          `mismatch: ${progress.flaggedMismatch}, no-data: ${progress.flaggedNoData}`,
      );
      if (interrupted) process.exit(0);
    }
  }

  save();
  console.log("\nDONE");
  console.log(`  Fixed via address parse:  ${progress.fixedByParse}`);
  console.log(`  Fixed via reverse geocode: ${progress.fixedByGeo}`);
  console.log(`  Flagged (state mismatch):  ${progress.flaggedMismatch}`);
  console.log(`  Flagged (no data):         ${progress.flaggedNoData}`);
  console.log(`  Redirects written:         ${Object.keys(redirects).length}`);
  console.log(`  Review entries:            ${review.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
