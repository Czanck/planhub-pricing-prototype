import type { ReactNode } from 'react'
import type { Project, ProjectFit } from '../types'
import { Badge, Card } from './ui'
import { BlurLock } from './BlurLock'
import { IconCheck, IconLock, IconSparkle } from './icons'

function GoBadge({ value }: { value: ProjectFit['goNoGo'] }) {
  const tone =
    value === 'Go' || value === 'Lean Go' ? 'teal' : value === 'Caution' ? 'gold' : 'coral'
  return <Badge tone={tone}>{value}</Badge>
}

function Row({
  label,
  ok,
  children,
}: {
  label: string
  ok?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-2 first:border-t-0 first:pt-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="flex items-center gap-1.5 text-right text-sm font-medium text-ink">
        {ok !== undefined && ok && <IconCheck className="text-[14px] text-teal" />}
        {children}
      </span>
    </div>
  )
}

export function ProjectFitCard({
  project,
  unlocked,
  onUnlock,
}: {
  project: Project
  unlocked: boolean
  onUnlock: () => void
}) {
  const fit = project.fit

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line p-4">
        <IconSparkle className="text-[17px] text-teal" />
        <h3 className="font-semibold text-ink">Project Fit</h3>
        {!unlocked && (
          <span className="ml-auto">
            <Badge tone="gold">Preview · unlock for full</Badge>
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-ink">{fit.headline}</span>
          {unlocked && <GoBadge value={fit.goNoGo} />}
        </div>
        {unlocked ? (
          <p className="mt-1 text-sm text-muted">{fit.blurredReason}</p>
        ) : (
          <div className="mt-2 mb-1 flex items-center gap-1.5">
            <span className="inline-block h-3.5 w-3/4 rounded bg-line" />
            <IconLock className="text-[12px] text-muted" />
          </div>
        )}

        <div className="mt-3">
          <Row label="Matches your trades" ok={fit.matchesTrades.value}>
            {fit.matchesTrades.trades.length ? fit.matchesTrades.trades.join(' · ') : 'No overlap'}
          </Row>
          <Row label="Within your typical job size" ok={fit.withinJobSize.value}>
            {fit.withinJobSize.label}
          </Row>
          <Row label="Timeline vs your capacity">
            {unlocked ? fit.timelineVsCapacity : <BlurLock width="w-32" />}
          </Row>
          <Row label="Win odds vs competition">
            {unlocked ? fit.winOddsVsCompetition : <BlurLock width="w-28" />}
          </Row>
        </div>
      </div>

      {!unlocked && (
        <button
          onClick={onUnlock}
          className="flex w-full items-center justify-center gap-1.5 border-t border-line p-3 text-sm font-semibold text-teal-dark hover:bg-teal-50"
        >
          <IconLock className="text-[13px]" /> Unlock for the full Go / No-Go analysis
        </button>
      )}
    </Card>
  )
}
