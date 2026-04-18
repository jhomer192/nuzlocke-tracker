import type { Game } from '../types';
import { BADGE_NAMES } from '../data/routes';

interface BadgeBarProps {
  game: Game;
  badges: boolean[];
  onToggle: (index: number) => void;
}

export function BadgeBar({ game, badges, onToggle }: BadgeBarProps) {
  const names = BADGE_NAMES[game];
  const earnedCount = badges.filter(Boolean).length;

  return (
    <div className="bg-zinc-800/80 backdrop-blur-sm border-b border-zinc-700 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Badges</span>
        <span className="text-xs text-zinc-500">{earnedCount}/{names.length}</span>
      </div>
      <div className="flex gap-2 justify-between">
        {badges.map((earned, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            title={names[i]}
            className={`relative group flex-1 max-w-[40px] aspect-square rounded-lg border-2 transition-all duration-200 ${
              earned
                ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-700/50 border-zinc-600 hover:border-zinc-500'
            }`}
          >
            {/* Badge icon - shield shape */}
            <svg
              viewBox="0 0 24 24"
              className={`w-full h-full p-1.5 transition-all ${
                earned ? 'text-amber-400' : 'text-zinc-600'
              }`}
              fill="currentColor"
            >
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z" />
            </svg>
            {/* Badge number */}
            <span
              className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${
                earned ? 'text-amber-900' : 'text-zinc-500'
              }`}
            >
              {i + 1}
            </span>
            {/* Tooltip */}
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {names[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
