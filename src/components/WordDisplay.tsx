import React from 'react';
import { GameStatus } from '../types/game';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  status: GameStatus;
  theme?: 'dark' | 'light';
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  guessedLetters,
  status,
  theme = 'dark',
}) => {
  const isLost = status === 'LOST';

  // Split multi-word phrases (e.g. "JURASSIC PARK" -> ["JURASSIC", "PARK"])
  // so that whole words wrap naturally on smaller screens
  const wordTokens = word.split(' ');

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 px-4 py-3 select-none">
      {wordTokens.map((token, wordIdx) => (
        <div key={wordIdx} className="flex items-center gap-1.5 sm:gap-2">
          {token.split('').map((char, charIdx) => {
            const isGuessed = guessedLetters.has(char);
            const isRevealed = isGuessed || isLost;
            const wasMissed = isLost && !isGuessed;

            return (
              <div
                key={charIdx}
                className={`relative flex items-center justify-center w-8 h-12 sm:w-11 sm:h-14 border-b-4 transition-all duration-300 font-display font-bold text-xl sm:text-2xl ${
                  wasMissed
                    ? 'border-rose-500 text-rose-400 bg-rose-500/10'
                    : isGuessed
                    ? 'border-emerald-500 text-emerald-400 dark:text-emerald-300'
                    : theme === 'dark'
                    ? 'border-slate-500 text-transparent'
                    : 'border-slate-400 text-transparent'
                } rounded-t-md`}
              >
                <span
                  className={`transform transition-all duration-300 ${
                    isRevealed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}
                >
                  {isRevealed ? char : ''}
                </span>

                {/* Subtle indicator for missed letters */}
                {wasMissed && (
                  <span className="absolute -top-1.5 right-0.5 text-[9px] uppercase font-mono-num text-rose-500">
                    !
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
