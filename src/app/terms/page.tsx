import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service | MechanicSeeker", alternates: { canonical: "https://mechanicseeker.com/terms" } };
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">Terms of Service</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p>Last updated: April 2026. By using MechanicSeeker you agree to these terms. Shop data is compiled from public sources including OpenStreetMap. We strive for accuracy but cannot guarantee all information is current. Always verify shop details before visiting. Data sourced from OpenStreetMap (ODbL license).</p>
        <p>Contact: <a href="mailto:hello@mechanicseeker.com" className="text-[#E67E22] hover:underline">hello@mechanicseeker.com</a></p>
      </div>
    </div>
  );
}
