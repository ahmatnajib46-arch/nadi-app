/**
 * Titik masuk aplikasi.
 *
 * Sprint 0 hanya menyiapkan kerangka: belum ada fitur Keuangan,
 * Progress Harian, maupun Project. Global shell (navigasi tiga ruang
 * dan adaptive header) dibangun pada Sprint 1.
 */
export function App() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-near-black px-6 py-16 text-soft-white">
      <div className="w-full max-w-sm rounded-card bg-charcoal p-8 shadow-card">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-sage">Sprint 0</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">NADI</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-sage">
          Fondasi proyek siap. Modul Keuangan dibangun pada sprint berikutnya.
        </p>
      </div>
    </main>
  )
}
