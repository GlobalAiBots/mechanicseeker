import Link from "next/link";

const POSTS = [
  { slug: "how-to-find-trustworthy-mechanic", title: "How to Find a Trustworthy Mechanic", category: "Guide", desc: "Tips for finding an honest auto repair shop you can trust with your car." },
  { slug: "car-maintenance-schedule", title: "Car Maintenance Schedule: What to Do and When", category: "Maintenance", desc: "The complete car maintenance schedule to keep your vehicle running smoothly for years." },
  { slug: "how-much-does-a-brake-job-cost", title: "How Much Does a Brake Job Cost?", category: "Cost Guide", desc: "Average brake job costs, what affects pricing, and how to save money on brake repairs." },
  { slug: "how-much-does-an-oil-change-cost", title: "How Much Does an Oil Change Cost?", category: "Cost Guide", desc: "Oil change costs broken down by type, vehicle, and where you go." },
  { slug: "signs-car-needs-repair", title: "Signs Your Car Needs Repair", category: "Diagnostics", desc: "Warning signs that your car needs professional attention before a small problem becomes expensive." },
  { slug: "chain-vs-independent-mechanic", title: "Chain vs Independent Mechanic: Which Is Better?", category: "Guide", desc: "Compare national chains like Jiffy Lube with local independent shops to find the best fit." },
  { slug: "how-much-does-a-transmission-repair-cost", title: "How Much Does a Transmission Repair Cost?", category: "Cost Guide", desc: "Transmission repair and rebuild costs, warning signs, and when to replace vs repair." },
  { slug: "how-much-does-an-ac-recharge-cost", title: "How Much Does an AC Recharge Cost?", category: "Cost Guide", desc: "AC recharge costs, when you need one, and DIY vs professional options." },
  { slug: "how-much-does-a-timing-belt-cost", title: "How Much Does a Timing Belt Cost?", category: "Cost Guide", desc: "Timing belt replacement costs and why you should never skip this critical maintenance." },
];

function seededIndex(slug: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

export default function FeaturedArticle({ listingSlug }: { listingSlug: string }) {
  const idx1 = seededIndex(listingSlug, POSTS.length);
  const idx2 = seededIndex(listingSlug + "_2", POSTS.length);
  const picks = [POSTS[idx1]];
  if (idx2 !== idx1) picks.push(POSTS[idx2]);

  return (
    <section className="my-8">
      <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-4">Car Care Tips &amp; Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {picks.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{p.category}</span>
            <h3 className="font-[Cabin] font-bold text-[#1A1A1A] group-hover:text-[#E67E22] transition mt-2 text-sm leading-snug">{p.title}</h3>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">{p.desc.substring(0, 120)}{p.desc.length > 120 ? "..." : ""}</p>
            <span className="text-[#E67E22] text-xs font-semibold mt-2 inline-block">Read More &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
