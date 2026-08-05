import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { FeatureFlagToggle } from '../components/FeatureFlagToggle'
import { START } from '../config/pricing'
import { currency } from '../lib/format'
import { IconArrowRight, IconBan, IconCheck, IconGlobe } from '../components/icons'

export function WelcomeMigration() {
  const s = useDemoState()
  const nav = useNavigate()
  const isSub = s.concept === 'subscription'

  function goPlans() {
    s.markMigrationSeen()
    nav('/membership')
  }
  function goFinder() {
    s.markMigrationSeen()
    nav('/finder')
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center gap-3 bg-navy px-6 py-3">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal">
          <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
        </span>
        <span className="text-lg font-bold text-white">planHub</span>
        <span className="rounded bg-teal/25 px-1.5 py-0.5 text-[10px] font-bold text-teal-100">2.0</span>
        <div className="ml-auto flex items-center gap-3">
          <FeatureFlagToggle />
          <button onClick={goFinder} className="text-sm font-medium text-white/70 hover:text-white">
            Skip
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-bold tracking-wide text-teal-dark uppercase">
          What&rsquo;s changing
        </span>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          Your access isn&rsquo;t tied to a map anymore
        </h1>
        <p className="mt-3 text-lg text-muted">
          PlanHub is moving away from paying for a coverage area. Instead, you browse{' '}
          <b className="text-ink">every</b> project — anywhere — and spend an unlock only on the ones
          you want to pursue.
        </p>

        {/* before → after */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted">
              <IconBan className="text-[16px] text-coral" /> Before
            </div>
            <p className="mt-2 text-2xl font-bold text-ink/40 line-through decoration-coral/50">
              Coverage by radius or region
            </p>
            <p className="mt-2 text-sm text-muted">
              A ~{currency(1999)}/yr plan tied to miles from your ZIP. Projects just outside the line
              were off-limits — even great ones.
            </p>
          </div>
          <div className="rounded-2xl border border-teal/30 bg-teal-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-dark">
              <IconGlobe className="text-[16px]" /> Now
            </div>
            <p className="mt-2 text-2xl font-bold text-ink">Roam anywhere, unlock what you want</p>
            <p className="mt-2 text-sm text-ink/70">
              See the whole board. Spend an unlock to reveal a project&rsquo;s contacts, files and
              full details.
            </p>
          </div>
        </div>

        {/* answers the "do I get the 100 nearest?" worry */}
        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <div className="flex items-start gap-3">
            <IconCheck className="mt-0.5 text-[18px] text-teal" />
            <div>
              <h3 className="font-semibold text-ink">There&rsquo;s no pre-assigned set of projects</h3>
              <p className="mt-1 text-sm text-muted">
                You&rsquo;re not handed the “nearest N” projects. You see them all and choose which
                to unlock. A closer or better project posted tomorrow is just as available — the only
                limit is how many you unlock.
              </p>
              <p className="mt-2 text-sm font-medium text-ink">
                {isSub
                  ? `In this concept you get ${START.subscriptionAllotment} project unlocks each month.`
                  : `In this concept you buy credits and spend one to unlock any project — they never expire, and you buy more whenever you like.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={goPlans}
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            See the {isSub ? 'plans' : 'credit packs'} <IconArrowRight className="text-[15px]" />
          </button>
          <button
            onClick={goFinder}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold hover:bg-canvas"
          >
            Go straight to Project Finder
          </button>
        </div>
      </div>
    </div>
  )
}
