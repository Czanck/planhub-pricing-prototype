import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS, HERO_PROJECT_ID } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { useDemoState } from '../context/DemoStateContext'
import { Chip } from '../components/ui'
import {
  IconArrowRight,
  IconChevronDown,
  IconLock,
  IconMapPin,
  IconSearch,
} from '../components/icons'
import { sqft, valueRange } from '../lib/format'
import { formatDate } from '../lib/date'
import type { Project } from '../types'

const SORTED = [...PROJECTS].sort((a, b) => a.distanceMi - b.distanceMi)

function costHint(concept: string, capacity: number | null, remaining: number): string {
  if (concept === 'subscription') return `Uses 1 of your ${capacity} monthly projects`
  return `Costs 1 credit · ${remaining} left`
}

function PreviewPanel({ project }: { project: Project }) {
  const s = useDemoState()
  const nav = useNavigate()
  const unlocked = s.isUnlocked(project.id)
  const bars = project.marketIntel.demandByTrade.slice(0, 3)
  const maxBar = Math.max(...bars.map((b) => b.count), 1)

  return (
    <div className="sticky top-6 rounded-xl border border-line bg-white">
      <div className="border-b border-line p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-semibold text-muted">
            {project.projectType}
          </span>
          {project.distanceMi > 60 && (
            <span className="rounded-full bg-gold-50 px-2 py-0.5 text-[11px] font-semibold text-[#a8681a]">
              {project.distanceMi} mi — roam
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg leading-tight font-bold text-ink">{project.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted">
          <IconMapPin className="text-[14px]" /> {project.approxLocation}
        </div>
      </div>

      <div className="space-y-3 p-5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Est. value</span>
          <span className="font-semibold">{valueRange(project.valueMin, project.valueMax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Size</span>
          <span className="font-semibold">{sqft(project.sizeSf)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Bid due</span>
          <span className="font-semibold text-coral">{formatDate(project.bidDue)}</span>
        </div>

        <div>
          <div className="mb-1.5 text-muted">Trades needed</div>
          <div className="flex flex-wrap gap-1.5">
            {project.trades.slice(0, 5).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
            {project.trades.length > 5 && (
              <span className="self-center text-xs font-medium text-teal-dark">
                +{project.trades.length - 5} more
              </span>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-canvas p-3">
          <div className="text-xs font-semibold text-muted">
            {project.marketIntel.views} people viewed this project
          </div>
          <div className="mt-2 space-y-1">
            {bars.map((b) => (
              <div key={b.trade} className="flex items-center gap-2">
                <span className="w-28 truncate text-xs text-ink/70">{b.trade}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <span
                    className="block h-full rounded-full bg-teal/60"
                    style={{ width: `${(b.count / maxBar) * 100}%` }}
                  />
                </span>
                <span className="w-5 text-right text-xs text-muted">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line p-5">
        {unlocked ? (
          <>
            <div className="mb-2 text-sm font-medium text-teal-dark">
              ✓ Unlocked — full details available
            </div>
            <button
              onClick={() => nav(`/project/${project.id}`)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Open project <IconArrowRight className="text-[15px]" />
            </button>
          </>
        ) : (
          <>
            <div className="mb-2 flex items-start gap-2 text-xs text-muted">
              <IconLock className="mt-0.5 text-[13px]" />
              <span>Unlock to reveal GC contacts, plans &amp; specs, and full Project Fit.</span>
            </div>
            <button
              onClick={() => nav(`/project/${project.id}`)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              View full project <IconArrowRight className="text-[15px]" />
            </button>
            <div className="mt-2 text-center text-xs text-muted">
              {costHint(s.concept, s.capacity, s.remaining)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function ProjectFinder() {
  const [selectedId, setSelectedId] = useState(HERO_PROJECT_ID)
  const selected = useMemo(
    () => SORTED.find((p) => p.id === selectedId) ?? SORTED[0],
    [selectedId],
  )

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">Project Finder</h1>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-dark">
          Roam anywhere
        </span>
      </div>

      {/* toolbar (visual) */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-muted">
          <IconSearch className="text-[16px]" />
          <input
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            placeholder="Search projects, trades, cities…"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium">
          Z&rsquo;s Filter <IconChevronDown className="text-[14px] text-muted" />
        </button>
        <span className="text-sm text-muted">
          Found <b className="text-ink">{SORTED.length}</b> projects
        </span>
        <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-semibold text-muted">
          Active Filters · 3
        </span>
        <div className="ml-auto flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium">
          Sort: Distance <IconChevronDown className="text-[14px] text-muted" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="divide-y divide-line">
            {SORTED.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                selected={p.id === selectedId}
                onSelect={() => setSelectedId(p.id)}
              />
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-line px-4 py-3 text-xs text-muted">
            <span>
              Showing 1–{SORTED.length} of {SORTED.length}
            </span>
            <span>Page 1 of 1</span>
          </div>
        </div>

        <aside className="hidden xl:block">
          <PreviewPanel project={selected} />
        </aside>
      </div>
    </div>
  )
}
