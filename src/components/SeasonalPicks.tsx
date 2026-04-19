type Product = { name: string; desc: string; q: string };
type Season = { label: string; emoji: string; headline: string; items: Product[] };

const AFFILIATE_TAG = "babymydog03-20";
const amazonSearch = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;

const SEASONS: Record<"spring" | "summer" | "fall" | "winter", Season> = {
  spring: {
    label: "Spring",
    emoji: "\u{1F33F}",
    headline: "Undo winter damage and get ready for driving season",
    items: [
      { name: "Wiper Blades", desc: "Winter ice tears up rubber. Fresh blades are $20 for the pair and make spring rain driving safe again.", q: "wiper blades set pair" },
      { name: "Cabin Air Filter", desc: "Pollen, dust, and road grime build up all winter. A $15 filter takes 5 minutes to swap.", q: "cabin air filter" },
      { name: "Alignment & Tire Pressure Gauge", desc: "Potholes knock wheels out of alignment. Check pressure and get an alignment after winter.", q: "digital tire pressure gauge" },
    ],
  },
  summer: {
    label: "Summer",
    emoji: "\u{2600}",
    headline: "Road trip prep &mdash; summer heat is hard on cars",
    items: [
      { name: "AC Refrigerant Recharge Kit", desc: "DIY a warm AC for $50 vs. $200 at a shop. Pro gauge included.", q: "ac recharge kit r134a gauge" },
      { name: "Portable Tire Inflator", desc: "Hot pavement spikes tire pressure. Check and top off before long trips. 12V, auto shut-off.", q: "portable tire inflator 12v" },
      { name: "Coolant/Antifreeze", desc: "Flush aging coolant before the first 100-degree day. Prevents overheating on road trips.", q: "engine coolant antifreeze 50 50" },
    ],
  },
  fall: {
    label: "Fall",
    emoji: "\u{1F342}",
    headline: "Prep for winter &mdash; catch problems before the cold",
    items: [
      { name: "Battery Tester / Load Tester", desc: "Weak batteries fail the first cold morning. Load-test now, replace if needed.", q: "12v car battery load tester" },
      { name: "OBD2 Scanner", desc: "Check engine light before a long fall road trip saves a tow from the middle of nowhere.", q: "bluetooth obd2 scanner" },
      { name: "Wiper Blades (Winter-Rated)", desc: "Beam-style blades shed ice and snow better than OEM. Swap in fall before the first storm.", q: "winter wiper blades beam style" },
    ],
  },
  winter: {
    label: "Winter",
    emoji: "\u{2744}",
    headline: "Cold-weather essentials and emergency kit",
    items: [
      { name: "Portable Jump Starter", desc: "Cold kills weak batteries. A $55 jump pack saves a $100 tow and a missed morning.", q: "portable car jump starter" },
      { name: "Winter Washer Fluid (-20F)", desc: "Regular washer fluid freezes in the lines. -20F rated fluid is a dollar more and critical.", q: "winter washer fluid -20" },
      { name: "Snow Brush + Ice Scraper", desc: "Extendable, locking handle, foam grip. Don't scrape your windshield with a credit card again.", q: "snow brush ice scraper extendable" },
    ],
  },
};

function getSeason(): keyof typeof SEASONS {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

export default function SeasonalPicks() {
  const season = SEASONS[getSeason()];

  return (
    <div className="my-10">
      <div className="flex items-baseline gap-3 mb-1">
        <h3 className="font-[Cabin] text-lg font-bold text-[#1A1A1A]">This {season.label}&apos;s Picks</h3>
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#E67E22]">{season.emoji} Limited-Time Featured</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">{season.headline}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {season.items.map((item) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-[#1A1A1A] text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonSearch(item.q)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-block mt-3 text-xs font-semibold text-[#E67E22] hover:text-[#C56512] transition"
            >
              &#9733; Our Pick &mdash; View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
