"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";

export default function StatePage({ params }: { params: { state: string } }) {
  const stateInfo = stateList.find((s) => s.slug === params.state);
  const shops = useMemo(() => stateInfo ? unified.filter((s) => s.state === stateInfo.code) : [], [stateInfo]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    shops.forEach((s) => { const c = s.city?.trim(); if (c) m[c] = (m[c] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [shops]);

  const filtered = selectedCity ? shops.filter((s) => s.city?.trim() === selectedCity) : shops;

  if (!stateInfo) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">State Not Found</h1><Link href="/" className="text-[#E67E22] hover:underline">Back to Home</Link></div>;

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4" style={{ background: "#FAF8F5" }}>
        <p className="text-[#E67E22] text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{stateInfo.name} Auto Repair</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-[#1A1A1A]">Auto Repair Shops in {stateInfo.name}</h1>
        <p className="text-gray-500 mt-4">{shops.length.toLocaleString()} shops. Mechanics, tire shops, body shops, and more.</p>
      </section>

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 20).map(([city, count]) => (
              <button key={city} onClick={() => { setSelectedCity(city === selectedCity ? null : city); document.getElementById("shop-list")?.scrollIntoView({ behavior: "smooth" }); }} className={`text-left bg-white border rounded-lg p-3 hover:border-[#E67E22] transition cursor-pointer ${selectedCity === city ? "border-[#E67E22] bg-orange-50 ring-2 ring-[#E67E22]" : "border-gray-200"}`}>
                <p className="font-bold text-[#1A1A1A] text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} shop{count !== 1 ? "s" : ""}</p>
              </button>
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
    </div>
  );
}
