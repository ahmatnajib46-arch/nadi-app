# TECHNICAL SPECIFICATION  
## Personal Management App — Version 0.1  
**Status:** Draft untuk persetujuan teknis **Basis:** PRD Muka 1 — Keuangan, Version 1.0 **Target:** PWA terlebih dahulu, kemudian Android/iOS melalui Capacitor.  
   
⸻  
   
## 1. Tujuan Teknis  
Membangun aplikasi personal dengan tiga ruang utama:  
1. Keuangan  
2. Progress Harian  
3. Project  
Arsitektur harus memenuhi empat prinsip:  
* **Local-first:** data utama tersimpan di perangkat.  
* **Offline-ready:** fitur inti tetap berfungsi tanpa internet.  
* **Modular:** setiap ruang memiliki modul dan logika masing-masing.  
* **Portable:** struktur aplikasi memungkinkan migrasi ke Android/iOS melalui Capacitor.  
Implementasi fitur tahap pertama hanya mencakup Muka 1 — Keuangan.  
## 2. Rekomendasi Technology Stack  

| Komponen | Teknologi yang direkomendasikan | Fungsi |
| ------------------- | ------------------------------- | -------------------------------- |
| Frontend | React + TypeScript | UI dan logika aplikasi |
| Build tool | Vite | Development dan production build |
| Styling | CSS Variables + Tailwind CSS | Design system dan styling |
| Local database | IndexedDB + Dexie.js | Penyimpanan data lokal |
| State management | Zustand | State global dan UI |
| PWA | vite-plugin-pwa | Manifest dan Service Worker |
| Validation | Zod | Validasi data |
| Charts | Recharts (jika diperlukan) | Visualisasi keuangan |
| Native bridge nanti | Capacitor | Packaging Android/iOS |
| Cloud backup | Provider-agnostic adapter | Backup dan restore |
  
**Rekomendasi utama:** React + Vite + TypeScript + Dexie.js.  
Alasannya: cukup ringan untuk aplikasi personal, mendukung PWA, dan dapat dikembangkan menjadi aplikasi native melalui Capacitor tanpa harus membangun ulang seluruh frontend.  
Teknologi cloud backup dan OCR belum dikunci. Keduanya akan dipilih setelah evaluasi biaya, keamanan, dan kebutuhan implementasi.  
## 3. High-Level Architecture  
Arsitektur dibagi menjadi empat lapisan:  
**A. Presentation Layer**  
Mengatur seluruh tampilan:  
* Global navigation.  
* Adaptive header.  
* Beranda Keuangan.  
* Riwayat Keuangan.  
* Input transaksi.  
* Scan Nota.  
* Profile dan Settings.  
**B. Application Layer**  
Mengatur proses bisnis:  
* Transaction service.  
* Balance calculation.  
* Transaction parser.  
* Category management.  
* Backup dan restore.  
* Export CSV/PDF.  
* OCR processing.  
**C. Data Layer**  
Mengatur penyimpanan:  
* IndexedDB sebagai database utama.  
* Repository untuk membaca dan menulis data.  
* Data migration.  
* Trash dan audit history.  
**D. Platform Layer**  
Menghubungkan aplikasi dengan kemampuan perangkat:  
* Camera.  
* Biometric authentication.  
* Local storage.  
* Network status.  
* Cloud backup.  
* Native capabilities di masa depan.  
Prinsip penting: business logic tidak boleh bergantung langsung pada komponen UI atau API browser. Gunakan adapter agar implementasi web dapat diganti atau diperluas ketika masuk ke Capacitor.  
## 4. Struktur Folder  
Rekomendasi struktur proyek:  
```
src/
├── app/
│   ├── App.tsx
│   ├── router/
│   └── providers/
│
├── core/
│   ├── database/
│   ├── repositories/
│   ├── services/
│   ├── platform/
│   ├── backup/
│   └── security/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   └── design-system/
│
├── shell/
│   ├── GlobalNavigation/
│   ├── AdaptiveHeader/
│   └── MainLayout/
│
├── features/
│   ├── finance/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── history/
│   │   ├── receipt-scan/
│   │   ├── categories/
│   │   ├── settings/
│   │   └── reports/
│   │
│   ├── daily-progress/
│   │
│   └── projects/
│
└── main.tsx

```
Folder daily-progress dan projects hanya disiapkan sebagai tempat pengembangan. Belum perlu berisi implementasi fitur.  
## 5. Global Application Shell  
Fondasi global yang dibuat sejak awal:  
**Global Navigation**  
* Tiga ruang: Keuangan, Harian, Project.  
* Navigasi menggunakan horizontal swipe.  
* Tap label untuk berpindah langsung.  
* Setiap ruang mempertahankan scroll position.  
* Transisi ringan dan tidak menggunakan animasi 3D berat.  
**Adaptive Header**  
* Greeting tampil ketika aplikasi dibuka.  
* Greeting tampil kembali ketika pengguna berpindah ruang.  
* Setelah sekitar 3 detik, header mengecil.  
* Perubahan tinggi dan opacity dibuat halus.  
**Design System**  
Warna dasar:  

| Token        | Warna   |
| ------------ | ------- |
| Deep Emerald | #075747 |
| Dark Forest  | #092C27 |
| Near Black   | #090B0F |
| Charcoal     | #17191D |
| Soft Mint    | #55E6B5 |
| Soft White   | #DCE7E3 |
| Muted Sage   | #91A49F |
  
Semua warna harus disimpan sebagai design tokens, bukan ditulis berulang secara hardcoded di setiap komponen.  
## 6. Database Design  
Database utama menggunakan IndexedDB melalui Dexie.js.  
**Tabel inti**  
**1. transactions**  

| Field           | Type    | Keterangan                  |
| --------------- | ------- | --------------------------- |
| id              | UUID    | Primary key                 |
| name            | String  | Nama transaksi              |
| amount          | Integer | Nominal dalam rupiah        |
| type            | Enum    | income / expense            |
| categoryId      | UUID    | Relasi kategori             |
| transactionDate | Date    | Tanggal dan waktu transaksi |
| notes           | String? | Catatan opsional            |
| source          | Enum    | manual / receipt_scan       |
| receiptId       | UUID?   | Referensi foto nota         |
| createdAt       | Date    | Waktu dibuat                |
| updatedAt       | Date    | Waktu diperbarui            |
| deletedAt       | Date?   | Waktu dihapus               |
  
Nominal disimpan sebagai integer rupiah, bukan floating-point, untuk menghindari kesalahan pembulatan.  
**2. categories**  
* id  
* name  
* type  
* icon  
* isDefault  
* isActive  
* createdAt  
* updatedAt  
**3. app_settings**  
Menyimpan:  
* Opening balance.  
* Opening balance date.  
* Currency.  
* Date format.  
* Security preferences.  
* Backup preferences.  
**4. receipts**  
Menyimpan:  
* id  
* localImagePath atau blob reference  
* merchantName  
* receiptDate  
* extractedAmount  
* processingStatus  
* createdAt  
**5. audit_logs**  
Mencatat perubahan penting:  
* Perubahan saldo awal.  
* Edit transaksi.  
* Penghapusan transaksi.  
* Restore transaksi.  
* Perubahan pengaturan penting.  
**6. backup_metadata**  
Menyimpan:  
* Last backup timestamp.  
* Backup status.  
* Backup version.  
* Backup identifier.  
**Database rules**  
* Setiap tabel memiliki primary key yang stabil.  
* Database menggunakan versioned migration.  
* Jangan menghapus transaksi secara permanen ketika pengguna menekan Delete.  
* Transaksi masuk Trash dengan deletedAt.  
* Transaksi masuk Trash dengan deletedAt.  
* Transaksi di Trash tidak dihitung dalam saldo.  
* Permanent deletion dilakukan setelah 30 hari sesuai kebijakan produk.  
Tabel tambahan untuk Muka 2 dan 3 dibuat ketika kebutuhan fiturnya sudah dirancang. Jangan membuat skema database spekulatif sekarang.  
## 7. Business Logic  
**A. Balance Calculation**  
```
Current Balance =
Opening Balance
+ Total Income
- Total Expense

```
Saldo dihitung dari transaksi aktif dan saldo awal.  
Transaksi sebelum tanggal mulai pencatatan tidak dimasukkan dalam perhitungan.  
**B. Transaction Processing**  
Alur:  
```
User Input
    ↓
Parser
    ↓
Validation
    ↓
Transaction Preview
    ↓
User Confirmation
    ↓
Save to IndexedDB
    ↓
Refresh Balance and History

```
Parser V1 menggunakan rule-based parsing.  
Contoh:  
* kopi 25rb → Expense, Rp25.000.  
* gaji 5jt → Income, Rp5.000.000.  
* bensin 50 ribu → Expense, Rp50.000.  
Jika nominal tidak ditemukan, pengguna diminta mengisinya. Jika jenis transaksi ambigu, sistem meminta konfirmasi.  
**C. Duplicate Detection**  
Sistem memeriksa kemungkinan transaksi duplikat berdasarkan:  
* Nominal.  
* Nama transaksi.  
* Jenis transaksi.  
* Kedekatan waktu.  
Jika terdeteksi, tampilkan peringatan dan minta konfirmasi. Jangan otomatis menolak transaksi.  
**D. Transaction Editing**  
Edit harus memperbarui record yang sama, bukan membuat transaksi baru.  
Setelah perubahan:  
* Saldo dihitung ulang.  
* Ringkasan periode diperbarui.  
* Urutan riwayat disesuaikan jika tanggal berubah.  
## 8. Offline-First Strategy  
Fitur berikut harus bekerja tanpa internet:  
* Melihat saldo.  
* Melihat riwayat transaksi.  
* Membuat transaksi.  
* Mengedit dan menghapus transaksi.  
* Restore dari Trash.  
* Mengelola kategori.  
* Menghasilkan laporan dari data lokal.  
Service Worker menangani cache aplikasi dan aset statis.  
IndexedDB menjadi sumber data utama. Jangan menjadikan cloud sebagai sumber utama yang harus selalu tersedia agar aplikasi dapat digunakan.  
**Offline Scan Nota**  
* Kamera dapat digunakan jika browser dan izin perangkat mendukungnya.  
* Foto disimpan secara lokal.  
* OCR dapat menunggu koneksi internet.  
* Pengguna tetap harus memeriksa hasil OCR sebelum menyimpan transaksi.  
## 9. Backup and Restore  
Cloud hanya berfungsi sebagai backup, bukan real-time synchronization.  
**Backup**  
* Backup otomatis ketika aplikasi aktif dan internet tersedia.  
* Upaya backup dilakukan paling tidak setiap 24 jam ketika kondisi memungkinkan.  
* Tersedia tombol Backup Sekarang.  
* Tampilkan waktu backup terakhir.  
* Jika gagal, tampilkan status dan opsi retry.  
Catatan: PWA tidak dapat menjamin pekerjaan terjadwal berjalan tepat setiap 24 jam ketika aplikasi ditutup.  
**Restore**  
1. Tampilkan informasi backup yang tersedia.  
2. Tampilkan tanggal backup.  
3. Buat safety backup data lokal.  
4. Minta konfirmasi pengguna.  
5. Jalankan restore.  
6. Validasi hasil restore.  
Backup perlu dienkripsi sebelum dikirim ke cloud. Pengelolaan kunci dan pemulihannya harus dirancang sebelum implementasi.  
## 10. Security  
Fitur keamanan V1:  
* PIN 6 digit.  
* Biometric authentication jika didukung.  
* PIN sebagai fallback.  
* Auto-lock setelah aplikasi berada di background selama 1 menit.  
Catatan teknis penting:  
PIN dan auto-lock pada PWA terutama melindungi akses melalui antarmuka aplikasi. Keduanya tidak otomatis mengenkripsi seluruh data di IndexedDB. Karena data keuangan bersifat pribadi, enkripsi backup dan perlindungan data lokal harus dievaluasi secara terpisah.  
Gunakan Web Crypto API untuk kebutuhan kriptografi yang sesuai. Jangan menyimpan PIN dalam bentuk teks biasa.  
## 11. Camera, OCR, dan Export  
**Camera**  
Gunakan API kamera browser dengan fallback ke upload galeri.  
Implementasi harus menangani:  
* Permission denied.  
* Kamera tidak tersedia.  
* Pengguna membatalkan proses.  
* Gagal mengambil gambar.  
**OCR**  
OCR hanya mengekstrak:  
* Nama merchant.  
* Tanggal.  
* Total pembayaran.  
* Kategori pengeluaran.  
Setiap hasil OCR harus dapat diedit. Nominal yang tidak terbaca tidak boleh ditebak.  
Provider OCR belum ditentukan.  
**Export**  
**CSV**  
* Export semua transaksi.  
* Export berdasarkan periode atau filter.  
* Kolom: tanggal, nama, jenis, kategori, nominal, catatan, sumber.  
**PDF**  
* Ringkasan pemasukan.  
* Ringkasan pengeluaran.  
* Selisih bersih.  
* Saldo.  
* Daftar transaksi berdasarkan periode.  
## 12. PWA and Capacitor Readiness  
**Tahap PWA**  
* Web App Manifest.  
* Service Worker.  
* HTTPS.  
* Installable app.  
* Offline app shell.  
* IndexedDB.  
* Responsive layout untuk perangkat mobile.  
**Tahap Capacitor**  
Ketika aplikasi sudah stabil, Capacitor digunakan untuk membungkus proyek web menjadi aplikasi Android/iOS.  
Fitur yang perlu disiapkan melalui platform adapter:  
* Camera.  
* Biometrics.  
* Secure storage.  
* File system.  
* Notifications.  
* Backup scheduling.  
Jangan mengakses API browser atau native secara langsung dari business logic. Gunakan interface agar implementasi platform dapat diganti.  
## 13. Testing Requirements  
Sebelum rilis V1, lakukan pengujian:  

| Area        | Pengujian                                  |
| ----------- | ------------------------------------------ |
| Transaction | Tambah, edit, delete, restore              |
| Balance     | Perhitungan saldo dan saldo awal           |
| Parser      | Format nominal dan jenis transaksi         |
| Duplicate   | Peringatan transaksi serupa                |
| History     | Filter, pencarian, pengurutan              |
| Offline     | Penggunaan tanpa internet                  |
| Backup      | Backup, gagal backup, retry                |
| Restore     | Safety backup dan pemulihan                |
| OCR         | Hasil terbaca dan tidak terbaca            |
| Security    | PIN, auto-lock, biometric fallback         |
| PWA         | Install, refresh, offline launch           |
| UI          | Mobile responsiveness dan swipe navigation |
  
Target utama: tidak ada transaksi yang hilang atau terhitung ganda akibat operasi normal aplikasi.  
## 14. Development Sequence  
Pengembangan dibagi menjadi beberapa tahap:  
**Phase 1 — Foundation**  
**Phase 1 — Foundation**  
* Setup React, Vite, TypeScript.  
* Setup design system.  
* Setup global application shell.  
* Global navigation tiga ruang.  
* Adaptive header.  
* IndexedDB dan migration system.  
**Phase 2 — Finance Core**  
* Opening balance.  
* Transaction database.  
* Transaction parser.  
* Transaction preview.  
* Manual transaction form.  
* Balance calculation.  
**Phase 3 — Finance Interface**  
* Beranda.  
* Riwayat.  
* Search dan filter.  
* Transaction detail.  
* Edit, Trash, Restore.  
**Phase 4 — Advanced Features**  
* Scan nota dan OCR.  
* Profile dan Settings.  
* PIN dan biometric.  
* CSV dan PDF export.  
**Phase 5 — Reliability**  
* Offline testing.  
* Backup dan restore.  
* Security review.  
* Performance optimization.  
* PWA installation testing.  
**Phase 6 — Release**  
* Deploy PWA.  
* Uji pada perangkat nyata.  
* Perbaikan bug.  
* Evaluasi penggunaan sebelum melanjutkan Muka 2.  
   
⸻  
   
## 15. Keputusan Teknis yang Masih Terbuka  
Sebelum coding dimulai, ada beberapa keputusan yang harus dikunci:  
1. **Cloud backup provider:** Supabase atau alternatif lain.  
2. **Cloud backup provider:** Supabase atau alternatif lain.  
3. **OCR provider:** layanan cloud yang sesuai biaya dan akurasi.  
4. **OCR provider:** layanan cloud yang sesuai biaya dan akurasi.  
5. **Local data encryption:** cakupan enkripsi dan pengelolaan kunci.  
6. **Local data encryption:** cakupan enkripsi dan pengelolaan kunci.  
7. **Hosting:** platform deployment PWA.  
8. **Hosting:** platform deployment PWA.  
9. **UI implementation:** pendekatan komponen dan animasi yang konsisten.  
10. **UI implementation:** pendekatan komponen dan animasi yang konsisten.  
Rekomendasi saya: jangan menunda seluruh proyek hanya karena lima keputusan ini. Kita bisa membangun fondasi dan Finance Core terlebih dahulu, tetapi kontrak interface backup, OCR, dan security harus ditetapkan sebelum fitur terkait dibuat.  
## 16. Definition of Done — V1  
Muka 1 dinyatakan siap digunakan ketika:  
* Seluruh fitur dalam Scope V1 PRD berfungsi.  
* Data tetap tersedia setelah aplikasi ditutup dan dibuka kembali.  
* Fitur inti berjalan offline.  
* Saldo selalu sesuai dengan transaksi aktif.  
* Tidak ada transaksi yang terhitung ganda.  
* Backup dan restore sudah diuji.  
* PWA dapat di-install dan digunakan di perangkat mobile.  
* Tidak ada bug kritis pada alur pencatatan transaksi.  
**Prinsip akhir:** bangun satu aplikasi yang benar-benar dapat digunakan sehari-hari, bukan tiga ruang yang terlihat lengkap tetapi belum dapat diandalkan.  
