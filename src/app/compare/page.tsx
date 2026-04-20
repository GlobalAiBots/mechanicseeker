import Link from "next/link";
import { comparisons } from "@/data/comparisons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Repair Comparisons — Dealer vs Independent, DIY vs Mechanic | MechanicSeeker",
  description: "Honest head-to-head comparisons for car owners. Dealer vs independent mechanic, synthetic vs conventional oil, OEM vs aftermarket, DIY vs pro, national chain vs local shop.",
  alternates: { canonical: "https://www.mechanicseeker.com/compare" },
  openGraph: { title: "Auto Repair Comparisons", description: "Side-by-side comparisons to help car owners make smart repair decisions.", url: "https://www.mechanicseeker.com/compare", siteName: "MechanicSeeker" },
};

export default function CompareIndexPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://www.mechanicseeker.com/compare" },
    ],
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span>
          <span className="text-[#1A1A1A] font-medium">Compare</span>
        </nav>

        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Auto Repair Comparisons</h1>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl">
          Two options, one honest answer. Side-by-side breakdowns of the decisions every car owner faces — with real costs, clear winners, and no sales pressure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisons.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
              <div className="px-6 py-3 text-white text-xs font-bold uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #F39C12, #E67E22)' }}>
                {c.subject}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl mb-3 group-hover:text-[#E67E22] transition">{c.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{c.metaDescription}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#1A1A1A] font-bold">{c.productA.name}</span>
                    <span className="text-gray-400">vs</span>
                    <span className="text-[#1A1A1A] font-bold">{c.productB.name}</span>
                  </div>
                  <span className="text-[#E67E22] font-bold group-hover:underline">Read &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">How we pick winners</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Every comparison follows the same evaluation: real cost, convenience, safety, warranty implications, and what credible sources (Consumer Reports, AAA, FTC, Magnuson-Moss Warranty Act) actually say.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            When one option clearly wins, we say so. When it genuinely depends on your situation — car age, mileage, warranty status, comfort with tools — we spell out exactly which driver picks which option.
          </p>
        </section>
      </div>
    </div>
  );
}
