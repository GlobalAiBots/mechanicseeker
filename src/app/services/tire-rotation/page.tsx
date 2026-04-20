import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Tire Rotation: Why, When & Cost | MechanicSeeker",
  description:
    "Everything you need to know about tire rotation in 2026. Learn why it matters, how often to rotate, typical costs ($20-50), and how to do it yourself.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/services/tire-rotation",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.mechanicseeker.com/services" },
    { "@type": "ListItem", position: 3, name: "Tire Rotation", item: "https://www.mechanicseeker.com/services/tire-rotation" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often should I rotate my tires?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most manufacturers recommend rotating tires every 5,000 to 7,500 miles, which conveniently aligns with oil change intervals. Some tire warranties require rotation every 5,000 miles to remain valid. If you notice uneven wear before reaching that mileage, have the tires rotated sooner and ask about a possible alignment issue.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a tire rotation cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A tire rotation typically costs $20 to $50 at most shops in 2026. Many shops offer free tire rotations when you purchase tires from them or bundle the service with an oil change at a reduced rate. Dealerships may charge $30 to $60 while independent shops and tire centers are usually more affordable at $20 to $40.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate my own tires at home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, tire rotation is an easy DIY task if you have a floor jack, two jack stands, and a lug wrench. The process takes about 30 to 45 minutes. Follow the correct rotation pattern for your drivetrain: front-wheel drive vehicles move front tires straight to the rear and rear tires cross to the front. Always torque lug nuts to the manufacturer's specification.",
      },
    },
  ],
};

export default function TireRotationPage() {
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
        <span className="text-gray-700">Tire Rotation</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Tire Rotation: Why, When &amp; Cost
      </h1>

      <div className="bg-[#FAF8F5] border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Typical Cost:</strong> $20&ndash;$50</span>
          <span><strong>Frequency:</strong> Every 5,000&ndash;7,500 mi</span>
          <span><strong>DIY Difficulty:</strong> <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Easy</span></span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          Tire rotation is one of the simplest and most cost-effective maintenance services
          you can perform on your vehicle. By periodically swapping the positions of your
          tires, you ensure even tread wear across all four corners. This extends total tire
          life by thousands of miles, maintains consistent handling and traction, and keeps
          you safe in wet and winter conditions. Skipping rotations leads to premature tire
          replacement &mdash; a much more expensive proposition than the modest cost of
          regular rotation service.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Why Tire Rotation Matters
        </h2>
        <p>
          Front and rear tires wear differently due to weight distribution and steering
          forces. Front-wheel-drive vehicles put extra stress on the front tires, which handle
          both steering and driving force. Rear-wheel-drive vehicles wear rear tires faster
          under acceleration. All-wheel-drive systems distribute force to all four tires but
          still create uneven patterns depending on the system design and driving conditions.
        </p>
        <p>
          Without rotation, front tires on a FWD car might wear out at 30,000 miles while
          the rears still have 50 percent tread remaining. Regular rotation evens this out so
          all four tires reach end of life at roughly the same time. This means buying one
          set of four tires instead of two sets of two, saving $200 to $400 over the life of
          a set of tires. Many tire warranties actually require documented rotations at
          specified intervals to remain valid.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          How Much Does a Tire Rotation Cost?
        </h2>
        <p>
          A standalone tire rotation costs $20 to $50 at most shops in 2026. Many tire shops
          and dealerships offer free lifetime rotations when you purchase tires from them.
          Quick-lube chains frequently bundle tire rotation with oil changes at a discounted
          rate of $60 to $90 for the combined service. Independent mechanics typically charge
          $20 to $40 and complete the service in 20 to 30 minutes.
        </p>
        <p>
          Given the low cost and significant benefit to tire longevity, tire rotation delivers
          one of the highest returns on investment of any maintenance service. Spending $40 on
          a rotation now can prevent $200 in premature tire wear later.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Rotation Patterns Explained
        </h2>
        <p>
          The correct rotation pattern depends on your drivetrain and tire type. For
          front-wheel drive, move front tires straight to the rear and cross rear tires to
          opposite front positions. For rear-wheel and four-wheel drive, move rear tires
          straight to the front and cross front tires to opposite rear positions. Directional
          tires can only swap front to back on the same side. Staggered setups with different
          front and rear sizes cannot be rotated in the traditional sense.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          DIY Tire Rotation
        </h2>
        <p>
          Rotating your own tires is a straightforward task that takes 30 to 45 minutes. You
          need a floor jack, at least two jack stands, and a lug wrench or impact wrench.
          Essential tools for DIY tire rotation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.amazon.com/s?k=floor+jack+3+ton&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              3-ton floor jack
            </a> &mdash; lifts the vehicle safely with a low-profile design for most cars
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=torque+wrench+1+2+drive&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Torque wrench (1/2-inch drive)
            </a> &mdash; ensures lug nuts are tightened to the manufacturer&apos;s torque spec
          </li>
          <li>
            <a href="https://www.amazon.com/s?k=jack+stands+pair&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-[#E67E22] hover:underline">
              Jack stand pair
            </a> &mdash; supports the vehicle securely while swapping tire positions
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to See a Mechanic
        </h2>
        <p>
          If you notice uneven or cupped tire wear patterns, vibration at highway speeds, or
          the vehicle pulling to one side, a simple rotation may not be enough. These symptoms
          often indicate a wheel alignment issue, worn suspension components, or an
          out-of-balance tire. A mechanic can diagnose the underlying cause and recommend the
          appropriate repair before further tire damage occurs.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Frequently Asked Questions
        </h2>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How often should I rotate my tires?
        </h3>
        <p>
          Most manufacturers recommend rotating tires every 5,000 to 7,500 miles, which
          conveniently aligns with oil change intervals. Some tire warranties require rotation
          every 5,000 miles to remain valid. If you notice uneven wear before reaching that
          mileage, have the tires rotated sooner and ask about a possible alignment issue.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          How much does a tire rotation cost?
        </h3>
        <p>
          A tire rotation typically costs $20 to $50 at most shops in 2026. Many shops offer
          free tire rotations when you purchase tires from them or bundle the service with an
          oil change at a reduced rate.
        </p>

        <h3 className="text-xl font-bold text-[#2C3E50] mt-6 mb-2 font-[Cabin]">
          Can I rotate my own tires at home?
        </h3>
        <p>
          Yes, tire rotation is an easy DIY task if you have a floor jack, two jack stands,
          and a lug wrench. The process takes about 30 to 45 minutes. Follow the correct
          rotation pattern for your drivetrain and always torque lug nuts to the
          manufacturer&apos;s specification.
        </p>
      </div>

      <GearRecommendation section="diy-tools" />

      <div className="mt-12 text-center bg-[#2C3E50] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-[Cabin]">
          Find a Tire Shop Near You
        </h2>
        <p className="text-gray-300 mb-6">
          Compare ratings, services, and pricing from trusted tire shops in your area.
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
