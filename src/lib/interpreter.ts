import type { CodeBlock, Coordinate, Direction, Level } from '../types/game';

export interface FlattenedStep {
  blockId: string;
  type: CodeBlock['type'];
  label: string;
}

export interface SimulationResult {
  success: boolean;
  message: string;
  starsCollected: number;
  finalPos: Coordinate;
  finalDir: Direction;
  visitedCoordinates: Coordinate[];
}

export const DIRECTION_ROTATIONS: Record<Direction, number> = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
};

export function getNextDirection(current: Direction, turn: 'TURN_RIGHT' | 'TURN_LEFT'): Direction {
  const dirs: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  const currentIndex = dirs.indexOf(current);
  if (turn === 'TURN_RIGHT') {
    return dirs[(currentIndex + 1) % 4];
  } else {
    return dirs[(currentIndex + 3) % 4];
  }
}

export function getNextCoordinate(current: Coordinate, dir: Direction, distance: number = 1): Coordinate {
  switch (dir) {
    case 'NORTH':
      return { x: current.x, y: current.y - distance };
    case 'EAST':
      return { x: current.x + distance, y: current.y };
    case 'SOUTH':
      return { x: current.x, y: current.y + distance };
    case 'WEST':
      return { x: current.x - distance, y: current.y };
  }
}

// Unroll / flatten blocks recursively (unwrapping loops)
export function flattenBlocks(blocks: CodeBlock[]): FlattenedStep[] {
  const steps: FlattenedStep[] = [];

  for (const block of blocks) {
    if (block.type === 'LOOP') {
      const times = block.loopCount || 2;
      const inner = block.innerBlocks && block.innerBlocks.length > 0 
        ? block.innerBlocks 
        : [{ id: `${block.id}-def`, type: 'FORWARD' as const, label: 'Maju', icon: '⬆️', color: 'bg-emerald-500' }];
      
      for (let i = 0; i < times; i++) {
        for (const inBlock of inner) {
          steps.push({
            blockId: block.id, // highlight the parent loop block or inner
            type: inBlock.type,
            label: `${inBlock.label} (${i + 1}/${times})`,
          });
        }
      }
    } else {
      steps.push({
        blockId: block.id,
        type: block.type,
        label: block.label,
      });
    }
  }

  return steps;
}

// Validate single step movement against level constraints
export function validateMove(
  pos: Coordinate,
  level: Level
): { valid: boolean; reason?: 'OUT_OF_BOUNDS' | 'HIT_OBSTACLE' | 'FELL_IN_WATER' } {
  // Check bounds
  if (pos.x < 0 || pos.x >= level.gridWidth || pos.y < 0 || pos.y >= level.gridHeight) {
    return { valid: false, reason: 'OUT_OF_BOUNDS' };
  }

  // Check obstacle collision
  const isObstacle = level.obstacles.some(obs => obs.x === pos.x && obs.y === pos.y);
  if (isObstacle) {
    return { valid: false, reason: 'HIT_OBSTACLE' };
  }

  // Check water collision
  const isWater = level.water && level.water.some(w => w.x === pos.x && w.y === pos.y);
  if (isWater) {
    return { valid: false, reason: 'FELL_IN_WATER' };
  }

  return { valid: true };
}
