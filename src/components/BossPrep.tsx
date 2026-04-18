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

function BossCard({ boss, gen }: { boss: BossEntry; gen: number }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-bold text-white mb-2">{boss.name}</h3>
      <div className="flex flex-col gap-2">
        {boss.pokemon.map((mon, i) => (
          <BossPokemonCard key={`${mon.name}-${i}`} mon={mon} gen={gen} />
        ))}
      </div>
    </div>
  );
}

export function BossPrepButton({ game, segment }: BossPrepProps) {
  const [open, setOpen] = useState(false);
  const bosses = useMemo(() => getBossesForSegment(game, segment), [game, segment]);
  const gen = GAME_GENERATIONS[game];

  if (bosses.length === 0) return null;

  const title = bosses.length === 1
    ? `${bosses[0].name}'s Team`
    : `${segment} Bosses`;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors px-2 py-0.5 rounded bg-purple-500/10 hover:bg-purple-500/20"
        title="View boss team"
      >
        Boss
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        {bosses.map((boss, i) => (
          <BossCard key={`${boss.name}-${i}`} boss={boss} gen={gen} />
        ))}
      </Modal>
    </>
  );
}
