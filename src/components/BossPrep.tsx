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

function BossPokemonCard({ mon, gen }: { mon: BossPokemon; gen: number }) {
  const weaknesses = useMemo(() => getWeaknesses(mon.types, gen), [mon.types, gen]);

  return (
    <div className="bg-zinc-700/50 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <img
          src={getSpriteUrl(mon.id)}
          alt={mon.name}
          className="w-12 h-12 pixelated"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-white">{mon.name}</span>
            <span className="text-xs text-zinc-400">Lv.{mon.level}</span>
          </div>
          <div className="flex gap-1 mt-0.5">
            {mon.types.map((t) => (
              <TypeBadge key={t} type={t} small />
            ))}
          </div>
        </div>
      </div>

      {/* Moves */}
      <div className="mt-2 flex flex-wrap gap-1">
        {mon.moves.map((move) => (
          <span
            key={move}
            className="text-[11px] bg-zinc-600/60 text-zinc-300 rounded px-1.5 py-0.5"
          >
            {move}
          </span>
        ))}
      </div>

      {/* Ability / Item */}
      {(mon.ability || mon.item) && (
        <div className="mt-1.5 flex gap-3 text-[11px] text-zinc-400">
          {mon.ability && <span>Ability: <span className="text-zinc-300">{mon.ability}</span></span>}
          {mon.item && <span>Item: <span className="text-zinc-300">{mon.item}</span></span>}
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="mt-1.5 text-[11px] text-zinc-400">
          Weak to:{' '}
          {weaknesses.map((w, i) => (
            <span key={w}>
              {i > 0 && ', '}
              <span className="text-amber-400">{formatTypeName(w)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function BossCard({ boss, gen, isDefeated }: { boss: BossEntry; gen: number; isDefeated: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-base font-bold text-white">{boss.name}</h3>
        {isDefeated && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
            Defeated
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {boss.pokemon.map((mon, i) => (
          <BossPokemonCard key={`${mon.name}-${i}`} mon={mon} gen={gen} />
        ))}
      </div>
    </div>
  );
}

export function BossPrepButton({ game, segment, defeatedBosses, onDefeat, customGameId }: BossPrepProps) {
  const [open, setOpen] = useState(false);
  const [victoryBoss, setVictoryBoss] = useState<string | null>(null);
  const bosses = useMemo(() => getBossesForSegment(game, segment, customGameId), [game, segment, customGameId]);
  const gen = GAME_GENERATIONS[game];

  if (bosses.length === 0) return null;

  const defeated = defeatedBosses ?? [];
  const allDefeated = bosses.every((b) => defeated.includes(b.name));

  const title = bosses.length === 1
    ? `${bosses[0].name}'s Team`
    : `${segment} Bosses`;

  const handleDefeat = (bossName: string) => {
    setVictoryBoss(bossName);
    onDefeat?.(bossName);
    setTimeout(() => setVictoryBoss(null), 2000);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
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

      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        {/* Victory animation overlay */}
        {victoryBoss && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-3 text-center animate-fade-in">
            <p className="text-emerald-400 font-bold text-lg">Victory!</p>
            <p className="text-emerald-300/70 text-sm">{victoryBoss} has been defeated</p>
          </div>
        )}

        {bosses.map((boss, i) => {
          const isDefeated = defeated.includes(boss.name);
          return (
            <div key={`${boss.name}-${i}`}>
              <BossCard boss={boss} gen={gen} isDefeated={isDefeated} />
              {!isDefeated && onDefeat && (
                <button
                  onClick={() => handleDefeat(boss.name)}
                  className="w-full mb-4 rounded-xl bg-emerald-600 py-3.5 font-bold text-white text-base hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20"
                >
                  Mark as Defeated
                </button>
              )}
            </div>
          );
        })}
      </Modal>
    </>
  );
}
