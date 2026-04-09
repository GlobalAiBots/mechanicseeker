const fs = require("fs");
const path = require("path");

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").substring(0, 60);
}

const compiled = JSON.parse(
  fs.readFileSync(path.join(__dirname, "output", "mechanics-compiled.json"), "utf8")
);

// Filter to shops with state assigned
const withState = compiled.filter(m => m.state && m.state.length === 2 && m.lat && m.lng && m.name);

// Generate slugs with collision handling
const slugCounts = {};
const siteData = withState.map((m, i) => {
  let base = `${slugify(m.state)}-${slugify(m.city || "unknown")}-${slugify(m.name)}`;
  if (!base) base = `shop-${i}`;
  slugCounts[base] = (slugCounts[base] || 0) + 1;
  const slug = slugCounts[base] > 1 ? `${base}-${slugCounts[base]}` : base;

  return {
    id: `shop-${slug}`,
    name: m.name,
    slug,
    lat: m.lat,
    lng: m.lng,
    state: m.state,
    city: m.city || "",
    address: m.address || "",
    zip: m.zip || "",
    phone: m.phone || "",
    email: m.email || "",
    website: m.website || "",
    hours: m.hours || "",
    brand: m.brand || "",
    services: m.services || [],
    shopType: m.shopType || "general_repair",
  };
});

const output = path.join(__dirname, "..", "src", "data", "mechanics.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(siteData));

const stateCounts = {};
siteData.forEach(s => { stateCounts[s.state] = (stateCounts[s.state] || 0) + 1; });

console.log(`Total shops for site: ${siteData.length}`);
console.log(`States: ${Object.keys(stateCounts).length}`);
console.log("\nTop 15 states:");
Object.entries(stateCounts).sort((a,b) => b[1]-a[1]).slice(0,15).forEach(([st,c]) => console.log(`  ${st}: ${c}`));
console.log(`\nSaved to ${output}`);
