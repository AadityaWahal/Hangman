import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Difficulty,
  GameMode,
  GameStats,
  GameStatus,
  WordItem,
} from './types/game';
import { CATEGORIES, getRandomWord, cleanLetter, isLetter } from './utils/words';
import { soundManager } from './utils/sound';
import { launchConfetti } from './utils/confetti';
import { HangmanIllustration } from './components/HangmanIllustration';
import { WordDisplay } from './components/WordDisplay';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { VictoryDefeatModal } from './components/VictoryDefeatModal';
import { TwoPlayerSetupModal } from './components/TwoPlayerSetupModal';
import { StatsModal } from './components/StatsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import {
  RotateCcw,
  Lightbulb,
  Sparkles,
  Volume2,
  VolumeX,
  Flame,
  HelpCircle,
  BarChart3,
  Users,
  Play,
  Sun,
  Moon,
  ChevronDown,
} from 'lucide-react';

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  bestStreak: 0,
  flawlessWins: 0,
  totalGuesses: 0,
  correctGuesses: 0,
  categoryWins: {},
};

export default function App() {
  // Game Setup State
  const [category, setCategory] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [gameMode, setGameMode] = useState<GameMode>('SOLO');
  const [currentWordItem, setCurrentWordItem] = useState<WordItem>(() =>
    getRandomWord('all', 'MEDIUM')
  );

  // Active Play State
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<GameStatus>('PLAYING');
  const [hintRevealed, setHintRevealed] = useState<boolean>(false);
  const [dismissedModal, setDismissedModal] = useState<boolean>(false);

  // Modals & UI Toggles
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isTwoPlayerOpen, setIsTwoPlayerOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundManager.isEnabled());
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Stats in localStorage
  const [stats, setStats] = useState<GameStats>(() => {
    if (typeof window === 'undefined') return DEFAULT_STATS;
    try {
      const saved = localStorage.getItem('hangman_career_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const saveStats = (newStats: GameStats) => {
    setStats(newStats);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hangman_career_stats', JSON.stringify(newStats));
      } catch {
        // LocalStorage fallback
      }
    }
  };

  // Max mistakes based on difficulty
  const maxMistakes = useMemo(() => {
    switch (difficulty) {
      case 'EASY':
        return 8;
      case 'HARD':
        return 5;
      case 'MEDIUM':
      default:
        return 6;
    }
  }, [difficulty]);

  // Letters of the secret word (excluding spaces and punctuation)
  const uniqueSecretLetters = useMemo(() => {
    const letters = new Set<string>();
    for (const char of currentWordItem.word) {
      if (isLetter(char)) {
        letters.add(cleanLetter(char));
      }
    }
    return letters;
  }, [currentWordItem.word]);

  // Calculate mistake count
  const mistakes = useMemo(() => {
    let count = 0;
    guessedLetters.forEach((letter) => {
      if (!uniqueSecretLetters.has(letter)) {
        count++;
      }
    });
    return count;
  }, [guessedLetters, uniqueSecretLetters]);

  // Start new round
  const startNewGame = useCallback(
    (customWord?: WordItem, nextCategory?: string, nextDifficulty?: Difficulty) => {
      const chosenCat = nextCategory !== undefined ? nextCategory : category;
      const chosenDiff = nextDifficulty !== undefined ? nextDifficulty : difficulty;

      const nextWord = customWord || getRandomWord(chosenCat, chosenDiff);
      setCurrentWordItem(nextWord);
      setGuessedLetters(new Set());
      setStatus('PLAYING');
      setHintRevealed(false);
      setDismissedModal(false);
      setGameMode(customWord ? 'TWO_PLAYER' : 'SOLO');
    },
    [category, difficulty]
  );

  // Guess a letter
  const guessLetter = useCallback(
    (rawLetter: string) => {
      if (status !== 'PLAYING') return;

      const letter = cleanLetter(rawLetter);
      if (!isLetter(letter) || guessedLetters.has(letter)) return;

      const newGuessed = new Set(guessedLetters);
      newGuessed.add(letter);
      setGuessedLetters(newGuessed);

      const isCorrect = uniqueSecretLetters.has(letter);

      // Audio feedback
      if (isCorrect) {
        soundManager.playCorrect();
      } else {
        soundManager.playWrong();
      }

      // Check win or lose
      let nextMistakes = mistakes;
      if (!isCorrect) {
        nextMistakes += 1;
      }

      // Win check: All unique letters guessed?
      let won = true;
      uniqueSecretLetters.forEach((l) => {
        if (!newGuessed.has(l)) {
          won = false;
        }
      });

      if (won) {
        setStatus('WON');
        soundManager.playWin();
        launchConfetti();

        // Update stats
        const isFlawless = nextMistakes === 0;
        const newStreak = stats.currentStreak + 1;
        const newStats: GameStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          gamesWon: stats.gamesWon + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(stats.bestStreak, newStreak),
          flawlessWins: isFlawless ? stats.flawlessWins + 1 : stats.flawlessWins,
          totalGuesses: stats.totalGuesses + 1,
          correctGuesses: stats.correctGuesses + (isCorrect ? 1 : 0),
          categoryWins: {
            ...stats.categoryWins,
            [currentWordItem.category]: (stats.categoryWins[currentWordItem.category] || 0) + 1,
          },
        };
        saveStats(newStats);
      } else if (nextMistakes >= maxMistakes) {
        setStatus('LOST');
        soundManager.playLoss();

        // Update stats
        const newStats: GameStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          currentStreak: 0,
          totalGuesses: stats.totalGuesses + 1,
          correctGuesses: stats.correctGuesses + (isCorrect ? 1 : 0),
        };
        saveStats(newStats);
      } else {
        // Just record ongoing guess in stats
        const newStats: GameStats = {
          ...stats,
          totalGuesses: stats.totalGuesses + 1,
          correctGuesses: stats.correctGuesses + (isCorrect ? 1 : 0),
        };
        saveStats(newStats);
      }
    },
    [status, guessedLetters, uniqueSecretLetters, mistakes, maxMistakes, stats, currentWordItem]
  );

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input or modal is open
      if (
        isTwoPlayerOpen ||
        isStatsOpen ||
        isHowToPlayOpen ||
        document.activeElement?.tagName === 'INPUT'
      ) {
        return;
      }

      if (e.key === 'Escape') {
        setDismissedModal(true);
        return;
      }

      if (e.key === 'Enter' && status !== 'PLAYING') {
        startNewGame();
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        guessLetter(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    guessLetter,
    status,
    startNewGame,
    isTwoPlayerOpen,
    isStatsOpen,
    isHowToPlayOpen,
  ]);

  // Toggle Sound
  const toggleSound = () => {
    const nextState = soundManager.toggle();
    setSoundEnabled(nextState);
    if (nextState) {
      soundManager.playKeyClick();
    }
  };

  // Reveal Hint
  const handleRevealHint = () => {
    if (!hintRevealed) {
      setHintRevealed(true);
      soundManager.playHint();
    }
  };

  // Reset career stats
  const handleResetStats = () => {
    saveStats(DEFAULT_STATS);
    setIsStatsOpen(false);
  };

  // Find human category name
  const categoryName = useMemo(() => {
    const found = CATEGORIES.find((c) => c.id === currentWordItem.category);
    return found ? found.name : currentWordItem.category;
  }, [currentWordItem]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === 'dark' ? 'bg-chalkboard text-slate-100 dark' : 'bg-parchment text-slate-900'
      }`}
    >
      {/* 
        TOP BAR CONTRACT:
        Zone 1: Wordmark brand title
        Zone 2: 4-5 concise single-line nav links
        Zone 3: 1 primary action button
      */}
      <header
        className={`flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b shrink-0 ${
          theme === 'dark' ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-white/70'
        } backdrop-blur-md sticky top-0 z-40`}
      >
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-display font-extrabold text-base">
            H
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight whitespace-nowrap">
            Hangman Odyssey
          </span>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setIsHowToPlayOpen(true)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Rules</span>
          </button>

          <button
            type="button"
            onClick={() => setIsStatsOpen(true)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Stats</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTwoPlayerOpen(true)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">2-Player Duel</span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
            <span className="hidden md:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="flex items-center text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => startNewGame()}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Game</span>
          </button>
        </div>
      </header>

      {/* Prominent Dedication Banner - Visible on first glance */}
      <div
        className={`w-full py-2 px-4 border-b transition-colors ${
          theme === 'dark'
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
            : 'bg-amber-50 border-amber-200/90 text-amber-900'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-center">
          <span>
            Special Edition: Made by{' '}
            <span className="font-bold text-amber-400 dark:text-amber-300 underline decoration-amber-400/60 underline-offset-2">
              Aaditya
            </span>{' '}
            for{' '}
            <span className="font-bold text-amber-400 dark:text-amber-300 underline decoration-amber-400/60 underline-offset-2">
              Naitik
            </span>
          </span>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
          <span className="font-medium text-slate-300 dark:text-slate-300">Class 11th A</span>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
          <span className="font-semibold text-slate-200 dark:text-slate-200">
            Nutan Vidya Mandir School
          </span>
        </div>
      </div>

      {/* Main Content Arena */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between">
        {/* Workspace Toolbar: Clean segmented tabs & game status */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border mb-4 ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white/80 border-slate-200'
          }`}
        >
          {/* Category Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2 shrink-0">
              Topic:
            </span>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  startNewGame(undefined, cat.id, difficulty);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  category === cat.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {cat.name.split(' ')[0]}
              </button>
            ))}

            {/* Dropdown for additional categories */}
            <div className="relative inline-block text-left shrink-0">
              <select
                value={category}
                onChange={(e) => {
                  const newCat = e.target.value;
                  setCategory(newCat);
                  startNewGame(undefined, newCat, difficulty);
                }}
                className={`text-xs font-medium py-1 px-2 rounded-md border appearance-none pr-5 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                <option value="all">More Topics...</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Difficulty & Streak indicator */}
          <div className="flex items-center gap-3 text-xs">
            {/* Difficulty Segmented Toggle */}
            <div
              className={`flex items-center gap-0.5 p-0.5 rounded-lg border ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => {
                    setDifficulty(diff);
                    startNewGame(undefined, category, diff);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    difficulty === diff
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff === 'EASY' ? '8 Lives' : diff === 'MEDIUM' ? 'Classic' : 'Hard'}
                </button>
              ))}
            </div>

            {/* Streak Counter */}
            {stats.currentStreak > 0 && (
              <div className="flex items-center gap-1 text-amber-400 font-bold font-mono-num whitespace-nowrap">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{stats.currentStreak} streak</span>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1">
          {/* Left Column: Gallows Illustration & Clue Section */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className={`w-full rounded-2xl border p-4 flex flex-col items-center relative ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800/80 shadow-lg'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Live status badge or duel label */}
              {gameMode === 'TWO_PLAYER' && (
                <div className="absolute top-3 left-3 text-[11px] font-mono-num text-amber-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Pass & Play Match</span>
                </div>
              )}

              {/* Hangman SVG Figure */}
              <HangmanIllustration
                mistakes={mistakes}
                maxMistakes={maxMistakes}
                status={status}
                theme={theme}
              />

              {/* Hint Bar / Clue revelation */}
              <div className="w-full mt-3 pt-3 border-t border-slate-800/60 flex flex-col items-center">
                {hintRevealed ? (
                  <div
                    className={`w-full text-center text-xs sm:text-sm p-2.5 rounded-lg border leading-relaxed animate-fadeIn ${
                      theme === 'dark'
                        ? 'bg-amber-950/20 border-amber-900/30 text-amber-200'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <span className="font-semibold">Clue:</span> {currentWordItem.hint}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleRevealHint}
                    disabled={status !== 'PLAYING'}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium py-1 px-3 rounded-md hover:bg-amber-500/10 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Need a hint? Reveal clue</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Mystery Word & Virtual Keyboard */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
            {/* Word Category & Length Metadata (clean unboxed text with separators) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
              <span className="text-amber-400 font-semibold">{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{currentWordItem.word.replace(/[\s-]/g, '').length} letters</span>
              <span aria-hidden="true">·</span>
              <span>
                {uniqueSecretLetters.size -
                  Array.from(guessedLetters).filter((l) => uniqueSecretLetters.has(l)).length}{' '}
                remaining
              </span>
            </div>

            {/* Word Display with letter underline slots */}
            <WordDisplay
              word={currentWordItem.word}
              guessedLetters={guessedLetters}
              status={status}
              theme={theme}
            />

            {/* Interactive QWERTY Keyboard */}
            <VirtualKeyboard
              onGuessLetter={guessLetter}
              guessedLetters={guessedLetters}
              secretWord={currentWordItem.word}
              disabled={status !== 'PLAYING'}
              theme={theme}
            />

            {/* Game state message / quick actions */}
            {status !== 'PLAYING' && dismissedModal && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDismissedModal(false)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                >
                  View Solution & Trivia
                </button>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={() => startNewGame()}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs cursor-pointer"
                >
                  Next Word (Enter)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quiet Footer */}
        <footer className="mt-6 pt-3 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 text-center sm:text-left">
          <div>
            Made with 💛 by <span className="text-slate-400 font-medium">Aaditya</span> for{' '}
            <span className="text-slate-400 font-medium">Naitik</span> (Class 11th A, Nutan Vidya
            Mandir School)
          </div>
          <div>Press any letter key (A-Z) on your keyboard to guess</div>
        </footer>
      </main>

      {/* Outcome Victory/Defeat Modal */}
      {!dismissedModal && (
        <VictoryDefeatModal
          status={status}
          wordItem={currentWordItem}
          mistakes={mistakes}
          maxMistakes={maxMistakes}
          currentStreak={stats.currentStreak}
          onNextWord={() => startNewGame()}
          onPlayAgain={() => {
            setGuessedLetters(new Set());
            setStatus('PLAYING');
            setDismissedModal(false);
          }}
          onDismiss={() => setDismissedModal(true)}
          theme={theme}
        />
      )}

      {/* 2-Player Pass-and-Play Modal */}
      <TwoPlayerSetupModal
        isOpen={isTwoPlayerOpen}
        onClose={() => setIsTwoPlayerOpen(false)}
        onStartCustomMatch={(item) => startNewGame(item)}
        theme={theme}
      />

      {/* Player Stats Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        theme={theme}
        onResetStats={handleResetStats}
      />

      {/* How to Play Rules Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        theme={theme}
      />
    </div>
  );
}
