import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Game, RuleSet, Run } from '../types';
import { GAME_NAMES } from '../types';
import { Modal } from '../components/Modal';
import { getSpriteUrl } from '../utils/pokeapi';

interface RunListProps {
  runs: Run[];
  onCreateRun: (name: string, game: Game, rules: RuleSet) => Run;
  onDeleteRun: (id: string) => void;
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
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCreate = () => {
    if (!name.trim()) return;
    const run = onCreateRun(name.trim(), game, rules);
    setShowModal(false);
    setName('');
    navigate(`/run/${run.id}`);
  };

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
                      <p className="text-sm text-zinc-400">{GAME_NAMES[run.game]}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                        <span>{badgeCount}/8 badges</span>
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
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(GAME_NAMES) as Game[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGame(g)}
                  className={`rounded-lg px-4 py-3 text-left font-medium transition-all ${
                    game === g
                      ? 'bg-emerald-600/20 border-2 border-emerald-500 text-emerald-400'
                      : 'bg-zinc-700 border-2 border-transparent text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  {GAME_NAMES[g]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Rules</label>
            <div className="space-y-2">
              {[
                { key: 'duplicateClause' as const, label: 'Duplicate Clause', desc: 'Skip duplicate species' },
                { key: 'shinyClause' as const, label: 'Shiny Clause', desc: 'Shinies exempt from first-encounter rule' },
                { key: 'levelCap' as const, label: 'Level Cap', desc: "Can't overlevel gym leader's ace" },
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
            disabled={!name.trim()}
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
    </div>
  );
}
