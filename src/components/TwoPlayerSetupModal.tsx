import React, { useState } from 'react';
import { WordItem } from '../types/game';
import { Users, Eye, EyeOff, Play, X } from 'lucide-react';

interface TwoPlayerSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomMatch: (wordItem: WordItem) => void;
  theme?: 'dark' | 'light';
}

export const TwoPlayerSetupModal: React.FC<TwoPlayerSetupModalProps> = ({
  isOpen,
  onClose,
  onStartCustomMatch,
  theme = 'dark',
}) => {
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');
  const [hint, setHint] = useState('');
  const [showWord, setShowWord] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = word.trim().toUpperCase();

    if (!cleanWord) {
      setError('Please provide a secret word.');
      return;
    }

    if (!/^[A-Z\s-]+$/.test(cleanWord)) {
      setError('Word can only contain letters, spaces, and hyphens.');
      return;
    }

    const letterCount = cleanWord.replace(/[\s-]/g, '').length;
    if (letterCount < 3) {
      setError('Word must have at least 3 letters.');
      return;
    }

    if (letterCount > 20) {
      setError('Word cannot exceed 20 letters.');
      return;
    }

    setError(null);
    const customItem: WordItem = {
      id: `custom_${Date.now()}`,
      word: cleanWord,
      category: category.trim() || 'Custom Challenge',
      hint: hint.trim() || 'Custom word chosen by Player 1',
      trivia: 'A custom mystery crafted specially for this duel!',
      difficulty: 'MEDIUM',
    };

    onStartCustomMatch(customItem);
    onClose();
  };

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

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold">Pass & Play Duel</h2>
            <div className="text-xs text-slate-400">Player 1 sets the word, Player 2 guesses</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Secret Word or Phrase *
            </label>
            <div className="relative">
              <input
                type={showWord ? 'text' : 'password'}
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. MOONWALK"
                maxLength={25}
                autoFocus
                className={`w-full pr-10 px-3.5 py-2.5 rounded-lg border font-mono-num uppercase tracking-wider text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowWord(!showWord)}
                aria-label={showWord ? 'Hide secret word' : 'Show secret word'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {showWord ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Category (Optional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. 80s Dance Move or Inside Joke"
              maxLength={30}
              className={`w-full px-3.5 py-2 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                theme === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Hint for Player 2 (Optional)
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="e.g. Popularized by a famous pop king"
              maxLength={80}
              className={`w-full px-3.5 py-2 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                theme === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {error && <div className="text-xs font-medium text-rose-400">{error}</div>}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer shadow-sm"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Hand Device to Player 2</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
