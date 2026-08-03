import type { SVGProps } from 'react'

// Lightweight inline icons (Feather/Lucide-style) so the app stays dependency-free.
function Svg({ children, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  )
}

export const IconSearch = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Svg>
)

export const IconLock = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
)

export const IconBell = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Svg>
)

export const IconBookmark = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </Svg>
)

export const IconBan = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6 18.4 18.4" />
  </Svg>
)

export const IconChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
)

export const IconChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
)

export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
)

export const IconArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
)

export const IconPlus = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const IconMapPin = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
)

export const IconSparkle = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
  </Svg>
)

export const IconCoin = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
  </Svg>
)

export const IconCalendar = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
)

export const IconZap = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
  </Svg>
)

export const IconDownload = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
  </Svg>
)

export const IconOpen = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </Svg>
)

export const IconInfo = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </Svg>
)

export const IconGlobe = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
  </Svg>
)

export const IconSliders = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
  </Svg>
)

export const IconDots = (p: SVGProps<SVGSVGElement>) => (
  <Svg fill="currentColor" stroke="none" {...p}>
    <circle cx="5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="19" cy="12" r="1.6" />
  </Svg>
)

export const IconBars = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 15v3M12 10v8M17 6v12" />
  </Svg>
)

export const IconRefresh = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </Svg>
)

export const IconGrid = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Svg>
)

export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
)

export const IconClipboard = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9z" />
    <path d="M9 11h6M9 15h4" />
  </Svg>
)

export const IconRuler = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M3 15 15 3l6 6L9 21z" />
    <path d="M8 8l2 2M11 5l2 2M5 11l2 2" />
  </Svg>
)

export const IconBriefcase = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </Svg>
)

export const IconBuilding = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M10 21v-3h4v3" />
  </Svg>
)

export const IconPaperPlane = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </Svg>
)
