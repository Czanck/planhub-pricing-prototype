/** $99 → "$99" (whole dollars). */
export function currency(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

/** 9.9 → "$9.90" (per-unit pricing). */
export function currency2(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function trim(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

/** 2_000_000 → "$2M", 150_000 → "$150K". */
export function compactUsd(n: number): string {
  if (n >= 1_000_000) return `$${trim(n / 1_000_000)}M`
  if (n >= 1_000) return `$${trim(n / 1_000)}K`
  return `$${n}`
}

/** (2_000_000, 5_000_000) → "$2M–$5M". */
export function valueRange(min: number, max: number): string {
  return `${compactUsd(min)}–${compactUsd(max)}`
}

/** 48_000 → "48,000 SF". */
export function sqft(n: number | null): string {
  return n == null ? '—' : `${n.toLocaleString('en-US')} SF`
}

/** Total size of a set of files, e.g. "480 MB". */
export function totalSize(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return `${Math.round(mb)} MB`
}
