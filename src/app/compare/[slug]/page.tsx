import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparisonBySlug, type ComparisonPage } from "@/data/comparisons";
import { KSP_BANNERS, KSP_COUPON_CODE } from "@/lib/ksp-affiliate";
import type { Metadata } from "next";

const KSP_COMPARE_SLUGS = new Set(["diy-vs-mechanic", "oem-vs-aftermarket-parts"]);

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) return { title: "Comparison Not Found" };
  return {
    title: cmp.metaTitle,
    description: cmp.metaDescription,
    alternates: { canonical: `https://www.mechanicseeker.com/compare/${cmp.slug}` },
    openGraph: { title: cmp.metaTitle, description: cmp.metaDescription, url: `https://www.mechanicseeker.com/compare/${cmp.slug}`, siteName: "MechanicSeeker", type: "article" },
  };
}

const AFFILIATE_TAG = "babymydog03-20";
const amazonLink = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;

function ProductCard({ product, label, isWinner }: { product: ComparisonPage["productA"]; label: string; isWinner: boolean }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden ${isWinner ? 'ring-2 ring-[#E67E22]' : 'border border-gray-200'} shadow-sm`}>
      <div className={`px-6 py-3 text-white text-xs font-bold uppercase tracking-widest ${isWinner ? '' : 'bg-gray-500'}`} style={isWinner ? { background: 'linear-gradient(135deg, #F39C12, #E67E22)' } : undefined}>
        {label} {isWinner && " · Our Pick"}
      </div>
      <div className="p-6">
        <h3 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl mb-2">{product.name}</h3>
        <p className="font-extrabold text-[#2D6A4F] text-xl mb-4">{product.price}</p>
        <p className="text-gray-600 text-sm italic mb-4">{product.bestFor}</p>

        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] mb-2">Pros</p>
          <ul className="space-y-1.5">
            {product.pros.map((p, i) => (
              <li key={i} className="text-[#1A1A1A] text-sm flex items-start gap-2">
                <span className="text-[#2D6A4F] font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E67E22] mb-2">Cons</p>
          <ul className="space-y-1.5">
            {product.cons.map((c, i) => (
              <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                <span className="text-[#E67E22] font-bold flex-shrink-0 mt-0.5">&#8722;</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {product.searchQuery && (
          <a href={amazonLink(product.searchQuery)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block text-white font-bold text-center text-base px-6 py-3 rounded-lg transition-all hover:shadow-md" style={{ background: 'linear-gradient(135deg, #F39C12, #E67E22)' }}>
            &#9733; Our Pick &mdash; View on Amazon
          </a>
        )}
      </div>
    </div>
  );
}

const SERVICE_NAMES: Record<string, string> = {
  "oil-change":"Oil Change","brake-repair":"Brake Repair","tire-rotation":"Tire Rotation","battery-replacement":"Battery Replacement","alignment":"Wheel Alignment","ac-repair":"AC Repair","check-engine-light":"Check Engine Light","transmission":"Transmission Service",
};
const COST_NAMES: Record<string, string> = {
  "oil-change":"Oil Change Cost","brake-pads":"Brake Pads Cost","alternator":"Alternator Cost","timing-belt":"Timing Belt Cost","transmission-repair":"Transmission Repair Cost",
};
const BLOG_TITLES: Record<string, string> = {
  "should-i-change-my-own-oil":"Should I Change My Own Oil?",
  "how-much-does-an-oil-change-cost":"How Much Does an Oil Change Cost?",
  "can-i-replace-my-own-brake-pads":"Can I Replace My Own Brake Pads?",
  "diy-car-maintenance-tasks":"10 DIY Car Maintenance Tasks",
  "diy-car-maintenance-checklist":"DIY Car Maintenance Checklist",
  "car-strange-noises":"Car Strange Noises Guide",
  "car-maintenance-schedule":"Car Maintenance Schedule",
  "when-to-see-a-mechanic":"When to See a Mechanic",
  "how-to-find-trustworthy-mechanic":"How to Find a Trustworthy Mechanic",
  "check-engine-light-codes":"Top 10 Check Engine Light Codes",
  "questions-to-ask-mechanic":"15 Questions to Ask Your Mechanic",
  "car-wont-start":"Car Won't Start? Diagnostic Checklist",
  "extended-warranty-worth-it":"Are Extended Car Warranties Worth It?",
};

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://www.mechanicseeker.com/compare" },
      { "@type": "ListItem", position: 3, name: cmp.title, item: `https://www.mechanicseeker.com/compare/${cmp.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cmp.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cmp.title,
    description: cmp.metaDescription,
    datePublished: "2026-04-19",
    author: { "@type": "Organization", name: "MechanicSeeker" },
    publisher: { "@type": "Organization", name: "MechanicSeeker", url: "https://www.mechanicseeker.com" },
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, breadcrumbLd, faqLd]) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span>
          <Link href="/compare" className="hover:text-[#E67E22] transition">Compare</Link><span>/</span>
          <span className="text-[#1A1A1A] font-medium">{cmp.subject}</span>
        </nav>

        <Link href="/compare" className="inline-flex items-center gap-1 text-sm text-[#E67E22] font-semibold hover:underline mb-6">
          &larr; All Comparisons
        </Link>

        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">{cmp.title}</h1>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-6">Last Updated: April 2026</p>

        <div className="text-gray-700 leading-relaxed space-y-4 mb-10 text-lg max-w-3xl">
          {cmp.intro.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <ProductCard product={cmp.productA} label={cmp.productA.name} isWinner={cmp.verdictWinner === "a" || cmp.verdictWinner === "both"} />
          <ProductCard product={cmp.productB} label={cmp.productB.name} isWinner={cmp.verdictWinner === "b" || cmp.verdictWinner === "both"} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-12 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-[#1A1A1A] mb-4">Side-by-Side</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Attribute</th>
                    <th className="text-left py-3 px-4 text-[#1A1A1A] font-bold">{cmp.productA.name}</th>
                    <th className="text-left py-3 px-4 text-[#1A1A1A] font-bold">{cmp.productB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {cmp.comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-semibold text-gray-500">{row.attribute}</td>
                      <td className={`py-3 px-4 ${row.winner === "a" ? 'font-bold text-[#2D6A4F]' : 'text-gray-700'}`}>
                        {row.winner === "a" && "\u2713 "}{row.a}
                      </td>
                      <td className={`py-3 px-4 ${row.winner === "b" ? 'font-bold text-[#2D6A4F]' : 'text-gray-700'}`}>
                        {row.winner === "b" && "\u2713 "}{row.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <article className="prose prose-gray max-w-none mb-12">
          <div className="text-[#1A1A1A] leading-relaxed space-y-5">
            {cmp.body.split(/\n\n+/).map((block, i) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("## ")) {
                return <h2 key={i} className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mt-8 mb-3">{trimmed.slice(3)}</h2>;
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*([^*]+)\*\*/g, "<strong class='text-[#1A1A1A]'>$1</strong>") }} />
              );
            })}
          </div>
        </article>

        <section className="mb-12 rounded-2xl p-6 md:p-8 border-2 border-[#E67E22]/30" style={{ background: 'linear-gradient(135deg, rgba(243,156,18,0.08), rgba(230,126,34,0.05))' }}>
          <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
            <span className="text-[#E67E22]">&#127942;</span> Our Verdict
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed text-base md:text-lg">{cmp.verdict}</p>
        </section>

        <section className="mb-12">
          <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-[#1A1A1A] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {cmp.faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[#1A1A1A] hover:text-[#E67E22] transition list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-[#E67E22] ml-2 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {cmp.relatedServices && cmp.relatedServices.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-[#E67E22] mb-3">Related Services</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedServices.map((slug) => (
                  <Link key={slug} href={`/services/${slug}`} className="inline-flex items-center gap-1 bg-[#E67E22]/10 hover:bg-[#E67E22]/20 text-[#E67E22] text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {SERVICE_NAMES[slug] || slug} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
          {cmp.relatedCosts && cmp.relatedCosts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-[#2D6A4F] mb-3">Cost Guides</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedCosts.map((slug) => (
                  <Link key={slug} href={`/costs/${slug}`} className="inline-flex items-center gap-1 bg-[#2D6A4F]/10 hover:bg-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {COST_NAMES[slug] || slug} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
          {cmp.relatedBlog && cmp.relatedBlog.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Related Reading</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedBlog.map((slug) => (
                  <Link key={slug} href={`/blog/${slug}`} className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {BLOG_TITLES[slug] || slug} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {KSP_COMPARE_SLUGS.has(cmp.slug) && (
          <section className="mb-12 flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#E67E22]/30 bg-[#fff8ef]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#E67E22]">
              Paid Partner
            </p>
            <a
              href={KSP_BANNERS.square250.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label="Shop KSP Performance"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={KSP_BANNERS.square250.src}
                width={KSP_BANNERS.square250.width}
                height={KSP_BANNERS.square250.height}
                alt="Shop KSP Performance"
                loading="lazy"
              />
            </a>
            <p className="text-sm text-gray-600 text-center">
              Use code{" "}
              <span className="font-bold text-[#E67E22]">{KSP_COUPON_CODE}</span>{" "}
              for 5% off &middot; Free shipping on truck &amp; SUV upgrades
            </p>
          </section>
        )}

        <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">More Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {comparisons.filter((c) => c.slug !== cmp.slug).slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-[#E67E22] hover:bg-[#E67E22]/5 transition">
                <p className="font-bold text-[#1A1A1A] text-sm">{c.title}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{c.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-gray-400 italic text-center mt-8">
          As an Amazon Associate we earn from qualifying purchases. Repair cost ranges are approximate — always confirm with your local mechanic.
        </p>
      </div>
    </div>
  );
}
