"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, stateList } from "@/data/all-mechanics";
import cityPages from "@/data/city-pages.json";
import NearMeButton from "@/components/NearMeButton";
import CletusAd from "@/components/CletusAd";
import GearRecommendation from "@/components/GearRecommendation";
import SeasonalPicks from "@/components/SeasonalPicks";

export default function Home() {
  const [query, setQuery] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of unified) map[s.state] = (map[s.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(
    () => stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).sort((a, b) => b.count - a.count),
    [stateCounts]
  );

  const [expanded, setExpanded] = useState(false);
  const visibleStates = useMemo(() => statesWithCounts.filter(s => s.count > 0), [statesWithCounts]);
  const showToggle = visibleStates.length > 15;

  const topCities = useMemo(() => {
    return [...(cityPages as Array<{ city: string; citySlug: string; count: number; stateSlug: string; stateName: string; state: string }>)]
      .filter(c => c.count >= 5)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, []);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    stateList.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 4).forEach((s) => {
      results.push({ type: "State", label: s.name, href: `/${s.slug}` });
    });
    unified.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 5).forEach((s) => {
      results.push({ type: "Shop", label: `${s.name} (${s.city}, ${s.state})`, href: `/shops/${s.id}` });
    });
    return results.slice(0, 8);
  }, [query]);

  const shopTypes = useMemo(() => {
    const counts: Record<string, number> = {};
    unified.forEach((s) => { counts[s.shopType] = (counts[s.shopType] || 0) + 1; });
    return counts;
  }, []);

  const faqItems = [
    { q: "How much should a diagnostic fee cost?", a: "Most shops charge $80-150 for diagnostic work, often waived if you authorize the recommended repair. Free diagnostics are common at chain stores for basic OBD-II code reads but rarely cover deep drivability or electrical issues. Always confirm fee policy upfront." },
    { q: "What does ASE certification mean and does it matter?", a: "ASE (Automotive Service Excellence) certification means a mechanic passed independent industry tests. ASE Master certification requires passing all 8 specialty exams. It's a meaningful signal of competence — though not a guarantee, it filters out the least qualified shops." },
    { q: "Should I go to a chain shop or an independent mechanic?", a: "Chains are best for predictable, warrantied routine work (oil changes, brakes, tires). Independents typically offer better value on complex repairs and have more accountability. Dealerships are best for warranty work and proprietary diagnostics." },
    { q: "How do I know if a quoted repair is fair?", a: "Get at least two written estimates. Use RepairPal or your vehicle manufacturer's published labor times to verify hours quoted. Parts pricing should roughly match RockAuto or O'Reilly retail. Significant deviations on either side warrant questions." },
    { q: "Is MechanicSeeker free to use?", a: "Yes, completely free. No login, no account, no paid tier. We're funded by display advertising and listing partnerships. Find your shop and go." },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "MechanicSeeker", url: "https://www.mechanicseeker.com",
        description: `Find auto repair shops across America. ${unified.length.toLocaleString()}+ shops.`,
        potentialAction: { "@type": "SearchAction", target: "https://www.mechanicseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "How to Find an Honest Auto Repair Shop: The Complete Guide",
        description: "Practical guide to vetting auto repair shops — independent vs. chain vs. dealership, diagnostic fees, ASE certification, reading reviews critically, and questions to ask before authorizing repair.",
        author: { "@type": "Organization", name: "MechanicSeeker Editorial", url: "https://www.mechanicseeker.com" },
        publisher: { "@type": "Organization", name: "MechanicSeeker", url: "https://www.mechanicseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.mechanicseeker.com" },
        articleSection: "Auto Repair",
        keywords: ["how to find an honest mechanic", "ASE certification", "diagnostic fee", "independent vs dealership", "auto repair estimate", "OEM vs aftermarket parts", "labor warranty"],
      }) }} />

      {/* HERO */}
      <section className="relative py-20 md:py-32 text-center px-4 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-mechanic.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2332]/85 via-[#1A2332]/70 to-[#1A2332]/85" />
        <div className="relative z-10">
          <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4">Auto Repair Directory</p>
          <h1 className="font-[Cabin] text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl mx-auto">Find Auto Repair Shops Near You</h1>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">{unified.length.toLocaleString()}+ shops across {statesWithCounts.filter(s => s.count > 0).length} states. Mechanics, tire shops, body shops, and more.</p>

          <div className="max-w-xl mx-auto mt-8 relative">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by shop name, city, or state..." className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 text-[#1A1A1A] outline-none focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 transition shadow-2xl text-sm" />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                {suggestions.map((s, i) => (
                  <Link key={i} href={s.href} className="flex items-center gap-3 px-4 py-3 hover:bg-[#E67E22]/5 transition border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                    <span className="text-sm text-[#1A1A1A]">{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <NearMeButton label="Find Shops Near Me" color="#E67E22" />
          </div>

          {/* Quick filters */}
          <div className="flex gap-2 justify-center mt-4 flex-wrap max-w-2xl mx-auto">
            {[
              { label: `General Repair (${(shopTypes.general_repair || 0).toLocaleString()})`, type: "general_repair" },
              { label: `Tire Shops (${(shopTypes.tire_shop || 0).toLocaleString()})`, type: "tire_shop" },
              { label: `Body Shops (${(shopTypes.body_shop || 0).toLocaleString()})`, type: "body_shop" },
              { label: `Quick Lube (${(shopTypes.quick_lube || 0).toLocaleString()})`, type: "quick_lube" },
            ].map((f) => (
              <Link key={f.type} href={`/shops?type=${f.type}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{f.label}</Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center mt-12">
            {[{ value: unified.length.toLocaleString(), label: "Auto Repair Shops" }, { value: String(statesWithCounts.filter(s => s.count > 0).length), label: "States" }, { value: "Free", label: "& Updated" }, { value: "GPS", label: "Verified" }].map((s) => (
              <div key={s.label}><p className="font-[Cabin] text-3xl md:text-4xl font-bold text-white">{s.value}</p><p className="text-white/50 text-xs uppercase tracking-wider mt-1">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR COMPLETE AUTO CARE HUB */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-[28px] md:text-[36px] font-extrabold text-[#1A1A1A] text-center mb-3">Your Complete Auto Care Hub</h2>
        <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">Everything your car needs &mdash; repair shops, tire services, and maintenance tools.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link href="#browse-states" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #FFF7ED, #FDE68A)', border: '2px solid rgba(230,126,34,0.2)' }}>
            <span className="text-5xl block mb-3">&#128295;</span>
            <h3 className="font-[Cabin] font-extrabold text-[#1A1A1A] text-xl mb-1">Auto Repair Shops</h3>
            <p className="font-extrabold text-[28px] text-[#E67E22] leading-none mb-2">{unified.length.toLocaleString()}</p>
            <p className="text-gray-500 text-xs mb-4">Mechanics, body shops, tire shops, and quick lube.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #F39C12, #E67E22)', boxShadow: '0 4px 12px rgba(230,126,34,0.25)' }}>Find a Shop &rarr;</span>
          </Link>
          <Link href="/truck-upgrades" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #E8EEF2, #CBD5E1)', border: '2px solid rgba(44,62,80,0.2)' }}>
            <span className="text-5xl block mb-3">&#128736;</span>
            <h3 className="font-[Cabin] font-extrabold text-[#1A1A1A] text-xl mb-1">Truck Upgrades</h3>
            <p className="font-extrabold text-[18px] text-[#2C3E50] leading-none mb-2">KSP Performance</p>
            <p className="text-gray-500 text-xs mb-4">Leveling kits, spacers, and more.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #2C3E50, #1A2332)', boxShadow: '0 4px 12px rgba(44,62,80,0.25)' }}>Shop Upgrades &rarr;</span>
          </Link>
          <Link href="/tire-shops" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #E0F2FE, #BAE6FD)', border: '2px solid rgba(14,116,144,0.2)' }}>
            <span className="text-5xl block mb-3">&#128734;</span>
            <h3 className="font-[Cabin] font-extrabold text-[#1A1A1A] text-xl mb-1">Tire Services</h3>
            <p className="font-extrabold text-[20px] text-[#0E7490] leading-none mb-2">{shopTypes["tire_shop"]?.toLocaleString() || "8,000"}+ tire shops</p>
            <p className="text-gray-500 text-xs mb-4">Tire sales, rotation, balancing, and alignment nationwide.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)', boxShadow: '0 4px 12px rgba(14,116,144,0.25)' }}>Browse Tire Shops &rarr;</span>
          </Link>
        </div>
      </section>

      {/* AUTO PARTS & TOOLS */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #2C3E50 0%, #E67E22 100%)" }}>
          <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">DIY Auto Tools &amp; Parts &#128295;</h3>
              <p className="text-white/80 text-sm max-w-md">Top-rated tools for the jobs you can do yourself.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "https://www.amazon.com/dp/B005NLQAHS?tag=babymydog03-20", label: "OBD2 Scanner" },
                { href: "https://www.amazon.com/dp/B000CO86BY?tag=babymydog03-20", label: "Floor Jack" },
                { href: "https://www.amazon.com/dp/B003BYNKWQ?tag=babymydog03-20", label: "Socket Set" },
                { href: "https://www.amazon.com/dp/B015TKUPIC?tag=babymydog03-20", label: "Jump Starter" },
              ].map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-2 rounded-lg transition">{p.label}</a>
              ))}
              <a href="https://www.amazon.com/dp/B07NSZMQKZ?tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="bg-white text-[#2C3E50] font-bold text-xs px-4 py-2 rounded-lg hover:shadow-lg transition">Tire Gauge &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE HEADER */}
      <article id="mechanic-guide" className="max-w-3xl mx-auto px-4 pt-12 pb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">How to Find an Honest Auto Repair Shop: The Complete Guide</h1>
        <div className="text-gray-700 leading-relaxed space-y-5">
          <p>The difference between a $400 brake job and a $1,200 brake job at the next shop down the street isn&apos;t always craftsmanship &mdash; it&apos;s often pricing transparency, parts sourcing, and whether the shop owner needs to make rent this month. Finding an honest mechanic is one of the highest-leverage skills a car owner can build. The right shop saves you thousands over the life of your car, catches problems early, and tells you when a repair isn&apos;t worth doing on a vehicle nearing the end of its life. The wrong shop charges you for diagnostics that should be free, replaces parts that didn&apos;t need replacing, and quietly damages your relationship with your car.</p>
          <p>MechanicSeeker indexes auto repair shops across the U.S., from independent specialty shops to chain service centers, transmission specialists, body shops, and dealership service departments. We track ASE certification status where available, customer review patterns across multiple platforms, specialization areas, and the data points that separate trustworthy shops from the ones that show up high in search ads but disappoint at the counter.</p>
          <p>Below is MechanicSeeker&apos;s directory of repair shops organized by state. Continue reading below the directory for the complete guide to vetting a shop before you bring your car in, understanding what diagnostic fees should and shouldn&apos;t cost, the difference between ASE-certified mechanics and dealership-trained technicians, and the questions every car owner should ask before authorizing a repair.</p>
        </div>
      </article>

      {/* BROWSE BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-6">Browse by State</h2>
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 ${showToggle ? "mb-6" : "mb-0"}`}>
          {visibleStates.map((s, index) => {
            const hideThis = !expanded && index >= 15;
            return (
              <Link key={s.code} href={`/${s.slug}`} className={`group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#E67E22] hover:shadow-sm transition${hideThis ? " hidden" : ""}`}>
                <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#E67E22] transition">{s.name}</p>
                <p className="text-gray-400 text-xs">{s.count.toLocaleString()} shops</p>
              </Link>
            );
          })}
        </div>
        {showToggle && (
          <div className="text-center">
            <button onClick={() => setExpanded(!expanded)} className="text-[#E67E22] hover:text-[#2C3E50] font-semibold text-sm transition">
              {expanded ? "Show fewer ↑" : `Show all ${visibleStates.length} states ↓`}
            </button>
          </div>
        )}
      </section>

      {/* ARTICLE CONTINUATION */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="border-t border-[#E67E22]/30 pt-6 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-[Cabin]">Complete Guide Continues</p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-2 mb-3">Why Choosing the Right Shop Matters</h2>
          <p>A trustworthy mechanic compounds in value over years. The first visit is a transaction &mdash; they fix what&apos;s broken and charge a fair price. The third visit is the start of a relationship: they remember your car, they catch a developing issue early, they recommend the cheaper repair when there&apos;s a choice. By the tenth visit, they&apos;re saving you thousands a year by not replacing parts that don&apos;t need replacing and by warning you when a repair on a 200,000-mile car isn&apos;t worth doing.</p>
          <p>The wrong shop does the opposite. They quote you for parts and labor that aren&apos;t justified by the actual problem, recommend &quot;while we were in there&quot; work that wasn&apos;t in the original estimate, and over time, they erode your confidence in every dashboard light. A bad shop costs much more than the markup on any single repair &mdash; they cost the relationship between you and your car. Owners with a good mechanic drive their cars longer and spend less per year on maintenance. Owners with a bad mechanic replace their cars sooner and complain more.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Independent vs. Chain vs. Dealership: What Each Is Best At</h2>
          <p>Independent shops are usually the best value on routine repairs and maintenance. Owner-operator accountability is real &mdash; the mechanic at the counter is often the same person who&apos;ll work on your car. Independents specialize: a German-car-only shop will know BMW and Audi repairs cold; a Toyota and Honda specialist will spot Camry transmission issues a generalist would miss. Hourly labor rates are typically $20-40 lower than dealerships. The trade-off is variability &mdash; quality across independents ranges from excellent to shady, and you have to vet them yourself.</p>
          <p>Chain shops (Firestone, Pep Boys, Midas, Jiffy Lube) offer predictable hours, consistent warranty coverage across locations, and standardized service procedures. They&apos;re best for routine high-volume work &mdash; oil changes, brakes, tires, batteries &mdash; where consistency matters more than specialization. The downside is upselling pressure and limited capability on complex drivability or electrical issues.</p>
          <p>Dealerships are best for warranty work (always free), recall service (always free), proprietary diagnostics on newer vehicles, and certain specialty repairs (timing chains on direct-injection engines, transmission rebuilds, ECU programming). Hourly rates are the highest in the market &mdash; typically $150-200 per hour &mdash; but the depth of brand-specific training and parts access justifies it for the right jobs.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Understanding Diagnostic Fees and Estimate Practices</h2>
          <p>A diagnostic fee covers the time a technician spends finding the problem, not just reading codes. Most shops charge $80-150 for proper drivability or electrical diagnosis. Many waive the fee if you authorize the recommended repair &mdash; confirm this upfront. Free diagnostics at chain stores typically mean an OBD-II code read, which is the starting point of diagnosis, not the answer. A check-engine light with a P0420 code (catalyst efficiency) needs investigation beyond the code itself; the code points to a system, not a specific failed part.</p>
          <p>Always get a written estimate before authorizing repair. Verbal &quot;ballpark&quot; numbers are not enforceable, and any reputable shop will provide written estimates as standard practice. A proper estimate itemizes parts (with brand and price), labor hours (with the labor time guide reference), and labor rate. If a shop refuses to itemize, walk.</p>
          <p>Authorize work in stages on larger jobs. The original quote covers what&apos;s been diagnosed so far; if the technician finds additional issues mid-job, they should call before doing extra work. &quot;While we had it apart&quot; charges added without authorization are a red flag &mdash; and in most states, technically not enforceable on the customer.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">ASE Certification, Manufacturer Training, and What Credentials Mean</h2>
          <p>ASE (Automotive Service Excellence) is an independent testing organization. ASE-Certified means a mechanic passed at least one specialty exam. ASE-Master-Certified means they passed all eight exams covering engine repair, automatic transmission, manual drivetrain, suspension, brakes, electrical, heating/AC, and engine performance. Master certification is meaningful; it filters out mechanics who haven&apos;t bothered to test their fundamentals. It&apos;s not a guarantee of integrity or skill, but it&apos;s a useful baseline.</p>
          <p>Manufacturer training (Toyota, Ford, BMW, GM, etc.) is brand-specific expertise. A mechanic with current Toyota factory training will know hybrid system diagnostics that a generalist won&apos;t. Manufacturer-trained techs typically work at dealerships or at independents that have invested in OEM tooling. Look for posted certifications on the shop wall &mdash; legitimate ones are typically displayed prominently.</p>
          <p>AAA-Approved Auto Repair is a third-party quality vetting program. AAA inspects the shop, verifies certifications, and requires customer-satisfaction standards. It&apos;s a useful tiebreaker when comparing two otherwise similar shops. RepairPal Certified is a similar program with broader coverage. Look for at least one of these credentials, especially for shops you haven&apos;t used before.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Reading Reviews Critically: What Patterns to Look For</h2>
          <p>One-star reviews tell you what a shop is bad at. Five-star reviews tell you what they&apos;re good at. The middle reviews &mdash; three and four stars &mdash; usually have the most useful information because they&apos;re written by customers who had a mixed experience and explain why.</p>
          <p>Look for patterns across multiple reviews. A single one-star review describing rude treatment is one customer&apos;s experience. Five reviews over six months describing the same rudeness from the same staff member is a pattern. Same with hidden charges, misdiagnoses, or pressure tactics &mdash; patterns are signal, isolated complaints are noise.</p>
          <p>Watch how the shop responds to negative reviews. A defensive or hostile response is a red flag &mdash; defensive shop owners tend to be defensive customers face-to-face too. A constructive response that acknowledges the issue and offers a specific remedy (&quot;please call us at the shop and ask for Dave so we can address this&quot;) is a positive signal. Generic &quot;please contact us so we can fix it&quot; responses that never actually address the issue are review-bait &mdash; they exist to dilute the negative review&apos;s prominence, not to fix the problem. Recent reviews (last 6-12 months) are more relevant than older ones.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-10 mb-3">Questions to Ask Before Authorizing a Repair</h2>
          <p>Get specific before you sign the work order. The questions below take a minute to ask and prevent most repair-shop disputes:</p>
          <p>What exactly is broken, and what&apos;s the failure mode? A good shop can explain the symptom and the cause in plain language. &quot;Your alternator is putting out 11.8 volts under load instead of the spec&apos;d 13.8 &mdash; the regulator is failing&quot; is a real answer. &quot;Your alternator is bad&quot; is a partial answer that should prompt a follow-up question.</p>
          <p>What parts brand are you using? OEM parts, aftermarket parts, and used parts have very different price points and warranties. OEM (made by the original manufacturer) is the highest cost but matches factory spec. Aftermarket from quality brands (Bosch, Denso, Moog) is typically 30-60% cheaper and works well for most repairs. Used parts on older vehicles can save significant money but come with limited or no warranty.</p>
          <p>What&apos;s the labor warranty? 12 months / 12,000 miles is the industry standard for most repairs. Anything shorter on a major job (transmission, engine, electrical) is worth questioning. What does this fix not address that I should know about? Honest shops will tell you about adjacent issues they noticed but didn&apos;t include in the quoted repair. Will you call before any additional repairs? Should be a quick &quot;yes&quot; &mdash; if it&apos;s not, find another shop.</p>
        </div>
      </article>

      {/* POPULAR CITIES */}
      {topCities.length > 0 && (
        <section className="py-10" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #F8FAFB 100%)' }}>
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A]">Popular Auto Repair Cities</h2>
                <p className="text-gray-400 text-sm">Cities with the most auto repair shops on MechanicSeeker.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topCities.map((c) => (
                <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/cities/${c.stateSlug}-${c.citySlug}`} className="group bg-white rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-[#E67E22]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition text-sm">{c.city}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold bg-[#E67E22]/10 text-[#E67E22] px-2 py-0.5 rounded">{c.count.toLocaleString()} shops</span>
                    <span className="text-gray-400 text-xs">&middot; {c.stateName}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] text-center mb-8">Why MechanicSeeker</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "\u{1F50D}", title: "Find Trusted Shops", desc: `${unified.length.toLocaleString()}+ verified auto repair shops with real addresses and phone numbers.` },
            { icon: "\u{1F527}", title: "Service Details", desc: "See what each shop specializes in \u2014 brakes, tires, transmission, body work, and more." },
            { icon: "\u{1F3E2}", title: "Chain or Independent", desc: "Compare national chains like Jiffy Lube and Midas with trusted local independents." },
            { icon: "\u{1F4B0}", title: "Free Forever", desc: "No login. No account. No fees. Just find your mechanic and go." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
              <p className="text-2xl mb-2">{f.icon}</p>
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEASONAL PICKS (rotates by month) */}
      <section className="max-w-5xl mx-auto px-4 py-2">
        <SeasonalPicks />
      </section>

      {/* ESSENTIAL GEAR SECTIONS */}
      <section className="max-w-5xl mx-auto px-4 py-2">
        <GearRecommendation section="diy-tools" />
        <GearRecommendation section="emergency" />
        <GearRecommendation section="maintenance" />
      </section>

      {/* BLOG */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A]">Car Care Tips &amp; Guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#E67E22] hover:text-[#d35400] transition">All posts &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { slug: "how-to-find-trustworthy-mechanic", title: "How to Find a Trustworthy Mechanic", category: "Guide", gradient: "linear-gradient(135deg, #2C3E50 0%, #E67E22 100%)" },
            { slug: "how-much-does-a-brake-job-cost", title: "How Much Does a Brake Job Cost?", category: "Cost Guide", gradient: "linear-gradient(135deg, #E67E22 0%, #F4A261 100%)" },
            { slug: "car-maintenance-schedule", title: "Car Maintenance Schedule: What to Do and When", category: "Maintenance", gradient: "linear-gradient(135deg, #1A2332 0%, #2C3E50 100%)" },
          ].map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="aspect-[16/9] flex items-center justify-center" style={{ background: p.gradient }}>
                <span className="text-white/30 text-4xl font-bold font-[Cabin]">{p.category}</span>
              </div>
              <div className="p-4">
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition text-sm">{p.title}</h3>
                <span className="text-[#E67E22] text-xs font-semibold mt-2 inline-block">Read More &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="py-16" style={{ background: "#2C3E50" }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-white mb-2">Find Deals Near You &#128295;</h2>
          <p className="text-white/70 text-sm mb-6">Shop specials, maintenance reminders, and new shop openings &mdash; delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-[#E67E22] transition" />
            <button className="bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-7 py-3.5 rounded-xl transition text-sm whitespace-nowrap">Subscribe Free</button>
          </div>
          <p className="text-white/30 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#1A1A1A] text-sm hover:text-[#E67E22] transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>

      {/* SUBMIT */}
      <section className="max-w-2xl mx-auto px-4 pb-20 pt-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-2">Know a shop we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete auto repair directory in America.</p>
          <a href="mailto:hello@mechanicseeker.com?subject=New%20Shop%20Submission" className="bg-[#E67E22] hover:bg-[#d35400] text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Shop</a>
        </div>
      </section>
    </div>
  );
}
