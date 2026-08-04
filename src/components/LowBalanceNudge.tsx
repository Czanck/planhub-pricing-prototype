import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { formatDate } from '../lib/date'
import { IconInfo } from './icons'

export function LowBalanceNudge() {
  const s = useDemoState()
  const [dismissed, setDismissed] = useState(false)
  if (!s.isLow || dismissed) return null
  const isSub = s.concept === 'subscription'

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold-50 px-4 py-3 text-sm">
      <IconInfo className="shrink-0 text-[18px] text-gold" />
      <span className="text-ink">
        {isSub ? (
          <>
            Only <b>{s.remaining} project{s.remaining === 1 ? '' : 's'}</b> left this month. They
            reset {s.resetDate ? formatDate(s.resetDate) : 'soon'} — or upgrade for a higher monthly
            limit.
          </>
        ) : (
          <>
            Only <b>{s.remaining} credit{s.remaining === 1 ? '' : 's'}</b> left this month. Top up to
            keep unlocking.
          </>
        )}
      </span>
      <Link
        to="/membership"
        className="ml-auto shrink-0 rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95"
      >
        {isSub ? 'Upgrade' : 'Buy more'}
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 text-muted hover:bg-white/60"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}
