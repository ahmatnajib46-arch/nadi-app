import { Icon } from '@/shared/components/Icon'
import { FINANCE_TABS, type FinanceTabId } from '@/shared/constants/faces'
import { cn } from '@/shared/utils/cn'

type FinanceBottomNavigationProps = {
  activeTab: FinanceTabId
  onChange: (tab: FinanceTabId) => void
}

/**
 * Navigasi bawah internal wajah Keuangan.
 * Murni UI — hanya mengganti panel placeholder.
 */
export function FinanceBottomNavigation({ activeTab, onChange }: FinanceBottomNavigationProps) {
  return (
    <nav
      aria-label="Navigasi Keuangan"
      className="absolute inset-x-0 bottom-0 z-10 border-t border-soft-white/10 bg-charcoal/95 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch gap-1 px-3 py-2">
        {FINANCE_TABS.map((tab) => {
          const isActive = tab.id === activeTab

          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[0.625rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-mint',
                  isActive ? 'text-soft-mint' : 'text-muted-sage hover:text-soft-white',
                )}
              >
                <span
                  className={cn(
                    'grid size-9 place-items-center rounded-full transition-colors duration-200',
                    isActive ? 'bg-soft-mint/15' : 'bg-transparent',
                  )}
                >
                  <Icon name={tab.icon} className="size-5" />
                </span>
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
