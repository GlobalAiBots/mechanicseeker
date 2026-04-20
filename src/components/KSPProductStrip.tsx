import { KSP_LINKS, KSP_COUPON_CODE } from "@/lib/ksp-affiliate";

export default function KSPProductStrip() {
  const products = [
    { name: "Leveling Lift Kits", price: "$80-200", url: KSP_LINKS.levelingKits, desc: "Fix the factory rake. Forged components, vehicle-specific fitment." },
    { name: "Wheel Spacers", price: "$60-120", url: KSP_LINKS.wheelSpacers, desc: "Hub-centric forged 6061-T6. Wider stance or post-lift clearance." },
    { name: "Upper Control Arms", price: "$120-300", url: KSP_LINKS.aluminumControlArms, desc: "Corrects ball-joint angle after lift. Forged aluminum." },
  ];

  return (
    <section className="my-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-[#1A2332] to-[#2C3E50] text-white">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Paid Partner</p>
        <h3 className="font-[Cabin] text-lg md:text-xl font-bold">Truck &amp; SUV Upgrades from KSP Performance</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {products.map((p) => (
          <div key={p.name} className="p-5 flex flex-col">
            <p className="font-[Cabin] font-bold text-[#1A1A1A] mb-1">{p.name}</p>
            <p className="text-[#E67E22] font-bold text-sm mb-2">{p.price}</p>
            <p className="text-gray-600 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer sponsored" className="inline-block text-center bg-[#E67E22] hover:bg-[#d35400] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition">Shop at KSP &rarr;</a>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
        Use code <a href={KSP_LINKS.couponSitewide} target="_blank" rel="noopener noreferrer sponsored" className="font-bold text-[#E67E22] hover:underline">{KSP_COUPON_CODE}</a> for 5% off &middot; Free shipping
      </div>
    </section>
  );
}
