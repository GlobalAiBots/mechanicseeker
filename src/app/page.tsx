"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";

export default function Home() {
  const [query, setQuery] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of unified) map[s.state] = (map[s.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(
    () => stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).sort((a, b) => b.count - a.count),
    [stateCounts]
  );

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    stateList.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 4).forEach((s) => {
      results.push({ type: "State", label: s.name, href: `/${s.slug}` });
    });
    unified.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 5).forEach((s) => {
      results.push({ type: "Shop", label: `${s.name} (${s.city}, ${s.state})`, href: `/shops/${s.id}` });
    });
    return results.slice(0, 8);
  }, [query]);

  const shopTypes = useMemo(() => {
    const counts: Record<string, number> = {};
    unified.forEach((s) => { counts[s.shopType] = (counts[s.shopType] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "MechanicSeeker", url: "https://mechanicseeker.com",
        description: `Find auto repair shops across America. ${unified.length.toLocaleString()}+ shops.`,
        potentialAction: { "@type": "SearchAction", target: "https://mechanicseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />

      {/* HERO */}
      <section className="relative py-20 md:py-32 text-center px-4 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-mechanic.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2332]/85 via-[#1A2332]/70 to-[#1A2332]/85" />
        <div className="relative z-10">
          <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4">Auto Repair Directory</p>
          <h1 className="font-[Cabin] text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl mx-auto">Find Auto Repair Shops Near You</h1>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">{unified.length.toLocaleString()}+ shops across {statesWithCounts.filter(s => s.count > 0).length} states. Mechanics, tire shops, body shops, and more.</p>

          <div className="max-w-xl mx-auto mt-8 relative">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by shop name, city, or state..." className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 text-[#1A1A1A] outline-none focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 transition shadow-2xl text-sm" />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                {suggestions.map((s, i) => (
                  <Link key={i} href={s.href} className="flex items-center gap-3 px-4 py-3 hover:bg-[#E67E22]/5 transition border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                    <span className="text-sm text-[#1A1A1A]">{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick filters */}
          <div className="flex gap-2 justify-center mt-6 flex-wrap max-w-2xl mx-auto">
            {[
              { label: `General Repair (${(shopTypes.general_repair || 0).toLocaleString()})`, type: "general_repair" },
              { label: `Tire Shops (${(shopTypes.tire_shop || 0).toLocaleString()})`, type: "tire_shop" },
              { label: `Body Shops (${(shopTypes.body_shop || 0).toLocaleString()})`, type: "body_shop" },
              { label: `Quick Lube (${(shopTypes.quick_lube || 0).toLocaleString()})`, type: "quick_lube" },
            ].map((f) => (
              <Link key={f.type} href={`/shops?type=${f.type}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{f.label}</Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center mt-12">
            {[{ value: unified.length.toLocaleString(), label: "Shops" }, { value: String(statesWithCounts.filter(s => s.count > 0).length), label: "States" }, { value: "Free", label: "& Updated" }, { value: "GPS", label: "Verified" }].map((s) => (
              <div key={s.label}><p className="font-[Cabin] text-2xl font-bold text-white">{s.value}</p><p className="text-white/50 text-xs mt-0.5">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY STATE */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-6">Browse by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {statesWithCounts.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#E67E22] hover:shadow-sm transition">
              <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#E67E22] transition">{s.name}</p>
              <p className="text-gray-400 text-xs">{s.count.toLocaleString()} shops</p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] text-center mb-8">Why MechanicSeeker</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "\u{1F50D}", title: "Find Trusted Shops", desc: "51,000+ verified auto repair shops with real addresses and phone numbers." },
            { icon: "\u{1F527}", title: "Service Details", desc: "See what each shop specializes in \u2014 brakes, tires, transmission, body work, and more." },
            { icon: "\u{1F3E2}", title: "Chain or Independent", desc: "Compare national chains like Jiffy Lube and Midas with trusted local independents." },
            { icon: "\u{1F4B0}", title: "Free Forever", desc: "No login. No account. No fees. Just find your mechanic and go." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
              <p className="text-2xl mb-2">{f.icon}</p>
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMIT */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-2">Know a shop we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete auto repair directory in America.</p>
          <a href="mailto:hello@mechanicseeker.com?subject=New%20Shop%20Submission" className="bg-[#E67E22] hover:bg-[#d35400] text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Shop</a>
        </div>
      </section>
    </div>
  );
}
