type Product = { name: string; desc: string; asin: string };

const AFFILIATE_TAG = "babymydog03-20";
const amazonUrl = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;

const SECTIONS: Record<string, { title: string; items: Product[] }> = {
  "diy-tools": {
    title: "DIY Auto Tools",
    items: [
      { name: "BlueDriver OBD2 Scanner", desc: "Reads every code your car throws, including ABS and airbag. The same Bluetooth scanner most shops use.", asin: "B00652G4TS" },
      { name: "3-Ton Floor Jack", desc: "Low-profile steel jack rated for trucks and SUVs. The foundation of any home shop.", asin: "B00EU29PWA" },
      { name: "Jack Stands (Pair)", desc: "Never crawl under a car supported only by a jack. Rated 3 tons per stand, ratchet-lock safety.", asin: "B000CO86RA" },
      { name: "Craftsman 230pc Socket Set", desc: "SAE and metric, 1/4-, 3/8-, and 1/2-inch drive. Covers 95% of fasteners on any passenger vehicle.", asin: "B07QK92LMQ" },
      { name: "Torque Wrench", desc: "Click-style, calibrated to within 4%. Required for lug nuts, oil drain plugs, and engine fasteners.", asin: "B00C5ZL0RU" },
      { name: "Digital Multimeter", desc: "Auto-ranging, measures voltage, resistance, and continuity. Diagnoses dead batteries, alternators, and sensors.", asin: "B01ISAMUA6" },
    ],
  },
  emergency: {
    title: "Emergency Car Kit",
    items: [
      { name: "Portable Jump Starter", desc: "Starts a V8 from a dead battery. USB power bank for phones too. Every trunk needs one.", asin: "B015TKUPIC" },
      { name: "Portable Tire Inflator", desc: "12V, digital gauge, auto shut-off. Fills a car tire in under 5 minutes at the roadside.", asin: "B01L9WSTEG" },
      { name: "Heavy-Duty Jumper Cables", desc: "20-foot, 4-gauge cables with insulated clamps. The cables in a roadside kit are usually too thin.", asin: "B001O0RFQ8" },
      { name: "Digital Tire Pressure Gauge", desc: "Backlit, accurate to 0.1 PSI. Underinflated tires kill fuel economy and cause blowouts.", asin: "B07R9Y3LCN" },
      { name: "Emergency Road Flares", desc: "LED flares visible up to a mile. Magnetic base sticks to any steel panel. Safer than pyrotechnic flares.", asin: "B07D7T9J4K" },
      { name: "First Aid Kit", desc: "Compact case with the basics for cuts, burns, and road-trip scrapes.", asin: "B000069EYA" },
    ],
  },
  maintenance: {
    title: "Oil Change & Maintenance",
    items: [
      { name: "Oil Drain Pan", desc: "8-quart capacity with a sealing lid so you can transport used oil to a recycler without spilling.", asin: "B000BQW5LK" },
      { name: "Oil Filter Wrench", desc: "Adjustable strap wrench fits any spin-on filter. No more stripped filter housings.", asin: "B000BYGDPI" },
      { name: "Funnel Set", desc: "Flexible nozzles reach buried oil fills and transmission dipsticks. Eliminates 90% of driveway spills.", asin: "B07GQNXDQX" },
      { name: "Mechanic Creeper", desc: "Padded, rolling, with a headrest. Working on your back under a car without one is miserable.", asin: "B000COC64G" },
      { name: "Nitrile Gloves (100ct)", desc: "Oil-resistant, tear-resistant. Keep your hands clean through an oil change, brake job, or coolant flush.", asin: "B076D2CSDY" },
      { name: "LED Work Light", desc: "Rechargeable, magnetic, hands-free. See what you are actually working on inside engine bays and wheel wells.", asin: "B075FGCP27" },
    ],
  },
};

export default function GearRecommendation({ section = "diy-tools", heading }: { section?: keyof typeof SECTIONS; heading?: string }) {
  const data = SECTIONS[section] || SECTIONS["diy-tools"];
  const title = heading ?? data.title;

  return (
    <div className="my-10">
      <h3 className="font-[Cabin] text-lg font-bold text-[#1A1A1A] mb-1">{title}</h3>
      <p className="text-gray-400 text-xs mb-4">As an Amazon Associate we earn from qualifying purchases.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.items.map((item) => (
          <div key={item.asin} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-[#1A1A1A] text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonUrl(item.asin)}
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
