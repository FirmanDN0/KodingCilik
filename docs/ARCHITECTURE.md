# 🏛️ SYSTEM ARCHITECTURE & TECHNICAL SPECIFICATION
## KodingCilik — Platform Edukasi Koding Anak SD

---

## 1. Arsitektur Komponen & Struktur Direktori

```text
kodingcilik/
├── docs/
│   ├── PRD.md                 # Product Requirements Document
│   ├── ARCHITECTURE.md        # Arsitektur sistem & spesifikasi teknis
│   ├── AI_GUIDELINES.md       # Panduan pengerjaan & standar kualitas AI Agent
│   ├── PROMPT_JOURNAL.md      # Jurnal 5 prompt terkurasi (Wajib Penilaian)
│   └── RAW_PROMPT_LOG.md      # Log mentah prompt awal–akhir (Verifikasi)
├── public/
│   └── favicon.svg            # Favicon maskot Kiko
├── src/
│   ├── assets/                # Gambar, vektor, dan dekorasi visual
│   ├── components/
│   │   ├── block-editor/      # Komponen editor balok koding (Toolbox & Queue)
│   │   ├── grid-world/        # Dunia simulasi grid karakter Kiko (Canvas/DOM)
│   │   ├── ai-tutor/          # Maskot Kiko AI dialog & Text-to-Speech
│   │   ├── certificate/       # Generator sertifikat Programmer Cilik
│   │   ├── parents-guide/     # Modul panduan orang tua & guru
│   │   ├── leaderboard/       # Papan peringkat & progres pemain (Supabase)
│   │   └── ui/                # Tombol 3D taktil, modal, badge bintang, toggle suara
│   ├── lib/
│   │   ├── audio.ts           # Web Audio API Synthesizer (Bebas latency & file eksternal)
│   │   ├── interpreter.ts     # Engine eksekusi kode balok & penanganan Loop
│   │   ├── levels.ts          # Definisi peta petualangan, grid, dan rintangan level
│   │   ├── speech.ts          # Integrasi Web Speech API (Suara Kiko ramah anak)
│   │   └── supabase.ts        # Client Supabase & LocalStorage Fallback Handler
│   ├── types/
│   │   └── game.ts            # Definisi antarmuka TypeScript (Block, Level, Grid, Player)
│   ├── App.tsx                # Routing state utama & tata letak aplikasi
│   ├── main.tsx               # Entry point React 19
│   └── index.css              # Styling Tailwind CSS v4 & custom keyframes
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 2. Block Coding Interpreter Engine (`lib/interpreter.ts`)

Blok koding disusun oleh anak sebagai serangkaian perintah objek:
```typescript
export type CommandType = 'FORWARD' | 'TURN_RIGHT' | 'TURN_LEFT' | 'JUMP' | 'COLLECT' | 'LOOP';

export interface CodeBlock {
  id: string;
  type: CommandType;
  label: string;
  icon: string;
  color: string;
  loopCount?: number;
  innerBlocks?: CodeBlock[];
}
```

### Mekanisme Eksekusi:
1. **Unwrapping / Flattening:** Saat anak menggunakan blok `LOOP(x3)`, interpreter secara rekursif membuka blok internal menjadi urutan langkah atomik dengan tetap menyimpan metadata index blok asal (untuk keperluan efek visual highlight).
2. **Step-by-Step Animation Queue:** Generator function atau async loop mengeksekusi satu langkah per interval (default ~600ms), memperbarui koordinat posisi karakter Kiko `(x, y)` dan arah hadap `(NORTH, EAST, SOUTH, WEST)`.
3. **Collision & Rule Check:**
   * Jika Kiko melangkah ke petak rintangan (batu/air) tanpa `JUMP`, status berubah menjadi `CRASH`.
   * Jika Kiko berada di petak bintang dan mengeksekusi `COLLECT` (atau otomatis mengambil), skor bintang bertambah.
   * Jika Kiko berada di petak bendera akhir, status berubah menjadi `VICTORY`.
4. **Step Debugging:** Anak dapat menekan tombol *Langkah Demi Langkah (Next Step)* untuk menjalankan tepat 1 instruksi saja, melatih konsep debugging sejak dini.

---

## 3. Web Audio API Synthesizer (`lib/audio.ts`)

Menghindari ketergantungan file MP3 eksternal yang lambat dimuat dan sering diblokir kebijakan autoplay browser:
* Menggunakan `AudioContext` bawaan peramban web modern.
* Menghasilkan gelombang nada ceria (*sine & square waves*) dengan envelope ADSR (*Attack, Decay, Sustain, Release*):
  * **Play Click:** Nada pop ringan (frekuensi 600Hz -> 300Hz, durasi 0.05s).
  * **Play Move:** Suara langkah Kiko (frekuensi 400Hz, durasi 0.08s).
  * **Play Star:** Arpeggio gemerlap bintang (C5 -> E5 -> G5 -> C6).
  * **Play Win:** Melodi kemenangan ceria (*fanfare*).
  * **Play Oops:** Efek pegas kartun (*boing*).
* Dilengkapi global state *Mute Toggle* untuk kenyamanan anak dan lingkungan kelas.

---

## 4. Database & Cloud Architecture (`lib/supabase.ts`)

Aplikasi mengusung prinsip **Offline-First Resilience**:
* **Lokal:** Semua progres (level terbuka, total bintang yang dikumpulkan, nama anak) disimpan seketika di `localStorage`.
* **Cloud (Supabase):** Jika `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dikonfigurasi, progres pemain dan papan skor disinkronkan ke tabel `kodingcilik_leaderboard`.
* **Zero Failure:** Jika koneksi offline atau kredensial belum diisi, aplikasi tetap berfungsi 100% tanpa error berkat fallback mock storage otomatis.

---

## 5. Standar Aksesibilitas & Responsivitas (UI/UX)
* **Mobile & Tablet Friendly:** Grid simulasi dan antrean blok menggunakan layout flex/grid responsif dengan ukuran sentuh minimal 48px x 48px untuk jemari anak-anak.
* **Kontras Warna Tinggi:** Sesuai standar WCAG AA dengan latar belakang hangat (`#FEFCE8`) dan palet warna kontras yang tidak melelahkan mata anak.
* **Tipografi Bersahabat:** Kombinasi font Google *Fredoka* (judul ceria & ramah) dan *Plus Jakarta Sans* (teks informasi mudah dibaca).
