# 📘 PRODUCT REQUIREMENTS DOCUMENT (PRD)
## KodingCilik — Petualangan Logika & Koding Interaktif untuk Anak SD
**Kompetisi:** M-ONE TELKOMSEL CODING COMPETITION 2026 (Kategori Umum)  
**Tema:** *Innovating Education Through Technology*  
**Subtema:** *WEB EDUCATION FOR KIDS (untuk anak SD)*  
**Author / Developer:** Firman Dwi Nugraha  
**Repository:** [https://github.com/FirmanDN0/KodingCilik](https://github.com/FirmanDN0/KodingCilik)  

---

## 1. Latar Belakang & Visi Produk
Di era transformasi digital dan kecerdasan buatan (AI), kemampuan berpikir komputasional (*computational thinking*) merupakan literasi fundamental masa depan. Namun, anak-anak usia Sekolah Dasar (SD, rentang usia 6–12 tahun) sering kali kesulitan memahami konsep pemrograman jika disajikan dalam bentuk sintaks kode teks yang abstrak dan kaku.

**KodingCilik** hadir sebagai solusi inovasi edukasi berbasis web yang memadukan:
1. **Visual Block Coding Simulator:** Mengubah abstraksi pemrograman menjadi balok puzzle warna-warni yang menggerakkan karakter maskot (*Kiko si Robot Pintar*) di dunia labirin pulau petualangan.
2. **Kiko AI Tutor Ramah Anak:** Asisten cerdas pemandu yang memberikan umpan balik hangat, menyemangati saat gagal, dan memuji saat berhasil menyelesaikan misi.
3. **Gamifikasi Berjenjang & Sertifikat Instan:** Sistem level terarah sesuai perkembangan kognitif anak SD, perolehan bintang, efek audio interaktif, serta sertifikat resmi *"Programmer Cilik"* yang dapat langsung diunduh/dicetak.
4. **Sinkronisasi Supabase & Offline-First:** Progres belajar tersimpan secara lokal dan otomatis tersinkronisasi ke cloud database bila terhubung internet.

---

## 2. Target Pengguna & Persona
1. **Anak SD Kelas 1–3 (Fase A/B):**
   * *Karakteristik:* Menyukai visual cerah, ikonik, tombol besar, minim teks rumit.
   * *Materi:* Pengenalan arah (Maju, Belok Kanan, Belok Kiri), sekuensi langkah dasar, orientasi spasial.
2. **Anak SD Kelas 4–6 (Fase C):**
   * *Karakteristik:* Tertantang dengan teka-teki logika, ingin bereksplorasi.
   * *Materi:* Perulangan (*Loop / Repeat*), kondisi (*If / Else* sederhana), optimasi jalur terpendek.
3. **Orang Tua & Guru SD:**
   * Memerlukan dashboard ringkas untuk melihat pemahaman logika anak dan panduan pedagogis koding.

---

## 3. Fitur Utama (Core Features)

### 3.1. Mode Petualangan Pulau (Adventure Quest)
* **Pulau 1: Langkah Pertama (Arah & Sekuensi Dasar):** 4 Level tantangan mengajarkan perintah linier.
* **Pulau 2: Lingkaran Ajaib (Perulangan / Loops):** 4 Level tantangan menggunakan balok *Ulangi (Loop)* untuk menghemat langkah.
* **Pulau 3: Rintangan Cerdik (Logika Kondisional / If):** 4 Level tantangan menggunakan logika sensor dan rintangan batuan/kunci.
* Setiap level memiliki target 3 bintang berdasarkan keberhasilan dan efisiensi balok kode.

### 3.2. Visual Block Code Playground & Real-Time Interpreter
* **Area Palet Balok (Block Toolbox):**
  * 🟢 **Maju (Move Forward)**
  * 🔵 **Belok Kanan (Turn Right)**
  * 🟡 **Belok Kiri (Turn Left)**
  * 🟣 **Lompat (Jump)**
  * 🟠 **Ulangi (Loop x2 / x3 / x4)**
  * 🔴 **Ambil Bintang (Collect)**
* **Area Antrean Kode (Command Queue):** Anak dapat menambah balok dengan klik atau drag, menghapus balok, dan melihat urutan perintah secara sekuensial.
* **Visual Execution Simulator:** Saat menekan tombol **"Jalankan Kode 🚀"**, karakter Kiko bergerak di atas petak grid setapak demi setapak, dengan efek highlight pada balok yang sedang aktif berjalan.
* **Mode Langkah-demi-Langkah (Step Debugger):** Memungkinkan anak menelusuri satu perintah demi satu perintah untuk menemukan kesalahan (*debugging*) secara visual.

### 3.3. Sahabat AI Kiko (Kid-Friendly AI Assistant)
* Maskot interaktif di pojok layar dengan ekspresi emosional dinamis (Ceria, Berpikir, Menyemangati, Bersorak).
* Dialog otomatis berbasis status permainan:
  * Menjelaskan tujuan level saat pertama masuk.
  * Memberikan *hint* ramah anak jika Kiko menabrak tepi atau rintangan.
  * Mengucapkan selamat dan apresiasi saat mencapai bendera finish.
* Dilengkapi tombol suara (*Text-to-Speech Web Speech API*) yang membacakan ucapan Kiko dalam bahasa Indonesia ceria.

### 3.4. Kotak Pasir / Lab Bebas (Creative Sandbox)
* Anak bebas menyusun rute dan menguji coba algoritma mereka sendiri tanpa batas level untuk menstimulasi kreativitas.

### 3.5. Sertifikat Programmer Cilik Resmi (Printable & Downloadable)
* Mengisi nama anak, menampilkan nama sekolah, tanggal otomatis, tanda tangan digital Kiko AI, dan stempel emas.
* Dapat langsung diunduh sebagai gambar PNG atau dicetak via dialog print browser.

### 3.6. Audio & Sound FX System (Web Audio Synth)
* Efek suara sintetis retro-ceria yang ringan: klik balok, suara langkah kaki Kiko, suara memungut bintang (*twinkle*), suara tabrakan lucu (*boing*), dan nada kemenangan (*fanfare*).
* Dilengkapi kontrol Audio Mute / Unmute yang mudah diakses.

---

## 4. Arsitektur Teknis & Tech Stack
* **Framework:** React 19 + TypeScript (Vite 8)
* **Styling:** Tailwind CSS v4 dengan sistem tombol 3D taktil ramah anak (*Duolingo style*)
* **Ikonografi:** Lucide React
* **Animasi & FX:** Custom CSS micro-interactions + Canvas Confetti
* **Database & Cloud Sync:** Supabase (PostgreSQL) + LocalStorage (Offline-First)
* **Hosting & Deployment:** Vercel (Auto CI/CD via GitHub)

---

## 5. Indikator Keberhasilan & Metrik Penilaian
1. **Usability Anak SD:** Antarmuka intuitif, dapat dimainkan anak tanpa bantuan intensif orang dewasa.
2. **Kesesuaian Tema:** 100% selaras dengan *Innovating Education Through Technology* (Subtema *Web Education for Kids*).
3. **Zero Critical Bug:** Semua tombol, antrean eksekusi kode, dan interaksi berjalan mulus tanpa runtime crash.
4. **Kualitas Vibe Coding:** Dokumentasi lengkap, 5 prompt terkurasi yang mencerminkan pemikiran analitis, dan riwayat commit teratur.
