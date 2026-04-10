"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-mechanics";
import cityPages from "@/data/city-pages.json";

interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = cityPages as CityPage[];

export default function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const cityInfo = allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);

  const shops = useMemo(() => {
    if (!cityInfo) return [];
    return unified.filter((s) => s.state === cityInfo.state && s.city?.trim() === cityInfo.city);
  }, [cityInfo]);

  const [search, setSearch] = useState("");
  const filtered = search.length >= 2
    ? shops.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : shops;

  const nearbyCities = useMemo(() => {
    if (!cityInfo) return [];
    return allCityPages
      .filter((c) => c !== cityInfo)
      .map((c) => ({ ...c, dist: Math.sqrt(Math.pow(c.lat - cityInfo.lat, 2) + Math.pow(c.lng - cityInfo.lng, 2)) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 5);
  }, [cityInfo]);

  if (!cityInfo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">City Not Found</h1>
        <Link href="/" className="text-[#E67E22] hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many auto repair shops are in ${cityInfo.city}, ${cityInfo.stateName}?`, acceptedAnswer: { "@type": "Answer", text: `There are ${shops.length} auto repair shops in ${cityInfo.city}, ${cityInfo.stateName}. Browse them all on MechanicSeeker.` } },
          { "@type": "Question", name: `Where is the closest mechanic in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: `MechanicSeeker lists all ${shops.length} auto repair shops in ${cityInfo.city} with addresses, phone numbers, and services offered.` } },
          { "@type": "Question", name: `How much does car repair cost in ${cityInfo.city}, ${cityInfo.stateName}?`, acceptedAnswer: { "@type": "Answer", text: `Repair costs in ${cityInfo.city} vary by service. Oil changes run $30-$75, brake jobs $150-$500, and tire replacement $100-$300. Get quotes from multiple shops.` } },
        ],
      }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#2C3E50] transition">Home</Link><span>/</span>
        <Link href={`/${cityInfo.stateSlug}`} className="hover:text-[#2C3E50] transition">{cityInfo.stateName}</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">{cityInfo.city}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">Auto Repair Shops in {cityInfo.city}, {cityInfo.stateName}</h1>
      <p className="text-gray-500 mb-6">{shops.length} auto repair shop{shops.length !== 1 ? "s" : ""} in {cityInfo.city}, {cityInfo.stateName}. Mechanics, tire shops, body shops, and more.</p>

      {shops.length > 5 && (
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shops in this city..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition mb-6" />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {filtered.slice(0, 100).map((s) => (
          <Link key={s.id} href={`/shops/${s.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition">{s.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{s.city}, {s.state}</p>
            {s.brand && <span className="inline-block mt-1 text-xs bg-[#E67E22]/10 text-[#E67E22] px-2 py-0.5 rounded">{s.brand}</span>}
            <span className="text-sm font-semibold text-[#E67E22] mt-2 inline-block">View Details &rarr;</span>
          </Link>
        ))}
      </div>

      {nearbyCities.length > 0 && (
        <section>
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Nearby Cities with Auto Repair</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {nearbyCities.map((c) => (
              <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/cities/${c.stateSlug}-${c.citySlug}`} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#E67E22] transition">
                <p className="font-bold text-[#1A1A1A] text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} shops &middot; {c.stateName}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
