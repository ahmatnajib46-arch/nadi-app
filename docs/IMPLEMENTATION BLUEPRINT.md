## IMPLEMENTATION BLUEPRINT  
## Personal Management App  
**Version:** 1.0 **Status:** Implementation Planning **Basis:** PRD Muka 1 v1.0 + Technical Specification v0.1  
   
⸻  
   
## 1. PROJECT OVERVIEW  
## 1.1 Tujuan  
Membangun aplikasi personal dengan tiga ruang utama:  
1. Keuangan  
2. Progress Harian  
3. Project  
Aplikasi dikembangkan dengan pendekatan PWA-first, local-first, dan modular architecture.  
Pengembangan fitur dimulai dari Muka 1 — Keuangan.  
## 1.2 Keputusan Teknologi Final  

| Layer              | Teknologi                      |
| ------------------ | ------------------------------ |
| Frontend           | React                          |
| Language           | TypeScript                     |
| Build tool         | Vite                           |
| Styling            | Tailwind CSS + CSS Variables   |
| Local database     | IndexedDB                      |
| Database wrapper   | Dexie.js                       |
| State management   | Zustand                        |
| Schema validation  | Zod                            |
| PWA                | vite-plugin-pwa                |
| Cloud backup       | Supabase                       |
| Encryption         | Web Crypto API                 |
| Native packaging   | Capacitor                      |
| Testing            | Vitest + React Testing Library |
| End-to-end testing | Playwright                     |
  
Gunakan versi stabil yang kompatibel pada saat proyek dibuat. Jangan mengunci versi lama hanya karena contoh dokumentasi menggunakan versi tertentu.  
   
⸻  
   
## 2. ARCHITECTURE PRINCIPLES  
Semua implementasi harus mengikuti prinsip berikut.  
**2.1 Local-first**  
IndexedDB merupakan sumber data utama.  
Aplikasi harus tetap bisa digunakan untuk fitur inti tanpa internet.  
Supabase tidak boleh menjadi ketergantungan untuk membuka aplikasi atau melakukan transaksi.  
**2.2 Modular architecture**  
Setiap fitur ditempatkan dalam modul terpisah.  
Muka 2 dan 3 tidak diimplementasikan pada tahap ini, tetapi global application shell harus mendukung ketiganya.  
**2.3 Separation of concerns**  
Pisahkan:  
* UI components.  
* Business logic.  
* Data repositories.  
* Database.  
* Platform adapters.  
* External services.  
Komponen UI tidak boleh langsung menjalankan query database atau mengakses Supabase.  
**2.4 Maintainability**  
Setiap fitur harus mudah diperbaiki, diuji, dan dikembangkan tanpa merusak modul lain.  
**2.5 No premature complexity**  
Jangan membangun fitur yang belum masuk Scope V1.  
Jangan membuat sistem multi-user, real-time synchronization, atau backend kompleks yang belum dibutuhkan.  
   
⸻  
   
## 3. PROJECT STRUCTURE  
Gunakan struktur berikut sebagai dasar:  
```
personal-management-app/
│
├── public/
│   ├── icons/
│   └── manifest.webmanifest
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── router/
│   │   └── providers/
│   │
│   ├── core/
│   │   ├── database/
│   │   │   ├── db.ts
│   │   │   ├── schema.ts
│   │   │   └── migrations/
│   │   │
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── platform/
│   │   │   ├── camera/
│   │   │   ├── biometric/
│   │   │   ├── storage/
│   │   │   └── network/
│   │   │
│   │   ├── backup/
│   │   └── security/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── design-system/
│   │
│   ├── shell/
│   │   ├── MainLayout/
│   │   ├── GlobalNavigation/
│   │   └── AdaptiveHeader/
│   │
│   ├── features/
│   │   ├── finance/
│   │   │   ├── dashboard/
│   │   │   ├── transactions/
│   │   │   ├── history/
│   │   │   ├── receipt-scan/
│   │   │   ├── categories/
│   │   │   ├── settings/
│   │   │   └── reports/
│   │   │
│   │   ├── daily-progress/
│   │   └── projects/
│   │
│   ├── stores/
│   ├── types/
│   └── styles/
│
├── tests/
├── supabase/
│   └── migrations/
│
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

```
Catatan:  
Folder Muka 2 dan 3 hanya disiapkan sebagai ruang pengembangan. Tidak perlu membuat komponen atau database untuk keduanya sekarang.  
   
⸻  
   
## 4. DATABASE IMPLEMENTATION  
## 4.1 Local Database  
Gunakan Dexie.js di atas IndexedDB.  
Database name:  
```
PersonalManagementDB

```
Tabel V1:  
1. transactions  
2. categories  
3. appSettings  
4. receipts  
5. auditLogs  
6. backupMetadata  
## 4.2 Transaction Schema  
```
interface Transaction {
  id: string;
  name: string;
  amount: number;

  type: "income" | "expense";

  categoryId: string;

  transactionDate: Date;

  notes?: string;

  source: "manual" | "receipt_scan";

  receiptId?: string;

  createdAt: Date;
  updatedAt: Date;

  deletedAt?: Date;
}

```
Ketentuan:  
* ID menggunakan UUID.  
* Amount menggunakan integer rupiah.  
* Amount harus lebih besar dari nol.  
* Transaction type wajib income atau expense.  
* deletedAt kosong berarti transaksi aktif.  
* deletedAt berisi tanggal berarti transaksi masuk Trash.  
## 4.3 Category Schema  
```
interface Category {
  id: string;
  name: string;

  type: "income" | "expense";

  icon: string;

  isDefault: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

```
Kategori bawaan tidak boleh dihapus permanen jika sudah digunakan transaksi.  
## 4.4 App Settings Schema  
```
interface AppSettings {
  id: "main";

  openingBalance: number;
  openingBalanceDate: Date;

  currency: "IDR";

  dateFormat: "DD/MM/YYYY";

  pinEnabled: boolean;
  biometricEnabled: boolean;

  autoLockMinutes: number;

  backupEnabled: boolean;

  updatedAt: Date;
}

```
Pengaturan sensitif seperti hash PIN, konfigurasi enkripsi, dan material kunci tidak boleh disimpan sebagai data biasa dalam objek settings tanpa pertimbangan keamanan tersendiri.  
## 4.5 Database Migration  
Gunakan versioned migration Dexie.  
Ketentuan:  
* Jangan mengubah schema database secara sembarangan.  
* Setiap perubahan schema harus meningkatkan version.  
* Migration harus diuji dengan database versi sebelumnya.  
* Jangan menghapus data lama saat migration.  
* Siapkan mekanisme export sebelum perubahan database yang berisiko.  
   
⸻  
   
## 5. REPOSITORY AND SERVICE LAYER  
Gunakan repository pattern agar UI tidak bergantung langsung pada database.  
Contoh:  
```
interface TransactionRepository {
  getAll(): Promise<Transaction[]>;

  getById(id: string): Promise<Transaction | undefined>;

  create(data: Transaction): Promise<void>;

  update(
    id: string,
    data: Partial<Transaction>
  ): Promise<void>;

  softDelete(id: string): Promise<void>;

  restore(id: string): Promise<void>;
}

```
Service utama:  

| Service            | Tanggung jawab                 |
| ------------------ | ------------------------------ |
| TransactionService | CRUD transaksi                 |
| BalanceService     | Menghitung saldo               |
| TransactionParser  | Membaca input natural language |
| CategoryService    | Mengelola kategori             |
| ReceiptService     | Mengelola nota                 |
| BackupService      | Backup dan restore             |
| ExportService      | CSV dan PDF                    |
| SecurityService    | PIN dan penguncian aplikasi    |
  
Business logic harus ditempatkan pada service, bukan di dalam halaman React.  
   
⸻  
   
## 6. STATE MANAGEMENT  
Gunakan Zustand untuk state aplikasi.  
Pisahkan state berdasarkan tanggung jawab:  
* appStore  
* navigationStore  
* financeStore  
* securityStore  
* backupStore  
Jangan menyimpan seluruh isi database ke Zustand secara permanen.  
IndexedDB tetap menjadi sumber data utama. Zustand hanya menyimpan state UI dan data yang diperlukan untuk tampilan.  
Contoh state:  
```
interface NavigationState {
  activeFace: "finance" | "daily" | "projects";

  setActiveFace: (
    face: NavigationState["activeFace"]
  ) => void;
}

```
   
⸻  
   
## 7. GLOBAL APPLICATION SHELL  
Implementasikan fondasi global terlebih dahulu.  
## 7.1 Global Navigation  
Tiga menu:  
* Keuangan  
* Harian  
* Project  
Ketentuan:  
* Horizontal swipe.  
* Tap untuk berpindah.  
* Animasi ringan.  
* Menjaga scroll position setiap muka.  
* Mencegah swipe internal komponen seperti carousel mengganggu navigasi utama.  
* Navigasi tetap responsif pada perangkat mobile.  
Pada V1, Muka 2 dan 3 dapat menampilkan placeholder sederhana. Jangan membangun fitur di dalamnya.  
## 7.2 Adaptive Header  
Ketentuan:  
* Greeting saat aplikasi pertama dibuka.  
* Greeting kembali muncul setelah perpindahan muka.  
* Durasi sekitar 3 detik.  
* Header kemudian mengecil.  
* Gunakan transisi tinggi dan opacity.  
* Hindari layout shift yang mengganggu.  
## 7.3 Design Tokens  
Semua warna, radius, spacing, typography, dan shadow dikelola melalui design system.  
Palet:  
```
:root {
  --color-deep-emerald: #075747;
  --color-dark-forest: #092C27;
  --color-near-black: #090B0F;
  --color-charcoal: #17191D;
  --color-soft-mint: #55E6B5;
  --color-soft-white: #DCE7E3;
  --color-muted-sage: #91A49F;
}

```
Jangan menggunakan warna hardcoded di masing-masing komponen.  
   
⸻  
   
## 8. FINANCE MODULE IMPLEMENTATION  
Urutan implementasi:  
**8.1 Opening Balance**  
* First-time setup.  
* Input saldo awal.  
* Input tanggal mulai pencatatan.  
* Simpan ke appSettings.  
* Tampilkan Saldo Awal pada riwayat.  
* Perubahan saldo awal harus melalui konfirmasi dan audit log.  
Saldo awal bukan transaksi pemasukan.  
**8.2 Transaction Parser**  
Buat parser berbasis aturan.  
Contoh input:  

| Input          | Hasil              |
| -------------- | ------------------ |
| kopi 25rb      | Expense Rp25.000   |
| bensin 50 ribu | Expense Rp50.000   |
| gaji 5jt       | Income Rp5.000.000 |
| freelance 750k | Income Rp750.000   |
  
Parser mengembalikan data sementara, bukan langsung menyimpan transaksi.  
**8.3 Transaction Preview**  
Setelah parsing:  
1. Tampilkan nama.  
2. Tampilkan nominal.  
3. Tampilkan jenis transaksi.  
4. Tampilkan kategori.  
5. Tampilkan tanggal dan waktu.  
6. Izinkan pengguna mengedit.  
7. Simpan hanya setelah konfirmasi.  
Sediakan manual form sebagai fallback.  
**8.4 Balance Service**  
Rumus:  
```
Current Balance =
Opening Balance
+ Active Income
- Active Expense

```
Gunakan satu sumber perhitungan saldo agar semua halaman menampilkan hasil yang konsisten.  
**8.5 History**  
Fitur:  
* Group by date.  
* Newest first.  
* Search.  
* Period filter.  
* Type filter.  
* Category filter.  
* Quick detail.  
* Full detail.  
* Edit.  
* Delete.  
* Restore.  
**8.6 Trash**  
* Soft delete.  
* Restore.  
* Permanent deletion setelah 30 hari.  
* Pembersihan dilakukan saat aplikasi aktif dan dapat mengakses database.  
* Pastikan transaksi yang sudah dihapus tidak ikut backup aktif sebagai transaksi yang dapat dihitung.  
   
⸻  
   
## 9. SECURITY IMPLEMENTATION  
## 9.1 PIN  
* PIN 6 digit.  
* Tidak disimpan dalam bentuk plaintext.  
* Gunakan mekanisme verifikasi yang aman.  
* Auto-lock setelah 1 menit di background.  
* PIN menjadi fallback jika biometrik tidak tersedia.  
## 9.2 Backup Encryption  
Backup harus dienkripsi sebelum dikirim ke Supabase.  
Rekomendasi desain:  
* AES-256-GCM untuk enkripsi data.  
* Kunci enkripsi 256-bit.  
* Nonce unik untuk setiap operasi enkripsi.  
* Material kunci tidak disimpan bersama backup dalam bentuk plaintext.  
* PIN tidak digunakan langsung sebagai encryption key.  
Pilihan pengelolaan kunci yang direkomendasikan untuk dirancang lebih lanjut adalah backup recovery passphrase atau recovery key terpisah.  
Kehilangan kunci pemulihan dapat membuat backup tidak dapat dibuka. Karena itu, proses pemulihan kunci harus diuji sebelum fitur backup dirilis.  
## 9.3 Security Boundary  
Penting:  
PIN pada PWA bukan jaminan bahwa data IndexedDB tidak dapat diakses oleh orang yang memiliki akses teknis ke perangkat dan browser.  
Enkripsi backup melindungi data saat berada di cloud, tetapi tidak otomatis mengenkripsi database lokal.  
Jangan mengklaim aplikasi memiliki enkripsi end-to-end untuk seluruh data sebelum implementasinya benar-benar memenuhi persyaratan tersebut.  
   
⸻  
   
## 10. SUPABASE IMPLEMENTATION  
Supabase digunakan khusus untuk backup dan restore.  
Tidak digunakan sebagai database transaksi utama.  
Rancangan awal:  
**Storage**  
Private bucket:  
```
personal-backups

```
File backup berisi encrypted payload, bukan transaksi dalam bentuk plaintext.  
**Metadata**  
Tabel:  
```
backup_records

```
Field konseptual:  
* id  
* user_id  
* storage_path  
* backup_version  
* created_at  
* file_size  
* encryption_version  
**Security**  
* Aktifkan Row Level Security.  
* Pengguna hanya boleh mengakses backup miliknya.  
* Gunakan private storage bucket.  
* Jangan pernah menaruh Supabase service role key di frontend.  
* Gunakan environment variables untuk konfigurasi publik yang memang aman diekspos.  
* Batasi akses file melalui policy dan mekanisme autentikasi yang sesuai.  
Sebelum implementasi backup, tentukan mekanisme identitas pengguna dan pemulihan akun. Jangan mengasumsikan bahwa data lokal otomatis dapat dipulihkan hanya dengan login.  
   
⸻  
   
## 11. PWA IMPLEMENTATION  
Konfigurasi:  
* Web App Manifest.  
* Service Worker.  
* HTTPS.  
* App icons.  
* Installable app.  
* Offline app shell.  
* Responsive layout.  
* IndexedDB persistence.  
Pengujian harus dilakukan di browser mobile nyata, terutama Safari iOS.  
Jangan mengandalkan background sync sebagai satu-satunya mekanisme backup.  
   
⸻  
   
## 12. TESTING STRATEGY  
Setiap service penting harus memiliki unit test.  
Prioritas pengujian:  
1. Balance calculation.  
2. Transaction parser.  
3. Transaction CRUD.  
4. Soft delete dan restore.  
5. Database migration.  
6. Duplicate detection.  
7. Backup encryption/decryption.  
8. Restore validation.  
9. Offline functionality.  
10. Global navigation.  
Gunakan end-to-end test untuk alur:  
```
Open App
   ↓
Set Opening Balance
   ↓
Create Transaction
   ↓
Confirm Preview
   ↓
Check Balance
   ↓
Edit Transaction
   ↓
Check Updated Balance
   ↓
Delete Transaction
   ↓
Restore Transaction

```
Tidak boleh melanjutkan tahap berikutnya jika terdapat bug kritis pada tahap sebelumnya.  
   
⸻  
   
## 13. IMPLEMENTATION ROADMAP  
## Sprint 0 — Project Setup  
* Buat repository Git.  
* Setup React + Vite + TypeScript.  
* Setup Tailwind CSS.  
* Setup ESLint dan Prettier.  
* Setup Vitest.  
* Setup struktur folder.  
* Setup README.  
Output: proyek berjalan dan siap dikembangkan.  
## Sprint 1 — Global Foundation  
* Design tokens.  
* Main layout.  
* Global navigation.  
* Swipe navigation.  
* Adaptive header.  
* Placeholder Muka 2 dan 3.  
* Responsive mobile layout.  
Output: kerangka aplikasi tiga muka.  
## Sprint 2 — Database Foundation  
* Setup Dexie.  
* Database schema.  
* Migration system.  
* Repository layer.  
* Zod validation.  
* Default categories.  
* Opening balance.  
Output: fondasi penyimpanan lokal.  
## Sprint 3 — Finance Core  
* Transaction model.  
* Transaction service.  
* Balance service.  
* Natural language parser.  
* Preview.  
* Manual input.  
* Duplicate warning.  
Output: pencatatan transaksi berfungsi.  
## Sprint 4 — Finance Interface  
* Beranda.  
* Riwayat.  
* Search dan filter.  
* Quick detail.  
* Full detail.  
* Edit.  
* Trash dan restore.  
Output: fitur utama keuangan dapat digunakan.  
## Sprint 5 — Advanced Features  
* Scan nota.  
* OCR.  
* Profile dan settings.  
* PIN.  
* Export CSV/PDF.  
Output: fitur tambahan Muka 1.  
## Sprint 6 — Backup and Reliability  
* Supabase setup.  
* Backup encryption.  
* Backup dan restore.  
* Offline testing.  
* Security review.  
* PWA installation testing.  
Output: aplikasi siap untuk penggunaan personal sehari-hari.  
## Sprint 7 — Release  
* Deploy.  
* Testing perangkat nyata.  
* Bug fixing.  
* Performance optimization.  
* Final acceptance testing.  
Output: PWA V1.  
   
⸻  
   
## 14. CLAUDE CODE WORKING RULES  
Claude Code harus diperlakukan sebagai coding agent, bukan pengambil keputusan produk.  
Aturan kerja:  
1. PRD dan Technical Specification menjadi sumber kebenaran.  
2. Jangan mengubah fitur atau menambah scope tanpa persetujuan.  
3. Jangan mengganti teknologi yang sudah dikunci tanpa alasan teknis dan persetujuan.  
4. Jangan mengimplementasikan Muka 2 dan 3.  
5. Jangan membuat mock data sebagai pengganti database nyata pada fitur final.  
6. Jangan menghapus kode yang sudah berfungsi tanpa alasan jelas.  
7. Jangan menulis seluruh aplikasi dalam satu prompt.  
8. Implementasikan per sprint dan per fitur.  
9. Jalankan test setelah perubahan.  
10. Laporkan file yang dibuat, diubah, dan dihapus.  
11. Jelaskan bug atau keterbatasan yang belum terselesaikan.  
12. Jangan mengklaim fitur selesai jika belum diuji.  
Sebelum coding:  
* Baca PRD.  
* Baca Technical Specification.  
* Baca Implementation Blueprint.  
* Periksa struktur repository.  
* Buat implementation plan.  
* Tunggu persetujuan sebelum perubahan besar.  
Setiap pekerjaan harus menghasilkan perubahan yang dapat diperiksa dan diuji.  
   
⸻  
   
## 15. DEFINITION OF DONE  
Setiap sprint dinyatakan selesai ketika:  
* Implementasi sesuai spesifikasi.  
* Tidak ada error kritis.  
* Test terkait lulus.  
* Tidak merusak fitur sebelumnya.  
* Kode terorganisasi.  
* Dokumentasi diperbarui jika diperlukan.  
V1 dinyatakan selesai ketika Muka 1 dapat digunakan untuk pencatatan keuangan sehari-hari, berjalan offline, data tersimpan dengan benar, serta backup dan restore telah diuji.  
   
⸻  
   
## 16. NEXT ACTION  
Sebelum memulai coding, lakukan satu tahap terakhir:  
**Technical Architecture Review.**  
Tujuannya memastikan:  
1. Stack dan dependency kompatibel.  
2. Database schema tidak memiliki konflik.  
3. Arsitektur backup aman dan realistis.  
4. PWA dapat berjalan pada target perangkat.  
5. Struktur proyek tidak berlebihan untuk kebutuhan V1.  
Setelah review, mulai Sprint 0.  
**Prinsip eksekusi:** satu sprint selesai, diuji, dan disetujui sebelum berpindah ke sprint berikutnya.  
