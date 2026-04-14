"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-mechanics";
import cityPages from "@/data/city-pages.json";
import FeaturedArticle from "@/components/FeaturedArticle";

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

      {/* Intro */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">Auto Repair Shops in {cityInfo.city}, {cityInfo.stateName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">{cityInfo.city}, {cityInfo.stateName} has {shops.length} auto repair shop{shops.length !== 1 ? "s" : ""} listed on MechanicSeeker. Browse all shops above with services, contact info, and directions to find a trusted mechanic near you.</p>
      </div>

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-[#E67E22] mb-3">Tips for Finding a Mechanic in {cityInfo.city}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Get written estimates from at least two shops before authorizing major repairs.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Ask about warranty coverage on parts and labor before work begins.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Check online reviews and ask for referrals to find a reliable mechanic.</li>
        </ul>
      </div>

      {/* Visible FAQ */}
      <div className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many auto repair shops are in ${cityInfo.city}, ${cityInfo.stateName}?`, a: `There are ${shops.length} auto repair shops in ${cityInfo.city}, ${cityInfo.stateName} listed on MechanicSeeker with services and contact info.` },
            { q: `How much does an oil change cost in ${cityInfo.city}?`, a: `Oil change prices in ${cityInfo.city} typically range from $30 to $75 depending on the vehicle and oil type. Get quotes from multiple shops.` },
            { q: `How do I find a good mechanic in ${cityInfo.city}?`, a: `Browse shops on MechanicSeeker, check reviews, ask about certifications, and get estimates from multiple shops before committing.` },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#E67E22] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <FeaturedArticle listingSlug={`city-${slug}`} />

      {/* Back to state */}
      <div className="text-center py-4">
        <Link href={`/${cityInfo.stateSlug}`} className="text-[#E67E22] hover:underline font-semibold text-sm">Browse all {cityInfo.stateName} auto repair shops &rarr;</Link>
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
