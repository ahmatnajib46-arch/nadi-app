## PRODUCT REQUIREMENTS DOCUMENT (PRD)  
## Personal Finance App — V1  
**Modul:** Muka 1 — Keuangan **Status:** Scope V1 Disetujui **Dokumen:** Product Requirements Document **Versi:** 1.0  
   
⸻  
   
## 1. PRODUCT OVERVIEW  
## 1.1 Deskripsi Produk  
Aplikasi personal finance untuk membantu pengguna mencatat, memantau, dan mengelola keuangan pribadi dalam satu tempat.  
Aplikasi mengutamakan:  
* Kemudahan pencatatan transaksi.  
* Tampilan minimalis dan nyaman digunakan.  
* Perhitungan saldo yang akurat.  
* Pengelolaan data secara offline.  
* Keamanan dan backup data.  
* Pengalaman penggunaan yang cepat dan sederhana.  
Aplikasi dirancang sebagai aplikasi personal, bukan software akuntansi perusahaan.  
## 1.2 Tujuan Produk  
1. Pengguna dapat mengetahui jumlah saldo yang dimiliki.  
2. Pengguna dapat mencatat pemasukan dan pengeluaran dengan cepat.  
3. Pengguna dapat memantau riwayat transaksi.  
4. Pengguna dapat mencatat transaksi melalui foto nota.  
5. Pengguna dapat mengakses data keuangan tanpa internet.  
6. Pengguna tidak kehilangan data ketika berganti perangkat atau mengalami kerusakan perangkat.  
## 1.3 Target Pengguna  
Pengguna individu yang membutuhkan aplikasi untuk:  
* Mencatat pemasukan pribadi.  
* Mencatat pengeluaran sehari-hari.  
* Memantau saldo.  
* Mengelompokkan transaksi.  
* Melihat laporan keuangan sederhana.  
   
⸻  
   
## 2. PRODUCT STRUCTURE  
Aplikasi secara keseluruhan direncanakan memiliki tiga bagian utama:  
1. Keuangan  
2. Progress Harian  
3. Project  
Dokumen ini hanya mencakup Muka 1: Keuangan.  
## 2.1 Navigasi Global  
Navigasi global menggunakan satu komponen navigasi bersama untuk ketiga bagian aplikasi.  
Ketentuan:  
* Horizontal swipe untuk berpindah bagian.  
* Tap label untuk berpindah langsung.  
* Urutan: Keuangan → Progress Harian → Project.  
* Setiap bagian mempertahankan posisi scroll ketika pengguna berpindah.  
* Animasi transisi ringan dan tidak membebani perangkat.  
* Header adaptif digunakan secara konsisten.  
## 2.2 Navigasi Internal Keuangan  
Bottom navigation terdiri dari tiga menu:  
1. Beranda  
2. Scan  
3. Keuangan  
Profile icon berada di kanan atas header dan membuka halaman Profil & Pengaturan.  
   
⸻  
   
## 3. DESIGN SYSTEM  
## 3.1 Identitas Visual  
Tema warna: Emerald – Black – Mint.  
Palet warna:  

| Elemen       | Warna   |
| ------------ | ------- |
| Deep Emerald | #075747 |
| Dark Forest  | #092C27 |
| Near Black   | #090B0F |
| Charcoal     | #17191D |
| Soft Mint    | #55E6B5 |
| Soft White   | #DCE7E3 |
| Muted Sage   | #91A49F |
  
**3.2 Aturan Penggunaan Warna**  
* Near Black menjadi latar utama konten.  
* Deep Emerald digunakan secara selektif untuk latar dan gradient.  
* Charcoal digunakan untuk card dan secondary surface.  
* Soft Mint digunakan sebagai aksen dan indikator aktif.  
* Soft White untuk teks utama.  
* Muted Sage untuk teks sekunder.  
Jangan menggunakan mint secara berlebihan.  
## 3.3 Gaya UI  
* Minimalis dan modern.  
* Bersih dan tidak padat.  
* Rounded corners secara selektif.  
* Kontras teks harus nyaman dibaca.  
* Animasi ringan.  
* Hindari dekorasi yang tidak memiliki fungsi.  
## 3.4 Adaptive Header  
Header memiliki dua kondisi:  
**Expanded:**  
**Expanded:**  
* Sapaan pengguna.  
* Greeting sesuai waktu, seperti Selamat pagi.  
* Profile icon.  
* Subtitle singkat.  
**Compact:**  
* Header diperkecil setelah sekitar 3 detik.  
* Transisi menggunakan perubahan tinggi dan opacity yang halus.  
Expanded header muncul:  
* Saat aplikasi pertama kali dibuka.  
* Sesaat setelah pengguna berpindah bagian melalui swipe atau navigasi.  
Transisi tidak boleh menyebabkan konten meloncat secara tiba-tiba.  
   
⸻  
   
## 4. BERANDA  
## 4.1 Tujuan  
Beranda menjawab pertanyaan:  
“Berapa uang yang saya miliki dan bagaimana kondisi keuangan saya?”  
## 4.2 Struktur Komponen  
Urutan komponen:  
1. Adaptive Header.  
2. Global Navigation.  
3. Balance Card.  
4. Tombol Catat Transaksi.  
5. Tombol Scan Nota.  
6. Ringkasan Aktivitas Keuangan.  
7. Satu transaksi terbaru.  
8. Bottom Navigation.  
## 4.3 Balance Card  
Menampilkan:  
* Total saldo saat ini.  
* Label saldo.  
* Informasi yang relevan mengenai kondisi saldo.  
Saldo dihitung berdasarkan saldo awal dan seluruh transaksi aktif.  
## 4.4 Catat Transaksi  
Tombol membuka bottom sheet dari bawah.  
Ketentuan:  
* Keyboard terbuka otomatis.  
* Cursor langsung berada di input.  
* Pengguna dapat mengetik transaksi secara natural.  
Contoh:  
* makan siang 25rb  
* bensin 50 ribu  
* gaji 5jt  
* dapat uang 500k  
* kopi 20 ribu  
Sistem melakukan parsing terhadap:  
* Nama transaksi.  
* Nominal.  
* Jenis transaksi.  
* Kategori.  
* Tanggal dan waktu.  
Setelah parsing, tampilkan preview sebelum penyimpanan.  
Pengguna dapat mengubah semua hasil parsing.  
Jika nominal tidak ditemukan, minta pengguna melengkapi nominal.  
Jika jenis transaksi ambigu, minta klarifikasi.  
Jika kategori tidak ditemukan, gunakan kategori Lainnya.  
Penyimpanan hanya dilakukan setelah pengguna mengonfirmasi.  
## 4.5 Ringkasan Aktivitas Keuangan  
Menampilkan ringkasan pemasukan dan pengeluaran untuk periode bulanan berjalan.  
Hindari statistik berlebihan.  
## 4.6 Transaksi Terbaru  
Hanya menampilkan satu transaksi terbaru.  
Sediakan tombol Lihat Semua yang mengarah ke halaman Keuangan.  
   
⸻  
   
## 5. TRANSACTION MANAGEMENT  
## 5.1 Model Transaksi  
Setiap transaksi memiliki data:  
* ID unik.  
* Nama transaksi.  
* Nominal.  
* Jenis transaksi.  
* Kategori.  
* Tanggal dan waktu.  
* Catatan opsional.  
* Sumber transaksi.  
* Foto nota jika tersedia.  
* Status transaksi.  
* Waktu dibuat.  
* Waktu terakhir diperbarui.  
Jenis transaksi:  
* Income.  
* Expense.  
Sumber transaksi:  
* Manual.  
* Receipt Scan.  
## 5.2 Saldo Awal  
Pada pengaturan awal aplikasi, pengguna diminta memasukkan:  
* Nominal saldo awal.  
* Tanggal mulai pencatatan.  
Saldo awal bukan pemasukan.  
Saldo awal ditampilkan sebagai entri khusus pada riwayat transaksi.  
Transaksi sebelum tanggal mulai pencatatan tidak masuk dalam perhitungan saldo.  
Formula:  
Saldo Saat Ini = Saldo Awal + Total Pemasukan - Total Pengeluaran.  
Perubahan saldo awal harus melalui konfirmasi dan dicatat dalam riwayat perubahan.  
## 5.3 Parsing Input  
V1 menggunakan rule-based parser.  
Parser harus dapat mengenali:  
* Nominal angka biasa.  
* Format ribuan.  
* Format ribu dan juta seperti 25rb, 50k, 1jt, 5jt.  
* Kata-kata yang menunjukkan pemasukan.  
* Kata-kata yang menunjukkan pengeluaran.  
* Nama transaksi.  
Parser bukan sistem AI generatif.  
Hasil parsing harus selalu dapat diperiksa dan diedit pengguna.  
## 5.4 Deteksi Transaksi Ganda  
Sistem mencegah penyimpanan ganda akibat interaksi berulang.  
Ketika mendeteksi transaksi yang mirip berdasarkan nominal, waktu, nama, atau atribut lainnya:  
* Tampilkan peringatan.  
* Jangan langsung menolak transaksi.  
* Berikan pilihan untuk melanjutkan atau membatalkan.  
Dua transaksi sah dengan nominal sama tetap boleh disimpan.  
   
⸻  
   
## 6. RIWAYAT KEUANGAN  
## 6.1 Tujuan  
Halaman Keuangan digunakan untuk menjawab:  
“Dari mana uang saya berasal dan ke mana uang saya digunakan?”  
## 6.2 Struktur Halaman  
1. Header Keuangan.  
2. Subtitle.  
3. Search icon.  
4. Pemilih periode.  
5. Ringkasan keuangan.  
6. Filter transaksi.  
7. Daftar transaksi.  
8. Bottom navigation.  
## 6.3 Pemilih Periode  
Default: bulan berjalan.  
Pengguna dapat:  
* Melihat bulan sebelumnya.  
* Memilih bulan dan tahun.  
* Memilih rentang tanggal khusus.  
## 6.4 Ringkasan  
Menampilkan:  
* Total pemasukan.  
* Total pengeluaran.  
* Selisih pemasukan dan pengeluaran.  
Saldo awal tidak dihitung sebagai pemasukan periode.  
## 6.5 Filter  
Filter berdasarkan:  
* Semua transaksi.  
* Pemasukan.  
* Pengeluaran.  
* Kategori.  
## 6.6 Pencarian  
Pencarian berdasarkan:  
* Nama transaksi.  
* Kategori.  
* Nominal.  
* Catatan.  
## 6.7 Pengelompokan  
Transaksi dikelompokkan berdasarkan tanggal.  
Setiap grup menampilkan:  
* Tanggal.  
* Hari.  
* Jumlah transaksi.  
Tidak menampilkan total transaksi per hari.  
Urutan transaksi:  
* Tanggal terbaru di atas.  
* Waktu terbaru di atas.  
## 6.8 Tampilan Baris Transaksi  
Setiap baris menampilkan:  
* Ikon kategori.  
* Nama transaksi.  
* Kategori.  
* Waktu.  
* Nominal.  
Warna:  
* Pemasukan menggunakan Soft Mint.  
* Pengeluaran menggunakan warna teks netral.  
## 6.9 Empty State  
Jika belum ada transaksi, tampilkan pesan yang informatif dan tombol untuk mulai mencatat transaksi.  
Jika pencarian tidak menemukan hasil, tampilkan pesan bahwa transaksi tidak ditemukan.  
   
⸻  
   
## 7. TRANSACTION DETAIL  
## 7.1 Quick Detail  
Ketika pengguna menekan transaksi, tampilkan bottom sheet.  
Informasi:  
* Nominal.  
* Nama.  
* Jenis.  
* Kategori.  
* Tanggal dan waktu.  
Aksi:  
* Edit.  
* Hapus.  
* Lihat Detail Lengkap.  
Bottom sheet dapat ditutup dengan:  
* Tombol X.  
* Swipe ke bawah.  
* Tap area luar.  
Posisi scroll halaman sebelumnya harus dipertahankan.  
## 7.2 Detail Lengkap  
Menampilkan:  
* Nominal.  
* Jenis transaksi.  
* Nama transaksi.  
* Kategori.  
* Tanggal dan waktu.  
* Catatan.  
* Sumber transaksi.  
* Foto nota jika ada.  
* Riwayat perubahan jika tersedia.  
## 7.3 Edit  
Form edit menggunakan komponen yang sama dengan form input.  
Data awal sudah terisi.  
Tombol: Simpan Perubahan.  
Edit memperbarui transaksi yang sama, bukan membuat transaksi baru.  
Perubahan nominal, jenis, atau tanggal harus memperbarui saldo dan ringkasan.  
## 7.4 Hapus  
Penghapusan meminta konfirmasi.  
Transaksi masuk ke tempat sampah dan tidak langsung dihapus permanen.  
Pengguna dapat memulihkan transaksi selama masa penyimpanan 30 hari.  
Setelah 30 hari, sistem dapat menghapus transaksi secara permanen.  
Penghapusan permanen harus konsisten dengan kebijakan backup dan retensi data.  
   
⸻  
   
## 8. SCAN NOTA  
## 8.1 Tujuan  
Memudahkan pengguna mencatat pengeluaran melalui foto nota.  
## 8.2 Alur  
1. Pengguna membuka menu Scan.  
2. Kamera terbuka langsung.  
3. Pengguna mengambil foto atau memilih gambar dari galeri.  
4. Tampilkan preview.  
5. Pengguna memilih Ambil Ulang atau Lanjutkan.  
6. Sistem menjalankan OCR.  
7. Tampilkan hasil ekstraksi.  
8. Pengguna memeriksa dan mengedit.  
9. Pengguna mengonfirmasi penyimpanan.  
## 8.3 Data OCR  
V1 hanya mengambil:  
* Nama toko atau merchant.  
* Tanggal transaksi.  
* Total pembayaran.  
* Kategori pengeluaran.  
Item produk individual tidak wajib diekstrak.  
Catatan tambahan dapat dimasukkan secara manual.  
## 8.4 Validasi OCR  
Jika OCR gagal atau hasil tidak meyakinkan:  
* Tandai field yang perlu diperiksa.  
* Jangan mengarang nominal.  
* Minta pengguna mengisi atau memperbaiki data.  
## 8.5 Offline  
Pengguna dapat mengambil dan menyimpan foto nota secara offline.  
Pemrosesan OCR dapat dilakukan ketika koneksi tersedia.  
Foto tidak boleh otomatis menghasilkan transaksi tersimpan tanpa konfirmasi pengguna.  
   
⸻  
   
## 9. PROFIL & PENGATURAN  
## 9.1 Struktur  
**Keuangan**  
* Saldo Awal.  
* Kategori Transaksi.  
**Preferensi**  
* Format Tanggal.  
* Mata Uang.  
**Keamanan**  
* PIN.  
* Biometrik.  
* Auto-lock.  
**Data & Backup**  
* Backup dan Pemulihan.  
* Informasi Penyimpanan.  
**Lainnya**  
* Tentang Aplikasi.  
## 9.2 Kategori Transaksi  
Kategori bawaan pemasukan:  
* Gaji.  
* Freelance.  
* Bisnis.  
* Investasi.  
* Hadiah.  
* Lainnya.  
Kategori bawaan pengeluaran:  
* Makanan.  
* Transportasi.  
* Belanja.  
* Tagihan.  
* Hiburan.  
* Kesehatan.  
* Pendidikan.  
* Lainnya.  
Pengguna dapat:  
* Menambah kategori.  
* Mengubah nama kategori.  
* Mengubah ikon kategori.  
* Menonaktifkan kategori.  
Kategori yang sudah digunakan tidak dihapus permanen.  
Kategori pemasukan dan pengeluaran harus dibedakan.  
## 9.3 Preferensi  
Default:  
* Mata uang: IDR.  
* Format nominal: Rp1.000.000.  
* Format tanggal: DD/MM/YYYY.  
* Zona waktu: mengikuti perangkat.  
## 9.4 Keamanan  
* PIN 6 digit.  
* Biometrik opsional.  
* PIN menjadi fallback ketika biometrik gagal.  
* Pengguna dapat mengaktifkan atau menonaktifkan keamanan.  
* Aplikasi terkunci otomatis setelah 1 menit berada di background.  
## 9.5 Backup dan Pemulihan  
Strategi: Hybrid Local + Cloud, dengan pendekatan Local-First.  
Ketentuan:  
* Database lokal merupakan sumber data utama.  
* Aplikasi tetap dapat digunakan offline.  
* Backup otomatis setiap 24 jam ketika internet tersedia.  
* Backup manual melalui tombol Backup Sekarang.  
* Backup harus terenkripsi.  
* Tampilkan status backup terakhir.  
* Jika gagal, berikan notifikasi dan lakukan retry.  
Pemulihan:  
1. Tampilkan daftar atau informasi backup yang tersedia.  
2. Tampilkan tanggal backup.  
3. Buat backup pengaman dari data lokal saat ini.  
4. Minta konfirmasi.  
5. Lakukan pemulihan.  
6. Verifikasi integritas data.  
Sinkronisasi real-time antarperangkat tidak termasuk V1.  
## 9.6 Informasi Penyimpanan  
Menampilkan:  
* Status database lokal.  
* Status koneksi cloud.  
* Ukuran data tersimpan.  
* Waktu backup terakhir.  
* Tombol backup ulang.  
## 9.7 Tentang Aplikasi  
Menampilkan:  
* Nama aplikasi.  
* Logo.  
* Versi aplikasi.  
* Informasi pengembang.  
* Hak cipta.  
* Kebijakan privasi.  
   
⸻  
   
## 10. EXPORT REPORT  
## 10.1 CSV  
Pengguna dapat mengekspor:  
* Seluruh transaksi.  
* Transaksi berdasarkan periode.  
* Transaksi berdasarkan filter.  
CSV mencakup data transaksi yang relevan, seperti:  
* Tanggal.  
* Nama.  
* Jenis.  
* Kategori.  
* Nominal.  
* Catatan.  
* Sumber transaksi.  
Format harus kompatibel dengan spreadsheet umum.  
## 10.2 PDF  
PDF menampilkan laporan berdasarkan periode.  
Konten:  
* Periode laporan.  
* Total pemasukan.  
* Total pengeluaran.  
* Selisih.  
* Saldo.  
* Daftar transaksi.  
Laporan harus mudah dibaca dan siap disimpan atau dibagikan.  
   
⸻  
   
## 11. BUSINESS RULES  
1. Saldo awal bukan pemasukan.  
2. Saldo awal hanya menjadi dasar perhitungan.  
3. Transaksi sebelum tanggal mulai pencatatan tidak dihitung.  
4. Pemasukan menambah saldo.  
5. Pengeluaran mengurangi saldo.  
6. Transaksi yang dihapus tidak dihitung dalam saldo.  
7. Transaksi yang dipulihkan kembali masuk perhitungan.  
8. Edit transaksi memperbarui record yang sama.  
9. Setiap transaksi memiliki ID unik.  
10. Penyimpanan transaksi harus mencegah double submission.  
11. Semua perubahan nominal harus memicu perhitungan saldo terbaru.  
12. Semua transaksi menggunakan IDR pada V1.  
13. Semua tanggal disimpan secara konsisten dengan zona waktu yang ditetapkan.  
14. Saldo awal tidak boleh diubah tanpa konfirmasi.  
15. Perubahan saldo awal harus dapat diaudit.  
   
⸻  
   
## 12. DATA MODEL  
Model berikut merupakan kebutuhan konseptual. Struktur database final ditentukan saat Technical Specification.  
## 12.1 User Settings  
* user_id  
* currency  
* date_format  
* timezone  
* security_enabled  
* biometric_enabled  
* auto_lock_duration  
## 12.2 Opening Balance  
* id  
* amount  
* start_date  
* created_at  
* updated_at  
Perubahan saldo awal perlu memiliki catatan audit.  
## 12.3 Transactions  
* id  
* name  
* amount  
* type  
* category_id  
* transaction_date  
* note  
* source  
* receipt_image_path  
* status  
* created_at  
* updated_at  
* deleted_at  
## 12.4 Categories  
* id  
* name  
* type  
* icon  
* is_default  
* is_active  
* created_at  
* updated_at  
## 12.5 Backup Metadata  
* id  
* backup_date  
* backup_type  
* backup_status  
* backup_size  
* cloud_reference  
* created_at  
## 12.6 Audit Log  
Digunakan untuk perubahan penting, seperti:  
* Perubahan saldo awal.  
* Perubahan transaksi.  
* Penghapusan transaksi.  
* Pemulihan transaksi.  
* Pemulihan backup.  
   
⸻  
   
## 13. NON-FUNCTIONAL REQUIREMENTS  
## 13.1 Performance  
* Navigasi harus terasa ringan.  
* Input transaksi tidak boleh terasa lambat.  
* Daftar transaksi menggunakan lazy loading ketika volume data bertambah.  
* Animasi tidak boleh menghambat interaksi.  
* Tidak boleh melakukan proses berat pada main UI thread.  
## 13.2 Reliability  
* Perhitungan saldo harus konsisten.  
* Data tidak boleh hilang ketika aplikasi ditutup secara mendadak.  
* Operasi penyimpanan harus bersifat atomik.  
* Backup harus dapat diverifikasi.  
* Pemulihan harus memiliki mekanisme pengamanan.  
## 13.3 Security  
* Backup terenkripsi.  
* PIN tidak disimpan dalam bentuk teks biasa.  
* Gunakan mekanisme penyimpanan kredensial yang aman.  
* Foto nota dan data transaksi tidak boleh dibagikan tanpa tindakan pengguna.  
* Akses aplikasi mengikuti pengaturan keamanan pengguna.  
## 13.4 Offline Capability  
Fitur berikut harus tetap berjalan tanpa internet:  
* Melihat saldo.  
* Melihat riwayat.  
* Mencatat transaksi manual.  
* Mengedit transaksi.  
* Menghapus dan memulihkan transaksi.  
* Mengelola kategori.  
* Menghasilkan laporan lokal jika semua data tersedia.  
Backup cloud dan OCR online dapat menunggu koneksi.  
   
⸻  
   
## 14. OUT OF SCOPE V1  
Fitur berikut ditunda:  
* Banyak rekening atau dompet.  
* Real-time multi-device sync.  
* AI generatif untuk parsing transaksi.  
* Voice input.  
* Anggaran dan target tabungan.  
* Pengingat tagihan.  
* Analitik keuangan kompleks.  
* Pengelolaan investasi.  
* Pencatatan akuntansi bisnis.  
* Itemized receipt OCR.  
Fitur tersebut tidak boleh ditambahkan selama implementasi V1 tanpa evaluasi scope terlebih dahulu.  
   
⸻  
   
## 15. ACCEPTANCE CRITERIA  
V1 dianggap memenuhi kebutuhan produk ketika:  
1. Pengguna dapat menyelesaikan setup saldo awal.  
2. Saldo awal tidak dihitung sebagai pemasukan.  
3. Pengguna dapat mencatat pemasukan dan pengeluaran.  
4. Input natural language dapat diproses dan dikoreksi.  
5. Pengguna dapat menyimpan transaksi setelah preview.  
6. Saldo otomatis berubah setelah transaksi disimpan.  
7. Edit transaksi memperbarui saldo dengan benar.  
8. Penghapusan transaksi mengeluarkan transaksi dari perhitungan.  
9. Pemulihan transaksi mengembalikan pengaruhnya terhadap saldo.  
10. Riwayat dapat dicari dan difilter.  
11. Scan nota dapat menghasilkan data yang bisa diedit.  
12. Tidak ada hasil OCR yang disimpan tanpa konfirmasi.  
13. Aplikasi dapat digunakan untuk fungsi inti secara offline.  
14. Backup manual dan otomatis dapat berjalan.  
15. Pemulihan backup memerlukan konfirmasi.  
16. PIN dan biometrik berfungsi sesuai pengaturan.  
17. Ekspor CSV dan PDF menghasilkan file yang valid.  
18. Tidak ada perubahan saldo akibat transaksi ganda yang tidak disengaja.  
19. Seluruh fitur utama konsisten dengan design system.  
   
⸻  
   
## 16. DEVELOPMENT PRIORITY  
Urutan pengembangan:  
**Phase 1 — Foundation**  
* Project setup.  
* Database lokal.  
* Model data.  
* Navigasi global.  
* Design system.  
* Saldo awal.  
**Phase 2 — Core Finance**  
* Beranda.  
* Input transaksi.  
* Parser.  
* Preview transaksi.  
* Riwayat.  
* Detail transaksi.  
* Edit dan hapus.  
**Phase 3 — Supporting Features**  
* Kategori.  
* Pencarian.  
* Filter.  
* CSV.  
* PDF.  
**Phase 4 — Receipt Scan**  
* Kamera.  
* Galeri.  
* Image preview.  
* OCR.  
* Validasi hasil.  
**Phase 5 — Security & Backup**  
* PIN.  
* Biometrik.  
* Auto-lock.  
* Cloud backup.  
* Restore.  
* Storage information.  
**Phase 6 — Quality Assurance**  
* Functional testing.  
* Offline testing.  
* Data integrity testing.  
* Security testing.  
* UI polishing.  
* Device testing.  
   
⸻  
   
## 17. OPEN DECISIONS FOR TECHNICAL SPECIFICATION  
Keputusan berikut belum ditetapkan dan tidak boleh diasumsikan secara sembarangan:  
1. Framework dan bahasa pemrograman.  
2. Platform target dan strategi distribusi.  
3. Database lokal.  
4. Cloud storage dan backup provider.  
5. OCR engine/provider.  
6. Arsitektur aplikasi.  
7. Sistem autentikasi dan enkripsi backup.  
8. Struktur folder dan modularisasi.  
9. Mekanisme migrasi database.  
10. Strategi pengujian otomatis.  
Pemilihan teknologi harus mempertimbangkan:  
* Kemudahan pengembangan.  
* Kualitas pengalaman pengguna.  
* Biaya operasional.  
* Keamanan.  
* Kemampuan offline.  
* Kemudahan pemeliharaan.  
* Kompatibilitas perangkat target.  
   
⸻  
   
## 18. PRODUCT SUCCESS CRITERIA  
V1 dinilai berhasil jika:  
* Pengguna dapat mencatat transaksi dengan cepat.  
* Pengguna dapat mengetahui saldo secara akurat.  
* Pengguna dapat menemukan transaksi lama dengan mudah.  
* Aplikasi tetap berfungsi tanpa internet.  
* Data dapat dicadangkan dan dipulihkan.  
* Tidak ada kehilangan atau duplikasi data yang tidak disengaja.  
* Penggunaan sehari-hari terasa sederhana dan nyaman.  
**Prinsip akhir: selesaikan fungsi inti, uji dengan penggunaan nyata, baru pertimbangkan penambahan fitur.**  
