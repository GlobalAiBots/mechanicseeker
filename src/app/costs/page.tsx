import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Repair Cost Guides for 2026 | MechanicSeeker",
  description:
    "How much does car repair cost? Browse our 2026 cost guides for oil changes, brake pads, transmission repair, timing belts, alternators, and more.",
  alternates: {
    canonical: "https://mechanicseeker.com/costs",
  },
};

const guides = [
  {
    slug: "oil-change",
    title: "How Much Does an Oil Change Cost in 2026?",
    range: "$30 - $100",
    desc: "Conventional, synthetic blend, and full synthetic oil change prices compared across shop types.",
  },
  {
    slug: "brake-pads",
    title: "Brake Pad Replacement Cost: What to Expect",
    range: "$150 - $300 per axle",
    desc: "Brake pad and rotor replacement costs, warning signs, and how to save on brake service.",
  },
  {
    slug: "transmission-repair",
    title: "Transmission Repair Cost: Complete Guide",
    range: "$150 - $5,000+",
    desc: "From fluid changes to full rebuilds and replacements for manual and automatic transmissions.",
  },
  {
    slug: "timing-belt",
    title: "Timing Belt Replacement Cost by Vehicle",
    range: "$500 - $1,500",
    desc: "Timing belt costs for Honda, Toyota, Subaru, and European vehicles. Interference engine risks explained.",
  },
  {
    slug: "alternator",
    title: "Alternator Replacement Cost: DIY vs Mechanic",
    range: "$250 - $600",
    desc: "Parts and labor breakdown for alternator replacement plus signs of failure and DIY tips.",
  },
];

export default function CostsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">
        Auto Repair Cost Guides
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        How much should you pay for common car repairs in 2026? Our cost guides
        break down parts, labor, and total prices so you can budget accurately
        and avoid overpaying at the shop.
      </p>

      <div className="space-y-6">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/costs/${g.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl hover:text-[#E67E22] transition">
                  {g.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2">{g.desc}</p>
              </div>
              <span className="shrink-0 bg-[#FAF8F5] text-[#2C3E50] font-[Cabin] font-bold text-sm px-3 py-1 rounded-lg border border-gray-200">
                {g.range}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-[#FAF8F5] rounded-xl p-8 text-center">
        <h2 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl mb-3">
          Get Quotes From Local Mechanics
        </h2>
        <p className="text-gray-600 mb-5 max-w-lg mx-auto">
          Prices vary by location, vehicle, and shop. Find trusted mechanics in
          your area and compare quotes to make sure you pay a fair price.
        </p>
        <Link
          href="/near-me"
          className="inline-block bg-[#E67E22] text-white font-[Cabin] font-bold px-6 py-3 rounded-lg hover:bg-[#d35400] transition"
        >
          Find a Mechanic Near You
        </Link>
      </div>
    </div>
  );
}
