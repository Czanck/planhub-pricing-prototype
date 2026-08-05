import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import type { Concept } from '../types'
import { IconArrowRight } from '../components/icons'

function ConceptCard({
  letter,
  label,
  onClick,
}: {
  letter: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-left transition hover:border-teal hover:bg-white/[0.07]"
    >
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-teal/15 text-3xl font-bold text-teal-100">
        {letter}
      </span>
      <h2 className="mt-5 text-2xl font-bold">{label}</h2>
      <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white group-hover:bg-teal-dark">
        Explore {label} <IconArrowRight className="text-[15px]" />
      </span>
    </button>
  )
}

export function StartScreen() {
  const { setConcept, resetAll } = useDemoState()
  const nav = useNavigate()

  function choose(c: Concept) {
    setConcept(c)
    nav('/finder')
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-10">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal">
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
          </span>
          <span className="text-lg font-bold">planHub</span>
          <span className="rounded bg-teal/25 px-1.5 py-0.5 text-[10px] font-bold text-teal-100">
            2.0
          </span>
          <span className="ml-3 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white/70 uppercase">
            Prototype
          </span>
        </div>

        <div className="mt-16">
          <h1 className="text-3xl font-bold sm:text-4xl">Get started</h1>
          <p className="mt-2 text-white/60">Select a concept to begin.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <ConceptCard letter="A" label="Concept A" onClick={() => choose('subscription')} />
          <ConceptCard letter="B" label="Concept B" onClick={() => choose('prepaid')} />
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
