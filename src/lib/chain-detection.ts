// Detects national/regional chain shops from name + brand fields. Before this,
// shops with brand=="" but a clearly-chain name (e.g. "Walmart Auto Care Center")
// were tagged "Independent Shop" — misleading.
//
// Returns either the chain name (matching brand format the rest of the app uses)
// or null if the shop appears to be independent.

export type ChainCategory = "quick_lube" | "tire" | "parts" | "transmission" | "body" | "dealer" | "general";

const CHAIN_PATTERNS: Array<{ match: RegExp; brand: string; category: ChainCategory }> = [
  // Quick lube
  { match: /\bjiffy\s*lube\b/i, brand: "Jiffy Lube", category: "quick_lube" },
  { match: /\bvalvoline\b/i, brand: "Valvoline", category: "quick_lube" },
  { match: /\bspeedee\b|\bspeed-?ee\b/i, brand: "SpeeDee", category: "quick_lube" },
  { match: /\bgrease\s*monkey\b/i, brand: "Grease Monkey", category: "quick_lube" },
  { match: /\bexpress\s*oil\b/i, brand: "Express Oil Change", category: "quick_lube" },
  { match: /\btake\s*5\s*oil\b/i, brand: "Take 5", category: "quick_lube" },

  // Tire chains
  { match: /\bfirestone\b/i, brand: "Firestone", category: "tire" },
  { match: /\bgoodyear\b/i, brand: "Goodyear", category: "tire" },
  { match: /\bmichelin\b/i, brand: "Michelin", category: "tire" },
  { match: /\bbridgestone\b/i, brand: "Bridgestone", category: "tire" },
  { match: /\bdiscount\s*tire\b/i, brand: "Discount Tire", category: "tire" },
  { match: /\bbig\s*o\s*tires?\b/i, brand: "Big O Tires", category: "tire" },
  { match: /\btire\s*kingdom\b/i, brand: "Tire Kingdom", category: "tire" },
  { match: /\btires\s*plus\b/i, brand: "Tires Plus", category: "tire" },
  { match: /\bmavis\s*(tire|discount)/i, brand: "Mavis", category: "tire" },
  { match: /\bntb\b|national\s*tire\s*(and\s*battery|&\s*battery)/i, brand: "NTB", category: "tire" },
  { match: /\bamerican\s*tire\s*depot\b/i, brand: "American Tire Depot", category: "tire" },
  { match: /\bles\s*schwab\b/i, brand: "Les Schwab", category: "tire" },

  // General repair chains
  { match: /\bmidas\b/i, brand: "Midas", category: "general" },
  { match: /\bmeineke\b/i, brand: "Meineke", category: "general" },
  { match: /\bmonro\s*(muffler|auto)?\b/i, brand: "Monro", category: "general" },
  { match: /\bpep\s*boys\b/i, brand: "Pep Boys", category: "general" },
  { match: /\bchristian\s*brothers\b/i, brand: "Christian Brothers", category: "general" },
  { match: /\bcaliber\s*auto\s*care\b/i, brand: "Caliber Auto Care", category: "general" },

  // Transmission
  { match: /\baamco\b/i, brand: "AAMCO", category: "transmission" },
  { match: /\bmr\.?\s*transmission\b/i, brand: "Mr. Transmission", category: "transmission" },
  { match: /\bcottman\s*transmission\b/i, brand: "Cottman", category: "transmission" },

  // Body / collision
  { match: /\bmaaco\b/i, brand: "Maaco", category: "body" },
  { match: /\bcaliber\s*collision\b/i, brand: "Caliber Collision", category: "body" },
  { match: /\bservice\s*king\b/i, brand: "Service King", category: "body" },
  { match: /\bgerber\s*collision\b/i, brand: "Gerber Collision", category: "body" },
  { match: /\bcrash\s*champions\b/i, brand: "Crash Champions", category: "body" },

  // Parts stores that do repairs
  { match: /\bautozone\b/i, brand: "AutoZone", category: "parts" },
  { match: /\bo'?\s*reilly\b/i, brand: "O'Reilly Auto Parts", category: "parts" },
  { match: /\bnapa(\s*auto)?\b/i, brand: "NAPA", category: "parts" },
  { match: /\badvance\s*auto\s*parts\b/i, brand: "Advance Auto Parts", category: "parts" },

  // Big-box retail
  { match: /\bwalmart\b/i, brand: "Walmart Auto Care", category: "general" },
  { match: /\bcostco\s*(tire|auto)\b/i, brand: "Costco Tire Center", category: "tire" },
  { match: /\bsam'?s\s*club\s*tire\b/i, brand: "Sam's Club", category: "tire" },
];

export function detectChain(shop: { name?: string; brand?: string }): string | null {
  if (shop.brand && shop.brand.trim().length > 0) return shop.brand.trim();
  const name = (shop.name || "").trim();
  if (!name) return null;
  for (const p of CHAIN_PATTERNS) {
    if (p.match.test(name)) return p.brand;
  }
  return null;
}

export function isChainShop(shop: { name?: string; brand?: string }): boolean {
  return detectChain(shop) !== null;
}
