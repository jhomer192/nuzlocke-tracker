import { useState, useMemo, useEffect } from 'react';
import type { BossEntry, BossPokemon } from '../data/bosses';
import { getBossesForSegment } from '../data/bosses';
import { getSpriteUrl, fetchPokemonData } from '../utils/pokeapi';
import { TypeBadge } from './TypeBadge';
import { Modal } from './Modal';
import { ALL_TYPES, GAME_GENERATIONS } from '../types';
import type { Game, PokemonType, PokemonData } from '../types';
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

// Max base stat across all Pokemon is 255 (Blissey HP / Shuckle Def/SpD), but
// most mons top out around 180. Normalize to 200 for visual bars so the
// high-stat mons visibly pop without the bar ever clipping.
const STAT_BAR_MAX = 200;

function statBarColor(value: number): string {
  if (value >= 130) return 'bg-emerald-500';
  if (value >= 100) return 'bg-lime-500';
  if (value >= 70) return 'bg-yellow-500';
  if (value >= 50) return 'bg-orange-500';
  return 'bg-red-500';
}

function StatBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, (value / STAT_BAR_MAX) * 100);
  return (
    <div className="flex items-center gap-1.5 text-[10px]">
      <span className="w-6 text-zinc-400 uppercase tracking-wide">{label}</span>
      <span className="w-7 text-right font-mono text-zinc-300">{value}</span>
      <div className="flex-1 h-1.5 bg-zinc-800 rounded overflow-hidden">
        <div
          className={`h-full ${statBarColor(value)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function BossPokemonRow({ mon, gen }: { mon: BossPokemon; gen: number }) {
  const weaknesses = useMemo(() => getWeaknesses(mon.types, gen), [mon.types, gen]);
  const [data, setData] = useState<PokemonData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPokemonData(mon.id).then((d) => {
      if (!cancelled) setData(d);
    });
    return () => { cancelled = true; };
  }, [mon.id]);

  // Prefer explicit ability from the boss entry; otherwise show the first
  // PokeAPI-listed ability (which is always accurate for gen-specific pokemon,
  // and the Nuzlocke scene generally assumes the most common ability when
  // no specific one is set in the game).
  const ability = mon.ability ?? (data?.abilities?.[0] ?? null);
  const stats = data?.stats ?? null;

  return (
    <div className="flex flex-col gap-2 w-full px-3 py-2.5 border-b border-zinc-700/50 last:border-b-0">
      <div className="flex items-center gap-3">
        <img
          src={getSpriteUrl(mon.id)}
          alt={mon.name}
          className="w-10 h-10 pixelated flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="capitalize font-medium">{mon.name}</span>
            <span className="text-xs text-zinc-400">Lv.{mon.level}</span>
            {mon.item && (
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                @ {mon.item}
              </span>
            )}
          </div>
          {ability && (
            <div className="text-[10px] text-purple-300/90 mt-0.5 capitalize">
              Ability: {ability.replace(/-/g, ' ')}
            </div>
          )}
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {mon.types.map((t) => (
            <TypeBadge key={t} type={t} small />
          ))}
        </div>
      </div>

      {/* Moves */}
      {mon.moves.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {mon.moves.map((move) => (
            <span key={move} className="text-[10px] bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded">
              {move}
            </span>
          ))}
        </div>
      )}

      {/* Base stats -- fills in once PokeAPI resolves */}
      {stats && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          <StatBar label="HP" value={stats.hp} />
          <StatBar label="Spe" value={stats.spe} />
          <StatBar label="Atk" value={stats.atk} />
          <StatBar label="SpA" value={stats.spa} />
          <StatBar label="Def" value={stats.def} />
          <StatBar label="SpD" value={stats.spd} />
        </div>
      )}

      {weaknesses.length > 0 && (
        <div className="text-[10px] text-amber-400/80">
          Weak to: {weaknesses.map(formatTypeName).join(', ')}
        </div>
      )}
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

// Inline boss row for the encounters list (matches route row style)
export function InlineBossRow({ boss, gen, isDefeated, onDefeat }: {
  boss: BossEntry;
  gen: number;
  isDefeated: boolean;
  onDefeat: (bossName: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [victoryBoss, setVictoryBoss] = useState<string | null>(null);
  const ace = boss.pokemon[boss.pokemon.length - 1];

  const handleDefeat = () => {
    setVictoryBoss(boss.name);
    onDefeat(boss.name);
    setTimeout(() => {
      setVictoryBoss(null);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-800/50 transition-colors text-left ${isDefeated ? 'opacity-50' : ''}`}
      >
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isDefeated ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          <img src={getSpriteUrl(ace.id)} alt={boss.name} className={`w-10 h-10 pixelated ${isDefeated ? 'grayscale' : ''}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-zinc-300">{boss.name}</p>
          {isDefeated ? (
            <p className="text-xs font-bold text-emerald-400">Defeated</p>
          ) : (
            <p className="text-xs text-amber-400">{boss.pokemon.length} Pokemon</p>
          )}
        </div>
        <svg className="w-4 h-4 text-zinc-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={boss.name}>
        {victoryBoss && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-3 text-center animate-fade-in">
            <p className="text-emerald-400 font-bold text-lg">Victory!</p>
            <p className="text-emerald-300/70 text-sm">{victoryBoss} has been defeated</p>
          </div>
        )}
        {!victoryBoss && (
          <BossFocusedView
            boss={boss}
            gen={gen}
            isDefeated={isDefeated}
            onDefeat={!isDefeated ? handleDefeat : undefined}
          />
        )}
      </Modal>
    </>
  );
}
