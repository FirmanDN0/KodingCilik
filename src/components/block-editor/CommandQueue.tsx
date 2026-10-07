import React from 'react';
import type { CodeBlock, ExecutionState, CommandType } from '../../types/game';
import { Play, RotateCcw, Trash2, StepForward, Plus, Minus } from 'lucide-react';
import { sound } from '../../lib/audio';

interface CommandQueueProps {
  blocks: CodeBlock[];
  onRemoveBlock: (id: string) => void;
  onClearBlocks: () => void;
  onUpdateLoopCount: (id: string, count: number) => void;
  onAddInnerLoopBlock: (loopId: string, type: CommandType) => void;
  onRemoveInnerLoopBlock: (loopId: string, innerId: string) => void;
  executionState: ExecutionState;
  activeBlockId: string | null;
  onRun: () => void;
  onStep: () => void;
  onReset: () => void;
  maxBlocks?: number;
  speed: number;
  onChangeSpeed: (speed: number) => void;
}

export const CommandQueue: React.FC<CommandQueueProps> = ({
  blocks,
  onRemoveBlock,
  onClearBlocks,
  onUpdateLoopCount,
  onAddInnerLoopBlock,
  onRemoveInnerLoopBlock,
  executionState,
  activeBlockId,
  onRun,
  onStep,
  onReset,
  maxBlocks,
  speed,
  onChangeSpeed,
}) => {
  const isRunning = executionState === 'RUNNING';

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-md flex flex-col h-full">
      {/* Header & Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-3">
        <div>
          <h3 className="font-fun font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
            <span>📋</span> Antrean Perintah Koding
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Kiko akan menjalankan perintah dari atas ke bawah
          </span>
        </div>

        <div className="flex items-center gap-2">
          {maxBlocks && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                blocks.length > maxBlocks
                  ? 'bg-rose-100 text-rose-700 border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              {blocks.length} / {maxBlocks} Balok
            </span>
          )}

          {blocks.length > 0 && (
            <button
              disabled={isRunning}
              onClick={() => {
                sound.playOops();
                onClearBlocks();
              }}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-40"
              title="Hapus semua balok"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Blocks List Container */}
      <div className="flex-1 min-h-[160px] max-h-[280px] sm:max-h-[340px] overflow-y-auto space-y-2 pr-1 mb-4">
        {blocks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-amber-200 rounded-2xl bg-amber-50/40">
            <span className="text-3xl mb-1">👈</span>
            <p className="font-fun font-semibold text-slate-600 text-sm">
              Antrean Perintah Masih Kosong!
            </p>
            <p className="text-xs text-slate-400 max-w-xs mt-0.5">
              Klik balok dari kotak sebelah kiri untuk menambahkan instruksi gerakan Kiko.
            </p>
          </div>
        ) : (
          blocks.map((block, index) => {
            const isActive = activeBlockId === block.id;

            if (block.type === 'LOOP') {
              return (
                <div
                  key={block.id}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-300/50 shadow-md'
                      : 'border-amber-300 bg-amber-50/80'
                  }`}
                >
                  {/* Loop Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="font-fun font-bold text-amber-900 text-xs sm:text-sm flex items-center gap-1">
                        <span>🔄</span> Ulangi Perintah:
                      </span>
                    </div>

                    {/* Loop Counter Controls */}
                    <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-xl border border-amber-300 shadow-xs">
                      <button
                        type="button"
                        disabled={isRunning || (block.loopCount || 2) <= 2}
                        onClick={() => {
                          sound.playClick();
                          onUpdateLoopCount(block.id, Math.max(2, (block.loopCount || 2) - 1));
                        }}
                        className="p-1 hover:bg-amber-100 rounded text-amber-800 disabled:opacity-30"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-fun font-bold text-amber-900 text-xs px-1">
                        {block.loopCount || 2}x
                      </span>
                      <button
                        type="button"
                        disabled={isRunning || (block.loopCount || 2) >= 6}
                        onClick={() => {
                          sound.playClick();
                          onUpdateLoopCount(block.id, Math.min(6, (block.loopCount || 2) + 1));
                        }}
                        className="p-1 hover:bg-amber-100 rounded text-amber-800 disabled:opacity-30"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isRunning}
                      onClick={() => {
                        sound.playOops();
                        onRemoveBlock(block.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Inner loop blocks */}
                  <div className="bg-white/90 p-2 rounded-xl border border-amber-200 space-y-1.5 ml-4">
                    <div className="text-[11px] font-semibold text-slate-500 mb-1">
                      Perintah di dalam putaran:
                    </div>
                    {block.innerBlocks?.map((inner) => (
                      <div
                        key={inner.id}
                        className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-xs font-semibold"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{inner.icon}</span>
                          <span>{inner.label}</span>
                        </span>
                        {block.innerBlocks && block.innerBlocks.length > 1 && (
                          <button
                            type="button"
                            disabled={isRunning}
                            onClick={() => {
                              sound.playOops();
                              onRemoveInnerLoopBlock(block.id, inner.id);
                            }}
                            className="text-emerald-500 hover:text-rose-600"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Quick add for inner loop */}
                    <div className="flex gap-1 pt-1">
                      <button
                        type="button"
                        disabled={isRunning}
                        onClick={() => {
                          sound.playClick();
                          onAddInnerLoopBlock(block.id, 'FORWARD');
                        }}
                        className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg border border-emerald-300"
                      >
                        + Maju
                      </button>
                      <button
                        type="button"
                        disabled={isRunning}
                        onClick={() => {
                          sound.playClick();
                          onAddInnerLoopBlock(block.id, 'TURN_RIGHT');
                        }}
                        className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg border border-blue-300"
                      >
                        + Belok Kanan
                      </button>
                      <button
                        type="button"
                        disabled={isRunning}
                        onClick={() => {
                          sound.playClick();
                          onAddInnerLoopBlock(block.id, 'JUMP');
                        }}
                        className="text-[10px] font-bold px-2 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg border border-purple-300"
                      >
                        + Lompat
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={block.id}
                className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all ${
                  isActive
                    ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-300/50 shadow-md scale-102'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div
                    className={`px-3 py-1.5 rounded-xl font-fun font-bold text-xs sm:text-sm flex items-center gap-2 ${block.color}`}
                  >
                    <span>{block.icon}</span>
                    <span>{block.label}</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isRunning}
                  onClick={() => {
                    sound.playOops();
                    onRemoveBlock(block.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-30"
                  title="Hapus balok ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Action Buttons Toolbar */}
      <div className="pt-3 border-t border-amber-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Main Run Button */}
          <button
            type="button"
            disabled={isRunning || blocks.length === 0}
            onClick={() => {
              sound.playClick();
              onRun();
            }}
            className="btn-3d-green text-white font-fun font-bold text-sm sm:text-base py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer col-span-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>{isRunning ? 'Kiko Bergerak...' : 'Jalankan Kode! 🚀'}</span>
          </button>

          {/* Step-by-Step Debugger Button */}
          <button
            type="button"
            disabled={isRunning || blocks.length === 0}
            onClick={() => {
              sound.playClick();
              onStep();
            }}
            className="btn-3d-blue text-white font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            title="Jalankan tepat 1 instruksi untuk mencari kesalahan (debug)"
          >
            <StepForward className="w-4 h-4" />
            <span>Satu Langkah ⏯️</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={() => {
              sound.playOops();
              onReset();
            }}
            className="btn-3d-yellow text-slate-900 font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Posisi 🔄</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="font-medium">Kecepatan Kiko:</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onChangeSpeed(600);
              }}
              className={`px-2 py-0.5 rounded-lg border font-bold ${
                speed === 600
                  ? 'bg-amber-400 text-amber-950 border-amber-500'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}
            >
              Normal (0.6s)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onChangeSpeed(350);
              }}
              className={`px-2 py-0.5 rounded-lg border font-bold ${
                speed === 350
                  ? 'bg-amber-400 text-amber-950 border-amber-500'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}
            >
              Cepat (0.35s) ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
