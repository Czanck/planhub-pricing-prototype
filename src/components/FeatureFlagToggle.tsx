import { useDemoState } from '../context/DemoStateContext'
import type { Concept } from '../types'

const OPTIONS: { id: Concept; label: string }[] = [
  { id: 'subscription', label: 'A · Subscription' },
  { id: 'prepaid', label: 'B · Prepaid' },
]

export function FeatureFlagToggle({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { concept, setConcept } = useDemoState()
  const shell = tone === 'dark' ? 'border-white/15 bg-white/5' : 'border-line bg-canvas'

  return (
    <div className={`inline-flex rounded-full border p-0.5 ${shell}`} role="group" aria-label="Pricing concept">
      {OPTIONS.map((o) => {
        const active = concept === o.id
        const inactive = tone === 'dark' ? 'text-white/70 hover:text-white' : 'text-muted hover:text-ink'
        return (
          <button
            key={o.id}
            onClick={() => setConcept(o.id)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition ${
              active ? 'bg-teal text-white shadow-sm' : inactive
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
