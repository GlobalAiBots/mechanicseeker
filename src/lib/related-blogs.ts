// Contextual "Related Guide" widget data for /shops/[id] pages.
// One short excerpt per slug (~50 words) — keeps per-page content low-repetition
// so we don't create duplicate-content clusters at 44K-shop scale.

type BlogTease = { slug: string; title: string; excerpt: string };

const BLOGS: Record<string, BlogTease> = {
  "how-to-read-tire-wear-patterns": {
    slug: "how-to-read-tire-wear-patterns",
    title: "How to Read Tire Wear Patterns",
    excerpt: "Uneven tire wear tells you what's wrong with the car. Center-worn means overinflated; edge-worn means underinflated; feathered tread means alignment. Read the tire before you buy a new set.",
  },
  "how-much-does-an-oil-change-cost": {
    slug: "how-much-does-an-oil-change-cost",
    title: "How Much Does an Oil Change Cost?",
    excerpt: "Conventional oil changes run $30-$50; full synthetic $65-$125. Walmart and Costco are cheapest; dealer is most expensive for the same service. Here's what actually justifies the premium.",
  },
  "used-car-inspection": {
    slug: "used-car-inspection",
    title: "Pre-Purchase Used Car Inspection Checklist",
    excerpt: "What to check before buying a used car — and what to have a body shop look at after a collision or flood event. Paint-meter readings, frame alignment, and the panel-gap signs that reveal prior damage.",
  },
  "how-much-does-a-brake-job-cost": {
    slug: "how-much-does-a-brake-job-cost",
    title: "How Much Does a Brake Job Cost?",
    excerpt: "Brake pads run $150-$300 per axle installed. Rotors push it to $300-$500. DIY drops parts-only to $40-$100. When to replace just pads vs pads + rotors, and how to avoid the \"needs new calipers\" upsell.",
  },
  "transmission-repair-vs-replace": {
    slug: "transmission-repair-vs-replace",
    title: "Transmission Repair vs Replace: Which Is Cheaper?",
    excerpt: "Transmission rebuilds run $1,800-$3,500; full replacement is $3,000-$6,000+. When to fix, when to swap with a used unit, and when the car isn't worth repairing at all.",
  },
  "car-battery-replacement-cost": {
    slug: "car-battery-replacement-cost",
    title: "Car Battery Replacement Cost",
    excerpt: "A new battery runs $100-$400 installed depending on your car. Costco and Walmart are cheapest; dealers charge 2x for the same physical battery. How to pick the right CCA and group size.",
  },
  "chain-vs-independent-mechanic": {
    slug: "chain-vs-independent-mechanic",
    title: "Chain vs Independent Mechanic",
    excerpt: "Chain shops are consistent but push upsells. Independents are cheaper and more flexible but quality varies. Here's which to use when — and the questions that separate a good indie from a bad one.",
  },
  "how-to-find-trustworthy-mechanic": {
    slug: "how-to-find-trustworthy-mechanic",
    title: "How to Find a Trustworthy Mechanic",
    excerpt: "The 8 signals that separate a good shop from a bad one: ASE certification, written estimates, willingness to show you the worn part, clear pricing. Ignore reviews alone — they can be gamed.",
  },
  "check-engine-light-codes": {
    slug: "check-engine-light-codes",
    title: "Check Engine Light: What Each Code Means",
    excerpt: "The top 10 check-engine codes that land cars in a shop: O2 sensor, misfire, evap leak, catalytic converter. Which codes you can safely drive with — and which mean pull over now.",
  },
  "diy-car-maintenance-checklist": {
    slug: "diy-car-maintenance-checklist",
    title: "DIY Car Maintenance Checklist",
    excerpt: "10 jobs you can safely do yourself (oil, wipers, cabin filter, battery terminals) and 5 you absolutely shouldn't (timing belt, transmission, A/C refrigerant). Save $300-$500 a year.",
  },
  "when-to-see-a-mechanic": {
    slug: "when-to-see-a-mechanic",
    title: "When to See a Mechanic",
    excerpt: "Warning signs you can't ignore: grinding brakes, rising temperature gauge, pink/green fluid under the car, new vibrations at highway speed. The issues that compound if you wait.",
  },
  "car-maintenance-schedule": {
    slug: "car-maintenance-schedule",
    title: "Car Maintenance Schedule",
    excerpt: "What to service every 5K, 15K, 30K, 60K, and 100K miles. The timeline most cars actually need (not the glove-box schedule that assumes perfect conditions).",
  },
};

type ShopShape = {
  name?: string;
  city?: string;
  services?: string[];
  shopType?: string;
  brand?: string;
};

const CHAIN_BRANDS = new Set(["Jiffy Lube", "Midas", "Valvoline", "Firestone", "Goodyear", "Pep Boys", "Mavis", "Tires Plus", "Monro"]);

export function getRelatedBlog(shop: ShopShape): BlogTease {
  const name = (shop.name || "").toLowerCase();
  const services = (shop.services || []).join(" ").toLowerCase();
  const type = shop.shopType || "";

  if (type === "tire_shop" || name.includes("tire") || name.includes("wheel"))
    return BLOGS["how-to-read-tire-wear-patterns"];
  if (type === "quick_lube" || services.includes("oil_change") || services.includes("oil change"))
    return BLOGS["how-much-does-an-oil-change-cost"];
  if (type === "body_shop" || name.includes("collision") || name.includes("body shop"))
    return BLOGS["used-car-inspection"];
  if (services.includes("brake") || name.includes("brake"))
    return BLOGS["how-much-does-a-brake-job-cost"];
  if (type === "transmission_shop" || services.includes("transmission"))
    return BLOGS["transmission-repair-vs-replace"];
  if (services.includes("battery") || services.includes("electrical"))
    return BLOGS["car-battery-replacement-cost"];
  if (shop.brand && CHAIN_BRANDS.has(shop.brand))
    return BLOGS["chain-vs-independent-mechanic"];

  // Rotate by city hash so different cities see different posts.
  const fallbackOrder: string[] = [
    "how-to-find-trustworthy-mechanic",
    "check-engine-light-codes",
    "diy-car-maintenance-checklist",
    "when-to-see-a-mechanic",
    "car-maintenance-schedule",
  ];
  const hash = (shop.city || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return BLOGS[fallbackOrder[hash % fallbackOrder.length]];
}
