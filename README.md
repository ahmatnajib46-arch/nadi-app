# NADI

**Your Personal Management Space**

NADI adalah aplikasi pengelolaan pribadi dengan tiga ruang utama: Keuangan, Progress Harian, dan Project. Aplikasi dirancang **PWA-first**, **local-first**, dan **modular**, dengan Muka 1 (Keuangan) sebagai prioritas implementasi.

## Status Proyek

**Sprint 0 — Project Scaffold (selesai).** Repository berisi fondasi proyek yang dapat dijalankan, di-build, dan diuji. Belum ada fitur produk yang diimplementasikan: modul Keuangan, Progress Harian, dan Project masih kosong dan akan dibangun pada sprint berikutnya sesuai Implementation Blueprint.

## Prasyarat

- Node.js >= 20.19 (diuji pada Node 26.13)
- npm >= 10 (diuji pada npm 11.20)

## Cara Menjalankan

```bash
npm install     # pasang dependency
npm run dev     # jalankan development server (http://localhost:5173)
```

Perintah lain:

| Perintah               | Fungsi                                               |
| ---------------------- | ---------------------------------------------------- |
| `npm run build`        | Type-check (`tsc -b`) lalu build produksi ke `dist/` |
| `npm run preview`      | Menyajikan hasil build secara lokal                  |
| `npm run test`         | Menjalankan unit test sekali (Vitest)                |
| `npm run test:watch`   | Menjalankan unit test dalam mode watch               |
| `npm run lint`         | Menjalankan ESLint pada seluruh proyek               |
| `npm run lint:fix`     | Menjalankan ESLint dengan auto-fix                   |
| `npm run format`       | Memformat kode dengan Prettier                       |
| `npm run format:check` | Memeriksa format tanpa mengubah file                 |

## Teknologi

| Layer         | Teknologi                       |
| ------------- | ------------------------------- |
| Frontend      | React 19                        |
| Bahasa        | TypeScript 5.9                  |
| Build tool    | Vite 8                          |
| Styling       | Tailwind CSS v4 + CSS Variables |
| Unit test     | Vitest + React Testing Library  |
| Lint / Format | ESLint + Prettier               |

> **Catatan versi TypeScript:** TypeScript dipatok pada `~5.9.3`, bukan 7.x. `typescript-eslint`
> (toolchain lint yang disepakati) mensyaratkan `typescript >=4.8.4 <6.1.0`. Keputusan ini dapat
> ditinjau kembali ketika `typescript-eslint` mendukung TypeScript 7.

Dependency yang **belum** dipasang dan memang belum dibutuhkan pada Sprint 0: Dexie.js, Zustand, Zod, vite-plugin-pwa, Supabase client, Capacitor, Playwright. Semuanya akan ditambahkan pada sprint tempat fiturnya mulai dikerjakan.

## Design System

Seluruh design token berada di satu sumber: `src/styles/index.css` (blok `@theme`). Tailwind v4 mengeksposnya sebagai CSS Variables sekaligus utility class.

| Token                  | Nilai     | Utility           |
| ---------------------- | --------- | ----------------- |
| `--color-deep-emerald` | `#075747` | `bg-deep-emerald` |
| `--color-dark-forest`  | `#092C27` | `bg-dark-forest`  |
| `--color-near-black`   | `#090B0F` | `bg-near-black`   |
| `--color-charcoal`     | `#17191D` | `bg-charcoal`     |
| `--color-soft-mint`    | `#55E6B5` | `text-soft-mint`  |
| `--color-soft-white`   | `#DCE7E3` | `text-soft-white` |
| `--color-muted-sage`   | `#91A49F` | `text-muted-sage` |

Token lain: `--radius-card`, `--radius-sheet`, `--radius-pill`, `--spacing-gutter`, `--spacing-section`, `--spacing-page`, `--shadow-card`, `--shadow-sheet`.

Aturan: **jangan menulis nilai warna hardcoded di komponen.** Tambahkan token baru ke `src/styles/index.css`, bukan inline di komponen.

## Struktur Folder

```
nadi-app/
├── docs/                       # Sumber kebenaran produk & teknis (jangan diubah tanpa persetujuan)
├── public/
│   ├── icons/                  # App icon (menunggu aset desain)
│   ├── favicon.svg             # Placeholder sementara
│   └── manifest.webmanifest    # Stub PWA (belum memakai vite-plugin-pwa)
├── src/
│   ├── app/                    # Entry point, App.tsx, router/, providers/
│   ├── core/                   # Logika non-UI
│   │   ├── database/           # Dexie schema & migrations (belum diisi)
│   │   ├── repositories/       # Akses data
│   │   ├── services/           # Business logic
│   │   ├── platform/           # Adapter kamera, biometric, storage, network
│   │   ├── backup/             # Backup & restore
│   │   └── security/           # PIN, auto-lock
│   ├── shared/                 # Komponen, hooks, utils, constants, design-system
│   ├── shell/                  # MainLayout, GlobalNavigation, AdaptiveHeader
│   ├── features/
│   │   ├── finance/            # dashboard, transactions, history, receipt-scan,
│   │   │                       # categories, settings, reports
│   │   ├── daily-progress/     # Placeholder — belum diimplementasikan
│   │   └── projects/           # Placeholder — belum diimplementasikan
│   ├── stores/                 # Zustand stores (belum ada)
│   ├── styles/                 # Tailwind entry + design tokens
│   ├── test/                   # Setup test (jest-dom)
│   └── types/                  # Tipe bersama
├── supabase/migrations/        # Migrasi backend backup (belum dipakai)
├── tests/                      # Slot E2E Playwright (belum dipakai)
├── eslint.config.js
├── vite.config.ts              # Vite + Vitest + alias @/
└── tsconfig*.json
```

Alias import `@/` mengarah ke `src/`, sehingga import lintas modul tidak bergantung pada path relatif yang dalam (contoh: `import { App } from '@/app/App'`).

## Dokumentasi

- Product Requirements Document — `docs/PRODUCT REQUIREMENTS DOCUMENT (PRD).md`
- Technical Specification — `docs/TECHNICAL SPECIFICATION.md`
- Implementation Blueprint — `docs/IMPLEMENTATION BLUEPRINT.md`

Dokumentasi di `docs/` adalah sumber kebenaran. Perubahan scope, arsitektur, atau keputusan teknis harus melalui persetujuan dan pembaruan dokumen terkait terlebih dahulu.

## Prioritas Pengembangan

1. **Muka 1 — Keuangan** (prioritas utama)
2. Progress Harian
3. Project

Global application shell mendukung tiga ruang sejak awal, tetapi Muka 2 dan 3 hanya berupa placeholder sampai Muka 1 selesai dan tervalidasi.
