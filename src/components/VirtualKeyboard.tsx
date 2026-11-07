import React from 'react';

interface VirtualKeyboardProps {
  onGuessLetter: (letter: string) => void;
  guessedLetters: Set<string>;
  secretWord: string;
  disabled: boolean;
  theme?: 'dark' | 'light';
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onGuessLetter,
  guessedLetters,
  secretWord,
  disabled,
  theme = 'dark',
}) => {
  const secretSet = React.useMemo(() => new Set(secretWord.split('')), [secretWord]);

  return (
    <div
      className="flex flex-col items-center gap-1.5 sm:gap-2 w-full max-w-2xl px-2 py-3 select-none"
      role="group"
      aria-label="Virtual Letter Keyboard"
    >
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5 w-full">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = isGuessed && secretSet.has(letter);
            const isWrong = isGuessed && !secretSet.has(letter);
            const isDisabled = disabled || isGuessed;

            let buttonStyles = '';
            if (isCorrect) {
              buttonStyles =
                'bg-emerald-600/90 text-white border-emerald-500 shadow-sm cursor-default opacity-90';
            } else if (isWrong) {
              buttonStyles =
                'bg-slate-800/40 text-slate-500 line-through border-transparent cursor-default opacity-40';
            } else if (theme === 'dark') {
              buttonStyles =
                'bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 border-slate-700 hover:border-slate-500 shadow-sm';
            } else {
              buttonStyles =
                'bg-white hover:bg-slate-100 active:scale-95 text-slate-800 border-slate-300 hover:border-slate-400 shadow-sm';
            }

            return (
              <button
                key={letter}
                type="button"
                onClick={() => onGuessLetter(letter)}
                disabled={isDisabled}
                aria-label={`Letter ${letter}${
                  isCorrect ? ' (correct)' : isWrong ? ' (incorrect)' : ''
                }`}
                className={`flex items-center justify-center min-w-[32px] sm:min-w-[44px] h-11 sm:h-12 px-2 sm:px-3 text-sm sm:text-base font-bold font-mono-num rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${buttonStyles}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
