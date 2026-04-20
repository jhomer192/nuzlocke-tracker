import { useState, useMemo, useCallback } from 'react';
import type { Run, GameLocation, Encounter } from '../types';
import { LEVEL_CAPS, GAME_GENERATIONS } from '../types';
import { GAME_ROUTES } from '../data/routes';
import { getSpriteUrl } from '../utils/pokeapi';
import { EncounterModal } from './EncounterModal';
import { InlineBossRow } from './BossPrep';
import { getBossesForSegment, getBadgeIndexForBoss } from '../data/bosses';
import { getCustomGame, loadCustomGames, saveCustomGames } from '../utils/storage';
import { generateId } from '../utils/id';

interface EncountersTabProps {
  run: Run;
  onUpdate: (updater: (run: Run) => Run) => void;
}

export function EncountersTab({ run, onUpdate }: EncountersTabProps) {
  const [modalRoute, setModalRoute] = useState<GameLocation | null>(null);
  const [editingEncounter, setEditingEncounter] = useState<Encounter | undefined>();
  const [isShinyClauseAdd, setIsShinyClauseAdd] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [newRouteName, setNewRouteName] = useState('');
  const [newRouteSegment, setNewRouteSegment] = useState('');

  const isCustom = run.game === 'CUSTOM';
  const customDef = isCustom && run.customGameId ? getCustomGame(run.customGameId) : null;
  const routes = isCustom ? (customDef?.routes ?? []) : GAME_ROUTES[run.game];

  // Map of route key -> first (primary) encounter
  const encounterByRoute = useMemo(() => {
    const map = new Map<string, Encounter>();
    for (const enc of run.encounters) {
      if (!map.has(enc.route)) {
        map.set(enc.route, enc);
      }
    }
    return map;
  }, [run.encounters]);

  // Set of pokemon IDs currently owned (alive in team/box)
  const ownedPokemonIds = useMemo(() => {
    const aliveIds = new Set([...run.team, ...run.box]);
    const ids = new Set<number>();
    for (const enc of run.encounters) {
      if (aliveIds.has(enc.id) && enc.status === 'alive') {
        ids.add(enc.pokemonId);
      }
    }
    return ids;
  }, [run.encounters, run.team, run.box]);

  // Map of route key -> all encounters (for shiny clause)
  const allEncountersByRoute = useMemo(() => {
    const map = new Map<string, Encounter[]>();
    for (const enc of run.encounters) {
      const list = map.get(enc.route) ?? [];
      list.push(enc);
      map.set(enc.route, list);
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
    setIsShinyClauseAdd(false);
    setModalRoute(route);
  };

  const handleShinyClauseAdd = (route: GameLocation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEncounter(undefined);
    setIsShinyClauseAdd(true);
    setModalRoute(route);
  };

  const handleAddCustomRoute = useCallback(() => {
    if (!newRouteName.trim() || !run.customGameId) return;
    const customDef = getCustomGame(run.customGameId);
    if (!customDef) return;

    const newRoute: GameLocation = {
      key: `custom-${generateId()}-${newRouteName.trim().toLowerCase().replace(/\s+/g, '-')}`,
      name: newRouteName.trim(),
      segment: newRouteSegment.trim() || 'Main',
    };

    // Update the custom game definition in localStorage
    const games = loadCustomGames();
    const idx = games.findIndex((g) => g.id === run.customGameId);
    if (idx >= 0) {
      games[idx].routes = [...games[idx].routes, newRoute];
      saveCustomGames(games);
    }

    setNewRouteName('');
    setNewRouteSegment('');
    setShowAddRoute(false);
    // Force re-render by triggering a no-op update
    onUpdate((r) => ({ ...r }));
  }, [newRouteName, newRouteSegment, run.customGameId, onUpdate]);

  const handleSaveEncounter = (encounter: Encounter) => {
    onUpdate((r) => {
      const existingIdx = r.encounters.findIndex((e) => e.id === encounter.id);
      let encounters: Encounter[];
      let box = [...r.box];
      let team = [...r.team];

      if (existingIdx >= 0) {
        encounters = r.encounters.map((e) => (e.id === encounter.id ? encounter : e));
        // If status changed away from 'alive', remove from team/box so the
        // pokemon doesn't linger in the party UI after being marked missed.
        if (encounter.status !== 'alive') {
          team = team.filter((id) => id !== encounter.id);
          box = box.filter((id) => id !== encounter.id);
        } else {
          // Status went back to alive but encounter isn't currently tracked:
          // put it in the box so it's visible again.
          const tracked = team.includes(encounter.id) || box.includes(encounter.id);
          if (!tracked) box = [...box, encounter.id];
        }
      } else {
        encounters = [...r.encounters, encounter];
        if (encounter.status === 'alive') {
          // Add to team if there's room, otherwise box
          const hasRoom = team.length < 6;
          // Soul link: only auto-add to team if partner is also on their team
          const soulLinkOk = !r.rules.soulLink || !encounter.linkedPokemonId || encounter.linkedOnPartnerTeam;
          if (hasRoom && soulLinkOk) {
            team = [...team, encounter.id];
          } else {
            box = [...box, encounter.id];
          }
        }
      }

      return { ...r, encounters, box, team };
    });
  };

  return (
    <div className="tab-content pb-20">
      {segments.map(({ segment, routes: segRoutes }) => (
        <div key={segment} className="mb-6">
          <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              {segment}
            </h3>
            {run.rules.levelCap && (() => {
              let cap: number | undefined;
              if (isCustom && customDef?.bosses) {
                const boss = customDef.bosses.find((b) => b.segment === segment);
                cap = boss?.levelCap;
              } else {
                cap = LEVEL_CAPS[run.game]?.[segment];
              }
              return cap ? (
                <span className="text-xs font-bold text-amber-400/80">
                  Cap: Lv.{cap}
                </span>
              ) : null;
            })()}
          </div>
          <div className="divide-y divide-zinc-800/50">
            {segRoutes.map((route) => {
              // Boss row - render inline using InlineBossRow
              if (route.key.startsWith('boss-')) {
                const segBosses = getBossesForSegment(run.game, segment, run.customGameId);
                const boss = segBosses.find(b => b.name === route.name);
                if (boss) {
                  const defeated = run.defeatedBosses ?? [];
                  const gen = isCustom
                    ? (customDef?.generation ?? 6)
                    : GAME_GENERATIONS[run.game];
                  return (
                    <InlineBossRow
                      key={route.key}
                      boss={boss}
                      gen={gen}
                      isDefeated={defeated.includes(boss.name)}
                      onDefeat={onDefeat => {
                        onUpdate((r) => {
                          const defeatedBosses = [...(r.defeatedBosses ?? []), onDefeat];
                          const badgeIdx = getBadgeIndexForBoss(r.game, onDefeat, r.customGameId);
                          let badges = r.badges;
                          if (badgeIdx !== null && !r.badges[badgeIdx]) {
                            badges = [...r.badges];
                            badges[badgeIdx] = true;
                          }
                          return { ...r, defeatedBosses, badges };
                        });
                      }}
                    />
                  );
                }
                return null;
              }

              // Normal encounter row
              const enc = encounterByRoute.get(route.key);
              const routeEncs = allEncountersByRoute.get(route.key) ?? [];
              const shinyEnc = routeEncs.find((e) => e.isShiny && e.id !== enc?.id);
              const canAddShiny = run.rules.shinyClause && enc && !shinyEnc;

              return (
                <div key={route.key} className="flex items-center w-full">
                  <button
                    onClick={() => handleOpenModal(route)}
                    className="flex items-center gap-3 flex-1 px-4 py-3 hover:bg-zinc-800/50 transition-colors text-left min-w-0"
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
                          : route.key === 'gift-starter'
                            ? 'bg-purple-500'
                            : 'bg-zinc-600'
                      }`}
                    />

                    {/* Pokemon sprite or empty slot */}
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                      {enc ? (
                        <img
                          src={getSpriteUrl(enc.pokemonId, enc.isShiny)}
                          alt={enc.nickname}
                          className={`w-10 h-10 pixelated ${
                            enc.status === 'dead' ? 'grayscale opacity-50' : ''
                          } ${enc.status === 'missed' ? 'opacity-40' : ''}`}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 border-dashed border-zinc-600" />
                      )}
                    </div>

                    {/* Shiny clause extra encounter */}
                    {shinyEnc && (
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center -ml-2">
                        <img
                          src={getSpriteUrl(shinyEnc.pokemonId, true)}
                          alt={shinyEnc.nickname}
                          className={`w-8 h-8 pixelated ${
                            shinyEnc.status === 'dead' ? 'grayscale opacity-50' : ''
                          }`}
                        />
                      </div>
                    )}

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
                          {enc.isShiny && <span className="text-yellow-400">&#10024;</span>}{enc.nickname} · Lv.{enc.level}
                        </p>
                      )}
                      {shinyEnc && (
                        <p className="text-xs font-bold truncate text-yellow-400">
                          &#10024; {shinyEnc.nickname} · Lv.{shinyEnc.level}
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

                  {/* Shiny Clause button */}
                  {canAddShiny && (
                    <button
                      onClick={(e) => handleShinyClauseAdd(route, e)}
                      className="px-2 py-1 mr-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-colors flex-shrink-0"
                      title="Add shiny encounter (Shiny Clause)"
                    >
                      &#10024; Shiny?
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Add route button for custom games */}
      {isCustom && (
        <div className="px-4 py-3">
          {showAddRoute ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newRouteName}
                onChange={(e) => setNewRouteName(e.target.value)}
                placeholder="Route name"
                className="flex-1 rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomRoute()}
              />
              <input
                type="text"
                value={newRouteSegment}
                onChange={(e) => setNewRouteSegment(e.target.value)}
                placeholder="Segment"
                className="w-28 rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomRoute()}
              />
              <button
                onClick={handleAddCustomRoute}
                disabled={!newRouteName.trim()}
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium hover:bg-purple-500 disabled:opacity-40 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => { setShowAddRoute(false); setNewRouteName(''); setNewRouteSegment(''); }}
                className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddRoute(true)}
              className="w-full rounded-lg border-2 border-dashed border-zinc-600 py-2.5 text-sm text-zinc-400 hover:border-purple-500/50 hover:text-purple-300 transition-all"
            >
              + Add Route
            </button>
          )}
        </div>
      )}

      {modalRoute && (
        <EncounterModal
          open={!!modalRoute}
          onClose={() => {
            setModalRoute(null);
            setEditingEncounter(undefined);
            setIsShinyClauseAdd(false);
          }}
          routeName={modalRoute.name}
          routeKey={modalRoute.key}
          game={run.game}
          existingEncounter={editingEncounter}
          onSave={handleSaveEncounter}
          isShinyClauseAdd={isShinyClauseAdd}
          soulLink={run.rules.soulLink}
          ownedPokemonIds={ownedPokemonIds}
          version={run.version}
        />
      )}
    </div>
  );
}
