"use client";

import { use, useState } from "react";
import Link from "next/link";

export default function ClaimPage({ searchParams }: { searchParams: Promise<{ shop?: string; name?: string }> }) {
  const params = use(searchParams);
  const shopId = params.shop || "";
  const shopName = params.name || "";

  const [formData, setFormData] = useState({
    shopName: shopName,
    yourName: "",
    role: "Owner",
    email: "",
    phone: "",
    updates: [] as string[],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleUpdate = (val: string) => {
    setFormData(prev => ({
      ...prev,
      updates: prev.updates.includes(val) ? prev.updates.filter(u => u !== val) : [...prev.updates, val],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Shop: ${formData.shopName}\nShop ID: ${shopId}\nName: ${formData.yourName}\nRole: ${formData.role}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nUpdates requested: ${formData.updates.join(", ")}\nMessage: ${formData.message}`;
    window.location.href = `mailto:admin@globalaibots.com?subject=${encodeURIComponent("Listing Claim: " + formData.shopName)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">{"✅"}</p>
        <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-3">Claim Request Submitted!</h1>
        <p className="text-gray-500 mb-8">Thanks! We&apos;ll review your claim within 48 hours and send you a confirmation email.</p>
        <Link href="/" className="bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-6 py-3 rounded-lg transition inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#E67E22] transition">Home</Link><span>/</span>
        <span className="text-[#1A1A1A] font-medium">Claim Your Listing</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-2">Claim Your Listing</h1>
      <p className="text-gray-500 mb-8">Own an auto repair shop? Claim your free listing to update your hours, services, and contact information.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Shop Name</label>
          <input type="text" value={formData.shopName} onChange={e => setFormData({ ...formData, shopName: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Your Name</label>
          <input type="text" value={formData.yourName} onChange={e => setFormData({ ...formData, yourName: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Your Role</label>
          <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition bg-white">
            <option value="Owner">Owner</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Email Address</label>
          <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Phone Number</label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">What would you like to update?</label>
          <div className="flex flex-wrap gap-2">
            {["Hours", "Services", "Photos", "Contact Info", "Description", "Website"].map(opt => (
              <button key={opt} type="button" onClick={() => toggleUpdate(opt)} className={`px-3 py-1.5 rounded-full text-sm border transition ${formData.updates.includes(opt) ? "bg-[#E67E22] text-white border-[#E67E22]" : "bg-white text-gray-500 border-gray-200 hover:border-[#E67E22]"}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Message (optional)</label>
          <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#E67E22] transition resize-none" placeholder="Anything else you'd like us to know..." />
        </div>

        <button type="submit" className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white font-bold py-3.5 rounded-lg transition text-sm">
          Submit Claim Request
        </button>

        <p className="text-xs text-gray-400 text-center">Free forever. No credit card required. We&apos;ll verify your ownership and activate your listing within 48 hours.</p>
      </form>
    </div>
  );
}
