import { Link } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { SegmentedMeter } from './BalanceWidget'
import { formatDate } from '../lib/date'
import { IconCoin } from '../components/icons'

export function PlanStatusCard() {
  const s = useDemoState()
  const isSub = s.concept === 'subscription'

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="text-[11px] font-semibold tracking-wide text-white/50 uppercase">
        {isSub ? 'Monthly subscription' : 'Prepaid balance'}
      </div>

      {isSub ? (
        <>
          <div className="mt-1 text-sm font-semibold text-white">
            {s.activeTier?.name} · ${s.activeTier?.priceMo}/mo
          </div>
          <div className="mt-2 flex items-center gap-2">
            <SegmentedMeter remaining={s.remaining} total={s.capacity ?? 0} />
            <span className="text-xs font-medium text-white">
              {s.remaining} of {s.capacity} left
            </span>
          </div>
          <div className="mt-1 text-[11px] text-white/50">
            Resets {s.resetDate ? formatDate(s.resetDate) : '—'} · unused don&rsquo;t roll over
          </div>
        </>
      ) : (
        <>
          <div className="mt-1 flex items-baseline gap-1.5">
            <IconCoin className="translate-y-0.5 text-[16px] text-gold" />
            <span className="text-lg font-bold text-white">{s.remaining}</span>
            <span className="text-xs text-white/60">credits</span>
          </div>
          <div className="mt-1 text-[11px] text-white/50">Credits never expire</div>
        </>
      )}

      <Link
        to="/membership"
        className="mt-2.5 block rounded-lg bg-teal px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-teal-dark"
      >
        {isSub ? 'Manage plan' : 'Buy more credits'}
      </Link>
    </div>
  )
}
