import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Timing Belt Replacement Cost by Vehicle in 2026 | MechanicSeeker",
  description:
    "Timing belt replacement costs $500 to $1,000 for most vehicles in 2026. Honda and Toyota run $400-$800, European cars $800-$1,500. Learn about interference engines and when to replace.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/costs/timing-belt",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
    { "@type": "ListItem", position: 2, name: "Cost Guides", item: "https://www.mechanicseeker.com/costs" },
    { "@type": "ListItem", position: 3, name: "Timing Belt Replacement Cost", item: "https://www.mechanicseeker.com/costs/timing-belt" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happens if a timing belt breaks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In an interference engine, a broken timing belt causes the pistons to strike the open valves, resulting in catastrophic engine damage that can cost $3,000 to $7,000 or more to repair. In a non-interference engine, the engine simply stops running but internal damage is unlikely. Most modern cars use interference engines, making timely belt replacement critical.",
      },
    },
    {
      "@type": "Question",
      name: "How often should a timing belt be replaced?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most manufacturers recommend timing belt replacement every 60,000 to 100,000 miles, or every 7 to 10 years, whichever comes first. The exact interval varies by make and model. Check your owner's manual or ask your mechanic for your specific vehicle's recommendation.",
      },
    },
    {
      "@type": "Question",
      name: "Does my car have a timing belt or timing chain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many modern vehicles use a timing chain instead of a belt. Timing chains are designed to last the life of the engine and do not require scheduled replacement. Common vehicles with timing chains include most GM, Ford, and Chrysler models made after 2005. Many Honda, Toyota, and Subaru models still use timing belts. Check your owner's manual or ask your mechanic.",
      },
    },
  ],
};

export default function TimingBeltCostGuide() {
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
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &raquo;{" "}
        <Link href="/costs" className="hover:underline">
          Cost Guides
        </Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">Timing Belt Replacement Cost</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Timing Belt Replacement Cost by Vehicle
      </h1>
      <p className="text-sm text-gray-500 mb-8">Updated April 15, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          The timing belt is one of the most important maintenance items on your
          car, yet many drivers overlook it because there are no obvious symptoms
          until it fails. A timing belt replacement typically costs $500 to $1,000
          for most vehicles in 2026, though the price varies significantly by make
          and model. Skipping this service on an interference engine can lead to
          catastrophic engine damage costing thousands of dollars, making
          preventive replacement one of the smartest investments you can make.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Timing Belt Cost by Vehicle Brand
        </h2>
        <p>
          <strong>Honda and Toyota ($400 to $800)</strong> &mdash; Japanese
          manufacturers that use timing belts tend to have more accessible engine
          layouts and widely available aftermarket parts, keeping costs lower. A
          Honda Accord or Toyota Camry with a four-cylinder engine sits at the
          lower end around $400 to $600. V6 models like the Honda Pilot or Toyota
          Highlander run $600 to $800 because the engine bay is tighter and the
          job takes longer.
        </p>
        <p>
          <strong>Subaru ($500 to $900)</strong> &mdash; Subaru&apos;s boxer
          engine layout makes timing belt access moderately difficult. The WRX,
          Forester, and Outback with the 2.5-liter engine typically cost $500 to
          $700 at an independent shop. Including the water pump and tensioner in
          the service (highly recommended since they are accessed during the job)
          pushes the total toward $800 to $900.
        </p>
        <p>
          <strong>European vehicles ($800 to $1,500)</strong> &mdash; Volkswagen,
          Audi, BMW, and Volvo models with timing belts cost significantly more due
          to tighter engine compartments, complex accessory drive systems, and
          higher parts prices. An Audi A4 or VW Passat with the 2.0T engine
          typically runs $800 to $1,100. Volvo five-cylinder engines and BMW
          diesels can reach $1,200 to $1,500.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          What Is Included in a Timing Belt Service
        </h2>
        <p>
          A thorough timing belt service goes beyond just the belt itself. Most
          reputable shops replace the belt, the tensioner pulley, and the idler
          pulley as a kit. These components wear at similar rates, and replacing
          them together avoids the labor cost of going back in if one fails later.
          A quality belt kit costs $100 to $300 for parts depending on the vehicle.
        </p>
        <p>
          Many mechanics strongly recommend replacing the water pump at the same
          time. The water pump is driven by or located behind the timing belt on
          most engines, meaning it is already exposed during the belt job. A water
          pump replacement adds $50 to $150 in parts and minimal additional labor.
          If the water pump fails later, the entire timing belt job must be
          repeated just to access it &mdash; effectively doubling your cost.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Interference vs Non-Interference Engines
        </h2>
        <p>
          This distinction determines how serious a timing belt failure is.
          <strong> Interference engines</strong> have pistons and valves that
          occupy the same space in the cylinder at different points in the engine
          cycle. The timing belt keeps them synchronized. If the belt snaps, the
          pistons slam into the open valves, bending them and potentially cracking
          pistons, damaging the cylinder head, or destroying the engine entirely.
          Repair costs range from $3,000 to $7,000 or more.
        </p>
        <p>
          <strong>Non-interference engines</strong> have enough clearance between
          pistons and valves that a belt failure simply stalls the engine without
          causing internal damage. You will need a tow and a belt replacement, but
          the engine itself survives. Unfortunately, most modern engines are
          interference designs, so preventive replacement is critical.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          DIY vs Mechanic: Timing Belt Replacement
        </h2>
        <p>
          A DIY timing belt replacement costs $100 to $300 in parts, potentially
          saving $400 to $700 in labor. However, this is an advanced repair that
          requires precise alignment of timing marks, special tools for some
          vehicles, and significant mechanical knowledge. Incorrect installation
          can cause the engine to run poorly or, worse, result in the same
          piston-to-valve contact you were trying to prevent. Unless you are an
          experienced home mechanic, this job is best left to a professional.
        </p>

        <GearRecommendation section="diy-tools" />

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Find a Timing Belt Specialist Near You
        </h2>
        <p>
          Due for a timing belt replacement?{" "}
          <Link href="/near-me" className="text-[#E67E22] hover:underline font-semibold">
            Search for mechanics near you
          </Link>{" "}
          on MechanicSeeker and compare quotes from independent shops and
          dealerships. A qualified technician will also inspect related components
          and advise whether your water pump and tensioner should be replaced at
          the same time. You can also{" "}
          <Link href="/shops" className="text-[#E67E22] hover:underline font-semibold">
            browse our full shop directory
          </Link>{" "}
          to find a timing belt specialist in your area.
        </p>
      </div>
    </main>
  );
}
