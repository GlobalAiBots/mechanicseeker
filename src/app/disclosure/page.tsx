import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | MechanicSeeker",
  description: "How MechanicSeeker uses affiliate links. We disclose all paid partnerships and earn small commissions on qualifying purchases at no extra cost to you.",
  alternates: { canonical: "https://www.mechanicseeker.com/disclosure" },
};

export default function DisclosurePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#E67E22] transition">Home</Link>
        <span>/</span>
        <span className="text-[#1A1A1A] font-medium">Disclosure</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">Affiliate Disclosure</h1>

      <div className="text-gray-700 leading-relaxed space-y-5">
        <p>MechanicSeeker uses affiliate links from time to time. When you click certain product or service links and complete a purchase, we earn a small commission at no extra cost to you. We disclose these relationships transparently so you always know what is sponsored content versus editorial coverage.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">Current Affiliate Partners</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>KSP Performance</strong> — truck and SUV upgrade parts (leveling kits, wheel spacers, control arms). KSP placements are clearly marked as paid partner content. Use code <strong>KSPAF</strong> for 5% off sitewide.</li>
          <li><strong>CJ Pony Parts</strong> — Mustang, Bronco, classic Ford, and classic Chevy truck restoration parts. Featured in our classic restoration content.</li>
          <li><strong>CJ Affiliate (Commission Junction)</strong> — the network that handles tracking and commissions for the partners above.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">How We Choose Partners</h2>
        <p>We only partner with companies whose products fit topically with our editorial content. KSP Performance fits truck-upgrade and lift-kit content. CJ Pony Parts fits Mustang, Bronco, and classic restoration content. We do not accept paid placement for shop listings in our directory — directory inclusion is editorial and free for any qualifying repair shop.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">How Affiliate Links Are Marked</h2>
        <p>All affiliate links carry the <code>rel=&quot;sponsored noopener noreferrer&quot;</code> attribute per FTC guidelines and Google&apos;s sponsored-link best practices. Affiliate-funded sections of pages include a &quot;Recommended Partner&quot; or &quot;Paid Partner&quot; label so the relationship is unambiguous.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">Editorial Independence</h2>
        <p>Affiliate relationships do not influence which shops appear in our directory, our city or state-level rankings, or our editorial recommendations on which mechanic to choose. Directory listings, ratings, and reviews remain editorial. Affiliate placements are restricted to product and parts recommendations where the partner&apos;s catalog genuinely fits the topic.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">Questions</h2>
        <p>For any questions about specific affiliate relationships or how we handle disclosures, contact us through the site&apos;s contact channels.</p>
      </div>
    </article>
  );
}
