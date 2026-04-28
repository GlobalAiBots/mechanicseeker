"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ShopMap = dynamic(() => import("@/components/ShopMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface ClientShop { id: string; name: string; lat: number; lng: number; city: string; state: string; brand?: string; }

export default function CityClientView({ shops, center }: { shops: ClientShop[]; center: [number, number] }) {
  const [search, setSearch] = useState("");
  const filtered = search.length >= 2
    ? shops.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : shops;
  const mapShops = shops.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, city: s.city }));

  return (
    <>
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
    </>
  );
}
