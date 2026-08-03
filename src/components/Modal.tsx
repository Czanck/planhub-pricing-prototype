import { useEffect, type ReactNode } from 'react'

export function Modal({
  onClose,
  children,
  size = 'md',
}: {
  onClose: () => void
  children: ReactNode
  size?: 'md' | 'lg'
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const width = size === 'lg' ? 'max-w-lg' : 'max-w-md'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${width} rounded-2xl border border-line bg-white shadow-2xl`}>
        {children}
      </div>
    </div>
  )
}
