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

// ---- Concept B · Monthly credit plan + mid-month top-ups --------------------
// B grants "up to N projects a month" as credits that reset on the 1st and
// EXPIRE if unused. Run low → buy more credits (top-ups also expire on the 1st).
export const PREPAID_PLAN = {
  monthlyCredits: 25, // "up to 25 projects a month"
  priceMo: 149,
}

/** Top-up credits bought mid-month (bigger = cheaper per unlock; expire on the 1st). */
export const TOPUPS: Pack[] = [
  { id: 't10', name: '+10 credits', credits: 10, price: 79, perUnit: 7.9 },
  { id: 't25', name: '+25 credits', credits: 25, price: 179, perUnit: 7.16, badge: 'Popular' },
  { id: 't50', name: '+50 credits', credits: 50, price: 319, perUnit: 6.38, badge: 'Best value' },
]

/** The top-up offered as a quick-buy on the zero-balance wall. */
export const FEATURED_TOPUP_ID = 't10'

// ---- Starting balances (what loads on a fresh demo) -------------------------
export const START = {
  subscriptionTier: 'good' as const,
  subscriptionAllotment: 10,
  subscriptionUsed: 0, // fresh = full 10 of 10
  prepaidAllowance: 25, // "up to 25 projects a month"
  prepaidUsed: 0, // fresh = full 25 available this month
  // The interview script's "2 of your 10 / 2 credits remaining" moment:
  scriptedRemaining: 2,
}

/** remaining <= this triggers the low-balance nudge. */
export const LOW_THRESHOLD = 3
