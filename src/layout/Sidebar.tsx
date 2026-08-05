import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router-dom'
import { PlanStatusCard } from './PlanStatusCard'
import { COMPANY } from '../data/company'
import {
  IconBriefcase,
  IconBuilding,
  IconClipboard,
  IconGlobe,
  IconGrid,
  IconPaperPlane,
  IconRuler,
  IconSearch,
} from '../components/icons'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal">
        <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
      </span>
      <span className="text-lg font-bold tracking-tight text-white">planHub</span>
      <span className="rounded bg-teal/25 px-1.5 py-0.5 text-[10px] font-bold text-teal-100">2.0</span>
    </div>
  )
}

function NavRow({ icon: Icon, label, to }: { icon: IconType; label: string; to: string | null }) {
  const body = (active: boolean) => (
    <span
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active ? 'bg-teal text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="shrink-0 text-[17px]" />
      {label}
    </span>
  )
  if (!to) {
    return (
      <button type="button" className="w-full text-left">
        {body(false)}
      </button>
    )
  }
  return <NavLink to={to}>{({ isActive }) => body(isActive)}</NavLink>
}

const WORKSPACE: { label: string; icon: IconType; to: string | null }[] = [
  { label: 'Network', icon: IconGlobe, to: null },
  { label: 'Project Finder', icon: IconSearch, to: '/finder' },
  { label: 'Bid Board', icon: IconClipboard, to: null },
  { label: 'Takeoff', icon: IconRuler, to: null },
  { label: 'Job Board', icon: IconBriefcase, to: null },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-navy">
      <div className="px-5 py-4">
        <Logo />
      </div>

      <nav className="mt-5 space-y-0.5 px-3">
        <NavRow icon={IconGrid} label="Dashboard" to="/dashboard" />
      </nav>

      <div className="mt-5 px-5 text-[11px] font-semibold tracking-widest text-white/40 uppercase">
        Workspace
      </div>
      <nav className="mt-1 space-y-0.5 px-3">
        {WORKSPACE.map((w) => (
          <NavRow key={w.label} icon={w.icon} label={w.label} to={w.to} />
        ))}
      </nav>

      <div className="mt-4 px-3">
        <div className="flex items-start gap-2.5 rounded-xl bg-[#5b57e0] p-3 text-white">
          <IconPaperPlane className="mt-0.5 text-[16px]" />
          <div>
            <div className="text-sm font-semibold">Invite Your Team</div>
            <div className="text-[11px] text-white/70">Maximize your 3 free seats</div>
          </div>
        </div>
      </div>

      <nav className="mt-3 space-y-0.5 px-3">
        <NavRow icon={IconBuilding} label="Company Profile" to={null} />
      </nav>

      <div className="mt-auto space-y-3 p-3">
        <PlanStatusCard />
        <div className="flex items-center gap-2 px-1">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-[11px] font-bold text-white/80">
            ZC
          </span>
          <span className="text-sm font-medium text-white/80">{COMPANY.name}</span>
        </div>
        <button className="w-full rounded-lg bg-gold py-2 text-sm font-semibold text-white hover:brightness-95">
          Account Overview
        </button>
      </div>
    </aside>
  )
}
