import React from 'react';
import { WORLDS, LEVELS } from '../../lib/levels';
import { Star, Lock, X } from 'lucide-react';
import { sound } from '../../lib/audio';

interface LevelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevelId: number;
  completedLevels: number[];
  starsCollected: { [levelId: number]: number };
  onSelectLevel: (levelId: number) => void;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLevelId,
  completedLevels,
  starsCollected,
  onSelectLevel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-pop">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-3xl w-full border-4 border-amber-400 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
              🗺️
            </span>
            <div>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-800">
                Peta Pulau Petualangan
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Pilih pulau dan level untuk memulai tantangan koding
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

        {/* Worlds & Levels Container */}
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
          {WORLDS.map((world) => {
            const worldLevels = LEVELS.filter((l) => l.worldId === world.id);

            return (
              <div
                key={world.id}
                className={`p-4 rounded-3xl border-2 bg-gradient-to-r ${world.themeBg} ${world.borderColor}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{world.icon}</span>
                  <div>
                    <h3 className="font-fun font-bold text-slate-800 text-base sm:text-lg">
                      {world.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {world.subtitle}
                    </p>
                  </div>
                </div>

                {/* Levels Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {worldLevels.map((lvl) => {
                    // Level is unlocked if it's level 1, or previous level is completed, or it's in completedLevels
                    const isUnlocked =
                      lvl.id === 1 ||
                      completedLevels.includes(lvl.id) ||
                      completedLevels.includes(lvl.id - 1);
                    const isCurrent = lvl.id === currentLevelId;
                    const stars = starsCollected[lvl.id] || 0;

                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        disabled={!isUnlocked}
                        onClick={() => {
                          if (isUnlocked) {
                            sound.playClick();
                            onSelectLevel(lvl.id);
                            onClose();
                          }
                        }}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                          !isUnlocked
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            : isCurrent
                            ? 'bg-amber-400 border-amber-600 text-amber-950 shadow-md scale-105 ring-4 ring-amber-300/60'
                            : 'bg-white hover:bg-amber-50 border-amber-300 text-slate-800 shadow-xs hover:scale-102 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-fun font-bold text-xs">
                            Level {lvl.id}
                          </span>
                          {!isUnlocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                        </div>

                        <span className="font-fun font-semibold text-xs text-center line-clamp-1 mb-2">
                          {lvl.title}
                        </span>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3].map((starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-3.5 h-3.5 ${
                                starIdx <= stars
                                  ? 'text-amber-500 fill-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
