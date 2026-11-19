import { PlaceholderCard } from '@/shared/components/PlaceholderCard'

/**
 * Wajah Progress Harian — placeholder Sprint 1.
 */
export function DailyProgressFace() {
  return (
    <div
      data-testid="face-scroll-daily"
      className="h-full touch-pan-y overflow-y-auto overscroll-contain px-gutter pb-8 pt-6"
    >
      <p className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-muted-sage">
        Harian
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-soft-white">
        Progress Harian
      </h2>
      <p className="mt-1 text-sm text-muted-sage">Jejak kecil yang konsisten setiap hari.</p>
      <div className="mt-5">
        <PlaceholderCard
          icon="sun"
          title="Belum ada progress"
          description="Kebiasaan, target, dan catatan harian akan tampil di sini."
        />
      </div>
    </div>
  )
}
