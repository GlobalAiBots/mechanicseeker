import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Top 10 Check Engine Light Codes and What They Mean | MechanicSeeker",
  description:
    "Understand the 10 most common OBD2 codes — P0300, P0171, P0420, P0440 and more. What each means, how serious it is, typical repair cost, and whether to DIY or call a mechanic.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/blog/check-engine-light-codes",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Top 10 Check Engine Light Codes and What They Mean",
  datePublished: "2026-04-19",
  author: { "@type": "Organization", name: "MechanicSeeker" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.mechanicseeker.com/blog" },
    { "@type": "ListItem", position: 3, name: "Check Engine Light Codes", item: "https://www.mechanicseeker.com/blog/check-engine-light-codes" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it safe to drive with the check engine light on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the light is steady and the car is running normally, it is usually safe to drive to a shop or auto parts store for a scan. If the light is flashing, pull over as soon as it is safe — a flashing light indicates an active misfire that can destroy the catalytic converter within minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reset a check engine light myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, an OBD2 scanner can clear codes, and most vehicles will reset on their own after 20 to 40 successful drive cycles once the underlying problem is fixed. Clearing the code without fixing the problem will only cause the light to return, often within a day.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to diagnose a check engine light?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most chain auto parts stores like AutoZone, O'Reilly, and Advance Auto Parts read basic OBD2 codes for free. An independent mechanic typically charges $80 to $150 for a full diagnostic, which includes reading codes, interpreting freeze frame data, and testing the suspected components.",
      },
    },
  ],
};

export default function CheckEngineLightCodes() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <Link href="/blog" className="hover:underline">Blog</Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">Check Engine Light Codes</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Top 10 Check Engine Light Codes and What They Mean
      </h1>
      <p className="text-sm text-gray-500 mb-8">Published April 19, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Most drivers see a check engine light and panic, picturing a
          five-figure repair bill. The reality is more reassuring: industry
          data suggests only about 20 percent of check engine lights point to
          a true emergency. The rest are nuisances, small leaks, or sensor
          issues that can wait a few days. The trick is knowing which is
          which, and that starts with reading the code. Here are the ten
          OBD2 codes mechanics see most often, what each really means, and
          whether you can handle it at home or should hand it to a pro.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0300 — Random/Multiple Cylinder Misfire
        </h2>
        <p>
          <strong>Severity: Red.</strong> P0300 means the engine computer
          detected misfires across more than one cylinder. You may feel a
          rough idle, stumbling under acceleration, or a pulsating loss of
          power. If the light is flashing, stop driving — raw fuel is hitting
          the catalytic converter and can melt it within miles. Common causes
          are worn spark plugs, failing ignition coils, vacuum leaks, and
          clogged fuel injectors. Plugs and coils are DIY-friendly; deeper
          fuel or compression issues belong with a mechanic. Expect $80 to
          $400 for plugs and coils, or $1,500+ if the cat converter is
          destroyed.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0171 — System Too Lean (Bank 1)
        </h2>
        <p>
          <strong>Severity: Yellow.</strong> The engine is running with too
          much air relative to fuel. The most common cause is a vacuum leak
          — a cracked intake hose, failed PCV valve, or split intake manifold
          gasket. A dirty mass airflow (MAF) sensor is the second suspect and
          can often be cleaned with MAF-safe spray for about $10. Driving
          short distances is usually fine, but prolonged lean running can
          overheat pistons. DIY repair is realistic if you can trace a vacuum
          hose; otherwise, budget $150 to $500 at a shop.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0172 — System Too Rich (Bank 1)
        </h2>
        <p>
          <strong>Severity: Yellow.</strong> The mirror image of P0171 — too
          much fuel, not enough air. You may notice the smell of fuel from
          the exhaust, black smoke on acceleration, and worse gas mileage.
          Typical causes are a failing MAF sensor, leaking fuel injector,
          stuck-open fuel pressure regulator, or a clogged air filter.
          Running rich long-term fouls spark plugs and shortens catalytic
          converter life. Parts are moderate: $50 to $250 for a MAF, $300 to
          $600 at a shop for diagnosis and repair.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0420 — Catalyst System Efficiency Below Threshold (Bank 1)
        </h2>
        <p>
          <strong>Severity: Yellow.</strong> The downstream oxygen sensor is
          reporting that the catalytic converter is not scrubbing exhaust the
          way it should. Sometimes the cat is genuinely worn out; sometimes a
          cheap oxygen sensor is sending bad data. You can usually drive
          normally, but the code is a guaranteed emissions-test failure. Have
          the sensors checked first — an O2 sensor runs $40 to $150 in parts
          — before committing to a new cat, which can run $800 to $2,500 for
          OEM.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0430 — Catalyst System Efficiency Below Threshold (Bank 2)
        </h2>
        <p>
          <strong>Severity: Yellow.</strong> Same story as P0420, but on the
          other bank of a V-configuration engine. Seeing P0420 and P0430
          together on a V6 or V8 often suggests a fueling issue (bad O2
          sensors, rich running) rather than two converters failing at once.
          Diagnose before you replace. Combined repair can hit $2,000 to
          $4,000 if both cats truly need to go, so it pays to rule out
          cheaper causes first.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0440 — Evaporative Emission System General Fault
        </h2>
        <p>
          <strong>Severity: Green.</strong> The EVAP system captures fuel
          vapors from the tank. P0440 is the generic &quot;something is
          leaking vapor&quot; code. Nine times out of ten the culprit is a
          loose or cracked gas cap. Tighten it (or replace it for $10 to
          $25), then drive for a few days — the light often clears on its
          own. If it persists, the issue may be a purge valve or vent
          solenoid at $50 to $200 installed.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0128 — Coolant Temperature Below Thermostat Regulating Temperature
        </h2>
        <p>
          <strong>Severity: Green.</strong> The engine is taking too long to
          reach operating temperature, which almost always points to a stuck-
          open thermostat. You may notice the heater blowing lukewarm in cold
          weather and slightly worse fuel economy. A thermostat costs $15 to
          $50 and is a straightforward DIY on most engines; at a shop, expect
          $150 to $400 including coolant.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0442 — Small EVAP Leak
        </h2>
        <p>
          <strong>Severity: Green.</strong> A more specific EVAP code
          indicating a small leak — roughly the size of a pinhole. Again,
          start with the gas cap. Beyond that, smoke testing at a shop is
          the fastest way to find the leak. Repair costs usually land at $100
          to $300 depending on which hose, seal, or valve is at fault.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0455 — Large EVAP Leak
        </h2>
        <p>
          <strong>Severity: Green.</strong> A larger EVAP leak, often from an
          unsealed gas cap, a cracked fuel filler neck, or a failed purge
          valve. Same diagnostic path as P0442: gas cap first, then smoke
          test. Large leaks are sometimes easier to locate because you can
          see the cracked hose or disconnected line. Expect $100 to $400 in
          repairs.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          P0131 / P0134 — Oxygen Sensor Issues (Bank 1 Sensor 1)
        </h2>
        <p>
          <strong>Severity: Yellow.</strong> P0131 indicates low voltage and
          P0134 indicates no activity from the upstream O2 sensor on bank 1.
          Symptoms include rough idle, poor fuel economy, and a failed
          emissions test. Sensors wear out naturally around 100,000 miles.
          Replacement is DIY-friendly with an O2 sensor socket; parts run $40
          to $150, shop labor adds $80 to $150. A lingering O2 sensor fault
          will eventually trigger catalyst codes too, so address it promptly.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Always Scan Before You Spend
        </h2>
        <p>
          The single most important step when a check engine light comes on
          is to pull the code. AutoZone, O&apos;Reilly, and Advance Auto
          Parts all read basic OBD2 codes for free in the parking lot. If
          you prefer to do it yourself, a good Bluetooth scanner like the{" "}
          <a
            href="https://www.amazon.com/s?k=bluetooth+obd2+scanner+bluedriver&tag=babymydog03-20"
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="text-[#E67E22] hover:underline font-semibold"
          >
            BlueDriver OBD2 scanner on Amazon
          </a>{" "}
          pairs with your phone and pulls manufacturer-specific codes
          most cheap scanners miss.
        </p>

        <p>
          Once you know the code, you can decide: tighten a gas cap, swap an
          O2 sensor in the driveway, or call a pro. For deeper electrical
          issues that often trigger multiple codes, see our{" "}
          <Link href="/costs/alternator" className="text-[#E67E22] hover:underline font-semibold">
            alternator replacement cost guide
          </Link>
          . If your car is also making unfamiliar sounds, our guide to{" "}
          <Link href="/blog/car-strange-noises" className="text-[#E67E22] hover:underline font-semibold">
            strange car noises and what they mean
          </Link>{" "}
          is a good next stop. And if you want a shop to take it from here,
          browse our{" "}
          <Link href="/services/check-engine-light" className="text-[#E67E22] hover:underline font-semibold">
            check engine light diagnostic service directory
          </Link>{" "}
          to compare local mechanics.
        </p>

        <GearRecommendation section="diy-tools" />
      </div>
    </main>
  );
}
