const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "output", "mechanics-compiled.json");
const API_KEY = "pk.95179142d59d80b5ebbe23bd403bf346";
const API_URL = "https://us1.locationiq.com/v1/reverse";
const RATE_MS = 550; // 2 req/sec on free tier

const STATE_ABBREVS = {"alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI","wyoming":"WY"};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function parseArgs(argv) {
  const args = { batch: Infinity, resume: true };
  for (const a of argv.slice(2)) {
    const m = a.match(/^--batch=(\d+)$/);
    if (m) args.batch = parseInt(m[1], 10);
    else if (a === "--resume") args.resume = true;
  }
  return args;
}

// Sentinel thrown to abort the main loop when the daily quota is exhausted
// or a sustained-failure pattern indicates the API is unhealthy.
class QuotaExhausted extends Error {}

async function geocode(lat, lon, retries = 1) {
  const url = `${API_URL}?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url);
  if (res.status === 429) {
    if (retries <= 0) throw new QuotaExhausted("HTTP 429 — daily quota exhausted");
    console.log("    Rate limited, waiting 60s and retrying once...");
    await sleep(60000);
    return geocode(lat, lon, retries - 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Quota-exceeded responses sometimes return 200 OK with an `error` field instead of `address`.
  if (data.error) throw new QuotaExhausted(`API error: ${data.error}`);
  if (!data.address) return null;
  const a = data.address;
  const st = STATE_ABBREVS[(a.state || "").toLowerCase()] || "";
  const city = a.city || a.town || a.village || a.hamlet || a.county || "";
  return { state: st, city };
}

async function main() {
  const args = parseArgs(process.argv);
  const shops = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const need = shops.filter(s => !s.state && s.lat && s.lng);
  const cap = Math.min(args.batch, need.length);
  console.log(`Total: ${shops.length}, Remaining ungeocoded: ${need.length}, Batch cap: ${args.batch === Infinity ? "none" : args.batch}, Will process: ${cap}`);

  // Bail out if we see a sustained-failure pattern: the API may return 200 OK
  // with empty/unhelpful payloads under quota exhaustion, which would otherwise
  // burn through the whole batch with done=0.
  const SUSTAINED_FAIL_THRESHOLD = 50;

  let done = 0, fail = 0, consecutiveFail = 0, quotaHit = false, sustainedFailHit = false;
  try {
    for (let i = 0; i < cap; i++) {
      try {
        const r = await geocode(need[i].lat, need[i].lng);
        if (r && r.state) {
          need[i].state = r.state;
          if (!need[i].city && r.city) need[i].city = r.city;
          done++;
          consecutiveFail = 0;
        } else {
          fail++;
          consecutiveFail++;
        }
      } catch (e) {
        if (e instanceof QuotaExhausted) { quotaHit = true; throw e; }
        fail++;
        consecutiveFail++;
      }

      if (consecutiveFail >= SUSTAINED_FAIL_THRESHOLD && done === 0) {
        sustainedFailHit = true;
        throw new QuotaExhausted(`${consecutiveFail} consecutive failures with 0 successes — likely quota exhausted`);
      }

      if ((i + 1) % 200 === 0) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(shops));
        console.log(`  ${i + 1}/${cap} — done: ${done}, fail: ${fail}`);
      }
      await sleep(RATE_MS);
    }
  } catch (e) {
    if (!(e instanceof QuotaExhausted)) throw e;
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(shops));
  if (sustainedFailHit) {
    console.log(`\nQUOTA EXHAUSTED (sustained-failure pattern) — saved progress and exited cleanly. ${done} geocoded, ${fail} failed in this run.`);
  } else if (quotaHit) {
    console.log(`\nQUOTA EXHAUSTED — saved progress and exited cleanly. ${done} geocoded, ${fail} failed in this run.`);
  } else {
    console.log(`\nFINISHED: ${done} geocoded, ${fail} failed`);
  }
  console.log(`Total with state: ${shops.filter(s => s.state).length}/${shops.length}`);
  if (quotaHit) process.exit(2);
}

main().catch((e) => { console.error(e); process.exit(1); });
