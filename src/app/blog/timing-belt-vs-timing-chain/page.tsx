import Link from "next/link";
import type { Metadata } from "next";

const TITLE = "Timing Belt vs Timing Chain: Which Does Your Car Have? (2026)";
const DESC = "How to tell which your engine uses, real lifespan, replacement cost, interference vs non-interference engines, and a lookup table for 30 common vehicles.";
const URL = "https://www.mechanicseeker.com/blog/timing-belt-vs-timing-chain";

export const metadata: Metadata = {
  title: `${TITLE} | MechanicSeeker`,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, siteName: "MechanicSeeker", type: "article" },
  alternates: { canonical: URL },
};

const faqs = [
  { q: "How do I know if my car has a timing belt or timing chain?", a: "The fastest way: check your owner's manual maintenance schedule. Belts will be listed as a replacement item (typically at 60K-100K miles); chains won't be listed as a scheduled replacement. Visually, belts are covered by a plastic or fiber cover on the front of the engine; chains are inside the engine behind a metal case. If you hear 'whining' or 'rattling' from the front of the engine, especially at cold start, suspect a chain. If you hear nothing and there's no maintenance log entry — probably a chain." },
  { q: "Which is better: timing belt or timing chain?", a: "Neither is categorically better. Chains last longer (usually the life of the engine) but cost 2-3x more to replace when they do fail. Belts are cheaper and quieter but need scheduled replacement. Modern engines mostly use chains for reliability; older Honda, Toyota, and Audi engines use belts for cost and noise reasons." },
  { q: "What happens if a timing belt breaks?", a: "On an interference engine (most modern engines), valves slam into pistons — expect $3,000-$6,000 in internal engine damage or a full engine replacement. On a non-interference engine (older Honda, some Toyota, some Kia), the engine stops running but no damage occurs — you can replace the belt and go. The interference/non-interference distinction is why the 90K-mile belt replacement interval matters: ignoring it on an interference engine can total your car." },
  { q: "How often should I replace a timing belt?", a: "Check your owner's manual, but the typical range is 60,000-100,000 miles or 7-10 years, whichever comes first. Rubber degrades with age regardless of mileage. If you have a 15-year-old car with 40K miles on a timing belt, replace it anyway — the rubber is done." },
  { q: "Can I drive my car with a bad timing chain?", a: "A chain that's merely stretched (common at 150K+ miles on many engines) can make noise for months before failing catastrophically. Once it actually jumps a tooth or breaks, the engine stops and damage on interference engines is the same as a snapped belt. If you hear rattling that speeds up with engine RPM, get it diagnosed — don't keep driving." },
];

const vehicleTable = [
  // Known belts
  { make: "Honda", model: "Civic (1.7L, 2001-2005)", type: "Belt", note: "Interference; replace at 105K miles" },
  { make: "Honda", model: "Accord V6 (2003-2012)", type: "Belt", note: "Interference; replace at 105K miles" },
  { make: "Honda", model: "Odyssey (2005-2010)", type: "Belt", note: "Interference; replace at 105K miles" },
  { make: "Honda", model: "Pilot (2003-2008)", type: "Belt", note: "Interference; replace at 105K miles" },
  { make: "Toyota", model: "4Runner V6 (1996-2002)", type: "Belt", note: "Non-interference (older 5VZ-FE)" },
  { make: "Toyota", model: "Tacoma V6 (1995-2004)", type: "Belt", note: "Non-interference" },
  { make: "Toyota", model: "Camry V6 (1994-2006)", type: "Belt", note: "Interference on some years" },
  { make: "Subaru", model: "Legacy (1994-2009)", type: "Belt", note: "Non-interference generally" },
  { make: "Subaru", model: "Outback (1994-2009)", type: "Belt", note: "Non-interference generally" },
  { make: "Mitsubishi", model: "Eclipse GSX / Lancer Evo", type: "Belt", note: "Interference — absolutely don't skip" },
  { make: "Volkswagen", model: "Jetta / Golf TDI (pre-2015)", type: "Belt", note: "Interference; 100K interval" },
  { make: "Audi", model: "A4 / A6 (pre-2006)", type: "Belt", note: "Interference; 100K interval" },
  { make: "Nissan", model: "Frontier VG30/VG33 (1998-2004)", type: "Belt", note: "Interference" },
  // Known chains
  { make: "Toyota", model: "Tacoma V6 (2005-present)", type: "Chain", note: "Lifetime, monitor at 150K+" },
  { make: "Toyota", model: "Tundra 5.7L (2007-present)", type: "Chain", note: "Lifetime" },
  { make: "Toyota", model: "Camry 2.5L (2010-present)", type: "Chain", note: "Lifetime" },
  { make: "Honda", model: "Civic 1.5T (2016-present)", type: "Chain", note: "Lifetime" },
  { make: "Honda", model: "CR-V (2015-present)", type: "Chain", note: "Lifetime" },
  { make: "Ford", model: "F-150 5.0L (2011-present)", type: "Chain", note: "Lifetime; watch for cam phaser wear" },
  { make: "Ford", model: "F-150 3.5L EcoBoost", type: "Chain", note: "Lifetime; guides known to fail early" },
  { make: "Ford", model: "Mustang 5.0L (2011-present)", type: "Chain", note: "Lifetime" },
  { make: "Chevrolet", model: "Silverado 5.3L / 6.2L", type: "Chain", note: "Lifetime" },
  { make: "Chevrolet", model: "Equinox 2.4L", type: "Chain", note: "Lifetime but known stretch on some years" },
  { make: "Ram", model: "1500 5.7L HEMI", type: "Chain", note: "Lifetime" },
  { make: "Nissan", model: "Altima 2.5L (2007-present)", type: "Chain", note: "Lifetime" },
  { make: "Hyundai", model: "Elantra 1.6L / 2.0L", type: "Chain", note: "Lifetime" },
  { make: "Kia", model: "Sorento 3.3L", type: "Chain", note: "Lifetime" },
  { make: "BMW", model: "3-Series N20 (2012-2016)", type: "Chain", note: "Known to fail early — replace ~100K" },
  { make: "BMW", model: "5-Series N63 V8", type: "Chain", note: "Known to stretch — monitor" },
];

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESC, datePublished: "2026-04-21", dateModified: "2026-04-21", author: { "@type": "Organization", name: "MechanicSeeker" }, publisher: { "@type": "Organization", name: "MechanicSeeker", url: "https://www.mechanicseeker.com" }, mainEntityOfPage: URL }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.mechanicseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "Timing Belt vs Chain", item: URL }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex gap-2"><Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-[#E67E22] transition">Blog</Link><span>/</span><span className="text-[#1A1A1A]">Timing Belt vs Chain</span></nav>

      <header className="mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E67E22] mb-3">Engine</span>
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-3">{TITLE}</h1>
        <p className="text-gray-500 text-sm">Updated April 21, 2026 &middot; 11 min read &middot; MechanicSeeker Team</p>
      </header>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>Every gasoline engine has one or the other: a timing belt (rubber) or a timing chain (metal). Both do the same job — keep the crankshaft and camshaft synchronized so valves open and close at exactly the right moment relative to the pistons. The consequences of getting it wrong range from &quot;car won&apos;t start&quot; to &quot;engine destroyed, buy a new car.&quot;</p>
        <p>This guide explains the difference, tells you how to know which one you have, and shows the real replacement costs. A lookup table at the end covers 30 common vehicles.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">The Core Difference</h2>
        <p><strong className="text-[#1A1A1A]">Timing belt:</strong> a rubber-and-fiber toothed belt on the front of the engine, covered by a plastic case. Designed to be replaced on a schedule (typically every 60,000-100,000 miles). Rubber wears and cracks over time; when it breaks, it breaks suddenly and completely.</p>
        <p><strong className="text-[#1A1A1A]">Timing chain:</strong> a metal chain inside the engine, lubricated by engine oil. Designed to last the life of the engine in most cases. Stretches gradually over 150,000+ miles before it becomes a problem, unless specific early-failure patterns exist on your engine.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Lifespan &amp; Cost</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Factor</th>
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Timing Belt</th>
                <th className="text-left py-2 font-bold text-[#1A1A1A]">Timing Chain</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Expected life</td><td className="py-2 pr-4">60K-100K miles</td><td className="py-2">Often lifetime (200K+)</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Replacement cost (parts + labor)</td><td className="py-2 pr-4">$500-$1,200</td><td className="py-2">$1,500-$3,500</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Typical labor hours</td><td className="py-2 pr-4">4-8 hrs</td><td className="py-2">10-20 hrs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">Failure warning</td><td className="py-2 pr-4">None (sudden)</td><td className="py-2">Rattle, stretch codes</td></tr>
              <tr><td className="py-2 pr-4 font-semibold">Engine damage on failure (interference engine)</td><td className="py-2 pr-4">Usually total</td><td className="py-2">Usually total</td></tr>
            </tbody>
          </table>
        </div>
        <p>Interesting math: a belt replaced once at $900 twice over 200K miles = $1,800 total. A chain that lasts 200K miles = $0. But a chain that fails at 120K = $2,500+. Chain reliability matters.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Interference vs Non-Interference Engines</h2>
        <p>The single most important distinction for repair cost. In an <strong className="text-[#1A1A1A]">interference engine</strong>, the piston and valve share overlapping space at different times — only the precise timing of the belt/chain keeps them from colliding. When timing is lost, valves smack into pistons, bending valves and often damaging piston crowns, cylinder heads, and sometimes the block.</p>
        <p>In a <strong className="text-[#1A1A1A]">non-interference engine</strong>, the valve and piston can&apos;t physically meet. When timing is lost, the engine stops turning but no internal damage occurs. You replace the belt and the engine runs again.</p>
        <p><strong className="text-[#1A1A1A]">Most modern engines are interference.</strong> Automakers made the trade for higher compression ratios (better fuel economy and power) decades ago. The rare non-interference engines left are mostly older Honda and Toyota 4-cylinders from the 90s and early 2000s.</p>
        <p>The practical rule: if your manual says &quot;timing belt&quot; and the car was built after 2000, assume it&apos;s an interference engine. Missing the 90K replacement interval is a $3,000-$6,000 mistake.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Signs of Belt or Chain Failure</h2>
        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Belt (approaching end of life)</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ticking or clicking from the front of the engine</li>
          <li>Engine misfires or runs rough at idle</li>
          <li>Visible cracks, fraying, or missing teeth on the belt (requires cover removal)</li>
          <li>Oil leak around the timing cover (can soak and destroy the belt)</li>
          <li>Rubber smell near the timing cover</li>
        </ul>
        <h3 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mt-6">Chain (approaching stretch or tensioner failure)</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Rattling noise at cold start that fades as oil pressure builds</li>
          <li>&quot;P0016&quot;, &quot;P0017&quot;, &quot;P0018&quot;, &quot;P0019&quot; diagnostic codes (cam/crank correlation)</li>
          <li>Check engine light with correlation codes</li>
          <li>Whining or grinding that increases with engine RPM</li>
          <li>Reduced power, especially at high RPM</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Common Failure Patterns by Engine</h2>
        <p>Some engines are known for early failures even though they use chains:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-[#1A1A1A]">Ford 3.5L EcoBoost (2011-2016):</strong> plastic chain guides fail early (~80K-120K miles). Symptom: rattle at cold start. Fix: ~$2,500 chain service.</li>
          <li><strong className="text-[#1A1A1A]">BMW N20 / N26:</strong> chains stretch prematurely (100K miles). Symptom: correlation codes. Fix: $3,000-$4,500 at dealer.</li>
          <li><strong className="text-[#1A1A1A]">BMW N63 V8:</strong> chain stretch + guide wear. Monitor at any mileage.</li>
          <li><strong className="text-[#1A1A1A]">VW/Audi 2.0T (EA888, early):</strong> chain tensioner failure. Symptom: rattle. Fix: ~$1,800 tensioner + guides.</li>
          <li><strong className="text-[#1A1A1A]">GM 2.4L Ecotec:</strong> chain stretch on some years. Symptom: correlation codes.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Lookup Table: Common Vehicles</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Make</th>
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Model</th>
                <th className="text-left py-2 pr-4 font-bold text-[#1A1A1A]">Type</th>
                <th className="text-left py-2 font-bold text-[#1A1A1A]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {vehicleTable.map((v, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-semibold">{v.make}</td>
                  <td className="py-2 pr-4">{v.model}</td>
                  <td className="py-2 pr-4"><span className={v.type === "Belt" ? "text-orange-600 font-semibold" : "text-blue-700 font-semibold"}>{v.type}</span></td>
                  <td className="py-2 text-gray-600">{v.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Not on the list? Your owner&apos;s manual&apos;s maintenance section is definitive. If it lists timing belt replacement as a scheduled item, you have a belt. If it doesn&apos;t, almost certainly a chain.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Should You DIY?</h2>
        <p>For most people, no. Timing belt work on an interference engine is the highest-stakes repair in the DIY world — one tooth off on reassembly and you may destroy the engine you just saved money on. Specific engines with clear markings and simple front-accessible routing are DIY-able for patient mechanics. V6 engines with dual overhead cams and interference design are shop jobs.</p>
        <p>See our <Link href="/compare/diy-vs-mechanic" className="text-[#E67E22] hover:underline">DIY vs Mechanic comparison</Link> — timing work is in the &quot;leave to a professional&quot; bucket.</p>
        <p>Looking for a shop? <Link href="/" className="text-[#E67E22] hover:underline">Browse 44,000+ auto repair shops on MechanicSeeker</Link> or check <Link href="/blog/how-to-find-trustworthy-mechanic" className="text-[#E67E22] hover:underline">how to find a trustworthy mechanic</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-lg">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10">Related Reading</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><Link href="/blog/how-much-does-a-timing-belt-cost" className="text-[#E67E22] hover:underline">How Much Does a Timing Belt Cost?</Link></li>
          <li><Link href="/blog/check-engine-light-codes" className="text-[#E67E22] hover:underline">Check Engine Light Codes Explained</Link></li>
          <li><Link href="/compare/diy-vs-mechanic" className="text-[#E67E22] hover:underline">DIY vs Mechanic: When to Do It Yourself</Link></li>
          <li><Link href="/blog/car-maintenance-schedule" className="text-[#E67E22] hover:underline">Car Maintenance Schedule</Link></li>
        </ul>
      </div>
    </article>
  );
}
