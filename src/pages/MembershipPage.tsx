import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { PACKS, TIERS } from '../config/pricing'
import { currency, currency2 } from '../lib/format'
import { daysUntil, formatDate } from '../lib/date'
import { SegmentedMeter } from '../layout/BalanceWidget'
import { IconArrowRight, IconCheck, IconCoin } from '../components/icons'

function TierLadder() {
  const s = useDemoState()
  const nav = useNavigate()

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5">
        <div>
          <div className="text-xs font-semibold tracking-wide text-muted uppercase">
            Your current plan
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span className="text-lg font-bold text-ink">{s.activeTier?.name}</span>
            <span className="text-muted">${s.activeTier?.priceMo}/mo</span>
            <SegmentedMeter remaining={s.remaining} total={s.capacity ?? 0} tone="light" />
            <span className="text-sm font-medium">
              {s.remaining} of {s.capacity} left
            </span>
          </div>
          <div className="mt-1 text-sm text-muted">
            Renews {s.resetDate ? formatDate(s.resetDate) : '—'} · in{' '}
            {s.resetDate ? daysUntil(s.resetDate) : 0} days
          </div>
        </div>
        <button
          onClick={() => nav('/finder')}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-canvas"
        >
          Continue to Project Finder <IconArrowRight className="text-[15px]" />
        </button>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {TIERS.map((t) => {
          const current = s.state.subscription.tier === t.id
          return (
            <div
              key={t.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
                t.badge ? 'border-teal shadow-sm' : 'border-line'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-teal px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                  {t.badge}
                </span>
              )}
              <div className="text-lg font-bold text-ink">{t.name}</div>
              <div className="mt-1 text-sm text-muted">{t.blurb}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-ink">{currency(t.priceMo)}</span>
                <span className="text-muted">/mo</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-teal-dark">
                {t.projectsMo} projects / month
              </div>
              <ul className="mt-4 flex-1 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                    <IconCheck className="mt-0.5 text-[15px] text-teal" />
                    {f}
                  </li>
                ))}
              </ul>
              {current ? (
                <div className="mt-5 rounded-lg border border-teal/40 bg-teal-50 py-2.5 text-center text-sm font-semibold text-teal-dark">
                  Current plan
                </div>
              ) : (
                <button
                  onClick={() => nav(`/purchase?kind=tier&id=${t.id}`)}
                  className="mt-5 rounded-lg bg-teal py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-dark"
                >
                  Choose {t.name}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-sm text-muted">
        Unused projects don&rsquo;t roll over — your count resets on the 1st of each month. Plans are
        billed monthly; no add-on project purchases.
      </p>
    </>
  )
}

function PackGrid() {
  const s = useDemoState()
  const nav = useNavigate()

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5">
        <div>
          <div className="text-xs font-semibold tracking-wide text-muted uppercase">
            Your balance
          </div>
          <div className="mt-1 flex items-center gap-2">
            <IconCoin className="text-[22px] text-gold" />
            <span className="text-2xl font-bold text-ink">{s.remaining}</span>
            <span className="text-muted">credits · never expire</span>
          </div>
          <div className="mt-1 text-sm text-muted">
            Spent {s.state.prepaid.lifetimeSpent} all-time
          </div>
        </div>
        <button
          onClick={() => nav('/finder')}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-canvas"
        >
          Continue to Project Finder <IconArrowRight className="text-[15px]" />
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PACKS.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
              p.badge === 'Best value' ? 'border-teal shadow-sm' : 'border-line'
            }`}
          >
            {p.badge && (
              <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                {p.badge}
              </span>
            )}
            <div className="text-sm font-semibold text-muted">{p.name}</div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-ink">{p.credits}</span>
              <span className="text-muted">credits</span>
            </div>
            <div className="mt-3 text-2xl font-bold text-ink">{currency(p.price)}</div>
            <div className="text-sm text-muted">{currency2(p.perUnit)} / unlock</div>
            <button
              onClick={() => nav(`/purchase?kind=pack&id=${p.id}`)}
              className="mt-5 rounded-lg bg-teal py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Buy pack
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">
        Credits never expire and roll over month to month. Bigger packs cost less per unlock — top up
        anytime.
      </p>
    </>
  )
}

export function MembershipPage() {
  const { concept } = useDemoState()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {concept === 'subscription' ? 'Choose your plan' : 'Buy project credits'}
      </h1>
      <p className="mt-1 text-muted">
        {concept === 'subscription'
          ? 'A set number of project unlocks each month — roam anywhere.'
          : 'A prepaid balance of project unlocks you spend as you go — roam anywhere.'}
      </p>
      <div className="mt-5">{concept === 'subscription' ? <TierLadder /> : <PackGrid />}</div>
    </div>
  )
}
