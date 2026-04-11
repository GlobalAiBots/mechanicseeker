"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { unified, stateList } from "@/data/all-mechanics";

const ShopMap = dynamic(() => import("@/components/ShopMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 500 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

const mapShops = unified.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, city: s.city || "" }));

export default function MapPage() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"shops" | "name">("shops");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of unified) map[s.state] = (map[s.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(() =>
    stateList.map(s => ({ ...s, count: stateCounts[s.code] || 0 })),
  [stateCounts]);

  const displayed = useMemo(() => {
    let list = statesWithCounts;
    if (filter) list = list.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
    return sortBy === "shops" ? [...list].sort((a, b) => b.count - a.count) : [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [statesWithCounts, filter, sortBy]);

  const filteredShops = useMemo(() => {
    if (!filter) return mapShops;
    const q = filter.toLowerCase();
    const matchingCodes = stateList.filter(s => s.name.toLowerCase().includes(q)).map(s => s.code);
    if (matchingCodes.length > 0) return mapShops.filter(s => {
      const shop = unified.find(u => u.id === s.id);
      return shop && matchingCodes.includes(shop.state);
    });
    return mapShops.filter(s => s.name.toLowerCase().includes(q) || (s.city && s.city.toLowerCase().includes(q)));
  }, [filter]);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">US Auto Repair Shop Map</h1>
        <p className="text-gray-500 mb-4">{unified.length.toLocaleString()}+ shops across {statesWithCounts.filter(s => s.count > 0).length} states. Click a marker to explore.</p>

        <div className="mb-4">
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter by state or city..." className="w-full max-w-md px-4 py-3 rounded-xl bg-white border border-gray-200 text-[#1A1A1A] outline-none focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 transition text-sm" />
          {filter && <p className="text-xs text-gray-400 mt-2">Showing {filteredShops.length.toLocaleString()} of {mapShops.length.toLocaleString()} shops</p>}
        </div>

        <ShopMap shops={filteredShops} height="500px" />

        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A]">All States</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setSortBy("shops")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "shops" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500"}`}>Most Shops</button>
            <button onClick={() => setSortBy("name")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "name" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500"}`}>A-Z</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {displayed.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#E67E22] hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-[#E67E22]">
              <div className="flex items-start justify-between">
                <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#E67E22] transition">{s.name}</p>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{s.code}</span>
              </div>
              <span className="inline-block mt-1 text-xs font-semibold bg-[#E67E22]/10 text-[#E67E22] px-2 py-0.5 rounded">{s.count.toLocaleString()} shops</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
