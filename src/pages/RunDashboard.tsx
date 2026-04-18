import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Run } from '../types';
import { GAME_NAMES, LEVEL_CAPS } from '../types';
import { BadgeBar } from '../components/BadgeBar';
import { EncountersTab } from '../components/EncountersTab';
import { TeamTab } from '../components/TeamTab';
import { AnalysisTab } from '../components/AnalysisTab';
import { GraveyardTab } from '../components/GraveyardTab';
import { toggleBadge } from '../hooks/useRuns';

type Tab = 'encounters' | 'team' | 'analysis' | 'graveyard';

const TABS: { key: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    key: 'encounters',
    label: 'Routes',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-400' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    key: 'team',
    label: 'Team',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-400' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    key: 'analysis',
    label: 'Analysis',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-400' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    key: 'graveyard',
    label: 'Graveyard',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-400' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

interface RunDashboardProps {
  runs: Run[];
  onUpdate: (id: string, updater: (run: Run) => Run) => void;
}

export function RunDashboard({ runs, onUpdate }: RunDashboardProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('encounters');

  const run = runs.find((r) => r.id === id);

  if (!run) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 text-lg">Run not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm"
          >
            Back to runs
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (updater: (run: Run) => Run) => {
    onUpdate(run.id, updater);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      {/* Top bar */}
      <div className="bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg truncate">{run.name}</h1>
            <p className="text-xs text-zinc-500">{GAME_NAMES[run.game]}</p>
          </div>
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
      </div>

      {/* Level cap indicator */}
      {run.rules.levelCap && (() => {
        const caps = LEVEL_CAPS[run.game];
        const segments = Object.keys(caps);
        const badgeCount = run.badges.filter(Boolean).length;
        const currentSegment = segments[Math.min(badgeCount, segments.length - 1)];
        const currentCap = caps[currentSegment];
        return (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Level Cap</span>
              <span className="text-amber-300 font-bold text-lg">{currentCap}</span>
            </div>
            <span className="text-amber-400/60 text-xs">{currentSegment}</span>
          </div>
        );
      })()}

      {/* Badge bar */}
      <BadgeBar
        game={run.game}
        badges={run.badges}
        onToggle={(i) => handleUpdate((r) => toggleBadge(r, i))}
      />

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'encounters' && (
          <EncountersTab run={run} onUpdate={handleUpdate} />
        )}
        {activeTab === 'team' && (
          <TeamTab run={run} onUpdate={handleUpdate} />
        )}
        {activeTab === 'analysis' && <AnalysisTab run={run} />}
        {activeTab === 'graveyard' && <GraveyardTab run={run} />}
      </div>

      {/* Bottom tab bar */}
      <div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 safe-area-bottom">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                activeTab === tab.key ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.icon(activeTab === tab.key)}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
