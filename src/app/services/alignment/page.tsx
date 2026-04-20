import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Wheel Alignment: Signs & Cost | MechanicSeeker",
  description:
    "Is your car pulling to one side? Learn about wheel alignment signs, costs ($75-200), how often you need one, and why alignment matters for tire life and safety.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/services/alignment",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Wheel Alignment", item: "https://www.mechanicseeker.com/services/alignment" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a wheel alignment cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A front-end (two-wheel) alignment costs $50 to $100, while a four-wheel alignment runs $75 to $200 at most shops in 2026. Some shops offer alignment packages with a warranty that covers re-checks and adjustments for 6 to 12 months. Dealerships typically charge more at $100 to $250, while independent alignment specialists offer competitive pricing with precision equipment.",
      },
    },
    {
      "@type": "Question",
      name: "How often do I need a wheel alignment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most manufacturers recommend a wheel alignment check every 12 months or 12,000 miles. You should also get an alignment after installing new tires, hitting a significant pothole or curb, replacing suspension components, or noticing signs of misalignment like pulling, uneven tire wear, or a crooked steering wheel. Regular alignment checks catch issues early and prevent premature tire wear.",
      },
    },
    {
      "@type": "Question",
      name: "What are the signs I need a wheel alignment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common signs include the vehicle pulling to the left or right, a steering wheel that is off-center when driving straight, uneven or rapid tire wear on one side, the steering wheel vibrating at highway speeds, and squealing tires during turns. If you notice any of these symptoms, have your alignment checked before the issue causes further tire damage.",
      },
    },
  ],
};

export default function AlignmentPage() {
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
        <span className="text-gray-700">Wheel Alignment</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Wheel Alignment: Signs &amp; Cost
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $75&ndash;$200</span>
          <span><strong>Frequency:</strong> Every 12,000 mi or annually</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">Professional</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Wheel alignment refers to adjusting the angles of your wheels so they are set to
          the manufacturer&apos;s specifications. Proper alignment ensures your tires make
          optimal contact with the road, your vehicle tracks straight, and your tires wear
          evenly. Misalignment causes premature tire wear, poor handling, increased fuel
          consumption, and can even compromise safety during emergency maneuvers. A wheel
          alignment is one of the most cost-effective services you can get to protect your
          tire investment and maintain safe driving dynamics.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          What Is Wheel Alignment?
        </h2>
        <p>
          Alignment involves three primary angle adjustments: camber, caster, and toe. Camber
          is the inward or outward tilt of the tire when viewed from the front. Excessive
          camber causes the tire to wear heavily on one edge. Caster is the angle of the
          steering pivot when viewed from the side, affecting straight-line stability and
          steering return. Toe refers to whether the tires point inward or outward when viewed
          from above, and incorrect toe is the fastest way to destroy a set of tires.
        </p>
        <p>
          Modern alignment machines use laser or camera-based systems to measure these angles
          with extreme precision. The technician then adjusts the suspension components to
          bring all angles within the manufacturer&apos;s specified range. A proper four-wheel
          alignment measures and adjusts all four corners of the vehicle for optimal balance.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Wheel Alignment Cost
        </h2>
        <p>
          A front-end two-wheel alignment costs $50 to $100, while a full four-wheel alignment
          runs $75 to $200 at most shops in 2026. Four-wheel alignments are recommended for
          all modern vehicles, especially those with independent rear suspension. Some shops
          offer alignment warranty packages for $130 to $200 that include unlimited re-checks
          and adjustments for 6 to 12 months.
        </p>
        <p>
          Dealerships charge $100 to $250 for an alignment but use factory specifications and
          equipment. Independent alignment specialists often offer the best combination of
          price and precision, as alignment is their core service. Tire shops frequently offer
          discounted or complimentary alignments with a new tire purchase.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Signs You Need an Alignment
        </h2>
        <p>
          The vehicle pulling to the left or right is the most obvious sign. On a flat, straight
          road, your car should track straight with minimal steering input. An off-center
          steering wheel &mdash; where the wheel is slightly rotated even when driving straight
          &mdash; indicates a toe adjustment is needed.
        </p>
        <p>
          Uneven tire wear is the most telling physical evidence of misalignment. Check your
          tires for wear on one edge versus the other (camber issue) or a feathered, scalloped
          pattern across the tread (toe issue). Rapid tire wear on new tires within a few
          thousand miles almost always points to an alignment problem. Squealing tires during
          normal-speed turns and a general feeling of looseness or wandering at highway speeds
          are additional indicators.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Can You DIY a Wheel Alignment?
        </h2>
        <p>
          Wheel alignment requires specialized equipment that costs thousands of dollars, making
          it impractical for home mechanics. However, you can monitor your alignment health and
          catch problems early with basic tools:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=tire+tread+depth+gauge&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Tire tread depth gauge
            </a> &mdash; measure tread depth across the tire to catch uneven wear patterns early
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=digital+tire+pressure+gauge&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Digital tire pressure gauge
            </a> &mdash; maintaining correct pressure prevents wear that mimics alignment issues
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=magnetic+camber+gauge+automotive&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Magnetic camber gauge
            </a> &mdash; provides a rough camber reading to check if a professional alignment is needed
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          Always have a professional perform the actual alignment. Beyond the routine annual
          check, get an alignment after hitting a large pothole or curb, after any suspension
          or steering component replacement, when installing new tires, or if you notice any
          pulling, wandering, or uneven wear. If the technician finds worn suspension parts
          during the alignment &mdash; such as ball joints, tie rod ends, or control arm
          bushings &mdash; those must be replaced before the alignment can hold. Aligning a
          vehicle with worn suspension components is a waste of money because the angles will
          shift back out of spec almost immediately.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does a wheel alignment cost?
        </h3>
        <p>
          A front-end alignment costs $50 to $100, while a four-wheel alignment runs $75 to
          $200 at most shops. Some shops offer warranty packages that cover re-checks for 6 to
          12 months. Dealerships charge $100 to $250.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How often do I need a wheel alignment?
        </h3>
        <p>
          Most manufacturers recommend an alignment check every 12 months or 12,000 miles.
          Also get one after installing new tires, hitting a significant pothole, or replacing
          suspension components.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          What are the signs I need a wheel alignment?
        </h3>
        <p>
          Common signs include the vehicle pulling to one side, an off-center steering wheel,
          uneven or rapid tire wear, vibration at highway speeds, and squealing tires during
          turns.
        </p>
      </div>

      <GearRecommendation section="diy-tools" />

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find an Alignment Shop Near You
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted alignment specialists in your area.
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
