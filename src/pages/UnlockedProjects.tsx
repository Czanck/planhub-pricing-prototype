import { Link, useNavigate } from 'react-router-dom'
import { useDemoState } from '../context/DemoStateContext'
import { PROJECTS } from '../data/projects'
import { Card } from '../components/ui'
import { IconArrowRight, IconCheck } from '../components/icons'
import { valueRange } from '../lib/format'

export function UnlockedProjects() {
  const s = useDemoState()
  const nav = useNavigate()
  const isSub = s.concept === 'subscription'
  const ids = isSub
    ? s.state.subscription.unlockedProjectIds
    : s.state.prepaid.unlockedProjectIds
  const list = PROJECTS.filter((p) => ids.includes(p.id))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Unlocked Projects</h1>
      <p className="mt-1 text-muted">
        {isSub
          ? `${s.used} of ${s.capacity} projects used this cycle · resets refill your allowance.`
          : `${s.used} of up to ${s.capacity} credits used this month · ${s.remaining} left · unused expire on the 1st.`}{' '}
        Revisiting an unlocked project never charges you again.
      </p>

      {list.length === 0 ? (
        <Card className="mt-6 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-muted">
            <IconCheck className="text-[22px]" />
          </div>
          <h3 className="mt-3 font-semibold text-ink">No unlocked projects yet</h3>
          <p className="mt-1 text-sm text-muted">
            Browse the finder and unlock a project to see it here.
          </p>
          <button
            onClick={() => nav('/finder')}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            Go to Project Finder <IconArrowRight className="text-[15px]" />
          </button>
        </Card>
      ) : (
        <Card className="mt-6 overflow-hidden">
          <div className="divide-y divide-line">
            {list.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-teal-dark uppercase">
                  <IconCheck className="text-[11px]" /> Unlocked
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-ink">{p.name}</div>
                  <div className="text-sm text-muted">
                    {p.city}, {p.state} · {valueRange(p.valueMin, p.valueMax)} ·{' '}
                    {isSub ? '1 of your monthly projects' : '1 credit'}
                  </div>
                </div>
                <Link
                  to={`/project/${p.id}`}
                  className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:bg-canvas"
                >
                  Open
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
