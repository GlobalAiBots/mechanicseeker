import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Transmission Repair: Warning Signs & Costs | MechanicSeeker",
  description:
    "Transmission repair cost guide for 2026. Learn warning signs of transmission failure, fluid change vs rebuild costs ($300-3,500+), and when to see a specialist.",
  alternates: {
    canonical: "https://mechanicseeker.com/services/transmission",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Transmission Repair", item: "https://mechanicseeker.com/services/transmission" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a transmission repair cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Transmission repair costs vary widely depending on the issue. A fluid change runs $150 to $300, a solenoid replacement costs $300 to $850, and a full transmission rebuild ranges from $1,500 to $3,500 or more. A complete replacement with a new or remanufactured unit costs $2,500 to $5,000 including labor.",
      },
    },
    {
      "@type": "Question",
      name: "What are the warning signs of transmission problems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common warning signs include delayed or harsh shifting, slipping between gears, grinding or shaking during gear changes, a burning smell from overheated fluid, transmission fluid leaks (red or brown fluid under the vehicle), the check engine light illuminating, and the vehicle refusing to engage a gear. Any of these symptoms warrant immediate professional inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Should I rebuild or replace a transmission?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A rebuild is typically cheaper at $1,500 to $3,500 and keeps your original transmission, but results depend on the shop's skill. A replacement with a remanufactured unit costs $2,500 to $5,000 but comes with a warranty and more predictable quality. For vehicles worth less than $5,000, a used transmission at $800 to $1,500 installed may be the most practical option.",
      },
    },
  ],
};

export default function TransmissionPage() {
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
        <span className="text-gray-700">Transmission Repair</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Transmission Repair: Warning Signs &amp; Costs
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $300&ndash;$3,500+</span>
          <span><strong>Service Interval:</strong> Fluid every 30,000&ndash;60,000 mi</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">Professional</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          The transmission is one of the most complex and expensive components in your
          vehicle. Whether automatic or manual, it manages the transfer of power from the
          engine to the wheels, shifting through gear ratios to match speed and load demands.
          When a transmission begins to fail, repair costs can range from a few hundred
          dollars for minor issues to several thousand for a full rebuild or replacement.
          Catching problems early and maintaining proper fluid levels are the best ways to
          avoid catastrophic transmission failure.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Transmission Repair Cost Breakdown
        </h2>
        <p>
          A transmission fluid change is the most affordable maintenance service, running
          $150 to $300 at most shops. A more thorough transmission flush, which replaces all
          the fluid rather than just draining and refilling, costs $200 to $400. These
          services are preventive and should be performed every 30,000 to 60,000 miles
          depending on your vehicle and driving conditions.
        </p>
        <p>
          When internal components fail, costs escalate quickly. Solenoid replacement runs
          $300 to $850, while torque converter replacement costs $600 to $1,200. A full
          transmission rebuild &mdash; where the unit is disassembled, worn parts are
          replaced, and everything is reassembled &mdash; costs $1,500 to $3,500 depending
          on the vehicle. A complete replacement with a remanufactured transmission ranges
          from $2,500 to $5,000 including labor.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Warning Signs of Transmission Problems
        </h2>
        <p>
          Delayed or harsh shifting is often the first sign of trouble. If your automatic
          transmission hesitates before engaging a gear or slams into gear with a noticeable
          jolt, internal components may be wearing. Slipping &mdash; where the engine revs
          climb but the vehicle does not accelerate proportionally &mdash; indicates worn
          clutch packs or bands inside the transmission.
        </p>
        <p>
          A burning smell points to overheated transmission fluid, which breaks down and
          loses its lubricating properties. Red or brown fluid spots under your vehicle
          indicate a transmission fluid leak from a seal, gasket, or cooler line. Grinding
          during shifts, difficulty engaging reverse, and the check engine or transmission
          warning light on the dashboard are all signals to get a professional diagnosis
          immediately.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Preventive Maintenance
        </h2>
        <p>
          Regular fluid changes are the single best thing you can do for your transmission.
          Fresh fluid provides proper lubrication, cooling, and hydraulic pressure for smooth
          shifting. Check your fluid level and condition monthly &mdash; healthy transmission
          fluid is translucent red and has a slightly sweet smell. Dark, brown, or burnt-smelling
          fluid needs to be changed immediately.
        </p>
        <p>
          While transmission fluid changes are technically a DIY task, the process varies
          significantly by vehicle and carries risk if done incorrectly. Here are tools for
          checking transmission health:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=OBD2+scanner+transmission&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              OBD2 diagnostic scanner
            </a> &mdash; reads transmission-specific trouble codes to identify issues early
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=transmission+drain+pan&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Transmission drain pan
            </a> &mdash; designed for the higher volume of transmission fluid changes
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=fluid+transfer+pump+automotive&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Fluid transfer pump
            </a> &mdash; makes refilling the transmission easier on vehicles without a dipstick
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          Transmission repair is almost always a job for a professional. The complexity of
          modern automatic transmissions, with hundreds of internal components and
          computer-controlled shifting, makes DIY repairs impractical for all but the most
          experienced home mechanics. If you experience any shifting abnormalities, fluid
          leaks, or warning lights, take your vehicle to a transmission specialist rather than
          a general repair shop. Specialists have the diagnostic equipment, experience, and
          rebuild facilities to correctly diagnose and repair transmission issues.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does a transmission repair cost?
        </h3>
        <p>
          Transmission repair costs vary widely. A fluid change runs $150 to $300, solenoid
          replacement costs $300 to $850, and a full rebuild ranges from $1,500 to $3,500.
          A complete replacement with a remanufactured unit costs $2,500 to $5,000 including
          labor.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          What are the warning signs of transmission problems?
        </h3>
        <p>
          Common signs include delayed or harsh shifting, slipping between gears, grinding
          during gear changes, a burning smell, transmission fluid leaks, the check engine
          light illuminating, and the vehicle refusing to engage a gear.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Should I rebuild or replace a transmission?
        </h3>
        <p>
          A rebuild is typically cheaper at $1,500 to $3,500 and keeps your original
          transmission. A replacement with a remanufactured unit costs $2,500 to $5,000 but
          comes with a warranty. For vehicles worth less than $5,000, a used transmission at
          $800 to $1,500 installed may be the most practical option.
        </p>
      </div>

      <GearRecommendation section="diy-tools" />

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find a Transmission Specialist Near You
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted transmission shops in your area.
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
