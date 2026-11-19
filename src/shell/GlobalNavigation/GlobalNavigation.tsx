import { Icon } from '@/shared/components/Icon'
import { FACES } from '@/shared/constants/faces'
import { cn } from '@/shared/utils/cn'
import { useUiStore } from '@/stores/uiStore'

/**
 * Navigasi global tiga wajah. Selalu terlihat di semua wajah.
 */
export function GlobalNavigation() {
  const activeFace = useUiStore((state) => state.activeFace)
  const setActiveFace = useUiStore((state) => state.setActiveFace)

  return (
    <nav
      aria-label="Navigasi utama"
      className="relative z-10 shrink-0 border-b border-soft-white/5 bg-near-black/70 px-gutter py-2 backdrop-blur-xl"
    >
      <ul className="flex items-center gap-1 rounded-pill border border-soft-white/10 bg-charcoal/60 p-1">
        {FACES.map((face, index) => {
          const isActive = index === activeFace

          return (
            <li key={face.id} className="flex-1">
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveFace(index)}
                className={cn(
                  'flex w-full items-center justify-center gap-1.5 rounded-pill px-2 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-mint',
                  isActive
                    ? 'bg-soft-mint text-near-black shadow-[0_6px_18px_-6px_var(--color-soft-mint)]'
                    : 'text-muted-sage hover:text-soft-white',
                )}
              >
                <Icon name={face.icon} className="size-4" />
                <span>{face.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
