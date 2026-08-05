import type { Project } from '../types'
import { useDemoState } from '../context/DemoStateContext'
import { Modal } from './Modal'
import { IconCheck, IconCoin, IconZap } from './icons'
import { formatDate } from '../lib/date'

const PERKS = [
  'GC direct contact — the line to bid',
  'Plans & specs for takeoff',
  'Exact project address',
  'Full Project Fit & Go / No-Go',
  'Ask AI about this project',
]

export function UnlockModal({
  project,
  onClose,
  onUnlocked,
}: {
  project: Project
  onClose: () => void
  onUnlocked: () => void
}) {
  const s = useDemoState()
  const isSub = s.concept === 'subscription'
  const after = Math.max(0, s.remaining - 1)

  function confirm() {
    const result = s.unlockProject(project.id)
    if (result === 'ok' || result === 'already') onUnlocked()
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center gap-2 text-teal">
          <IconZap className="text-[18px]" />
          <span className="text-xs font-bold tracking-wide uppercase">Unlock project</span>
        </div>
        <h3 className="mt-2 text-xl leading-tight font-bold text-ink">{project.name}</h3>

        <div className="mt-4 rounded-xl bg-canvas p-4">
          <div className="text-sm font-semibold text-ink">You&rsquo;ll get</div>
          <ul className="mt-2 space-y-1.5">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink/80">
                <IconCheck className="mt-0.5 text-[15px] text-teal" />
                {p.replace('Plans & specs', `Plans & specs (${project.fileCount} files)`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-teal/30 bg-teal-50 p-3">
          <IconCoin className="text-[20px] text-teal-dark" />
          <div className="text-sm">
            {isSub ? (
              <>
                <div className="font-semibold text-ink">
                  Uses 1 of your {s.capacity} monthly projects
                </div>
                <div className="text-muted">
                  {after} left until {s.resetDate ? formatDate(s.resetDate) : 'reset'}
                </div>
              </>
            ) : (
              <>
                <div className="font-semibold text-ink">Spends 1 credit</div>
                <div className="text-muted">{after} credits left after this</div>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={confirm}
            className="flex-1 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            Unlock project
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold hover:bg-canvas"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
