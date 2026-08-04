import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { FeatureFlagToggle } from './FeatureFlagToggle'
import { IconRefresh, IconSliders } from './icons'
import type { BalancePreset } from '../types'
import { START } from '../config/pricing'

export function ResearcherPanel() {
  const s = useDemoState()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)

  const presets: { id: BalancePreset; label: string; hint: string }[] = [
    {
      id: 'normal',
      label: 'Normal',
      hint:
        s.concept === 'subscription'
          ? `${START.subscriptionAllotment} of ${START.subscriptionAllotment}`
          : `${START.prepaidAllowance} credits`,
    },
    { id: 'low', label: `Low · ${START.scriptedRemaining}`, hint: 'scripted moment' },
    { id: 'zero', label: 'Zero', hint: 'out of unlocks' },
  ]

  function close() {
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Prototype settings (research only)"
        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
      >
        <IconSliders className="text-[14px]" />
        Prototype
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={close} />
          <div className="absolute right-0 z-40 mt-2 w-80 rounded-xl border border-line bg-white p-4 text-ink shadow-xl">
            <div className="flex items-center gap-2">
              <IconSliders className="text-[15px] text-teal" />
              <span className="text-sm font-bold">Prototype settings</span>
              <span className="ml-auto rounded bg-gold-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#a8681a] uppercase">
                Research only
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Not part of the product — controls for the moderator.
            </p>

            <div className="mt-3">
              <div className="text-xs font-semibold text-muted uppercase">Concept</div>
              <div className="mt-1.5">
                <FeatureFlagToggle tone="light" />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-muted uppercase">
                {s.concept === 'subscription' ? 'Projects remaining' : 'Credit balance'}
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => s.setBalancePreset(p.id)}
                    className="rounded-lg border border-line px-2 py-1.5 text-center hover:border-teal hover:bg-teal-50"
                  >
                    <div className="text-xs font-bold">{p.label}</div>
                    <div className="text-[10px] text-muted">{p.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-1.5 border-t border-line pt-3">
              <button
                onClick={s.simulateReset}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-canvas"
              >
                <IconRefresh className="text-[14px] text-muted" />
                Simulate month reset
              </button>
              <button
                onClick={() => {
                  s.resetDemo()
                  close()
                  nav('/finder')
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-canvas"
              >
                <IconRefresh className="text-[14px] text-muted" />
                Reset session data (new participant)
              </button>
              <button
                onClick={() => {
                  s.resetAll()
                  close()
                  nav('/')
                }}
                className="w-full rounded-lg px-2 py-1.5 text-left text-sm text-coral hover:bg-coral-50"
              >
                Back to start screen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
