import { useRef, useState } from 'react'
import type { TouchEvent as ReactTouchEvent } from 'react'

type SwipeNavigationOptions = {
  /** Indeks wajah yang sedang aktif. */
  activeIndex: number
  /** Indeks wajah terakhir yang valid. */
  maxIndex: number
  /** Dipanggil saat gestur melewati ambang batas. */
  onIndexChange: (index: number) => void
  /** Jarak minimum sebelum sumbu horizontal dikunci. */
  axisLockPx?: number
  /** Jarak minimum untuk commit (px). */
  minDistancePx?: number
  /** Rasio lebar viewport untuk commit. */
  distanceRatio?: number
  /** Faktor redaman saat menarik melewati ujung daftar. */
  edgeResistance?: number
}

type Gesture = {
  startX: number
  startY: number
  lastX: number
  lastY: number
  locked: boolean
}

const DEFAULT_AXIS_LOCK_PX = 10
const DEFAULT_MIN_DISTANCE_PX = 60
const DEFAULT_DISTANCE_RATIO = 0.2
const DEFAULT_EDGE_RESISTANCE = 0.35

/**
 * Navigasi geser horizontal untuk pager tiga wajah.
 *
 * - Hanya menerima gestur satu jari.
 * - Menunggu kunci sumbu (|dx| > |dy| dan |dx| > ambang) sebelum mengikuti.
 * - Mengabaikan gestur yang dimulai di dalam `[data-swipe-ignore]`.
 * - Tidak memanggil preventDefault; vertikal diserahkan ke `touch-action: pan-y`.
 */
export function useSwipeNavigation({
  activeIndex,
  maxIndex,
  onIndexChange,
  axisLockPx = DEFAULT_AXIS_LOCK_PX,
  minDistancePx = DEFAULT_MIN_DISTANCE_PX,
  distanceRatio = DEFAULT_DISTANCE_RATIO,
  edgeResistance = DEFAULT_EDGE_RESISTANCE,
}: SwipeNavigationOptions) {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const gestureRef = useRef<Gesture | null>(null)

  const reset = () => {
    gestureRef.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    // Gestur multi-jari (pinch/zoom) tidak boleh menggeser wajah.
    if (event.touches.length !== 1) {
      gestureRef.current = null
      return
    }

    const target = event.target
    if (target instanceof Element && target.closest('[data-swipe-ignore]')) {
      gestureRef.current = null
      return
    }

    const touch = event.touches[0]
    gestureRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      locked: false,
    }
  }

  const onTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current
    if (!gesture) return

    const touch = event.touches[0]
    if (!touch) return

    gesture.lastX = touch.clientX
    gesture.lastY = touch.clientY

    const deltaX = touch.clientX - gesture.startX
    const deltaY = touch.clientY - gesture.startY

    if (!gesture.locked) {
      // Gerakan vertikal lebih dominan: biarkan halaman menggulir.
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > axisLockPx) {
        reset()
        return
      }

      // Tunggu sampai gerakan horizontal cukup jelas.
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > axisLockPx) {
        gesture.locked = true
        setIsDragging(true)
      } else {
        return
      }
    }

    const atStart = activeIndex <= 0 && deltaX > 0
    const atEnd = activeIndex >= maxIndex && deltaX < 0
    setDragOffset(atStart || atEnd ? deltaX * edgeResistance : deltaX)
  }

  const onTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current
    gestureRef.current = null
    setIsDragging(false)
    setDragOffset(0)

    if (!gesture?.locked) return

    const touch = event.changedTouches[0]
    const endX = touch ? touch.clientX : gesture.lastX
    const deltaX = endX - gesture.startX
    const viewportWidth = event.currentTarget.clientWidth || window.innerWidth
    const threshold = Math.max(minDistancePx, viewportWidth * distanceRatio)

    if (deltaX <= -threshold && activeIndex < maxIndex) {
      onIndexChange(activeIndex + 1)
    } else if (deltaX >= threshold && activeIndex > 0) {
      onIndexChange(activeIndex - 1)
    }
  }

  const onTouchCancel = () => {
    reset()
  }

  return {
    dragOffset,
    isDragging,
    handlers: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel },
  }
}
