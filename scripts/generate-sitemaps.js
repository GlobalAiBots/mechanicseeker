const fs = require("fs");
const path = require("path");

const BASE = "https://mechanicseeker.com";
const TODAY = new Date().toISOString().split("T")[0];
const PUB = path.join(__dirname, "..", "public");

const stateMap = {
  AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",
  DC:"district-of-columbia",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",
  IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",
  MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",
  NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",
  OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",
  TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",
  WI:"wisconsin",WY:"wyoming"
};

function urlEntry(loc, priority, freq) {
  return `  <url><loc>${loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${freq || "monthly"}</changefreq><priority>${priority}</priority></url>`;
}

// --- MAIN SITEMAP (homepage, static pages, states, blog, brands) ---
const mainUrls = [];
mainUrls.push(urlEntry(`${BASE}/`, "1.0", "weekly"));
mainUrls.push(urlEntry(`${BASE}/shops`, "0.8", "weekly"));
mainUrls.push(urlEntry(`${BASE}/map`, "0.7", "weekly"));
mainUrls.push(urlEntry(`${BASE}/blog`, "0.7", "weekly"));
mainUrls.push(urlEntry(`${BASE}/compare`, "0.7", "weekly"));
mainUrls.push(urlEntry(`${BASE}/near-me`, "0.7", "weekly"));
mainUrls.push(urlEntry(`${BASE}/for-businesses`, "0.6", "monthly"));
mainUrls.push(urlEntry(`${BASE}/claim`, "0.6", "monthly"));
mainUrls.push(urlEntry(`${BASE}/submit`, "0.5", "monthly"));
mainUrls.push(urlEntry(`${BASE}/about`, "0.5", "monthly"));
mainUrls.push(urlEntry(`${BASE}/privacy`, "0.3", "monthly"));
mainUrls.push(urlEntry(`${BASE}/terms`, "0.3", "monthly"));

// State pages
const index = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "mechanics-index.json"), "utf8"));
const states = [...new Set(index.map(s => s.state))].sort();
for (const st of states) {
  const slug = stateMap[st];
  if (slug) mainUrls.push(urlEntry(`${BASE}/${slug}`, "0.8", "weekly"));
}

// Blog posts
const blogDirs = fs.readdirSync(path.join(__dirname, "..", "src", "app", "blog")).filter(d => {
  return fs.existsSync(path.join(__dirname, "..", "src", "app", "blog", d, "page.tsx"));
});
for (const slug of blogDirs) {
  mainUrls.push(urlEntry(`${BASE}/blog/${slug}`, "0.6", "monthly"));
}

// Brand pages
const brands = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "brands.json"), "utf8"));
for (const b of brands) {
  mainUrls.push(urlEntry(`${BASE}/brand/${b.slug}`, "0.6", "monthly"));
}

// Comparison pages — extract slugs from src/data/comparisons.ts
try {
  const compareTxt = fs.readFileSync(path.join(__dirname, "..", "src", "data", "comparisons.ts"), "utf8");
  const compareBlock = compareTxt.match(/comparisons[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (compareBlock) {
    const slugs = [...new Set((compareBlock[1].match(/slug:\s*"([^"]+)"/g) || []).map(s => s.match(/"([^"]+)"/)[1]))];
    for (const slug of slugs) {
      mainUrls.push(urlEntry(`${BASE}/compare/${slug}`, "0.8", "monthly"));
    }
  }
} catch { /* file may not exist yet */ }

fs.writeFileSync(path.join(PUB, "sitemap-main.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${mainUrls.join("\n")}\n</urlset>\n`);
console.log(`sitemap-main.xml: ${mainUrls.length} URLs`);

// --- SHOP LISTING SITEMAPS (split into chunks of 10,000) ---
const CHUNK = 10000;
const shopUrls = index.map(s => urlEntry(`${BASE}/shops/${s.id}`, "0.5", "monthly"));
const numChunks = Math.ceil(shopUrls.length / CHUNK);
const shopSitemapFiles = [];

for (let i = 0; i < numChunks; i++) {
  const chunk = shopUrls.slice(i * CHUNK, (i + 1) * CHUNK);
  const filename = `sitemap-shops-${i + 1}.xml`;
  fs.writeFileSync(path.join(PUB, filename),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${chunk.join("\n")}\n</urlset>\n`);
  shopSitemapFiles.push(filename);
  console.log(`${filename}: ${chunk.length} URLs`);
}

// --- CITY SITEMAP (already generated) ---
const cityPages = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "city-pages.json"), "utf8"));
const cityUrls = cityPages.map(c => urlEntry(`${BASE}/cities/${c.slug}`, "0.6", "weekly"));
fs.writeFileSync(path.join(PUB, "sitemap-cities.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${cityUrls.join("\n")}\n</urlset>\n`);
console.log(`sitemap-cities.xml: ${cityUrls.length} URLs`);

// --- CATEGORIES SITEMAP (already exists, regenerate) ---
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "categories.json"), "utf8"));
const catUrls = categories.map(c => urlEntry(`${BASE}/category/${c.slug}`, "0.7", "weekly"));
for (const b of brands) {
  catUrls.push(urlEntry(`${BASE}/brand/${b.slug}`, "0.6", "monthly"));
}
fs.writeFileSync(path.join(PUB, "sitemap-categories.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${catUrls.join("\n")}\n</urlset>\n`);
console.log(`sitemap-categories.xml: ${catUrls.length} URLs`);

// --- BEST-OF SITEMAP (keep existing) ---

// --- SITEMAP INDEX ---
const sitemapEntries = [
  "sitemap-main.xml",
  ...shopSitemapFiles,
  "sitemap-cities.xml",
  "sitemap-categories.xml",
  "sitemap-bestof.xml",
].map(f => `  <sitemap><loc>${BASE}/${f}</loc><lastmod>${TODAY}</lastmod></sitemap>`);

fs.writeFileSync(path.join(PUB, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</sitemapindex>\n`);
console.log(`\nsitemap.xml: ${sitemapEntries.length} sub-sitemaps`);

// Total
const totalUrls = mainUrls.length + shopUrls.length + cityUrls.length + catUrls.length + 5; // +5 for bestof
console.log(`\nTOTAL: ${totalUrls.toLocaleString()} URLs in sitemap`);
