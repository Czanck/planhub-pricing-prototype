import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type {
  BalancePreset,
  Concept,
  DemoState,
  Tier,
  TierId,
} from '../types'
import { LOW_THRESHOLD, PACKS, START, TIERS } from '../config/pricing'
import { firstOfNextMonth } from '../lib/date'

const LS_KEY = 'planhub-proto-state'
const STATE_VERSION = 3

function initialState(): DemoState {
  return {
    version: STATE_VERSION,
    concept: 'subscription',
    subscription: {
      tier: START.subscriptionTier,
      allotment: START.subscriptionAllotment,
      used: START.subscriptionUsed,
      resetDate: firstOfNextMonth(),
      unlockedProjectIds: [],
    },
    prepaid: {
      balance: START.prepaidBalance,
      lifetimeSpent: 0,
      unlockedProjectIds: [],
    },
    seenMigration: false,
  }
}

/** Only the subscription is monthly — roll its cycle if the reset date has passed. */
function applyMonthlyReset(state: DemoState): DemoState {
  const resetMs = new Date(`${state.subscription.resetDate}T12:00:00`).getTime()
  if (Date.now() > resetMs) {
    return {
      ...state,
      subscription: { ...state.subscription, used: 0, resetDate: firstOfNextMonth() },
    }
  }
  return state
}

function load(): DemoState {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return initialState()
    const parsed = JSON.parse(raw) as DemoState
    if (!parsed || parsed.version !== STATE_VERSION) return initialState()
    return applyMonthlyReset(parsed)
  } catch {
    return initialState() // private mode / disabled storage → run in-memory
  }
}

function save(state: DemoState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable — keep running in-memory */
  }
}

// ---- reducer ----------------------------------------------------------------

type Action =
  | { type: 'SET_CONCEPT'; concept: Concept }
  | { type: 'UNLOCK'; id: string }
  | { type: 'BUY_CREDITS'; credits: number }
  | { type: 'UPGRADE_TIER'; tier: TierId; allotment: number }
  | { type: 'SIMULATE_RESET' }
  | { type: 'SET_PRESET'; preset: BalancePreset }
  | { type: 'RESET_DEMO' }
  | { type: 'RESET_ALL' }
  | { type: 'MARK_MIGRATION' }

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case 'SET_CONCEPT':
      return { ...state, concept: action.concept }

    case 'UNLOCK': {
      if (state.concept === 'subscription') {
        const s = state.subscription
        if (s.unlockedProjectIds.includes(action.id)) return state
        if (s.allotment - s.used <= 0) return state
        return {
          ...state,
          subscription: {
            ...s,
            used: s.used + 1,
            unlockedProjectIds: [...s.unlockedProjectIds, action.id],
          },
        }
      }
      const p = state.prepaid
      if (p.unlockedProjectIds.includes(action.id)) return state
      if (p.balance <= 0) return state
      return {
        ...state,
        prepaid: {
          ...p,
          balance: p.balance - 1,
          lifetimeSpent: p.lifetimeSpent + 1,
          unlockedProjectIds: [...p.unlockedProjectIds, action.id],
        },
      }
    }

    case 'BUY_CREDITS':
      return {
        ...state,
        prepaid: { ...state.prepaid, balance: state.prepaid.balance + action.credits },
      }

    case 'UPGRADE_TIER':
      // A tier change keeps `used` (remaining jumps up); it is NOT a top-up.
      return {
        ...state,
        subscription: { ...state.subscription, tier: action.tier, allotment: action.allotment },
      }

    case 'SIMULATE_RESET':
      // Only the subscription is monthly; prepaid credits never expire.
      if (state.concept !== 'subscription') return state
      return {
        ...state,
        subscription: { ...state.subscription, used: 0, resetDate: firstOfNextMonth() },
      }

    case 'SET_PRESET': {
      // Sets the ACTIVE concept's remaining to a scripted state.
      if (state.concept === 'subscription') {
        const s = state.subscription
        const used =
          action.preset === 'normal'
            ? START.subscriptionUsed
            : action.preset === 'low'
              ? Math.max(0, s.allotment - START.scriptedRemaining)
              : s.allotment // zero remaining
        return { ...state, subscription: { ...s, used } }
      }
      const balance =
        action.preset === 'normal'
          ? START.prepaidBalance
          : action.preset === 'low'
            ? START.scriptedRemaining
            : 0
      return { ...state, prepaid: { ...state.prepaid, balance } }
    }

    case 'RESET_DEMO':
      // Between participants: fresh balances/unlocks, keep the chosen concept.
      return { ...initialState(), concept: state.concept }

    case 'RESET_ALL':
      return initialState()

    case 'MARK_MIGRATION':
      return { ...state, seenMigration: true }

    default:
      return state
  }
}

// ---- context value ----------------------------------------------------------

export interface DemoContextValue {
  state: DemoState
  concept: Concept
  /** Active-concept remaining unlocks. */
  remaining: number
  /** Subscription allotment (0 for prepaid, which has no ceiling). */
  capacity: number
  /** Subscription projects used this cycle (0 for prepaid). */
  used: number
  /** Subscription reset date (prepaid never resets; value unused there). */
  resetDate: string
  /** Prepaid credit balance, or null in subscription. */
  balance: number | null
  activeTier: Tier | null
  isUnlocked: (id: string) => boolean
  canUnlock: boolean
  isLow: boolean
  isZero: boolean
  setConcept: (c: Concept) => void
  unlockProject: (id: string) => 'ok' | 'already' | 'blocked'
  buyCredits: (packId: string) => void
  upgradeTier: (tier: TierId) => void
  simulateReset: () => void
  setBalancePreset: (p: BalancePreset) => void
  resetDemo: () => void
  resetAll: () => void
  markMigrationSeen: () => void
}

const DemoStateContext = createContext<DemoContextValue | null>(null)

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    save(state)
  }, [state])

  const value = useMemo<DemoContextValue>(() => {
    const isSub = state.concept === 'subscription'
    const active = isSub ? state.subscription : state.prepaid
    const remaining = isSub
      ? state.subscription.allotment - state.subscription.used
      : state.prepaid.balance
    const activeTier = isSub
      ? TIERS.find((t) => t.id === state.subscription.tier) ?? null
      : null

    return {
      state,
      concept: state.concept,
      remaining,
      capacity: isSub ? state.subscription.allotment : 0,
      used: isSub ? state.subscription.used : 0,
      resetDate: state.subscription.resetDate,
      balance: isSub ? null : state.prepaid.balance,
      activeTier,
      isUnlocked: (id) => active.unlockedProjectIds.includes(id),
      canUnlock: remaining > 0,
      isLow: remaining > 0 && remaining <= LOW_THRESHOLD,
      isZero: remaining <= 0,
      setConcept: (c) => dispatch({ type: 'SET_CONCEPT', concept: c }),
      unlockProject: (id) => {
        if (active.unlockedProjectIds.includes(id)) return 'already'
        if (remaining <= 0) return 'blocked'
        dispatch({ type: 'UNLOCK', id })
        return 'ok'
      },
      buyCredits: (packId) => {
        const pack = PACKS.find((x) => x.id === packId)
        if (pack) dispatch({ type: 'BUY_CREDITS', credits: pack.credits })
      },
      upgradeTier: (tier) => {
        const t = TIERS.find((x) => x.id === tier)
        if (t) dispatch({ type: 'UPGRADE_TIER', tier, allotment: t.projectsMo })
      },
      simulateReset: () => dispatch({ type: 'SIMULATE_RESET' }),
      setBalancePreset: (preset) => dispatch({ type: 'SET_PRESET', preset }),
      resetDemo: () => dispatch({ type: 'RESET_DEMO' }),
      resetAll: () => dispatch({ type: 'RESET_ALL' }),
      markMigrationSeen: () => dispatch({ type: 'MARK_MIGRATION' }),
    }
  }, [state])

  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemoState(): DemoContextValue {
  const ctx = useContext(DemoStateContext)
  if (!ctx) throw new Error('useDemoState must be used within a DemoStateProvider')
  return ctx
}
