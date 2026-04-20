import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Car Battery Replacement: Signs & Cost | MechanicSeeker",
  description:
    "Is your car battery dying? Learn the warning signs, replacement costs ($50-200), how to test and replace a battery yourself, and when to see a mechanic.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/services/battery-replacement",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Battery Replacement", item: "https://www.mechanicseeker.com/services/battery-replacement" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a car battery last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical car battery lasts 3 to 5 years depending on climate, driving habits, and battery quality. Extreme heat accelerates battery degradation more than cold weather. Short trips that don't fully recharge the battery, frequent use of electronics with the engine off, and corroded terminals all shorten battery life. Have your battery tested annually once it reaches 3 years old.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a car battery replacement cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A new car battery costs $50 to $200 depending on the type and brand. Standard flooded lead-acid batteries run $50 to $120, while AGM (Absorbent Glass Mat) batteries cost $100 to $200. Professional installation adds $20 to $50 in labor. Many auto parts stores offer free installation when you purchase a battery from them.",
      },
    },
    {
      "@type": "Question",
      name: "Can I replace a car battery myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, battery replacement is one of the easiest DIY car repairs. You need a wrench (usually 10mm or 13mm) to disconnect the terminals and remove the hold-down clamp. Always disconnect the negative terminal first and reconnect it last to prevent sparks. The entire job takes 15 to 30 minutes. Note that some modern vehicles may need their computer systems reset after a battery swap.",
      },
    },
  ],
};

export default function BatteryReplacementPage() {
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
        <span className="text-gray-700">Battery Replacement</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Car Battery Replacement: Signs &amp; Cost
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $50&ndash;$200</span>
          <span><strong>Lifespan:</strong> 3&ndash;5 years</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Easy</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Your car battery provides the electrical energy needed to start the engine and power
          all electronic systems when the engine is off. A healthy battery is essential for
          reliable starting, stable electronics, and proper operation of modern vehicle
          computers. When a battery begins to fail, you may experience slow cranking,
          dimming lights, or a complete no-start situation. The good news is that battery
          replacement is one of the most affordable and straightforward car repairs, whether
          you do it yourself or have a shop handle it.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Warning Signs Your Battery Is Dying
        </h2>
        <p>
          Slow engine cranking is the most common early warning sign. If the starter motor
          sounds sluggish or the engine takes longer than usual to turn over, the battery is
          losing its ability to deliver full power. Dimming headlights and interior lights,
          especially at idle, indicate the battery is struggling to maintain voltage under
          load.
        </p>
        <p>
          Electrical glitches like flickering dashboard lights, a clock that keeps resetting,
          or power windows operating slowly can all point to a weak battery. A swollen or
          bloated battery case indicates internal damage from heat or overcharging. White or
          greenish corrosion buildup on the battery terminals increases resistance and can
          mimic the symptoms of a dying battery even when the battery itself is still good.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Battery Replacement Cost Breakdown
        </h2>
        <p>
          Standard flooded lead-acid batteries cost $50 to $120 at auto parts stores. These
          work well for most vehicles and come with 2 to 3 year warranties. AGM batteries
          cost $100 to $200 and are required for vehicles with start-stop systems, advanced
          electronics, or high electrical demands. They last longer and handle deep cycling
          better than standard batteries.
        </p>
        <p>
          Professional installation adds $20 to $50 in labor. Many auto parts stores like
          AutoZone, O&apos;Reilly, and Advance Auto Parts offer free installation when you
          purchase a battery in-store. Dealerships charge the most at $150 to $300 total
          including their markup on the battery. For the best value, purchase a quality battery
          from an auto parts store and install it yourself or take advantage of free
          installation.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          DIY Battery Replacement
        </h2>
        <p>
          Replacing a car battery is a beginner-friendly project that takes 15 to 30 minutes.
          The process is simple: turn off the engine, disconnect the negative (black) terminal
          first, then the positive (red) terminal, remove the hold-down clamp, lift out the
          old battery, place the new one, reattach the hold-down, and reconnect the positive
          terminal first, then the negative. Always disconnect negative first and reconnect
          it last to prevent short circuits.
        </p>
        <p>
          Essential tools for battery replacement:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=battery+terminal+cleaner+tool&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Battery terminal cleaner
            </a> &mdash; wire brush tool that cleans corrosion from terminals and cable ends
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=battery+load+tester+automotive&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Battery load tester
            </a> &mdash; tests battery health under load to determine if replacement is truly needed
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=anti+corrosion+battery+washers&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Anti-corrosion terminal washers
            </a> &mdash; felt washers treated with corrosion inhibitor to extend terminal life
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          If a new battery does not solve your starting problems, the issue may lie elsewhere
          in the charging system. A failing alternator will drain even a brand-new battery
          within a day or two. Parasitic electrical draws &mdash; where a component stays
          active when the car is off &mdash; can also kill batteries prematurely. If you
          experience repeated battery failure, dimming lights while driving, or a battery
          warning light on the dashboard, have a mechanic test the alternator output, check
          for parasitic draws, and inspect the wiring and grounds.
        </p>
        <p>
          Some modern vehicles with advanced electronics require a battery registration
          procedure after replacement. This tells the car&apos;s computer that a new battery
          has been installed so it can adjust the charging strategy. Vehicles from BMW, Mercedes,
          and some newer GM and Ford models require this step, which typically needs a
          dealer-level scan tool.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How long does a car battery last?
        </h3>
        <p>
          A typical car battery lasts 3 to 5 years depending on climate, driving habits, and
          battery quality. Extreme heat accelerates degradation more than cold weather. Have
          your battery tested annually once it reaches 3 years old.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does a car battery replacement cost?
        </h3>
        <p>
          A new battery costs $50 to $200 depending on the type. Standard lead-acid batteries
          run $50 to $120, while AGM batteries cost $100 to $200. Professional installation
          adds $20 to $50. Many auto parts stores offer free installation with purchase.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Can I replace a car battery myself?
        </h3>
        <p>
          Yes, battery replacement is one of the easiest DIY car repairs. You need a wrench
          (usually 10mm or 13mm) to disconnect the terminals and remove the hold-down clamp.
          Always disconnect the negative terminal first and reconnect it last. The entire job
          takes 15 to 30 minutes.
        </p>
      </div>

      <GearRecommendation section="emergency" />

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find a Battery Service Shop Near You
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
