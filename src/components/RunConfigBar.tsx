import type { Run, StarterType } from '../types';
import { GAME_VERSIONS, STARTER_LABELS } from '../types';

interface RunConfigBarProps {
  run: Run;
  onUpdate: (updater: (run: Run) => Run) => void;
}

/**
 * Shows the run's version (paired games) and starter as clickable badges.
 * Lets the user change them after run creation so rival teams and
 * version-exclusive bosses display correctly. Hidden entirely for games
 * where neither applies (custom / Legends: Arceus without starter data).
 */
export function RunConfigBar({ run, onUpdate }: RunConfigBarProps) {
  const versionPair = GAME_VERSIONS[run.game];
  const starterLabels = STARTER_LABELS[run.game];
  if (!versionPair && !starterLabels) return null;

  return (
    <div
      className="px-4 py-2 flex items-center gap-3 text-xs flex-wrap"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      {versionPair && (
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 uppercase tracking-wider">Version</span>
          {[versionPair.version1, versionPair.version2].map((v) => (
            <button
              key={v.key}
              onClick={() =>
                onUpdate((r) => ({ ...r, version: r.version === v.key ? undefined : v.key }))
              }
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                run.version === v.key
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-zinc-800 text-zinc-400 border border-transparent hover:border-zinc-600'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      )}
      {starterLabels && (
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 uppercase tracking-wider">Starter</span>
          {(['grass', 'fire', 'water'] as const).map((s) => (
            <button
              key={s}
              onClick={() =>
                onUpdate((r) => ({ ...r, starter: r.starter === s ? undefined : (s as StarterType) }))
              }
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                run.starter === s
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-zinc-800 text-zinc-400 border border-transparent hover:border-zinc-600'
              }`}
              title={starterLabels[s]}
            >
              {starterLabels[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
