// Enrich mechanics.json with Yelp ratings via bulk city search.
// Strategy: fetch top 50 Yelp auto-repair results per top-N city (not per shop),
// then fuzzy-match against our mechanics in that city. Way fewer API calls than
// searching per shop (50 cities × 2 pages = ~100 calls vs 48K).
//
// Run: node --env-file=.env.local scripts/enrich-mechanics-yelp.js
// Optional: TOP_CITIES=25 PAGES_PER_CITY=1 node --env-file=.env.local scripts/enrich-mechanics-yelp.js

import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.YELP_API_KEY;
if (!API_KEY) { console.error("Missing YELP_API_KEY"); process.exit(1); }

const DATA_PATH = path.resolve("src/data/mechanics.json");
const CATEGORY = "autorepair";
const TERM = "auto repair";
const SLEEP_MS = 250;
const LIMIT_PER_PAGE = 50;
const NAME_THRESHOLD = 0.78;
const MAX_MILES = 15;
const TOP_CITIES = parseInt(process.env.TOP_CITIES || "50", 10);
const PAGES_PER_CITY = parseInt(process.env.PAGES_PER_CITY || "2", 10);

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "&", "of", "for", "at",
  "inc", "llc", "co", "ltd", "corp", "corporation", "company",
  "auto", "autos", "car", "cars", "vehicle", "vehicles", "automotive",
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
  const an = normalize(a);
  const bn = normalize(b);
  if (!an || !bn) return 0;
  if (an === bn) return 1;
  const aB = bigrams(an);
  const bB = bigrams(bn);
  if (aB.size === 0 || bB.size === 0) return 0;
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function yelpSearch({ term, location, category, limit, offset }) {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("term", term);
  url.searchParams.set("location", location);
  url.searchParams.set("categories", category);
  url.searchParams.set("limit", String(limit));
  if (offset) url.searchParams.set("offset", String(offset));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (res.status === 400) return { businesses: [] };
  if (!res.ok) { const t = await res.text(); throw new Error(`Yelp ${res.status}: ${t.slice(0, 200)}`); }
  return res.json();
}

async function main() {
  console.log(`Loading ${DATA_PATH}...`);
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  console.log(`Total mechanics: ${data.length}`);

  const byCity = new Map();
  for (const m of data) {
    if (!m.city || !m.state) continue;
    const key = `${m.city}|${m.state}`;
    if (!byCity.has(key)) byCity.set(key, []);
    byCity.get(key).push(m);
  }
  const cities = [...byCity.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, TOP_CITIES);
  const totalInTopCities = cities.reduce((s, [, arr]) => s + arr.length, 0);
  console.log(`Top ${TOP_CITIES} cities cover ${totalInTopCities} shops`);
  console.log(`Pages per city: ${PAGES_PER_CITY} (up to ${PAGES_PER_CITY * LIMIT_PER_PAGE} Yelp results per city)`);
  console.log(`Expected API calls: ~${cities.length * PAGES_PER_CITY}`);
  console.log("");

  let totalEnriched = 0, totalSkipped = 0, totalApiCalls = 0, apiErrors = 0;
  const startedAt = Date.now();

  cityLoop:
  for (let cIdx = 0; cIdx < cities.length; cIdx++) {
    const [cityKey, shops] = cities[cIdx];
    const [city, state] = cityKey.split("|");
    const location = `${city}, ${state}`;

    // Fetch Yelp results (up to PAGES_PER_CITY pages of LIMIT_PER_PAGE each).
    const yelpBiz = [];
    for (let page = 0; page < PAGES_PER_CITY; page++) {
      try {
        const json = await yelpSearch({
          term: TERM,
          location,
          category: CATEGORY,
          limit: LIMIT_PER_PAGE,
          offset: page * LIMIT_PER_PAGE,
        });
        totalApiCalls++;
        const got = json.businesses || [];
        yelpBiz.push(...got);
        if (got.length < LIMIT_PER_PAGE) break; // no more pages
      } catch (e) {
        if (e.message === "RATE_LIMIT") {
          console.log(`\nYelp rate limit after ${totalApiCalls} calls. Saving progress and stopping.`);
          break cityLoop;
        }
        apiErrors++;
        console.log(`  API error for ${location} page ${page}: ${e.message}`);
      }
      await sleep(SLEEP_MS);
    }

    // Fuzzy-match Yelp businesses against our shops in this city.
    let cityEnriched = 0;
    for (const biz of yelpBiz) {
      let best = null, bestScore = 0;
      for (const shop of shops) {
        if (shop.rating != null && shop.rating > 0) continue; // already enriched
        const score = dice(shop.name, biz.name);
        const miles = milesBetween(shop.lat, shop.lng, biz.coordinates?.latitude, biz.coordinates?.longitude);
        if (score > bestScore && miles <= MAX_MILES) {
          best = shop; bestScore = score;
        }
      }
      if (best && bestScore >= NAME_THRESHOLD) {
        best.rating = biz.rating ?? 0;
        best.reviewCount = biz.review_count ?? 0;
        if (!best.phone && biz.display_phone) best.phone = biz.display_phone;
        if (!best.phone && biz.phone) best.phone = biz.phone;
        if (!best.website && biz.url) best.website = biz.url.split("?")[0];
        best.yelpMatched = true;
        best.yelpMatchScore = Number(bestScore.toFixed(2));
        cityEnriched++;
      }
    }
    totalEnriched += cityEnriched;
    totalSkipped += shops.length - cityEnriched;

    console.log(`  ${location.padEnd(30)} shops=${String(shops.length).padStart(4)}  yelp=${String(yelpBiz.length).padStart(3)}  enriched=${String(cityEnriched).padStart(3)}`);

    // Incremental save every 10 cities.
    if ((cIdx + 1) % 10 === 0) {
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
  console.log(`\n=== MECHANICS ENRICHMENT DONE ===`);
  console.log(`API calls: ${totalApiCalls}`);
  console.log(`API errors: ${apiErrors}`);
  console.log(`Shops enriched: ${totalEnriched}`);
  console.log(`Shops unmatched in top cities: ${totalSkipped}`);
  console.log(`Match rate: ${((totalEnriched / totalInTopCities) * 100).toFixed(1)}%`);
  console.log(`Elapsed: ${elapsed}s`);
}

main().catch((e) => { console.error(e); process.exit(1); });
