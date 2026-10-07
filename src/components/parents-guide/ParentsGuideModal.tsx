import React from 'react';
import { X, Heart, CheckCircle2, ShieldCheck, Brain, Compass } from 'lucide-react';
import { sound } from '../../lib/audio';

interface ParentsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentsGuideModal: React.FC<ParentsGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-pop">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full border-4 border-amber-400 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl text-amber-700">
              📖
            </span>
            <div>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-800">
                Panduan Orang Tua & Guru
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Mengapa koding dan logika penting bagi tumbuh kembang anak SD?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {/* Intro Box */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p>
              Selamat datang, Ayah, Bunda, dan Bapak/Ibu Guru! <span className="font-bold text-amber-900">KodingCilik</span> dirancang bukan untuk menuntut anak menjadi pemrogram profesional instan, melainkan melatih <span className="font-bold">Berpikir Komputasional (Computational Thinking)</span> sejak usia sekolah dasar melalui eksplorasi visual yang gembira dan bebas stres.
            </p>
          </div>

          {/* 4 Pillars */}
          <div>
            <h3 className="font-fun font-bold text-slate-900 text-base mb-2 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-600" />
              4 Pilar Berpikir Komputasional pada KodingCilik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block text-xs mb-1">
                  1. Dekomposisi (Memecah Masalah)
                </span>
                <p className="text-xs text-slate-600">
                  Anak memecah tujuan akhir mencapai bendera finish menjadi langkah-langkah kecil: maju, belok, lalu melangkah lagi.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="font-bold text-blue-900 block text-xs mb-1">
                  2. Pengenalan Pola (Patterns)
                </span>
                <p className="text-xs text-slate-600">
                  Anak menemukan gerakan berulang (misal tangga atau rute lurus) dan menyederhanakannya dengan balok <i>Looping (Perulangan)</i>.
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <span className="font-bold text-purple-900 block text-xs mb-1">
                  3. Abstraksi (Fokus Inti)
                </span>
                <p className="text-xs text-slate-600">
                  Anak mengabaikan hal yang tidak relevan dan fokus memperhatikan jalur peta serta rintangan batu/sungai.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="font-bold text-amber-900 block text-xs mb-1">
                  4. Algoritma (Urutan Logis)
                </span>
                <p className="text-xs text-slate-600">
                  Anak menyusun rangkaian balok dari awal hingga akhir dengan urutan yang tepat dan dapat dibuktikan.
                </p>
              </div>
            </div>
          </div>

          {/* Tips for parents */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-fun font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-600" />
              Tips Mendampingi Anak:
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Biarkan anak mencoba sendiri dan mengalami tabrakan/kesalahan tanpa dimarahi. Fitur <i>Langkah Demi Langkah</i> membantu anak menemukan sendiri kesalahannya (*debugging*).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Gunakan tombol suara Kiko AI untuk membacakan pesan jika anak masih dalam tahap belajar membaca awal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Cetak Sertifikat Programmer Cilik setelah anak menyelesaikan pulau pembelajaran sebagai bentuk apresiasi dan kebanggaan anak.</span>
              </li>
            </ul>
          </div>

          {/* Child safety guarantee */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-semibold border border-emerald-300">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>100% Aman untuk Anak: Tanpa iklan, tanpa pelacakan data pribadi, dan ramah privasi murid SD.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-3d-yellow text-slate-950 font-fun font-bold text-sm py-2 px-6 rounded-xl cursor-pointer"
          >
            Mengerti, Lanjut Belajar! 👍
          </button>
        </div>
      </div>
    </div>
  );
};
