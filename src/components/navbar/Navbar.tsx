import React from 'react';
import { Volume2, VolumeX, Sparkles, Map, Award, BookOpen, Trophy, Compass } from 'lucide-react';
import { sound } from '../../lib/audio';

interface NavbarProps {
  totalStars: number;
  soundMuted: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onOpenLevels: () => void;
  onOpenSandbox: () => void;
  onOpenCertificate: () => void;
  onOpenParentsGuide: () => void;
  onOpenLeaderboard: () => void;
  isSandboxMode: boolean;
  onExitSandbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalStars,
  soundMuted,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
  onOpenLevels,
  onOpenSandbox,
  onOpenCertificate,
  onOpenParentsGuide,
  onOpenLeaderboard,
  isSandboxMode,
  onExitSandbox,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div 
          onClick={() => {
            sound.playClick();
            if (isSandboxMode) onExitSandbox();
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center text-2xl shadow-md border-2 border-amber-500/30 group-hover:scale-105 group-hover:rotate-6 transition-transform">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-fun text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                KodingCilik
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                SD Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block -mt-1 font-medium">
              Petualangan Logika & Koding Anak Cerdas
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Level Selector Button */}
          <button
            onClick={() => {
              sound.playClick();
              if (isSandboxMode) onExitSandbox();
              onOpenLevels();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 transition-colors shadow-xs"
            title="Pilih Level Petualangan"
          >
            <Map className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Petualangan</span>
          </button>

          {/* Sandbox Creative Mode */}
          <button
            onClick={() => {
              sound.playClick();
              if (isSandboxMode) onExitSandbox();
              else onOpenSandbox();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors border shadow-xs ${
              isSandboxMode 
                ? 'bg-purple-600 text-white border-purple-700' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300'
            }`}
            title="Lab Bebas Koding"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden md:inline">{isSandboxMode ? 'Kembali' : 'Lab Bebas'}</span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300 transition-colors shadow-xs"
            title="Papan Skor Bintang"
          >
            <Trophy className="w-4 h-4 text-blue-600" />
            <span className="hidden lg:inline">Peringkat</span>
          </button>

          {/* Certificate Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCertificate();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors shadow-xs"
            title="Cetak Sertifikat Programmer Cilik"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">Sertifikat</span>
          </button>

          {/* Parents Guide */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenParentsGuide();
            }}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
            title="Panduan Orang Tua & Guru"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Star Counter */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-400 text-amber-950 font-bold text-sm shadow-xs border border-amber-500">
            <Sparkles className="w-4 h-4 text-amber-900 fill-amber-300" />
            <span>{totalStars}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`p-2 rounded-xl border transition-colors ${
              soundMuted 
                ? 'bg-rose-100 text-rose-700 border-rose-300' 
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
            title={soundMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Speech Voice Assistant Toggle */}
          <button
            onClick={() => {
              onToggleSpeech();
            }}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
              speechEnabled
                ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                : 'bg-slate-100 text-slate-500 border-slate-300'
            }`}
            title={speechEnabled ? 'Suara Kiko Aktif' : 'Suara Kiko Nonaktif'}
          >
            <span>AI 🗣️</span>
          </button>
        </div>
      </div>
    </header>
  );
};
