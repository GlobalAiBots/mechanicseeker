"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";

export default function ShopsPage() {
  const [stateFilter, setStateFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let results = unified;
    if (stateFilter) results = results.filter((s) => s.state === stateFilter);
    if (search.length >= 2) {
      const q = search.toLowerCase();
      results = results.filter((s) => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q));
    }
    return results.slice(0, 100);
  }, [stateFilter, search]);

  const stateCodes = useMemo(() => {
    const codes = new Set(unified.map((s) => s.state));
    return stateList.filter((s) => codes.has(s.code));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">Browse Auto Repair Shops</h1>
      <div className="flex flex-wrap gap-3 mb-8">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or city..." className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition" />
        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="">All States</option>
          {stateCodes.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>
      <p className="text-gray-400 text-sm mb-4">Showing {filtered.length}{filtered.length === 100 ? "+" : ""} of {unified.length.toLocaleString()} shops</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((s) => (
          <Link key={s.id} href={`/shops/${s.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition">{s.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{s.city ? `${s.city}, ` : ""}{s.state}</p>
            {s.brand && <span className="inline-block mt-1 text-xs bg-[#E67E22]/10 text-[#E67E22] px-2 py-0.5 rounded">{s.brand}</span>}
            <span className="text-sm font-semibold text-[#E67E22] mt-2 inline-block">View Details &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
