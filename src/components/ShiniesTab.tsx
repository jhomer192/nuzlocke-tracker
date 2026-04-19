import type { Run, Encounter } from '../types';
import { GAME_NAMES } from '../types';
import { getSpriteUrl } from '../utils/pokeapi';

interface ShinyEntry {
  encounter: Encounter;
  runName: string;
  game: string;
}

interface ShiniesTabProps {
  runs: Run[];
}

export function ShiniesTab({ runs }: ShiniesTabProps) {
  const shinies: ShinyEntry[] = [];

  for (const run of runs) {
    const gameName = GAME_NAMES[run.game] ?? run.game;
    for (const enc of run.encounters) {
      if (enc.isShiny && enc.status !== 'missed') {
        shinies.push({
          encounter: enc,
          runName: run.name,
          game: gameName,
        });
      }
    }
  }

  const routeLabel = (key: string) =>
    key
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  if (shinies.length === 0) {
    return (
      <div className="tab-content p-4 pb-20">
        <div className="text-center py-16">
          <span className="text-5xl block mb-3">&#10024;</span>
          <p className="text-zinc-500 font-medium">No shinies found yet</p>
          <p className="text-zinc-600 text-sm mt-1">Keep hunting!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content p-4 pb-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">&#10024;</span>
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
          Shiny Collection
        </h3>
        <span className="ml-auto text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
          {shinies.length} found
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shinies.map((entry) => (
          <div
            key={`${entry.encounter.id}`}
            className="bg-zinc-800/60 rounded-xl p-3 border border-yellow-500/20"
          >
            <div className="flex items-center gap-3">
              <img
                src={getSpriteUrl(entry.encounter.pokemonId, true)}
                alt={entry.encounter.nickname}
                className="w-14 h-14 pixelated"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-yellow-300 truncate text-sm">
                  {entry.encounter.nickname}
                </p>
                <p className="text-[10px] text-zinc-500 truncate">
                  {entry.game}
                </p>
                <p className="text-[10px] text-zinc-600 truncate">
                  {routeLabel(entry.encounter.route)}
                </p>
                <p className="text-[10px] text-zinc-600">
                  {entry.runName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
