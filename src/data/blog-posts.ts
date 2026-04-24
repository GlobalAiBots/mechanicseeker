export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "car-battery-replacement-cost", title: "Car Battery Replacement Cost in 2026: By Vehicle & Where to Buy", date: "April 21, 2026", description: "Real pricing $100-400 installed — by vehicle type, where to buy (AutoZone vs Costco vs Walmart vs dealer), CCA requirements, signs your battery is dying, DIY difficulty.", category: "Cost Guides" },
  { slug: "timing-belt-vs-timing-chain", title: "Timing Belt vs Timing Chain: Which Does Your Car Have? (2026)", date: "April 21, 2026", description: "How to tell which your engine uses, lifespan, replacement cost, interference vs non-interference, and lookup table for 30 common vehicles.", category: "Cost Guides" },
  { slug: "best-leveling-lift-kits", title: "Best Leveling Lift Kits for Trucks & SUVs (2026 Guide)", date: "April 20, 2026", description: "How to choose the right leveling kit, installation walkthrough, and our picks for trucks and SUVs.", category: "Upgrades" },
  { slug: "best-wheel-spacers", title: "Best Wheel Spacers: Hub-Centric vs Bolt-On (Buyer's Guide)", date: "April 20, 2026", description: "Wheel spacer sizing, safety, and installation — plus the forged hub-centric options we recommend.", category: "Upgrades" },
  { slug: "upper-control-arm-upgrade", title: "When to Upgrade Upper Control Arms After a Lift", date: "April 20, 2026", description: "Why factory control arms fail after a leveling lift and how forged aluminum upgrades fix it.", category: "Upgrades" },
  { slug: "ac-not-working-in-car", title: "Car AC Not Working? How to Diagnose and What Repairs Cost", date: "April 19, 2026", description: "Diagnose why your car AC is blowing warm, what's likely broken (compressor, refrigerant, condenser), and realistic repair costs by fault type.", category: "Repairs" },
  { slug: "best-motor-oil-for-your-car", title: "Best Motor Oil for Your Car: How to Choose (2026 Guide)", date: "April 19, 2026", description: "Conventional vs synthetic vs blend, viscosity ratings explained, how to pick the right oil for your vehicle and driving conditions.", category: "Maintenance" },
  { slug: "car-wont-start", title: "Car Won't Start? Here's What to Check Before Calling a Mechanic", date: "April 19, 2026", description: "Dead battery, starter, fuel pump, ignition — systematic diagnostic checklist to identify why your car won't start before paying for a tow.", category: "Repairs" },
  { slug: "check-engine-light-codes", title: "Top 10 Check Engine Light Codes and What They Mean", date: "April 19, 2026", description: "The 10 most common OBD-II codes, what each one means, typical repair cost, and whether it's urgent or can wait.", category: "Repairs" },
  { slug: "extended-warranty-worth-it", title: "Are Extended Car Warranties Worth It? An Honest Breakdown", date: "April 19, 2026", description: "When extended warranties make sense, when they're a scam, what dealers vs third parties really offer, and the math on typical payouts.", category: "Finding a Mechanic" },
  { slug: "questions-to-ask-mechanic", title: "15 Questions to Ask Your Mechanic Before Saying Yes to Repairs", date: "April 19, 2026", description: "The questions that separate honest mechanics from ones who pad the bill — ask these before authorizing any non-emergency repair.", category: "Finding a Mechanic" },
  { slug: "car-maintenance-schedule-by-mileage", title: "Car Maintenance Schedule by Mileage (2026 Guide)", date: "April 18, 2026", description: "What to do at 30K, 60K, 90K, and 120K miles — the full manufacturer-aligned maintenance schedule with typical costs.", category: "Maintenance" },
  { slug: "how-to-read-tire-wear-patterns", title: "How to Read Tire Wear Patterns: What Your Tires Are Telling You", date: "April 18, 2026", description: "Center wear, edge wear, cupping, feathering — what each tire wear pattern reveals about alignment, pressure, and suspension issues.", category: "Maintenance" },
  { slug: "transmission-repair-vs-replace", title: "Transmission Repair vs Replace: How to Decide (2026)", date: "April 18, 2026", description: "When to rebuild, when to replace, and when to walk away from the car. Decision framework based on vehicle value, repair cost, and your timeline.", category: "Cost Guides" },
  { slug: "can-i-replace-my-own-brake-pads", title: "Can I Replace My Own Brake Pads? Complete Guide", date: "April 15, 2026", description: "Honest assessment of DIY brake pad replacement — skill level required, tools needed, typical savings vs risk, and when to take it to a shop.", category: "DIY" },
  { slug: "diy-car-maintenance-tasks", title: "10 Car Maintenance Tasks You Can Do Yourself (and 5 You Can't)", date: "April 15, 2026", description: "Save money by handling these 10 easy car maintenance tasks at home — plus 5 repairs to always leave to a pro.", category: "DIY" },
  { slug: "diy-car-maintenance-checklist", title: "10 Car Maintenance Tasks You Can Do Yourself", date: "April 15, 2026", description: "A practical DIY checklist for the most valuable at-home car maintenance tasks — what they save, what they take, and the order to do them.", category: "DIY" },
  { slug: "should-i-change-my-own-oil", title: "Should I Change My Own Oil? DIY vs Mechanic Cost Breakdown", date: "April 15, 2026", description: "Real cost comparison of DIY vs shop oil changes, typical time required, disposal logistics, and when DIY stops making sense.", category: "DIY" },
  { slug: "when-to-see-a-mechanic", title: "Warning Signs You Need a Mechanic ASAP", date: "April 15, 2026", description: "Symptoms you should never drive home with. Warning lights, fluid leaks, noises, and driving behaviors that mean 'tow it, don't drive it.'", category: "Repairs" },
  { slug: "car-strange-noises", title: "Car Making Strange Noises? Here's What Each Sound Means", date: "April 15, 2026", description: "Squealing, grinding, clicking, knocking, or hissing? Decode your car's strange noises and learn which need immediate attention.", category: "Repairs" },
  { slug: "used-car-inspection", title: "Used Car Pre-Purchase Inspection: What to Check", date: "April 15, 2026", description: "Don't buy a used car without checking these critical items first. Complete pre-purchase inspection checklist.", category: "Finding a Mechanic" },
  { slug: "seasonal-maintenance-checklist", title: "Seasonal Car Maintenance Checklist: Spring, Summer, Fall, Winter", date: "April 15, 2026", description: "Keep your car running reliably year-round with this seasonal maintenance checklist for every season.", category: "Maintenance" },
  { slug: "how-much-does-a-brake-job-cost", title: "How Much Does a Brake Job Cost in 2026?", date: "April 10, 2026", description: "Pad-only vs pad + rotor, front vs rear, chain shop vs independent — typical 2026 pricing for brake work with cost-saving tips.", category: "Cost Guides" },
  { slug: "how-much-does-a-timing-belt-cost", title: "Timing Belt Replacement Cost Guide 2026", date: "April 10, 2026", description: "What you'll actually pay for a timing belt job — parts, labor, what's bundled (water pump, tensioner), and why costs vary 3x across vehicles.", category: "Cost Guides" },
  { slug: "how-much-does-a-transmission-repair-cost", title: "Transmission Repair Cost: What to Expect in 2026", date: "April 10, 2026", description: "Rebuilds $2,500-4,500, replacements $3,000-8,000, fluid service $150-300. Real 2026 transmission pricing by repair type and vehicle.", category: "Cost Guides" },
  { slug: "how-much-does-an-ac-recharge-cost", title: "Car AC Recharge and Repair Costs in 2026", date: "April 10, 2026", description: "Recharge $150-400, compressor replacement $800-1,500, full system $2,000+. AC repair pricing and what to ask before authorizing work.", category: "Cost Guides" },
  { slug: "how-much-does-an-oil-change-cost", title: "How Much Does an Oil Change Cost in 2026?", date: "April 10, 2026", description: "Conventional $30-60, synthetic blend $50-80, full synthetic $70-120 — typical 2026 oil change pricing by type, plus DIY cost comparison.", category: "Cost Guides" },
  { slug: "how-to-find-trustworthy-mechanic", title: "How to Find a Trustworthy Mechanic: 8 Things to Look For", date: "April 9, 2026", description: "What to look for when choosing a mechanic you can trust with your car.", category: "Finding a Mechanic" },
  { slug: "how-much-brake-job-cost", title: "How Much Should a Brake Job Cost in 2026?", date: "April 9, 2026", description: "A complete cost breakdown for brake pads, rotors, and full brake jobs.", category: "Cost Guides" },
  { slug: "chain-vs-independent-mechanic", title: "Chain vs Independent Mechanic: Which Is Better?", date: "April 9, 2026", description: "Pros and cons of Jiffy Lube, Midas, and Firestone vs your local shop.", category: "Finding a Mechanic" },
  { slug: "signs-car-needs-repair", title: "10 Signs Your Car Needs Immediate Repair", date: "April 9, 2026", description: "Warning signs that mean you should get to a mechanic ASAP.", category: "Repairs" },
  { slug: "car-maintenance-schedule", title: "The Complete Car Maintenance Schedule Every Owner Needs", date: "April 9, 2026", description: "Oil changes, brakes, tires, and more \u2014 when to service everything.", category: "Maintenance" },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
