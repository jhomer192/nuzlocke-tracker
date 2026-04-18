import { useState, useMemo } from 'react';
import type { Run, GameLocation, Encounter } from '../types';
import { GAME_ROUTES } from '../data/routes';
import { getSpriteUrl } from '../utils/pokeapi';
import { EncounterModal } from './EncounterModal';

interface EncountersTabProps {
  run: Run;
  onUpdate: (updater: (run: Run) => Run) => void;
}

export function EncountersTab({ run, onUpdate }: EncountersTabProps) {
  const [modalRoute, setModalRoute] = useState<GameLocation | null>(null);
  const [editingEncounter, setEditingEncounter] = useState<Encounter | undefined>();

  const routes = GAME_ROUTES[run.game];
  const encounterByRoute = useMemo(() => {
    const map = new Map<string, Encounter>();
    for (const enc of run.encounters) {
      map.set(enc.route, enc);
    }
    return map;
  }, [run.encounters]);

  // Group routes by segment
  const segments = useMemo(() => {
    const groups: { segment: string; routes: GameLocation[] }[] = [];
    let current: { segment: string; routes: GameLocation[] } | null = null;
    for (const route of routes) {
      if (!current || current.segment !== route.segment) {
        current = { segment: route.segment, routes: [] };
        groups.push(current);
      }
      current.routes.push(route);
    }
    return groups;
  }, [routes]);

  const handleOpenModal = (route: GameLocation) => {
    const existing = encounterByRoute.get(route.key);
    setEditingEncounter(existing);
    setModalRoute(route);
  };

  const handleSaveEncounter = (encounter: Encounter) => {
    onUpdate((r) => {
      const existingIdx = r.encounters.findIndex((e) => e.id === encounter.id);
      let encounters: Encounter[];
      let box = [...r.box];
      const team = [...r.team];

      if (existingIdx >= 0) {
        encounters = r.encounters.map((e) => (e.id === encounter.id ? encounter : e));
      } else {
        encounters = [...r.encounters, encounter];
        if (encounter.status === 'alive') {
          box = [...box, encounter.id];
        }
      }

      return { ...r, encounters, box, team };
    });
  };

  return (
    <div className="tab-content pb-20">
      {segments.map(({ segment, routes: segRoutes }) => (
        <div key={segment} className="mb-6">
          <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm px-4 py-2 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              {segment}
            </h3>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {segRoutes.map((route) => {
              const enc = encounterByRoute.get(route.key);
              return (
                <button
                  key={route.key}
                  onClick={() => handleOpenModal(route)}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-800/50 transition-colors text-left"
                >
                  {/* Status indicator */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      enc
                        ? enc.status === 'alive'
                          ? 'bg-emerald-500'
                          : enc.status === 'dead'
                            ? 'bg-red-500'
                            : 'bg-amber-500'
                        : 'bg-zinc-600'
                    }`}
                  />

                  {/* Pokemon sprite or empty slot */}
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    {enc ? (
                      <img
                        src={getSpriteUrl(enc.pokemonId)}
                        alt={enc.nickname}
                        className={`w-10 h-10 pixelated ${
                          enc.status === 'dead' ? 'grayscale opacity-50' : ''
                        } ${enc.status === 'missed' ? 'opacity-40' : ''}`}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-zinc-600" />
                    )}
                  </div>

                  {/* Route name and encounter info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300">{route.name}</p>
                    {enc && (
                      <p
                        className={`text-xs font-bold truncate ${
                          enc.status === 'alive'
                            ? 'text-emerald-400'
                            : enc.status === 'dead'
                              ? 'text-red-400'
                              : 'text-amber-400'
                        }`}
                      >
                        {enc.nickname} · Lv.{enc.level}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-zinc-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {modalRoute && (
        <EncounterModal
          open={!!modalRoute}
          onClose={() => {
            setModalRoute(null);
            setEditingEncounter(undefined);
          }}
          routeName={modalRoute.name}
          routeKey={modalRoute.key}
          game={run.game}
          existingEncounter={editingEncounter}
          onSave={handleSaveEncounter}
        />
      )}
    </div>
  );
}
