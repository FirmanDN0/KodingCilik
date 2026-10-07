import React, { useState } from 'react';
import { Award, Printer, X, Sparkles } from 'lucide-react';
import { sound } from '../../lib/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  playerSchool: string;
  totalStars: number;
  completedLevelsCount: number;
  onUpdatePlayer: (name: string, school: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  playerName,
  playerSchool,
  totalStars,
  completedLevelsCount,
  onUpdatePlayer,
}) => {
  const [name, setName] = useState(playerName || 'Petualang Cilik');
  const [school, setSchool] = useState(playerSchool || 'SD Ceria Nusantara');

  if (!isOpen) return null;

  const todayStr = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const handlePrint = () => {
    sound.playClick();
    onUpdatePlayer(name, school);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl p-4 sm:p-6 max-w-4xl w-full border-4 border-amber-400 shadow-2xl relative my-auto">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-xl text-amber-700">
              🎓
            </span>
            <div>
              <h2 className="font-fun text-lg sm:text-xl font-bold text-slate-800">
                Sertifikat Kelulusan Programmer Cilik
              </h2>
              <p className="text-xs text-slate-500">
                Masukkan nama dan sekolahmu, lalu klik Cetak atau Simpan sebagai PDF!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-3d-yellow text-slate-950 font-fun font-bold text-xs sm:text-sm py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-900" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Name & School Customizer Form (Hidden in Print) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-amber-50/70 rounded-2xl border border-amber-200 print:hidden text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Lengkap Murid:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-400 outline-none"
              placeholder="Contoh: Budi Santoso"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Sekolah Dasar (SD):
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-400 outline-none"
              placeholder="Contoh: SD Negeri 01 Sukoharjo"
            />
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE CANVAS */}
        <div 
          id="printable-certificate"
          className="bg-amber-50/40 border-8 border-double border-amber-500 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-inner text-center select-none"
        >
          {/* Ornate corner badges */}
          <div className="absolute top-2 left-2 text-2xl text-amber-500">⚜️</div>
          <div className="absolute top-2 right-2 text-2xl text-amber-500">⚜️</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-500">⚜️</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-500">⚜️</div>

          {/* Certificate Header */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">🤖</span>
            <span className="font-fun text-xs tracking-widest text-amber-700 font-bold uppercase">
              M-ONE CODING COMPETITION · KODINGCILIK
            </span>
            <span className="text-3xl">⭐</span>
          </div>

          <h1 className="font-fun text-2xl sm:text-4xl md:text-5xl font-black text-amber-900 tracking-tight uppercase mb-1">
            Sertifikat Kelulusan
          </h1>
          <p className="font-fun text-sm sm:text-base font-bold text-amber-700 tracking-wide mb-4">
            PROGRAMMER CILIK INDONESIA
          </p>

          <p className="text-xs sm:text-sm text-slate-500 italic mb-2">
            Sertifikat penghargaan ini diberikan dengan bangga kepada:
          </p>

          {/* Recipient Student Name */}
          <div className="my-3 py-2 border-b-2 border-amber-400 max-w-md mx-auto">
            <h2 className="font-fun text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 capitalize tracking-wide">
              {name || 'Nama Siswa'}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-1">
              {school || 'Sekolah Dasar'}
            </p>
          </div>

          {/* Statement of Achievement */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed my-3 font-medium">
            Telah berhasil menyelesaikan pembelajaran dasar <span className="font-bold text-slate-800">Berpikir Komputasional</span>, 
            memahami algoritma <span className="font-bold text-slate-800">Sekuensi Langkah, Perulangan (Loops), dan Navigasi Logika</span> 
            melalui platform petualangan interaktif <span className="font-bold text-amber-700">KodingCilik</span>.
          </p>

          {/* Achievement Badges */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-400 text-xs font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{totalStars} Bintang Emas</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-400 text-xs font-bold text-emerald-900">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>{completedLevelsCount} Level Ditaklukkan</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-3 items-end max-w-lg mx-auto pt-4 mt-2 text-xs">
            {/* Signature 1 */}
            <div className="flex flex-col items-center">
              <div className="h-10 flex items-center text-2xl font-fun text-sky-700 font-bold italic">
                🤖 Kiko AI
              </div>
              <div className="w-28 border-t border-slate-400 pt-1">
                <span className="font-bold text-slate-800 block">Kiko Robot</span>
                <span className="text-[10px] text-slate-500">AI Coding Mentor</span>
              </div>
            </div>

            {/* Gold Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-4 border-amber-600 shadow-md flex flex-col items-center justify-center text-amber-950">
                <span className="text-xl sm:text-2xl">🏅</span>
                <span className="text-[9px] font-black uppercase tracking-tighter">
                  RESMI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 font-mono">{todayStr}</span>
            </div>

            {/* Signature 2 */}
            <div className="flex flex-col items-center">
              <div className="h-10 flex items-center text-xl font-fun text-amber-800 font-bold italic">
                M-One 2026
              </div>
              <div className="w-28 border-t border-slate-400 pt-1">
                <span className="font-bold text-slate-800 block">Dewan Pembina</span>
                <span className="text-[10px] text-slate-500">Inovasi Edukasi SD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
