const fs = require("fs");
const path = require("path");

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

const STATE_NAMES = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const STATE_SLUGS = {};
Object.entries(STATE_NAMES).forEach(([c, n]) => { STATE_SLUGS[c] = slugify(n); });

const shops = require(path.join(__dirname, "..", "src", "data", "mechanics-index.json"));

function groupByState(list) {
  const byState = {};
  list.forEach(s => {
    const st = s.state || "Unknown";
    if (!byState[st]) byState[st] = { code: st, name: STATE_NAMES[st] || st, slug: STATE_SLUGS[st] || slugify(st), count: 0 };
    byState[st].count++;
  });
  return Object.values(byState).sort((a, b) => b.count - a.count);
}

// Categories by shopType
const catDefs = [
  { slug: "general-repair", title: "General Auto Repair Shops", desc: "Full-service auto repair shops that handle everything from oil changes to engine rebuilds.", type: "general_repair" },
  { slug: "tire-shops", title: "Tire Shops", desc: "Shops specializing in tires, wheels, alignment, and balancing services.", type: "tire_shop" },
  { slug: "body-shops", title: "Auto Body & Collision Shops", desc: "Body shops specializing in collision repair, paint, dent removal, and frame straightening.", type: "body_shop" },
  { slug: "quick-lube", title: "Quick Lube & Oil Change Shops", desc: "Fast oil change and lube shops that get you in and out in 30 minutes or less.", type: "quick_lube" },
  { slug: "transmission", title: "Transmission Repair Shops", desc: "Shops specializing in transmission repair, rebuilds, and replacement.", type: "transmission_shop" },
];

const categories = catDefs.map(def => {
  const matching = shops.filter(s => s.shopType === def.type);
  return { slug: def.slug, title: def.title, description: def.desc, totalCount: matching.length, states: groupByState(matching) };
}).filter(c => c.totalCount >= 10);

console.log("Categories:");
categories.forEach(c => console.log(`  ${c.slug}: ${c.totalCount} shops`));

// Brands with 100+ locations
const brandCounts = {};
shops.forEach(s => { if (s.brand) brandCounts[s.brand] = (brandCounts[s.brand] || 0) + 1; });

const brands = Object.entries(brandCounts)
  .filter(([, count]) => count >= 100)
  .map(([name, count]) => {
    const matching = shops.filter(s => s.brand === name);
    return { slug: slugify(name), title: `${name} Locations`, brandName: name, description: `Find all ${count} ${name} locations across America with addresses, phone numbers, and hours.`, totalCount: count, states: groupByState(matching) };
  })
  .sort((a, b) => b.totalCount - a.totalCount);

console.log("\nBrands:");
brands.forEach(b => console.log(`  ${b.slug}: ${b.totalCount} locations`));

// Save
fs.writeFileSync(path.join(__dirname, "..", "src", "data", "categories.json"), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(__dirname, "..", "src", "data", "brands.json"), JSON.stringify(brands, null, 2));

// Sitemaps
const catLines = categories.map(c => `  <url><loc>https://mechanicseeker.com/category/${c.slug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
const brandLines = brands.map(b => `  <url><loc>https://mechanicseeker.com/brand/${b.slug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
const allLines = [...catLines, ...brandLines];
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-categories.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allLines.join("\n")}\n</urlset>`);

console.log(`\nTotal: ${categories.length} categories + ${brands.length} brands = ${categories.length + brands.length} pages`);
