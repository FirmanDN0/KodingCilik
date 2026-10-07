# 📝 JURNAL PROMPT TERKURASI (MAKSIMAL 5 PROMPT)
## M-ONE TELKOMSEL CODING COMPETITION 2026 — KATEGORI UMUM
**Peserta:** Firman Dwi Nugraha  
**Proyek:** KodingCilik — Petualangan Logika & Koding Interaktif untuk Anak SD  
**Tanggal Mulai:** 7 Oktober 2026 (Kompetisi dibuka 5 Okt 2026)  

---

### PROMPT 1: Ideation, PRD & Architecture Design (Tahap Perancangan)
* **Kategori:** Ide / PRD & System Design
* **Waktu Eksekusi:** 7 Oktober 2026, 10:20 WIB
* **Isi Prompt:**
  > "Saya ingin membuat aplikasi web edukasi coding khusus anak SD (usia 6-12 tahun) untuk M-ONE Coding Competition dengan tema 'Innovating Education Through Technology'. Rancanglah PRD lengkap dan arsitektur teknis untuk platform bernama 'KodingCilik' dengan kriteria:
  > 1. Mengajarkan Computational Thinking & logika koding dasar secara visual (sekuensi, loop perulangan, arah gerak) tanpa sintaks teks yang rumit.
  > 2. Memiliki simulator visual grid di mana anak menyusun balok perintah (Maju, Belok, Lompat, Loop) untuk memandu maskot robot Kiko mencapai tujuan dan mengumpulkan bintang.
  > 3. Terdapat AI Tutor pendamping ramah anak yang memberi umpan balik suportif dan suara Text-to-Speech bahasa Indonesia.
  > 4. Menggunakan stack Vite + React + TypeScript + Tailwind CSS dengan desain tombol taktil 3D ceria (ala Duolingo).
  > 5. Buatkan struktur folder modular, PRD, dokumen arsitektur, dan pedoman kerja AI anti-slop."
* **Hasil & Refleksi:**
  Menghasilkan dokumen `docs/PRD.md`, `docs/ARCHITECTURE.md`, dan inisialisasi basis proyek Vite React TypeScript dengan Tailwind CSS v4.

---

### PROMPT 2: Core Feature Implementation (Interpreter Blok & Grid World)
* **Kategori:** Implementasi Fitur Utama
* **Waktu Eksekusi:** 7 Oktober 2026, 10:35 WIB
* **Isi Prompt:**
  > "Bangun sistem interpreter visual block coding (`lib/interpreter.ts`) dan komponen Grid World simulator di React:
  > 1. Buat tipe data CommandType untuk balok: FORWARD, TURN_RIGHT, TURN_LEFT, JUMP, COLLECT, dan LOOP(count).
  > 2. Buat fungsi unwrapping rekursif untuk membongkar balok LOOP ke dalam urutan langkah atomik dengan tetap memetakan referensi highlight ke balok asal saat animasi berjalan.
  > 3. Implementasikan eksekusi asinkron per langkah (delay ~500ms) dengan visualisasi Kiko bergerak, berputar 90 derajat secara halus, dan melompat rintangan.
  > 4. Tambahkan tombol 'Jalankan 🚀', 'Pause ⏸️', 'Langkah Demi Langkah ⏯️', dan 'Reset 🔄' agar anak bisa melakukan visual debugging."
* **Hasil & Refleksi:**
  Interpreter dapat mengeksekusi sekuensi dan loop dengan lancar, memberikan highlight visual pada balok yang sedang aktif, serta mendeteksi kondisi tabrakan dan kemenangan secara akurat.

---

### PROMPT 3: Technical Debugging & State Tracing (Pemecahan Masalah)
* **Kategori:** Debugging (Menunjukkan Pemahaman Masalah Teknis)
* **Waktu Eksekusi:** 7 Oktober 2026, 10:55 WIB
* **Isi Prompt:**
  > "Saya menemukan potensi race condition pada eksekusi kode ketika anak menekan tombol 'Jalankan' berulang kali atau menekan 'Reset' di tengah-tengah animasi Kiko yang sedang berjalan. Karakter Kiko melompat ke koordinat yang salah dan status highlight balok menjadi tidak sinkron.
  > Analisis penyebab bug ini pada state React (`isExecuting`, timer refs, dan activeBlockIndex), lalu perbaiki dengan:
  > 1. Menggunakan `useRef` untuk memegang status pembatalan (`abortController` atau `executionTokenRef`) sehingga ketika reset ditekan, seluruh promise delay yang sedang berjalan langsung dibatalkan secara bersih.
  > 2. Mencegah pemanggilan ganda pada tombol eksekusi saat animasi aktif.
  > 3. Pastikan rotasi sudut karakter Kiko (0, 90, 180, 270 derajat) ternormalisasi tanpa efek snapping aneh di CSS transform."
* **Hasil & Refleksi:**
  Race condition teratasi sepenuhnya. Kiko bergerak stabil, tombol reset membatalkan eksekusi seketika, dan transisi rotasi sudut menggunakan CSS transform yang mulus.

---

### PROMPT 4: Audit, Accessibility & Audio Synthesizer (Optimasi & Standar Kualitas)
* **Kategori:** Audit & Optimasi
* **Waktu Eksekusi:** 7 Oktober 2026, 11:15 WIB
* **Isi Prompt:**
  > "Lakukan audit menyeluruh terhadap performa, keterbacaan, dan audio aplikasi KodingCilik:
  > 1. Buatkan modul audio Web Audio API synthesizer murni (`lib/audio.ts`) agar tidak perlu me-load file MP3 eksternal yang boros bandwidth dan rawan autoplay blocked. Buat efek suara pop, step, star, fanfare, dan oops.
  > 2. Periksa kontras warna UI agar memenuhi standar WCAG AA ramah anak SD dengan latar warna cerah yang tidak menyilaukan.
  > 3. Pastikan ukuran target sentuh tombol minimal 48x48px untuk jemari anak di tablet/HP.
  > 4. Tambahkan fallback offline-first untuk data progres dan Supabase agar aplikasi tetap berjalan 100% tanpa error di hosting Vercel meskipun tanpa koneksi API eksternal."
* **Hasil & Refleksi:**
  Aplikasi memiliki efek suara instan tanpa jeda loading, responsif penuh di mobile/tablet, dan aman dari kegagalan jaringan berkat dual-mode storage.

---

### PROMPT 5: Finishing, Gamification & Certificate Generator (Polesan Akhir)
* **Kategori:** Finishing & Fitur Inovatif Tambahan
* **Waktu Eksekusi:** 7 Oktober 2026, 11:35 WIB
* **Isi Prompt:**
  > "Lengkapi KodingCilik dengan fitur inovatif penutup yang memberi nilai guna nyata bagi pendidikan anak SD:
  > 1. Buatkan modul Sertifikat Programmer Cilik Resmi (`CertificateModal.tsx`) yang dapat memuat nama anak, tanggal otomatis, lencana emas, dan tombol unduh/cetak instan.
  > 2. Integrasikan Canvas Confetti saat anak berhasil menyelesaikan level atau mendapatkan bintang penuh.
  > 3. Buat modul 'Panduan Orang Tua & Guru' yang menjelaskan konsep Computational Thinking (Sekuensi, Perulangan, Dekomposisi) dengan analogi kehidupan sehari-hari anak SD.
  > 4. Sempurnakan dialog ramah anak Kiko AI dengan Web Speech API suara bahasa Indonesia."
* **Hasil & Refleksi:**
  Aplikasi menjadi sangat hidup, memiliki daya tarik emosional bagi anak-anak, dan memberikan luaran nyata berupa sertifikat kelulusan.
