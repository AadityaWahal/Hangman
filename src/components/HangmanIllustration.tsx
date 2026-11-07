import React from 'react';
import { GameStatus } from '../types/game';

interface HangmanIllustrationProps {
  mistakes: number;
  maxMistakes: number;
  status: GameStatus;
  theme?: 'dark' | 'light';
}

export const HangmanIllustration: React.FC<HangmanIllustrationProps> = ({
  mistakes,
  maxMistakes,
  status,
  theme = 'dark',
}) => {
  // Normalize mistakes into 6 core bodily stages:
  // 1: Head, 2: Torso, 3: Left Arm, 4: Right Arm, 5: Left Leg, 6: Right Leg
  // If maxMistakes is 8, stages map smoothly:
  const getVisibleStages = () => {
    if (maxMistakes === 6) {
      return {
        scaffold: true,
        rope: true,
        head: mistakes >= 1,
        torso: mistakes >= 2,
        leftArm: mistakes >= 3,
        rightArm: mistakes >= 4,
        leftLeg: mistakes >= 5,
        rightLeg: mistakes >= 6,
      };
    }
    if (maxMistakes === 8) {
      return {
        scaffold: true,
        rope: mistakes >= 1,
        head: mistakes >= 2,
        torso: mistakes >= 3,
        leftArm: mistakes >= 4,
        rightArm: mistakes >= 5,
        leftLeg: mistakes >= 6,
        rightLeg: mistakes >= 7,
      };
    }
    // Hard mode (5 mistakes)
    return {
      scaffold: true,
      rope: true,
      head: mistakes >= 1,
      torso: mistakes >= 2,
      leftArm: mistakes >= 3,
      rightArm: mistakes >= 4,
      leftLeg: mistakes >= 5,
      rightLeg: mistakes >= 5, // Both legs on 5th
    };
  };

  const visible = getVisibleStages();
  const isWon = status === 'WON';
  const isLost = status === 'LOST';

  // Colors
  const woodColor = theme === 'dark' ? '#b45309' : '#92400e';
  const woodDark = theme === 'dark' ? '#78350f' : '#713f12';
  const ropeColor = theme === 'dark' ? '#d97706' : '#b45309';
  const strokeColor = theme === 'dark' ? '#f8fafc' : '#1e293b';
  const skinColor = '#fed7aa'; // Warm light peach
  const shirtColor = isWon ? '#10b981' : isLost ? '#ef4444' : '#3b82f6';

  return (
    <div className="relative flex flex-col items-center justify-center p-4 select-none">
      <svg
        viewBox="0 0 320 320"
        className="w-full max-w-[280px] sm:max-w-[340px] h-auto drop-shadow-md overflow-visible"
        aria-label={`Hangman illustration showing ${mistakes} of ${maxMistakes} mistakes`}
      >
        <defs>
          {/* Subtle drop shadow */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
          </filter>
          {/* Glow filter for win state */}
          <filter id="winGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* 1. Ground & Base Hill */}
        <ellipse cx="160" cy="295" rx="130" ry="14" fill={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
        <path
          d="M 40 295 Q 160 286 280 295"
          stroke={theme === 'dark' ? '#334155' : '#cbd5e1'}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2. Wooden Gallows Base Platform */}
        {visible.scaffold && (
          <g id="gallows-base" className="transition-all duration-300">
            {/* Wooden Base Beams */}
            <rect x="50" y="286" width="90" height="9" rx="3" fill={woodColor} stroke={woodDark} strokeWidth="2" />
            <polygon points="65,286 75,260 85,286" fill={woodDark} />
            <polygon points="105,286 115,260 125,286" fill={woodDark} />

            {/* Vertical Beam */}
            <rect x="88" y="45" width="16" height="242" rx="3" fill={woodColor} stroke={woodDark} strokeWidth="2" />
            
            {/* Wood grain details */}
            <line x1="93" y1="65" x2="93" y2="270" stroke={woodDark} strokeWidth="1.5" strokeDasharray="18 8" opacity="0.6" />
            <line x1="99" y1="80" x2="99" y2="240" stroke={woodDark} strokeWidth="1.5" strokeDasharray="24 12" opacity="0.4" />

            {/* Top Horizontal Beam */}
            <rect x="75" y="38" width="145" height="15" rx="3" fill={woodColor} stroke={woodDark} strokeWidth="2" />
            <rect x="217" y="36" width="6" height="19" rx="2" fill={woodDark} />

            {/* Diagonal Brace */}
            <line x1="104" y1="82" x2="148" y2="48" stroke={woodColor} strokeWidth="10" strokeLinecap="round" />
            <line x1="104" y1="82" x2="148" y2="48" stroke={woodDark} strokeWidth="2" />

            {/* Hanging Iron Hook */}
            <path
              d="M 195 53 L 195 62 Q 195 68 190 68"
              fill="none"
              stroke={theme === 'dark' ? '#94a3b8' : '#475569'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 3. The Hanging Rope */}
        {visible.rope && (
          <g id="rope" className="transition-all duration-300">
            {/* Hanging cord from hook to noose */}
            <path
              d="M 195 62 L 195 105"
              stroke={ropeColor}
              strokeWidth="4"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
            {/* Coiled Knot */}
            <rect x="190" y="103" width="10" height="9" rx="2" fill={ropeColor} stroke={woodDark} strokeWidth="1.5" />
            {/* Noose Loop (hidden or broken when user wins) */}
            {!isWon && (
              <ellipse
                cx="195"
                cy="119"
                rx="8"
                ry="11"
                fill="none"
                stroke={ropeColor}
                strokeWidth="3.5"
                strokeDasharray="4 2"
              />
            )}
          </g>
        )}

        {/* 4. THE MAN / CHARACTER */}
        {/* If won, character drops down happily on the ground with celebration pose! */}
        {isWon ? (
          <g id="man-saved" className="transition-transform duration-700" transform="translate(15, 60)">
            {/* Confetti / Star burst above character */}
            <path
              d="M 180 80 L 180 65 M 195 72 L 205 60 M 165 72 L 155 60"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Head - Cheerful smiling with party aura */}
            <circle cx="180" cy="120" r="21" fill={skinColor} stroke={strokeColor} strokeWidth="3" />
            {/* Cheerful Happy Eyes (arches) */}
            <path d="M 172 116 Q 175 111 178 116" stroke={strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 182 116 Q 185 111 188 116" stroke={strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Blushing cheeks */}
            <circle cx="170" cy="123" r="3" fill="#f43f5e" opacity="0.6" />
            <circle cx="190" cy="123" r="3" fill="#f43f5e" opacity="0.6" />
            {/* Big Smile */}
            <path d="M 172 125 Q 180 135 188 125" stroke={strokeColor} strokeWidth="2.5" fill="#ef4444" strokeLinecap="round" />

            {/* Torso */}
            <path
              d="M 170 142 L 190 142 L 187 186 L 173 186 Z"
              fill={shirtColor}
              stroke={strokeColor}
              strokeWidth="3"
            />

            {/* Arms raised in triumphant V victory! */}
            <path
              d="M 170 148 L 150 126 L 144 115"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 190 148 L 210 126 L 216 115"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Legs standing happily */}
            <path
              d="M 175 186 L 168 226 L 158 226"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 185 186 L 192 226 L 202 226"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ) : (
          /* Normal / Dangling hanging stick figure */
          <g
            id="man-hanging"
            className={`${isLost ? 'animate-sway' : mistakes >= 4 ? 'animate-shiver' : ''}`}
            style={{ transformOrigin: '195px 70px' }}
          >
            {/* 4a. Head */}
            {visible.head && (
              <g id="head" className="transition-opacity duration-300">
                {/* Head circle */}
                <circle cx="195" cy="120" r="19" fill={skinColor} stroke={strokeColor} strokeWidth="3" />

                {/* Hair tuft */}
                <path
                  d="M 188 102 Q 195 97 202 102"
                  stroke={theme === 'dark' ? '#475569' : '#334155'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Facial Expressions based on game state */}
                {isLost ? (
                  /* Game Over: X X eyes and tongue */
                  <g id="face-game-over">
                    {/* Left X eye */}
                    <line x1="186" y1="113" x2="192" y2="119" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="192" y1="113" x2="186" y2="119" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
                    {/* Right X eye */}
                    <line x1="198" y1="113" x2="204" y2="119" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="204" y1="113" x2="198" y2="119" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
                    {/* Tongue hanging out */}
                    <path d="M 191 127 Q 195 125 199 127" stroke={strokeColor} strokeWidth="2" fill="none" />
                    <path d="M 193 126 Q 195 136 198 131 Z" fill="#ef4444" stroke={strokeColor} strokeWidth="1.5" />
                  </g>
                ) : mistakes >= 4 ? (
                  /* High danger: Nervous sweating / wide eyes */
                  <g id="face-danger">
                    {/* Wide round nervous eyes */}
                    <circle cx="189" cy="116" r="3.5" fill="#ffffff" stroke={strokeColor} strokeWidth="1.5" />
                    <circle cx="189" cy="116" r="1.5" fill={strokeColor} />
                    <circle cx="201" cy="116" r="3.5" fill="#ffffff" stroke={strokeColor} strokeWidth="1.5" />
                    <circle cx="201" cy="116" r="1.5" fill={strokeColor} />
                    {/* Wobbly mouth */}
                    <path d="M 189 128 Q 192 125 195 128 T 201 127" stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
                    {/* Sweat drop falling */}
                    <path d="M 213 113 Q 215 119 212 122 Q 210 120 213 113 Z" fill="#38bdf8" />
                  </g>
                ) : (
                  /* Early mistakes: Mildly concerned */
                  <g id="face-mild">
                    {/* Regular eyes */}
                    <circle cx="189" cy="117" r="2" fill={strokeColor} />
                    <circle cx="201" cy="117" r="2" fill={strokeColor} />
                    {/* Slight frown */}
                    <path d="M 190 127 Q 195 123 200 127" stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
                  </g>
                )}
              </g>
            )}

            {/* 4b. Torso */}
            {visible.torso && (
              <g id="torso" className="transition-opacity duration-300">
                <path
                  d="M 187 140 L 203 140 L 201 190 L 189 190 Z"
                  fill={shirtColor}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
                {/* Shirt button / collar */}
                <line x1="195" y1="140" x2="195" y2="158" stroke={strokeColor} strokeWidth="1.5" />
                <circle cx="195" cy="148" r="1" fill={strokeColor} />
              </g>
            )}

            {/* 4c. Left Arm */}
            {visible.leftArm && (
              <path
                d="M 188 147 L 168 172 L 160 166"
                stroke={strokeColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="transition-all duration-300"
              />
            )}

            {/* 4d. Right Arm */}
            {visible.rightArm && (
              <path
                d="M 202 147 L 222 172 L 230 166"
                stroke={strokeColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="transition-all duration-300"
              />
            )}

            {/* 4e. Left Leg */}
            {visible.leftLeg && (
              <path
                d="M 191 190 L 178 235 L 170 238"
                stroke={strokeColor}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="transition-all duration-300"
              />
            )}

            {/* 4f. Right Leg */}
            {visible.rightLeg && (
              <path
                d="M 199 190 L 212 235 L 220 238"
                stroke={strokeColor}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="transition-all duration-300"
              />
            )}
          </g>
        )}
      </svg>

      {/* Tension / Lives meter directly underneath the gallows */}
      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
        <span className="text-slate-400">Tension:</span>
        <div className="flex gap-1 items-center">
          {Array.from({ length: maxMistakes }).map((_, i) => {
            const isUsed = i < mistakes;
            return (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  isUsed
                    ? 'bg-rose-500 scale-110 shadow-sm shadow-rose-500/50'
                    : 'bg-slate-700/60 dark:bg-slate-700/60'
                }`}
                title={`Mistake ${i + 1} of ${maxMistakes}`}
              />
            );
          })}
        </div>
        <span
          className={`ml-1 font-mono-num ${
            mistakes >= maxMistakes - 1 ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}
        >
          {maxMistakes - mistakes} lives left
        </span>
      </div>
    </div>
  );
};
