import type { Pack, Tier } from '../types'

// ============================================================================
// EDIT THIS FILE to change the numbers / prices / copy used in the prototype.
//
// Tuned to the interview script (Micro Subs, Aug 2026):
//   • $99 buys 10 project unlocks either way (subscription tier "Good" == 10-pack).
//   • The scripted decision moment starts at "2 remaining" (2 of 10 / 2 credits).
//   • Concept A (subscription) resets monthly & never sells top-ups.
//   • Concept B (prepaid) rolls over & is topped up with more packs.
// ============================================================================

// ---- Concept A · Monthly subscription tiers (Good / Better / Best) ----------
export const TIERS: Tier[] = [
  {
    id: 'good',
    name: 'Good',
    priceMo: 99,
    projectsMo: 10,
    blurb: 'For solo subs exploring new markets',
    features: [
      'Roam anywhere — no radius or region',
      '10 project unlocks / month',
      'Market Intelligence',
      'Project Fit preview',
    ],
  },
  {
    id: 'better',
    name: 'Better',
    priceMo: 199,
    projectsMo: 25,
    blurb: 'For active bidders',
    features: [
      'Everything in Good',
      '25 project unlocks / month',
      'Ask AI · Go / No-Go',
      'Priority support',
    ],
    badge: 'Most popular',
  },
  {
    id: 'best',
    name: 'Best',
    priceMo: 349,
    projectsMo: 60,
    blurb: 'For teams chasing volume',
    features: [
      'Everything in Better',
      '60 project unlocks / month',
      '3 team seats',
      'Exports & API',
    ],
  },
]

// ---- Concept B · Prepaid credit packs (bigger pack = cheaper per unlock) -----
export const PACKS: Pack[] = [
  { id: 'p10', name: 'Starter', credits: 10, price: 99, perUnit: 9.9 },
  { id: 'p25', name: 'Pro', credits: 25, price: 229, perUnit: 9.16, badge: 'Popular' },
  { id: 'p50', name: 'Business', credits: 50, price: 399, perUnit: 7.98, badge: 'Best value' },
  { id: 'p100', name: 'Enterprise', credits: 100, price: 699, perUnit: 6.99 },
]

/** The pack a fresh prepaid participant is assumed to have just bought. */
export const FEATURED_PACK_ID = 'p10'

// ---- Starting balances (what loads on a fresh demo) -------------------------
export const START = {
  subscriptionTier: 'good' as const,
  subscriptionAllotment: 10,
  subscriptionUsed: 0, // fresh = full 10 of 10
  prepaidBalance: 10, // fresh = the featured 10-pack
  // The interview script's "2 of your 10 / 2 credits remaining" moment:
  scriptedRemaining: 2,
}

/** remaining <= this triggers the low-balance nudge. */
export const LOW_THRESHOLD = 3
