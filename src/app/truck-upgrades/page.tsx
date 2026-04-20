import Link from "next/link";
import type { Metadata } from "next";
import { KSP_LINKS, KSP_COUPON_CODE, KSP_DISCLOSURE, KSP_BANNERS } from "@/lib/ksp-affiliate";

export const metadata: Metadata = {
  title: "Truck & SUV Performance Upgrades — Parts Guide (2026) | MechanicSeeker",
  description:
    "Truck and SUV performance upgrades guide for 2026. Leveling kits, wheel spacers, control arms, and lug nuts — honest picks with DIY install notes and pricing.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/truck-upgrades",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.mechanicseeker.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Truck Upgrades",
      item: "https://www.mechanicseeker.com/truck-upgrades",
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Truck & SUV Performance Upgrades — Parts Guide (2026)",
  datePublished: "2026-04-20",
  author: {
    "@type": "Organization",
    name: "MechanicSeeker",
  },
  publisher: {
    "@type": "Organization",
    name: "MechanicSeeker",
    url: "https://www.mechanicseeker.com",
  },
};

type Product = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  href: string;
};

const products: Product[] = [
  {
    name: "Leveling Lift Kits",
    price: "$80 – $200",
    desc:
      "Raise the front of your truck 1.5\u201D\u20133\u201D to match rear stance and clear slightly larger tires.",
    features: [
      "Forged strut-top and coil-spring spacers",
      "Vehicle-specific fitment for Silverado, F-150, Tacoma, Titan, RAM",
      "3\u20135 hours DIY install with basic tools",
    ],
    href: KSP_LINKS.levelingKits,
  },
  {
    name: "Wheel Spacers",
    price: "$60 – $120",
    desc:
      "Hub-centric forged 6061-T6 aluminum spacers for wider stance, tire clearance, and fitment correction.",
    features: [
      "Forged 6061-T6 aluminum construction",
      "Hub-centric design eliminates vibration",
      "Grade 10.9 pressed studs, lifetime structural warranty",
    ],
    href: KSP_LINKS.wheelSpacers,
  },
  {
    name: "Aluminum Upper Control Arms",
    price: "$150 – $300",
    desc:
      "Forged aluminum UCAs that correct ball joint angle after a leveling kit or lift for lasting alignment.",
    features: [
      "Forged 6061-T6 aluminum, lighter and stiffer than steel",
      "Upgraded ball joint with greater articulation",
      "Includes poly bushings and all mounting hardware",
    ],
    href: KSP_LINKS.aluminumControlArms,
  },
  {
    name: "Control Arms (Stamped Upgrade)",
    price: "$120 – $250",
    desc:
      "Heavy-duty replacement control arms for worn OEM components, built for street and light off-road use.",
    features: [
      "Direct bolt-in fitment for most platforms",
      "New bushings and hardware included",
      "Great value when alignment drifts or bushings fail",
    ],
    href: KSP_LINKS.controlArms,
  },
  {
    name: "Spike Lug Nuts",
    price: "$30 – $60",
    desc:
      "Conical spike lug nuts in black, chrome, and color options for an aggressive finished look.",
    features: [
      "Hardened steel with deep-socket compatibility",
      "Spline drive for theft deterrence (select sets)",
      "Fits standard truck and SUV thread patterns",
    ],
    href: KSP_LINKS.spikeLugNuts,
  },
];

const relatedGuides = [
  {
    title: "Best Leveling Lift Kits for Trucks (2026)",
    href: "/blog/best-leveling-lift-kits",
    blurb:
      "Sizing, DIY install time, total cost, and vehicle-specific fitment for the most common half-tons.",
  },
  {
    title: "Are Wheel Spacers Safe? Best Picks for Trucks & SUVs (2026)",
    href: "/blog/best-wheel-spacers",
    blurb:
      "Hub-centric vs lug-centric, forged vs cast, and exactly when spacers are the right call.",
  },
  {
    title: "When to Replace Upper Control Arms on a Lifted Truck",
    href: "/blog/upper-control-arm-upgrade",
    blurb:
      "Symptoms, when a leveling kit forces the upgrade, and forged aluminum vs stamped steel.",
  },
];

const compareLinks = [
  {
    title: "DIY vs Mechanic",
    href: "/compare/diy-vs-mechanic",
    blurb:
      "Which jobs are worth doing yourself and which are best left to a professional shop.",
  },
  {
    title: "OEM vs Aftermarket Parts",
    href: "/compare/oem-vs-aftermarket-parts",
    blurb:
      "The honest tradeoffs on warranty, cost, and quality between OEM and aftermarket.",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
      <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl mb-2">
        {product.name}
      </h3>
      <p className="font-extrabold text-[#E67E22] text-lg mb-3">
        {product.price}
      </p>
      <p className="text-gray-700 text-sm mb-4">{product.desc}</p>
      <ul className="space-y-1.5 mb-5">
        {product.features.map((f, i) => (
          <li
            key={i}
            className="text-[#1A1A1A] text-sm flex items-start gap-2"
          >
            <span className="text-[#E67E22] font-bold flex-shrink-0 mt-0.5">
              &#10003;
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-auto inline-block px-5 py-2.5 rounded-lg font-bold text-white text-center"
        style={{ background: "linear-gradient(135deg, #F39C12, #E67E22)" }}
      >
        Shop at KSP Performance &rarr;
      </a>
    </div>
  );
}

export default function TruckUpgradesHub() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Top mobile leaderboard ad */}
      <div className="mb-6 rounded-xl border border-[#E67E22]/40 bg-gradient-to-r from-[#fff8ef] to-white p-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={KSP_BANNERS.mobileLeaderboard320x50.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label="Shop KSP Performance"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={KSP_BANNERS.mobileLeaderboard320x50.src}
            width={KSP_BANNERS.mobileLeaderboard320x50.width}
            height={KSP_BANNERS.mobileLeaderboard320x50.height}
            alt="Shop KSP Performance"
          />
        </a>
        <p className="text-sm text-[#1A1A1A] font-semibold">
          Use code <span className="text-[#E67E22]">{KSP_COUPON_CODE}</span> for
          5% off &mdash; Free Shipping
        </p>
      </div>

      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">Truck Upgrades</span>
      </nav>

      {/* Hero */}
      <section className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
          Truck &amp; SUV Performance Upgrades
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
          Straightforward picks for leveling kits, wheel spacers, control
          arms, and lug nuts &mdash; the parts most truck and SUV owners
          actually want. Each product below is DIY-friendly, vehicle-specific,
          and backed by forged construction rather than the cast parts you
          find in big-box listings. We pair every recommendation with honest
          install-time estimates and total cost ranges so you can budget the
          whole job, not just the parts.
        </p>
      </section>

      {/* Promo banner */}
      <a
        href={KSP_LINKS.couponSitewide}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block mb-12 rounded-2xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-shadow"
        style={{ background: "linear-gradient(135deg, #F39C12, #E67E22)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-90">
              Exclusive Partner Offer
            </p>
            <p className="text-2xl md:text-3xl font-[Cabin] font-bold">
              Use code {KSP_COUPON_CODE} for 5% off at KSP Performance
            </p>
            <p className="text-sm md:text-base opacity-95 mt-1">
              Free shipping on every order. Applies sitewide.
            </p>
          </div>
          <span className="inline-block bg-white text-[#E67E22] font-bold px-6 py-3 rounded-lg whitespace-nowrap">
            Claim 5% Off &rarr;
          </span>
        </div>
      </a>

      {/* Product Grid + desktop sidebar ad */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-[1fr_270px] gap-8">
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 font-[Cabin]">
            Our Picks
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl">
            All five picks below come from KSP Performance, our paid partner
            for 2026. We selected them because they share the traits we care
            about most: forged construction, vehicle-specific fitment, and
            clear install documentation. Pricing listed is MSRP before the{" "}
            {KSP_COUPON_CODE} discount.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <a
              href={KSP_BANNERS.square250.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label="Shop KSP Performance"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={KSP_BANNERS.square250.src}
                width={KSP_BANNERS.square250.width}
                height={KSP_BANNERS.square250.height}
                alt="Shop KSP Performance"
                loading="lazy"
              />
            </a>
            <p className="text-xs text-gray-500 text-center mt-2">
              Code {KSP_COUPON_CODE} &middot; 5% off
            </p>
          </div>
        </aside>
      </section>

      {/* Related Guides */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 font-[Cabin]">
          Related Guides
        </h2>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Full-length deep dives on the products above, with sizing, install
          steps, and FAQs for common platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="block bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-[#E67E22] transition-all"
            >
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-lg mb-2">
                {g.title}
              </h3>
              <p className="text-gray-700 text-sm">{g.blurb}</p>
              <p className="text-[#E67E22] font-semibold text-sm mt-3">
                Read guide &rarr;
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Compare Cross-Links */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 font-[Cabin]">
          Compare &amp; Decide
        </h2>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Deciding whether to tackle an install yourself or trust the parts
          your mechanic recommends? These two comparison pages cover the
          most common questions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {compareLinks.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-[#E67E22] transition-all"
            >
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-lg mb-2">
                {c.title}
              </h3>
              <p className="text-gray-700 text-sm">{c.blurb}</p>
              <p className="text-[#E67E22] font-semibold text-sm mt-3">
                Compare &rarr;
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclosure footer */}
      <footer className="border-t border-gray-200 pt-6">
        <p className="text-xs text-gray-500 italic">{KSP_DISCLOSURE}</p>
      </footer>
    </main>
  );
}
