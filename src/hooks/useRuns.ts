import { useState, useCallback } from 'react';
import type { Run, Game, RuleSet, Encounter } from '../types';
import { loadRuns, saveRuns } from '../utils/storage';
import { generateId } from '../utils/id';
import { BADGE_NAMES } from '../data/routes';

export function useRuns() {
  const [runs, setRuns] = useState<Run[]>(() => loadRuns());

  const persist = useCallback((updated: Run[]) => {
    setRuns(updated);
    saveRuns(updated);
  }, []);

  const createRun = useCallback(
    (name: string, game: Game, rules: RuleSet): Run => {
      const badgeCount = BADGE_NAMES[game].length;
      const run: Run = {
        id: generateId(),
        name,
        game,
        rules,
        status: 'active',
        startedAt: new Date().toISOString(),
        badges: Array(badgeCount).fill(false),
        encounters: [],
        team: [],
        box: [],
        graveyard: [],
      };
      const updated = [...runs, run];
      persist(updated);
      return run;
    },
    [runs, persist]
  );

  const deleteRun = useCallback(
    (id: string) => {
      persist(runs.filter((r) => r.id !== id));
    },
    [runs, persist]
  );

  const updateRun = useCallback(
    (id: string, updater: (run: Run) => Run) => {
      persist(runs.map((r) => (r.id === id ? updater(r) : r)));
    },
    [runs, persist]
  );

  const getRun = useCallback(
    (id: string): Run | undefined => runs.find((r) => r.id === id),
    [runs]
  );

  return { runs, createRun, deleteRun, updateRun, getRun };
}

// Helpers for run mutations
export function addEncounter(run: Run, encounter: Encounter): Run {
  const updated = { ...run, encounters: [...run.encounters, encounter] };
  if (encounter.status === 'alive') {
    // Add to box by default
    updated.box = [...run.box, encounter.id];
  }
  return updated;
}

export function updateEncounter(run: Run, encounterId: string, updates: Partial<Encounter>): Run {
  return {
    ...run,
    encounters: run.encounters.map((e) =>
      e.id === encounterId ? { ...e, ...updates } : e
    ),
  };
}

export function moveToParty(run: Run, encounterId: string): Run {
  if (run.team.length >= 6) return run;
  return {
    ...run,
    team: [...run.team, encounterId],
    box: run.box.filter((id) => id !== encounterId),
  };
}

export function moveToBox(run: Run, encounterId: string): Run {
  return {
    ...run,
    team: run.team.filter((id) => id !== encounterId),
    box: [...run.box, encounterId],
  };
}

export function markDead(run: Run, encounterId: string, causeOfDeath: string): Run {
  return {
    ...run,
    encounters: run.encounters.map((e) =>
      e.id === encounterId
        ? { ...e, status: 'dead' as const, causeOfDeath, diedAt: new Date().toISOString() }
        : e
    ),
    team: run.team.filter((id) => id !== encounterId),
    box: run.box.filter((id) => id !== encounterId),
    graveyard: [...run.graveyard, encounterId],
  };
}

export function toggleBadge(run: Run, index: number): Run {
  const badges = [...run.badges];
  badges[index] = !badges[index];
  return { ...run, badges };
}
