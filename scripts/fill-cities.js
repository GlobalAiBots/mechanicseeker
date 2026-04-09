const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join(__dirname, "output", "mechanics-compiled.json");
const RATE_MS = 1100;
const STATE_ABBREVS = {"alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI","wyoming":"WY"};
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
async function geocode(lat,lon){
  const r=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`,{headers:{"User-Agent":"MechanicSeeker/1.0 (admin@globalaibots.com)"}});
  if(r.status===429){await sleep(5000);return geocode(lat,lon);}
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  const d=await r.json();
  if(!d.address)return null;
  const a=d.address;
  return{state:STATE_ABBREVS[(a.state||"").toLowerCase()]||"",city:a.city||a.town||a.village||a.hamlet||a.county||""};
}
async function main(){
  const shops=JSON.parse(fs.readFileSync(DATA_FILE,"utf8"));
  const need=shops.filter(s=>!s.state&&s.lat&&s.lng);
  console.log(`Total: ${shops.length}, Need geocoding: ${need.length}`);
  let done=0,fail=0;
  for(let i=0;i<need.length;i++){
    try{const r=await geocode(need[i].lat,need[i].lng);if(r&&r.state){need[i].state=r.state;if(!need[i].city&&r.city)need[i].city=r.city;done++;}else fail++;}
    catch(e){fail++;}
    if((i+1)%200===0){fs.writeFileSync(DATA_FILE,JSON.stringify(shops));console.log(`${i+1}/${need.length} done:${done} fail:${fail}`);}
    await sleep(RATE_MS);
  }
  fs.writeFileSync(DATA_FILE,JSON.stringify(shops));
  console.log(`DONE: ${done} geocoded, ${fail} failed`);
}
main().catch(console.error);
