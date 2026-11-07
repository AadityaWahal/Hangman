import React from 'react';
import { GameStatus, WordItem } from '../types/game';
import { RotateCcw, ArrowRight, Trophy, Skull, Sparkles, Eye } from 'lucide-react';

interface VictoryDefeatModalProps {
  status: GameStatus;
  wordItem: WordItem;
  mistakes: number;
  maxMistakes: number;
  currentStreak: number;
  onNextWord: () => void;
  onPlayAgain: () => void;
  onDismiss: () => void;
  theme?: 'dark' | 'light';
}

export const VictoryDefeatModal: React.FC<VictoryDefeatModalProps> = ({
  status,
  wordItem,
  mistakes,
  maxMistakes,
  currentStreak,
  onNextWord,
  onPlayAgain,
  onDismiss,
  theme = 'dark',
}) => {
  if (status === 'PLAYING') return null;

  const isWon = status === 'WON';
  const isFlawless = isWon && mistakes === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-all ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Outcome Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full mb-3 ${
              isWon
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {isWon ? (
              isFlawless ? (
                <Sparkles className="w-8 h-8 text-amber-400 animate-bounce" />
              ) : (
                <Trophy className="w-7 h-7 text-emerald-400" />
              )
            ) : (
              <Skull className="w-7 h-7 text-rose-400" />
            )}
          </div>

          <h2 className="text-2xl font-display font-bold tracking-tight">
            {isWon
              ? isFlawless
                ? 'Flawless Victory!'
                : 'Word Solved!'
              : 'Gallows Claimed!'}
          </h2>

          {/* Clean Unboxed Metadata line */}
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>{isWon ? `${maxMistakes - mistakes} lives spared` : 'Out of chances'}</span>
            <span aria-hidden="true">·</span>
            <span>Streak: {currentStreak}</span>
            {isFlawless && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold">Zero Mistakes</span>
              </>
            )}
          </div>
        </div>

        {/* Word Reveal Card */}
        <div
          className={`mt-5 p-4 rounded-xl border text-center ${
            theme === 'dark'
              ? 'bg-slate-800/60 border-slate-700/60'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            The Secret Word Was
          </div>
          <div className="text-2xl font-display font-extrabold tracking-widest text-amber-400">
            {wordItem.word}
          </div>
          {wordItem.trivia && (
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-300 font-normal border-t border-slate-700/40 pt-2.5">
              💡 {wordItem.trivia}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onNextWord}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Next Word</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border font-medium text-sm transition-colors cursor-pointer whitespace-nowrap ${
              theme === 'dark'
                ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                : 'border-slate-300 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Word</span>
          </button>
        </div>

        {/* View Board Option */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Game Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};
