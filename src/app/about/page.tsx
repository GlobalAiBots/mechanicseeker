import type { Metadata } from "next";
export const metadata: Metadata = { title: "About | MechanicSeeker", alternates: { canonical: "https://mechanicseeker.com/about" } };
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">About MechanicSeeker</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>MechanicSeeker is the most complete auto repair shop directory in America with 51,000+ shops across all 50 states. We compile data from OpenStreetMap and public sources to help you find trusted mechanics, tire shops, body shops, and quick lube locations near you.</p>
        <p>Every listing includes the shop&apos;s address, phone number, services offered, and whether it&apos;s a national chain or independent shop. MechanicSeeker is completely free to use &mdash; no login, no account, no fees.</p>
        <p>Email us at <a href="mailto:hello@mechanicseeker.com" className="text-[#E67E22] hover:underline">hello@mechanicseeker.com</a></p>
      </div>
    </div>
  );
}
