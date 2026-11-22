# NADI — Instruksi Claude Code

NADI ("Your Personal Management Space") adalah PWA personal dengan tiga ruang: Keuangan, Progress Harian, Project. Prinsip: PWA-first, local-first, modular. V1 hanya mencakup Muka 1 (Keuangan).

## Sumber kebenaran

- `docs/` adalah sumber kebenaran: PRD, Technical Specification, Implementation Blueprint. Jangan mengubahnya tanpa persetujuan.
- Baca hanya bagian dokumen yang relevan dengan tugas, bukan seluruh dokumen.
- Jika dokumen saling bertentangan atau keputusan belum final (mis. cloud backup provider, OCR provider, enkripsi data lokal, hosting, autentikasi backup), jangan putuskan sendiri: hentikan, catat sebagai keputusan terbuka, dan tanyakan.

## Status

- Sprint 0 (scaffold) dan Sprint 1 (shell: navigasi global, swipe, header adaptif, placeholder Muka 2/3) selesai. Sprint 2 (database) belum dimulai.
- Terpasang hanya: React 19, TypeScript ~5.9, Vite, Tailwind v4, Zustand, Vitest + RTL, ESLint, Prettier.
- Belum ada dan jangan diasumsikan ada: Dexie, Zod, vite-plugin-pwa, Supabase, Capacitor, Playwright, router, `.env.example`.

## Arsitektur

- Layer: `shell/` (layout global) · `features/` (UI per modul) · `core/` (database, repositories, services, platform, backup, security) · `shared/` · `stores/` (Zustand, hanya state UI).
- Komponen UI tidak boleh mengakses database atau Supabase langsung. Logika bisnis ada di service, akses data lewat repository, API browser/native lewat adapter di `core/platform/`.
- Local-first: IndexedDB (via Dexie) sumber data utama. Aplikasi harus berfungsi offline; cloud hanya untuk backup. Jangan menyimpan seluruh isi database di Zustand.
- Perubahan skema database wajib lewat migrasi Dexie berversi, tanpa menghapus data lama.
- Nominal = integer rupiah. Hapus transaksi = soft delete (`deletedAt`).
- Satu sumber perhitungan saldo (BalanceService).

## Konvensi dan kualitas

- Import lintas modul memakai alias `@/` (= `src/`).
- Prettier: tanpa titik koma, single quote, lebar 100, trailing comma. TypeScript strict, tanpa unused locals/params.
- Jangan menulis warna hardcoded di komponen. Token ada di `src/styles/index.css` (`@theme`); tambahkan token baru di sana.
- Jangan membangun fitur Muka 2/3, mock data pengganti database nyata, atau fitur di luar Scope V1 tanpa persetujuan.
- Jangan menambah/mengganti dependency atau teknologi terkunci tanpa alasan teknis dan persetujuan.
- Jangan menghapus kode yang berfungsi tanpa alasan jelas.

## Validasi

- `npm run test` · `npm run lint` · `npm run format:check` · `npm run build` (build menimpa `dist/`).
- Jalankan test setelah perubahan. Jangan menyatakan fitur selesai jika belum diuji.
- Jangan menjalankan `format`, `lint:fix` kecuali diminta.
- Buat rencana dan tunggu persetujuan sebelum perubahan besar. Kerjakan per sprint dan per fitur. Laporkan file yang dibuat, diubah, dan dihapus, serta bug atau keterbatasan yang tersisa.

## Git

- Jangan commit, push, pull, merge, rebase, atau menghapus file tanpa instruksi eksplisit.
- Jangan mengubah konfigurasi Git atau Supabase.

## Windows

- Jalankan perintah dari PowerShell dengan path berhuruf drive KAPITAL: `C:\Users\Elitebook\Projects\nadi-app`. Jika cwd memakai huruf kecil (`c:\...`), Vitest gagal dengan "Vitest failed to find the current suite". Pada Bash gunakan `cd "C:/Users/Elitebook/Projects/nadi-app"`.

## Komunikasi

- Akhiri setiap tugas dengan ringkasan singkat dalam bahasa Indonesia.
