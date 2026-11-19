import { useState } from 'react'

import { PlaceholderCard } from '@/shared/components/PlaceholderCard'
import type { FinanceTabId, IconName } from '@/shared/constants/faces'

import { FinanceBottomNavigation } from './components/FinanceBottomNavigation'

type FinancePanel = {
  title: string
  subtitle: string
  cardTitle: string
  cardDescription: string
  icon: IconName
}

const PANELS: Record<FinanceTabId, FinancePanel> = {
  home: {
    title: 'Beranda',
    subtitle: 'Ringkasan singkat ruang keuanganmu.',
    cardTitle: 'Belum ada catatan',
    cardDescription: 'Pemasukan dan pengeluaran akan muncul di sini setelah kamu mulai mencatat.',
    icon: 'wallet',
  },
  scan: {
    title: 'Scan',
    subtitle: 'Pindai struk untuk mencatat lebih cepat.',
    cardTitle: 'Segera hadir',
    cardDescription: 'Pemindai struk sedang disiapkan dan akan tersedia pada pembaruan berikutnya.',
    icon: 'scan',
  },
  finance: {
    title: 'Keuangan',
    subtitle: 'Lihat dan kelola seluruh catatanmu.',
    cardTitle: 'Segera hadir',
    cardDescription: 'Ringkasan, riwayat, dan laporan keuangan akan hadir di sini.',
    icon: 'wallet',
  },
}

/**
 * Wajah Keuangan dengan panel internal (Beranda / Scan / Keuangan).
 * Semua masih placeholder — belum ada logika finansial, OCR, atau database.
 */
export function FinanceFace() {
  const [activeTab, setActiveTab] = useState<FinanceTabId>('home')
  const panel = PANELS[activeTab]

  return (
    <div className="relative h-full">
      <div
        data-testid="face-scroll-finance"
        className="h-full touch-pan-y overflow-y-auto overscroll-contain"
        style={{ paddingBottom: 'calc(5.75rem + env(safe-area-inset-bottom))' }}
      >
        <div className="px-gutter pt-6">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-muted-sage">
            Keuangan
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-soft-white">
            {panel.title}
          </h2>
          <p className="mt-1 text-sm text-muted-sage">{panel.subtitle}</p>
          <div className="mt-5">
            <PlaceholderCard
              icon={panel.icon}
              title={panel.cardTitle}
              description={panel.cardDescription}
            />
          </div>
        </div>
      </div>

      <FinanceBottomNavigation activeTab={activeTab} onChange={setActiveTab} />
    </div>
  )
}
