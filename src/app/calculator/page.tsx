"use client";

import Link from "next/link";
import { useState } from "react";

const schedule = [
  { service: "Oil Change", interval: 5000, icon: "🛢️", cost: "$30-75", diy: "Easy", slug: "/services/oil-change" },
  { service: "Tire Rotation", interval: 7500, icon: "🛞", cost: "$20-50", diy: "Easy", slug: "/services/tire-rotation" },
  { service: "Brake Inspection", interval: 12000, icon: "🛑", cost: "$50-150", diy: "Moderate", slug: "/services/brake-repair" },
  { service: "Air Filter", interval: 15000, icon: "💨", cost: "$15-40", diy: "Easy", slug: "" },
  { service: "Transmission Fluid", interval: 30000, icon: "⚙️", cost: "$150-300", diy: "Hard", slug: "/services/transmission" },
  { service: "Coolant Flush", interval: 30000, icon: "❄️", cost: "$100-200", diy: "Moderate", slug: "" },
  { service: "Brake Pad Replacement", interval: 40000, icon: "🔧", cost: "$150-400", diy: "Moderate", slug: "/services/brake-repair" },
  { service: "Spark Plugs", interval: 60000, icon: "⚡", cost: "$60-200", diy: "Moderate", slug: "" },
  { service: "Timing Belt", interval: 75000, icon: "🔗", cost: "$500-1000", diy: "Professional", slug: "" },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Calculator", item: "https://mechanicseeker.com/calculator" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often should I service my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most vehicles need an oil change every 5,000 to 7,500 miles, tire rotation every 5,000 to 7,500 miles, and brake inspection every 12,000 miles. Major services like transmission fluid changes and timing belt replacements happen at longer intervals of 30,000 to 75,000 miles. Always consult your owner's manual for your specific vehicle's maintenance schedule.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I skip scheduled maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skipping scheduled maintenance leads to accelerated wear, reduced fuel economy, and potentially catastrophic failures. For example, neglecting oil changes causes engine sludge buildup and premature engine wear. Ignoring timing belt replacement can result in a snapped belt that destroys the engine, turning a $500 preventive service into a $3,000 to $5,000 engine replacement.",
      },
    },
    {
      "@type": "Question",
      name: "Can I do my own car maintenance to save money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many routine maintenance tasks are beginner-friendly DIY projects. Oil changes, air filter replacements, and tire rotations require basic tools and can save you $50 to $100 per service. More advanced tasks like brake pad replacement and spark plug changes are manageable for moderately experienced DIYers. However, jobs like timing belt replacement and transmission service are best left to professional mechanics due to complexity and the risk of costly mistakes.",
      },
    },
  ],
};

function getDiyColor(diy: string) {
  switch (diy) {
    case "Easy":
      return "bg-green-100 text-green-800";
    case "Moderate":
      return "bg-yellow-100 text-yellow-800";
    case "Hard":
      return "bg-orange-100 text-orange-800";
    case "Professional":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function CalculatorPage() {
  const [mileage, setMileage] = useState<number | "">("");

  const currentMileage = typeof mileage === "number" ? mileage : 0;

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
        &raquo; <span className="text-gray-700">Maintenance Calculator</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Car Maintenance Schedule Calculator
      </h1>
      <p className="text-[#1A1A1A] leading-relaxed mb-8">
        Enter your current mileage to see which maintenance services are due now and
        when the next ones are coming up. Stay ahead of costly repairs by following a
        simple maintenance schedule tailored to your vehicle&apos;s mileage.
      </p>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-6 mb-10">
        <label
          htmlFor="mileage"
          className="block text-lg font-semibold text-[#2C3E50] mb-2 font-[Cabin]"
        >
          Current Odometer Reading (miles)
        </label>
        <input
          id="mileage"
          type="number"
          min={0}
          placeholder="e.g. 45000"
          value={mileage}
          onChange={(e) => {
            const val = e.target.value;
            setMileage(val === "" ? "" : Math.max(0, parseInt(val, 10) || 0));
          }}
          className="w-full md:w-72 border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
        />
        {currentMileage > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing maintenance schedule for {currentMileage.toLocaleString()} miles
          </p>
        )}
      </div>

      {currentMileage > 0 && (
        <div className="space-y-4 mb-12">
          {schedule.map((item) => {
            const nextDue = Math.ceil(currentMileage / item.interval) * item.interval;
            const isDueNow = nextDue <= currentMileage;
            const milesUntilDue = nextDue - currentMileage;

            let statusLabel: string;
            let statusColor: string;
            if (isDueNow) {
              statusLabel = "Due Now";
              statusColor = "text-red-600 bg-red-50 border-red-200";
            } else if (milesUntilDue <= item.interval * 0.2) {
              statusLabel = `Due at ${nextDue.toLocaleString()} mi`;
              statusColor = "text-yellow-700 bg-yellow-50 border-yellow-200";
            } else {
              statusLabel = `Due at ${nextDue.toLocaleString()} mi`;
              statusColor = "text-green-700 bg-green-50 border-green-200";
            }

            return (
              <div
                key={item.service}
                className={`border rounded-lg p-4 ${statusColor}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] font-[Cabin]">
                        {item.slug ? (
                          <Link href={item.slug} className="hover:underline">
                            {item.service}
                          </Link>
                        ) : (
                          item.service
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Every {item.interval.toLocaleString()} miles &middot; {item.cost}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getDiyColor(item.diy)}`}
                    >
                      DIY: {item.diy}
                    </span>
                    <span className="font-semibold text-sm whitespace-nowrap">
                      {statusLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!currentMileage && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">Enter your mileage above to see your maintenance schedule</p>
        </div>
      )}

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6 mt-8">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How often should I service my car?
        </h3>
        <p>
          Most vehicles need an oil change every 5,000 to 7,500 miles, tire rotation every
          5,000 to 7,500 miles, and brake inspection every 12,000 miles. Major services like
          transmission fluid changes and timing belt replacements happen at longer intervals
          of 30,000 to 75,000 miles. Always consult your owner&apos;s manual for your specific
          vehicle&apos;s maintenance schedule.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          What happens if I skip scheduled maintenance?
        </h3>
        <p>
          Skipping scheduled maintenance leads to accelerated wear, reduced fuel economy, and
          potentially catastrophic failures. For example, neglecting oil changes causes engine
          sludge buildup and premature engine wear. Ignoring timing belt replacement can result
          in a snapped belt that destroys the engine, turning a $500 preventive service into a
          $3,000 to $5,000 engine replacement.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Can I do my own car maintenance to save money?
        </h3>
        <p>
          Many routine maintenance tasks are beginner-friendly DIY projects. Oil changes, air
          filter replacements, and tire rotations require basic tools and can save you $50 to
          $100 per service. More advanced tasks like brake pad replacement and spark plug changes
          are manageable for moderately experienced DIYers. However, jobs like timing belt
          replacement and transmission service are best left to professional mechanics due to
          complexity and the risk of costly mistakes.
        </p>
      </div>

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Need a Mechanic for Your Next Service?
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted shops in your area.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#E67E22] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#d35400] transition-colors"
        >
          Find a Mechanic Near You &rarr;
        </Link>
      </div>
    </main>
  );
}
