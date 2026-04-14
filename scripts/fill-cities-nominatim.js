const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "output", "mechanics-compiled.json");
const API_URL = "https://nominatim.openstreetmap.org/reverse";
const RATE_MS = 1100; // Nominatim requires max 1 req/sec, use 1.1s to be safe

const STATE_ABBREVS = {"alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI","wyoming":"WY"};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function geocode(lat, lon) {
  const url = `${API_URL}?lat=${lat}&lon=${lon}&format=json&zoom=10`;
  const res = await fetch(url, {
    headers: { "User-Agent": "MechanicSeeker/1.0 (admin@globalaibots.com)" },
  });
  if (res.status === 429) {
    console.log("    Rate limited, waiting 120s...");
    await sleep(120000);
    return geocode(lat, lon);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.address) return null;
  const a = data.address;
  const st = STATE_ABBREVS[(a.state || "").toLowerCase()] || "";
  const city = a.city || a.town || a.village || a.hamlet || a.county || "";
  return { state: st, city };
}

async function main() {
  const shops = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const need = shops.filter(s => !s.state && s.lat && s.lng);
  console.log(`Total: ${shops.length}, Need geocoding: ${need.length}`);
  console.log(`Already have state: ${shops.filter(s => s.state).length}`);
  console.log(`Using Nominatim at ~1 req/sec. ETA: ${Math.round(need.length * 1.1 / 60)} minutes`);

  let done = 0, fail = 0;
  for (let i = 0; i < need.length; i++) {
    try {
      const r = await geocode(need[i].lat, need[i].lng);
      if (r && r.state) {
        need[i].state = r.state;
        if (!need[i].city && r.city) need[i].city = r.city;
        done++;
      } else { fail++; }
    } catch (e) {
      console.log(`    Error at ${i}: ${e.message}`);
      fail++;
    }

    if ((i + 1) % 100 === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(shops));
      const withState = shops.filter(s => s.state).length;
      console.log(`  ${i + 1}/${need.length} — done: ${done}, fail: ${fail}, total with state: ${withState}/${shops.length} (${Math.round(withState/shops.length*100)}%)`);
    }
    await sleep(RATE_MS);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(shops));
  const finalWithState = shops.filter(s => s.state).length;
  console.log(`\nFINISHED: ${done} geocoded, ${fail} failed`);
  console.log(`Total with state: ${finalWithState}/${shops.length} (${Math.round(finalWithState/shops.length*100)}%)`);
}

main().catch(console.error);
