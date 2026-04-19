import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Game, RuleSet, Run, CustomGameDef, GameLocation } from '../types';
import { GAME_NAMES, GAME_GENERATIONS } from '../types';
import { Modal } from '../components/Modal';
import { getSpriteUrl } from '../utils/pokeapi';
import { loadCustomGames, saveCustomGames } from '../utils/storage';
import { generateId } from '../utils/id';

interface RunListProps {
  runs: Run[];
  onCreateRun: (name: string, game: Game, rules: RuleSet, customGameId?: string) => Run;
  onDeleteRun: (id: string) => void;
}

const GENERATION_LABELS: Record<number, string> = {
  1: 'Gen I',
  2: 'Gen II',
  3: 'Gen III',
  4: 'Gen IV',
  5: 'Gen V',
  6: 'Gen VI',
  7: 'Gen VII',
  8: 'Gen VIII',
  9: 'Gen IX',
};

function getGamesByGeneration(): { gen: number; label: string; games: Game[] }[] {
  const genMap = new Map<number, Game[]>();
  for (const [game, gen] of Object.entries(GAME_GENERATIONS)) {
    if (!genMap.has(gen)) genMap.set(gen, []);
    genMap.get(gen)!.push(game as Game);
  }
  return Array.from(genMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([gen, games]) => ({
      gen,
      label: GENERATION_LABELS[gen] || `Gen ${gen}`,
      games,
    }));
}

export function RunList({ runs, onCreateRun, onDeleteRun }: RunListProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [game, setGame] = useState<Game>('RED_BLUE');
  const [rules, setRules] = useState<RuleSet>({
    duplicateClause: true,
    shinyClause: false,
    levelCap: false,
    soulLink: false,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedGens, setExpandedGens] = useState<Set<number>>(() => new Set([GAME_GENERATIONS[game]]));

  // Custom game state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customGames, setCustomGames] = useState<CustomGameDef[]>([]);
  const [customName, setCustomName] = useState('');
  const [customGen, setCustomGen] = useState(6);
  const [customBadgeCount, setCustomBadgeCount] = useState(8);
  const [customBadgeNames, setCustomBadgeNames] = useState<string[]>([]);
  const [customRoutes, setCustomRoutes] = useState<{ name: string; segment: string }[]>([]);
  const [newRouteName, setNewRouteName] = useState('');
  const [newRouteSegment, setNewRouteSegment] = useState('');
  const [selectedCustomGameId, setSelectedCustomGameId] = useState<string | null>(null);

  useEffect(() => {
    setCustomGames(loadCustomGames());
  }, []);

  const toggleGen = (gen: number) => {
    setExpandedGens((prev) => {
      const next = new Set(prev);
      if (next.has(gen)) next.delete(gen);
      else next.add(gen);
      return next;
    });
  };

  const handleSaveCustomGame = () => {
    if (!customName.trim()) return;
    const badgeNames: string[] = [];
    for (let i = 0; i < customBadgeCount; i++) {
      badgeNames.push(customBadgeNames[i] || `Badge ${i + 1}`);
    }
    const routes: GameLocation[] = customRoutes.map((r, i) => ({
      key: `custom-${i}-${r.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: r.name,
      segment: r.segment || 'Main',
    }));
    const def: CustomGameDef = {
      id: generateId(),
      name: customName.trim(),
      generation: customGen,
      badgeCount: customBadgeCount,
      badgeNames,
      routes,
    };
    const updated = [...customGames, def];
    setCustomGames(updated);
    saveCustomGames(updated);
    setSelectedCustomGameId(def.id);
    setGame('CUSTOM');
    setShowCustomForm(false);
    resetCustomForm();
  };

  const resetCustomForm = () => {
    setCustomName('');
    setCustomGen(6);
    setCustomBadgeCount(8);
    setCustomBadgeNames([]);
    setCustomRoutes([]);
    setNewRouteName('');
    setNewRouteSegment('');
  };

  const handleDeleteCustomGame = (id: string) => {
    const updated = customGames.filter((g) => g.id !== id);
    setCustomGames(updated);
    saveCustomGames(updated);
    if (selectedCustomGameId === id) {
      setSelectedCustomGameId(null);
      setGame('RED_BLUE');
    }
  };

  const handleAddRoute = () => {
    if (!newRouteName.trim()) return;
    setCustomRoutes([...customRoutes, {
      name: newRouteName.trim(),
      segment: newRouteSegment.trim() || 'Main',
    }]);
    setNewRouteName('');
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    const run = onCreateRun(name.trim(), game, rules, selectedCustomGameId ?? undefined);
    setShowModal(false);
    setName('');
    navigate(`/run/${run.id}`);
  };

  const generationGroups = getGamesByGeneration();

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Nuzlocke Tracker</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Track your runs, honor your fallen</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
          >
            + New Run
          </button>
        </div>
      </div>

      {/* Run cards */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {runs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-zinc-600" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="5" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium text-lg">No runs yet</p>
            <p className="text-zinc-600 text-sm mt-1">Start your first Nuzlocke challenge</p>
          </div>
        ) : (
          <div className="space-y-3">
            {runs.map((run) => {
              const badgeCount = run.badges.filter(Boolean).length;
              const teamLead = run.team[0]
                ? run.encounters.find((e) => e.id === run.team[0])
                : null;
              const aliveCount = run.encounters.filter((e) => e.status === 'alive').length;
              const deadCount = run.graveyard.length;

              return (
                <div
                  key={run.id}
                  className="group relative bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-zinc-600 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => navigate(`/run/${run.id}`)}
                    className="w-full p-4 text-left flex items-center gap-4"
                  >
                    {/* Team lead sprite */}
                    <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-zinc-700/50 flex items-center justify-center">
                      {teamLead ? (
                        <img
                          src={getSpriteUrl(teamLead.pokemonId, teamLead.isShiny)}
                          alt={teamLead.nickname}
                          className="w-12 h-12 pixelated"
                        />
                      ) : (
                        <svg className="w-8 h-8 text-zinc-600" viewBox="0 0 100 100" fill="currentColor">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
                          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="6" />
                          <circle cx="50" cy="50" r="12" fill="currentColor" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-lg truncate">{run.name}</h2>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                            run.status === 'active'
                              ? 'bg-emerald-600/20 text-emerald-400'
                              : run.status === 'won'
                                ? 'bg-amber-600/20 text-amber-400'
                                : 'bg-red-600/20 text-red-400'
                          }`}
                        >
                          {run.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        {run.game === 'CUSTOM' && run.customGameId
                          ? loadCustomGames().find((g) => g.id === run.customGameId)?.name ?? 'Custom Game'
                          : GAME_NAMES[run.game]}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                        <span>{badgeCount}/{run.badges.length} badges</span>
                        <span className="text-emerald-500">{aliveCount} alive</span>
                        {deadCount > 0 && (
                          <span className="text-red-500">{deadCount} dead</span>
                        )}
                      </div>
                    </div>

                    <svg
                      className="w-5 h-5 text-zinc-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(run.id);
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-zinc-700/80 hover:bg-red-600/30 text-zinc-500 hover:text-red-400 transition-all"
                    title="Delete run"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fan game submission */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="rounded-2xl bg-zinc-800/50 border border-zinc-700/50 p-5">
          <h3 className="text-sm font-bold text-zinc-300 mb-1.5">Want your game added?</h3>
          <p className="text-xs text-zinc-500 mb-3">
            We add fan games and ROM hacks. Submit yours and we'll review it.
          </p>
          <a
            href="mailto:jack@homerfamily.com?subject=Fan%20Game%20Submission&body=Game%20Name:%0ADeveloper:%0ALink:%0ADescription:"
            className="inline-block rounded-lg bg-purple-600/20 border border-purple-500/30 px-4 py-2 text-sm font-medium text-purple-300 hover:bg-purple-600/30 transition-colors"
          >
            Submit a Game
          </a>
          <p className="text-[11px] text-zinc-600 mt-2">
            Or create a <span className="text-purple-400/70">Custom Game</span> to start tracking right away
          </p>
        </div>
      </div>

      {/* New Run Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Nuzlocke Run">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Run Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Fire Red Hardcore"
              className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Game</label>
            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              {generationGroups.map(({ gen, label, games }) => (
                <div key={gen}>
                  <button
                    type="button"
                    onClick={() => toggleGen(gen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 transition-colors text-sm font-semibold text-zinc-300"
                  >
                    <span>{label}</span>
                    <svg
                      className={`w-4 h-4 text-zinc-500 transition-transform ${expandedGens.has(gen) ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedGens.has(gen) && (
                    <div className="mt-1 space-y-1 pl-2">
                      {games.filter((g) => g !== 'CUSTOM').map((g) => (
                        <button
                          key={g}
                          onClick={() => { setGame(g); setSelectedCustomGameId(null); }}
                          className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                            game === g && !selectedCustomGameId
                              ? 'bg-emerald-600/20 border-2 border-emerald-500 text-emerald-400'
                              : 'bg-zinc-700 border-2 border-transparent text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {GAME_NAMES[g]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Custom / Fan Game section */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleGen(0)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-purple-900/30 hover:bg-purple-900/40 transition-colors text-sm font-semibold text-purple-300"
                >
                  <span>Custom / Fan Games</span>
                  <svg
                    className={`w-4 h-4 text-purple-400 transition-transform ${expandedGens.has(0) ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedGens.has(0) && (
                  <div className="mt-1 space-y-1 pl-2">
                    {customGames.map((cg) => (
                      <div key={cg.id} className="flex gap-1">
                        <button
                          onClick={() => { setGame('CUSTOM'); setSelectedCustomGameId(cg.id); }}
                          className={`flex-1 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                            game === 'CUSTOM' && selectedCustomGameId === cg.id
                              ? 'bg-purple-600/20 border-2 border-purple-500 text-purple-400'
                              : 'bg-zinc-700 border-2 border-transparent text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {cg.name}
                          <span className="text-xs text-zinc-500 ml-2">Gen {cg.generation}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCustomGame(cg.id)}
                          className="px-2 rounded-lg bg-zinc-700 text-zinc-500 hover:text-red-400 hover:bg-red-600/20 transition-colors"
                          title="Delete custom game"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setShowCustomForm(true)}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium bg-zinc-700/50 border-2 border-dashed border-zinc-600 text-zinc-400 hover:border-purple-500/50 hover:text-purple-300 transition-all"
                    >
                      + Create Custom Game
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Rules</label>
            <div className="space-y-2">
              {[
                { key: 'duplicateClause' as const, label: 'Duplicate Clause', desc: 'Skip duplicate species' },
                { key: 'shinyClause' as const, label: 'Shiny Clause', desc: 'Shinies exempt from first-encounter rule' },
                { key: 'levelCap' as const, label: 'Level Cap', desc: "Can't overlevel gym leader's ace" },
                { key: 'soulLink' as const, label: 'Soul Link', desc: 'Partner mode: linked Pokemon share fate' },
              ].map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => setRules((r) => ({ ...r, [key]: !r[key] }))}
                  className={`w-full rounded-lg px-4 py-3 text-left transition-all flex items-center justify-between ${
                    rules[key]
                      ? 'bg-emerald-600/10 border border-emerald-600/30'
                      : 'bg-zinc-700/50 border border-transparent'
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-zinc-500">{desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      rules[key]
                        ? 'bg-emerald-600 border-emerald-600'
                        : 'border-zinc-500'
                    }`}
                  >
                    {rules[key] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!name.trim() || (game === 'CUSTOM' && !selectedCustomGameId)}
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-2"
          >
            Start Run
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Run"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">
            Are you sure you want to delete this run? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 rounded-lg bg-zinc-600 py-2.5 font-medium hover:bg-zinc-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (deleteConfirm) {
                  onDeleteRun(deleteConfirm);
                  setDeleteConfirm(null);
                }
              }}
              className="flex-1 rounded-lg bg-red-600 py-2.5 font-medium hover:bg-red-500 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Custom Game Creation Modal */}
      <Modal
        open={showCustomForm}
        onClose={() => { setShowCustomForm(false); resetCustomForm(); }}
        title="Create Custom Game"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Game Name</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g., Pokemon Radical Red"
              className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Generation (for type chart)</label>
            <select
              value={customGen}
              onChange={(e) => setCustomGen(Number(e.target.value))}
              className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={1}>Gen 1 (no Dark/Steel/Fairy)</option>
              <option value={2}>Gen 2-5 (no Fairy, Steel resists Ghost/Dark)</option>
              <option value={6}>Gen 6+ (modern type chart)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Number of Badges</label>
            <input
              type="number"
              value={customBadgeCount}
              onChange={(e) => setCustomBadgeCount(Math.max(0, Math.min(16, Number(e.target.value))))}
              min={0}
              max={16}
              className="w-24 rounded-lg bg-zinc-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {customBadgeCount > 0 && (
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Badge Names (optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: customBadgeCount }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    value={customBadgeNames[i] ?? ''}
                    onChange={(e) => {
                      const next = [...customBadgeNames];
                      next[i] = e.target.value;
                      setCustomBadgeNames(next);
                    }}
                    placeholder={`Badge ${i + 1}`}
                    className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Routes</label>
            {customRoutes.length > 0 && (
              <div className="mb-2 space-y-1 max-h-32 overflow-y-auto">
                {customRoutes.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-zinc-700/50 rounded-lg px-3 py-1.5">
                    <span className="flex-1 text-zinc-200">{r.name}</span>
                    <span className="text-xs text-zinc-500">{r.segment}</span>
                    <button
                      onClick={() => setCustomRoutes(customRoutes.filter((_, j) => j !== i))}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newRouteName}
                onChange={(e) => setNewRouteName(e.target.value)}
                placeholder="Route name"
                className="flex-1 rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAddRoute()}
              />
              <input
                type="text"
                value={newRouteSegment}
                onChange={(e) => setNewRouteSegment(e.target.value)}
                placeholder="Segment"
                className="w-28 rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAddRoute()}
              />
              <button
                onClick={handleAddRoute}
                disabled={!newRouteName.trim()}
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium hover:bg-purple-500 disabled:opacity-40 transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">Routes can also be added later during the run</p>
          </div>

          <button
            onClick={handleSaveCustomGame}
            disabled={!customName.trim()}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-2"
          >
            Create Game
          </button>
        </div>
      </Modal>
    </div>
  );
}
