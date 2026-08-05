import { Link } from 'react-router-dom'
import { BalanceWidget } from './BalanceWidget'
import { ResearcherPanel } from '../components/ResearcherPanel'
import { COMPANY } from '../data/company'
import { IconBell, IconChevronDown } from '../components/icons'

export function TopBar() {
  return (
    <header className="z-20 flex items-center gap-3 border-b border-white/10 bg-navy px-4 py-2.5">
      {/* peripheral product nav — visual only */}
      <nav className="hidden items-center gap-4 text-sm text-white/60 xl:flex">
        <span className="rounded-full bg-teal px-3 py-1.5 text-xs font-semibold text-white">
          Request a Demo
        </span>
        <button className="hover:text-white">Support</button>
        <button className="hover:text-white">Messages</button>
        <button className="hover:text-white">Activity</button>
      </nav>

      <div className="ml-auto flex items-center gap-2.5">
        <Link
          to="/membership"
          className="hidden rounded-full bg-gold/90 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95 sm:inline-block"
        >
          Pricing
        </Link>

        <BalanceWidget />

        <span className="mx-0.5 hidden h-6 w-px bg-white/10 sm:block" />

        <div className="hidden md:flex">
          <ResearcherPanel />
        </div>

        <button className="hidden rounded-full p-2 text-white/70 hover:bg-white/5 hover:text-white lg:inline-flex">
          <IconBell className="text-[16px]" />
        </button>

        <button className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-white/5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-teal text-xs font-bold text-white">
            {COMPANY.initials}
          </span>
          <span className="hidden text-sm font-medium text-white lg:inline">{COMPANY.userName}</span>
          <IconChevronDown className="text-[13px] text-white/60" />
        </button>
      </div>
    </header>
  )
}
