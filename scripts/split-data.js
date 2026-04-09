const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "..", "src", "data", "mechanics.json");
const STATES_DIR = path.join(__dirname, "..", "src", "data", "states");
const INDEX_FILE = path.join(__dirname, "..", "src", "data", "mechanics-index.json");

fs.mkdirSync(STATES_DIR, { recursive: true });

const shops = JSON.parse(fs.readFileSync(INPUT, "utf8"));

// Group by state
const byState = {};
shops.forEach((s) => {
  const st = s.state || "unknown";
  if (!byState[st]) byState[st] = [];
  byState[st].push(s);
});

// Write per-state files
let totalWritten = 0;
for (const [state, stateShops] of Object.entries(byState)) {
  const file = path.join(STATES_DIR, `${state.toLowerCase()}.json`);
  fs.writeFileSync(file, JSON.stringify(stateShops));
  console.log(`  ${state}: ${stateShops.length} shops → ${file}`);
  totalWritten += stateShops.length;
}

// Write index (lightweight — just routing info)
const index = shops.map((s) => ({
  id: s.id,
  slug: s.slug,
  name: s.name,
  state: s.state,
  city: s.city,
  shopType: s.shopType,
  brand: s.brand || "",
  lat: s.lat,
  lng: s.lng,
}));
fs.writeFileSync(INDEX_FILE, JSON.stringify(index));

const indexSize = (fs.statSync(INDEX_FILE).size / 1024 / 1024).toFixed(1);
console.log(`\nIndex: ${index.length} entries (${indexSize}MB)`);
console.log(`States: ${Object.keys(byState).length} files`);
console.log(`Total: ${totalWritten} shops`);
