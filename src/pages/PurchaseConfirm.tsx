import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { TIERS, TOPUPS } from '../config/pricing'
import { currency } from '../lib/format'
import { IconArrowRight, IconCheck } from '../components/icons'

export function PurchaseConfirm() {
  const [params] = useSearchParams()
  const kind = params.get('kind')
  const id = params.get('id')
  const s = useDemoState()
  const nav = useNavigate()
  const [done, setDone] = useState(false)

  const tier = kind === 'tier' ? TIERS.find((t) => t.id === id) : undefined
  const topup = kind === 'topup' ? TOPUPS.find((t) => t.id === id) : undefined
  if (!tier && !topup) return <Navigate to="/membership" replace />

  const title = tier ? `${tier.name} plan` : `${topup!.name} this month`
  const price = tier ? `${currency(tier.priceMo)} / month` : currency(topup!.price)
  const detail = tier
    ? `${tier.projectsMo} project unlocks each month, roam anywhere.`
    : `${topup!.credits} extra project unlocks added to this month’s balance. Top-up credits also expire on the 1st.`

  function complete() {
    if (tier) s.upgradeTier(tier.id)
    if (topup) s.buyCredits(topup.id)
    setDone(true)
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      {!done ? (
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="text-xs font-semibold tracking-wide text-muted uppercase">
            Review &amp; confirm
          </div>
          <h1 className="mt-1 text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-1 text-muted">{detail}</p>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-canvas p-4">
            <span className="font-medium text-ink">{tier ? 'Monthly total' : 'One-time total'}</span>
            <span className="text-xl font-bold text-ink">{price}</span>
          </div>

          <p className="mt-3 text-xs text-muted">
            This is a prototype — no payment is collected. Confirming just updates your{' '}
            {tier ? 'plan' : 'balance'} so you can explore.
          </p>

          <div className="mt-5 flex gap-3">
            <button
              onClick={complete}
              className="flex-1 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              {tier ? 'Complete purchase' : `Buy ${topup!.credits} credits`}
            </button>
            <button
              onClick={() => nav('/membership')}
              className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold hover:bg-canvas"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-white p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal">
            <IconCheck className="text-[24px]" />
          </div>
          <h1 className="mt-3 text-2xl font-bold text-ink">
            {tier ? `You're on ${tier.name}` : 'Credits added'}
          </h1>
          <p className="mt-1 text-muted">
            {tier
              ? `${tier.projectsMo} project unlocks available this month.`
              : `Your balance is now ${s.remaining} credits this month.`}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-canvas px-5 py-3">
            <span className="text-sm text-muted">
              {tier ? 'Projects left this month' : 'Credits left this month'}
            </span>
            <span className="text-lg font-bold text-ink">
              {tier ? `${s.remaining} of ${s.capacity}` : s.remaining}
            </span>
          </div>

          <button
            onClick={() => nav('/finder')}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            Start browsing projects <IconArrowRight className="text-[15px]" />
          </button>
        </div>
      )}
    </div>
  )
}
