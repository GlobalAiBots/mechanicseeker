import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | MechanicSeeker",
  description: "Car maintenance, repairs, cost guides, DIY tips, and mechanic advice for drivers across America.",
  alternates: { canonical: "https://www.mechanicseeker.com/blog" },
};

// Category → gradient + inline SVG icon. Matches rampseeker/marinaseeker/
// barkseeker/pierseeker visual pattern (outlined SVG at 45-50% white,
// 80x60 viewBox).
const CATEGORY_CONFIG: Record<string, { gradient: string; icon: string }> = {
  "Cost Guides": {
    gradient: "linear-gradient(135deg, #D97706 0%, #EA580C 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="40" cy="30" r="16" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><path d="M40 20 L40 40 M34 24 Q34 28 40 28 Q46 28 46 32 Q46 36 40 36 Q34 36 34 32" stroke="rgba(255,255,255,0.55)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  },
  DIY: {
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M46 12 L54 20 L50 24 L58 32 L54 36 L46 28 L42 32 L36 26 L40 22 L32 14 L36 10 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" stroke-linejoin="round"/><line x1="34" y1="32" x2="22" y2="44" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
  "Finding a Mechanic": {
    gradient: "linear-gradient(135deg, #0891B2 0%, #0EA5E9 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="34" cy="26" r="12" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><line x1="43" y1="35" x2="54" y2="46" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="26" r="3" fill="rgba(255,255,255,0.55)"/></svg>`,
  },
  Maintenance: {
    gradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M40 14 L44 20 L50 18 L50 26 L56 30 L50 34 L50 42 L44 40 L40 46 L36 40 L30 42 L30 34 L24 30 L30 26 L30 18 L36 20 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" stroke-linejoin="round"/><circle cx="40" cy="30" r="5" stroke="rgba(255,255,255,0.55)" stroke-width="2"/></svg>`,
  },
  Repairs: {
    gradient: "linear-gradient(135deg, #475569 0%, #334155 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M52 14 Q58 14 58 20 Q58 24 54 26 L38 42 L32 48 L26 42 L32 36 L48 20 Q50 16 52 14 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" stroke-linejoin="round"/><circle cx="52" cy="20" r="2" fill="rgba(255,255,255,0.55)"/></svg>`,
  },
  Upgrades: {
    gradient: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M40 12 L52 26 L46 26 L46 42 L34 42 L34 26 L28 26 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" stroke-linejoin="round"/><line x1="28" y1="48" x2="52" y2="48" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
};

const DEFAULT_CONFIG = {
  gradient: "linear-gradient(135deg, #475569 0%, #1E293B 100%)",
  icon: `<svg viewBox="0 0 80 60" fill="none"><rect x="20" y="14" width="40" height="32" rx="3" stroke="rgba(255,255,255,0.4)" stroke-width="2"/></svg>`,
};

const networkPosts = [
  {
    url: "https://www.rampseeker.com/blog",
    title: "RampSeeker Blog",
    excerpt: "Boat ramp guides, towing advice, launching tips. 27,000+ ramps across America.",
    tag: "RampSeeker",
  },
  {
    url: "https://www.marinaseeker.com/blog",
    title: "MarinaSeeker Blog",
    excerpt: "Slip rentals, liveaboard guides, marina etiquette, dockage 101 — for the boaters in your driveway.",
    tag: "MarinaSeeker",
  },
  {
    url: "https://www.babymydog.com/blog",
    title: "BabyMyDog Blog",
    excerpt: "Pet-friendly travel tips, gear reviews, and breed guides for the family road trip.",
    tag: "BabyMyDog",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Car maintenance, repairs, cost guides, and mechanic advice for everyday drivers.</p>
      <div className="space-y-6">
        {blogPosts.map((p) => {
          const config = CATEGORY_CONFIG[p.category] ?? DEFAULT_CONFIG;
          return (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              {/* Thumbnail */}
              <div className="sm:w-48 h-36 sm:h-auto flex-shrink-0 flex items-center justify-center relative" style={{ background: config.gradient }}>
                <div className="w-20 h-16" dangerouslySetInnerHTML={{ __html: config.icon }} />
              </div>
              {/* Content */}
              <div className="p-5 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-bold text-[#E67E22] bg-[#E67E22]/10 px-2 py-0.5 rounded-full">{p.category}</span>
                  <span className="text-gray-400 text-xs">{p.date}</span>
                </div>
                <h2 className="font-[Cabin] text-lg font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition mb-2 line-clamp-2">{p.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{p.description}</p>
                <span className="text-[#E67E22] font-semibold text-sm">Read more &rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* From our network */}
      <section className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-2">From our network</h2>
        <p className="text-sm text-gray-500 mb-6">MechanicSeeker is part of a family of directory sites. Fresh reading from our sisters:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {networkPosts.map((p) => (
            <a key={p.url} href={p.url} className="group block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 inline-block">{p.tag} <span aria-hidden="true">↗</span></span>
              <p className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition text-sm leading-snug">{p.title}</p>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">{p.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
