// CJ Pony Parts — CJ Affiliate ID 6969901, 3% commission. Specialty in
// Mustang, Bronco, classic Ford, and classic Chevy truck restoration parts.

import type { AffiliatePartner } from "./types";

export type CJPonyPartsLinkKey =
  | "evergreen"
  | "general"
  | "sales"
  | "mustang"
  | "bronco"
  | "fastbackKit"
  | "fordParts"
  | "chevyTruck";

interface CJPonyPartsConfig extends AffiliatePartner {
  links: Record<CJPonyPartsLinkKey, string>;
}

export const CJ_PONY_PARTS: CJPonyPartsConfig = {
  id: "cjponyparts",
  name: "CJ Pony Parts",
  shortDescription: "Mustang, Bronco, classic Ford, and classic Chevy truck restoration parts.",
  longDescription:
    "CJ Pony Parts has built one of the deepest reproduction-parts catalogs in the industry, specializing in Mustang restorations (every era from 1965 to current), Bronco builds (classic and modern), classic Ford parts, and classic Chevy truck components.",

  links: {
    evergreen: "https://www.tkqlhce.com/click-101726471-17007122",
    general: "https://www.dpbolvw.net/click-101726471-16944687",
    sales: "https://www.dpbolvw.net/click-101726471-17007194",
    mustang: "https://www.tkqlhce.com/click-101726471-17007195",
    bronco: "https://www.tkqlhce.com/click-101726471-17206669",
    fastbackKit: "https://www.tkqlhce.com/click-101726471-17033732",
    fordParts: "https://www.anrdoezrs.net/click-101726471-17007196",
    chevyTruck: "https://www.anrdoezrs.net/click-101726471-17007197",
  },
};
