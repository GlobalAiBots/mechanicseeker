import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car AC Not Working? How to Diagnose and What Repairs Cost | MechanicSeeker",
  description:
    "Car AC not working — step-by-step diagnosis, likely causes (low refrigerant, compressor, condenser), and what each repair actually costs in 2026.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/blog/ac-not-working-in-car",
  },
  openGraph: {
    title: "Car AC Not Working? How to Diagnose and What Repairs Cost",
    description:
      "Car AC not working — step-by-step diagnosis, likely causes (low refrigerant, compressor, condenser), and what each repair actually costs in 2026.",
    url: "https://www.mechanicseeker.com/blog/ac-not-working-in-car",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car AC Not Working? How to Diagnose and What Repairs Cost",
    description:
      "Car AC not working — step-by-step diagnosis, likely causes, and what each repair actually costs in 2026.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Car AC Not Working? How to Diagnose and What Repairs Cost",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is my car AC blowing hot air?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common cause is low refrigerant from a small leak — the system needs a certain minimum charge to cool. Other causes include a failed compressor, a clogged expansion valve, a broken blend door actuator (air mixing with the heater core), or a failed AC clutch. A shop diagnostic with pressure gauges will distinguish low refrigerant from mechanical failure in about 30 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How long should an AC recharge last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A properly sealed AC system should never need recharging — the refrigerant is not consumed in use. If a recharge 'fixes' your AC for a season or two and then the problem returns, you have a slow leak that should be found and repaired. A recharge that fails within weeks means a larger leak is present. Chasing recharges without fixing the leak damages the compressor and ends up costing more.",
      },
    },
    {
      "@type": "Question",
      name: "Is it worth fixing AC on an older car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Weigh the repair cost against the car's value and how often you drive in hot weather. A $300 recharge on an otherwise solid car is almost always worth it. A $2,000 evaporator replacement on a 15-year-old car worth $3,000 is harder to justify unless you're committed to the vehicle long-term. Vehicles built before 1994 use R-12 refrigerant, which is essentially unavailable today and makes repairs impractical without converting the system to R-134a.",
      },
    },
  ],
};

export default function ACNotWorkingInCar() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &raquo;{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">Car AC Not Working</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Car AC Not Working? How to Diagnose and What Repairs Cost
      </h1>
      <p className="text-sm text-gray-500 mb-8">Published April 20, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          A car air conditioner that blows warm air on a 95-degree day is
          one of those failures that feels like an emergency. It
          isn&apos;t &mdash; AC problems are almost always fixable, often
          cheaply. The trick is understanding what&apos;s actually wrong
          before you hand over your credit card. A good shop fixes the
          root cause. A bad shop keeps recharging the refrigerant every
          summer and charging you $150 each time. This guide walks through
          how to tell the difference.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Quick Diagnosis Steps
        </h2>
        <p>
          Before anything else, answer these questions about what the
          system is actually doing:
        </p>
        <p>
          <strong>Does the fan blow at all?</strong> If no air comes out of
          the vents, the problem isn&apos;t cooling &mdash; it&apos;s the
          blower motor or its circuit.{" "}
          <strong>Is the air lukewarm instead of cold, or fully hot?</strong>{" "}
          Lukewarm usually points to low refrigerant. Fully hot often
          means the system isn&apos;t engaging at all (clutch, control
          module, or electrical).{" "}
          <strong>Does air come from the correct vents?</strong> If the
          cold air is going to the floor when you select dash vents, or
          vice versa, you&apos;ve got a blend-door or mode-door actuator
          issue &mdash; not a refrigeration issue.{" "}
          <strong>Any weird smells?</strong> Musty smells usually mean a
          dirty evaporator or cabin filter. Sweet smells can indicate a
          coolant leak (from the heater core).{" "}
          <strong>Warning lights?</strong> Some modern vehicles trigger a
          climate-control fault light or AC-specific dashboard indicator.
        </p>
        <p>
          Those answers narrow the problem down fast, both for your own
          understanding and for the shop quote.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Most Common Problems in Order of Likelihood
        </h2>
        <p>
          <strong>1. Low refrigerant &mdash; $150 to $300 recharge.</strong>{" "}
          The single most common AC complaint. The system operates in a
          closed loop and should never lose refrigerant in normal use. If
          it has, there&apos;s a leak &mdash; but small leaks can go years
          between recharges. A basic evacuate-and-recharge runs $150 to
          $200 on R-134a systems, $200 to $300 on newer R-1234yf systems
          (used on most cars built after roughly 2015). A proper service
          includes pulling vacuum to check for leaks before recharging.
        </p>
        <p>
          <strong>2. Compressor failure &mdash; $800 to $1,800.</strong>{" "}
          The compressor is the beating heart of the system; when it dies,
          cooling stops entirely and you often hear grinding or clicking
          when AC is engaged. Compressor replacement runs $800 to $1,800
          installed, sometimes more on luxury vehicles. Internal compressor
          failures can contaminate the system with metal debris, requiring
          a line flush and new receiver-drier or accumulator (add $150 to
          $300).
        </p>
        <p>
          <strong>3. Condenser leak &mdash; $500 to $1,200.</strong>{" "}
          The condenser mounts in front of the radiator and is exposed to
          rocks and road debris. Small impacts can puncture it. Condenser
          replacement runs $500 to $1,200 installed, depending on how
          buried it is behind the bumper. Leaks at the condenser are one
          of the most common causes of repeat refrigerant loss.
        </p>
        <p>
          <strong>4. Evaporator core &mdash; $1,000 to $2,200.</strong>{" "}
          The evaporator lives inside the dashboard. The part itself is
          $100 to $300, but reaching it requires pulling most of the dash
          apart &mdash; an 8 to 14-hour labor job. Evaporator leaks are
          less common but significantly more expensive to address, and
          often reveal themselves with sweet-smelling residue on the
          passenger-side floor.
        </p>
        <p>
          <strong>5. Blower motor &mdash; $300 to $600.</strong> When air
          flow drops or stops entirely on all speeds, the blower motor
          itself is the culprit. If only certain fan speeds work, the
          issue is usually the blower resistor ($80 to $200 installed).
        </p>
        <p>
          <strong>6. AC clutch &mdash; $400 to $800.</strong> The clutch
          engages and disengages the compressor from the engine drive
          belt. A worn clutch won&apos;t engage even when the rest of the
          compressor is fine. Replacement is more affordable than a full
          compressor swap if the compressor itself is still good.
        </p>
        <p>
          For a deeper dive into recharge pricing specifically, our{" "}
          <Link
            href="/blog/how-much-does-an-ac-recharge-cost"
            className="text-[#E67E22] font-semibold hover:underline"
          >
            AC recharge cost guide
          </Link>{" "}
          breaks down every service level.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          The DIY Recharge Debate
        </h2>
        <p>
          Auto parts stores sell DIY AC recharge kits for $30 to $50, and
          they work &mdash; sometimes. On a system with a very slow leak
          that just needs a top-off, a kit can restore cold air for a
          season. But the kits have real downsides. Most include sealer
          additives that can clog expansion valves and foul compressor
          internals, making future professional repairs more expensive.
          Without pressure gauges, you can easily overcharge the system
          (excess pressure damages the compressor). And the kits
          don&apos;t fix the underlying leak.
        </p>
        <p>
          If you know your system has lost a small amount of refrigerant,
          your compressor is healthy, and you&apos;re willing to accept
          the risk of sealer additives, a kit can work as a stopgap. For
          anything beyond that &mdash; compressor noise, major cooling
          loss, a system that goes flat in days rather than years &mdash;
          it&apos;s a shop job.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to DIY vs Go to a Shop
        </h2>
        <p>
          DIY is reasonable for: cabin air filter replacement ($15 part,
          10 minutes), confirming fan operation and vent airflow, and at
          most, a single low-pressure recharge on an older system with a
          known slow leak. Everything else &mdash; diagnostic pressure
          testing, leak detection with UV dye, compressor work, evaporator
          work, electrical diagnosis &mdash; belongs in a shop with the
          right equipment. AC refrigerant handling is federally regulated;
          shops have certified technicians and recovery equipment for a
          reason.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          What a Shop Should Do First
        </h2>
        <p>
          A professional AC diagnosis starts with a visual inspection of
          accessible components, a pressure test on both the high and low
          sides of the system, and a leak check using UV dye or an
          electronic sniffer. That&apos;s the correct sequence. A shop
          that skips straight to "add refrigerant and see what happens"
          isn&apos;t diagnosing &mdash; it&apos;s guessing. Insist on a
          written estimate that identifies the leak location or component
          failure before authorizing parts replacement.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Questions to Ask the AC Shop
        </h2>
        <p>
          Before approving work, ask: Did you pressure-test both the high
          and low sides? Where is the leak, specifically? What&apos;s the
          warranty on parts and labor? If this fails again in six months,
          what does that cost? A reputable shop will answer these directly
          and in writing. Evasive answers are a sign to get a second
          opinion. For broader guidance on protecting yourself at any
          repair shop, read our guide on{" "}
          <Link
            href="/blog/how-to-find-trustworthy-mechanic"
            className="text-[#E67E22] font-semibold hover:underline"
          >
            how to find a trustworthy mechanic
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to Skip AC Repair Entirely
        </h2>
        <p>
          Walk away from AC repair when: the car is older than 1993 and
          still uses R-12 refrigerant (R-12 is phased out and retrofits
          cost $800 to $1,500 before any actual repair), the repair quote
          approaches the car&apos;s value, or the AC system has already
          required multiple expensive repairs in recent years (a sign of
          systemic aging). Sometimes rolling down the windows is the
          rational choice for the last summer of a tired vehicle. If
          you&apos;re noticing other problems alongside the AC failure,
          our guide on{" "}
          <Link
            href="/blog/signs-car-needs-repair"
            className="text-[#E67E22] font-semibold hover:underline"
          >
            signs your car needs repair
          </Link>{" "}
          can help you see the bigger picture before investing in any one
          fix.
        </p>
        <p>
          For most cars in most situations, though, AC is worth fixing
          properly. Diagnose it carefully, repair the root cause, and
          you&apos;ll have cold air for another decade without handing a
          shop $150 every June.
        </p>
      </div>
    </main>
  );
}
