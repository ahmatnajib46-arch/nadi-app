import { useEffect, useState } from 'react'

import { Icon } from '@/shared/components/Icon'
import { cn } from '@/shared/utils/cn'
import { getGreeting } from '@/shared/utils/greeting'
import { useUiStore } from '@/stores/uiStore'

const COLLAPSE_DELAY_MS = 3000
const EXPANDED_HEIGHT = '6.5rem'
const COMPACT_HEIGHT = '3.5rem'

/**
 * Header adaptif: mengembang saat pertama dimuat dan setiap wajah berganti,
 * lalu menciut ke versi ringkas setelah ±3 detik.
 */
export function AdaptiveHeader() {
  const activeFace = useUiStore((state) => state.activeFace)
  const [isExpanded, setIsExpanded] = useState(true)
  const greeting = getGreeting()

  useEffect(() => {
    setIsExpanded(true)
    const timeout = window.setTimeout(() => setIsExpanded(false), COLLAPSE_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [activeFace])

  return (
    <header
      data-testid="adaptive-header"
      data-expanded={isExpanded}
      style={{ height: isExpanded ? EXPANDED_HEIGHT : COMPACT_HEIGHT }}
      className="relative z-10 shrink-0 overflow-hidden border-b border-soft-white/5 bg-near-black/80 backdrop-blur-xl transition-[height] duration-300 ease-out motion-reduce:transition-none"
    >
      <div className="flex h-full items-center justify-between gap-3 px-gutter">
        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-muted-sage/80">
            NADI
          </p>
          <h1 className="mt-0.5 truncate text-[1.375rem] font-semibold leading-tight tracking-tight text-soft-white">
            {greeting}
          </h1>
          <div
            className={cn(
              'grid transition-all duration-300 ease-out motion-reduce:transition-none',
              isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <p className="overflow-hidden text-xs leading-relaxed text-muted-sage">
              Ruang pribadi untuk mengelola keuanganmu.
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Buka profil"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-soft-white/10 bg-soft-white/5 text-soft-white/80 transition-colors duration-200 hover:border-soft-mint/30 hover:text-soft-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-mint"
        >
          <Icon name="user" className="size-5" />
        </button>
      </div>
    </header>
  )
}
