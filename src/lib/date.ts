// The prototype is pinned to a fixed "today" so scripted states are stable
// across sessions (the research runs in August 2026).
export const TODAY = new Date('2026-08-03T12:00:00')

function atNoon(iso: string): Date {
  return new Date(iso.length > 10 ? iso : `${iso}T12:00:00`)
}

/** First day of the month after `from`, as an ISO date (YYYY-MM-DD). */
export function firstOfNextMonth(from: Date = TODAY): string {
  const next = new Date(from.getFullYear(), from.getMonth() + 1, 1, 12)
  return next.toISOString().slice(0, 10)
}

/** "2026-08-14" → "Aug 14". */
export function formatDate(iso: string): string {
  return atNoon(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** "2026-09-01" → "September 1, 2026". */
export function formatDateLong(iso: string): string {
  return atNoon(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Whole days from `from` until `iso` (never negative). */
export function daysUntil(iso: string, from: Date = TODAY): number {
  const ms = atNoon(iso).getTime() - from.getTime()
  return Math.max(0, Math.round(ms / 86_400_000))
}
