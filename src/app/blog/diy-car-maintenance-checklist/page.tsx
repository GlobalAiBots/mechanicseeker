import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "10 Car Maintenance Tasks You Can Do Yourself | MechanicSeeker",
  description:
    "Save $200-400 per year with these 10 easy DIY car maintenance tasks. Includes cost, time, and difficulty for each job from air filters to headlight restoration.",
  alternates: {
    canonical: "https://mechanicseeker.com/blog/diy-car-maintenance-checklist",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "10 Car Maintenance Tasks You Can Do Yourself",
  datePublished: "2026-04-15",
  author: {
    "@type": "Organization",
    name: "MechanicSeeker",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://mechanicseeker.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://mechanicseeker.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "10 Car Maintenance Tasks You Can Do Yourself",
      item: "https://mechanicseeker.com/blog/diy-car-maintenance-checklist",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What car maintenance can I do myself to save money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The easiest DIY car maintenance tasks include replacing air filters, swapping wiper blades, cleaning battery terminals, checking tire pressure, rotating tires, replacing light bulbs, topping off coolant, replacing cabin air filters, changing spark plugs, and restoring headlights. Together, these tasks can save you $200 to $400 per year in shop labor costs.",
      },
    },
    {
      "@type": "Question",
      name: "How much money can I save doing my own car maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By handling basic maintenance tasks yourself, most drivers save $200 to $400 per year. The biggest savings come from tasks with high shop labor markups relative to low part costs, such as air filter replacement, cabin air filter replacement, and wiper blade changes. Adding oil changes to your DIY routine can increase annual savings to $300 to $500.",
      },
    },
    {
      "@type": "Question",
      name: "What car repairs should I not do myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tasks that require specialized tools, diagnostic equipment, or advanced technical knowledge are best left to professionals. These include transmission work, timing belt replacement, suspension repairs, AC system service (which requires refrigerant handling certification), and any repair involving the vehicle's airbag system. When in doubt, consult a trusted mechanic.",
      },
    },
  ],
};

export default function DIYCarMaintenanceChecklist() {
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
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &raquo;{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">10 Car Maintenance Tasks You Can Do Yourself</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        10 Car Maintenance Tasks You Can Do Yourself
      </h1>
      <p className="text-sm text-gray-500 mb-8">Published April 15, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          You do not need to be a mechanic to keep your car running smoothly.
          Many routine maintenance tasks are simple enough for anyone to handle
          with basic tools and a free afternoon. By doing these jobs yourself
          instead of paying shop labor rates, you can save{" "}
          <strong className="text-[#1A1A1A]">$200 to $400 per year</strong>{" "}
          &mdash; and you&apos;ll gain a better understanding of how your
          vehicle works. Here are ten tasks ranked roughly from easiest to most
          involved, along with the cost and time for each. For a complete
          schedule of when each service is due, see our{" "}
          <Link
            href="/blog/car-maintenance-schedule"
            className="text-[#E67E22] font-semibold hover:underline"
          >
            car maintenance schedule guide
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          1. Replace the Engine Air Filter &mdash; $15, 5 Minutes
        </h2>
        <p>
          This is the easiest maintenance task on any car. Open the air filter
          box (usually held by clips or a few screws on top of the engine),
          pull out the old filter, and drop in the new one. A clean air filter
          improves airflow to the engine, which helps fuel efficiency and
          performance. Shops charge $30 to $60 for this service, including a
          markup on the filter. Do it yourself for about $15 and five minutes
          of your time. Replace it every 15,000 to 30,000 miles or once a year.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          2. Swap Wiper Blades &mdash; $20, 10 Minutes
        </h2>
        <p>
          Worn wiper blades leave streaks, skip across the glass, and reduce
          visibility in rain. New blades cost $10 to $25 for a pair and snap
          on in minutes. Most auto parts stores will look up the correct size
          for your vehicle and even install them for free, but the process is
          simple enough to do in a parking lot. Replace your wipers every 6 to
          12 months or whenever they start streaking.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          3. Clean Battery Terminals &mdash; Free, 10 Minutes
        </h2>
        <p>
          Corrosion on your battery terminals &mdash; the crusty white or
          green buildup on the posts &mdash; can cause starting problems and
          electrical issues. Disconnect the negative cable first, then the
          positive. Scrub the terminals and cable ends with a wire brush or
          even a paste of baking soda and water. Reconnect positive first,
          then negative. This costs nothing if you already have a wire brush
          and keeps your electrical system running reliably.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          4. Check and Adjust Tire Pressure &mdash; Free, 5 Minutes
        </h2>
        <p>
          Properly inflated tires improve fuel economy, extend tire life, and
          keep you safe. Check pressure monthly with a gauge (or use the one
          at any gas station) and inflate to the number listed on the driver&apos;s
          door jamb sticker &mdash; not the number on the tire sidewall. Under-
          inflated tires wear faster on the edges, waste gas, and handle
          poorly. Over-inflated tires wear in the center and reduce grip. This
          takes five minutes and costs nothing.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          5. Rotate Your Tires &mdash; $0 with a Jack, 30 Minutes
        </h2>
        <p>
          Tire rotation moves tires from one position to another (typically
          front-to-back) to equalize wear and extend the life of your tires.
          Most shops charge $25 to $50 for this service. If you already own a
          jack and jack stands, you can do it for free. The most common pattern
          for front-wheel drive vehicles is to move the front tires straight to
          the rear and cross the rear tires to the front. Check your owner&apos;s
          manual for the recommended pattern and interval, which is usually
          every 5,000 to 7,500 miles.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          6. Replace Light Bulbs &mdash; $5 to $15, 10 Minutes
        </h2>
        <p>
          A burned-out headlight, tail light, or turn signal bulb is both a
          safety hazard and a ticket waiting to happen. Most bulbs are accessed
          from behind the headlight housing under the hood or by removing a
          small panel in the trunk area. Twist the socket, pull the old bulb,
          push in the new one, and twist the socket back in place. Bulbs cost
          $5 to $15 each. Some modern LED and HID setups are more complex, but
          standard halogen bulbs are a quick and easy swap.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          7. Top Off Coolant &mdash; $10, 5 Minutes
        </h2>
        <p>
          Your engine&apos;s cooling system prevents overheating, which can
          cause catastrophic damage. Check the coolant level in the overflow
          reservoir (never open the radiator cap when the engine is hot) and
          top it off with the correct type of coolant mixed 50/50 with
          distilled water. A jug of pre-mixed coolant costs about $10 and will
          last several top-offs. If you notice the level dropping frequently,
          that is a{" "}
          <Link
            href="/blog/when-to-see-a-mechanic"
            className="text-[#E67E22] font-semibold hover:underline"
          >
            sign you need to see a mechanic
          </Link>{" "}
          &mdash; you may have a leak.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          8. Replace the Cabin Air Filter &mdash; $15, 10 Minutes
        </h2>
        <p>
          The cabin air filter cleans the air that flows through your heating
          and air conditioning system. A dirty cabin filter reduces airflow,
          causes musty smells, and makes your HVAC system work harder. The
          filter is usually located behind the glove box or under the dashboard
          and can be accessed by removing a few clips. A replacement filter
          costs $12 to $20. Shops charge $40 to $80 for this service &mdash;
          almost entirely labor markup. Replace it every 15,000 to 20,000
          miles or once a year.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          9. Change Spark Plugs &mdash; $20 to $40, 30 Minutes (Moderate)
        </h2>
        <p>
          Spark plugs ignite the air-fuel mixture in your engine&apos;s
          cylinders. Worn plugs cause misfires, rough idling, poor fuel
          economy, and difficulty starting. Most four-cylinder engines have
          easily accessible spark plugs that you can reach with a spark plug
          socket and ratchet. A set of four plugs costs $20 to $40. This task
          is rated moderate because you need to gap the plugs correctly and
          torque them to the proper specification &mdash; overtightening can
          crack the ceramic or damage the cylinder head. Shops charge $100 to
          $200 for this service on a four-cylinder engine. Vehicles with V6 or
          V8 engines may have plugs that are harder to access, making shop
          service a better option.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          10. Headlight Restoration &mdash; $10, 20 Minutes
        </h2>
        <p>
          Foggy, yellowed headlights reduce nighttime visibility by up to 80
          percent. A headlight restoration kit from any auto parts store costs
          about $10 and includes sandpaper, polishing compound, and a UV
          sealant. The process involves wet-sanding the oxidized layer off the
          lens and polishing it to clarity. The result is dramatic &mdash;
          headlights that look new and provide significantly better light
          output. Professional shops charge $50 to $150 for this service.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Your Total Savings: $200 to $400 Per Year
        </h2>
        <p>
          By handling these ten tasks yourself, you avoid shop labor charges
          that typically run $80 to $150 per hour. The parts cost a fraction
          of what shops charge because you eliminate the retail markup. Add a{" "}
          <Link
            href="/blog/should-i-change-my-own-oil"
            className="text-[#E67E22] font-semibold hover:underline"
          >
            DIY oil change
          </Link>{" "}
          to this list and your annual savings climb even higher. Most
          importantly, you build familiarity with your vehicle that helps you
          catch small problems before they become expensive repairs.
        </p>
        <p>
          Not every job belongs in the DIY category, of course. For anything
          beyond basic maintenance &mdash; transmission issues, suspension
          work, electrical diagnostics, or AC repair &mdash; you need a
          qualified professional. Use MechanicSeeker to{" "}
          <Link href="/near-me" className="text-[#E67E22] font-semibold hover:underline">
            find a trusted mechanic near you
          </Link>{" "}
          for the jobs that require expertise and specialized equipment.
        </p>
      </div>

      <GearRecommendation section="maintenance" />
    </main>
  );
}
