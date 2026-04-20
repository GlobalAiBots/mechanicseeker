import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Car AC Not Blowing Cold? Diagnosis & Cost | MechanicSeeker",
  description:
    "Car AC not working? Learn the most common causes, repair costs ($100-900), DIY recharge tips, and when to see a professional mechanic for AC diagnosis.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/services/ac-repair",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "AC Repair", item: "https://www.mechanicseeker.com/services/ac-repair" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is my car AC not blowing cold air?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common cause is low refrigerant due to a slow leak in the system. Other causes include a failed compressor, a clogged condenser, a faulty blend door actuator, a broken compressor clutch, or an electrical issue with the AC control module. A professional diagnostic typically identifies the root cause within 30 to 60 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How much does car AC repair cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AC repair costs depend on the issue. A simple refrigerant recharge costs $100 to $200. Leak repair runs $200 to $500 depending on the location. Compressor replacement is the most expensive common repair at $500 to $900 including parts and labor. A full AC system overhaul with compressor, condenser, and expansion valve can cost $1,000 to $1,500.",
      },
    },
    {
      "@type": "Question",
      name: "Can I recharge my car AC myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can perform a basic AC recharge using a DIY refrigerant kit for $30 to $50. These kits include a can of R-134a or R-1234yf refrigerant with a gauge and hose. However, DIY recharging only works if the system has a minor leak or has slowly lost charge over time. If the system is empty or the compressor is not engaging, professional diagnosis is needed to identify and fix the underlying problem.",
      },
    },
  ],
};

export default function ACRepairPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link>{" "}
        &raquo;{" "}
        <Link href="/services" className="hover:underline">Services</Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">AC Repair</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Car AC Not Blowing Cold? Diagnosis &amp; Cost
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $100&ndash;$900</span>
          <span><strong>Common Cause:</strong> Low refrigerant or compressor failure</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">Moderate (recharge only)</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Few things are more uncomfortable than climbing into a hot car and discovering the
          AC is blowing warm air. Your vehicle&apos;s air conditioning system is a sealed loop
          of refrigerant, a compressor, a condenser, an evaporator, and an expansion valve
          that work together to cool and dehumidify cabin air. When any component in this
          system fails or the refrigerant level drops, cooling performance suffers. The good
          news is that many AC problems have straightforward and affordable fixes when caught
          early.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Common Causes of AC Failure
        </h2>
        <p>
          Low refrigerant is the number one cause of weak or warm AC output. Refrigerant
          slowly escapes through aging O-rings, hose connections, and the compressor shaft
          seal. A system that was fully charged when new may lose enough refrigerant over
          several years to noticeably affect performance. A professional leak test using UV
          dye or an electronic sniffer pinpoints the leak location so it can be repaired
          before recharging.
        </p>
        <p>
          Compressor failure is the second most common and most expensive AC issue. The
          compressor is the heart of the system, pressurizing refrigerant to enable the
          cooling cycle. When it fails, you may hear grinding or squealing from the engine
          bay, or the compressor clutch may not engage at all. A clogged or damaged condenser
          &mdash; the radiator-like component at the front of the vehicle &mdash; can also
          cause poor cooling by preventing heat dissipation.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          AC Repair Cost Breakdown
        </h2>
        <p>
          A refrigerant recharge at a shop costs $100 to $200 and takes about 30 minutes.
          This is the simplest fix and works when the system has a slow leak or has gradually
          lost charge. If a leak needs repair, expect $200 to $500 depending on the location
          &mdash; an O-ring replacement costs far less than replacing a leaking condenser or
          evaporator.
        </p>
        <p>
          Compressor replacement is the big-ticket AC repair at $500 to $900 for most
          vehicles. This includes the compressor, a new receiver-drier, fresh refrigerant oil,
          and a full system recharge. Luxury and European vehicles can exceed $1,200 for a
          compressor job. A complete AC system overhaul replacing the compressor, condenser,
          expansion valve, and receiver-drier runs $1,000 to $1,500 at most shops.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          DIY AC Recharge
        </h2>
        <p>
          A DIY recharge kit is the most accessible at-home AC fix. These kits cost $30 to
          $50 and include a can of refrigerant, a pressure gauge, and a hose that connects to
          the low-pressure service port. You add refrigerant while monitoring the pressure
          gauge until the system reaches the correct level. This works well for systems that
          have slowly lost a partial charge over time.
        </p>
        <p>
          Tools and supplies for DIY AC maintenance:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=AC+recharge+kit+R134a&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              AC recharge kit (R-134a)
            </a> &mdash; includes refrigerant, gauge, and hose for a simple top-off
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=AC+leak+detector+UV+dye+kit&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              UV dye leak detection kit
            </a> &mdash; helps locate refrigerant leaks by adding UV-visible dye to the system
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=digital+AC+manifold+gauge+set&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              AC manifold gauge set
            </a> &mdash; monitors both high and low side pressures for accurate diagnosis
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          If a DIY recharge does not restore cold air, or the system loses charge again
          within a few weeks, a professional diagnosis is needed. Compressor replacement,
          evaporator repair, and electrical troubleshooting all require specialized tools and
          expertise. Newer vehicles using R-1234yf refrigerant require expensive recovery
          equipment that only professional shops possess. If you hear unusual noises from the
          compressor area, see oily residue around AC fittings, or your AC only works
          intermittently, a qualified mechanic can pinpoint the issue and provide an accurate
          repair estimate.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Why is my car AC not blowing cold air?
        </h3>
        <p>
          The most common cause is low refrigerant due to a slow leak. Other causes include a
          failed compressor, a clogged condenser, a faulty blend door actuator, or an
          electrical issue. A professional diagnostic typically identifies the root cause
          within 30 to 60 minutes.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does car AC repair cost?
        </h3>
        <p>
          A refrigerant recharge costs $100 to $200. Leak repair runs $200 to $500.
          Compressor replacement is $500 to $900. A full AC system overhaul can reach $1,000
          to $1,500 for most vehicles.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Can I recharge my car AC myself?
        </h3>
        <p>
          You can perform a basic recharge using a DIY kit for $30 to $50. These kits work
          well for systems with a minor or slow leak. If the system is empty or the compressor
          is not engaging, professional diagnosis is needed to fix the underlying problem.
        </p>
      </div>

      <GearRecommendation section="diy-tools" />

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find an AC Repair Shop Near You
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted mechanics in your area.
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
