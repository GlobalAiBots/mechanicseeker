import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLETUS AI — 24/7 AI Chat & Voice Agent for Any Business | MechanicSeeker",
  description: "CLETUS answers your customers' questions 24/7 on your website and phone. Works for auto repair shops, tire shops, body shops, and any business. Less than $1/day.",
  keywords: "AI chatbot for auto repair, AI customer service, 24/7 chatbot for mechanics, AI phone answering service, chatbot for auto shops",
  openGraph: { title: "CLETUS AI — 24/7 Chat & Voice Agent for Any Business", url: "https://www.mechanicseeker.com/for-businesses", siteName: "MechanicSeeker" },
  alternates: { canonical: "https://www.mechanicseeker.com/for-businesses" },
};

const businesses = [
  { icon: "&#128295;", type: "Auto Repair Shops", questions: ["How much does a brake job cost?", "Do you work on [make/model]?", "Can I get a same-day appointment?"] },
  { icon: "&#128722;", type: "Tire Shops", questions: ["Do you have [size] tires in stock?", "How much for a tire rotation?", "Do you offer road hazard coverage?"] },
  { icon: "&#128663;", type: "Body Shops", questions: ["Do you offer free estimates?", "How long does a paint job take?", "Do you work with my insurance?"] },
  { icon: "&#9981;", type: "Quick Lube & Oil Change", questions: ["How much is a synthetic oil change?", "Do I need an appointment?", "How long does it take?"] },
  { icon: "&#128267;", type: "Transmission Shops", questions: ["How much does a rebuild cost?", "Do you offer a warranty?", "Can you diagnose the problem first?"] },
  { icon: "&#10052;", type: "AC & Heating", questions: ["How much is an AC recharge?", "Why is my AC blowing warm?", "Do you diagnose leaks?"] },
  { icon: "&#127976;", type: "Car Dealerships", questions: ["Do you have [model] in stock?", "What financing do you offer?", "Can I schedule a test drive?"] },
  { icon: "&#128663;", type: "Car Wash & Detailing", questions: ["What are your packages?", "Do you do interior detailing?", "How long does a full detail take?"] },
  { icon: "&#128295;", type: "Service Businesses", questions: ["How much does [service] cost?", "Do you offer free estimates?", "What areas do you serve?"] },
  { icon: "&#127860;", type: "Restaurants & Bars", questions: ["What are your hours?", "Do you take reservations?", "Is there a wait?"] },
  { icon: "&#127973;", type: "Veterinary Clinics", questions: ["Are you accepting new patients?", "What are your hours?", "Do you handle emergencies?"] },
  { icon: "&#127968;", type: "Real Estate", questions: ["Is this property still available?", "Can I schedule a showing?", "What are the HOA fees?"] },
];

export default function ForBusinessesPage() {
  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4" style={{ background: "#FAF8F5", backgroundImage: "radial-gradient(circle at 30% 70%, rgba(230,126,34,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-3xl mx-auto">
          Your Customers Have Questions.<br />CLETUS Answers Them 24/7.
        </h1>
        <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          Own an auto repair shop, tire shop, body shop, or quick lube? CLETUS is an AI chat and voice agent for your website and phone. Works for any business, any industry. Less than $1/day.
        </p>
        <div className="flex gap-3 justify-center mt-8 flex-wrap">
          <a href="https://globalaibots.com/signup" target="_blank" rel="noopener noreferrer" className="bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start Free 14-Day Trial</a>
          <a href="#see-it" className="border-2 border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white font-bold px-6 py-3 rounded-lg transition">See It In Action</a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] text-center mb-3">CLETUS Works for Every Business</h2>
        <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">CLETUS learns YOUR business and answers YOUR customers&apos; questions — instantly, accurately, 24/7.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((b) => (
            <div key={b.type} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: b.icon }} />
              <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-3">{b.type}</h3>
              <div className="space-y-2">
                {b.questions.map((q) => (
                  <p key={q} className="text-gray-500 text-sm bg-gray-50 rounded-lg px-3 py-2 italic" dangerouslySetInnerHTML={{ __html: `&ldquo;${q}&rdquo;` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account in 30 seconds. No credit card for the free trial." },
              { step: "2", title: "Teach CLETUS", desc: "Enter your hours, prices, FAQ, and policies. CLETUS learns it all in minutes." },
              { step: "3", title: "Go Live", desc: "Paste one line of code on your website. CLETUS starts answering immediately." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#E67E22] text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h3 className="font-[Cabin] font-bold text-[#1A1A1A] mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] text-center mb-8">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "CLETUS Chat", price: "$29.95", desc: "AI chat widget on your website. 24/7." },
            { name: "CLETUS Voice", price: "$49.95", desc: "AI phone receptionist. Natural voice." },
            { name: "Chat + Voice", price: "$69.95", desc: "Both products. Save $10/mo.", highlight: true },
          ].map((p) => (
            <div key={p.name} className={`rounded-xl p-6 text-center ${p.highlight ? "bg-[#2C3E50] text-white" : "bg-white border border-gray-200 shadow-sm"}`}>
              <p className={`font-[Cabin] font-bold text-sm mb-1 ${p.highlight ? "text-white/80" : "text-gray-500"}`}>{p.name}</p>
              <p className="text-3xl font-bold font-[Cabin] mb-1">{p.price}<span className={`text-sm font-normal ${p.highlight ? "text-white/70" : "text-gray-400"}`}>/mo</span></p>
              <p className={`text-sm ${p.highlight ? "text-white/80" : "text-gray-500"}`}>{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm text-center mt-4">14-day free trial on every plan. No credit card required.</p>
      </section>

      <section id="see-it" className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
          <h2 className="font-[Cabin] text-xl font-bold text-[#1A1A1A] mb-3">See CLETUS In Action — Right Now</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Visit <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] font-semibold hover:underline">askcletus.com</a> to try a live demo. That&apos;s exactly what your customers would experience.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 text-center" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(230,126,34,0.06) 0%, transparent 50%)" }}>
        <h2 className="font-[Cabin] text-2xl font-bold text-[#1A1A1A] mb-3">Stop Losing Customers to Unanswered Questions</h2>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">CLETUS costs less than $1/day and works 24/7. Your customers get instant answers. You get more business.</p>
        <a href="https://globalaibots.com/signup" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-8 py-3 rounded-lg transition shadow-sm">Start Your Free 14-Day Trial &rarr;</a>
        <p className="text-gray-400 text-xs mt-4">Questions? <a href="mailto:hello@globalaibots.com" className="text-[#E67E22] hover:underline">hello@globalaibots.com</a></p>
      </section>
    </div>
  );
}
