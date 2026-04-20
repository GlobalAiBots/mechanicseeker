"use client";
import { use, useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";
import { getStateRepairInfo } from "@/data/state-repair-info";
import FeaturedArticle from "@/components/FeaturedArticle";

export default function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = use(params);
  const stateInfo = stateList.find((s) => s.slug === state);
  const shops = useMemo(() => stateInfo ? unified.filter((s) => s.state === stateInfo.code) : [], [stateInfo]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    shops.forEach((s) => { const c = s.city?.trim(); if (c) m[c] = (m[c] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [shops]);

  const filtered = selectedCity ? shops.filter((s) => s.city?.trim() === selectedCity) : shops;

  if (!stateInfo) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">State Not Found</h1><Link href="/" className="text-[#E67E22] hover:underline">Back to Home</Link></div>;

  const repairInfo = getStateRepairInfo(stateInfo.code);

  // State-agnostic FAQs always render. State-specific ones are appended only when
  // we have real researched data for this state; otherwise the page is truthful
  // about what we know.
  const baseFaqs = [
    { q: `How many auto repair shops are in ${stateInfo.name}?`, a: `There are ${shops.length.toLocaleString()} auto repair shops in ${stateInfo.name} on MechanicSeeker, including mechanics, tire shops, body shops, and quick lube locations.` },
    { q: `How do I find a good mechanic in ${stateInfo.name}?`, a: `Browse MechanicSeeker to compare ${shops.length.toLocaleString()} shops in ${stateInfo.name}. Look for ASE-certified shops with transparent pricing and verified reviews.` },
    { q: `Can I bring my own parts to a mechanic?`, a: `Some independent mechanics allow customer-supplied parts, but many prefer to source their own for warranty and quality reasons. Ask upfront — shops that accept your parts may charge a higher labor rate. Chain shops typically do not allow outside parts.` },
    { q: `Should I go to the dealer or an independent mechanic?`, a: `Dealers use OEM parts and have brand-specific training, but charge 30-50% more. Independent mechanics are usually cheaper and handle most repairs. Go to the dealer for warranty work and complex brand-specific issues; use an independent for routine maintenance and common repairs.` },
  ];

  const stateFaqs = repairInfo
    ? [
        { q: `Does ${stateInfo.name} require written repair estimates?`, a: repairInfo.estimateLaw },
        { q: `What's ${stateInfo.name}'s Lemon Law coverage?`, a: repairInfo.lemonLaw },
        { q: `Does ${stateInfo.name} require vehicle inspections?`, a: repairInfo.inspection },
        { q: `What's the average hourly labor rate in ${stateInfo.name}?`, a: repairInfo.avgLaborRate },
        { q: `Who handles auto repair complaints in ${stateInfo.name}?`, a: repairInfo.consumerProtection },
      ]
    : [];

  const faqs = [...stateFaqs, ...baseFaqs];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <section className="py-16 md:py-24 text-center px-4" style={{ background: "#FAF8F5" }}>
        <p className="text-[#E67E22] text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{stateInfo.name} Auto Repair</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-[#1A1A1A]">Auto Repair Shops in {stateInfo.name}</h1>
        <p className="text-gray-500 mt-4">{shops.length.toLocaleString()} shops. Mechanics, tire shops, body shops, and more.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-10 pb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">Auto Repair in {stateInfo.name}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {stateInfo.name} is home to {shops.length.toLocaleString()} auto repair shops listed on MechanicSeeker, from independent mechanics to national chains like Jiffy Lube, Firestone, and Midas. Whether you need an oil change, brake service, tire replacement, or a full engine rebuild, there&apos;s a shop near you. Browse by city below to find trusted mechanics in your area.
          </p>
        </div>

        {repairInfo && (
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-2">Auto Repair Laws in {stateInfo.name}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3"><strong className="text-[#1A1A1A]">Written estimates:</strong> {repairInfo.estimateLaw}</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3"><strong className="text-[#1A1A1A]">Mechanic&apos;s liens:</strong> {repairInfo.mechanicLien}</p>
              <p className="text-sm text-gray-700 leading-relaxed"><strong className="text-[#1A1A1A]">Lemon Law:</strong> {repairInfo.lemonLaw}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-2">Vehicle Inspection Requirements</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{repairInfo.inspection}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-2">Typical Labor Rates</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{repairInfo.avgLaborRate}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-2">Climate &amp; Common Repairs</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{repairInfo.climateIssues}</p>
              </div>
            </div>

            {repairInfo.popularRepairs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-2">Most Common Repairs in {stateInfo.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {repairInfo.popularRepairs.map((r) => (
                    <span key={r} className="inline-block bg-[#E67E22]/10 text-[#E67E22] text-xs font-semibold px-3 py-1.5 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <h3 className="font-[Cabin] font-bold text-[#E67E22] mb-2">Consumer Protection in {stateInfo.name}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{repairInfo.consumerProtection}</p>
              <p className="text-xs text-gray-500 mt-2">If a shop won&apos;t honor an estimate or you suspect fraud, file a complaint with your state consumer protection office.</p>
            </div>
          </div>
        )}

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-[#E67E22] mb-3">How to Pick a Good Mechanic</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Ask for a written estimate before authorizing any repair.</li>
            <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Get the warranty on parts and labor in writing.</li>
            <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Compare 2-3 quotes for major repairs like transmission or engine work.</li>
            <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Look for ASE-certified technicians &mdash; a basic professional standard.</li>
            <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Read our <Link href="/blog/how-to-find-trustworthy-mechanic" className="text-[#E67E22] hover:underline">guide to finding a trustworthy mechanic</Link>.</li>
          </ul>
        </div>
      </section>

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 20).map(([city, count]) => (
              <Link key={city} href={`/cities/${stateInfo.slug}-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`} className={`text-left bg-white border rounded-lg p-3 hover:border-[#E67E22] hover:shadow-sm transition border-gray-200`}>
                <p className="font-bold text-[#1A1A1A] text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} shop{count !== 1 ? "s" : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="shop-list" className="max-w-6xl mx-auto px-4 py-8">
        {selectedCity && <div className="pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-[#E67E22] hover:underline">&larr; Show all {shops.length} shops</button></div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.slice(0, 100).map((s) => (
            <Link key={s.id} href={`/shops/${s.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition">{s.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{s.city}, {s.state}</p>
              {s.brand && <span className="inline-block mt-1 text-xs bg-[#E67E22]/10 text-[#E67E22] px-2 py-0.5 rounded">{s.brand}</span>}
              <span className="text-sm font-semibold text-[#E67E22] mt-2 inline-block">View Details &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#E67E22] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <FeaturedArticle listingSlug={`state-${state}`} />
      </div>
    </div>
  );
}
