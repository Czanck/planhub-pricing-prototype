import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { Modal } from './Modal'
import { FEATURED_PACK_ID, PACKS } from '../config/pricing'
import { currency, currency2 } from '../lib/format'
import { daysUntil, formatDateLong } from '../lib/date'
import { IconArrowRight, IconCalendar, IconCoin } from './icons'

export function ZeroBalanceModal({ onClose }: { onClose: () => void }) {
  const s = useDemoState()
  const nav = useNavigate()
  const isSub = s.concept === 'subscription'
  const featured = PACKS.find((p) => p.id === FEATURED_PACK_ID) ?? PACKS[0]

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        {isSub ? (
          <>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral-50 text-coral">
              <IconCalendar className="text-[20px]" />
            </div>
            <h3 className="mt-3 text-xl font-bold text-ink">
              You&rsquo;ve used all {s.capacity} projects this month
            </h3>
            <p className="mt-2 text-sm text-muted">
              Your unlocked projects stay unlocked. New project unlocks arrive when your plan resets.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-canvas p-3 text-sm">
              <IconCalendar className="text-[18px] text-muted" />
              <div>
                <div className="font-semibold text-ink">
                  Resets {s.resetDate ? formatDateLong(s.resetDate) : '—'}
                </div>
                <div className="text-muted">in {s.resetDate ? daysUntil(s.resetDate) : 0} days</div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={() => nav('/membership')}
                className="flex items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
              >
                Upgrade your plan for more projects <IconArrowRight className="text-[15px]" />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold hover:bg-canvas"
              >
                Wait for reset
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold">
              <IconCoin className="text-[20px]" />
            </div>
            <h3 className="mt-3 text-xl font-bold text-ink">You&rsquo;re out of credits</h3>
            <p className="mt-2 text-sm text-muted">
              Credits never expire — top up a pack to keep unlocking projects.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-teal/30 bg-teal-50 p-3">
              <div>
                <div className="font-semibold text-ink">
                  {featured.name} · {featured.credits} credits
                </div>
                <div className="text-sm text-muted">
                  {currency(featured.price)} · {currency2(featured.perUnit)}/unlock
                </div>
              </div>
              <button
                onClick={() => {
                  s.buyPack(featured.id)
                  onClose()
                }}
                className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-dark"
              >
                Buy
              </button>
            </div>
            <button
              onClick={() => nav('/membership')}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold hover:bg-canvas"
            >
              See all credit packs <IconArrowRight className="text-[15px]" />
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}
