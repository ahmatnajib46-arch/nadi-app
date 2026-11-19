import { create } from 'zustand'

import { LAST_FACE_INDEX, type FaceIndex } from '@/shared/constants/faces'

type UiState = {
  /** Wajah aktif: 0 = Keuangan, 1 = Harian, 2 = Project. */
  activeFace: FaceIndex
  /** Selalu di-clamp ke rentang wajah yang valid. */
  setActiveFace: (face: number) => void
  goToNext: () => void
  goToPrev: () => void
}

function clampFace(face: number): FaceIndex {
  if (!Number.isFinite(face)) return 0
  if (face <= 0) return 0
  if (face >= LAST_FACE_INDEX) return LAST_FACE_INDEX
  return face as FaceIndex
}

export const useUiStore = create<UiState>((set) => ({
  activeFace: 0,
  setActiveFace: (face) => set({ activeFace: clampFace(face) }),
  goToNext: () => set((state) => ({ activeFace: clampFace(state.activeFace + 1) })),
  goToPrev: () => set((state) => ({ activeFace: clampFace(state.activeFace - 1) })),
}))
