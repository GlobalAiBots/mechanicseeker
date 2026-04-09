import indexData from "./mechanics-index.json";

export interface ShopIndex {
  id: string;
  slug: string;
  name: string;
  state: string;
  city: string;
  shopType: string;
  brand: string;
  lat: number;
  lng: number;
}

export interface Shop extends ShopIndex {
  address: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
  services: string[];
}

export const unified: ShopIndex[] = indexData as ShopIndex[];

export function getShopsByState(stateCode: string): Shop[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = require(`./states/${stateCode.toLowerCase()}.json`);
    return data as Shop[];
  } catch {
    return [];
  }
}

export function getShopById(id: string): Shop | null {
  const entry = unified.find((s) => s.id === id);
  if (!entry) return null;
  const stateShops = getShopsByState(entry.state);
  return stateShops.find((s) => s.id === id) || null;
}

export const serviceLabels: Record<string, { icon: string; label: string }> = {
  general_repair: { icon: "\u{1F527}", label: "General Repair" },
  oil_change: { icon: "\u{1F4A7}", label: "Oil Change" },
  brakes: { icon: "\u{1F6D1}", label: "Brakes" },
  tires: { icon: "\u2B55", label: "Tires" },
  transmission: { icon: "\u2699\uFE0F", label: "Transmission" },
  body_work: { icon: "\u{1F3A8}", label: "Body Work" },
  exhaust: { icon: "\u{1F4A8}", label: "Exhaust" },
  alignment: { icon: "\u2194\uFE0F", label: "Alignment" },
  inspection: { icon: "\u2705", label: "Inspection" },
  diesel: { icon: "\u26FD", label: "Diesel" },
  ac: { icon: "\u2744\uFE0F", label: "A/C" },
  electrical: { icon: "\u26A1", label: "Electrical" },
  suspension: { icon: "\u{1F504}", label: "Suspension" },
  engine_repair: { icon: "\u{1F6E0}\uFE0F", label: "Engine" },
};

export const stateList: { name: string; slug: string; code: string }[] = [
  { name: "Alabama", slug: "alabama", code: "AL" },{ name: "Alaska", slug: "alaska", code: "AK" },
  { name: "Arizona", slug: "arizona", code: "AZ" },{ name: "Arkansas", slug: "arkansas", code: "AR" },
  { name: "California", slug: "california", code: "CA" },{ name: "Colorado", slug: "colorado", code: "CO" },
  { name: "Connecticut", slug: "connecticut", code: "CT" },{ name: "Delaware", slug: "delaware", code: "DE" },
  { name: "Florida", slug: "florida", code: "FL" },{ name: "Georgia", slug: "georgia", code: "GA" },
  { name: "Hawaii", slug: "hawaii", code: "HI" },{ name: "Idaho", slug: "idaho", code: "ID" },
  { name: "Illinois", slug: "illinois", code: "IL" },{ name: "Indiana", slug: "indiana", code: "IN" },
  { name: "Iowa", slug: "iowa", code: "IA" },{ name: "Kansas", slug: "kansas", code: "KS" },
  { name: "Kentucky", slug: "kentucky", code: "KY" },{ name: "Louisiana", slug: "louisiana", code: "LA" },
  { name: "Maine", slug: "maine", code: "ME" },{ name: "Maryland", slug: "maryland", code: "MD" },
  { name: "Massachusetts", slug: "massachusetts", code: "MA" },{ name: "Michigan", slug: "michigan", code: "MI" },
  { name: "Minnesota", slug: "minnesota", code: "MN" },{ name: "Mississippi", slug: "mississippi", code: "MS" },
  { name: "Missouri", slug: "missouri", code: "MO" },{ name: "Montana", slug: "montana", code: "MT" },
  { name: "Nebraska", slug: "nebraska", code: "NE" },{ name: "Nevada", slug: "nevada", code: "NV" },
  { name: "New Hampshire", slug: "new-hampshire", code: "NH" },{ name: "New Jersey", slug: "new-jersey", code: "NJ" },
  { name: "New Mexico", slug: "new-mexico", code: "NM" },{ name: "New York", slug: "new-york", code: "NY" },
  { name: "North Carolina", slug: "north-carolina", code: "NC" },{ name: "North Dakota", slug: "north-dakota", code: "ND" },
  { name: "Ohio", slug: "ohio", code: "OH" },{ name: "Oklahoma", slug: "oklahoma", code: "OK" },
  { name: "Oregon", slug: "oregon", code: "OR" },{ name: "Pennsylvania", slug: "pennsylvania", code: "PA" },
  { name: "Rhode Island", slug: "rhode-island", code: "RI" },{ name: "South Carolina", slug: "south-carolina", code: "SC" },
  { name: "South Dakota", slug: "south-dakota", code: "SD" },{ name: "Tennessee", slug: "tennessee", code: "TN" },
  { name: "Texas", slug: "texas", code: "TX" },{ name: "Utah", slug: "utah", code: "UT" },
  { name: "Vermont", slug: "vermont", code: "VT" },{ name: "Virginia", slug: "virginia", code: "VA" },
  { name: "Washington", slug: "washington", code: "WA" },{ name: "West Virginia", slug: "west-virginia", code: "WV" },
  { name: "Wisconsin", slug: "wisconsin", code: "WI" },{ name: "Wyoming", slug: "wyoming", code: "WY" },
];
