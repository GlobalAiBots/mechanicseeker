"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

export default function SearchPage() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  const results = useMemo(() => {
    const q = normalize(query);
    if (q.length < 2) return { shops: [], states: [] };

    const shops = unified
      .filter(s => normalize(s.name).includes(q) || normalize(s.city).includes(q))
      .slice(0, 30);
    const states = stateList.filter(s => normalize(s.name).includes(q));

    return { shops, states };
  }, [query]);

  const total = results.shops.length + results.states.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
        Search MechanicSeeker
      </h1>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search auto repair shops, cities, or states..."
          className="w-full px-5 py-4 rounded-xl bg-white border-2 border-gray-200 focus:border-[#2C3E50] outline-none transition text-sm"
          style={{ color: "#1A1A1A" }}
          autoFocus
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {query.length >= 2 && (
        <p className="text-gray-500 text-sm mb-6">
          {total} result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.states.length > 0 && (
        <section className="mb-8">
          <h2 className="font-[Cabin] font-bold text-lg mb-3" style={{ color: "#1A1A1A" }}>States</h2>
          <div className="flex flex-wrap gap-2">
            {results.states.map(s => (
              <Link
                key={s.code}
                href={`/${s.slug}`}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-[#2C3E50] hover:shadow-sm transition"
              >
                <span className="font-bold" style={{ color: "#1A1A1A" }}>Auto Repair in {s.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.shops.length > 0 && (
        <section className="mb-8">
          <h2 className="font-[Cabin] font-bold text-lg mb-3" style={{ color: "#1A1A1A" }}>
            Auto Repair Shops ({results.shops.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {results.shops.map(s => (
              <Link
                key={s.id}
                href={`/shops/${s.id}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-[#2C3E50] hover:shadow-sm transition"
              >
                <p className="font-bold text-sm truncate group-hover:text-[#E67E22] transition" style={{ color: "#1A1A1A" }}>
                  {s.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {s.city}{s.city ? ", " : ""}{s.state}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {query.length >= 2 && total === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-gray-500 text-sm">Try searching by city name, state, or shop name.</p>
        </div>
      )}
    </div>
  );
}
