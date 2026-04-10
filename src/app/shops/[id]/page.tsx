import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, getShopById, stateList, serviceLabels } from "@/data/all-mechanics";
import ShopMapWrapper from "@/components/ShopMapWrapper";
import type { Metadata } from "next";

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
      </div>
    </div>
  );
}
