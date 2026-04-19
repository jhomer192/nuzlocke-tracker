import { useState, useEffect, useMemo } from 'react';
import type { Run, Encounter, PokemonData, PokemonType, MoveData } from '../types';
import { ALL_TYPES, GAME_GENERATIONS } from '../types';
import { fetchPokemonData, getSpriteUrl, fetchMoveData } from '../utils/pokeapi';
import { getDefensiveMultiplier, getTypesForGen } from '../data/typeChart';
import { getCustomGame } from '../utils/storage';
import { TypeBadge } from './TypeBadge';

interface AnalysisTabProps {
  run: Run;
}

type MatrixMode = 'defensive' | 'offensive';

function MultiplierCell({ value }: { value: number }) {
  let bg = 'bg-zinc-800/40';
  let text = 'text-zinc-600';
  let label = '';

  if (value === 0) {
    bg = 'bg-zinc-900';
    text = 'text-zinc-700';
    label = '0';
  } else if (value === 0.25) {
    bg = 'bg-emerald-900/60';
    text = 'text-emerald-300';
    label = '\u00BC';
  } else if (value === 0.5) {
    bg = 'bg-emerald-800/40';
    text = 'text-emerald-400';
    label = '\u00BD';
  } else if (value === 1) {
    bg = 'bg-zinc-800/20';
    text = 'text-zinc-600';
    label = '';
  } else if (value === 2) {
    bg = 'bg-red-900/40';
    text = 'text-red-400';
    label = '2';
  } else if (value === 4) {
    bg = 'bg-red-800/60';
    text = 'text-red-300 font-bold';
    label = '4';
  }

  return (
    <div
      className={`w-full aspect-square flex items-center justify-center text-xs font-semibold ${bg} ${text} rounded-sm`}
    >
      {label}
    </div>
  );
}

function TeamWeaknessCell({ value, isGap }: { value: number; isGap: boolean }) {
  let bg = 'bg-zinc-800/40';
  let text = 'text-zinc-500';

  if (isGap) {
    bg = 'bg-red-900/60 ring-2 ring-red-500/50';
    text = 'text-red-300 font-bold';
  } else if (value < 0) {
    bg = 'bg-emerald-900/30';
    text = 'text-emerald-400';
  } else if (value > 0) {
    bg = 'bg-red-900/30';
    text = 'text-red-400';
  }

  return (
    <div
      className={`w-full aspect-square flex items-center justify-center text-xs font-semibold ${bg} ${text} rounded-sm`}
      title={isGap ? 'No team member resists this type!' : `Net score: ${value > 0 ? '+' : ''}${value}`}
    >
      {value !== 0 ? (value > 0 ? `+${value}` : value) : '\u2014'}
    </div>
  );
}

// Mobile-friendly per-pokemon summary card
function PokemonSummaryCard({
  enc,
  data,
  gen,
  relevantTypes,
  mode,
  moveDataMap,
}: {
  enc: Encounter;
  data: PokemonData;
  gen: number;
  relevantTypes: readonly string[];
  mode: MatrixMode;
  moveDataMap: Map<string, MoveData>;
}) {
  const matchups = useMemo(() => {
    if (mode === 'defensive') {
      return relevantTypes.map((type) => ({
        type,
        value: getDefensiveMultiplier(type as PokemonType, data.types, gen),
      }));
    } else {
      const moves = enc.moves?.filter((m) => m.trim()) ?? [];
      return relevantTypes.map((attackingType) => {
        let bestMult = 1;
        if (moves.length > 0) {
          for (const moveName of moves) {
            const key = moveName.trim().toLowerCase().replace(/\s+/g, '-');
            const moveData = moveDataMap.get(key);
            if (!moveData || moveData.damageClass === 'status') continue;
            const mult = getDefensiveMultiplier(moveData.type as PokemonType, [attackingType], gen);
            if (mult > bestMult) bestMult = mult;
          }
        } else {
          for (const stabType of data.types) {
            const mult = getDefensiveMultiplier(stabType as PokemonType, [attackingType], gen);
            if (mult > bestMult) bestMult = mult;
          }
        }
        return { type: attackingType, value: bestMult };
      });
    }
  }, [enc, data, gen, relevantTypes, mode, moveDataMap]);

  const weakTo = matchups.filter((m) => m.value > 1);
  const resistsOrImmune = matchups.filter((m) => m.value < 1);
  const superEffective = mode === 'offensive' ? matchups.filter((m) => m.value > 1) : [];

  return (
    <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-3">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={getSpriteUrl(enc.pokemonId, enc.isShiny)}
          alt={enc.nickname}
          className="w-12 h-12 pixelated"
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">{enc.nickname}</p>
          <div className="flex gap-1 mt-0.5">
            {data.types.map((t) => (
              <TypeBadge key={t} type={t} small />
            ))}
          </div>
        </div>
      </div>

      {mode === 'defensive' ? (
        <div className="space-y-2">
          {weakTo.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Weak to</p>
              <div className="flex flex-wrap gap-1">
                {weakTo.map((m) => (
                  <span key={m.type} className="flex items-center gap-1">
                    <TypeBadge type={m.type} small />
                    <span className="text-[10px] text-red-400 font-bold">{m.value}x</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {resistsOrImmune.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Resists</p>
              <div className="flex flex-wrap gap-1">
                {resistsOrImmune.map((m) => (
                  <span key={m.type} className="flex items-center gap-1">
                    <TypeBadge type={m.type} small />
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {m.value === 0 ? '0x' : m.value === 0.25 ? '\u00BCx' : '\u00BDx'}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {superEffective.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Super effective vs</p>
              <div className="flex flex-wrap gap-1">
                {superEffective.map((m) => (
                  <TypeBadge key={m.type} type={m.type} small />
                ))}
              </div>
            </div>
          )}
          {superEffective.length === 0 && (
            <p className="text-xs text-zinc-500">No super effective coverage (add moves for better analysis)</p>
          )}
        </div>
      )}
    </div>
  );
}

export function AnalysisTab({ run }: AnalysisTabProps) {
  const [mode, setMode] = useState<MatrixMode>('defensive');
  const [pokemonDataMap, setPokemonDataMap] = useState<Map<number, PokemonData>>(new Map());
  const [moveDataMap, setMoveDataMap] = useState<Map<string, MoveData>>(new Map());

  const gen = run.game === 'CUSTOM'
    ? (run.customGameId ? getCustomGame(run.customGameId)?.generation ?? 6 : 6)
    : GAME_GENERATIONS[run.game];

  const relevantTypes = getTypesForGen(gen);

  const teamEncounters = run.team
    .map((id) => run.encounters.find((e) => e.id === id))
    .filter((e): e is Encounter => !!e);

  // Fetch pokemon data for team members
  useEffect(() => {
    const fetchAll = async () => {
      const newMap = new Map<number, PokemonData>();
      for (const enc of teamEncounters) {
        const data = await fetchPokemonData(enc.pokemonId);
        if (data) newMap.set(enc.pokemonId, data);
      }
      setPokemonDataMap(newMap);
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run.team.join(',')]);

  // Fetch move data for team members' moves
  useEffect(() => {
    const fetchAll = async () => {
      const newMap = new Map(moveDataMap);
      let changed = false;
      for (const enc of teamEncounters) {
        const moves = enc.moves ?? [];
        for (const moveName of moves) {
          if (!moveName.trim()) continue;
          const key = moveName.trim().toLowerCase().replace(/\s+/g, '-');
          if (newMap.has(key)) continue;
          const data = await fetchMoveData(moveName);
          if (data) {
            newMap.set(key, data);
            changed = true;
          }
        }
      }
      if (changed) setMoveDataMap(newMap);
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run.encounters]);

  // Calculate the matrix
  const { matrix, netScores, gaps, offensiveGaps } = useMemo(() => {
    const mat: number[][] = [];
    const net: number[] = [];
    const gapSet = new Set<number>();
    const offGapSet = new Set<number>();

    for (let typeIdx = 0; typeIdx < ALL_TYPES.length; typeIdx++) {
      const attackingType = ALL_TYPES[typeIdx];
      if (!relevantTypes.includes(attackingType)) {
        mat.push(teamEncounters.map(() => 1));
        net.push(0);
        continue;
      }

      const row: number[] = [];
      let netScore = 0;
      let hasResist = false;
      let hasSEOffense = false;

      for (const enc of teamEncounters) {
        const data = pokemonDataMap.get(enc.pokemonId);
        if (!data) {
          row.push(1);
          continue;
        }

        if (mode === 'defensive') {
          const mult = getDefensiveMultiplier(attackingType, data.types, gen);
          row.push(mult);
          if (mult > 1) netScore++;
          if (mult < 1) {
            netScore--;
            hasResist = true;
          }
          if (mult === 0) hasResist = true;
        } else {
          const moves = enc.moves?.filter((m) => m.trim()) ?? [];
          let bestMult = 1;

          if (moves.length > 0) {
            for (const moveName of moves) {
              const key = moveName.trim().toLowerCase().replace(/\s+/g, '-');
              const moveData = moveDataMap.get(key);
              if (!moveData || moveData.damageClass === 'status') continue;
              const mult = getDefensiveMultiplier(
                moveData.type as PokemonType,
                [attackingType],
                gen
              );
              if (mult > bestMult) bestMult = mult;
            }
          } else {
            for (const stabType of data.types) {
              const mult = getDefensiveMultiplier(
                stabType as PokemonType,
                [attackingType],
                gen
              );
              if (mult > bestMult) bestMult = mult;
            }
          }

          row.push(bestMult);
          if (bestMult > 1) hasSEOffense = true;
        }
      }

      mat.push(row);
      net.push(netScore);

      if (mode === 'defensive' && !hasResist && teamEncounters.length > 0) {
        gapSet.add(typeIdx);
      }
      if (mode === 'offensive' && !hasSEOffense && teamEncounters.length > 0) {
        offGapSet.add(typeIdx);
      }
    }

    return { matrix: mat, netScores: net, gaps: gapSet, offensiveGaps: offGapSet };
  }, [teamEncounters, pokemonDataMap, moveDataMap, mode, gen, relevantTypes]);

  if (teamEncounters.length === 0) {
    return (
      <div className="tab-content flex items-center justify-center h-64 text-zinc-500">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="font-medium">No team members</p>
          <p className="text-sm text-zinc-600 mt-1">Add Pokemon to your party to see type analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content p-4 pb-20">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-zinc-800 rounded-lg p-1 mb-4">
        <button
          onClick={() => setMode('defensive')}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
            mode === 'defensive'
              ? 'bg-zinc-700 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Defensive
        </button>
        <button
          onClick={() => setMode('offensive')}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
            mode === 'offensive'
              ? 'bg-zinc-700 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Offensive
        </button>
      </div>

      {/* Gap warnings */}
      {gaps.size > 0 && mode === 'defensive' && (
        <div className="mb-4 rounded-lg bg-red-900/20 border border-red-800/30 p-3">
          <p className="text-sm text-red-400 font-medium mb-1">Defensive Gaps</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {Array.from(gaps)
              .filter((i) => relevantTypes.includes(ALL_TYPES[i]))
              .map((i) => (
                <TypeBadge key={ALL_TYPES[i]} type={ALL_TYPES[i]} small />
              ))}
          </div>
        </div>
      )}
      {offensiveGaps.size > 0 && mode === 'offensive' && (
        <div className="mb-4 rounded-lg bg-amber-900/20 border border-amber-800/30 p-3">
          <p className="text-sm text-amber-400 font-medium mb-1">Offensive Gaps</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {Array.from(offensiveGaps)
              .filter((i) => relevantTypes.includes(ALL_TYPES[i]))
              .map((i) => (
                <TypeBadge key={ALL_TYPES[i]} type={ALL_TYPES[i]} small />
              ))}
          </div>
        </div>
      )}

      {/* Mobile: per-Pokemon cards */}
      <div className="sm:hidden space-y-3 mb-6">
        {teamEncounters.map((enc) => {
          const data = pokemonDataMap.get(enc.pokemonId);
          if (!data) return null;
          return (
            <PokemonSummaryCard
              key={enc.id}
              enc={enc}
              data={data}
              gen={gen}
              relevantTypes={relevantTypes}
              mode={mode}
              moveDataMap={moveDataMap}
            />
          );
        })}
      </div>

      {/* Desktop: full matrix */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="min-w-[420px]">
            {/* Header row: team sprites */}
            <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `80px repeat(${teamEncounters.length}, 1fr) 48px` }}>
              <div />
              {teamEncounters.map((enc) => (
                <div key={enc.id} className="flex flex-col items-center">
                  <img
                    src={getSpriteUrl(enc.pokemonId, enc.isShiny)}
                    alt={enc.nickname}
                    className="w-8 h-8 pixelated"
                  />
                  <span className="text-[10px] text-zinc-400 truncate max-w-full text-center">
                    {enc.nickname}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-center">
                <span className="text-[10px] text-zinc-500 font-medium">NET</span>
              </div>
            </div>

            {/* Type rows */}
            {ALL_TYPES.filter((t) => relevantTypes.includes(t)).map((type) => {
              const typeIdx = ALL_TYPES.indexOf(type as PokemonType);
              return (
                <div
                  key={type}
                  className="grid gap-1 mb-1"
                  style={{ gridTemplateColumns: `80px repeat(${teamEncounters.length}, 1fr) 48px` }}
                >
                  <div className={`type-${type} rounded-sm flex items-center px-2 h-8`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {type.slice(0, 4)}
                    </span>
                  </div>
                  {matrix[typeIdx]?.map((mult, colIdx) => (
                    <MultiplierCell key={colIdx} value={mult} />
                  ))}
                  <TeamWeaknessCell
                    value={netScores[typeIdx]}
                    isGap={mode === 'defensive' ? gaps.has(typeIdx) : offensiveGaps.has(typeIdx)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-emerald-800/40" />
            <span>Resist (&frac12;)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-emerald-900/60" />
            <span>Double Resist (&frac14;)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-red-900/40" />
            <span>Weak (2&times;)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-red-800/60" />
            <span>Double Weak (4&times;)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-zinc-900" />
            <span>Immune (0)</span>
          </div>
        </div>
      </div>

      {/* Mobile: team summary */}
      <div className="sm:hidden mt-4 rounded-xl bg-zinc-800/50 border border-zinc-700 p-3">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
          {mode === 'defensive' ? 'Team Coverage Summary' : 'Offensive Coverage'}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {relevantTypes.map((type) => {
            const typeIdx = ALL_TYPES.indexOf(type as PokemonType);
            const isGap = mode === 'defensive' ? gaps.has(typeIdx) : offensiveGaps.has(typeIdx);
            const net = netScores[typeIdx];
            return (
              <div
                key={type}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${
                  isGap
                    ? 'bg-red-900/40 ring-1 ring-red-500/50'
                    : net < 0
                      ? 'bg-emerald-900/20'
                      : net > 0
                        ? 'bg-red-900/20'
                        : 'bg-zinc-800/60'
                }`}
              >
                <TypeBadge type={type} small />
                <span className={`text-[10px] font-bold ${
                  isGap ? 'text-red-400' : net < 0 ? 'text-emerald-400' : net > 0 ? 'text-red-400' : 'text-zinc-500'
                }`}>
                  {isGap ? 'GAP' : net !== 0 ? (net > 0 ? `+${net}` : net) : 'OK'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
