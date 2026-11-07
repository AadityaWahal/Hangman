import React from 'react';
import { GameStats } from '../types/game';
import { BarChart3, X, Award, Flame, CheckCircle, Crosshair } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  theme?: 'dark' | 'light';
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  theme = 'dark',
  onResetStats,
}) => {
  if (!isOpen) return null;

  const winRate =
    stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
  const accuracy =
    stats.totalGuesses > 0 ? Math.round((stats.correctGuesses / stats.totalGuesses) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative transition-all ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold">Player Statistics</h2>
            <div className="text-xs text-slate-400">Career performance tracking</div>
          </div>
        </div>

        {/* 4 Primary Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div
            className={`p-3 rounded-xl border flex flex-col ${
              theme === 'dark' ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Win Rate</span>
            </div>
            <div className="text-2xl font-mono-num font-bold text-slate-100 dark:text-slate-100">
              {winRate}%
            </div>
            <div className="text-[11px] text-slate-400">
              {stats.gamesWon} / {stats.gamesPlayed} games won
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border flex flex-col ${
              theme === 'dark' ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Current Streak</span>
            </div>
            <div className="text-2xl font-mono-num font-bold text-amber-400">
              {stats.currentStreak}
            </div>
            <div className="text-[11px] text-slate-400">Best: {stats.bestStreak} streak</div>
          </div>

          <div
            className={`p-3 rounded-xl border flex flex-col ${
              theme === 'dark' ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Flawless Wins</span>
            </div>
            <div className="text-2xl font-mono-num font-bold text-indigo-400">
              {stats.flawlessWins}
            </div>
            <div className="text-[11px] text-slate-400">Zero mistakes made</div>
          </div>

          <div
            className={`p-3 rounded-xl border flex flex-col ${
              theme === 'dark' ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span>Guess Accuracy</span>
            </div>
            <div className="text-2xl font-mono-num font-bold text-sky-400">{accuracy}%</div>
            <div className="text-[11px] text-slate-400">
              {stats.correctGuesses} / {stats.totalGuesses} hits
            </div>
          </div>
        </div>

        {/* Reset Option */}
        <div className="pt-2 flex justify-between items-center border-t border-slate-800 text-xs text-slate-400">
          <span>Saved locally</span>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all lifetime stats?')) {
                onResetStats();
              }
            }}
            className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            Reset History
          </button>
        </div>
      </div>
    </div>
  );
};
