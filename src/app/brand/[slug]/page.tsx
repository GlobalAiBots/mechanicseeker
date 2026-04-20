"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import brandsData from "@/data/brands.json";

interface BrandState { code: string; name: string; slug: string; count: number; }
interface Brand { slug: string; title: string; brandName: string; description: string; totalCount: number; states: BrandState[]; }
const brands = brandsData as Brand[];

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const brand = useMemo(() => brands.find(b => b.slug === slug), [slug]);

  if (!brand) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-4">Brand Not Found</h1><Link href="/" className="text-[#E67E22] hover:underline">Back to Home</Link></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" }, { "@type": "ListItem", position: 2, name: brand.brandName, item: `https://www.mechanicseeker.com/brand/${slug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: `How many ${brand.brandName} locations are there?`, acceptedAnswer: { "@type": "Answer", text: `There are ${brand.totalCount} ${brand.brandName} locations across ${brand.states.length} states in the US.` } },
        { "@type": "Question", name: `Where is the nearest ${brand.brandName}?`, acceptedAnswer: { "@type": "Answer", text: `Browse MechanicSeeker by state to find the nearest ${brand.brandName} location with address, phone, and hours.` } },
        { "@type": "Question", name: `Is ${brand.brandName} a good choice for car repair?`, acceptedAnswer: { "@type": "Answer", text: `${brand.brandName} is a well-known national chain. Compare with independent shops in your area using MechanicSeeker to find the best fit for your needs and budget.` } },
      ] }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">{brand.brandName}</span>
      </nav>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A]">{brand.brandName} Locations</h1>
        <span className="bg-[#E67E22]/10 text-[#E67E22] text-sm font-bold px-3 py-1 rounded-full">{brand.totalCount} locations</span>
      </div>
      <p className="text-gray-500 mb-2">{brand.description}</p>
      <p className="text-gray-400 text-sm mb-8">Across {brand.states.length} states &middot; <Link href="/shops" className="text-[#E67E22] hover:underline">Find independent shops instead</Link></p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {brand.states.map(st => (
          <Link key={st.code} href={`/${st.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#E67E22] hover:shadow-sm transition">
            <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#E67E22] transition">{st.name}</p>
            <p className="text-gray-400 text-xs">{st.count} locations</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
