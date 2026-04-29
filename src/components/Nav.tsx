"use client";

import Link from "next/link";
import { useState } from "react";
import StatesDropdown from "./StatesDropdown";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const SearchIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-[Cabin]">
          <span className="text-2xl">{"🔧"}</span>
          <span className="text-[#1A1A1A]">Mechanic<span className="text-[#E67E22]">Seeker</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          <StatesDropdown />
          <Link href="/map" className="text-gray-500 hover:text-[#2C3E50] transition">Map</Link>
          <Link href="/compare" className="text-gray-500 hover:text-[#2C3E50] transition">Compare</Link>
          <Link href="/truck-upgrades" className="text-gray-500 hover:text-[#2C3E50] transition">Truck Upgrades</Link>
          <Link href="/classic-restoration" className="text-gray-500 hover:text-[#2C3E50] transition">Classic Restoration</Link>
          <Link href="/blog" className="text-gray-500 hover:text-[#2C3E50] transition">Blog</Link>
          <Link href="/about" className="text-gray-500 hover:text-[#2C3E50] transition">About</Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/search" aria-label="Search" className="text-gray-500 hover:text-[#2C3E50] transition">
            {SearchIcon}
          </Link>
          <Link href="/for-businesses" className="text-[#E67E22] font-bold hover:text-[#d35400] transition">
            For Businesses
          </Link>
        </div>

        <button
          className="md:hidden text-[#1A1A1A] text-2xl leading-none px-3 py-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mechanic-mobile-drawer"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-black/40 z-40 cursor-default"
          onClick={close}
        />
      )}

      {open && (
        <div
          id="mechanic-mobile-drawer"
          className="md:hidden absolute left-0 right-0 top-14 bg-white border-b border-gray-200 shadow-xl z-50"
        >
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col text-sm font-medium">
            <div className="py-3 border-b border-gray-100">
              <StatesDropdown />
            </div>
            <Link href="/map" onClick={close} className="block text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">Map</Link>
            <Link href="/compare" onClick={close} className="block text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">Compare</Link>
            <Link href="/truck-upgrades" onClick={close} className="block text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">Truck Upgrades</Link>
            <Link href="/classic-restoration" onClick={close} className="block text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">Classic Restoration</Link>
            <Link href="/blog" onClick={close} className="block text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">Blog</Link>
            <Link href="/about" onClick={close} className="block text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">About</Link>
            <Link href="/search" onClick={close} aria-label="Search" className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#2C3E50] transition py-3 border-b border-gray-100">
              {SearchIcon}
              <span>Search</span>
            </Link>
            <Link href="/for-businesses" onClick={close} className="block bg-[#E67E22] hover:bg-[#d35400] text-white font-bold transition py-3 mt-3 mb-1 text-center rounded-lg">
              For Businesses
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
