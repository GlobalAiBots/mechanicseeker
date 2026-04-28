import Link from "next/link";
import { notFound } from "next/navigation";
import { unified } from "@/data/all-mechanics";
import cityPages from "@/data/city-pages.json";
import FeaturedArticle from "@/components/FeaturedArticle";
import { detectChain } from "@/lib/chain-detection";
import CityClientView from "./CityClientView";

interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = cityPages as CityPage[];

export const dynamicParams = true;

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cityInfo = allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);
  if (!cityInfo) notFound();

  const shops = unified.filter((s) => s.state === cityInfo.state && s.city?.trim() === cityInfo.city);

  const typeCountsRecord: Record<string, number> = {};
  for (const s of shops) if (s.shopType) typeCountsRecord[s.shopType] = (typeCountsRecord[s.shopType] || 0) + 1;
  const typeCounts = Object.entries(typeCountsRecord).sort((a, b) => b[1] - a[1]);

  const chainCountsRecord: Record<string, number> = {};
  for (const s of shops) {
    const c = detectChain(s);
    if (c) chainCountsRecord[c] = (chainCountsRecord[c] || 0) + 1;
  }
  const cityChains = Object.entries(chainCountsRecord).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const independentCount = shops.filter(s => !detectChain(s)).length;

  const center: [number, number] = shops.length
    ? [shops.reduce((s, sh) => s + sh.lat, 0) / shops.length, shops.reduce((s, sh) => s + sh.lng, 0) / shops.length]
    : [39.8, -98.5];

  const nearbyCities = allCityPages
    .filter((c) => c !== cityInfo)
    .map((c) => ({ ...c, dist: Math.sqrt(Math.pow(c.lat - cityInfo.lat, 2) + Math.pow(c.lng - cityInfo.lng, 2)) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 5);

  const clientShops = shops.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, city: s.city, state: s.state, brand: s.brand }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many auto repair shops are in ${cityInfo.city}, ${cityInfo.stateName}?`, acceptedAnswer: { "@type": "Answer", text: `${cityInfo.city} has ${shops.length} auto repair shop${shops.length !== 1 ? "s" : ""} listed on MechanicSeeker${cityChains.length > 0 ? ` — ${independentCount} independent and ${shops.length - independentCount} national-chain location${shops.length - independentCount !== 1 ? "s" : ""}` : ""}.` } },
          { "@type": "Question", name: `What national chains have shops in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: cityChains.length > 0 ? `${cityChains.slice(0, 6).map(([c, n]) => `${c} (${n})`).join(", ")}.` : `${cityInfo.city} has only independent auto repair shops listed.` } },
          { "@type": "Question", name: `How much does an oil change cost in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: `Oil change prices in ${cityInfo.city} typically run $30-$50 for conventional and $65-$125 for full synthetic. Chains tend toward the lower end; dealer service centers run higher.` } },
          { "@type": "Question", name: `What types of auto repair shops are in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: typeCounts.length > 0 ? typeCounts.map(([t, c]) => `${c} ${t.replace(/_/g, " ")}${c !== 1 ? "s" : ""}`).join(", ") + "." : "Contact individual shops for details." } },
          { "@type": "Question", name: `How do I find a good mechanic in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: `Browse the ${shops.length} shop${shops.length !== 1 ? "s" : ""} on MechanicSeeker, look for ASE-certified technicians, read reviews, and get written estimates from 2-3 shops before authorizing major repairs. MechanicSeeker is free to use — no account required.` } },
        ],
      }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#2C3E50] transition">Home</Link><span>/</span>
        <Link href={`/${cityInfo.stateSlug}`} className="hover:text-[#2C3E50] transition">{cityInfo.stateName}</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">{cityInfo.city}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">Auto Repair Shops in {cityInfo.city}, {cityInfo.stateName}</h1>
      <p className="text-gray-500 mb-6">{shops.length} auto repair shop{shops.length !== 1 ? "s" : ""} in {cityInfo.city}, {cityInfo.stateName}. Mechanics, tire shops, body shops, and more.</p>

      <CityClientView shops={clientShops} center={center} />

      {/* About — dynamic per city */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">About Auto Repair in {cityInfo.city}, {cityInfo.stateName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {cityInfo.city}, {cityInfo.stateName} has <strong className="text-[#1A1A1A]">{shops.length} auto repair shop{shops.length !== 1 ? "s" : ""}</strong> listed on MechanicSeeker
          {cityChains.length > 0 && independentCount > 0 ? ` — a mix of ${independentCount} independent shop${independentCount !== 1 ? "s" : ""} and ${shops.length - independentCount} national-chain location${shops.length - independentCount !== 1 ? "s" : ""}` : ""}
          {cityChains.length === 0 && independentCount > 0 ? ` — all locally-owned independent shops` : ""}
          . Whether you need a quick oil change, a brake job, transmission work, a state inspection, or full collision repair, the shops below serve {cityInfo.city} drivers with verified addresses, phone numbers, services offered, and turn-by-turn directions. Independents tend to specialize and price competitively on labor; chains offer consistent pricing and nationwide warranty coverage. Always get a written estimate before authorizing repairs over $200, and look for ASE-certified technicians as the baseline industry credential.
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
        <h3 className="font-[Cabin] font-bold text-[#E67E22] mb-3">How to Pick the Right Shop in {cityInfo.city}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Get a written estimate before authorizing any repair over $200 &mdash; <Link href={`/${cityInfo.stateSlug}`} className="text-[#E67E22] hover:underline">see {cityInfo.stateName} repair guide</Link>.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Ask about warranty coverage on parts and labor before work begins.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Look for ASE-certified technicians &mdash; the baseline industry credential.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> For the same job, get a quote from one chain and one independent to compare.</li>
          <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Confirm whether the shop honors your manufacturer warranty &mdash; especially for vehicles still under powertrain coverage.</li>
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
