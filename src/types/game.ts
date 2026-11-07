export type GameMode = 'SOLO' | 'TWO_PLAYER';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameStatus = 'PLAYING' | 'WON' | 'LOST';

export interface WordItem {
  id: string;
  word: string;
  category: string;
  hint: string;
  trivia: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
  flawlessWins: number;
  totalGuesses: number;
  correctGuesses: number;
  categoryWins: Record<string, number>;
}

export interface PlayerCustomWord {
  word: string;
  category: string;
  hint: string;
}
