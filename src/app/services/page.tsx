import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Repair Services: Cost Guides & DIY Tips | MechanicSeeker",
  description:
    "Explore common auto repair services with honest cost breakdowns, DIY difficulty ratings, and advice on when to see a professional mechanic.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/services",
  },
};

const services = [
  { title: "Oil Change", slug: "oil-change", cost: "$30-75", icon: "🛢️", description: "Routine oil and filter replacement to keep your engine running smoothly." },
  { title: "Brake Repair", slug: "brake-repair", cost: "$150-400", icon: "🛑", description: "Brake pad and rotor replacement, caliper service, and brake fluid flushes." },
  { title: "Tire Rotation", slug: "tire-rotation", cost: "$20-50", icon: "🛞", description: "Even out tire wear and extend the life of your tires with regular rotations." },
  { title: "Transmission Repair", slug: "transmission", cost: "$300-3,500+", icon: "⚙️", description: "Fluid changes, solenoid replacement, and full transmission rebuilds." },
  { title: "AC Repair", slug: "ac-repair", cost: "$100-900", icon: "❄️", description: "Refrigerant recharge, compressor replacement, and leak diagnosis." },
  { title: "Check Engine Light", slug: "check-engine-light", cost: "$100-200", icon: "🔔", description: "Diagnostic scanning, code reading, and identifying the root cause." },
  { title: "Battery Replacement", slug: "battery-replacement", cost: "$50-200", icon: "🔋", description: "Testing, replacement, and terminal cleaning for reliable starting." },
  { title: "Wheel Alignment", slug: "alignment", cost: "$75-200", icon: "🎯", description: "Correct camber, caster, and toe angles for even tire wear and straight tracking." },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.mechanicseeker.com/services" },
  ],
};

export default function ServicesIndex() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &raquo; <span className="text-gray-700">Services</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Auto Repair Services
      </h1>
      <p className="text-[#1A1A1A] leading-relaxed mb-10">
        Understanding what auto repairs cost and when you need them helps you budget
        wisely and avoid overpaying. Browse our service guides below for honest cost
        breakdowns, DIY tips, and advice on when to see a professional mechanic.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="border border-gray-200 rounded-lg p-5 hover:border-[#E67E22] hover:shadow-md transition-all bg-[#FAF8F5]"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden="true">
                {s.icon}
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#2C3E50] font-[Cabin]">
                  {s.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                <p className="text-sm font-semibold text-[#E67E22] mt-2">
                  Typical cost: {s.cost}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Need a Mechanic?
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted shops in your area.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#E67E22] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#d35400] transition-colors"
        >
          Find a Shop Near You &rarr;
        </Link>
      </div>
    </main>
  );
}
