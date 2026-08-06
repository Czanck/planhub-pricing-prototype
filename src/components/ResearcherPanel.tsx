import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { FeatureFlagToggle } from './FeatureFlagToggle'
import { IconRefresh, IconSliders } from './icons'
import type { BalancePreset } from '../types'
import { START } from '../config/pricing'

/**
 * Moderator-only controls. No visible affordance (so participants never see it) —
 * toggle with the keyboard shortcut Shift+P. Esc or click-away closes it.
 */
export function ResearcherPanel() {
  const s = useDemoState()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null
      const typing =
        !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (!typing && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const presets: { id: BalancePreset; label: string; hint: string }[] = [
    {
      id: 'normal',
      label: 'Normal',
      hint:
        s.concept === 'subscription'
          ? `${START.subscriptionAllotment} of ${START.subscriptionAllotment}`
          : `${START.prepaidBalance} unlocks`,
    },
    { id: 'low', label: `Low · ${START.scriptedRemaining}`, hint: 'scripted moment' },
    { id: 'zero', label: 'Zero', hint: 'out of unlocks' },
  ]

  function close() {
    setOpen(false)
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={close} />
      <div className="fixed top-16 right-4 z-50 w-80 rounded-xl border border-line bg-white p-4 text-ink shadow-xl">
        <div className="flex items-center gap-2">
          <IconSliders className="text-[15px] text-teal" />
          <span className="text-sm font-bold">Prototype settings</span>
          <span className="ml-auto rounded bg-gold-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#a8681a] uppercase">
            Research only
          </span>
          <button
            onClick={close}
            className="rounded p-1 text-muted hover:bg-canvas"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mt-1 text-xs text-muted">
          Moderator controls (hidden from participants). Toggle with <b>Shift + P</b>.
        </p>

        <div className="mt-3">
          <div className="text-xs font-semibold text-muted uppercase">Concept</div>
          <div className="mt-1.5">
            <FeatureFlagToggle tone="light" />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-muted uppercase">
            {s.concept === 'subscription' ? 'Projects remaining' : 'Unlock balance'}
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
          {s.concept === 'subscription' && (
            <button
              onClick={s.simulateReset}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-canvas"
            >
              <IconRefresh className="text-[14px] text-muted" />
              Simulate month reset
            </button>
          )}
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
  )
}
