import React, { useState, useEffect } from 'react';
import { Star, X, Check, Cloud, Database } from 'lucide-react';
import { fetchTopPlayers, isSupabaseConfigured } from '../../lib/supabase';
import { sound } from '../../lib/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  playerSchool: string;
  totalStars: number;
  completedLevelsCount: number;
  onUpdatePlayer: (name: string, school: string) => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  playerName,
  playerSchool,
  totalStars,
  completedLevelsCount,
  onUpdatePlayer,
}) => {
  const [players, setPlayers] = useState<Array<{ name: string; school: string; stars: number; levels: number }>>([]);
  const [editingName, setEditingName] = useState(playerName);
  const [editingSchool, setEditingSchool] = useState(playerSchool);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchTopPlayers()
        .then((data) => {
          // If the player is not in the list, inject them
          const hasCurrent = data.some((p) => p.name.toLowerCase() === playerName.toLowerCase());
          if (!hasCurrent && playerName) {
            data.push({
              name: playerName,
              school: playerSchool || 'SD Murid Cerdas',
              stars: totalStars,
              levels: completedLevelsCount,
            });
            data.sort((a, b) => b.stars - a.stars);
          }
          setPlayers(data);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, playerName, playerSchool, totalStars, completedLevelsCount]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    onUpdatePlayer(editingName, editingSchool);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-pop">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-xl w-full border-4 border-amber-400 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl text-amber-700">
              🏆
            </span>
            <div>
              <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-800">
                Papan Juara Bintang Cilik
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Peringkat murid SD pemrogram cilik berprestasi
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

        {/* Supabase status banner */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>
              {isSupabaseConfigured
                ? 'Sinkronisasi Supabase Cloud Aktif'
                : 'Mode Penyimpanan Lokal (Offline-First Ready)'}
            </span>
          </div>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 font-bold text-[10px]">
            <Cloud className="w-3 h-3" />
            <span>Terhubung</span>
          </span>
        </div>

        {/* Profile Card / Editor */}
        <form onSubmit={handleSaveProfile} className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 mb-4 text-xs">
          <div className="font-fun font-bold text-slate-800 mb-2 flex items-center justify-between">
            <span>Profil Petualang Kamu:</span>
            {savedSuccess && (
              <span className="text-emerald-700 flex items-center gap-1 text-[11px]">
                <Check className="w-3.5 h-3.5" /> Tersimpan!
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Nama kamu"
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="text"
              value={editingSchool}
              onChange={(e) => setEditingSchool(e.target.value)}
              placeholder="Nama SD kamu"
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full btn-3d-yellow text-slate-950 font-fun font-bold py-1.5 px-3 rounded-xl cursor-pointer"
          >
            Simpan Perubahan Profil
          </button>
        </form>

        {/* Leaderboard Table */}
        <div className="max-h-[35vh] overflow-y-auto space-y-2 pr-1">
          {loading ? (
            <div className="text-center py-6 text-slate-400 font-fun">
              Memuat data peringkat...
            </div>
          ) : (
            players.map((p, idx) => {
              const isCurrentUser = p.name.toLowerCase() === playerName.toLowerCase();
              const rank = idx + 1;

              return (
                <div
                  key={`${p.name}-${idx}`}
                  className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${
                    isCurrentUser
                      ? 'bg-amber-100 border-amber-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-fun font-bold text-xs ${
                        rank === 1
                          ? 'bg-amber-400 text-amber-950'
                          : rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                    </span>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-fun font-bold text-slate-800 text-xs sm:text-sm">
                          {p.name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-bold bg-amber-300 text-amber-950 px-1.5 py-0.2 rounded-md">
                            Kamu
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        {p.school}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <div className="flex items-center gap-1 font-fun font-bold text-amber-600 text-xs sm:text-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{p.stars}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {p.levels} Level
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
