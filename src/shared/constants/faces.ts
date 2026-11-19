/**
 * Metadata wajah (face) utama NADI dan tab internal Keuangan.
 *
 * Urutan array FACES adalah sumber kebenaran untuk urutan navigasi:
 * 0 = Keuangan, 1 = Harian, 2 = Project.
 */
export type FaceId = 'finance' | 'daily' | 'projects'
export type FaceIndex = 0 | 1 | 2

export type IconName =
  | 'home'
  | 'wallet'
  | 'sun'
  | 'folder'
  | 'scan'
  | 'user'
  | 'chevron-left'
  | 'chevron-right'
  | 'sparkles'

export type FaceMeta = {
  id: FaceId
  label: string
  icon: IconName
}

export const FACES = [
  { id: 'finance', label: 'Keuangan', icon: 'wallet' },
  { id: 'daily', label: 'Harian', icon: 'sun' },
  { id: 'projects', label: 'Project', icon: 'folder' },
] as const satisfies readonly FaceMeta[]

export const LAST_FACE_INDEX = (FACES.length - 1) as FaceIndex

export type FinanceTabId = 'home' | 'scan' | 'finance'

export type FinanceTabMeta = {
  id: FinanceTabId
  label: string
  icon: IconName
}

export const FINANCE_TABS = [
  { id: 'home', label: 'Beranda', icon: 'home' },
  { id: 'scan', label: 'Scan', icon: 'scan' },
  { id: 'finance', label: 'Keuangan', icon: 'wallet' },
] as const satisfies readonly FinanceTabMeta[]
