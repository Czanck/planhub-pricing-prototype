import type { Project } from '../types'
import { useDemoState } from '../context/DemoStateContext'
import { IconBan, IconBookmark, IconCheck } from './icons'
import { formatDate } from '../lib/date'

export function ProjectCard({
  project,
  selected,
  onSelect,
}: {
  project: Project
  selected: boolean
  onSelect: () => void
}) {
  const { isUnlocked } = useDemoState()
  const unlocked = isUnlocked(project.id)
  const far = project.distanceMi > 60

  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left transition ${
        selected ? 'border-teal bg-teal-50/60' : 'border-transparent hover:bg-canvas'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-teal" />
          <span className="truncate font-semibold text-ink">{project.name}</span>
          {unlocked && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-teal-dark uppercase">
              <IconCheck className="text-[11px]" /> Unlocked
            </span>
          )}
        </div>
        <div className="mt-0.5 truncate pl-4 text-sm text-muted">
          {project.city}, {project.state}
        </div>
      </div>

      <span className="hidden shrink-0 rounded bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-dark sm:inline">
        PlanHub
      </span>
      <span
        className={`hidden w-16 shrink-0 text-right text-sm md:inline ${
          far ? 'font-medium text-gold' : 'text-muted'
        }`}
      >
        {project.distanceMi} mi
      </span>
      <span className="w-24 shrink-0 text-right text-sm font-semibold text-coral">
        Due {formatDate(project.bidDue)}
      </span>
      <span className="hidden shrink-0 items-center gap-2 text-muted lg:flex">
        <IconBookmark className="text-[15px]" />
        <IconBan className="text-[15px]" />
      </span>
    </button>
  )
}
