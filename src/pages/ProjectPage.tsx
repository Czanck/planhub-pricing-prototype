import { useState, type ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { Project } from '../types'
import { getProject } from '../data/projects'
import { useDemoState } from '../context/DemoStateContext'
import { Badge, Card, Chip } from '../components/ui'
import { BlurLock } from '../components/BlurLock'
import { MarketIntelligence } from '../components/MarketIntelligence'
import { ProjectFitCard } from '../components/ProjectFitCard'
import { UnlockModal } from '../components/UnlockModal'
import { ZeroBalanceModal } from '../components/ZeroBalanceModal'
import { LowBalanceNudge } from '../components/LowBalanceNudge'
import {
  IconArrowRight,
  IconBan,
  IconBookmark,
  IconCheck,
  IconDownload,
  IconLock,
  IconMapPin,
  IconPaperPlane,
  IconSparkle,
} from '../components/icons'
import { sqft, totalSize, valueRange } from '../lib/format'
import { formatDate } from '../lib/date'

type Tab = 'overview' | 'files' | 'suppliers'
type ModalKind = 'none' | 'unlock' | 'zero'

function describe(p: Project): string {
  const lead = p.trades.slice(0, 4).join(', ')
  return `Bids are requested for ${p.name}, a ${p.projectType.toLowerCase()} ${p.buildingUse.toLowerCase()} project located in ${p.approxLocation}. Scope of work includes ${lead}${
    p.trades.length > 4 ? ', and more' : ''
  }. ${p.laborStatus} applies. Bidding is currently ${p.status.toLowerCase()}.`
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-right text-sm font-semibold text-ink">{children}</span>
    </div>
  )
}

function FauxMap({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="relative h-40 overflow-hidden rounded-lg border border-line bg-[linear-gradient(0deg,#eef1f3_1px,transparent_1px),linear-gradient(90deg,#eef1f3_1px,transparent_1px)] bg-[size:22px_22px] bg-canvas">
      <div className="absolute inset-0 flex items-center justify-center">
        {unlocked ? (
          <div className="flex flex-col items-center text-coral">
            <IconMapPin className="text-[30px]" />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full border-2 border-teal/40 bg-teal/15" />
        )}
      </div>
      <span className="absolute right-2 bottom-2 rounded bg-white/80 px-1.5 py-0.5 text-[10px] text-muted">
        {unlocked ? 'Exact location' : 'Approximate area'}
      </span>
    </div>
  )
}

function GcAndUnlock({
  project,
  unlocked,
  onUnlock,
}: {
  project: Project
  unlocked: boolean
  onUnlock: () => void
}) {
  const s = useDemoState()
  const gc = project.gcs[0]
  const isSub = s.concept === 'subscription'

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line p-4">
        <h3 className="font-semibold text-ink">General Contractors</h3>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-canvas text-[11px] font-bold text-muted">
            {gc.name
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')}
          </span>
          <div className="min-w-0">
            <div className="truncate font-semibold text-ink">{gc.name}</div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Badge tone="gray">{gc.biddingStatus}</Badge>
              Due {formatDate(gc.bidDue)}
            </div>
          </div>
        </div>

        {unlocked ? (
          <div className="mt-3 space-y-1.5 rounded-lg bg-teal-50 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Contact</span>
              <span className="font-semibold text-ink">{gc.contactName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Phone</span>
              <span className="font-semibold text-ink">{gc.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Email</span>
              <span className="font-semibold text-ink">{gc.email}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex-1 rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white">
                Message GC
              </button>
              <button className="flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold">
                Call
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-canvas p-3 text-sm">
            <span className="text-muted">Contact details</span>
            <BlurLock width="w-28" />
          </div>
        )}
      </div>

      {!unlocked && (
        <div className="border-t border-line bg-white p-4">
          <p className="text-center text-sm text-muted">
            GC contacts, project files &amp; Ask-AI unlock together
          </p>
          <button
            onClick={onUnlock}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-3 text-sm font-bold text-white hover:bg-teal-dark"
          >
            {isSub
              ? `Unlock this project — 1 of ${s.capacity}`
              : 'Unlock this project — 1 unlock'}
            <IconArrowRight className="text-[15px]" />
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            {isSub
              ? `You'll have ${Math.max(0, s.remaining - 1)} unlocks left this month`
              : `${s.remaining} unlocks left`}
          </p>
        </div>
      )}
    </Card>
  )
}

function AskAiCard({ unlocked, onUnlock }: { unlocked: boolean; onUnlock: () => void }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <IconSparkle className="text-[17px] text-teal" />
        <h3 className="font-semibold text-ink">Ask AI · Go / No-Go</h3>
        {!unlocked && <IconLock className="ml-auto text-[14px] text-muted" />}
      </div>
      {unlocked ? (
        <div className="mt-3">
          <div className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-muted">
            Ask a question about this project…
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Is this a good fit for me?', 'What are the risks?', 'Summarize the specs'].map((q) => (
              <Chip key={q}>{q}</Chip>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={onUnlock} className="mt-2 text-left text-sm text-muted hover:text-ink">
          Unlock to qualify this job fast with AI.
        </button>
      )}
    </Card>
  )
}

function FilesTab({
  project,
  unlocked,
  onUnlock,
}: {
  project: Project
  unlocked: boolean
  onUnlock: () => void
}) {
  const totalMb = project.files.reduce((sum, f) => sum + f.sizeMb, 0)

  if (!unlocked) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-muted">
          <IconLock className="text-[22px]" />
        </div>
        <h3 className="mt-3 font-semibold text-ink">
          Unlock this project to download plans &amp; specs
        </h3>
        <p className="mt-1 text-sm text-muted">
          {project.fileCount} files · {totalSize(totalMb)} · plans, specs, addenda &amp; bid docs
        </p>
        <div className="mx-auto mt-4 max-w-md space-y-2">
          {project.files.slice(0, 4).map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-3 py-2"
            >
              <span className="h-4 w-4 rounded bg-line" />
              <span className="h-3 flex-1 rounded bg-line" />
              <IconLock className="text-[13px] text-muted" />
            </div>
          ))}
        </div>
        <button
          onClick={onUnlock}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
        >
          Unlock project <IconArrowRight className="text-[15px]" />
        </button>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line p-4">
        <h3 className="font-semibold text-ink">Project Files ({project.fileCount})</h3>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white">
          <IconDownload className="text-[14px]" /> Download all
        </button>
      </div>
      <div className="divide-y divide-line">
        {project.files.map((f) => (
          <div key={f.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="grid h-8 w-8 place-items-center rounded bg-canvas text-[10px] font-bold text-muted uppercase">
              {f.type}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink">{f.name}</div>
              <div className="text-xs text-muted">
                {f.category} · {f.sizeMb} MB
              </div>
            </div>
            <IconDownload className="text-[16px] text-muted hover:text-teal" />
          </div>
        ))}
        {project.fileCount > project.files.length && (
          <div className="px-4 py-2.5 text-center text-xs text-muted">
            + {project.fileCount - project.files.length} more files
          </div>
        )}
      </div>
    </Card>
  )
}

export function ProjectPage() {
  const { projectId } = useParams()
  const project = getProject(projectId)
  const s = useDemoState()
  const nav = useNavigate()
  const [tab, setTab] = useState<Tab>('overview')
  const [modal, setModal] = useState<ModalKind>('none')

  if (!project) return <Navigate to="/finder" replace />
  const unlocked = s.isUnlocked(project.id)

  function requestUnlock() {
    setModal(s.canUnlock ? 'unlock' : 'zero')
  }

  const tabs: { id: Tab; label: string; locked?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'files', label: 'Files', locked: !unlocked },
    { id: 'suppliers', label: 'Suppliers' },
  ]

  return (
    <div className="pb-24">
      {/* header */}
      <div className="border-b border-line bg-white px-6 pt-5">
        <button
          onClick={() => nav('/finder')}
          className="text-sm font-medium text-muted hover:text-ink"
        >
          ← Project Finder
        </button>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-ink">{project.name}</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted">
              <IconMapPin className="text-[14px]" /> {project.approxLocation}
              {unlocked ? (
                <Badge tone="teal">
                  <IconCheck className="text-[11px]" /> Unlocked
                </Badge>
              ) : (
                <Badge tone="teal">Open · free to evaluate</Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <button className="rounded-lg border border-line p-2 hover:bg-canvas">
              <IconBookmark className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-4 flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 border-b-2 pb-2.5 text-sm font-semibold transition ${
                tab === t.id
                  ? 'border-teal text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {t.label}
              {t.locked && <IconLock className="text-[12px] text-gold" />}
            </button>
          ))}
        </div>
      </div>

      {/* body */}
      <div className="p-6">
        <div className="mb-4">
          <LowBalanceNudge />
        </div>

        {tab === 'overview' && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
            {/* left column */}
            <div className="space-y-5">
              <Card className="p-5">
                <h3 className="font-semibold text-ink">About This Project</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{describe(project)}</p>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-ink">Project Details</h3>
                <div className="mt-2">
                  <DetailRow label="Project Value">
                    {valueRange(project.valueMin, project.valueMax)}
                  </DetailRow>
                  <DetailRow label="Project Size">{sqft(project.sizeSf)}</DetailRow>
                  <DetailRow label="Bid Due Date">
                    <span className="text-coral">{formatDate(project.bidDue)}</span>
                  </DetailRow>
                  <DetailRow label="Project Status">{project.status}</DetailRow>
                  <DetailRow label="Construction Type">{project.constructionType}</DetailRow>
                  <DetailRow label="Project Type">{project.projectType}</DetailRow>
                  <DetailRow label="Building Use">{project.buildingUse}</DetailRow>
                  <DetailRow label="Sector / Labor">
                    {project.sector} · {project.laborStatus}
                  </DetailRow>
                  <DetailRow label="Exact Address">
                    {unlocked ? (
                      <span>{project.exactAddress}</span>
                    ) : (
                      <BlurLock width="w-40" />
                    )}
                  </DetailRow>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-ink">Trades Needed</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.trades.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </Card>

              <MarketIntelligence project={project} />
            </div>

            {/* right column */}
            <div className="space-y-5">
              <ProjectFitCard project={project} unlocked={unlocked} onUnlock={requestUnlock} />
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ink">Project Location</h3>
                  <span className="text-xs font-medium text-muted">{project.distanceMi} mi away</span>
                </div>
                <div className="mt-3">
                  <FauxMap unlocked={unlocked} />
                </div>
                <p className="mt-2 text-sm text-ink/80">
                  {unlocked ? project.exactAddress : project.approxLocation}
                </p>
              </Card>
              <GcAndUnlock project={project} unlocked={unlocked} onUnlock={requestUnlock} />
              <AskAiCard unlocked={unlocked} onUnlock={requestUnlock} />
            </div>
          </div>
        )}

        {tab === 'files' && (
          <div className="max-w-3xl">
            <FilesTab project={project} unlocked={unlocked} onUnlock={requestUnlock} />
          </div>
        )}

        {tab === 'suppliers' && (
          <Card className="p-5">
            <h3 className="font-semibold text-ink">Suppliers</h3>
            <p className="mt-1 text-sm text-muted">
              Distributors and reps serving this project&rsquo;s area.
            </p>
            <div className="mt-3 divide-y divide-line">
              {['Ferguson — Las Vegas', 'Western Nevada Supply', 'Border States Electric'].map((n) => (
                <div key={n} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-medium text-ink">{n}</span>
                  <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:bg-canvas">
                    Request quote
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* sticky action bar */}
      <div className="fixed right-0 bottom-0 left-64 z-20 border-t border-line bg-white/95 px-6 py-3 backdrop-blur">
        <div className="flex items-center justify-end gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-coral/40 px-4 py-2 text-sm font-semibold text-coral hover:bg-coral-50">
            <IconBan className="text-[15px]" /> Not Interested
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-canvas">
            <IconBookmark className="text-[15px]" /> Intend to Bid
          </button>
          <button
            disabled={!unlocked}
            title={unlocked ? undefined : 'Unlock to get GC contact & bid docs'}
            className="inline-flex items-center gap-1.5 rounded-full bg-teal px-5 py-2 text-sm font-semibold text-white hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconPaperPlane className="text-[15px]" /> Submit Bid
          </button>
        </div>
      </div>

      {modal === 'unlock' && (
        <UnlockModal
          project={project}
          onClose={() => setModal('none')}
          onUnlocked={() => setTab('overview')}
        />
      )}
      {modal === 'zero' && <ZeroBalanceModal onClose={() => setModal('none')} />}
    </div>
  )
}
