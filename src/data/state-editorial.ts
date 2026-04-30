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
  },
  texas: {
    introOverride:
      "Texas has 4,131 auto repair shops spanning the country's second-largest car-owning population, the longest commute distances of any state, and a dealership network that doubles as a service network for trucks, tow rigs, and fleet vehicles. Whether you need a diesel mechanic in Houston, an off-road builder in the Hill Country, transmission work in Dallas-Fort Worth, or hail repair after a Panhandle storm, the directory below shows shops with verified addresses, ratings, and service categories.",
    h2Blocks: [
      {
        heading: "Texas's Auto Repair Landscape",
        body:
          "Texas runs the most truck-heavy repair market in the country. Pickup trucks and SUVs make up over 70% of vehicle registrations, and the shop ecosystem reflects that: heavy-duty diesel specialists in every metro (Houston, Dallas, San Antonio, Austin), lift-kit and off-road builders concentrated along the I-35 corridor and Hill Country, and dealership service networks that handle a disproportionate share of warranty and recall work because Texans drive their trucks long enough to need it. Independent shops dominate the post-warranty market — Texas has more independent repair shops per capita than most states, supported by a regulatory environment that's notably hands-off compared to California or New York. Chain service centers (NTB, Discount Tire, Firestone, Christian Brothers) cover the everyday-maintenance market with predictable pricing, especially in suburban Dallas-Fort Worth and Houston metro. Texas also has a robust salvage and rebuilt-title market, with body shops and frame specialists clustered near major insurance claim hubs."
      },
      {
        heading: "Texas Vehicle Inspection, Hail Damage, and Heat",
        body:
          "Three Texas-specific factors drive the repair market. Annual safety inspection was eliminated for non-commercial vehicles in 2025; emissions inspection is still required in 17 high-population counties (Dallas-Fort Worth metro, Houston metro, Austin metro, El Paso, parts of the Beaumont area). The change cut routine inspection-related work but didn't reduce the diagnostic and repair work emissions failures generate. Hail damage is the largest single insurance line in Texas — multi-storm seasons (March through July) generate tens of thousands of body-shop claims and the state hosts the country's most concentrated paintless dent repair (PDR) industry. Summer heat punishes cooling systems, batteries, and tire compounds: Texas shops see seasonal spikes in radiator, battery, and AC compressor work from late May through September. Battery replacement frequency in Texas runs roughly 30% higher than the national average."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Texas's geography creates four distinct service markets. Houston metro: largest commercial-fleet and oil-and-gas-field service market in the state, heavy diesel demand, dealership clusters along the I-45 and 290 corridors, hurricane-related flood damage shaping seasonal repair patterns. Dallas-Fort Worth metro: highest dealership density in the state, strong chain coverage, robust hail repair industry, lift-kit and off-road shops along the LBJ Freeway and I-35E. San Antonio and Austin: tech-driven import service market in Austin (heavy European specialist presence), military-driven service market in San Antonio (Joint Base San Antonio drives steady fleet and pre-deployment work). West Texas, Hill Country, and the Valley: longer drive distances between shops, heavy diesel and truck work, more independents and fewer dealerships, agricultural-vehicle service in the Valley and Panhandle. Coastal Bend (Corpus Christi, Galveston): salt-air corrosion shapes repair patterns, hurricane-flood claim cycles drive surge demand. The shop directory above includes coverage across all these zones."
      }
    ],
    faqExtra: [
      {
        q: "Does Texas still require annual vehicle inspection?",
        a: "As of January 1, 2025, Texas no longer requires annual safety inspection for non-commercial vehicles. Emissions inspection is still required in 17 counties — Dallas-Fort Worth metro, Houston metro, Austin metro, El Paso, and parts of the Beaumont/Port Arthur area. Commercial vehicles still require annual safety inspection statewide. Confirm your county's current rules through the Texas Department of Public Safety or your county tax office."
      },
      {
        q: "What's the typical labor rate at a Texas auto repair shop?",
        a: "Independent shop labor rates in Texas typically run $85-150 per hour depending on metro and specialty. Dealerships run $130-200 per hour, with luxury and import dealerships at the high end. Houston, Dallas, and Austin run roughly 10-15% above San Antonio and rural rates. Diesel and heavy-duty truck shops charge premium rates ($120-200/hr) for the specialized tooling required."
      },
      {
        q: "How does hail damage affect Texas auto repair timing?",
        a: "Major hail events generate thousands of insurance claims simultaneously, creating multi-week backlogs at body shops and PDR specialists. After a significant storm, expect 3-8 week waits for body work. Mobile PDR services often have shorter waits than fixed shops. File the insurance claim immediately, get multiple estimates, and verify the shop's certifications before authorizing work."
      }
    ]
  },
  pennsylvania: {
    introOverride:
      "Pennsylvania has 2,405 auto repair shops spanning Philadelphia's row-house street parking, the rust-belt manufacturing corridor through Pittsburgh and Erie, the rural cross-state interstate network, and the country's most rigorous combined safety-and-emissions inspection program. Whether you need rust repair on a 10-year-old commuter car, an inspection-and-emissions station in any of 25 affected counties, a Subaru specialist in the snow belt, or a diesel mechanic for a Pennsylvania Dutch farm truck, the directory below shows shops with verified addresses, ratings, and service categories.",
    h2Blocks: [
      {
        heading: "Pennsylvania's Auto Repair Landscape",
        body:
          "Pennsylvania has the second-most-rigorous vehicle inspection program in the country (after New York), and that single fact shapes the entire repair ecosystem. Annual safety inspection is required statewide, and emissions inspection is required in 25 counties (the Philadelphia and Pittsburgh metro areas plus parts of the Lehigh Valley and Lancaster County). The result: every shop with the inspection license becomes a recurring touchpoint for every car in its area, and shops without the license focus on specialty work the inspection stations don't handle. Pennsylvania's vehicle fleet skews older than the national average — the average car on Pennsylvania roads is over 12 years old — which drives heavy demand for rust repair, brake-line replacement, exhaust work, and suspension overhauls. Independent shops dominate the post-warranty market, with strong dealership presence in Philadelphia and Pittsburgh metros and along the I-80 and I-76 corridors. Chain inspection-and-tire stations (Mavis, Monro, Pep Boys, Jiffy Lube) cover the routine-maintenance market in suburban PA."
      },
      {
        heading: "Pennsylvania Inspection, Lemon Law, and Rust",
        body:
          "Three Pennsylvania-specific factors drive the repair market. Annual safety inspection includes rigorous brake, suspension, lighting, frame, and emissions component checks — Pennsylvania rejects vehicles for issues that pass inspection in most other states, particularly frame rust and brake-line corrosion. Emissions inspection in the 25 affected counties uses OBD-II testing for 1996-and-newer vehicles. Failed inspections drive significant repair work, especially in the rust belt. Pennsylvania's lemon law covers new vehicles for 12 months or 12,000 miles with a manufacturer's repurchase or replacement obligation if the vehicle has substantial defects unable to be fixed in three or more attempts. Road salt is the dominant climate factor: Pennsylvania, especially the northern tier and Pittsburgh region, salts roads heavily November through March, which destroys frames, brake lines, exhaust systems, and quarter panels on a predictable cycle. Pennsylvania shops are among the most rust-experienced in the country."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Pennsylvania's geography creates four distinct service markets. Philadelphia and southeast PA: highest labor rates ($110-180 at independents, $140-220 at dealerships), urban parking damage drives heavy bumper and body work, robust import and luxury specialist scene in the Main Line and King of Prussia. Pittsburgh and southwest PA: rust-belt fleet repair specialty, strong dealership presence along Route 19 and the I-376 corridor, heavy diesel and pickup truck work in the surrounding industrial counties. Northeast PA (Scranton, Wilkes-Barre, Stroudsburg): cross-state commuter market into NY and NJ, snow-belt seasonal patterns, AWD specialist demand. Central and northern PA (State College, Williamsport, Erie): rural service patterns with longer drive distances, agricultural and forestry vehicle demand, lake-effect snow shaping winter work patterns. The shop directory above includes coverage across all four zones."
      }
    ],
    faqExtra: [
      {
        q: "What does Pennsylvania safety inspection actually check?",
        a: "Pennsylvania annual safety inspection is one of the most rigorous in the country. Inspectors check brakes (including brake lines, calipers, and rotor thickness), suspension and steering components, lighting and electrical, exhaust system integrity, tire condition and depth, frame and structural rust, and seatbelts. Vehicles can fail for issues that pass inspection in most other states. The inspection sticker must be displayed and current."
      },
      {
        q: "Which Pennsylvania counties require emissions inspection?",
        a: "Emissions inspection is required in 25 PA counties: Philadelphia, Bucks, Chester, Delaware, Montgomery, Allegheny, Beaver, Washington, Westmoreland, Berks, Lancaster, Lehigh, Northampton, Cambria, Blair, Centre, Cumberland, Dauphin, Lebanon, Luzerne, Lycoming, Mercer, Erie, York, and parts of Adams. Vehicles 1996 model year and newer get OBD-II testing. The list is set by PennDOT and updated as air-quality data changes."
      },
      {
        q: "How does Pennsylvania handle rust damage during inspection?",
        a: "Pennsylvania inspection rejects vehicles for structural rust on the frame, body mounts, sub-frame, or rocker panels — anywhere that affects vehicle integrity. Surface rust on body panels alone doesn't fail inspection. Rusted brake lines and rusted-through exhaust components are common rejection reasons. Many PA shops specialize in rust repair specifically because of how often inspections require it."
      }
    ]
  },
  washington: {
    introOverride:
      "Washington has 2,197 auto repair shops spanning Seattle's tech-corridor commute, the cross-Cascade weather divide, the Pacific Northwest's highest EV adoption rate per capita, and a regulatory environment shaped by some of the country's most stringent emissions standards. Whether you need a Subaru specialist on the rainy west side, a diesel mechanic for an east-side ranch truck, a Tesla service center in Bellevue, or a 4WD shop for Cascade ski commuter rigs, the directory below shows shops with verified addresses, ratings, and service categories.",
    h2Blocks: [
      {
        heading: "Washington's Auto Repair Landscape",
        body:
          "Washington runs one of the most EV-skewed and weather-divided repair markets in the country. Tesla, Rivian, Lucid, and traditional brands' EV lines collectively make up over 25% of new vehicle sales statewide — the highest rate of any state outside California — and the service ecosystem reflects that with Tesla Service Centers in Bellevue, Seattle, Tukwila, and Spokane, plus growing dealership EV-service capacity along the I-5 and I-405 corridors. Subaru is the unofficial state vehicle: AWD demand from rain, mountain passes, and outdoor culture drives Subaru specialist density that's higher per capita than almost anywhere in the country, with shops clustered in Seattle, Bellevue, Tacoma, and the Cascade foothills. Independent shops dominate the post-warranty market, especially in West Seattle, Capitol Hill, Ballard, and the Eastside — these neighborhoods support specialty European, Japanese, and EV-focused independents in unusual concentration. East of the Cascades, the market shifts: heavy-duty diesel and pickup truck work in the Tri-Cities and Spokane Valley, agricultural-vehicle service throughout the Yakima and Walla Walla regions, and longer drive distances between shops in the rural counties."
      },
      {
        heading: "Emissions Tests, Lemon Law, and Cascade Weather",
        body:
          "Three Washington-specific factors drive the repair market. Washington discontinued its statewide emissions testing program at the end of 2019, but the state still runs the country's most aggressive Clean Vehicle policy — the Advanced Clean Cars II rule requires that 100% of new passenger vehicles sold in Washington be zero-emission by 2035, which has shifted dealership investment heavily toward EV service infrastructure. Washington's Lemon Law (RCW 19.118) covers new vehicles for two years or 24,000 miles with a manufacturer's repurchase or replacement obligation if the vehicle has substantial defects unable to be fixed after a reasonable number of attempts — broader than most states' lemon laws. Cascade weather is the dominant climate factor: heavy rain accelerates rust on brake rotors, suspension components, and exhaust systems on the west side, while east-side temperature swings and winter sanding (rather than salting) on mountain passes drive different wear patterns. Studded tires are legal November through March; many shops handle tire-changeover seasonally."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Washington's geography creates four distinct service markets divided by the Cascades. Seattle and Eastside (King and Snohomish counties): highest labor rates ($130-200 at independents, $160-230 at dealerships), heaviest EV penetration, strong specialist scenes for Subaru, Tesla, and European imports. Tacoma, Pierce County, and South Sound: military presence at Joint Base Lewis-McChord drives steady fleet, pre-deployment, and used-truck repair demand; lower labor rates than Seattle metro. Spokane and east-side metros: cross-state commercial market into Idaho and Montana, heavy diesel and pickup work, less EV penetration, more chain-shop coverage. Rural eastern Washington and the Olympic Peninsula: longer drive distances, agricultural and forestry vehicle work, fewer dealerships, more independents handling broader service ranges. The shop directory above includes coverage across all four zones."
      }
    ],
    faqExtra: [
      {
        q: "Does Washington still require emissions testing?",
        a: "No. Washington discontinued its statewide emissions testing program at the end of 2019. Vehicles registered in Washington no longer need an emissions test for registration. However, vehicles imported from other states with active emissions programs may still need to clear those states' programs before transferring registration. Washington's Clean Vehicle policy still influences which vehicles qualify for state EV rebates and HOV lane access."
      },
      {
        q: "What's the typical labor rate at a Washington auto repair shop?",
        a: "Independent shop labor rates in Washington typically run $110-180 per hour in Seattle metro, $90-140 in Spokane and east-side metros, $90-130 in smaller cities. Dealerships run $150-230 per hour, with luxury and EV-focused dealerships at the top of that range. Subaru specialists in Seattle metro often charge $130-180 per hour given specialized AWD diagnostic tooling."
      },
      {
        q: "How does Washington's Lemon Law work?",
        a: "Washington's Lemon Law (RCW 19.118) covers new vehicles for two years or 24,000 miles. If a substantial defect can't be repaired after a reasonable number of attempts (typically four or more for the same defect, or the vehicle is out of service for 30+ days cumulative), the manufacturer must repurchase or replace the vehicle. The law is administered through the Washington Attorney General's office; arbitration is the standard first step before a lawsuit."
      }
    ]
  },
  arizona: {
    introOverride:
      "Arizona has 1,934 auto repair shops spanning the Phoenix and Tucson metros, the country's largest snowbird population, and a desert climate that punishes batteries, cooling systems, tires, and paint at rates higher than any other state. Whether you need a battery and AC specialist in July, a lifted-truck builder in Mesa or Prescott, an RV mechanic for a winter-Texan rig, or a hail-damage body shop after a monsoon storm, the directory below shows shops with verified addresses, ratings, and service categories.",
    h2Blocks: [
      {
        heading: "Arizona's Auto Repair Landscape",
        body:
          "Arizona has the most heat-driven and seasonal-fleet repair market in the country. Phoenix metro (Maricopa County) holds 60% of the state's vehicle registrations, with Tucson and the surrounding Pima County market a distant second. The shop ecosystem reflects two distinct customer bases: year-round Arizonans driving heat-aged commuter cars and trucks, and the seasonal snowbird population (estimated 300,000+ winter residents) bringing RVs, towed-behind vehicles, and second cars from cold-weather states. Independent shops dominate the post-warranty market in both metros, with strong dealership presence along the Loop 101, US-60, and I-10 corridors. Lifted truck and off-road builders cluster in Mesa, Gilbert, and the Prescott area — Arizona's off-road culture is among the strongest in the West. RV service is a major industry: Quartzsite, Yuma, and the I-10 corridor host RV-specialist shops that work on Class A motorhomes, fifth-wheels, and travel trailers at scale, especially November through March. Salvage and rebuilt-title work concentrates near major auction hubs (Copart, IAA) in Phoenix metro."
      },
      {
        heading: "Heat, Monsoons, and Emissions Inspection",
        body:
          "Three Arizona-specific factors drive the repair market. Desert heat shortens battery life dramatically — typical battery replacement frequency in Phoenix runs every 2-3 years vs. the 4-5 year national average, and cooling system, AC compressor, hose, belt, and tire compound failures all spike from May through September. Most Phoenix shops keep extended hours during summer months specifically to handle the seasonal surge. Monsoon storms (July through September) bring sudden hail, flooding, and dust storms that drive insurance claim spikes for body work, water-damage diagnostics, and air-intake replacements. Emissions inspection is required in Maricopa and Pima counties for vehicles 1967 model year and newer (with some exemptions for newer vehicles). The test is required at registration renewal — every two years for newer vehicles, annually for older ones — and failed tests drive significant diagnostic and repair work. Outside Maricopa and Pima counties, no emissions testing is required, which keeps rural Arizona's repair market focused on mechanical rather than emissions work."
      },
      {
        heading: "Regional Patterns Across the State",
        body:
          "Arizona's geography creates three distinct service markets. Phoenix metro (Maricopa County): largest market, highest labor rates ($110-170 at independents, $140-210 at dealerships), heavy seasonal fleet from snowbirds, robust dealership and chain coverage along all major freeway corridors. Tucson and Pima County: second-largest market, slightly lower labor rates ($90-150 at independents), University of Arizona presence drives a strong used-import service market and a robust independent shop scene around Speedway and Broadway. Northern Arizona and rim country (Flagstaff, Prescott, Sedona): mountain elevation creates cold-weather wear patterns unlike the rest of the state, fewer dealerships, more 4WD specialists for the surrounding Coconino and Yavapai county terrain, ski-season demand spike December through March. Yuma and the Colorado River corridor: highest concentration of RV-specialist shops, large seasonal snowbird flux, agricultural vehicle work in the surrounding Yuma County. The shop directory above includes coverage across all three zones."
      }
    ],
    faqExtra: [
      {
        q: "How often do Arizona car batteries need replacement?",
        a: "In Phoenix metro, expect to replace your battery every 2-3 years — desert heat dramatically shortens battery life. Tucson runs slightly better at 3-4 years. Northern Arizona (Flagstaff, Prescott) sees more typical 4-5 year battery life. Most Arizona shops carry heat-rated AGM batteries specifically for the Phoenix market. Have batteries load-tested annually starting at year two if you're in the Valley."
      },
      {
        q: "Where in Arizona is emissions inspection required?",
        a: "Arizona requires emissions inspection only in Maricopa County (Phoenix metro) and Pima County (Tucson area). Vehicles 1967 model year and newer must pass emissions testing at registration renewal — every two years for newer vehicles, annually for older ones. Some newer vehicles (typically those under five model years old) are exempt. Outside these two counties, no emissions inspection is required."
      },
      {
        q: "When is monsoon season and how does it affect auto repair in Arizona?",
        a: "Monsoon season runs roughly June 15 through September 30, peaking in July and August. Major monsoon storms generate hail damage, flash-flood water damage, and dust-storm air-intake clogging. After significant storms, body shops in Phoenix and Tucson often have 2-4 week backlogs. Wash undercarriage thoroughly after dust-storm exposure to prevent corrosion in the limited rainfall that follows."
      }
    ]
  }
};

export function getStateEditorial(stateSlug: string): StateEditorial | null {
  return STATE_EDITORIAL[stateSlug] || null;
}
