import { createClient } from '@supabase/supabase-js';
import type { PlayerProgress } from '../types/game';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const STORAGE_KEY = 'kodingcilik_player_data';

export const defaultProgress: PlayerProgress = {
  name: 'Petualang Cilik',
  school: 'SD Bintang Ceria',
  completedLevels: [1],
  starsCollected: { 1: 0 },
  totalStars: 0,
};

// Load progress with localStorage fallback
export function loadLocalProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultProgress,
        ...parsed,
      };
    }
  } catch {
    // Return default on error
  }
  return defaultProgress;
}

// Save progress to local storage and sync to Supabase if available
export async function saveProgress(progress: PlayerProgress): Promise<void> {
  // 1. Save immediately to localStorage (offline-first)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors
  }

  // 2. Sync to Supabase in background if client is ready
  if (supabase) {
    try {
      await supabase
        .from('kodingcilik_leaderboard')
        .upsert(
          {
            player_name: progress.name,
            school: progress.school || 'SD Ceria',
            total_stars: progress.totalStars,
            levels_completed: progress.completedLevels.length,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'player_name' }
        );
    } catch {
      // Graceful offline fallback
    }
  }
}

// Fetch top players from Supabase or mock leaderboard
export async function fetchTopPlayers(): Promise<
  Array<{ name: string; school: string; stars: number; levels: number }>
> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('kodingcilik_leaderboard')
        .select('player_name, school, total_stars, levels_completed')
        .order('total_stars', { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        return data.map(row => ({
          name: row.player_name,
          school: row.school || 'SD Indonesia',
          stars: row.total_stars,
          levels: row.levels_completed,
        }));
      }
    } catch {
      // Fall through to mock list
    }
  }

  // Default leaderboard with cheerful Indonesian SD names
  return [
    { name: 'Kiko Robot', school: 'Akademi Koding', stars: 36, levels: 12 },
    { name: 'Aisyah Putri', school: 'SD Muhammadiyah 1', stars: 32, levels: 11 },
    { name: 'Budi Santoso', school: 'SD Negeri 02 Sukoharjo', stars: 28, levels: 10 },
    { name: 'Rian Pratama', school: 'SD Bintang Kejora', stars: 24, levels: 8 },
    { name: 'Nadia Zahra', school: 'SD Teladan Bangsa', stars: 19, levels: 7 },
  ];
}
