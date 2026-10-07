import React from 'react';
import type { CommandType, CodeBlock } from '../../types/game';
import { sound } from '../../lib/audio';

interface BlockToolboxProps {
  availableBlocks: CommandType[];
  onAddBlock: (block: CodeBlock) => void;
  disabled?: boolean;
}

export const BlockToolbox: React.FC<BlockToolboxProps> = ({
  availableBlocks,
  onAddBlock,
  disabled = false,
}) => {
  const handleAdd = (type: CommandType) => {
    if (disabled) return;
    sound.playClick();

    const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    switch (type) {
      case 'FORWARD':
        onAddBlock({
          id,
          type: 'FORWARD',
          label: 'Maju',
          icon: '⬆️',
          color: 'btn-3d-green text-white',
        });
        break;
      case 'TURN_RIGHT':
        onAddBlock({
          id,
          type: 'TURN_RIGHT',
          label: 'Belok Kanan',
          icon: '↪️',
          color: 'btn-3d-blue text-white',
        });
        break;
      case 'TURN_LEFT':
        onAddBlock({
          id,
          type: 'TURN_LEFT',
          label: 'Belok Kiri',
          icon: '↩️',
          color: 'btn-3d-yellow text-slate-900',
        });
        break;
      case 'JUMP':
        onAddBlock({
          id,
          type: 'JUMP',
          label: 'Lompat',
          icon: '🦘',
          color: 'btn-3d-purple text-white',
        });
        break;
      case 'LOOP':
        onAddBlock({
          id,
          type: 'LOOP',
          label: 'Ulangi (Loop)',
          icon: '🔄',
          color: 'bg-amber-500 border-b-4 border-amber-700 text-white',
          loopCount: 2,
          innerBlocks: [
            {
              id: `${id}-in-1`,
              type: 'FORWARD',
              label: 'Maju',
              icon: '⬆️',
              color: 'btn-3d-green text-white',
            },
          ],
        });
        break;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-fun font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
          <span>🧩</span> Kotak Balok Perintah
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          Klik untuk menambah
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {availableBlocks.includes('FORWARD') && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleAdd('FORWARD')}
            className="btn-3d-green text-white font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="text-base sm:text-lg">⬆️</span>
            <span>Maju</span>
          </button>
        )}

        {availableBlocks.includes('TURN_RIGHT') && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleAdd('TURN_RIGHT')}
            className="btn-3d-blue text-white font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="text-base sm:text-lg">↪️</span>
            <span>Belok Kanan</span>
          </button>
        )}

        {availableBlocks.includes('TURN_LEFT') && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleAdd('TURN_LEFT')}
            className="btn-3d-yellow text-slate-900 font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="text-base sm:text-lg">↩️</span>
            <span>Belok Kiri</span>
          </button>
        )}

        {availableBlocks.includes('JUMP') && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleAdd('JUMP')}
            className="btn-3d-purple text-white font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="text-base sm:text-lg">🦘</span>
            <span>Lompat</span>
          </button>
        )}

        {availableBlocks.includes('LOOP') && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => handleAdd('LOOP')}
            className="bg-amber-500 hover:bg-amber-400 active:translate-y-1 active:border-b-2 border-b-4 border-amber-700 text-white font-fun font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer col-span-2 sm:col-span-1"
          >
            <span className="text-base sm:text-lg">🔄</span>
            <span>Ulangi (Loop)</span>
          </button>
        )}
      </div>
    </div>
  );
};
