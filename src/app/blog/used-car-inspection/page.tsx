import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Used Car Pre-Purchase Inspection: What to Check | MechanicSeeker",
  description:
    "Don't buy a used car without checking these critical items first. Complete pre-purchase inspection checklist covering engine, transmission, brakes, body, and electrical systems.",
  alternates: {
    canonical: "https://mechanicseeker.com/blog/used-car-inspection",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Used Car Pre-Purchase Inspection: What to Check",
  datePublished: "2026-04-15",
  author: { "@type": "Organization", name: "MechanicSeeker" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://mechanicseeker.com/blog" },
    { "@type": "ListItem", position: 3, name: "Used Car Pre-Purchase Inspection" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a pre-purchase inspection cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A professional pre-purchase inspection typically costs $100 to $250 depending on how thorough the inspection is and your location. Some mechanics offer a basic visual inspection for less, while comprehensive inspections that include a test drive, undercarriage inspection on a lift, and computer diagnostics cost more. This is one of the best investments you can make when buying a used car.",
      },
    },
    {
      "@type": "Question",
      name: "Can a dealer refuse a pre-purchase inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A reputable dealer should have no problem allowing an independent pre-purchase inspection. If a dealer or private seller refuses to let you have the car inspected, treat that as a major red flag and walk away. Sellers who are confident in the condition of their vehicle welcome inspections because they help close the sale.",
      },
    },
    {
      "@type": "Question",
      name: "What are the biggest red flags when buying a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The biggest red flags include a salvage or rebuilt title, signs of flood damage (musty smell, water stains, corroded electrical connectors), mismatched paint indicating accident repair, milky residue on the oil cap suggesting a head gasket leak, transmission slipping or harsh shifting, and a seller who refuses to allow an independent inspection.",
      },
    },
  ],
};

export default function UsedCarInspection() {
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
        <span className="text-gray-700">Used Car Pre-Purchase Inspection</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Used Car Pre-Purchase Inspection: What to Check
      </h1>
      <p className="text-sm text-gray-500 mb-8">Published April 15, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Buying a used car can save you thousands compared to buying new, but it
          comes with risk. A thorough pre-purchase inspection is the best way to
          protect yourself from hidden problems that could cost hundreds or
          thousands in repairs after the sale. Whether you hire a professional
          mechanic or conduct your own initial evaluation, this checklist covers
          everything you need to examine before signing on the dotted line.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Before You Visit: Research the Vehicle
        </h2>
        <p>
          Start your inspection before you even see the car in person. Run a
          vehicle history report through Carfax or AutoCheck using the VIN. Look
          for accident history, title issues (salvage, rebuilt, or flood titles),
          odometer discrepancies, and the number of previous owners. A clean
          history report does not guarantee a perfect car, but a bad one is a
          clear reason to walk away or negotiate a significantly lower price.
        </p>
        <p>
          Research common problems for the specific year, make, and model. Every
          vehicle has known weak points. A quick search for recalls and technical
          service bulletins tells you what to watch for during the physical
          inspection. This knowledge also gives you leverage when negotiating.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Exterior and Body Inspection
        </h2>
        <p>
          Walk around the car slowly and look at the body panels from multiple
          angles. Mismatched paint, uneven panel gaps, or overspray on trim and
          rubber seals indicate previous accident repair. Run your hand along the
          fenders and doors to feel for ripples or filler that are hard to see.
          Check for rust along the wheel wells, rocker panels, and door bottoms
          &mdash; surface rust is cosmetic, but bubbling or perforation means
          structural issues.
        </p>
        <p>
          Examine all the glass for chips, cracks, and signs of non-original
          replacement. Check that all lights, turn signals, and brake lights
          function. Look at the tires for even wear &mdash; uneven wear across the
          tread suggests alignment problems, worn suspension components, or
          neglected tire rotations.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Under the Hood
        </h2>
        <p>
          With the engine cold, check the oil by pulling the dipstick. The oil
          should be amber to dark brown. Milky or foamy residue on the oil cap is
          a major red flag &mdash; it suggests coolant mixing with oil, which
          typically means a blown head gasket. This single repair can cost $1,500
          to $3,000. Check the coolant reservoir for proper level and color. Brown
          or oily coolant is another head gasket warning.
        </p>
        <p>
          Inspect the{" "}
          <Link href="/costs/timing-belt" className="text-[#E67E22] hover:underline font-semibold">
            timing belt or chain
          </Link>{" "}
          service records if the vehicle uses a belt. Ask whether it has been
          replaced and when. A missed timing belt on a high-mileage car is a
          ticking time bomb that can destroy the engine.
        </p>
        <p>
          Look for fluid leaks, cracked or brittle hoses, corroded battery
          terminals, and any signs of poor previous repairs like mismatched bolts,
          zip ties holding things together, or electrical tape on wiring. These
          suggest the car was maintained cheaply rather than properly.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Transmission and Drivetrain
        </h2>
        <p>
          On an automatic, check the transmission fluid if the vehicle has a
          dipstick (many modern cars do not). The fluid should be red or pink with
          no burnt smell. Dark brown fluid with a burnt odor indicates the
          transmission has been overheated or neglected. A{" "}
          <Link href="/costs/transmission-repair" className="text-[#E67E22] hover:underline font-semibold">
            transmission rebuild
          </Link>{" "}
          costs $1,500 to $3,500, making this one of the most expensive hidden
          problems.
        </p>
        <p>
          During the test drive, pay attention to how the transmission shifts.
          Automatic transmissions should shift smoothly and promptly. Slipping,
          harsh shifts, delayed engagement, or shuddering are all warning signs.
          For manual transmissions, test every gear and check that the clutch
          engages smoothly without grabbing, slipping, or chattering.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Brakes and Suspension
        </h2>
        <p>
          Test the brakes at various speeds. The car should stop straight without
          pulling to either side. Listen for squealing or grinding &mdash;
          indicators that{" "}
          <Link href="/costs/brake-pads" className="text-[#E67E22] hover:underline font-semibold">
            brake pads
          </Link>{" "}
          need replacement. Feel for pulsation in the brake pedal, which suggests
          warped rotors. A soft or spongy pedal may mean air in the brake lines
          or a failing master cylinder.
        </p>
        <p>
          Push down firmly on each corner of the car and release. The car should
          bounce once and settle. Multiple bounces indicate worn shocks or struts.
          During the test drive on rough roads, listen for clunking or rattling
          from the suspension. Worn ball joints, tie rod ends, and control arm
          bushings are common on older vehicles and cost $200 to $500 per corner
          to address.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Interior and Electrical
        </h2>
        <p>
          Test every button, switch, and feature. Roll all windows up and down.
          Test the AC on its coldest setting (it should blow cold within 30
          seconds), the heater on its hottest, the radio, the power seats, the
          sunroof, and every accessory. Electrical repairs are time-consuming and
          expensive to diagnose, so it is better to discover issues now.
        </p>
        <p>
          Smell the interior carefully. A musty or mildew smell can indicate flood
          damage or a persistent water leak. Lift the floor mats and check for
          dampness, staining, or silt deposits. Pull back the trunk carpet and
          check the spare tire well for standing water or rust.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Get a Professional Inspection
        </h2>
        <p>
          Even if you check everything on this list, a professional pre-purchase
          inspection is worth the $100 to $250 investment. A mechanic with a lift
          can inspect the undercarriage, exhaust system, and suspension components
          you cannot see from the ground. They will also run a computer diagnostic
          scan to check for stored trouble codes that may not trigger a dashboard
          warning light.
        </p>
        <p>
          <Link href="/near-me" className="text-[#E67E22] hover:underline font-semibold">
            Find a mechanic near you
          </Link>{" "}
          on MechanicSeeker and ask specifically about pre-purchase inspection
          services. Many shops offer this as a standalone service and will provide
          a written report you can use to negotiate the purchase price or walk
          away with confidence.
        </p>
      </div>
    </main>
  );
}
