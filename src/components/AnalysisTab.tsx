import { useState, useEffect, useMemo } from 'react';
import type { Run, Encounter, PokemonData, PokemonType } from '../types';
import { ALL_TYPES } from '../types';
import { fetchPokemonData, getSpriteUrl } from '../utils/pokeapi';
import { getDefensiveMultiplier } from '../data/typeChart';

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

export function AnalysisTab({ run }: AnalysisTabProps) {
  const [mode, setMode] = useState<MatrixMode>('defensive');
  const [pokemonDataMap, setPokemonDataMap] = useState<Map<number, PokemonData>>(new Map());

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

  // Calculate the matrix
  const { matrix, netScores, gaps } = useMemo(() => {
    const mat: number[][] = [];
    const net: number[] = [];
    const gapSet = new Set<number>();

    for (let typeIdx = 0; typeIdx < ALL_TYPES.length; typeIdx++) {
      const attackingType = ALL_TYPES[typeIdx];
      const row: number[] = [];
      let netScore = 0;
      let hasResist = false;

      for (const enc of teamEncounters) {
        const data = pokemonDataMap.get(enc.pokemonId);
        if (!data) {
          row.push(1);
          continue;
        }

        if (mode === 'defensive') {
          const mult = getDefensiveMultiplier(attackingType, data.types);
          row.push(mult);
          if (mult > 1) netScore++;
          if (mult < 1) {
            netScore--;
            hasResist = true;
          }
          if (mult === 0) hasResist = true;
        } else {
          // Offensive: how well does this team member's STAB types hit this defending type
          let bestMult = 1;
          for (const stabType of data.types) {
            const mult = getDefensiveMultiplier(
              stabType as PokemonType,
              [attackingType]
            );
            // This is actually: stabType attacking against attackingType defending
            // We want: does our mon's STAB hit this type super-effectively?
            if (mult > bestMult) bestMult = mult;
            if (mult < bestMult && bestMult === 1) bestMult = mult;
          }
          row.push(bestMult);
          if (bestMult > 1) hasResist = true;
        }
      }

      mat.push(row);
      net.push(netScore);

      if (mode === 'defensive' && !hasResist && teamEncounters.length > 0) {
        gapSet.add(typeIdx);
      }
    }

    return { matrix: mat, netScores: net, gaps: gapSet };
  }, [teamEncounters, pokemonDataMap, mode]);

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
          <p className="text-sm text-red-400 font-medium mb-1">Coverage Gaps</p>
          <p className="text-xs text-red-400/70">
            No team member resists:{' '}
            {Array.from(gaps)
              .map((i) => ALL_TYPES[i])
              .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
              .join(', ')}
          </p>
        </div>
      )}

      {/* Matrix */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="min-w-[420px]">
          {/* Header row: team sprites */}
          <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `80px repeat(${teamEncounters.length}, 1fr) 48px` }}>
            <div /> {/* Empty corner */}
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
          {ALL_TYPES.map((type, typeIdx) => (
            <div
              key={type}
              className="grid gap-1 mb-1"
              style={{ gridTemplateColumns: `80px repeat(${teamEncounters.length}, 1fr) 48px` }}
            >
              {/* Type label */}
              <div className={`type-${type} rounded-sm flex items-center px-2 h-8`}>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {type.slice(0, 4)}
                </span>
              </div>

              {/* Effectiveness cells */}
              {matrix[typeIdx]?.map((mult, colIdx) => (
                <MultiplierCell key={colIdx} value={mult} />
              ))}

              {/* Net score */}
              <TeamWeaknessCell
                value={netScores[typeIdx]}
                isGap={gaps.has(typeIdx)}
              />
            </div>
          ))}
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
  );
}
