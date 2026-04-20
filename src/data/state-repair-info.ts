// State-specific auto repair information.
//
// Populated manually from primary sources (state statutes, DMV/DOT pages, state AG
// consumer protection offices, NCSL). DO NOT auto-generate — statute citations
// that look plausible but are wrong are worse than no content.
//
// State pages render this data conditionally. States with no entry here fall back
// to a directory-only treatment (shop list + city browser) rather than showing
// generic templated legal claims.

import data from "./state-repair-info.json";

export type StateRepairInfo = {
  /** Full state name, e.g. "Montana" */
  name: string;
  /** Written-estimate statute summary. Cite section number. */
  estimateLaw: string;
  /** Mechanic's lien statute summary. Cite section number. */
  mechanicLien: string;
  /** Lemon law coverage period. Cite section number. */
  lemonLaw: string;
  /** Whether the state requires safety and/or emissions inspections; include scope. */
  inspection: string;
  /** Typical hourly labor rate range observed in the state. */
  avgLaborRate: string;
  /** Climate-driven repair patterns (rust, AC, battery, etc.). */
  climateIssues: string;
  /** Consumer-protection office contact with phone number. */
  consumerProtection: string;
  /** 3-6 most common repair types for this state's climate/driving conditions. */
  popularRepairs: string[];
};

const typed = data as Record<string, StateRepairInfo>;

export function getStateRepairInfo(code: string): StateRepairInfo | null {
  return typed[code.toUpperCase()] ?? null;
}

export function hasStateRepairInfo(code: string): boolean {
  return code.toUpperCase() in typed;
}
