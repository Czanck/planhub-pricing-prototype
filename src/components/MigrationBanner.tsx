import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconGlobe } from './icons'

/** Thin roam-anywhere reminder shown atop the app (answers the geography question). */
export function MigrationBanner() {
  const [show, setShow] = useState(true)
  if (!show) return null
  return (
    <div className="flex items-center gap-3 border-b border-teal/20 bg-teal-50 px-6 py-2 text-sm">
      <IconGlobe className="shrink-0 text-[16px] text-teal-dark" />
      <span className="text-ink">
        <b className="font-semibold">New:</b> browse <b>every</b> project, anywhere — no radius or
        region. You only spend an unlock on the ones you choose.
      </span>
      <Link
        to="/welcome"
        className="ml-auto shrink-0 font-semibold text-teal-dark hover:underline"
      >
        How it works
      </Link>
      <button
        onClick={() => setShow(false)}
        className="shrink-0 rounded p-1 text-muted hover:bg-white/60"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}
