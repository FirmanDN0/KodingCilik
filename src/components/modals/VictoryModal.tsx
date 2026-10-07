import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Award, RotateCcw, ArrowRight, X } from 'lucide-react';
import { sound } from '../../lib/audio';

interface VictoryModalProps {
  isOpen: boolean;
  levelId: number;
  starsEarned: number;
  blockCount: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onOpenCertificate: () => void;
  onClose: () => void;
  hasNextLevel: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  levelId,
  starsEarned,
  blockCount,
  onNextLevel,
  onReplay,
  onOpenCertificate,
  onClose,
  hasNextLevel,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playWin();
      // Blast cheerful confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#38BDF8', '#8B5CF6', '#EC4899'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-amber-400 shadow-2xl relative text-center">
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot victory header */}
        <div className="w-20 h-20 mx-auto -mt-14 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center text-4xl animate-bounce">
          🎉
        </div>

        <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-1">
          Hore! Misi Berhasil!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Kamu berhasil memandu Kiko mencapai bendera finish di <span className="font-bold">Level {levelId}</span>!
        </p>

        {/* Stars Display */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map((starIdx) => {
            const isFilled = starIdx <= starsEarned;
            return (
              <div
                key={starIdx}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  isFilled
                    ? 'bg-amber-100 border-amber-400 shadow-md scale-105 animate-pop'
                    : 'bg-slate-100 border-slate-200 opacity-40'
                }`}
              >
                <Star
                  className={`w-8 h-8 ${
                    isFilled ? 'text-amber-500 fill-amber-400' : 'text-slate-400'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Statistics Pill */}
        <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 mb-6 flex items-center justify-around text-xs">
          <div>
            <span className="text-slate-500 block">Balok Digunakan</span>
            <span className="font-fun font-bold text-base text-slate-800">
              {blockCount} Balok
            </span>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div>
            <span className="text-slate-500 block">Bintang Diraih</span>
            <span className="font-fun font-bold text-base text-amber-600">
              +{starsEarned} Bintang ⭐
            </span>
          </div>
        </div>

        {/* Actions buttons */}
        <div className="space-y-2.5">
          {hasNextLevel ? (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNextLevel();
              }}
              className="w-full btn-3d-green text-white font-fun font-bold text-base py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Lanjut Level Berikutnya</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="w-full btn-3d-yellow text-slate-950 font-fun font-bold text-base py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Award className="w-5 h-5 text-amber-800" />
              <span>Cetak Sertifikat Kelulusan! 🎓</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onReplay();
              }}
              className="py-2.5 px-3 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 font-fun font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="py-2.5 px-3 rounded-2xl border-2 border-amber-300 bg-amber-100 hover:bg-amber-200 font-fun font-bold text-xs text-amber-900 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Lihat Sertifikat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
