import type { Run, Encounter } from '../types';
import { getSpriteUrl } from '../utils/pokeapi';

interface GraveyardTabProps {
  run: Run;
}

export function GraveyardTab({ run }: GraveyardTabProps) {
  const deadEncounters = run.graveyard
    .map((id) => run.encounters.find((e) => e.id === id))
    .filter((e): e is Encounter => !!e);

  const totalCaught = run.encounters.filter((e) => e.status !== 'missed').length;
  const totalDeaths = deadEncounters.length;
  const survivalRate = totalCaught > 0 ? ((totalCaught - totalDeaths) / totalCaught * 100).toFixed(0) : '0';
  const routesVisited = run.encounters.length;

  const routeNameMap = new Map<string, string>();
  // Build route name from key
  for (const enc of run.encounters) {
    if (!routeNameMap.has(enc.route)) {
      routeNameMap.set(
        enc.route,
        enc.route
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      );
    }
  }

  return (
    <div className="tab-content p-4 pb-20">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-emerald-400">{totalCaught}</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Caught</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-red-400">{totalDeaths}</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Deaths</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-zinc-200">{survivalRate}%</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Survival</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-zinc-200">{routesVisited}</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Routes</p>
        </div>
      </div>

      {/* Graveyard */}
      {deadEncounters.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto mb-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-zinc-500 font-medium">No fallen Pokemon</p>
          <p className="text-zinc-600 text-sm mt-1">Let&apos;s keep it that way</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Fallen</h3>
          {deadEncounters.map((enc) => (
            <div
              key={enc.id}
              className="bg-zinc-800/60 rounded-xl p-4 border border-zinc-700/50"
            >
              <div className="flex items-start gap-4">
                {/* Desaturated sprite */}
                <div className="relative flex-shrink-0">
                  <img
                    src={getSpriteUrl(enc.pokemonId, enc.isShiny)}
                    alt={enc.nickname}
                    className="w-16 h-16 pixelated grayscale opacity-60"
                  />
                  {/* Tombstone overlay */}
                  <div className="absolute -bottom-1 -right-1 text-lg">
                    {'\u271D'}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-300">{enc.nickname}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Caught on {routeNameMap.get(enc.route) ?? enc.route} · Lv.{enc.level}
                  </p>
                  {enc.causeOfDeath && (
                    <p className="text-sm text-red-400/80 mt-2 italic">
                      &ldquo;{enc.causeOfDeath}&rdquo;
                    </p>
                  )}
                  <div className="flex gap-4 mt-2 text-[10px] text-zinc-600">
                    {enc.caughtAt && (
                      <span>Caught: {new Date(enc.caughtAt).toLocaleDateString()}</span>
                    )}
                    {enc.diedAt && (
                      <span>Died: {new Date(enc.diedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
