import type { ComponentType, CSSProperties, KeyboardEvent } from 'react'

import { DailyProgressFace } from '@/features/daily-progress/DailyProgressFace'
import { FinanceFace } from '@/features/finance/FinanceFace'
import { ProjectsFace } from '@/features/projects/ProjectsFace'
import { FACES, LAST_FACE_INDEX, type FaceId } from '@/shared/constants/faces'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { useUiStore } from '@/stores/uiStore'

import { AdaptiveHeader } from '../AdaptiveHeader'
import { GlobalNavigation } from '../GlobalNavigation'
import { useSwipeNavigation } from '../hooks/useSwipeNavigation'

const FACE_CONTENT: Record<FaceId, ComponentType> = {
  finance: FinanceFace,
  daily: DailyProgressFace,
  projects: ProjectsFace,
}

const TRACK_TRANSITION = 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)'

export function MainLayout() {
  const activeFace = useUiStore((state) => state.activeFace)
  const setActiveFace = useUiStore((state) => state.setActiveFace)
  const goToNext = useUiStore((state) => state.goToNext)
  const goToPrev = useUiStore((state) => state.goToPrev)
  const prefersReducedMotion = usePrefersReducedMotion()

  const { dragOffset, isDragging, handlers } = useSwipeNavigation({
    activeIndex: activeFace,
    maxIndex: LAST_FACE_INDEX,
    onIndexChange: setActiveFace,
  })

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goToPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goToNext()
    }
  }

  const trackStyle: CSSProperties = {
    transform: `translate3d(calc(${activeFace * -100}% + ${dragOffset}px), 0, 0)`,
    transition: isDragging || prefersReducedMotion ? 'none' : TRACK_TRANSITION,
    willChange: 'transform',
  }

  return (
    <div className="min-h-dvh bg-near-black" onKeyDown={handleKeyDown}>
      <div
        className="relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-near-black text-soft-white sm:border-x sm:border-soft-white/5"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-linear-to-b from-deep-emerald/20 to-transparent"
        />

        <AdaptiveHeader />
        <GlobalNavigation />

        <main
          data-testid="face-pager"
          className="relative min-h-0 flex-1 overflow-hidden"
          style={{ touchAction: 'pan-y' }}
          {...handlers}
        >
          <div className="flex h-full w-full" style={trackStyle}>
            {FACES.map((face, index) => {
              const isActive = index === activeFace
              const Face = FACE_CONTENT[face.id]

              return (
                <section
                  key={face.id}
                  aria-label={face.label}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="relative h-full w-full shrink-0 overflow-hidden"
                >
                  <Face />
                </section>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
