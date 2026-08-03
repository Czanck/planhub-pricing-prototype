import { IconLock } from './icons'

/**
 * A locked placeholder. Renders a neutral gray bar + lock — NOT the real value
 * blurred under CSS — so participants can't read gated content via devtools.
 */
export function BlurLock({ width = 'w-24' }: { width?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      <span className={`inline-block h-3.5 rounded bg-line ${width}`} />
      <IconLock className="text-[12px] text-muted" />
    </span>
  )
}
