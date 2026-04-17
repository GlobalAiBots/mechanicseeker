import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oil Change: Cost, Frequency & DIY Guide | MechanicSeeker",
  description:
    "How much does an oil change cost in 2026? Learn about oil change frequency, synthetic vs conventional oil, DIY tips, and when to visit a mechanic. $30-75 typical cost.",
  alternates: {
    canonical: "https://mechanicseeker.com/services/oil-change",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Oil Change", item: "https://mechanicseeker.com/services/oil-change" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often should I get an oil change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most modern vehicles using synthetic oil need an oil change every 5,000 to 7,500 miles or every 6 to 12 months, whichever comes first. Older vehicles using conventional oil may need changes every 3,000 to 5,000 miles. Always check your owner's manual for the manufacturer's recommendation for your specific engine.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an oil change cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A conventional oil change typically costs $30 to $50 at most shops in 2026. A full synthetic oil change runs $50 to $75 for standard vehicles, and $75 to $120 for trucks and SUVs that require more oil. DIY oil changes cost $20 to $40 for materials, saving you $20 to $50 per service.",
      },
    },
    {
      "@type": "Question",
      name: "Is synthetic oil worth the extra cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, synthetic oil is worth the extra cost for most drivers. It lasts 5,000 to 7,500 miles compared to 3,000 to 5,000 miles for conventional oil, provides better engine protection at extreme temperatures, and reduces engine sludge buildup. The longer change interval means fewer oil changes per year, often making synthetic oil cheaper overall despite the higher per-service cost.",
      },
    },
  ],
};

export default function OilChangePage() {
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
        <span className="text-gray-700">Oil Change</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Oil Change: Cost, Frequency &amp; DIY Guide
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $30&ndash;$75</span>
          <span><strong>Frequency:</strong> Every 5,000&ndash;7,500 mi</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Easy</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          An oil change is the single most important routine maintenance you can do for your
          vehicle. Engine oil lubricates moving parts, reduces friction, dissipates heat, and
          carries away contaminants. Over time and miles, oil breaks down and loses its
          protective properties. Running old, degraded oil leads to increased engine wear,
          reduced fuel economy, and eventually catastrophic engine failure &mdash; a repair
          that costs thousands of dollars compared to the modest price of regular oil changes.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          How Much Does an Oil Change Cost in 2026?
        </h2>
        <p>
          A standard conventional oil change at an independent shop or quick-lube chain costs
          between $30 and $50 in 2026. This includes 4 to 5 quarts of conventional motor oil,
          a new oil filter, and the labor to drain, fill, and check fluid levels. Most shops
          complete the service in 15 to 30 minutes.
        </p>
        <p>
          Full synthetic oil changes run $50 to $75 for standard sedans and $75 to $120 for
          trucks and SUVs that hold 6 to 8 quarts. Dealerships charge the most at $75 to $150,
          but often include a multi-point inspection. Quick-lube chains like Valvoline and Jiffy
          Lube fall in the middle, while independent mechanics typically offer the best value
          for quality service.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Synthetic vs. Conventional Oil
        </h2>
        <p>
          Synthetic oil is engineered from chemically modified base oils that provide superior
          performance across temperature extremes. It flows better in cold weather for easier
          starts and resists breakdown in high heat during summer driving or towing. Conventional
          oil is refined from crude petroleum and works well for older engines with simpler
          designs. Most vehicles manufactured after 2010 specify synthetic or synthetic-blend
          oil from the factory.
        </p>
        <p>
          While synthetic oil costs more per quart, the extended change interval of 5,000 to
          7,500 miles means fewer visits to the shop each year. Many drivers find that synthetic
          oil is actually cheaper on an annual basis when factoring in the reduced number of
          oil changes.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          How to Change Your Own Oil
        </h2>
        <p>
          Changing your own oil is one of the easiest and most rewarding DIY car maintenance
          tasks. You need just a few basic tools and about 30 minutes. The process is
          straightforward: raise the vehicle, drain the old oil, replace the filter, add new
          oil, and check the level. A DIY oil change costs $20 to $40 for materials, saving
          you $20 to $50 per service compared to shop prices.
        </p>
        <p>
          Here are the essential tools for a DIY oil change:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=oil+drain+pan&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Oil drain pan
            </a> &mdash; catches old oil cleanly, look for one with a pour spout for easy recycling
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=oil+filter+wrench+set&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Oil filter wrench set
            </a> &mdash; makes removing the old filter easy without damaging surrounding components
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=car+jack+stands&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Jack stands
            </a> &mdash; essential for safely supporting the vehicle while you work underneath
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          While DIY oil changes are simple, certain situations call for professional service.
          Visit a mechanic if your oil light comes on between changes, you notice dark or
          gritty oil on the dipstick well before your next change is due, you see oil spots
          under your vehicle indicating a leak, or you hear knocking or ticking sounds from
          the engine. These symptoms may indicate issues beyond a simple oil change, such as
          a leaking gasket, worn oil pump, or internal engine damage that requires professional
          diagnosis.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How often should I get an oil change?
        </h3>
        <p>
          Most modern vehicles using synthetic oil need an oil change every 5,000 to 7,500
          miles or every 6 to 12 months, whichever comes first. Older vehicles using
          conventional oil may need changes every 3,000 to 5,000 miles. Always check your
          owner&apos;s manual for the manufacturer&apos;s recommendation for your specific engine.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does an oil change cost?
        </h3>
        <p>
          A conventional oil change typically costs $30 to $50 at most shops in 2026. A full
          synthetic oil change runs $50 to $75 for standard vehicles, and $75 to $120 for
          trucks and SUVs that require more oil. DIY oil changes cost $20 to $40 for materials,
          saving you $20 to $50 per service.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Is synthetic oil worth the extra cost?
        </h3>
        <p>
          Yes, synthetic oil is worth the extra cost for most drivers. It lasts 5,000 to 7,500
          miles compared to 3,000 to 5,000 miles for conventional oil, provides better engine
          protection at extreme temperatures, and reduces engine sludge buildup. The longer
          change interval means fewer oil changes per year, often making synthetic oil cheaper
          overall despite the higher per-service cost.
        </p>
      </div>

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find an Oil Change Shop Near You
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
