import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, getShopById, stateList, serviceLabels } from "@/data/all-mechanics";
import ShopMapWrapper from "@/components/ShopMapWrapper";
import FeaturedArticle from "@/components/FeaturedArticle";
import cityPagesData from "@/data/city-pages.json";
import type { Metadata } from "next";

const allCities = (cityPagesData as { state: string; stateSlug: string; city: string; citySlug: string; count: number }[]);

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  // Pre-build top 1000 shops (rest generated on-demand via ISR)
  return unified.slice(0, 1000).map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const shop = unified.find((s) => s.id === id);
  if (!shop) return { title: "Shop Not Found" };
  const stateName = stateList.find((s) => s.code === shop.state)?.name || shop.state;
  return {
    title: `${shop.name} \u2014 Auto Repair in ${shop.city ? shop.city + ", " : ""}${stateName} | MechanicSeeker`,
    description: `${shop.name} in ${shop.city ? shop.city + ", " : ""}${stateName}. Services, hours, phone, and directions. Free on MechanicSeeker.`,
    alternates: { canonical: `https://mechanicseeker.com/shops/${shop.id}` },
  };
}

export default async function ShopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shop = getShopById(id);
  if (!shop) notFound();

  const stateName = stateList.find((s) => s.code === shop.state)?.name || shop.state;
  const stateSlug = stateList.find((s) => s.code === shop.state)?.slug || "";

  const jsonLd = {
    "@context": "https://schema.org", "@type": "AutoRepair",
    name: shop.name,
    address: { "@type": "PostalAddress", streetAddress: shop.address, addressLocality: shop.city, addressRegion: shop.state, postalCode: shop.zip, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: shop.lat, longitude: shop.lng },
    ...(shop.phone && { telephone: shop.phone }),
    ...(shop.website && { url: shop.website }),
    ...(shop.hours && { openingHours: shop.hours }),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com" },
          { "@type": "ListItem", position: 2, name: stateName, item: `https://mechanicseeker.com/${stateSlug}` },
          ...(shop.city ? [{ "@type": "ListItem", position: 3, name: shop.city }] : []),
          { "@type": "ListItem", position: shop.city ? 4 : 3, name: shop.name },
        ],
      }) }} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span>
          {stateSlug && <><Link href={`/${stateSlug}`} className="hover:text-[#E67E22] transition">{stateName}</Link><span>/</span></>}
          <span className="text-[#1A1A1A] font-medium">{shop.name}</span>
        </nav>

        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A]">{shop.name}</h1>
            <p className="text-gray-500 mt-1">{shop.address ? `${shop.address}, ` : ""}{shop.city ? `${shop.city}, ` : ""}{stateName}{shop.zip ? ` ${shop.zip}` : ""}</p>
          </div>
          {shop.brand ? (
            <span className="bg-[#E67E22]/10 text-[#E67E22] text-xs font-bold px-3 py-1 rounded-full">{shop.brand}</span>
          ) : (
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">Independent Shop</span>
          )}
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-3 mb-8">
          {shop.phone && <a href={`tel:${shop.phone}`} className="inline-flex items-center gap-2 bg-[#E67E22] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d35400] transition">{"📞"} {shop.phone}</a>}
          {shop.website && <a href={shop.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#2C3E50] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1A2332] transition">{"🌐"} Website</a>}
          {shop.hours && <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#1A1A1A] px-5 py-2.5 rounded-lg text-sm">{"🕐"} {shop.hours}</span>}
        </div>

        {/* Map */}
        <div className="mb-8">
          <ShopMapWrapper shops={[{ id: shop.id, name: shop.name, lat: shop.lat, lng: shop.lng, city: shop.city, state: shop.state }]} center={[shop.lat, shop.lng]} zoom={15} height="350px" />
          <p className="text-center mt-2 text-xs text-gray-400">
            GPS: {shop.lat.toFixed(4)}, {shop.lng.toFixed(4)} &middot;{" "}
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`} target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Get Directions</a>
          </p>
        </div>

        {/* Services */}
        {shop.services.length > 0 && (
          <section className="mb-8">
            <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {shop.services.map((svc) => {
                const info = serviceLabels[svc] || { icon: "\u2705", label: svc.replace(/_/g, " ") };
                return (
                  <div key={svc} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-lg">{info.icon}</span>
                    <span className="text-sm font-medium text-[#1A1A1A] capitalize">{info.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {/* About This Shop — unique content */}
        <section className="mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">About {shop.name}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {shop.name} is {shop.brand ? `a ${shop.brand} location` : "an independent auto repair shop"} in {shop.city ? `${shop.city}, ` : ""}{stateName}. {shop.services.length > 0 ? `Services include ${shop.services.slice(0, 4).map(s => (serviceLabels[s]?.label || s.replace(/_/g, " ")).toLowerCase()).join(", ")}.` : ""} {shop.phone ? `Call ${shop.phone} for an appointment.` : ""}
            </p>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="font-[Cabin] font-bold text-[#E67E22] mb-3">What to Know</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Always get a written estimate before authorizing any work.</li>
              <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Ask about warranty coverage on parts and labor.</li>
              <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> {stateName} requires shops to provide itemized invoices for all repairs.</li>
              <li className="flex items-start gap-2"><span className="text-[#E67E22] mt-0.5">&#10003;</span> Read our <Link href="/blog/how-to-find-trustworthy-mechanic" className="text-[#E67E22] hover:underline">guide to finding a trustworthy mechanic</Link>.</li>
            </ul>
          </div>
        </section>

        {/* Auto Repair in State */}
        {(() => {
          const stateCount = unified.filter(s => s.state === shop.state).length;
          return (
            <section className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Auto Repair in {stateName}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {stateName} has {stateCount.toLocaleString()} auto repair shops on MechanicSeeker, including {shop.brand ? `${shop.brand} and other` : ""} independent mechanics, tire shops, and body shops. {stateSlug && <Link href={`/${stateSlug}`} className="text-[#E67E22] hover:underline">Browse all {stateCount.toLocaleString()} shops in {stateName}</Link>}.
                </p>
              </div>
            </section>
          );
        })()}

        {/* FAQ */}
        <section className="mb-8">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: `Where is ${shop.name}?`, acceptedAnswer: { "@type": "Answer", text: `${shop.name} is at ${shop.address ? shop.address + ", " : ""}${shop.city ? shop.city + ", " : ""}${stateName}${shop.zip ? " " + shop.zip : ""}.` } },
            { "@type": "Question", name: `What services does ${shop.name} offer?`, acceptedAnswer: { "@type": "Answer", text: shop.services.length > 0 ? `Services include ${shop.services.map(s => (serviceLabels[s]?.label || s.replace(/_/g, " "))).join(", ")}.` : "Contact the shop directly for a list of services." } },
            { "@type": "Question", name: `How do I contact ${shop.name}?`, acceptedAnswer: { "@type": "Answer", text: shop.phone ? `Call ${shop.phone} or use the Get Directions link above.` : "Use the Get Directions link above to find the shop." } },
          ] }) }} />
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: `Where is ${shop.name}?`, a: `${shop.name} is at ${shop.address ? shop.address + ", " : ""}${shop.city ? shop.city + ", " : ""}${stateName}${shop.zip ? " " + shop.zip : ""}.` },
              { q: `What services does ${shop.name} offer?`, a: shop.services.length > 0 ? `Services include ${shop.services.map(s => (serviceLabels[s]?.label || s.replace(/_/g, " "))).join(", ")}.` : "Contact the shop directly for a list of services." },
              { q: `How do I contact ${shop.name}?`, a: shop.phone ? `Call ${shop.phone} or use the Get Directions link above.` : "Use the Get Directions link above to find the shop." },
            ].map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#E67E22] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-8">
          <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Related Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/blog/how-to-find-trustworthy-mechanic", title: "Finding a Mechanic", desc: "How to find one you can trust" },
              { href: "/blog/car-maintenance-schedule", title: "Maintenance Schedule", desc: "Keep your car running right" },
              { href: "/blog/how-much-does-a-brake-job-cost", title: "Brake Job Costs", desc: "What to expect and how to save" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <p className="font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition text-sm">{g.title}</p>
                <p className="text-gray-400 text-xs mt-1">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Nearby Shops */}
        {(() => {
          const nearbyData = (() => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              const data = require("@/data/nearby.json");
              return (data[shop.id] || []).slice(0, 5);
            } catch { return []; }
          })();
          if (nearbyData.length === 0) return null;
          return (
            <section className="mb-8">
              <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Nearby Auto Repair Shops</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nearbyData.map((n: { id: string; name: string; distance: number; city: string; state: string }) => (
                  <Link key={n.id} href={`/shops/${n.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-[#E67E22]">
                    <p className="font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition text-sm">{n.name}</p>
                    <p className="text-gray-500 text-xs">{n.city}{n.city && n.state ? ", " : ""}{n.state} &middot; {n.distance} mi</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        <FeaturedArticle listingSlug={shop.id} />

        {/* Nearby Cities */}
        {shop.city && (() => {
          const nearbyCities = allCities.filter(c => c.state === shop.state && c.city !== shop.city).slice(0, 6);
          if (nearbyCities.length === 0) return null;
          return (
            <section className="mb-8">
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">Nearby Cities with Auto Repair</h3>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map(c => (
                  <Link key={c.citySlug} href={`/cities/${c.citySlug}-${shop.state.toLowerCase()}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#E67E22] hover:border-[#E67E22] transition">
                    {c.city}, {shop.state}
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* People Also Search For */}
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3 text-sm">People Also Search For</h3>
          <div className="flex flex-wrap gap-2">
            {(() => {
              const cityPage = allCities.find(c => c.state === shop.state && c.city === shop.city);
              if (!cityPage) return null;
              return <>
                <Link href={`/cities/${cityPage.citySlug}-${shop.state.toLowerCase()}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#E67E22] hover:border-[#E67E22] transition">Auto repair near {shop.city}</Link>
                <Link href={`/cities/${cityPage.citySlug}-${shop.state.toLowerCase()}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#E67E22] hover:border-[#E67E22] transition">Oil change near {shop.city}</Link>
              </>;
            })()}
            {stateSlug && <Link href={`/${stateSlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#E67E22] hover:border-[#E67E22] transition">Mechanics in {stateName}</Link>}
            {shop.brand && <Link href={`/brand/${shop.brand.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#E67E22] hover:border-[#E67E22] transition">{shop.brand} near {shop.city || stateName}</Link>}
            <Link href="/blog/how-to-find-trustworthy-mechanic" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-[#E67E22] hover:border-[#E67E22] transition">How to find a good mechanic</Link>
          </div>
        </section>

        {/* Claim Listing CTA */}
        <section className="bg-[#F0F4F8] rounded-xl p-6 border border-[#D4D8DD] mb-8">
          <h3 className="font-[Cabin] text-lg font-bold text-[#1A1A1A] mb-2">Own this shop?</h3>
          <p className="text-gray-500 text-sm mb-4">Claim your free listing to update your hours, services, contact info, and respond to customers.</p>
          <Link href={`/claim?shop=${encodeURIComponent(shop.id)}&name=${encodeURIComponent(shop.name)}`} className="inline-block bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-6 py-3 rounded-lg transition text-sm">
            Claim This Listing &mdash; It&apos;s Free
          </Link>
        </section>
      </div>
    </div>
  );
}
