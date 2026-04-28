// KSP Performance — partner-agnostic shape. Mirrors src/lib/ksp-affiliate.ts
// (kept for backward compat with existing imports) but exposes the partner
// object shape used by AffiliateInlineLink / AffiliateCallout / AffiliateBanner.
//
// Promo code: KSPAF (5% off sitewide).

import type { AffiliatePartner } from "./types";

export type KSPLinkKey =
  | "levelingKits"
  | "wheelSpacers"
  | "controlArms"
  | "aluminumControlArms"
  | "spikeLugNuts"
  | "couponSitewide"
  | "evergreen";

export type KSPBannerKey = "square250" | "medRect320x250" | "mobileLeaderboard320x50";

interface KSPConfig extends AffiliatePartner {
  links: Record<KSPLinkKey, string>;
  banners: Record<KSPBannerKey, { url: string; w: number; h: number; click: string }>;
  couponCode: string;
}

export const KSP: KSPConfig = {
  id: "ksp",
  name: "KSP Performance",
  shortDescription: "Truck and SUV upgrade parts: leveling kits, wheel spacers, control arms.",
  longDescription:
    "KSP Performance manufactures forged aluminum upgrade components for trucks and SUVs — leveling kits, hub-centric wheel spacers, control arms, and lug nuts. Use code KSPAF for 5% off sitewide.",
  couponCode: "KSPAF",

  links: {
    levelingKits: "https://www.tkqlhce.com/click-101726471-17167895",
    wheelSpacers: "https://www.kqzyfj.com/click-101726471-17167892",
    controlArms: "https://www.anrdoezrs.net/click-101726471-17167894",
    aluminumControlArms: "https://www.tkqlhce.com/click-101726471-17167893",
    spikeLugNuts: "https://www.dpbolvw.net/click-101726471-17167896",
    couponSitewide: "https://www.dpbolvw.net/click-101726471-17190030",
    evergreen: "https://www.kqzyfj.com/click-101726471-17188039",
  },

  banners: {
    square250: {
      url: "https://www.lduhtrp.net/image-101726471-17177442",
      w: 250,
      h: 250,
      click: "https://www.kqzyfj.com/click-101726471-17177442",
    },
    medRect320x250: {
      url: "https://www.tqlkg.com/image-101726471-17177443",
      w: 320,
      h: 250,
      click: "https://www.kqzyfj.com/click-101726471-17177443",
    },
    mobileLeaderboard320x50: {
      url: "https://www.ftjcfx.com/image-101726471-17177444",
      w: 320,
      h: 50,
      click: "https://www.tkqlhce.com/click-101726471-17177444",
    },
  },
};
