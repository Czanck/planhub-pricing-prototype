import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

// ---- Button -----------------------------------------------------------------

type Variant = 'primary' | 'outline' | 'ghost' | 'danger' | 'gold'

const variants: Record<Variant, string> = {
  primary: 'bg-teal text-white hover:bg-teal-dark border border-transparent',
  outline: 'bg-white text-ink hover:bg-canvas border border-line',
  ghost: 'bg-transparent text-muted hover:text-ink hover:bg-canvas border border-transparent',
  danger: 'bg-white text-coral hover:bg-coral-50 border border-coral/40',
  gold: 'bg-gold text-white hover:brightness-95 border border-transparent',
}

type ButtonProps = {
  variant?: Variant
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

// ---- Card -------------------------------------------------------------------

export function Card({
  className = '',
  children,
  ...rest
}: { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-xl border border-line bg-white ${className}`} {...rest}>
      {children}
    </div>
  )
}

// ---- Badge ------------------------------------------------------------------

type Tone = 'teal' | 'gold' | 'coral' | 'gray' | 'navy'

const tones: Record<Tone, string> = {
  teal: 'bg-teal-50 text-teal-dark',
  gold: 'bg-gold-50 text-[#a8681a]',
  coral: 'bg-coral-50 text-coral',
  gray: 'bg-canvas text-muted',
  navy: 'bg-navy text-white',
}

export function Badge({
  tone = 'gray',
  className = '',
  children,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

// ---- Chip (trade tags) ------------------------------------------------------

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-canvas px-2 py-1 text-xs font-medium text-ink/80">
      {children}
    </span>
  )
}
