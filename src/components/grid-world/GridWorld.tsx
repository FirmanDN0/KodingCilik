import React from 'react';
import type { Coordinate, Direction, Level } from '../../types/game';
import { DIRECTION_ROTATIONS } from '../../lib/interpreter';

interface GridWorldProps {
  level: Level;
  kikoPos: Coordinate;
  kikoDir: Direction;
  collectedStars: Coordinate[];
  visitedTiles: Coordinate[];
  isJumping: boolean;
  isCrashing: boolean;
  isVictory: boolean;
}

export const GridWorld: React.FC<GridWorldProps> = ({
  level,
  kikoPos,
  kikoDir,
  collectedStars,
  visitedTiles,
  isJumping,
  isCrashing,
  isVictory,
}) => {
  const rotationDeg = DIRECTION_ROTATIONS[kikoDir];

  // Helper to check cell features
  const isTarget = (x: number, y: number) => level.targetPos.x === x && level.targetPos.y === y;
  const isStart = (x: number, y: number) => level.startPos.x === x && level.startPos.y === y;
  const isObstacle = (x: number, y: number) => level.obstacles.some(o => o.x === x && o.y === y);
  const isWater = (x: number, y: number) => level.water && level.water.some(w => w.x === x && w.y === y);
  const isStar = (x: number, y: number) =>
    level.stars.some(s => s.x === x && s.y === y) &&
    !collectedStars.some(c => c.x === x && c.y === y);
  const isVisited = (x: number, y: number) =>
    visitedTiles.some(v => v.x === x && v.y === y);

  // Generate grid rows and cols
  const rows = Array.from({ length: level.gridHeight }, (_, y) => y);
  const cols = Array.from({ length: level.gridWidth }, (_, x) => x);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100/70 to-emerald-50/60 rounded-3xl border-4 border-amber-300 shadow-xl relative overflow-hidden select-none">
      {/* Level Header Banner */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-amber-200 text-amber-900 font-bold text-xs uppercase tracking-wide border border-amber-400">
            {level.worldName}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 font-fun">
            Level {level.id}: {level.title}
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Bintang:</span>
          <span className="text-sm font-bold text-amber-600">
            {collectedStars.length} / {level.stars.length} ⭐
          </span>
        </div>
      </div>

      {/* Grid Container */}
      <div 
        className="grid gap-2 sm:gap-2.5 p-3 sm:p-4 bg-emerald-700/20 rounded-2xl border-2 border-emerald-400/40 shadow-inner relative"
        style={{
          gridTemplateColumns: `repeat(${level.gridWidth}, minmax(0, 1fr))`,
        }}
      >
        {rows.map(y =>
          cols.map(x => {
            const hasKiko = kikoPos.x === x && kikoPos.y === y;
            const target = isTarget(x, y);
            const obstacle = isObstacle(x, y);
            const water = isWater(x, y);
            const star = isStar(x, y);
            const start = isStart(x, y);
            const visited = isVisited(x, y);

            return (
              <div
                key={`${x}-${y}`}
                className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center relative transition-all duration-200 ${
                  water
                    ? 'bg-gradient-to-b from-sky-400 to-blue-500 border-2 border-blue-600 shadow-sm'
                    : obstacle
                    ? 'bg-slate-400 border-2 border-slate-600 shadow-sm'
                    : target
                    ? 'bg-gradient-to-br from-amber-200 to-yellow-300 border-2 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-gradient-to-b from-emerald-100 to-emerald-200/90 border-2 border-emerald-400 shadow-sm hover:border-emerald-500'
                }`}
              >
                {/* Subtle coordinate label for educational orientation */}
                <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-slate-400 opacity-60">
                  {x},{y}
                </span>

                {/* Footprint Trail */}
                {visited && !hasKiko && !water && !obstacle && (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 animate-pulse" />
                )}

                {/* Water Waves Animation */}
                {water && (
                  <div className="text-xl sm:text-2xl animate-pulse opacity-80">
                    🌊
                  </div>
                )}

                {/* Obstacle Rock */}
                {obstacle && (
                  <div className="text-2xl sm:text-3xl filter drop-shadow">
                    🪨
                  </div>
                )}

                {/* Star Tile */}
                {star && (
                  <div className="text-2xl sm:text-3xl animate-bounce filter drop-shadow-md">
                    ⭐
                  </div>
                )}

                {/* Target Finish Flag */}
                {target && !hasKiko && (
                  <div className="flex flex-col items-center animate-wiggle">
                    <span className="text-2xl sm:text-3xl">🏁</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1 rounded-sm shadow-xs">
                      FINISH
                    </span>
                  </div>
                )}

                {/* Start Marker Pad */}
                {start && !hasKiko && !target && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-300/80 px-1 rounded">
                    START
                  </span>
                )}

                {/* KIKO ROBOT CHARACTER */}
                {hasKiko && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 ${
                      isJumping ? 'scale-125 -translate-y-4' : ''
                    } ${isCrashing ? 'animate-wiggle scale-95' : ''} ${
                      isVictory ? 'animate-spin scale-110' : ''
                    }`}
                    style={{
                      transform: `rotate(${rotationDeg}deg) ${isJumping ? 'scale(1.25) translateY(-16px)' : ''}`,
                    }}
                  >
                    {/* Robot SVG Graphics */}
                    <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 relative flex items-center justify-center filter drop-shadow-lg">
                      {/* Antenna */}
                      <div className="absolute -top-1 w-2 h-2 rounded-full bg-amber-400 border border-amber-600 animate-ping opacity-75" />
                      
                      {/* Robot Body Container */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Antenna Pole */}
                        <line x1="50" y1="20" x2="50" y2="10" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="50" cy="8" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                        
                        {/* Head & Body */}
                        <rect x="20" y="20" width="60" height="55" rx="18" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
                        
                        {/* Screen Face */}
                        <rect x="28" y="28" width="44" height="28" rx="8" fill="#0F172A" />
                        
                        {/* Big Cheerful Eyes */}
                        <circle cx="40" cy="40" r="5" fill="#38BDF8" />
                        <circle cx="41.5" cy="38.5" r="2" fill="#FFFFFF" />
                        
                        <circle cx="60" cy="40" r="5" fill="#38BDF8" />
                        <circle cx="61.5" cy="38.5" r="2" fill="#FFFFFF" />
                        
                        {/* Smile */}
                        <path d="M 43 48 Q 50 53 57 48" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        
                        {/* Belly Logo / Heart */}
                        <circle cx="50" cy="63" r="5" fill="#EF4444" />

                        {/* Wheels / Treads */}
                        <rect x="14" y="74" width="72" height="14" rx="7" fill="#334155" stroke="#1E293B" strokeWidth="3" />
                        <circle cx="26" cy="81" r="3" fill="#94A3B8" />
                        <circle cx="50" cy="81" r="3" fill="#94A3B8" />
                        <circle cx="74" cy="81" r="3" fill="#94A3B8" />

                        {/* Heading Direction Arrow */}
                        <polygon points="50,22 43,27 57,27" fill="#FBBF24" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Level Description & Tip */}
      <div className="mt-3 text-center max-w-lg">
        <p className="text-xs sm:text-sm font-medium text-slate-700 bg-white/70 py-1.5 px-3 rounded-xl border border-amber-200">
          💡 <span className="font-bold">Misi:</span> {level.description}
        </p>
      </div>
    </div>
  );
};
