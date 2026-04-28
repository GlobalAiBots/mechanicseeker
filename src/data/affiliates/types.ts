// Shared affiliate types for mechanicseeker. Keep partner configs partner-agnostic
// at the component layer; per-partner configs can narrow with strict union types.

export type AffiliateLinkKey = string;
export type AffiliateBannerKey = string;

export interface AffiliatePartner {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  logo?: string;
  links: Record<string, string>;
  banners?: Record<string, { url: string; w: number; h: number; click: string }>;
}
