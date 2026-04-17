import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Engine Light: What It Means | MechanicSeeker",
  description:
    "Check engine light on? Learn what it means, common causes, diagnostic costs ($100-200), whether you can drive safely, and when to see a mechanic immediately.",
  alternates: {
    canonical: "https://mechanicseeker.com/services/check-engine-light",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Check Engine Light", item: "https://mechanicseeker.com/services/check-engine-light" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I drive with the check engine light on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A steady check engine light usually means a non-emergency issue like a loose gas cap or aging oxygen sensor. You can generally drive to a shop within a few days. However, a flashing check engine light indicates a severe misfire that can damage the catalytic converter. Pull over safely, reduce speed, and get to a mechanic as soon as possible. Never ignore a flashing check engine light.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a check engine light diagnosis cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A basic OBD2 code scan is often free at auto parts stores like AutoZone or O'Reilly. A professional diagnostic at a repair shop costs $100 to $200 and includes scanning codes, interpreting data, performing pinpoint tests, and providing a repair recommendation. The diagnostic fee is usually applied toward the repair cost if you have the work done at the same shop.",
      },
    },
    {
      "@type": "Question",
      name: "What are the most common check engine light causes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The five most common causes are a loose or faulty gas cap, a failing oxygen sensor ($150-300 to replace), a bad catalytic converter ($500-2,000), faulty spark plugs or ignition coils ($60-400), and a failing mass airflow sensor ($200-400). A loose gas cap is the simplest fix — tighten it and drive for a few days to see if the light clears on its own.",
      },
    },
  ],
};

export default function CheckEngineLightPage() {
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
        <span className="text-gray-700">Check Engine Light</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Check Engine Light: What It Means
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Diagnostic Cost:</strong> $100&ndash;$200</span>
          <span><strong>Free Scan:</strong> Available at most auto parts stores</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Easy (scan) </span> <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">Varies (repair)</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          The check engine light is your vehicle&apos;s way of telling you that the onboard
          computer has detected an issue with the engine, emissions system, or related
          components. It can indicate anything from a loose gas cap to a failing catalytic
          converter. While the light itself does not tell you exactly what is wrong, the
          computer stores a diagnostic trouble code that a scanner can retrieve to pinpoint
          the problem. Understanding what the check engine light means helps you decide
          whether you need immediate service or can safely schedule a visit.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Steady vs. Flashing: Know the Difference
        </h2>
        <p>
          A steady check engine light indicates a non-critical issue that should be addressed
          soon but is not an emergency. You can typically drive normally for a few days while
          you schedule a diagnostic appointment. Common causes of a steady light include a
          loose gas cap, an aging oxygen sensor, or an evaporative emissions leak.
        </p>
        <p>
          A flashing check engine light is urgent. It means the engine is misfiring severely,
          which sends unburned fuel into the exhaust system and can overheat and destroy the
          catalytic converter &mdash; a repair that costs $500 to $2,000. If your check engine
          light is flashing, reduce speed, avoid hard acceleration, and get to a mechanic as
          soon as possible. Continuing to drive with a flashing light can turn a $200 ignition
          coil replacement into a $1,500 catalytic converter job.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Most Common Causes
        </h2>
        <p>
          A loose or damaged gas cap is the simplest and most common trigger. The fuel system
          is sealed, and a loose cap allows vapors to escape, tripping the evaporative
          emissions code. Tighten the cap and drive for a few days &mdash; the light often
          clears on its own after several drive cycles.
        </p>
        <p>
          Oxygen sensor failure is another frequent cause, costing $150 to $300 to replace.
          The O2 sensor monitors exhaust gases and helps the computer adjust the fuel mixture.
          A failing sensor reduces fuel economy by 10 to 20 percent and increases emissions.
          Spark plug and ignition coil issues trigger misfire codes and cost $60 to $400 to
          repair depending on how many cylinders are affected. Mass airflow sensor failure
          causes poor acceleration and rough idling at $200 to $400 for replacement.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Diagnostic Cost and Process
        </h2>
        <p>
          Auto parts stores like AutoZone, O&apos;Reilly, and Advance Auto Parts offer free
          OBD2 code scans. They will read the trouble code and tell you what it means, but
          they cannot perform in-depth diagnosis. A professional diagnostic at a repair shop
          costs $100 to $200 and includes code scanning, live data analysis, pinpoint testing
          of the suspected component, and a detailed repair recommendation.
        </p>
        <p>
          Owning your own OBD2 scanner lets you check codes anytime without visiting a store
          or shop. Tools for DIY diagnostics:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=OBD2+bluetooth+scanner&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Bluetooth OBD2 scanner
            </a> &mdash; pairs with your phone for code reading, live data, and clearing codes
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=OBD2+scanner+with+screen&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Standalone OBD2 scanner
            </a> &mdash; dedicated device with a screen, no phone required
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=automotive+multimeter&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Automotive multimeter
            </a> &mdash; tests voltage, resistance, and continuity for pinpoint electrical diagnosis
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          While reading codes is easy, interpreting them correctly requires experience. A
          single trouble code can have multiple possible causes, and replacing parts based
          on a code alone often leads to wasted money on unnecessary repairs. A qualified
          mechanic uses live data, freeze frame data, and pinpoint tests to confirm the
          actual failed component before replacing anything. See a mechanic immediately if
          the light is flashing, if you notice performance changes like rough running or
          loss of power, or if multiple warning lights come on simultaneously.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Can I drive with the check engine light on?
        </h3>
        <p>
          A steady light usually means a non-emergency issue &mdash; you can drive to a shop
          within a few days. A flashing light indicates a severe misfire that can damage the
          catalytic converter. Pull over safely and get to a mechanic as soon as possible.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does a check engine light diagnosis cost?
        </h3>
        <p>
          A basic code scan is often free at auto parts stores. A professional diagnostic at a
          shop costs $100 to $200 and includes code scanning, data analysis, pinpoint testing,
          and a repair recommendation. The fee is usually applied toward the repair if you
          have the work done at the same shop.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          What are the most common check engine light causes?
        </h3>
        <p>
          The five most common causes are a loose gas cap, a failing oxygen sensor ($150 to
          $300), a bad catalytic converter ($500 to $2,000), faulty spark plugs or ignition
          coils ($60 to $400), and a failing mass airflow sensor ($200 to $400).
        </p>
      </div>

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find a Diagnostic Shop Near You
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
