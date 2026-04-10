const fs = require("fs");
const path = require("path");

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const shops = require(path.join(__dirname, "..", "src", "data", "mechanics-index.json"));
console.log(`Loaded ${shops.length} shops`);
shops.sort((a, b) => a.lat - b.lat);

const nearby = {};
const LAT_WINDOW = 0.35; // ~24 miles — tighter window since shops are dense
const MAX_DIST = 25; // 25 miles for mechanics (denser than marinas)
let comparisons = 0;

for (let i = 0; i < shops.length; i++) {
  const s = shops[i];
  const candidates = [];
  for (let j = i - 1; j >= 0 && shops[j].lat >= s.lat - LAT_WINDOW; j--) {
    const dist = haversine(s.lat, s.lng, shops[j].lat, shops[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= MAX_DIST) {
      candidates.push({ id: shops[j].id, name: shops[j].name, distance: Math.round(dist * 10) / 10, city: shops[j].city, state: shops[j].state });
      if (candidates.length >= 20) break; // Early exit — enough candidates
    }
  }
  for (let j = i + 1; j < shops.length && shops[j].lat <= s.lat + LAT_WINDOW; j++) {
    const dist = haversine(s.lat, s.lng, shops[j].lat, shops[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= MAX_DIST) {
      candidates.push({ id: shops[j].id, name: shops[j].name, distance: Math.round(dist * 10) / 10, city: shops[j].city, state: shops[j].state });
      if (candidates.length >= 20) break;
    }
  }
  candidates.sort((a, b) => a.distance - b.distance);
  if (candidates.length > 0) nearby[s.id] = candidates.slice(0, 5);
  if ((i + 1) % 5000 === 0) console.log(`  ${i + 1}/${shops.length} (${comparisons.toLocaleString()} comparisons)`);
}

const outputFile = path.join(__dirname, "..", "src", "data", "nearby.json");
fs.writeFileSync(outputFile, JSON.stringify(nearby));
console.log(`\nDone: ${comparisons.toLocaleString()} comparisons`);
console.log(`Shops with nearby: ${Object.keys(nearby).length}/${shops.length}`);
console.log(`File: ${(fs.statSync(outputFile).size / 1024 / 1024).toFixed(1)}MB`);
