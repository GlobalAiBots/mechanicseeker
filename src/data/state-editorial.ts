export interface H2Block {
  heading: string;
  body: string;
}

export interface StateEditorial {
  // Brief intro paragraph that REPLACES the generic intro (~60-90 words)
  introOverride?: string;
  // 3 H2 sections inserted between cities sub-grid and shop list
  h2Blocks: H2Block[];
  // Optional additional FAQs appended to the existing FAQPage; the
  // already-present generic FAQs are kept.
  faqExtra?: { q: string; a: string }[];
}

export const STATE_EDITORIAL: Record<string, StateEditorial> = {
  california: {
    introOverride:
      "California has 4,335 auto repair shops spanning the country's largest car-owning population, the toughest emissions program in the nation, and a regulatory environment that shapes how every shop in the state operates. Whether you need a Smog Check before registration renewal, a Tesla-certified body shop in the Bay Area, or a transmission specialist in the Central Valley, the directory below shows shops with verified addresses, ratings, and service categories.",
    h2Blocks: [
      {
        heading: "California's Auto Repair Landscape",
        body:
          "California has the most regulated auto repair market in the country. The Bureau of Automotive Repair (BAR) licenses every shop, requires written estimates before any repair, mandates return of replaced parts on request, and runs the Smog Check program that gates registration on virtually every gasoline vehicle 1976 and newer. The shop ecosystem reflects that complexity: dealerships dominate the warranty and EV-specific service markets (Tesla Service Centers, Rivian Service, Lucid Studios cluster in metro LA, Bay Area, and San Diego), while independents thrive in specialty corners — European specialists in Beverly Hills and Marin, Japanese domestic specialists across the Bay Area, lifted-truck and off-road builders in the Inland Empire and Sacramento Valley. Chain service centers (Big O, Firestone, Pep Boys, Jiffy Lube) cover the everyday-maintenance market with predictable pricing. The state's used-car market is unusually dependent on independent shops because California's emissions rules mean older vehicles often need specialist diagnostic work that dealerships won't touch."
      },
      {
        heading: "Smog Check, Lemon Law, and What Makes California Different",
        body:
          "Three California-specific regulations affect almost every shop interaction in the state. Smog Check is required biennially for most vehicles 1976 model year and newer; only BAR-licensed Smog stations can perform the test, and STAR stations handle the highest-risk vehicles flagged by DMV. Failed Smogs can be expensive to clear — repairs at a STAR station may qualify for the Consumer Assistance Program (financial help up to $1,200 for income-eligible owners). California's Song-Beverly Consumer Warranty Act is one of the strongest lemon laws in the country, covering new vehicles for 18 months or 18,000 miles with a manufacturer's repurchase or replacement obligation if the vehicle has substantial defects unable to be fixed after a reasonable number of attempts. Diagnostic fees in California typically run $100-180 (above the national average); shops are required by BAR to provide a written estimate before doing diagnostic work and may not exceed it by more than 10% without explicit re-authorization. These rules apply at every California shop — independent, chain, or dealership."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "California's geography creates distinct regional service markets. Coastal Bay Area and LA: highest labor rates ($150-220/hr at dealerships, $100-150 at independents), heavy EV penetration, strong specialist scenes for European and Japanese imports. Central Valley (Fresno, Bakersfield, Modesto): heavy agricultural truck and diesel work, lower labor rates ($85-125/hr), strong independent and chain coverage. Inland Empire (Riverside, San Bernardino): lifted-truck and off-road build culture, robust used-car repair market, dealership clusters along the I-15 corridor. North State (Redding, Chico, Eureka): rural service patterns, longer drive distances, dealerships scarce north of Sacramento. Sierra and high-desert regions: 4WD and snow-readiness work seasonally important, fewer specialty shops. San Diego County: major military presence drives high turnover in the used-car market and steady diagnostic and pre-purchase inspection demand. The shop directory above includes coverage across all these zones."
      }
    ],
    faqExtra: [
      {
        q: "How much should a Smog Check cost in California?",
        a: "Standard Smog Checks typically cost $40-65; STAR stations may charge slightly more for the additional rigor. The BAR caps the certificate fee at $8.25 separately. If your vehicle fails, the diagnostic and repair work is billed separately at the shop's hourly rate. Some California counties subsidize repairs for low-income owners through the Consumer Assistance Program."
      },
      {
        q: "What's the difference between a Smog station and a STAR station?",
        a: "All Smog stations are BAR-licensed to test vehicles. STAR stations meet additional performance standards and are required for vehicles directed by DMV (typically older or higher-emissions vehicles flagged by the registration system). STAR stations also do most CAP repair work. Look for the BAR logo and STAR designation on the storefront, or search the BAR's online directory."
      },
      {
        q: "Does my California auto repair shop have to give me my old parts back?",
        a: "Yes, by law — the BAR requires shops to offer to return replaced parts unless they're warranty exchanges (in which case the part has to go back to the manufacturer) or core charges (where the part is exchanged for a refund). You have to request the parts before authorization is given on the work order."
      }
    ]
  }
};

export function getStateEditorial(stateSlug: string): StateEditorial | null {
  return STATE_EDITORIAL[stateSlug] || null;
}
