import Link from "next/link";
import type { Metadata } from "next";
import { unified, stateList } from "@/data/all-mechanics";

const TOTAL_SHOPS = unified.length.toLocaleString();
const STATES_COUNT = new Set(unified.map(s => s.state)).size;

export const metadata: Metadata = {
  title: "About MechanicSeeker — Free Auto Repair Shop Directory",
  description: `MechanicSeeker is a free auto repair shop directory covering ${TOTAL_SHOPS}+ shops across ${STATES_COUNT} states. Veteran-owned, ad-supported, no paywalls.`,
  alternates: { canonical: "https://www.mechanicseeker.com/about" },
  openGraph: { title: "About MechanicSeeker", url: "https://www.mechanicseeker.com/about", siteName: "MechanicSeeker" },
};

const network = [
  { name: "RampSeeker", url: "https://www.rampseeker.com", tag: "27,700+ Boat Ramps" },
  { name: "PierSeeker", url: "https://www.pierseeker.com", tag: "35,000+ Fishing Piers" },
  { name: "MarinaSeeker", url: "https://www.marinaseeker.com", tag: "9,000+ Marinas" },
  { name: "MechanicSeeker", url: "https://www.mechanicseeker.com", tag: "44,000+ Auto Repair Shops" },
  { name: "BarkSeeker", url: "https://www.barkseeker.com", tag: "37,000+ Dog Parks, Groomers & Vets" },
  { name: "BabyMyDog", url: "https://www.babymydog.com", tag: "260+ Dog Product Reviews" },
  { name: "GlobalAiBots", url: "https://www.globalaibots.com", tag: "CLETUS AI Platform" },
  { name: "AskCletus", url: "https://www.askcletus.com", tag: "AI Chat Demo" },
  { name: "GetCletus", url: "https://www.getcletus.com", tag: "CLETUS Signup" },
  { name: "GrandLakeAI", url: "https://www.grandlakeai.com", tag: "Grand Lake Business AI" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-4 pt-16 pb-10 text-center" style={{ background: "#FAF8F5", backgroundImage: "radial-gradient(circle at 30% 70%, rgba(230,126,34,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-3xl mx-auto">
          About MechanicSeeker &mdash; Free Auto Repair Shop Directory
        </h1>
        <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
          Every auto repair shop in America, in one place, free to search. Built for drivers who want trustworthy local mechanics without the noise of review-site upsells.
        </p>
      </section>

      {/* By the numbers */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: `${TOTAL_SHOPS}+`, label: "Listings" },
            { num: String(STATES_COUNT), label: "States Covered" },
            { num: "Free", label: "Forever" },
            { num: "Updated", label: "Continuously" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="font-[Cabin] text-2xl md:text-3xl font-extrabold text-[#E67E22]">{s.num}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why We Built This */}
      <section className="bg-white border-y border-gray-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Why We Built This</h2>
          <p className="text-gray-700 leading-relaxed">
            MechanicSeeker is part of a directory network built by <strong className="text-[#1A1A1A]">James Mull, a Navy veteran</strong> who got tired of bouncing between unreliable websites trying to find trusted local services. So we built the network we wished existed &mdash; completely free, ad-supported, and updated constantly. No logins. No paywalls. No upsells to basic information. Just verified contact info and real local data for drivers who want a mechanic they can trust.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-6">What Makes Us Different</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="text-[#E67E22] text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-[#1A1A1A]">Free forever</strong> &mdash; no login, no subscription, no paywall behind basic contact info</div></li>
          <li className="flex items-start gap-3"><span className="text-[#E67E22] text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-[#1A1A1A]">GPS-verified locations</strong> for every shop &mdash; turn-by-turn directions from any phone</div></li>
          <li className="flex items-start gap-3"><span className="text-[#E67E22] text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-[#1A1A1A]">Chain-vs-independent tagging</strong> so you know who you&apos;re calling before you call</div></li>
          <li className="flex items-start gap-3"><span className="text-[#E67E22] text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-[#1A1A1A]">Service-level detail</strong> &mdash; oil change, brakes, transmission, body, tires &mdash; filter what you need</div></li>
          <li className="flex items-start gap-3"><span className="text-[#E67E22] text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-[#1A1A1A]">Veteran-owned, Oklahoma-based</strong> &mdash; a small American team building every page</div></li>
        </ul>
      </section>

      {/* Our Network */}
      <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Our Network</h2>
          <p className="text-gray-600 mb-6">We operate the GlobalAiBots directory network &mdash; 10 sites covering 150,000+ businesses across boating, auto care, pet services, and AI tools for small businesses.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {network.map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-200 rounded-xl p-3 hover:border-[#E67E22] hover:shadow-sm transition">
                <p className="font-bold text-[#1A1A1A] text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs mt-1">{s.tag}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Know a shop we missed, or spotted a correction? Email <a href="mailto:hello@mechanicseeker.com" className="text-[#E67E22] hover:underline font-semibold">hello@mechanicseeker.com</a>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Questions or partnerships? Email <a href="mailto:james@globalaibots.com" className="text-[#E67E22] hover:underline font-semibold">james@globalaibots.com</a>.
        </p>
        <p className="text-gray-400 text-sm mt-6">
          MechanicSeeker is a project of <a href="https://www.globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Global AI Bots</a>. Veteran-owned and operated.
        </p>
        <Link href="/" className="inline-block mt-6 text-[#E67E22] hover:underline font-semibold text-sm">&larr; Back to home</Link>
      </section>
    </div>
  );
}
