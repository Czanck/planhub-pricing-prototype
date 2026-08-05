// ============================================================================
// Shared types for the PlanHub pricing-concept prototype.
// ============================================================================

/** The two pricing concepts under test. */
export type Concept = 'subscription' | 'prepaid'

/** Researcher balance quick-states (see ResearcherPanel). */
export type BalancePreset = 'normal' | 'low' | 'zero'

export type TierId = 'good' | 'better' | 'best'

// ---- Persisted demo state (one localStorage key) ----------------------------

export interface SubscriptionState {
  tier: TierId
  allotment: number // projects included per month for the current tier
  used: number // projects unlocked this cycle
  resetDate: string // ISO date — first of next month
  unlockedProjectIds: string[]
}

export interface PrepaidState {
  balance: number // credits remaining — never expire, roll over
  lifetimeSpent: number
  unlockedProjectIds: string[]
}

export interface DemoState {
  version: number
  concept: Concept
  subscription: SubscriptionState
  prepaid: PrepaidState
  seenMigration: boolean
}

// ---- Pricing config ---------------------------------------------------------

export interface Tier {
  id: TierId
  name: string
  priceMo: number
  projectsMo: number
  blurb: string
  features: string[]
  badge?: string
}

export interface Pack {
  id: string
  name: string
  credits: number
  price: number
  perUnit: number
  badge?: string
}

// ---- Project data -----------------------------------------------------------

export type ProjectType =
  | 'New / Ground Up'
  | 'Addition'
  | 'Renovation'
  | 'Tenant Improvement'
  | 'Infrastructure'

export type LaborStatus = 'Davis-Bacon' | 'Prevailing Wage' | 'Open Shop' | 'Union'

export interface GeneralContractor {
  id: string
  name: string
  biddingStatus: 'Bidding' | 'Invited' | 'Awarded' | 'Not Bidding'
  bidDue: string // ISO
  contactName: string // 🔒 revealed on unlock
  phone: string // 🔒
  email: string // 🔒
}

export interface ProjectFile {
  id: string
  name: string
  category: 'Plans' | 'Specs' | 'Addenda' | 'Bid Docs'
  type: 'pdf' | 'dwg' | 'xlsx' | 'zip'
  sizeMb: number
  uploaded: string // ISO
}

export interface MarketIntel {
  views: number
  intendToBid: number
  bidsSubmitted: number
  demandByTrade: { trade: string; count: number }[]
}

export interface ProjectFit {
  headline: string // FREE — e.g. "Likely a strong fit"
  blurredReason: string // FREE-blurred, revealed on unlock
  matchesTrades: { value: boolean; trades: string[] } // FREE
  withinJobSize: { value: boolean; label: string } // FREE
  timelineVsCapacity: string // 🔒
  winOddsVsCompetition: string // 🔒
  goNoGo: 'Go' | 'Lean Go' | 'Caution' | 'No-Go' // 🔒
}

export interface Project {
  id: string
  isHero?: boolean
  name: string
  projectType: ProjectType
  constructionType: string
  buildingUse: string
  sector: 'Public' | 'Private' | 'Federal'
  laborStatus: LaborStatus
  city: string
  state: string
  distanceMi: number
  approxLocation: string // FREE — city / area, not street
  exactAddress: string // 🔒
  valueMin: number
  valueMax: number
  sizeSf: number | null
  bidDue: string // ISO — FREE
  status: 'Bidding' | 'Bidding Soon' | 'Closing Soon'
  trades: string[] // FREE chips
  fileCount: number // FREE — headline count
  files: ProjectFile[] // 🔒 — representative list revealed on unlock
  gcs: GeneralContractor[]
  marketIntel: MarketIntel // FREE
  fit: ProjectFit // partial FREE, full 🔒
}
