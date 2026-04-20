import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise With MechanicSeeker — Reach Car Owners Nationwide",
  description: "Advertise on MechanicSeeker. Reach car owners actively searching for mechanics, parts, and repair guidance. Featured listings, sponsored posts, and banner ads across 51,000+ shop pages.",
  alternates: { canonical: "https://www.mechanicseeker.com/advertise" },
  openGraph: {
    title: "Advertise With MechanicSeeker",
    description: "Reach car owners actively searching for mechanics, parts, and repair advice.",
    url: "https://www.mechanicseeker.com/advertise",
    siteName: "MechanicSeeker",
  },
};

export default function AdvertisePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
      { "@type": "ListItem", position: 2, name: "Advertise", item: "https://www.mechanicseeker.com/advertise" },
    ],
  };

  const mailto = "mailto:hello@mechanicseeker.com?subject=" + encodeURIComponent("Advertising Inquiry — MechanicSeeker") + "&body=" + encodeURIComponent("Hi MechanicSeeker team,\n\nI'd like to learn more about advertising options. Here's a quick intro:\n\n- Company: \n- Product / Service: \n- Target audience: \n- Budget range: \n- Format of interest (featured listing / sponsored post / banner): \n\nThanks!");

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span>
          <span className="text-[#1A1A1A] font-medium">Advertise</span>
        </nav>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 mb-10">
          <p className="text-[#E67E22] text-xs font-bold tracking-widest uppercase mb-3">Partnerships</p>
          <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">Advertise With MechanicSeeker</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-6">
            Reach car owners actively searching for mechanics, parts, DIY guidance, and real repair costs. MechanicSeeker is the most complete auto-repair directory in America, spanning 51,000+ shop pages.
          </p>
          <a href={mailto} className="inline-block bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start a Conversation</a>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { stat: "51,000+", label: "Repair Shops" },
            { stat: "50", label: "States Covered" },
            { stat: "30+", label: "Service & Cost Guides" },
            { stat: "15+", label: "Long-Form Guides" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <p className="font-[Cabin] text-3xl font-bold text-[#E67E22]">{s.stat}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Who You&apos;ll Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <p className="font-bold text-[#1A1A1A] mb-2">Audience profile</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Car owners across all demographics, ages 20-70</li>
                <li>&bull; Broad national reach across all 50 states</li>
                <li>&bull; Mix of DIYers, budget-conscious owners, and dealer-hesitant drivers</li>
                <li>&bull; Readers of cost guides, service explainers, and comparison content</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A] mb-2">Commercial intent</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Researching repair costs before booking a shop</li>
                <li>&bull; Shopping for parts, tools, fluids, and accessories</li>
                <li>&bull; Comparing extended warranties and maintenance plans</li>
                <li>&bull; Looking for trustworthy local mechanics (high local-SEO intent)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-5">Sponsorship Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Featured Listing",
                price: "$49-199/mo",
                desc: "Pin your shop to the top of relevant state, city, and service category pages. Best for independent shops, tire chains, and national service brands.",
              },
              {
                title: "Sponsored Post",
                price: "$299-999",
                desc: "A dedicated long-form article with your brand integrated naturally. Strong for parts brands, warranty providers, and diagnostic-tool companies.",
              },
              {
                title: "Banner Ad",
                price: "$299-799/mo",
                desc: "Display placement across high-traffic service and cost pages. 300x250 and responsive units. Monthly or quarterly commitments.",
              },
            ].map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
                <p className="font-[Cabin] font-bold text-[#1A1A1A] text-xl mb-1">{opt.title}</p>
                <p className="text-[#E67E22] font-bold text-lg mb-3">{opt.price}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{opt.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 italic mt-3">Pricing is a starting range. Custom packages and multi-site bundles (PierSeeker, RampSeeker, MarinaSeeker, BarkSeeker) available.</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Media Kit</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Current traffic numbers, top-performing content, category breakdowns, and example ad placements are available in our media kit. We send it on request so we can tailor it to your vertical.
          </p>
          <a href={mailto} className="inline-block bg-[#2D6A4F] hover:bg-[#245c42] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Request Media Kit</a>
        </section>

        <section className="bg-[#E67E22]/5 border-2 border-[#E67E22]/30 rounded-2xl p-6 md:p-8">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Let&apos;s Talk</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Email <a href={mailto} className="text-[#E67E22] font-semibold hover:underline">hello@mechanicseeker.com</a> with a quick note about your product and target audience. We&apos;ll reply within two business days with recommended placements and current availability.
          </p>
          <a href={mailto} className="inline-block bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Email Us</a>
        </section>
      </div>
    </div>
  );
}
