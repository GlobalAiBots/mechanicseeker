"use client";

import { use, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { unified } from "@/data/all-mechanics";
import cityPages from "@/data/city-pages.json";
import FeaturedArticle from "@/components/FeaturedArticle";
import { detectChain } from "@/lib/chain-detection";

const ShopMap = dynamic(() => import("@/components/ShopMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = cityPages as CityPage[];

export default function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const cityInfo = allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);

  const shops = useMemo(() => {
    if (!cityInfo) return [];
    return unified.filter((s) => s.state === cityInfo.state && s.city?.trim() === cityInfo.city);
  }, [cityInfo]);

  // Aggregate shopType values across shops in this city (dynamic per city).
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of shops) if (s.shopType) counts[s.shopType] = (counts[s.shopType] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [shops]);

  // Aggregate detected chains operating in this city.
  const cityChains = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of shops) {
      const c = detectChain(s);
      if (c) counts[c] = (counts[c] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [shops]);

  const independentCount = useMemo(() => shops.filter(s => !detectChain(s)).length, [shops]);

  const mapShops = useMemo(() => shops.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, city: s.city })), [shops]);
  const center = useMemo<[number, number]>(() => shops.length ? [shops.reduce((s, sh) => s + sh.lat, 0) / shops.length, shops.reduce((s, sh) => s + sh.lng, 0) / shops.length] : [39.8, -98.5], [shops]);

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
          { "@type": "Question", name: `How many auto repair shops are in ${cityInfo.city}, ${cityInfo.stateName}?`, acceptedAnswer: { "@type": "Answer", text: `${cityInfo.city} has ${shops.length} auto repair shop${shops.length !== 1 ? "s" : ""} listed on MechanicSeeker${cityChains.length > 0 ? ` — ${independentCount} independent and ${shops.length - independentCount} national-chain location${shops.length - independentCount !== 1 ? "s" : ""}` : ""}.` } },
          { "@type": "Question", name: `What national chains have shops in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: cityChains.length > 0 ? `${cityChains.slice(0, 6).map(([c, n]) => `${c} (${n})`).join(", ")}.` : `${cityInfo.city} has only independent auto repair shops listed.` } },
          { "@type": "Question", name: `How much does an oil change cost in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: `Oil change prices in ${cityInfo.city} typically run $30-$50 for conventional and $65-$125 for full synthetic.` } },
          { "@type": "Question", name: `What types of auto repair shops are in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: typeCounts.length > 0 ? typeCounts.map(([t, c]) => `${c} ${t.replace(/_/g, " ")}${c !== 1 ? "s" : ""}`).join(", ") + "." : "Contact individual shops for details." } },
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

      {shops.length > 0 && <div className="mb-8"><ShopMap shops={mapShops} center={center} zoom={12} height="350px" /></div>}

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

      {/* About — dynamic per city */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">About Auto Repair in {cityInfo.city}, {cityInfo.stateName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {cityInfo.city} has <strong className="text-[#1A1A1A]">{shops.length} auto repair shop{shops.length !== 1 ? "s" : ""}</strong> listed on MechanicSeeker
          {cityChains.length > 0 && independentCount > 0 ? ` — a mix of ${independentCount} independent shop${independentCount !== 1 ? "s" : ""} and ${shops.length - independentCount} national-chain location${shops.length - independentCount !== 1 ? "s" : ""}` : ""}
          {cityChains.length === 0 && independentCount > 0 ? ` — all locally-owned independent shops` : ""}
          . Every listing includes address, phone, services, and turn-by-turn directions. Click any shop card below to see full details.
        </p>
      </div>

      {/* Shop types in this city */}
      {typeCounts.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">Shop Types in {cityInfo.city}</h2>
          <div className="flex flex-wrap gap-2">
            {typeCounts.map(([type, count]) => (
              <span key={type} className="inline-flex items-center gap-1.5 bg-[#E67E22]/10 text-[#E67E22] text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="capitalize">{type.replace(/_/g, " ")}</span>
                <span className="text-[#1A1A1A] font-bold">&middot; {count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Chains in this city — aggregated from shop names + brand field */}
      {cityChains.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">National Chains in {cityInfo.city}</h2>
          <p className="text-gray-600 text-sm mb-3">
            {cityInfo.city} has {cityChains.length} national chain{cityChains.length !== 1 ? "s" : ""} operating auto repair locations. Chains offer consistent pricing and warranties; locals often know which ones handle your vehicle best.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityChains.map(([chain, count]) => (
              <div key={chain} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <p className="font-bold text-[#1A1A1A] text-sm">{chain}</p>
                <p className="text-gray-500 text-xs">{count} location{count !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What to know — generic tips stay but framed as "How to pick" not "in this city" */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-[#E67E22] mb-3">How to Pick the Right Shop</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Get a written estimate before authorizing any repair over $200.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Ask about warranty coverage on parts and labor before work begins.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Look for ASE-certified technicians &mdash; the baseline industry credential.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> For the same job, get a quote from one chain and one independent to compare.</li>
        </ul>
      </div>

      {/* Visible FAQ */}
      <div className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many auto repair shops are in ${cityInfo.city}, ${cityInfo.stateName}?`, a: `${cityInfo.city} has ${shops.length} auto repair shop${shops.length !== 1 ? "s" : ""} listed on MechanicSeeker${cityChains.length > 0 ? ` — including ${independentCount} independent${independentCount !== 1 ? "s" : ""} and ${shops.length - independentCount} national-chain location${shops.length - independentCount !== 1 ? "s" : ""}` : ""}.` },
            { q: `What national chains have shops in ${cityInfo.city}?`, a: cityChains.length > 0 ? `${cityChains.slice(0, 6).map(([c, n]) => `${c} (${n})`).join(", ")}${cityChains.length > 6 ? `, and ${cityChains.length - 6} more` : ""}.` : `${cityInfo.city} has only independent (non-chain) auto repair shops listed on MechanicSeeker.` },
            { q: `How much does an oil change cost in ${cityInfo.city}?`, a: `Oil change prices in ${cityInfo.city} typically run $30-$50 for conventional oil and $65-$125 for full synthetic. Chains (Jiffy Lube, Valvoline, Walmart Auto Care) tend toward the lower end; dealer service centers run higher. Get 2-3 quotes before committing.` },
            { q: `What types of auto repair shops are in ${cityInfo.city}?`, a: typeCounts.length > 0 ? `${cityInfo.city} has ${typeCounts.map(([t, c]) => `${c} ${t.replace(/_/g, " ")}${c !== 1 ? "s" : ""}`).join(", ")}.` : `Contact individual ${cityInfo.city} shops to learn what each offers.` },
            { q: `How do I find a good mechanic in ${cityInfo.city}?`, a: `Browse shops on MechanicSeeker, check reviews, look for ASE-certified technicians, and get written estimates from multiple shops before committing to major repairs.` },
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
