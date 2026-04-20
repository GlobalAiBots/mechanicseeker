import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Brake Repair: Signs, Costs & When to Go | MechanicSeeker",
  description:
    "Complete guide to brake repair costs in 2026. Learn the warning signs, what to expect to pay ($150-400 per axle), DIY tips, and when to see a professional mechanic.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/services/brake-repair",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Brake Repair", item: "https://www.mechanicseeker.com/services/brake-repair" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does brake repair cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brake pad replacement costs $150 to $300 per axle in 2026. A full brake job including new pads and rotors runs $250 to $400 per axle. Caliper replacement adds $200 to $500 per caliper. Total four-wheel brake overhaul ranges from $500 to $1,500 for most vehicles, with luxury and performance cars costing more.",
      },
    },
    {
      "@type": "Question",
      name: "What are the signs I need brake repair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common warning signs include squealing or squeaking when braking, grinding or growling noises, a spongy or soft brake pedal, the vehicle pulling to one side during braking, vibration in the steering wheel or brake pedal, and the brake warning light on your dashboard. Any of these symptoms warrants immediate inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Can I replace brake pads myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, brake pad replacement is a moderate DIY project that takes 1 to 2 hours per axle. You need a jack, jack stands, a socket set, a C-clamp to compress the caliper piston, and new brake pads. The job saves $80 to $150 in labor costs. However, if you are not confident working on safety-critical components, have a professional handle it.",
      },
    },
  ],
};

export default function BrakeRepairPage() {
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
        <span className="text-gray-700">Brake Repair</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Brake Repair: Signs, Costs &amp; When to Go
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $150&ndash;$400 per axle</span>
          <span><strong>Frequency:</strong> Every 25,000&ndash;65,000 mi</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">Moderate</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Your brakes are the most critical safety system on your vehicle. Every time you
          press the brake pedal, you rely on brake pads, rotors, calipers, and brake fluid
          working together to bring thousands of pounds of metal to a safe stop. When any
          component in this system begins to fail, your stopping distance increases and your
          safety is compromised. Understanding brake repair costs and warning signs helps you
          act quickly and budget accurately when service is needed.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Brake Repair Cost Breakdown
        </h2>
        <p>
          Brake pad replacement is the most common brake service, costing $150 to $300 per
          axle at most shops in 2026. This includes new pads, hardware clips, and labor.
          Ceramic pads cost more upfront but last longer and produce less dust. When rotors
          also need replacement, expect $250 to $400 per axle for the combined pad and rotor
          job. A full four-wheel brake overhaul with pads, rotors, fluid flush, and caliper
          service runs $500 to $1,500 for most vehicles.
        </p>
        <p>
          Luxury and performance vehicles cost significantly more. European brands like BMW,
          Mercedes, and Audi use larger, specialized brake components that carry a parts
          premium. A full brake job on a BMW 3 Series might cost $800 to $1,200, while a
          Porsche or AMG model can exceed $2,000 for all four corners.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Warning Signs You Need Brake Service
        </h2>
        <p>
          Squealing or squeaking when you apply the brakes is usually the first sign. Modern
          brake pads include metal wear indicators that produce a high-pitched squeal when the
          pad material is getting thin. This is your early warning &mdash; you typically have
          1,000 to 2,000 miles of pad life remaining at this stage.
        </p>
        <p>
          Grinding or growling means the pads are completely worn through and metal is
          contacting metal. At this point, your rotors are being damaged with every stop,
          turning a $200 pad replacement into a $400 or more pad-and-rotor job. A spongy or
          soft brake pedal indicates air in the brake lines or a fluid leak, both of which
          require immediate professional attention. Vibration or pulsation in the steering
          wheel during braking points to warped rotors, while the vehicle pulling to one side
          suggests a stuck caliper or uneven pad wear.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          DIY Brake Pad Replacement
        </h2>
        <p>
          Replacing brake pads yourself is a moderately difficult project that saves $80 to
          $150 in labor per axle. The job takes 1 to 2 hours and requires basic mechanical
          aptitude. You remove the wheel, unbolt the caliper, slide out the old pads,
          compress the caliper piston, install new pads and hardware, and reinstall everything.
          Here are the tools you need:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=brake+caliper+tool+set&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Brake caliper tool set
            </a> &mdash; compresses caliper pistons safely without damage
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=torque+wrench+automotive&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Torque wrench
            </a> &mdash; ensures lug nuts and caliper bolts are tightened to proper specifications
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=jack+stands+3+ton&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Jack stands (3-ton)
            </a> &mdash; safely supports the vehicle while you work
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          While pad replacement is manageable for many DIYers, several brake issues require
          professional expertise. Brake fluid leaks, ABS system faults, caliper rebuilds, and
          brake line replacement all demand specialized tools and knowledge. If your brake
          pedal feels spongy, your ABS light is on, or you see fluid dripping near a wheel,
          do not attempt a DIY repair &mdash; have a qualified mechanic inspect the system
          immediately. Brakes are not the place to cut corners or learn by trial and error.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does brake repair cost?
        </h3>
        <p>
          Brake pad replacement costs $150 to $300 per axle in 2026. A full brake job
          including new pads and rotors runs $250 to $400 per axle. Caliper replacement adds
          $200 to $500 per caliper. Total four-wheel brake overhaul ranges from $500 to $1,500
          for most vehicles, with luxury and performance cars costing more.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          What are the signs I need brake repair?
        </h3>
        <p>
          Common warning signs include squealing or squeaking when braking, grinding or
          growling noises, a spongy or soft brake pedal, the vehicle pulling to one side
          during braking, vibration in the steering wheel or brake pedal, and the brake
          warning light on your dashboard.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Can I replace brake pads myself?
        </h3>
        <p>
          Yes, brake pad replacement is a moderate DIY project that takes 1 to 2 hours per
          axle. You need a jack, jack stands, a socket set, a C-clamp to compress the caliper
          piston, and new brake pads. The job saves $80 to $150 in labor costs. However, if
          you are not confident working on safety-critical components, have a professional
          handle it.
        </p>
      </div>

      <GearRecommendation section="diy-tools" />

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find a Brake Specialist Near You
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted brake shops in your area.
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
