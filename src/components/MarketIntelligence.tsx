import type { Project } from '../types'
import { Card } from './ui'
import { IconBars } from './icons'

export function MarketIntelligence({ project }: { project: Project }) {
  const bars = project.marketIntel.demandByTrade
  const max = Math.max(...bars.map((b) => b.count), 1)

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <IconBars className="text-[17px] text-teal" />
        <h3 className="font-semibold text-ink">Market Intelligence</h3>
        <span className="ml-auto rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-teal-dark uppercase">
          Free
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        <b className="text-ink">{project.marketIntel.views}</b> people viewed this project ·{' '}
        <b className="text-ink">{project.marketIntel.intendToBid}</b> intend to bid
      </p>
      <div className="mt-3 space-y-2">
        {bars.map((b) => (
          <div key={b.trade} className="flex items-center gap-3">
            <span className="w-40 truncate text-sm text-ink/80">{b.trade}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full bg-teal/60"
                style={{ width: `${(b.count / max) * 100}%` }}
              />
            </span>
            <span className="w-6 text-right text-sm font-medium text-muted">{b.count}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
