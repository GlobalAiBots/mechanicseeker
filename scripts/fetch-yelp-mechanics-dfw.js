// Fetch auto repair shops from Yelp for DFW metro + other undercounted major metros,
// merge with existing mechanics.json (enriching matches, adding new Yelp-only shops).
//
// Run: node --env-file=.env.local scripts/fetch-yelp-mechanics-dfw.js

import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.YELP_API_KEY;
if (!API_KEY) { console.error("Missing YELP_API_KEY"); process.exit(1); }

const DATA_PATH = path.resolve("src/data/mechanics.json");
const CATEGORY = "autorepair";
const TERM = "auto repair";
const SLEEP_MS = 250;
const LIMIT_PER_PAGE = 50;
const PAGES_PER_CITY = 2;
const NAME_THRESHOLD = 0.75;
const MAX_MILES_MATCH = 2;

const CITIES = [
  // DFW metro (user-specified)
  ["Dallas", "TX"], ["Fort Worth", "TX"], ["Arlington", "TX"], ["Plano", "TX"],
  ["Irving", "TX"], ["Garland", "TX"], ["Grand Prairie", "TX"], ["McKinney", "TX"],
  ["Frisco", "TX"], ["Mesquite", "TX"], ["Carrollton", "TX"], ["Denton", "TX"],
  ["Richardson", "TX"], ["Lewisville", "TX"], ["Allen", "TX"], ["Flower Mound", "TX"],
  ["Mansfield", "TX"], ["North Richland Hills", "TX"], ["Euless", "TX"], ["Bedford", "TX"],
  ["Grapevine", "TX"], ["Keller", "TX"], ["Hurst", "TX"], ["Burleson", "TX"],
  ["Cedar Hill", "TX"], ["Wylie", "TX"], ["Rowlett", "TX"], ["DeSoto", "TX"],
  ["Duncanville", "TX"], ["Lancaster", "TX"], ["Waxahachie", "TX"], ["Weatherford", "TX"],
  ["Cleburne", "TX"], ["Midlothian", "TX"],
  // San Antonio metro
  ["San Antonio", "TX"],
  // Austin metro
  ["Austin", "TX"], ["Round Rock", "TX"], ["Cedar Park", "TX"],
  // San Diego metro
  ["San Diego", "CA"], ["Chula Vista", "CA"], ["Oceanside", "CA"], ["El Cajon", "CA"],
  // Seattle metro
  ["Seattle", "WA"], ["Bellevue", "WA"], ["Tacoma", "WA"], ["Kent", "WA"], ["Renton", "WA"],
  // Denver metro
  ["Denver", "CO"], ["Aurora", "CO"], ["Lakewood", "CO"], ["Thornton", "CO"],
  // Minneapolis metro
  ["Minneapolis", "MN"], ["St. Paul", "MN"], ["Bloomington", "MN"], ["Edina", "MN"],
  // Detroit metro
  ["Detroit", "MI"], ["Warren", "MI"], ["Dearborn", "MI"], ["Sterling Heights", "MI"],
  // Tampa metro
  ["Tampa", "FL"], ["St. Petersburg", "FL"], ["Clearwater", "FL"],
  // Orlando metro
  ["Orlando", "FL"], ["Kissimmee", "FL"], ["Winter Park", "FL"],
  // Charlotte metro
  ["Charlotte", "NC"], ["Gastonia", "NC"], ["Concord", "NC"],
];

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "&", "of", "for", "at",
  "inc", "llc", "co", "ltd", "corp", "company",
  "auto", "autos", "car", "cars", "vehicle", "automotive",
  "repair", "repairs", "shop", "garage", "service", "services",
  "tire", "tires", "oil", "lube", "center", "centers",
]);

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .join(" ")
    .trim();
}

function bigrams(s) {
  const set = new Set();
  const t = s.replace(/\s/g, "");
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  return set;
}

function dice(a, b) {
  const an = normalize(a), bn = normalize(b);
  if (!an || !bn) return 0;
  if (an === bn) return 1;
  const aB = bigrams(an), bB = bigrams(bn);
  if (!aB.size || !bB.size) return 0;
  let inter = 0;
  for (const x of aB) if (bB.has(x)) inter++;
  return (2 * inter) / (aB.size + bB.size);
}

function milesBetween(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Infinity;
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function slugify(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function yelpSearch(city, state, offset = 0) {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("term", TERM);
  url.searchParams.set("location", `${city}, ${state}`);
  url.searchParams.set("categories", CATEGORY);
  url.searchParams.set("limit", String(LIMIT_PER_PAGE));
  if (offset) url.searchParams.set("offset", String(offset));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (res.status === 400) return { businesses: [] };
  if (!res.ok) { const t = await res.text(); throw new Error(`Yelp ${res.status}: ${t.slice(0, 200)}`); }
  return res.json();
}

function bizToRecord(b, fallbackCity, fallbackState) {
  const city = b.location?.city || fallbackCity;
  const state = b.location?.state || fallbackState;
  return {
    id: `shop-yelp-${b.id}`,
    name: b.name,
    slug: `${state.toLowerCase()}-${slugify(city)}-${slugify(b.name)}`,
    lat: b.coordinates?.latitude,
    lng: b.coordinates?.longitude,
    state,
    city,
    address: (b.location?.address1 || "").trim(),
    zip: b.location?.zip_code || "",
    phone: b.display_phone || b.phone || "",
    email: "",
    website: (b.url || "").split("?")[0],
    hours: "",
    brand: "",
    services: ["car_repair"],
    shopType: "general_repair",
    rating: b.rating ?? 0,
    reviewCount: b.review_count ?? 0,
    source: "yelp",
    yelpMatched: true,
  };
}

async function main() {
  console.log(`Loading ${DATA_PATH}...`);
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  console.log(`Starting total: ${data.length}`);

  // Build a per-city index for fast fuzzy matching against existing records.
  const byCityState = new Map();
  for (let i = 0; i < data.length; i++) {
    const m = data[i];
    if (!m.city || !m.state) continue;
    const k = `${m.city.toLowerCase()}|${m.state}`;
    if (!byCityState.has(k)) byCityState.set(k, []);
    byCityState.get(k).push({ rec: m, idx: i });
  }

  let apiCalls = 0, apiErrors = 0, added = 0, enriched = 0, skipped = 0;
  const startedAt = Date.now();
  const seenYelpIds = new Set();

  cityLoop:
  for (let i = 0; i < CITIES.length; i++) {
    const [city, state] = CITIES[i];
    const location = `${city}, ${state}`;
    let cityFetched = 0, cityAdded = 0, cityEnriched = 0;

    for (let page = 0; page < PAGES_PER_CITY; page++) {
      try {
        const json = await yelpSearch(city, state, page * LIMIT_PER_PAGE);
        apiCalls++;
        const biz = json.businesses || [];
        cityFetched += biz.length;

        for (const b of biz) {
          if (seenYelpIds.has(b.id)) { skipped++; continue; }
          seenYelpIds.add(b.id);

          // Try to match against existing record in same or Yelp-reported city.
          const yelpCity = (b.location?.city || city).toLowerCase();
          const yelpState = b.location?.state || state;
          const candidates = byCityState.get(`${yelpCity}|${yelpState}`) || [];
          let bestIdx = -1, bestScore = 0;
          for (const { rec, idx } of candidates) {
            const score = dice(rec.name, b.name);
            const miles = milesBetween(rec.lat, rec.lng, b.coordinates?.latitude, b.coordinates?.longitude);
            if (score > bestScore && miles <= MAX_MILES_MATCH) { bestScore = score; bestIdx = idx; }
          }

          if (bestIdx >= 0 && bestScore >= NAME_THRESHOLD) {
            // Merge Yelp data into existing record.
            const rec = data[bestIdx];
            rec.rating = b.rating ?? rec.rating ?? 0;
            rec.reviewCount = b.review_count ?? rec.reviewCount ?? 0;
            if (!rec.phone && b.display_phone) rec.phone = b.display_phone;
            if (!rec.website && b.url) rec.website = b.url.split("?")[0];
            rec.yelpMatched = true;
            rec.yelpMatchScore = Number(bestScore.toFixed(2));
            enriched++;
            cityEnriched++;
          } else {
            // New Yelp-only record.
            const newRec = bizToRecord(b, city, state);
            if (!newRec.lat || !newRec.lng) continue;
            data.push(newRec);
            const k = `${newRec.city.toLowerCase()}|${newRec.state}`;
            if (!byCityState.has(k)) byCityState.set(k, []);
            byCityState.get(k).push({ rec: newRec, idx: data.length - 1 });
            added++;
            cityAdded++;
          }
        }
        if (biz.length < LIMIT_PER_PAGE) break; // exhausted
      } catch (e) {
        if (e.message === "RATE_LIMIT") {
          console.log(`\nRate limit after ${apiCalls} calls. Saving progress and stopping.`);
          break cityLoop;
        }
        apiErrors++;
        console.log(`  API error for ${location}: ${e.message}`);
      }
      await sleep(SLEEP_MS);
    }

    console.log(`  [${String(i + 1).padStart(2)}/${CITIES.length}] ${location.padEnd(28)} yelp=${String(cityFetched).padStart(3)} added=${String(cityAdded).padStart(3)} enriched=${String(cityEnriched).padStart(3)}`);

    if ((i + 1) % 10 === 0) fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
  console.log(`\n=== DFW + METRO EXPANSION DONE ===`);
  console.log(`API calls: ${apiCalls}`);
  console.log(`API errors: ${apiErrors}`);
  console.log(`Yelp dupes skipped (same biz multiple cities): ${skipped}`);
  console.log(`New shops added: ${added}`);
  console.log(`Existing shops enriched with Yelp data: ${enriched}`);
  console.log(`Final mechanics.json total: ${data.length}`);
  console.log(`Elapsed: ${elapsed}s`);
}

main().catch((e) => { console.error(e); process.exit(1); });
