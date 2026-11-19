import type { IconName } from '@/shared/constants/faces'
import { cn } from '@/shared/utils/cn'

import { Icon } from './Icon'

type PlaceholderCardProps = {
  title: string
  description: string
  icon?: IconName
  className?: string
}

/**
 * Blok placeholder yang dipakai berulang di tiap wajah.
 * Sengaja tanpa data finansial palsu — hanya menjelaskan apa yang akan hadir.
 */
export function PlaceholderCard({
  title,
  description,
  icon = 'sparkles',
  className,
}: PlaceholderCardProps) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-card border border-soft-white/10 bg-charcoal/60 p-5 shadow-card',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-soft-mint/10 blur-2xl"
      />
      <div className="relative">
        <span className="grid size-10 place-items-center rounded-full border border-soft-mint/20 bg-soft-mint/10 text-soft-mint">
          <Icon name={icon} className="size-5" />
        </span>
        <h3 className="mt-4 text-base font-semibold text-soft-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-sage">{description}</p>
      </div>
    </article>
  )
}
