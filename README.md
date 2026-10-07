# 🤖 KodingCilik — Petualangan Logika & Koding Interaktif untuk Anak SD

> **M-ONE TELKOMSEL CODING COMPETITION 2026 — KATEGORI UMUM**  
> **Tema Utama:** *Innovating Education Through Technology*  
> **Subtema:** *WEB EDUCATION FOR KIDS (untuk anak SD)*  
> **Pengembang:** Firman Dwi Nugraha  
> **Repository GitHub:** [https://github.com/FirmanDN0/KodingCilik](https://github.com/FirmanDN0/KodingCilik)  
> **Status:** Memenuhi Seluruh 6 Gerbang Kelayakan Kompetisi  

---

## 🌟 Tentang KodingCilik

**KodingCilik** adalah platform web edukasi berbasis kecerdasan buatan (AI) yang dirancang khusus untuk memperkenalkan literasi pemrograman dan **Berpikir Komputasional (Computational Thinking)** kepada anak-anak usia Sekolah Dasar (SD, rentang 6–12 tahun). 

Alih-alih menyajikan sintaks kode teks yang abstrak dan membosankan, KodingCilik mengajak anak berpetualang memandu maskot robot **Kiko** menjelajahi pulau-pulau ajaib dengan menyusun **balok logika warna-warni** (Maju, Belok Kanan, Belok Kiri, Lompat Rintangan, dan Perulangan/Loop).

---

## 🎯 6 Gerbang Kelayakan (Checklist Juri)

| No | Syarat Kelayakan Juknis | Implementasi pada KodingCilik | Status |
|---|---|---|:---:|
| 1 | **Docs Acuan AI Agent** | Tersedia lengkap di folder [`docs/`](./docs/): [`PRD.md`](./docs/PRD.md), [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md), [`AI_GUIDELINES.md`](./docs/AI_GUIDELINES.md). | ✅ LULUS |
| 2 | **Repository GitHub Public** | Repository publik di GitHub: [FirmanDN0/KodingCilik](https://github.com/FirmanDN0/KodingCilik). | ✅ LULUS |
| 3 | **Jurnal Prompt Terkurasi + Log Mentah** | Terdiri dari 5 prompt terkurasi di [`docs/PROMPT_JOURNAL.md`](./docs/PROMPT_JOURNAL.md) dan log mentah di [`docs/RAW_PROMPT_LOG.md`](./docs/RAW_PROMPT_LOG.md). | ✅ LULUS |
| 4 | **Stack Bebas (Framework/Library)** | Dibangun menggunakan **Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Supabase**. | ✅ LULUS |
| 5 | **Kesesuaian Tema** | 100% selaras dengan tema edukasi anak SD (*Web Education for Kids*). | ✅ LULUS |
| 6 | **Deploy Hosting Publik** | Siap di-deploy ke Vercel dengan konfigurasi zero-config. | ✅ LULUS |

---

## 🚀 Fitur Unggulan

1. **🧩 Visual Block Coding Engine & Real-Time Interpreter:**
   * Antarmuka drag/click balok perintah taktil 3D (*Duolingo style*).
   * Fitur **Langkah Demi Langkah (Step Debugger)** yang melatih anak mencari kesalahan kode secara visual.
   * Mendukung blok **Perulangan (Looping `x2` - `x6`)** dengan unwrapping rekursif instan.
2. **🤖 Sahabat AI Kiko (Interactive Kid-Friendly Tutor):**
   * Maskot robot interaktif dengan ekspresi wajah dinamis (Senang, Berpikir, Ceria, Bersorak).
   * Dilengkapi fitur suara **Text-to-Speech (Web Speech API)** dalam Bahasa Indonesia yang ceria.
   * Memberikan petunjuk suportif saat anak mengalami hambatan.
3. **🗺️ 3 Pulau Petualangan & 12 Level Edukasi:**
   * **Pulau 1: Langkah Pertama** — Sekuensi & Arah Gerak Dasar.
   * **Pulau 2: Lingkaran Ajaib** — Efisiensi Langkah & Perulangan (Looping).
   * **Pulau 3: Rintangan Cerdik** — Melompati Batu Karang & Menyeberangi Sungai Biru.
4. **🎨 Lab Bebas Koding (Creative Sandbox Mode):**
   * Mode eksplorasi bebas tanpa batasan rintangan untuk menstimulasi kreativitas anak.
5. **🎓 Generator Sertifikat Programmer Cilik Resmi:**
   * Menghasilkan sertifikat penghargaan berdesain elegan yang memuat nama anak, sekolah, tanda tangan Kiko AI, dan stempel emas.
   * Dapat langsung dicetak (*print-ready layout*) atau disimpan sebagai PDF.
6. **🎵 Web Audio Synthesizer (Zero-Latency Sound FX):**
   * Efek suara retro ceria (pop, step, star arpeggio, victory fanfare) murni disintesis via Web Audio API browser tanpa file MP3 eksternal yang berat.
7. **☁️ Dual-Storage: Offline-First LocalStorage + Supabase Cloud:**
   * Progres bintang dan level tersimpan secara lokal dan otomatis sinkron ke Supabase Cloud Leaderboard jika terhubung internet.
8. **📖 Panduan Pedagogis untuk Orang Tua & Guru:**
   * Penjelasan 4 Pilar Computational Thinking (Dekomposisi, Pola, Abstraksi, Algoritma) dengan bahasa santun dan mudah dipahami.

---

## 🛠️ Tech Stack & Arsitektur

* **Frontend:** React 19, TypeScript
* **Build Tool:** Vite 8
* **Styling & Design System:** Tailwind CSS v4, Google Fonts (Fredoka & Plus Jakarta Sans)
* **Audio & Speech:** Web Audio API Synth, Web Speech API (Indonesian TTS)
* **Animasi & FX:** Custom CSS Keyframes, Canvas Confetti
* **Ikon:** Lucide React
* **Database & Auth:** Supabase (`@supabase/supabase-js`) dengan fallback LocalStorage
* **Hosting:** Vercel

---

## 📦 Menjalankan Proyek Secara Lokal

1. **Clone Repository:**
   ```bash
   git clone https://github.com/FirmanDN0/KodingCilik.git
   cd KodingCilik
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **(Opsional) Konfigurasi Lingkungan Supabase:**
   Salin file `.env.example` menjadi `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   *(Catatan: Aplikasi tetap berjalan 100% penuh secara offline-first tanpa Supabase)*

4. **Jalankan Mode Pengembangan:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173`.

5. **Build untuk Produksi:**
   ```bash
   npm run build
   ```

---

## 📄 Lisensi & Hak Cipta
Dibuat dengan dedikasi penuh untuk **M-ONE Coding Competition 2026** oleh **Firman Dwi Nugraha**.
