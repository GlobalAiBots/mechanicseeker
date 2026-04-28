"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";
import AffiliateInlineLink from "@/components/affiliate/AffiliateInlineLink";
import AffiliateCallout from "@/components/affiliate/AffiliateCallout";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { CJ_PONY_PARTS } from "@/data/affiliates/cjponyparts";

const POST_SLUG = "classic-restoration-hub";
const RESTORATION_RE = /classic|restoration|vintage|hot rod|muscle car|mustang|bronco/i;

export default function ClassicRestorationPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  const restorationShops = useMemo(() => unified.filter((s) => RESTORATION_RE.test(s.name)), []);

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of restorationShops) map[s.state] = (map[s.state] || 0) + 1;
    return map;
  }, [restorationShops]);

  const statesWithData = useMemo(
    () => stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).filter((s) => s.count > 0),
    [stateCounts]
  );

  const sortedByCount = useMemo(
    () => [...statesWithData].sort((a, b) => b.count - a.count),
    [statesWithData]
  );

  const isSearching = search.length >= 2;
  const searchResults = useMemo(
    () => statesWithData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [statesWithData, search]
  );

  const displayStates = isSearching ? searchResults : sortedByCount;
  const showToggle = !isSearching && sortedByCount.length > 15;

  const faqItems = [
    { q: "How long does a full classic car restoration typically take?", a: "Quality full restorations typically take 12 to 36 months from intake to delivery. Frame-off restorations on the most complex projects (rare or rough-condition vehicles) can extend to 4-5 years. The shop's current backlog matters as much as the work itself — established restoration specialists usually have 6-18 months of queue before yours becomes the active project. Ask about typical project duration AND current queue position before committing." },
    { q: "What's a realistic budget for a quality classic restoration?", a: "Partial restorations (cosmetic refresh, mechanical refurb, paint, interior) typically run $15,000 to $40,000 depending on vehicle and condition. Full frame-off restorations on common platforms (Mustang, Camaro, classic Chevy trucks) typically run $50,000 to $120,000. Numbers-matching restorations on rare or valuable vehicles can run $150,000 to $300,000+. Cheap quotes ($25K full restoration) are warning signs — the work either won't get done properly or won't get finished." },
    { q: "Should I provide my own parts or let the shop source them?", a: "Reputable shops have established supplier relationships and typically prefer sourcing parts themselves — they vouch for quality and warranty. If you provide parts, the shop usually won't warranty work involving those parts. For Mustang and Bronco restorations specifically, asking the shop which suppliers they use is reasonable; many work with CJ Pony Parts directly for reproduction components, which is generally a positive signal of quality sourcing." },
    { q: "Can I visit the shop during the restoration process?", a: "Yes, and you should — at agreed-upon intervals. Quality restoration shops welcome scheduled visits and provide periodic photo updates. Shops that resist visits or stall on photo requests are red flags. Don't show up unannounced for daily progress checks (unproductive for both sides), but monthly or major-milestone visits are reasonable and build trust." },
    { q: "What if my project takes longer than estimated?", a: "It usually will — restoration work uncovers hidden problems (rust, damaged subframes, previous bad repairs) that extend timelines. Quality shops communicate proactively about delays and explain the cause. Open-ended delays without explanation are warning signs. Build a contractual review point at 12 and 24 months for any project expected to run over a year, with clear deliverables for each milestone." },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Classic Car Restoration: Finding the Right Shop for Your Project",
    description: "Comprehensive guide to choosing a classic car restoration specialist — Mustang, Bronco, classic Ford, and Chevy truck restoration. Includes directory of 240+ restoration shops by state.",
    author: { "@type": "Organization", name: "MechanicSeeker", url: "https://www.mechanicseeker.com" },
    publisher: { "@type": "Organization", name: "MechanicSeeker", url: "https://www.mechanicseeker.com" },
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.mechanicseeker.com/classic-restoration" },
    articleSection: "Specialty Auto Repair",
    keywords: ["classic car restoration shops", "mustang restoration", "bronco restoration", "classic chevy truck restoration", "muscle car restoration", "how to choose restoration shop"],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
          { "@type": "ListItem", position: 2, name: "Classic Restoration", item: "https://www.mechanicseeker.com/classic-restoration" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      {/* HERO */}
      <section className="relative py-16 md:py-24 text-center px-4 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #1A2332 0%, #2C3E50 50%, #1A2332 100%)" }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-white/60 text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Specialty Directory</p>
          <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-white leading-tight">Find Classic Car Restoration Specialists Across America</h1>
          <p className="text-white/70 mt-4 max-w-lg mx-auto text-lg">{restorationShops.length}+ restoration shops specializing in Mustangs, Broncos, classic Chevys, and muscle cars across {statesWithData.length} states.</p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-3 text-center" style={{ background: "#FAF8F5" }}>
        <p className="text-[#2C3E50] font-bold text-sm tracking-wide font-[Cabin]">&#11088; {restorationShops.length} restoration specialists across {statesWithData.length} states &mdash; free directory</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#E67E22] transition">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Classic Restoration</span>
        </nav>
      </div>

      {/* Article HEADER — H1 + intro paragraphs above directory */}
      <article id="restoration-guide" className="max-w-3xl mx-auto px-4 pb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">Classic Car Restoration: Finding the Right Shop for Your Project</h1>
        <AffiliateDisclosure />
        <div className="text-gray-700 leading-relaxed space-y-5">
          <p>Classic car restoration is its own discipline within auto repair &mdash; closer in skill set to fine furniture restoration than to a modern repair shop. The mechanic who can rebuild a 2018 Camry transmission may have no idea how to diagnose carburetor issues on a 1965 Mustang or fabricate replacement floor pans for a 1970 Bronco. The reverse is also true: the best restoration specialists in America often don&apos;t touch a car newer than 1985. Different work, different skills, different tools, different parts supply chains.</p>
          <p>For owners with a project car &mdash; whether a barn-find Mustang, a Bronco passed down through the family, a 1972 Chevy short-bed, or a numbers-matching Chevelle &mdash; finding the right shop is the most important decision in the entire restoration process. The wrong shop wastes money, time, and sometimes destroys irreplaceable original components. The right shop produces a car you&apos;ll keep for the rest of your life.</p>
          <p>This guide walks through the framework experienced collectors and restoration enthusiasts actually use: how restoration work differs from general repair, how to evaluate a specialist, what real costs look like, project timeline realities, the red flags worth knowing, and brand-specific considerations for the most-restored vehicles in America.</p>
          <p>Below is MechanicSeeker&apos;s directory of {restorationShops.length}+ classic car restoration specialists organized by state. The complete guide continues below the directory with detailed coverage of choosing a specialist, understanding costs, evaluating timelines, recognizing red flags, and the brand-specific notes that matter for Mustang, Bronco, and classic Chevy truck projects.</p>
        </div>
      </article>

      {/* Directory section */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-2">Restoration Shops by State</h2>
        <p className="text-gray-500 text-sm mb-6">{restorationShops.length} restoration specialists across {statesWithData.length} states &mdash; sorted by shop count.</p>

        {statesWithData.length > 10 && (
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition mb-6" />
        )}

        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 ${showToggle ? "mb-6" : "mb-12"}`}>
          {displayStates.map((s, index) => {
            const hideThis = !isSearching && !expanded && index >= 15;
            return (
              <Link key={s.code} href={`/${s.slug}?type=restoration`} className={`group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all${hideThis ? " hidden" : ""}`}>
                <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#E67E22] transition">{s.name}</p>
                <p className="text-gray-400 text-xs mt-1">{s.count === 1 ? "1 specialist" : `${s.count} specialists`}</p>
              </Link>
            );
          })}
        </div>

        {showToggle && (
          <div className="text-center mb-12">
            <button onClick={() => setExpanded(!expanded)} className="text-[#E67E22] hover:text-[#d35400] font-semibold text-sm transition">
              {expanded ? "Show fewer ↑" : `Show all ${sortedByCount.length} states with restoration shops ↓`}
            </button>
          </div>
        )}
      </section>

      {/* Article CONTINUATION */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="border-t border-[#E67E22]/30 pt-6 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-[Cabin]">Complete Guide Continues</p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-2 mb-3">What Makes Restoration Different from General Mechanic Work</h2>
          <p>The skills required for classic restoration overlap only partially with modern auto repair. A modern mechanic relies on OBD-II diagnostic codes, computer-controlled engine management, factory service procedures, and a parts supply chain where almost everything is one phone call away. A restoration specialist works without any of those advantages.</p>
          <p>Period-specific knowledge matters more than most owners realize. A 1965 Mustang and a 1969 Mustang share a model name and not much else &mdash; different engines, different transmissions, different wiring, different suspension geometry. Specialists who work on early Mustangs (1965-66) often don&apos;t work on the 1969-70 fastback variants because the parts catalogs and service procedures barely overlap. The same applies across eras: pre-war restoration is different from post-war, 1950s muscle precursors are different from 1960s muscle, and 1970s Malaise-era cars have their own quirks.</p>
          <p>Sourcing rare parts is the second skill that distinguishes restoration shops. Reproduction parts catalogs cover a lot of ground for popular platforms (Mustang, Camaro, classic Chevy trucks), but rarer vehicles require sourcing from swap meets, online auctions, or NOS (new old stock) dealers who specialize in specific eras. Shops that have spent decades building these supply networks complete projects faster and more accurately than newer entrants.</p>
          <p>Body work and metal fabrication round out the skill set. Modern body shops mostly replace damaged panels with factory-made replacements. Restoration shops cut, weld, and shape steel to repair vehicles that have been sitting in fields or barns for decades. Floor pan replacement, frame repair, rust remediation, and panel beating are all skills modern collision shops generally don&apos;t practice. The torch, the English wheel, and the planishing hammer are restoration shop tools that don&apos;t appear in collision-shop tool inventories.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Choosing a Restoration Specialist</h2>
          <p>Years of experience matter, but specifically: years of experience with vehicles like yours. A shop with 30 years of Mustang restoration experience may not be the right choice for your 1972 Chevy K10. Match the shop&apos;s portfolio to your project, not the shop&apos;s overall reputation.</p>
          <p>Ask to see a portfolio of completed projects. Quality shops have walls of photos, websites with before-and-after galleries, and customer testimonials they&apos;re happy to share. Specialists who have been in business for decades typically also have current projects in various stages on the shop floor &mdash; ask for a tour. The condition of the shop, the organization of in-progress work, and the visible quality of completed pieces tell you almost everything you need to know.</p>
          <p>Specialty alignment is the most underweighted factor. Some shops do paint and body but not engine work. Some do mechanical and interior but contract out paint. Some specialize in one make (Mustang, Mopar, GM muscle), and trying to push a Bronco through a Mustang shop produces poor results despite the shop&apos;s genuine skill on its core platform. A good shop will tell you honestly when your project isn&apos;t a good fit and refer you to a specialist who is.</p>
          <p>References from previous customers are useful, but with caveats. Customers who get a great car at the end are usually happy regardless of process pain. Ask specifically about communication during long delays, billing transparency, and whether the final cost matched the initial estimate within reasonable variance (10-25% over is normal for restoration; 100%+ over is a problem). Industry affiliations &mdash; ASE certifications, AACA (Antique Automobile Club of America) membership, marque-specific club memberships &mdash; signal a shop that takes the work seriously.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Understanding Restoration Costs</h2>
          <p>Restoration cost ranges are wider than most owners expect, and the variation is largely a function of vehicle starting condition and final quality target.</p>
          <p>Partial restorations &mdash; cosmetic refresh, mechanical refurbishment, paint and interior updating without complete teardown &mdash; typically run $15,000 to $40,000 on most platforms. The work happens at the shop with the vehicle largely assembled, focused on visible improvements and reliability rather than concours-quality detail. This is the right path for owners who want a daily-drivable classic without museum-quality investment.</p>
          <p>Full frame-off restorations remove the body from the chassis, restore each system to as-new or better condition, and reassemble the vehicle from the ground up. Common platforms (Mustang, Camaro, Chevelle, classic Chevy trucks) typically run $50,000 to $120,000 for quality work. Numbers-matching restorations on rare and valuable vehicles &mdash; Boss 302s, Hemi Mopars, COPO Camaros, original-paint survivors &mdash; can run $150,000 to $300,000 or more. The math: factory accuracy requires correct part numbers, correct date-coded components, correct paint formulas, correct upholstery patterns, and the time to source and verify each.</p>
          <p>DIY components vs shop components is a real cost lever. Many owners handle interior work, electrical, or final assembly themselves to control budget &mdash; the shop does paint, body, and engine, the owner does upholstery and finish detail. This works well when expectations are clear upfront. Mid-project handoffs from owner to shop (or vice versa) almost always produce cost overruns and quality problems.</p>
          <p>Parts sourcing implications matter. Quality reproduction parts make modern restorations possible at reasonable cost &mdash; a Mustang restoration today costs less in real dollars than the same project did in the 1990s because the reproduction-parts industry has filled gaps that used to require swap-meet hunting. Specialty retailers like <AffiliateInlineLink partner={CJ_PONY_PARTS} linkKey="evergreen" postSlug={POST_SLUG}>CJ Pony Parts</AffiliateInlineLink> carry the catalog depth needed for Mustang, Bronco, classic Ford, and Chevy truck restorations &mdash; often essential when local supply chains can&apos;t source period-correct components. Most established restoration shops have direct supplier relationships with the major specialty catalogs and pass the discounts through; ask any prospective shop about parts sourcing as part of your evaluation.</p>
          <p>Hidden cost considerations include disposal of removed materials (old paint, contaminated chemicals, scrap metal), shipping for parts and the vehicle itself if not local, storage between project phases, and the inevitable surprises that emerge once disassembly begins. Build a 15-25% contingency into any restoration budget; if it isn&apos;t needed, you&apos;ve got margin for upgrades.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Project Timeline Realities</h2>
          <p>Restorations take years, not months. A simple partial restoration runs 6-12 months. Full frame-off restorations on common platforms run 18-36 months. Concours-level numbers-matching projects can run 4-5 years. The shop&apos;s current backlog adds to this; established specialists often have 6-18 months of queue before your project becomes the active piece on the shop floor.</p>
          <p>The stages of a typical full restoration follow a predictable pattern: intake assessment (1-2 weeks), disassembly and documentation (4-8 weeks), media blasting and rust assessment (2-4 weeks), bodywork and panel repair (3-9 months depending on condition), paint preparation and final paint (2-4 months), mechanical rebuild (3-6 months in parallel with bodywork), reassembly (2-4 months), and final adjustment and quality check (1-2 months). Compressed timelines compromise quality somewhere in this chain.</p>
          <p>Communication expectations during long projects matter. Quality shops provide monthly progress updates with photos, are responsive to scheduled visits, and proactively communicate when problems emerge that affect timeline or cost. Shops that go quiet for months between updates are warning signs &mdash; either work isn&apos;t happening (your project sits while they handle others) or problems are being hidden.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Red Flags in a Restoration Shop</h2>
          <p>Certain patterns reliably indicate a shop you&apos;ll regret choosing:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Vague or evasive timeline answers (&quot;it&apos;ll take however long it takes&quot; without milestone structure)</li>
            <li>Pressure to commit large deposits upfront without a written project plan and milestone schedule</li>
            <li>Inability to show completed work in person or via portfolio &mdash; insist on seeing actual finished projects</li>
            <li>Mismatched specialty (a Mustang shop quoting confidently on your Bronco) &mdash; expert generalists are rare</li>
            <li>High turnover of customers visible on the lot &mdash; the same projects sitting for years signal capacity problems</li>
            <li>Refusal to allow shop visits during work, or stalling on photo requests</li>
            <li>Suspiciously low quotes &mdash; restoration is labor-intensive and quality work has a real cost floor</li>
            <li>Reluctance to put estimates in writing or to itemize cost categories (paint, mechanical, interior, etc.)</li>
            <li>No written contract specifying scope, deliverables, and milestone payments</li>
            <li>Dismissive attitude toward your specific knowledge or your specific vehicle&apos;s history</li>
          </ul>
          <p>Two or three of these patterns is reason enough to keep looking. One serious incident &mdash; a missed milestone with no explanation, a substantial cost increase without prior discussion, a refusal to provide a status photo &mdash; is reason to pause the project and reassess.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Mustang Restoration: Specific Considerations</h2>
          <p>The Ford Mustang is the most-restored vehicle in America, and with that volume comes both advantages and pitfalls. The reproduction parts industry for Mustangs is unmatched &mdash; almost every component for early (1965-1973) Mustangs is available either as a quality reproduction or as new old stock. This makes restoration faster and more affordable than for rarer vehicles, but it also means many shops have built their entire business around Mustang work and can be inflexible about other platforms.</p>
          <p>Year-specific considerations matter a lot. The 1965-66 Mustangs are the simplest and arguably most-restored variant. The 1967-68 cars added size and complexity (bigger engines available, different body lines). The 1969-70 era brought the legendary Boss and Mach 1 variants with substantial mechanical differences. The 1971-73 cars are larger again and have their own community. Restoring a 1969 Boss 302 requires shop expertise specifically with that variant; a general Mustang shop may not have the relationships or the knowledge for the rare components.</p>
          <p>For Mustang restorations specifically, <AffiliateInlineLink partner={CJ_PONY_PARTS} linkKey="mustang" postSlug={POST_SLUG}>CJ Pony Parts</AffiliateInlineLink> has built one of the deepest reproduction catalogs in the industry &mdash; essential for finding correct components when factory originals aren&apos;t available. Most established Mustang restoration shops have direct working relationships with the major specialty catalogs.</p>
          <p>Common pitfalls for Mustang projects include rust (especially 1965-68 floor pans and torque boxes), rare trim sourcing on higher-trim variants, and drivetrain matching for numbers-matching restorations &mdash; the engine and transmission codes have to match factory build sheets for the vehicle to qualify as numbers-matching. Shops that handle this documentation correctly are worth more than shops that don&apos;t.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Bronco and Classic Chevy Truck Restoration</h2>
          <p>The Ford Bronco restoration boom of recent years has reshaped the classic truck market. Original 1966-1977 Broncos that sold for $5,000-15,000 a decade ago now routinely sell for $50,000-150,000 fully restored, and the demand has pulled previously rough-condition vehicles back into restoration projects. The catch: Bronco restoration is harder than Mustang restoration. Parts availability is improving but still lags Mustang significantly, frame and body repairs are more complex due to the vehicle&apos;s utility-truck heritage, and specialist shops are fewer.</p>
          <p>Classic Chevy trucks (1947-1972) are the other major segment of the classic truck restoration market. The 1967-1972 C/K series in particular has become enormously popular &mdash; these were the Chevrolet trucks of a generation, and as the original owners reach retirement, the desire to restore the truck dad drove drives demand. Parts availability is reasonable, the platforms are well-understood, and shop expertise is widely available. Pricing typically runs slightly below equivalent Mustang work because the platforms are simpler.</p>
          <p>Bronco and classic Chevy truck restorations have specialized parts retailers that complement the major restoration catalogs &mdash; <AffiliateInlineLink partner={CJ_PONY_PARTS} linkKey="bronco" postSlug={POST_SLUG}>CJ Pony Parts</AffiliateInlineLink> carries dedicated catalogs for both, often filling gaps that broader auto parts retailers can&apos;t. For owners taking a hybrid DIY/shop approach, having a reliable parts source for the components you handle yourself dramatically reduces project friction.</p>
          <p>If your project is a truck rather than a Mustang, our <Link href="/truck-upgrades" className="text-[#E67E22] hover:underline font-semibold">truck upgrades hub</Link> covers modern parts for trucks staying in service, and the restoration-specific shops in this directory handle the heavier classic truck work.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqItems.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#E67E22] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* CJ Pony Parts footer callout */}
        <AffiliateCallout
          partner={CJ_PONY_PARTS}
          linkKey="evergreen"
          postSlug={POST_SLUG}
          variant="footer"
          heading="Reproduction Parts for Your Restoration Project"
          body="Mustang, Bronco, classic Ford, and classic Chevy truck restoration parts &mdash; one of the deepest reproduction catalogs in the industry. Whether you&apos;re sourcing for a shop project or handling parts yourself, CJ Pony Parts is a starting point most established restoration specialists already know."
          ctaLabel="Browse CJ Pony Parts"
        />
      </article>
    </div>
  );
}
