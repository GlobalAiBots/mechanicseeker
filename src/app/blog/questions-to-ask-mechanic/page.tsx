import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "15 Questions to Ask Your Mechanic Before Saying Yes to Repairs | MechanicSeeker",
  description:
    "Don't get overcharged. The 15 questions every car owner should ask before authorizing repairs — from written estimates to warranty on labor and old parts.",
  alternates: {
    canonical: "https://mechanicseeker.com/blog/questions-to-ask-mechanic",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "15 Questions to Ask Your Mechanic Before Saying Yes to Repairs",
  datePublished: "2026-04-19",
  author: { "@type": "Organization", name: "MechanicSeeker" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mechanicseeker.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://mechanicseeker.com/blog" },
    { "@type": "ListItem", position: 3, name: "Questions to Ask Your Mechanic", item: "https://mechanicseeker.com/blog/questions-to-ask-mechanic" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it rude to ask a mechanic a lot of questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. Good mechanics expect and welcome questions — it is your car and your money. A shop that becomes irritated or defensive when you ask for written estimates, warranty details, or a second opinion is signaling that you should take your business elsewhere.",
      },
    },
    {
      "@type": "Question",
      name: "Can I legally get my old parts back after a repair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most U.S. states, yes — and several states legally require shops to offer the parts back to the customer upon request before the repair begins. Ask at the time you authorize the work. The exception is core-charged parts (like alternators or starters) that the shop must return to the rebuilder.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if a repair is really necessary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ask the mechanic to show you the problem in person, get a written estimate, and then take the estimate to a second shop for a fresh opinion. Most honest mechanics will distinguish between 'safety critical, do it today' repairs and 'keep an eye on this' items that can wait.",
      },
    },
  ],
};

export default function QuestionsToAskMechanic() {
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
        <span className="text-gray-700">Questions to Ask Your Mechanic</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        15 Questions to Ask Your Mechanic Before Saying Yes to Repairs
      </h1>
      <p className="text-sm text-gray-500 mb-8">Published April 19, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          The difference between a fair repair bill and an inflated one often
          comes down to the questions you asked before signing the work
          order. Good mechanics welcome scrutiny; bad ones count on you not
          asking. Here are fifteen questions every car owner should put to a
          shop before authorizing work, why each one matters, and what a
          trustworthy answer looks like.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          1. Can I get a written estimate before you start?
        </h2>
        <p>
          <em>Why it matters:</em> Verbal quotes evaporate. Most states
          require a written estimate before the shop exceeds a certain
          dollar threshold.{" "}
          <em>Good answer:</em> &quot;Of course — here&apos;s the estimate;
          sign the top copy when you&apos;re ready.&quot;
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          2. Do you warranty your labor?
        </h2>
        <p>
          <em>Why it matters:</em> If the repair fails early, you should not
          pay twice.{" "}
          <em>Good answer:</em> A minimum of 12 months or 12,000 miles;
          many reputable chains offer 24/24.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          3. What warranty comes with the parts?
        </h2>
        <p>
          <em>Why it matters:</em> Parts warranties vary wildly — some
          aftermarket parts carry a lifetime guarantee, others 30 days.{" "}
          <em>Good answer:</em> The shop should name the manufacturer and
          the warranty term in writing.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          4. Can I have the old parts back?
        </h2>
        <p>
          <em>Why it matters:</em> Seeing the failed component is the
          cleanest proof the work was actually done. In many states this is
          a legal right.{" "}
          <em>Good answer:</em> &quot;Sure — I&apos;ll bag them and put
          them in your trunk.&quot; Core-charged parts are the only fair
          exception.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          5. Is this repair necessary now, or can it wait?
        </h2>
        <p>
          <em>Why it matters:</em> Shops often lump &quot;needs soon&quot;
          items with &quot;needs today&quot; items on one estimate.{" "}
          <em>Good answer:</em> A mechanic who clearly separates safety-
          critical work from deferred maintenance is being honest with you.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          6. What happens if I decline this repair?
        </h2>
        <p>
          <em>Why it matters:</em> Consequences range from &quot;worse fuel
          economy&quot; to &quot;brakes could fail.&quot;{" "}
          <em>Good answer:</em> A specific, plain-English explanation of
          what will happen and on what timeline.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          7. Is this a safety issue?
        </h2>
        <p>
          <em>Why it matters:</em> This single question forces the shop to
          commit. A vague &quot;it&apos;s not great&quot; is not the same
          as &quot;your tie rod can separate.&quot;{" "}
          <em>Good answer:</em> A clear yes or no, with a reason.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          8. Do you have ASE-certified technicians?
        </h2>
        <p>
          <em>Why it matters:</em> ASE certification is the baseline
          credential for U.S. mechanics. It does not guarantee honesty, but
          it does guarantee tested knowledge.{" "}
          <em>Good answer:</em> &quot;Yes — here are the certificates on
          the wall.&quot;
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          9. Can I get a second opinion before I commit?
        </h2>
        <p>
          <em>Why it matters:</em> Any shop that pressures you to decide on
          the spot is telling you something about their pricing.{" "}
          <em>Good answer:</em> &quot;Absolutely — take the written
          estimate with you.&quot;
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          10. Are you using OEM or aftermarket parts?
        </h2>
        <p>
          <em>Why it matters:</em> OEM parts cost more but fit perfectly
          and match factory specs. Aftermarket is often fine for wear items
          but can be a downgrade on sensors and electronics.{" "}
          <em>Good answer:</em> The shop names the brand and lets you
          choose if there is a cost gap.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          11. Is this price for the part or the labor?
        </h2>
        <p>
          <em>Why it matters:</em> Estimates sometimes show a single
          &quot;total&quot; that hides a thin part and fat labor — or vice
          versa.{" "}
          <em>Good answer:</em> Clearly itemized parts, labor, shop
          supplies, and tax.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          12. Is there a cheaper alternative that still fixes the problem?
        </h2>
        <p>
          <em>Why it matters:</em> A remanufactured alternator, a used
          transmission, or a brake pad tier lower can save hundreds without
          compromising safety.{" "}
          <em>Good answer:</em> The shop walks you through the trade-offs
          and leaves the choice to you.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          13. What is your hourly labor rate?
        </h2>
        <p>
          <em>Why it matters:</em> Rates vary from roughly $90 at an
          independent to $200+ at a dealer. Multiply by the book hours
          listed on your estimate to sanity-check the total.{" "}
          <em>Good answer:</em> A single, posted rate. Be wary of shops
          that quote different rates for different jobs without explanation.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          14. Do you charge shop supplies or disposal fees?
        </h2>
        <p>
          <em>Why it matters:</em> &quot;Shop supplies&quot; often appears
          as a mystery 5-10 percent line item.{" "}
          <em>Good answer:</em> The shop explains what it covers (rags,
          lubricants, waste oil disposal) and is willing to cap it.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          15. Can you show me the problem in person?
        </h2>
        <p>
          <em>Why it matters:</em> Seeing a torn CV boot or a leaking
          valve cover gasket turns a scary estimate into something
          concrete.{" "}
          <em>Good answer:</em> The mechanic walks you out to the lift,
          points to the failed part, and answers follow-up questions.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Where to Go From Here
        </h2>
        <p>
          If a shop will not answer these fifteen questions clearly, you
          have your answer: find another. Our guide on{" "}
          <Link href="/blog/how-to-find-trustworthy-mechanic" className="text-[#E67E22] hover:underline font-semibold">
            how to find a trustworthy mechanic
          </Link>{" "}
          covers the research side. If you are weighing a brand-name
          service center against a local shop, our comparisons on{" "}
          <Link href="/compare/dealer-vs-independent-mechanic" className="text-[#E67E22] hover:underline font-semibold">
            dealer vs. independent mechanics
          </Link>{" "}
          and{" "}
          <Link href="/compare/chain-vs-local-mechanic" className="text-[#E67E22] hover:underline font-semibold">
            chain vs. local shops
          </Link>{" "}
          break down the trade-offs. And when you&apos;re ready, our{" "}
          <Link href="/" className="text-[#E67E22] hover:underline font-semibold">
            mechanic directory
          </Link>{" "}
          makes it easy to compare shops in your area side by side.
        </p>

        <GearRecommendation section="diy-tools" />
      </div>
    </main>
  );
}
