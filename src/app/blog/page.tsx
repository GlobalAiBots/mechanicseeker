import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog | MechanicSeeker", alternates: { canonical: "https://mechanicseeker.com/blog" } };

const posts = [
  { slug: "diy-car-maintenance-tasks", title: "10 Car Maintenance Tasks You Can Do Yourself (and 5 You Can't)", date: "April 15, 2026", desc: "Save money by handling these 10 easy car maintenance tasks at home — plus 5 repairs to always leave to a pro." },
  { slug: "car-strange-noises", title: "Car Making Strange Noises? Here's What Each Sound Means", date: "April 15, 2026", desc: "Squealing, grinding, clicking, knocking, or hissing? Decode your car's strange noises and learn which need immediate attention." },
  { slug: "used-car-inspection", title: "Used Car Pre-Purchase Inspection: What to Check", date: "April 15, 2026", desc: "Don't buy a used car without checking these critical items first. Complete pre-purchase inspection checklist." },
  { slug: "seasonal-maintenance-checklist", title: "Seasonal Car Maintenance Checklist: Spring, Summer, Fall, Winter", date: "April 15, 2026", desc: "Keep your car running reliably year-round with this seasonal maintenance checklist for every season." },
  { slug: "how-to-find-trustworthy-mechanic", title: "How to Find a Trustworthy Mechanic: 8 Things to Look For", date: "April 9, 2026", desc: "What to look for when choosing a mechanic you can trust with your car." },
  { slug: "how-much-brake-job-cost", title: "How Much Should a Brake Job Cost in 2026?", date: "April 9, 2026", desc: "A complete cost breakdown for brake pads, rotors, and full brake jobs." },
  { slug: "chain-vs-independent-mechanic", title: "Chain vs Independent Mechanic: Which Is Better?", date: "April 9, 2026", desc: "Pros and cons of Jiffy Lube, Midas, and Firestone vs your local shop." },
  { slug: "signs-car-needs-repair", title: "10 Signs Your Car Needs Immediate Repair", date: "April 9, 2026", desc: "Warning signs that mean you should get to a mechanic ASAP." },
  { slug: "car-maintenance-schedule", title: "The Complete Car Maintenance Schedule Every Owner Needs", date: "April 9, 2026", desc: "Oil changes, brakes, tires, and more \u2014 when to service everything." },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-gray-400 text-xs mb-2">{p.date}</p>
            <h2 className="font-[Cabin] font-bold text-[#1A1A1A] text-xl hover:text-[#E67E22] transition">{p.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{p.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
