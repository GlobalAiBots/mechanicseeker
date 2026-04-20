import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | MechanicSeeker", alternates: { canonical: "https://www.mechanicseeker.com/privacy" } };
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p>Last updated: April 2026. MechanicSeeker operates mechanicseeker.com. We collect anonymous usage data through Google Analytics. We do not collect personally identifiable information unless voluntarily submitted via email. We use cookies for analytics (Google Analytics) and advertising (Google AdSense).</p>
        <p>Contact: <a href="mailto:hello@mechanicseeker.com" className="text-[#E67E22] hover:underline">hello@mechanicseeker.com</a></p>
      </div>
    </div>
  );
}
