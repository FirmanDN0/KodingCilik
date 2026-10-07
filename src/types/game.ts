export type CommandType = 'FORWARD' | 'TURN_RIGHT' | 'TURN_LEFT' | 'JUMP' | 'LOOP';

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export interface Coordinate {
  x: number;
  y: number;
}

export type CellType = 'EMPTY' | 'START' | 'TARGET' | 'STAR' | 'OBSTACLE' | 'WATER';

export interface CodeBlock {
  id: string;
  type: CommandType;
  label: string;
  icon: string;
  color: string;
  loopCount?: number;
  innerBlocks?: CodeBlock[];
}

export interface Level {
  id: number;
  worldId: number;
  worldName: string;
  worldColor: string;
  title: string;
  description: string;
  hint: string;
  gridWidth: number;
  gridHeight: number;
  startPos: Coordinate;
  startDir: Direction;
  targetPos: Coordinate;
  stars: Coordinate[];
  obstacles: Coordinate[];
  water?: Coordinate[];
  maxBlocks?: number;
  availableBlocks: CommandType[];
}

export type ExecutionState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'SUCCESS' | 'FAILED';

export interface PlayerProgress {
  name: string;
  school?: string;
  completedLevels: number[];
  starsCollected: { [levelId: number]: number }; // levelId -> stars (1-3)
  totalStars: number;
}
