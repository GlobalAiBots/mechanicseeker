import Link from "next/link";
import type { Metadata } from "next";
import { unified, stateList } from "@/data/all-mechanics";
import TireShopsFilter from "./TireShopsFilter";

const tireShops = unified.filter((s) => s.shopType === "tire_shop");

export const metadata: Metadata = {
  title: `Tire Shops Directory — ${tireShops.length.toLocaleString()}+ Locations | MechanicSeeker`,
  description: `Browse ${tireShops.length.toLocaleString()}+ tire shops across the US. Find tire sales, rotation, balancing, and alignment near you.`,
  alternates: { canonical: "https://www.mechanicseeker.com/tire-shops" },
};

export default function TireShopsPage() {
  const byState: Record<string, number> = {};
  for (const s of tireShops) byState[s.state] = (byState[s.state] || 0) + 1;
  const statesSorted = stateList
    .map((s) => ({ ...s, count: byState[s.code] || 0 }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Tire Shops Directory",
            url: "https://www.mechanicseeker.com/tire-shops",
            description: `Directory of ${tireShops.length} tire shops across the US.`,
          }),
        }}
      />

      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &raquo; <span className="text-gray-700">Tire Shops</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
        Tire Shops Directory
      </h1>
      <p className="text-gray-600 max-w-3xl mb-8">
        {tireShops.length.toLocaleString()}+ tire shops across{" "}
        {statesSorted.length} states. Search by name or city, or browse by
        state to find tire sales, rotation, balancing, and alignment near you.
      </p>

      <TireShopsFilter shops={tireShops} />

      <section className="mt-16">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-5">
          Browse Tire Shops by State
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {statesSorted.map((s) => (
            <Link
              key={s.code}
              href={`/${s.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-[#E67E22] hover:shadow-sm transition"
            >
              <p className="font-[Cabin] font-bold text-[#1A1A1A]">{s.name}</p>
              <p className="text-[#E67E22] font-bold text-sm">
                {s.count.toLocaleString()} shops
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
