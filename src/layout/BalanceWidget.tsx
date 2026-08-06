import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { IconChevronDown, IconCoin } from '../components/icons'
import { daysUntil, formatDateLong } from '../lib/date'

export function SegmentedMeter({
  remaining,
  total,
  tone = 'dark',
  className = '',
}: {
  remaining: number
  total: number
  tone?: 'dark' | 'light'
  className?: string
}) {
  const pipCount = Math.min(total, 10)
  const filled = total === 0 ? 0 : Math.max(0, Math.round((remaining / total) * pipCount))
  const emptyClass = tone === 'dark' ? 'bg-white/20' : 'bg-line'
  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: pipCount }).map((_, i) => (
        <span
          key={i}
          className={`h-3.5 w-[7px] rounded-[2px] ${i < filled ? 'bg-teal' : emptyClass}`}
        />
      ))}
    </div>
  )
}

export function BalanceWidget() {
  const s = useDemoState()
  const [open, setOpen] = useState(false)
  const isSub = s.concept === 'subscription'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-white transition ${
          s.isZero
            ? 'border-coral/50 bg-coral/15'
            : 'border-white/15 bg-white/5 hover:bg-white/10'
        }`}
      >
        {isSub ? (
          <>
            <SegmentedMeter remaining={s.remaining} total={s.capacity ?? 0} />
            <span className="font-semibold whitespace-nowrap">
              {s.remaining} of {s.capacity} projects left
            </span>
          </>
        ) : (
          <>
            <IconCoin className="text-[16px] text-gold" />
            <span className="font-semibold whitespace-nowrap">{s.remaining} unlocks</span>
          </>
        )}
        <IconChevronDown className="text-[13px] text-white/60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-80 rounded-xl border border-line bg-white p-4 text-ink shadow-xl">
            {isSub ? (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {s.activeTier?.name} plan · monthly
                  </span>
                  <span className="text-xs text-muted">${s.activeTier?.priceMo}/mo</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <SegmentedMeter remaining={s.remaining} total={s.capacity ?? 0} tone="light" />
                  <span className="text-sm font-semibold">
                    {s.remaining} of {s.capacity} left
                  </span>
                </div>
                <dl className="mt-3 space-y-1 text-sm text-muted">
                  <div className="flex justify-between">
                    <dt>Used this month</dt>
                    <dd className="font-medium text-ink">{s.used}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Resets</dt>
                    <dd className="font-medium text-ink">
                      {s.resetDate ? formatDateLong(s.resetDate) : '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>&nbsp;</dt>
                    <dd className="text-xs">in {s.resetDate ? daysUntil(s.resetDate) : 0} days</dd>
                  </div>
                </dl>
                <p className="mt-2 text-xs text-muted">
                  Unused projects don&rsquo;t roll over — the count resets on the 1st.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/membership"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-teal px-3 py-2 text-center text-sm font-semibold text-white hover:bg-teal-dark"
                  >
                    Upgrade plan
                  </Link>
                  <Link
                    to="/unlocked"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold hover:bg-canvas"
                  >
                    Unlocked
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Prepaid unlocks</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                    <IconCoin className="text-[13px] text-gold" /> unlocks
                  </span>
                </div>
                <div className="mt-2 text-3xl font-bold text-ink">{s.remaining}</div>
                <p className="text-sm text-muted">Project unlocks · never expire</p>
                <dl className="mt-3 space-y-1 text-sm text-muted">
                  <div className="flex justify-between">
                    <dt>Spent all-time</dt>
                    <dd className="font-medium text-ink">{s.state.prepaid.lifetimeSpent}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/membership"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-teal px-3 py-2 text-center text-sm font-semibold text-white hover:bg-teal-dark"
                  >
                    Buy more
                  </Link>
                  <Link
                    to="/unlocked"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold hover:bg-canvas"
                  >
                    Unlocked
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
