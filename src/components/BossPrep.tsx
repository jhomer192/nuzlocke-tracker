import { useState, useMemo } from 'react';
import type { BossEntry, BossPokemon } from '../data/bosses';
import { getBossesForSegment } from '../data/bosses';
import { getSpriteUrl } from '../utils/pokeapi';
import { TypeBadge } from './TypeBadge';
import { Modal } from './Modal';
import { ALL_TYPES, GAME_GENERATIONS } from '../types';
import type { Game, PokemonType } from '../types';
import { getDefensiveMultiplier } from '../data/typeChart';

interface BossPrepProps {
  game: Game;
  segment: string;
  defeatedBosses?: string[];
  onDefeat?: (bossName: string) => void;
  customGameId?: string;
}

function getWeaknesses(types: string[], gen: number): string[] {
  return ALL_TYPES.filter((atkType) => {
    // Skip types that don't exist in this gen
    if (gen <= 1 && (atkType === 'dark' || atkType === 'steel' || atkType === 'fairy')) return false;
    if (gen <= 5 && atkType === 'fairy') return false;
    const mult = getDefensiveMultiplier(atkType as PokemonType, types, gen);
    return mult > 1;
  });
}

function formatTypeName(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function BossPokemonRow({ mon, gen }: { mon: BossPokemon; gen: number }) {
  const weaknesses = useMemo(() => getWeaknesses(mon.types, gen), [mon.types, gen]);

  return (
    <div className="flex items-center gap-3 w-full px-3 py-2 border-b border-zinc-700/50 last:border-b-0">
      <img
        src={getSpriteUrl(mon.id)}
        alt={mon.name}
        className="w-10 h-10 pixelated flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="capitalize font-medium">{mon.name}</span>
          <span className="text-xs text-zinc-400">Lv.{mon.level}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-0.5">
          {mon.moves.map((move) => (
            <span key={move} className="text-[10px] text-zinc-400">{move}</span>
          ))}
        </div>
        {weaknesses.length > 0 && (
          <div className="text-[10px] text-amber-400/80 mt-0.5">
            Weak: {weaknesses.map(formatTypeName).join(', ')}
          </div>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        {mon.types.map((t) => (
          <TypeBadge key={t} type={t} small />
        ))}
      </div>
    </div>
  );
}

// Focused view of a single boss's team (matches catch modal style)
function BossFocusedView({ boss, gen, isDefeated, onDefeat }: { boss: BossEntry; gen: number; isDefeated: boolean; onDefeat?: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-zinc-700/30 border border-zinc-700 overflow-hidden">
        {boss.pokemon.map((mon, i) => (
          <BossPokemonRow key={`${mon.name}-${i}`} mon={mon} gen={gen} />
        ))}
      </div>
      {!isDefeated && onDefeat && (
        <button
          onClick={onDefeat}
          className="w-full rounded-xl bg-emerald-600 py-3.5 font-bold text-white text-base hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20"
        >
          Mark as Defeated
        </button>
      )}
      {isDefeated && (
        <div className="text-center py-2">
          <span className="text-sm font-bold text-emerald-400 bg-emerald-500/15 px-4 py-1.5 rounded-full">
            Defeated
          </span>
        </div>
      )}
    </div>
  );
}

export function BossPrepButton({ game, segment, defeatedBosses, onDefeat, customGameId }: BossPrepProps) {
  const [open, setOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState<BossEntry | null>(null);
  const [victoryBoss, setVictoryBoss] = useState<string | null>(null);
  const bosses = useMemo(() => getBossesForSegment(game, segment, customGameId), [game, segment, customGameId]);
  const gen = GAME_GENERATIONS[game];

  if (bosses.length === 0) return null;

  const defeated = defeatedBosses ?? [];
  const allDefeated = bosses.every((b) => defeated.includes(b.name));

  const handleOpen = () => {
    // If only one boss, go straight to focused view
    if (bosses.length === 1) {
      setSelectedBoss(bosses[0]);
    } else {
      // Auto-select the first undefeated boss
      const next = bosses.find((b) => !defeated.includes(b.name));
      setSelectedBoss(next ?? null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBoss(null);
  };

  const handleDefeat = (bossName: string) => {
    setVictoryBoss(bossName);
    onDefeat?.(bossName);
    setTimeout(() => {
      setVictoryBoss(null);
      // After defeating, if multiple bosses, go back to picker
      if (bosses.length > 1) {
        setSelectedBoss(null);
      }
    }, 1500);
  };

  const title = selectedBoss ? selectedBoss.name : `${segment} Bosses`;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        className={`text-xs font-bold transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 min-h-[32px] ${
          allDefeated
            ? 'text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25'
            : 'text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20'
        }`}
        title="View boss team"
      >
        {allDefeated && (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        Boss
      </button>

      <Modal open={open} onClose={handleClose} title={title}>
        {/* Victory animation */}
        {victoryBoss && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-3 text-center animate-fade-in">
            <p className="text-emerald-400 font-bold text-lg">Victory!</p>
            <p className="text-emerald-300/70 text-sm">{victoryBoss} has been defeated</p>
          </div>
        )}

        {/* Focused single boss view */}
        {selectedBoss && !victoryBoss && (
          <>
            {bosses.length > 1 && (
              <button
                onClick={() => setSelectedBoss(null)}
                className="text-xs text-purple-400 hover:text-purple-300 mb-3 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All bosses
              </button>
            )}
            <BossFocusedView
              boss={selectedBoss}
              gen={gen}
              isDefeated={defeated.includes(selectedBoss.name)}
              onDefeat={onDefeat ? () => handleDefeat(selectedBoss.name) : undefined}
            />
          </>
        )}

        {/* Boss picker list (same style as route encounter list) */}
        {!selectedBoss && !victoryBoss && (
          <div className="rounded-lg bg-zinc-700/30 border border-zinc-700 overflow-hidden">
            {bosses.map((boss, i) => {
              const isDefeated = defeated.includes(boss.name);
              return (
                <button
                  key={`${boss.name}-${i}`}
                  onClick={() => setSelectedBoss(boss)}
                  className="flex items-center gap-3 w-full px-3 py-3 hover:bg-zinc-600/50 transition-colors text-left border-b border-zinc-700/50 last:border-b-0"
                >
                  <img
                    src={getSpriteUrl(boss.pokemon[boss.pokemon.length - 1].id)}
                    alt={boss.name}
                    className="w-10 h-10 pixelated"
                  />
                  <span className="font-medium flex-1">{boss.name}</span>
                  <span className="text-xs text-zinc-400">{boss.pokemon.length} mon</span>
                  {isDefeated && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      Done
                    </span>
                  )}
                  <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>
        )}
      </Modal>
    </>
  );
}
