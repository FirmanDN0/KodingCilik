import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/navbar/Navbar';
import { GridWorld } from './components/grid-world/GridWorld';
import { BlockToolbox } from './components/block-editor/BlockToolbox';
import { CommandQueue } from './components/block-editor/CommandQueue';
import { AITutor } from './components/ai-tutor/AITutor';
import { VictoryModal } from './components/modals/VictoryModal';
import { LevelSelectorModal } from './components/levels/LevelSelectorModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { ParentsGuideModal } from './components/parents-guide/ParentsGuideModal';
import { LeaderboardModal } from './components/leaderboard/LeaderboardModal';

import { LEVELS } from './lib/levels';
import type {
  CodeBlock,
  CommandType,
  Coordinate,
  Direction,
  ExecutionState,
  Level,
} from './types/game';
import {
  flattenBlocks,
  getNextCoordinate,
  getNextDirection,
  validateMove,
} from './lib/interpreter';
import { sound } from './lib/audio';
import { speech } from './lib/speech';
import { loadLocalProgress, saveProgress } from './lib/supabase';

export function App() {
  // Player state
  const [progress, setProgress] = useState(loadLocalProgress);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  // Sound & Speech settings
  const [soundMuted, setSoundMuted] = useState(sound.isMuted());
  const [speechEnabled, setSpeechEnabled] = useState(speech.isEnabled());

  // Current Level
  const currentLevel: Level = isSandboxMode
    ? {
        id: 999,
        worldId: 0,
        worldName: '🎨 Lab Bebas Koding',
        worldColor: 'purple',
        title: 'Kotak Pasir Berkreasi',
        description: 'Susun balok sesukamu dan lihat Kiko menjelajah bebas tanpa batas rintangan!',
        hint: 'Kamu bisa mencoba berbagai kombinasi Loop dan langkah di sini!',
        gridWidth: 6,
        gridHeight: 6,
        startPos: { x: 2, y: 3 },
        startDir: 'NORTH',
        targetPos: { x: 5, y: 0 },
        stars: [
          { x: 1, y: 1 },
          { x: 4, y: 2 },
          { x: 2, y: 4 },
        ],
        obstacles: [],
        availableBlocks: ['FORWARD', 'TURN_RIGHT', 'TURN_LEFT', 'JUMP', 'LOOP'],
      }
    : LEVELS.find((l) => l.id === currentLevelId) || LEVELS[0];

  // Game execution state
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);
  const [executionState, setExecutionState] = useState<ExecutionState>('IDLE');
  const [kikoPos, setKikoPos] = useState<Coordinate>(currentLevel.startPos);
  const [kikoDir, setKikoDir] = useState<Direction>(currentLevel.startDir);
  const [collectedStars, setCollectedStars] = useState<Coordinate[]>([]);
  const [visitedTiles, setVisitedTiles] = useState<Coordinate[]>([currentLevel.startPos]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  // Animations
  const [isJumping, setIsJumping] = useState(false);
  const [isCrashing, setIsCrashing] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [speed, setSpeed] = useState(600); // ms per step

  // AI Tutor State
  const [aiMessage, setAiMessage] = useState<string>(
    'Halo Teman Cerdas! Ayo susun balok koding untuk membantu Kiko mencapai bendera finish!'
  );
  const [aiMood, setAiMood] = useState<'HAPPY' | 'THINKING' | 'CHEERING' | 'OOPS'>('HAPPY');

  // Modals
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isParentsGuideModalOpen, setIsParentsGuideModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

  // Race condition cancellation token ref
  const executionTokenRef = useRef(0);

  // Sync state when level changes
  useEffect(() => {
    handleReset();
    setAiMessage(`Selamat datang di ${currentLevel.title}! Misi: ${currentLevel.description}`);
    setAiMood('HAPPY');
  }, [currentLevelId, isSandboxMode]);

  // Reset state to level start
  const handleReset = () => {
    executionTokenRef.current += 1; // Invalidate any running loops
    setExecutionState('IDLE');
    setKikoPos(currentLevel.startPos);
    setKikoDir(currentLevel.startDir);
    setCollectedStars([]);
    setVisitedTiles([currentLevel.startPos]);
    setActiveBlockId(null);
    setIsJumping(false);
    setIsCrashing(false);
    setIsVictory(false);
  };

  // Add block
  const handleAddBlock = (block: CodeBlock) => {
    if (currentLevel.maxBlocks && blocks.length >= currentLevel.maxBlocks) {
      sound.playOops();
      setAiMessage(`Batas maksimal level ini adalah ${currentLevel.maxBlocks} balok. Coba gunakan Loop untuk menghemat balok!`);
      setAiMood('THINKING');
      return;
    }
    setBlocks((prev) => [...prev, block]);
  };

  // Remove block
  const handleRemoveBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // Clear blocks
  const handleClearBlocks = () => {
    setBlocks([]);
    handleReset();
  };

  // Update loop count
  const handleUpdateLoopCount = (id: string, count: number) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, loopCount: count } : b))
    );
  };

  // Inner loop block helpers
  const handleAddInnerLoopBlock = (loopId: string, type: CommandType) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== loopId) return b;
        const inner = b.innerBlocks || [];
        const labelMap: Record<CommandType, { label: string; icon: string; color: string }> = {
          FORWARD: { label: 'Maju', icon: '⬆️', color: 'btn-3d-green' },
          TURN_RIGHT: { label: 'Belok Kanan', icon: '↪️', color: 'btn-3d-blue' },
          TURN_LEFT: { label: 'Belok Kiri', icon: '↩️', color: 'btn-3d-yellow' },
          JUMP: { label: 'Lompat', icon: '🦘', color: 'btn-3d-purple' },
          LOOP: { label: 'Ulangi', icon: '🔄', color: 'bg-amber-500' },
        };
        const newInner: CodeBlock = {
          id: `${loopId}-in-${Date.now()}`,
          type,
          label: labelMap[type].label,
          icon: labelMap[type].icon,
          color: labelMap[type].color,
        };
        return { ...b, innerBlocks: [...inner, newInner] };
      })
    );
  };

  const handleRemoveInnerLoopBlock = (loopId: string, innerId: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== loopId) return b;
        const filtered = (b.innerBlocks || []).filter((i) => i.id !== innerId);
        return { ...b, innerBlocks: filtered };
      })
    );
  };

  // Helper sleep function with cancellation check
  const sleep = (ms: number, token: number) =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(executionTokenRef.current === token);
      }, ms);
    });

  // Execute single step
  const executeStep = (
    stepType: CommandType,
    curPos: Coordinate,
    curDir: Direction,
    curStars: Coordinate[]
  ): {
    nextPos: Coordinate;
    nextDir: Direction;
    nextStars: Coordinate[];
    failed: boolean;
    failReason?: string;
  } => {
    let nextPos = { ...curPos };
    let nextDir = curDir;
    let nextStars = [...curStars];

    if (stepType === 'TURN_RIGHT') {
      nextDir = getNextDirection(curDir, 'TURN_RIGHT');
      sound.playTurn();
    } else if (stepType === 'TURN_LEFT') {
      nextDir = getNextDirection(curDir, 'TURN_LEFT');
      sound.playTurn();
    } else if (stepType === 'FORWARD') {
      nextPos = getNextCoordinate(curPos, curDir, 1);
      const validation = validateMove(nextPos, currentLevel);
      if (!validation.valid) {
        sound.playOops();
        return {
          nextPos: curPos,
          nextDir,
          nextStars,
          failed: true,
          failReason:
            validation.reason === 'HIT_OBSTACLE'
              ? 'Kiko menabrak batu! Coba berbelok atau gunakan balok Lompat.'
              : validation.reason === 'FELL_IN_WATER'
              ? 'Kiko tercebur ke sungai! Gunakan balok Lompat untuk melintasinya.'
              : 'Kiko menabrak batas pulau! Periksa kembali arah belokmu.',
        };
      }
      sound.playMove();
    } else if (stepType === 'JUMP') {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300);
      nextPos = getNextCoordinate(curPos, curDir, 2);
      // Validate bounds
      if (
        nextPos.x < 0 ||
        nextPos.x >= currentLevel.gridWidth ||
        nextPos.y < 0 ||
        nextPos.y >= currentLevel.gridHeight
      ) {
        sound.playOops();
        return {
          nextPos: curPos,
          nextDir,
          nextStars,
          failed: true,
          failReason: 'Lompatan Kiko keluar dari peta pulau!',
        };
      }
      sound.playJump();
    }

    // Check star collect
    const onStar = currentLevel.stars.find(
      (s) => s.x === nextPos.x && s.y === nextPos.y
    );
    if (onStar && !nextStars.some((s) => s.x === onStar.x && s.y === onStar.y)) {
      nextStars.push(onStar);
      sound.playStar();
    }

    return { nextPos, nextDir, nextStars, failed: false };
  };

  // Run all blocks automatically
  const handleRun = async () => {
    if (blocks.length === 0 || executionState === 'RUNNING') return;

    // Reset position before starting
    handleReset();
    const token = executionTokenRef.current;
    setExecutionState('RUNNING');
    setAiMessage('Kiko sedang menjalankan kodemu, perhatikan langkahnya...');
    setAiMood('THINKING');

    const flattened = flattenBlocks(blocks);
    let curPos = { ...currentLevel.startPos };
    let curDir = currentLevel.startDir;
    let curStars: Coordinate[] = [];

    for (let i = 0; i < flattened.length; i++) {
      const step = flattened[i];
      setActiveBlockId(step.blockId);

      const canContinue = await sleep(speed, token);
      if (!canContinue) return; // Cancelled by user reset

      const res = executeStep(step.type, curPos, curDir, curStars);

      if (res.failed) {
        setIsCrashing(true);
        setTimeout(() => setIsCrashing(false), 500);
        setExecutionState('FAILED');
        setAiMessage(res.failReason || 'Ups, ada yang kurang pas! Coba periksa urutan balokmu.');
        setAiMood('OOPS');
        speech.speak(res.failReason || 'Ups, jalannya terhalang! Yuk perbaiki lagi.');
        return;
      }

      curPos = res.nextPos;
      curDir = res.nextDir;
      curStars = res.nextStars;

      setKikoPos(curPos);
      setKikoDir(curDir);
      setCollectedStars(curStars);
      setVisitedTiles((prev) => [...prev, curPos]);
    }

    // Completed execution - check target position
    setActiveBlockId(null);
    const reachedTarget =
      curPos.x === currentLevel.targetPos.x && curPos.y === currentLevel.targetPos.y;

    if (reachedTarget) {
      setIsVictory(true);
      setExecutionState('SUCCESS');
      const earnedStars = Math.max(1, curStars.length || 3);
      setAiMessage(`Horeee! Luar biasa! Kiko berhasil mencapai bendera finish dan mengumpulkan bintang!`);
      setAiMood('CHEERING');
      speech.speak('Hore, kamu berhasil menyelesaikan misi! Hebat sekali!');

      // Save progress
      if (!isSandboxMode) {
        const updatedCompleted = Array.from(
          new Set([...progress.completedLevels, currentLevel.id, currentLevel.id + 1])
        );
        const updatedStarsCollected = {
          ...progress.starsCollected,
          [currentLevel.id]: Math.max(
            progress.starsCollected[currentLevel.id] || 0,
            earnedStars
          ),
        };
        const total = Object.values(updatedStarsCollected).reduce((a, b) => a + b, 0);

        const newProg = {
          ...progress,
          completedLevels: updatedCompleted,
          starsCollected: updatedStarsCollected,
          totalStars: total,
        };
        setProgress(newProg);
        saveProgress(newProg);
      }

      setTimeout(() => {
        setIsVictoryModalOpen(true);
      }, 700);
    } else {
      setExecutionState('IDLE');
      const msg = `Kiko belum sampai ke bendera finish! Masih butuh beberapa langkah lagi.`;
      setAiMessage(msg);
      setAiMood('THINKING');
      speech.speak(msg);
    }
  };

  // Step-by-step visual debugger
  const handleStep = () => {
    if (blocks.length === 0) return;
    const flattened = flattenBlocks(blocks);
    const nextStepIdx = visitedTiles.length - 1;

    if (nextStepIdx >= flattened.length) {
      setAiMessage('Semua balok sudah selesai dijalankan! Tekan Reset untuk mengulang.');
      return;
    }

    const step = flattened[nextStepIdx];
    setActiveBlockId(step.blockId);

    const res = executeStep(step.type, kikoPos, kikoDir, collectedStars);
    if (res.failed) {
      setIsCrashing(true);
      setTimeout(() => setIsCrashing(false), 500);
      setAiMessage(res.failReason || 'Ups, langkah ini menabrak!');
      setAiMood('OOPS');
      return;
    }

    setKikoPos(res.nextPos);
    setKikoDir(res.nextDir);
    setCollectedStars(res.nextStars);
    setVisitedTiles((prev) => [...prev, res.nextPos]);

    if (
      res.nextPos.x === currentLevel.targetPos.x &&
      res.nextPos.y === currentLevel.targetPos.y
    ) {
      setIsVictory(true);
      setExecutionState('SUCCESS');
      setIsVictoryModalOpen(true);
    }
  };

  // Next level navigation
  const handleNextLevel = () => {
    setIsVictoryModalOpen(false);
    if (currentLevelId < LEVELS.length) {
      setCurrentLevelId((prev) => prev + 1);
    } else {
      setIsCertificateModalOpen(true);
    }
  };

  // Update player profile
  const handleUpdatePlayer = (name: string, school: string) => {
    const updated = { ...progress, name, school };
    setProgress(updated);
    saveProgress(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-emerald-50/40 text-slate-800 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        totalStars={progress.totalStars}
        soundMuted={soundMuted}
        onToggleSound={() => {
          const next = !soundMuted;
          sound.setMuted(next);
          setSoundMuted(next);
        }}
        speechEnabled={speechEnabled}
        onToggleSpeech={() => {
          const next = speech.toggleSpeech();
          setSpeechEnabled(next);
        }}
        onOpenLevels={() => setIsLevelsModalOpen(true)}
        onOpenSandbox={() => {
          setIsSandboxMode(true);
          setBlocks([]);
        }}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
        onOpenParentsGuide={() => setIsParentsGuideModalOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardModalOpen(true)}
        isSandboxMode={isSandboxMode}
        onExitSandbox={() => setIsSandboxMode(false)}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* AI Tutor Assistant Bubble */}
        <AITutor
          message={aiMessage}
          mood={aiMood}
          hint={currentLevel.hint}
          onAskHint={() => {
            setAiMessage(`💡 Petunjuk Kiko: ${currentLevel.hint}`);
            setAiMood('THINKING');
            speech.speak(currentLevel.hint);
          }}
        />

        {/* 2-Column Responsive Layout: Grid Simulator (Left) & Block Coding Queue (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Grid World Simulator */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <GridWorld
              level={currentLevel}
              kikoPos={kikoPos}
              kikoDir={kikoDir}
              collectedStars={collectedStars}
              visitedTiles={visitedTiles}
              isJumping={isJumping}
              isCrashing={isCrashing}
              isVictory={isVictory}
            />

            {/* Block Toolbox Palet */}
            <BlockToolbox
              availableBlocks={currentLevel.availableBlocks}
              onAddBlock={handleAddBlock}
              disabled={executionState === 'RUNNING'}
            />
          </div>

          {/* Right Column: Code Queue & Controls */}
          <div className="lg:col-span-5 h-full">
            <CommandQueue
              blocks={blocks}
              onRemoveBlock={handleRemoveBlock}
              onClearBlocks={handleClearBlocks}
              onUpdateLoopCount={handleUpdateLoopCount}
              onAddInnerLoopBlock={handleAddInnerLoopBlock}
              onRemoveInnerLoopBlock={handleRemoveInnerLoopBlock}
              executionState={executionState}
              activeBlockId={activeBlockId}
              onRun={handleRun}
              onStep={handleStep}
              onReset={handleReset}
              maxBlocks={currentLevel.maxBlocks}
              speed={speed}
              onChangeSpeed={setSpeed}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-3 px-4 border-t border-amber-200 bg-white/70 text-center text-xs text-slate-500 font-medium">
        <p>
          🤖 <span className="font-bold text-slate-700">KodingCilik</span> — Dikembangkan oleh{' '}
          <span className="font-bold text-amber-700">Firman Dwi Nugraha</span> untuk{' '}
          <span className="font-semibold text-slate-700">M-ONE Telkomsel Coding Competition 2026</span>
        </p>
      </footer>

      {/* Modals */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        levelId={currentLevel.id}
        starsEarned={collectedStars.length || 3}
        blockCount={blocks.length}
        onNextLevel={handleNextLevel}
        onReplay={() => {
          setIsVictoryModalOpen(false);
          handleReset();
        }}
        onOpenCertificate={() => {
          setIsVictoryModalOpen(false);
          setIsCertificateModalOpen(true);
        }}
        onClose={() => setIsVictoryModalOpen(false)}
        hasNextLevel={currentLevelId < LEVELS.length}
      />

      <LevelSelectorModal
        isOpen={isLevelsModalOpen}
        onClose={() => setIsLevelsModalOpen(false)}
        currentLevelId={currentLevelId}
        completedLevels={progress.completedLevels}
        starsCollected={progress.starsCollected}
        onSelectLevel={(lvlId) => {
          setCurrentLevelId(lvlId);
          setIsSandboxMode(false);
        }}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        playerName={progress.name}
        playerSchool={progress.school || 'SD Ceria'}
        totalStars={progress.totalStars}
        completedLevelsCount={progress.completedLevels.length}
        onUpdatePlayer={handleUpdatePlayer}
      />

      <ParentsGuideModal
        isOpen={isParentsGuideModalOpen}
        onClose={() => setIsParentsGuideModalOpen(false)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        playerName={progress.name}
        playerSchool={progress.school || 'SD Ceria'}
        totalStars={progress.totalStars}
        completedLevelsCount={progress.completedLevels.length}
        onUpdatePlayer={handleUpdatePlayer}
      />
    </div>
  );
}

export default App;
