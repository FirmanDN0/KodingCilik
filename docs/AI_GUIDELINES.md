# 🤖 AI AGENT GUIDELINES & WORKFLOW STANDARD
## KodingCilik — Prosedur Pengembangan Berbantuan AI (Vibe Coding)

Dokumen ini adalah acuan kerja AI Coding Agent selama pengembangan aplikasi **KodingCilik** sesuai pedoman M-ONE Coding Competition 2026.

---

## 1. Prinsip Utama (Core Principles)

### 1.1. Anti-AI Slop (Kualitas Desain & Kode Di Atas Rata-Rata)
* **Larangan Desain Generik:** Jangan menggunakan template UI generik AI dengan warna abu-abu kusam atau neon tajam tanpa harmonisasi. Gunakan palet ramah anak yang diriset (warm amber, playful emerald, vibrant blue, coral rose) dengan tombol taktil 3D (*Duolingo feel*).
* **Larangan Placeholder & Dummy Crash:** Tidak boleh ada link kosong `#` tanpa aksi, gambar pecah, atau tombol yang tidak bereaksi saat ditekan.
* **Kebersihan Komentar Kode:** Hilangkan komentar redundan/basa-basi ala AI (seperti `// this is a button`). Pertahankan kode yang deskriptif dan self-explanatory.

### 1.2. Child-Centered Design (Desain Khusus Anak SD)
* **Ukuran Elemen Ramah Jari:** Minimal ukuran tombol interaktif 48x48 px agar mudah disentuh di layar sentuh tablet/smartphone.
* **Umpan Balik Positif:** Bahasa yang digunakan AI Tutor Kiko harus selalu afirmatif, ramah, dan mendidik. Kesalahan tidak disebut "Error / Salah", melainkan "Ups, jalannya buntu! Yuk atur ulang baloknya bareng Kiko!".
* **Umpan Balik Multi-Sensorik:** Setiap interaksi penting disertai visual pop, highlight langkah, dan audio sintetis Web Audio API.

---

## 2. Standar Kualitas Teknis & Arsitektur
1. **TypeScript Ketat:** Seluruh data game, balok kode, dan state level harus memiliki antarmuka bertipe kuat (`interface`/`type`).
2. **Kemandirian Komponen:** Setiap komponen modular bertanggung jawab atas fungsionalitasnya sendiri (`GridWorld`, `BlockToolbox`, `CommandQueue`, `AITutor`, `CertificateModal`).
3. **Resiliensi & Toleransi Kegagalan:** Aplikasi harus berjalan mulus baik saat terhubung internet maupun dalam kondisi offline. Fallback otomatis dijamin untuk audio, speech, dan database.
4. **Performa Tinggi:** Waktu muat awal di bawah 1 detik, zero-latency feedback pada audio synth, dan animasi CSS terakselerasi GPU.

---

## 3. Konvensi Git Commit (Conventional Commits)
Setiap perubahan kode dicatat dengan pesan commit yang terstruktur dan bermakna:
* `feat:` Penambahan fitur baru (misal: `feat: implement visual block queue and interpreter`)
* `fix:` Perbaikan bug (misal: `fix: resolve character direction rotation in grid world`)
* `docs:` Pembaruan dokumentasi AI Agent & panduan juri
* `style:` Pembaruan estetika, warna, font, dan animasi
* `refactor:` Peningkatan struktur kode tanpa mengubah fungsionalitas
* `perf:` Optimasi performa render dan memori

---

## 4. Gerbang Kualitas Sebelum Deploy
Sebelum pengumpulan akhir, pastikan:
* [x] `npm run build` sukses tanpa error TypeScript.
* [x] Semua 6 Gerbang Kelayakan terpenuhi.
* [x] Tidak ada console warning/error saat simulasi koding dijalankan.
* [x] Sertifikat berhasil di-render dan dicetak.
* [x] Jurnal 5 prompt terkurasi dan log mentah telah terisi lengkap.
