import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import type { Concept } from '../types'
import { START } from '../config/pricing'
import { currency } from '../lib/format'
import { IconArrowRight, IconCalendar, IconCoin, IconGlobe } from '../components/icons'

function Fact({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/80">
      <span className="mt-0.5 text-teal">{icon}</span>
      {children}
    </li>
  )
}

export function StartScreen() {
  const { setConcept, resetAll } = useDemoState()
  const nav = useNavigate()

  function choose(c: Concept) {
    setConcept(c)
    nav('/welcome')
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal">
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
          </span>
          <span className="text-lg font-bold">planHub</span>
          <span className="rounded bg-teal/25 px-1.5 py-0.5 text-[10px] font-bold text-teal-100">
            2.0
          </span>
          <span className="ml-3 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white/70 uppercase">
            Pricing concept prototype
          </span>
        </div>

        <div className="mt-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Choose a pricing concept to explore</h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Two ways to buy project access — both replace geographic coverage with a simple limit on
            how many projects you unlock. Pick one to walk through it.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Concept A */}
          <button
            onClick={() => choose('subscription')}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-teal hover:bg-white/[0.07]"
          >
            <span className="inline-block rounded-full bg-teal/20 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-teal-100 uppercase">
              Concept A
            </span>
            <h2 className="mt-3 text-xl font-bold">Monthly Subscription</h2>
            <p className="mt-1 text-sm text-white/70">
              A set number of project unlocks each month. Resets on the 1st; unused unlocks
              don&rsquo;t roll over.
            </p>
            <ul className="mt-4 space-y-2">
              <Fact icon={<IconCalendar className="text-[15px]" />}>
                <span>
                  <b>{currency(99)}/month</b> · {START.subscriptionAllotment} projects included
                </span>
              </Fact>
              <Fact icon={<IconGlobe className="text-[15px]" />}>Roam anywhere — no radius or region</Fact>
            </ul>
            <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white group-hover:bg-teal-dark">
              Explore Concept A <IconArrowRight className="text-[15px]" />
            </span>
          </button>

          {/* Concept B */}
          <button
            onClick={() => choose('prepaid')}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-teal hover:bg-white/[0.07]"
          >
            <span className="inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-gold uppercase">
              Concept B
            </span>
            <h2 className="mt-3 text-xl font-bold">Prepaid Balance</h2>
            <p className="mt-1 text-sm text-white/70">
              Buy a balance of project credits. Spend as you go — credits never expire, and you top
              up whenever you like.
            </p>
            <ul className="mt-4 space-y-2">
              <Fact icon={<IconCoin className="text-[15px]" />}>
                <span>
                  From <b>{currency(99)}</b> for {START.prepaidBalance} credits
                </span>
              </Fact>
              <Fact icon={<IconGlobe className="text-[15px]" />}>Roam anywhere — no radius or region</Fact>
            </ul>
            <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white group-hover:bg-teal-dark">
              Explore Concept B <IconArrowRight className="text-[15px]" />
            </span>
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-10 text-sm text-white/50">
          <span>You can switch concepts anytime from the top bar.</span>
          <button onClick={resetAll} className="font-medium text-white/70 hover:text-white">
            Reset prototype data
          </button>
        </div>
      </div>
    </div>
  )
}
