import { useState, useEffect } from 'react';
import type { Run, Encounter, PokemonData, MoveData, PokemonType } from '../types';
import { ALL_TYPES, GAME_GENERATIONS, GAME_NAMES } from '../types';
import { getSpriteUrl, fetchPokemonData, fetchMoveData } from '../utils/pokeapi';
import { moveToParty, moveToBox, markDead, updateEncounter } from '../hooks/useRuns';
import { getDefensiveMultiplier } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { MoveAutocomplete } from './MoveAutocomplete';
import { Modal } from './Modal';
import { getCustomGame } from '../utils/storage';

interface TeamTabProps {
  run: Run;
  onUpdate: (updater: (run: Run) => Run) => void;
}

function PokemonCard({
  encounter,
  location,
  onTap,
  isDead,
  soulLink,
}: {
  encounter: Encounter;
  location: 'team' | 'box';
  onTap: () => void;
  isDead?: boolean;
  soulLink?: boolean;
}) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    fetchPokemonData(encounter.pokemonId).then(setPokemonData);
  }, [encounter.pokemonId]);

  return (
    <button
      onClick={onTap}
      className={`flex items-center gap-3 rounded-xl p-3 transition-all w-full text-left ${
        isDead
          ? 'bg-zinc-800/40 opacity-60'
          : location === 'team'
            ? 'bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 hover:border-emerald-500/30'
            : 'bg-zinc-800/60 hover:bg-zinc-800'
      }`}
    >
      <div className="flex items-center flex-shrink-0">
        <img
          src={getSpriteUrl(encounter.pokemonId, encounter.isShiny)}
          alt={encounter.nickname}
          className={`w-14 h-14 pixelated ${isDead ? 'grayscale' : ''}`}
        />
        {/* Soul Link partner sprite */}
        {soulLink && encounter.linkedPokemonId && (
          <div className="flex items-center -ml-2">
            <svg className="w-3 h-3 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <img
              src={getSpriteUrl(encounter.linkedPokemonId)}
              alt={encounter.linkedNickname ?? 'Linked'}
              className={`w-10 h-10 pixelated ${isDead ? 'grayscale' : ''}`}
            />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{encounter.nickname}</p>
        <p className="text-xs text-zinc-400">Lv.{encounter.level}</p>
        {pokemonData && (
          <div className="flex gap-1 mt-1">
            {pokemonData.types.map((t) => (
              <TypeBadge key={t} type={t} small />
            ))}
          </div>
        )}
        {soulLink && encounter.linkedNickname && (
          <p className="text-[10px] text-purple-400 mt-0.5 truncate">
            Linked: {encounter.linkedNickname}
            {encounter.linkedOnPartnerTeam && (
              <span className="ml-1 text-purple-300">(team)</span>
            )}
          </p>
        )}
      </div>
    </button>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  const maxStat = 255;
  const percent = Math.min(100, Math.round((value / maxStat) * 100));
  let color = 'bg-red-500';
  if (value >= 120) color = 'bg-blue-500';
  else if (value >= 100) color = 'bg-green-500';
  else if (value >= 80) color = 'bg-yellow-500';
  else if (value >= 50) color = 'bg-orange-500';

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-zinc-400 w-8 text-right uppercase font-semibold">{label}</span>
      <span className="text-xs text-zinc-200 w-8 text-right font-bold">{value}</span>
      <div className="flex-1 h-2.5 bg-zinc-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function TypeMatchupRow({ type, multiplier }: { type: string; multiplier: number }) {
  if (multiplier === 1) return null;
  let label = '';
  let textColor = '';
  if (multiplier === 0) { label = '0x'; textColor = 'text-zinc-500'; }
  else if (multiplier === 0.25) { label = '\u00BCx'; textColor = 'text-emerald-400'; }
  else if (multiplier === 0.5) { label = '\u00BDx'; textColor = 'text-emerald-400'; }
  else if (multiplier === 2) { label = '2x'; textColor = 'text-red-400'; }
  else if (multiplier === 4) { label = '4x'; textColor = 'text-red-300 font-bold'; }
  else { label = `${multiplier}x`; textColor = 'text-zinc-400'; }

  return (
    <div className="flex items-center gap-1.5">
      <TypeBadge type={type} small />
      <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
    </div>
  );
}

function ExportButton({ run }: { run: Run }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const buildExportData = () => {
    const teamEncounters = run.team
      .map((id) => run.encounters.find((e) => e.id === id))
      .filter((e): e is Encounter => !!e);
    const boxEncounters = run.box
      .map((id) => run.encounters.find((e) => e.id === id))
      .filter((e): e is Encounter => !!e);
    const graveyardEncounters = run.graveyard
      .map((id) => run.encounters.find((e) => e.id === id))
      .filter((e): e is Encounter => !!e);

    const formatEncounter = (enc: Encounter) => ({
      pokemonId: enc.pokemonId,
      nickname: enc.nickname,
      level: enc.level,
      status: enc.status,
      isShiny: enc.isShiny ?? false,
      moves: enc.moves ?? [],
      route: enc.route,
      causeOfDeath: enc.causeOfDeath,
      caughtAt: enc.caughtAt,
      diedAt: enc.diedAt,
      ...(enc.linkedPokemonId ? {
        linkedPokemonId: enc.linkedPokemonId,
        linkedNickname: enc.linkedNickname,
      } : {}),
    });

    return {
      runName: run.name,
      game: run.game === 'CUSTOM' && run.customGameId
        ? (getCustomGame(run.customGameId)?.name ?? 'Custom Game')
        : GAME_NAMES[run.game],
      status: run.status,
      badges: {
        earned: run.badges.filter(Boolean).length,
        total: run.badges.length,
      },
      rules: run.rules,
      startedAt: run.startedAt,
      team: teamEncounters.map(formatEncounter),
      box: boxEncounters.map(formatEncounter),
      graveyard: graveyardEncounters.map(formatEncounter),
      encounterLog: run.encounters.map(formatEncounter),
      exportedAt: new Date().toISOString(),
    };
  };

  const flash = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCopy = async () => {
    const data = buildExportData();
    const json = JSON.stringify(data, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      flash('Copied!');
    } catch {
      flash('Copy failed');
    }
  };

  const handleDownload = () => {
    const data = buildExportData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${run.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    flash('Downloaded!');
  };

  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={handleCopy}
        className="rounded-lg bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-600 hover:text-white transition-colors flex items-center gap-1.5"
        title="Copy run data as JSON"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Export
      </button>
      <button
        onClick={handleDownload}
        className="rounded-lg bg-zinc-700 px-2 py-1.5 text-xs text-zinc-400 hover:bg-zinc-600 hover:text-white transition-colors"
        title="Download as JSON file"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      {showToast && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
          {toastMessage}
        </span>
      )}
    </div>
  );
}

export function TeamTab({ run, onUpdate }: TeamTabProps) {
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'team' | 'box'>('team');
  const [showDeathModal, setShowDeathModal] = useState(false);
  const [causeOfDeath, setCauseOfDeath] = useState('');
  const [showRipMessage, setShowRipMessage] = useState<string | null>(null);
  const [editLevel, setEditLevel] = useState(0);
  const [detailData, setDetailData] = useState<PokemonData | null>(null);
  const [linkedDetailData, setLinkedDetailData] = useState<PokemonData | null>(null);
  const [moveInputs, setMoveInputs] = useState<string[]>(['', '', '', '']);
  const [moveDataMap, setMoveDataMap] = useState<Map<string, MoveData>>(new Map());

  const gen = run.game === 'CUSTOM'
    ? (run.customGameId ? getCustomGame(run.customGameId)?.generation ?? 6 : 6)
    : GAME_GENERATIONS[run.game];

  const teamEncounters = run.team
    .map((id) => run.encounters.find((e) => e.id === id))
    .filter((e): e is Encounter => !!e);

  const boxEncounters = run.box
    .map((id) => run.encounters.find((e) => e.id === id))
    .filter((e): e is Encounter => !!e);

  // Fetch detail data when a pokemon is selected
  useEffect(() => {
    if (!selectedEncounter) {
      setDetailData(null);
      setLinkedDetailData(null);
      return;
    }
    fetchPokemonData(selectedEncounter.pokemonId).then((data) => {
      if (data) setDetailData(data);
    });
    // Fetch linked pokemon data for soul link
    if (selectedEncounter.linkedPokemonId) {
      fetchPokemonData(selectedEncounter.linkedPokemonId).then((data) => {
        if (data) setLinkedDetailData(data);
      });
    } else {
      setLinkedDetailData(null);
    }
    // Load moves from encounter
    const moves = selectedEncounter.moves ?? ['', '', '', ''];
    setMoveInputs([moves[0] ?? '', moves[1] ?? '', moves[2] ?? '', moves[3] ?? '']);
  }, [selectedEncounter?.id, selectedEncounter?.pokemonId, selectedEncounter?.linkedPokemonId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch move type data when move inputs change
  useEffect(() => {
    const fetchMoves = async () => {
      const newMap = new Map(moveDataMap);
      for (const name of moveInputs) {
        if (!name.trim()) continue;
        const key = name.trim().toLowerCase().replace(/\s+/g, '-');
        if (newMap.has(key)) continue;
        const data = await fetchMoveData(name);
        if (data) newMap.set(key, data);
      }
      setMoveDataMap(newMap);
    };
    fetchMoves();
  }, [moveInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectPokemon = (enc: Encounter, location: 'team' | 'box') => {
    setSelectedEncounter(enc);
    setSelectedLocation(location);
    setEditLevel(enc.level);
  };

  const handleMoveToParty = () => {
    if (!selectedEncounter) return;
    onUpdate((r) => moveToParty(r, selectedEncounter.id));
    setSelectedEncounter(null);
  };

  const handleMoveToBox = () => {
    if (!selectedEncounter) return;
    onUpdate((r) => moveToBox(r, selectedEncounter.id));
    setSelectedEncounter(null);
  };

  const handleUpdateLevel = () => {
    if (!selectedEncounter) return;
    onUpdate((r) => updateEncounter(r, selectedEncounter.id, { level: editLevel }));
    // Update local state too
    setSelectedEncounter({ ...selectedEncounter, level: editLevel });
  };

  const handleMarkDead = () => {
    if (!selectedEncounter) return;
    const nickname = selectedEncounter.nickname;
    // If soul link is enabled and there's a linked pokemon, kill both
    if (run.rules.soulLink && selectedEncounter.linkedPokemonId) {
      onUpdate((r) => markDead(r, selectedEncounter.id, causeOfDeath));
    } else {
      onUpdate((r) => markDead(r, selectedEncounter.id, causeOfDeath));
    }
    setShowDeathModal(false);
    setCauseOfDeath('');
    setSelectedEncounter(null);
    // Show RIP message briefly
    setShowRipMessage(nickname);
    setTimeout(() => setShowRipMessage(null), 2000);
  };

  const handleEvolve = async (evoId: number) => {
    if (!selectedEncounter) return;
    const evoData = await fetchPokemonData(evoId);
    if (!evoData) return;
    onUpdate((r) => updateEncounter(r, selectedEncounter.id, { pokemonId: evoId }));
    setSelectedEncounter({ ...selectedEncounter, pokemonId: evoId });
    setDetailData(evoData);
  };

  const handleEvolveLinked = async (evoId: number) => {
    if (!selectedEncounter) return;
    onUpdate((r) => updateEncounter(r, selectedEncounter.id, { linkedPokemonId: evoId }));
    const evoData = await fetchPokemonData(evoId);
    if (evoData) setLinkedDetailData(evoData);
    setSelectedEncounter({ ...selectedEncounter, linkedPokemonId: evoId });
  };

  const handleMoveInput = (index: number, value: string) => {
    const next = [...moveInputs];
    next[index] = value;
    setMoveInputs(next);
  };

  // Soul link type duplicate check
  const soulLinkTypeWarning = (() => {
    if (!run.rules.soulLink || !selectedEncounter || !detailData || !linkedDetailData) return null;
    const myTypes = new Set(detailData.types);
    const partnerTypes = new Set(linkedDetailData.types);
    const shared = [...myTypes].filter((t) => partnerTypes.has(t));
    if (shared.length > 0) {
      return `Both share ${shared.join('/')} type. Soul link pairs should be different types.`;
    }
    return null;
  })();

  // Calculate type matchups
  const matchups = detailData
    ? ALL_TYPES.map((type) => ({
        type,
        multiplier: getDefensiveMultiplier(type as PokemonType, detailData.types, gen),
      }))
    : [];

  const weaknesses = matchups.filter((m) => m.multiplier > 1);
  const resistances = matchups.filter((m) => m.multiplier > 0 && m.multiplier < 1);
  const immunities = matchups.filter((m) => m.multiplier === 0);

  const bst = detailData
    ? detailData.stats.hp + detailData.stats.atk + detailData.stats.def +
      detailData.stats.spa + detailData.stats.spd + detailData.stats.spe
    : 0;

  // Evolution readiness check
  const canEvolve = detailData?.evolvesTo?.some(
    (evo) => evo.level && selectedEncounter && selectedEncounter.level >= evo.level
  );

  return (
    <div className="tab-content p-4 pb-20 space-y-6">
      {/* Party */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
            Party ({teamEncounters.length}/6)
          </h3>
          <ExportButton run={run} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {teamEncounters.map((enc) => (
            <PokemonCard
              key={enc.id}
              encounter={enc}
              location="team"
              onTap={() => handleSelectPokemon(enc, 'team')}
              soulLink={run.rules.soulLink}
            />
          ))}
          {Array.from({ length: 6 - teamEncounters.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 h-20 text-zinc-600 text-sm"
            >
              Empty
            </div>
          ))}
        </div>
      </div>

      {/* Box */}
      <div>
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Box ({boxEncounters.length})
        </h3>
        {boxEncounters.length === 0 ? (
          <p className="text-zinc-500 text-sm">No Pokemon in the box yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {boxEncounters.map((enc) => (
              <PokemonCard
                key={enc.id}
                encounter={enc}
                location="box"
                onTap={() => handleSelectPokemon(enc, 'box')}
                soulLink={run.rules.soulLink}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pokemon detail modal */}
      <Modal
        open={!!selectedEncounter && !showDeathModal}
        onClose={() => setSelectedEncounter(null)}
        title={selectedEncounter?.nickname ?? 'Pokemon'}
      >
        {selectedEncounter && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={getSpriteUrl(selectedEncounter.pokemonId, selectedEncounter.isShiny)}
                  alt={selectedEncounter.nickname}
                  className="w-20 h-20 pixelated"
                />
                {canEvolve && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse" title="Ready to evolve!">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Soul link partner in header */}
              {run.rules.soulLink && selectedEncounter.linkedPokemonId && (
                <div className="flex flex-col items-center">
                  <svg className="w-4 h-4 text-purple-400 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <img
                    src={getSpriteUrl(selectedEncounter.linkedPokemonId)}
                    alt={selectedEncounter.linkedNickname ?? 'Linked'}
                    className="w-14 h-14 pixelated"
                  />
                  <p className="text-[10px] text-purple-400 mt-0.5">
                    {selectedEncounter.linkedNickname ?? 'Partner'}
                  </p>
                  <button
                    onClick={() => {
                      const newVal = !selectedEncounter.linkedOnPartnerTeam;
                      onUpdate((r) => updateEncounter(r, selectedEncounter.id, { linkedOnPartnerTeam: newVal }));
                      setSelectedEncounter({ ...selectedEncounter, linkedOnPartnerTeam: newVal });
                    }}
                    className={`mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                      selectedEncounter.linkedOnPartnerTeam
                        ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                        : 'bg-zinc-700 text-zinc-500 border border-zinc-600'
                    }`}
                  >
                    {selectedEncounter.linkedOnPartnerTeam ? 'On their team' : 'In their box'}
                  </button>
                </div>
              )}
              <div className="flex-1">
                <p className="font-bold text-lg">{selectedEncounter.nickname}</p>
                <p className="text-zinc-400 text-sm capitalize">{detailData?.name ?? ''}</p>
                <p className="text-zinc-500 text-sm">Lv.{selectedEncounter.level}</p>
                {detailData && (
                  <div className="flex gap-1 mt-1">
                    {detailData.types.map((t) => (
                      <TypeBadge key={t} type={t} small />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Base Stats */}
            {detailData && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Base Stats</h4>
                  <span className="text-xs font-bold text-zinc-300">BST: {bst}</span>
                </div>
                <div className="space-y-1.5">
                  <StatBar label="HP" value={detailData.stats.hp} />
                  <StatBar label="Atk" value={detailData.stats.atk} />
                  <StatBar label="Def" value={detailData.stats.def} />
                  <StatBar label="SpA" value={detailData.stats.spa} />
                  <StatBar label="SpD" value={detailData.stats.spd} />
                  <StatBar label="Spe" value={detailData.stats.spe} />
                </div>
              </div>
            )}

            {/* Type Matchups */}
            {detailData && (
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Type Matchups</h4>
                {weaknesses.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[10px] text-red-400 font-semibold uppercase mb-1">Weak to</p>
                    <div className="flex flex-wrap gap-1.5">
                      {weaknesses.map((m) => (
                        <TypeMatchupRow key={m.type} type={m.type} multiplier={m.multiplier} />
                      ))}
                    </div>
                  </div>
                )}
                {resistances.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[10px] text-emerald-400 font-semibold uppercase mb-1">Resists</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resistances.map((m) => (
                        <TypeMatchupRow key={m.type} type={m.type} multiplier={m.multiplier} />
                      ))}
                    </div>
                  </div>
                )}
                {immunities.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase mb-1">Immune to</p>
                    <div className="flex flex-wrap gap-1.5">
                      {immunities.map((m) => (
                        <TypeMatchupRow key={m.type} type={m.type} multiplier={m.multiplier} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Abilities */}
            {detailData?.abilities && detailData.abilities.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Abilities</h4>
                <div className="flex flex-wrap gap-2">
                  {detailData.abilities.map((a) => (
                    <span
                      key={a}
                      className="px-2.5 py-1 rounded-lg bg-zinc-700 text-xs font-medium text-zinc-200 capitalize"
                    >
                      {a.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Evolution */}
            {detailData?.evolvesTo && detailData.evolvesTo.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Evolution</h4>
                <div className="space-y-2">
                  {detailData.evolvesTo.map((evo) => {
                    const isReady = evo.level && selectedEncounter.level >= evo.level;
                    return (
                      <div
                        key={evo.name}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          isReady
                            ? 'bg-emerald-900/30 border border-emerald-700/40'
                            : 'bg-zinc-700/50'
                        }`}
                      >
                        <img
                          src={getSpriteUrl(evo.id)}
                          alt={evo.name}
                          className="w-10 h-10 pixelated"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold capitalize">{evo.name.replace(/-/g, ' ')}</p>
                          <p className="text-xs text-zinc-400">{evo.method}</p>
                        </div>
                        <button
                          onClick={() => handleEvolve(evo.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isReady
                              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                              : 'bg-zinc-600 text-zinc-300 hover:bg-zinc-500'
                          }`}
                        >
                          Evolve
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Soul Link partner evolution */}
            {run.rules.soulLink && selectedEncounter.linkedPokemonId && linkedDetailData?.evolvesTo && linkedDetailData.evolvesTo.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                  Partner Evolution ({selectedEncounter.linkedNickname})
                </h4>
                <div className="space-y-2">
                  {linkedDetailData.evolvesTo.map((evo) => (
                    <div key={evo.name} className="flex items-center gap-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <img src={getSpriteUrl(evo.id)} alt={evo.name} className="w-10 h-10 pixelated" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold capitalize">{evo.name.replace(/-/g, ' ')}</p>
                        <p className="text-xs text-zinc-400">{evo.method}</p>
                      </div>
                      <button
                        onClick={() => handleEvolveLinked(evo.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition-colors"
                      >
                        Evolve
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soul Link type warning */}
            {soulLinkTypeWarning && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-300">
                  <span className="font-bold">Soul Link:</span> {soulLinkTypeWarning}
                </p>
              </div>
            )}

            {/* Moves */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Moves</h4>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => {
                  const key = moveInputs[i]?.trim().toLowerCase().replace(/\s+/g, '-');
                  const moveData = key ? moveDataMap.get(key) : null;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <MoveAutocomplete
                        value={moveInputs[i]}
                        onChange={(v) => handleMoveInput(i, v)}
                        onSelect={(moveName) => {
                          const display = moveName.replace(/-/g, ' ');
                          const next = [...moveInputs];
                          next[i] = display;
                          setMoveInputs(next);
                          // Trigger move data fetch
                          fetchMoveData(moveName).then((data) => {
                            if (data) {
                              setMoveDataMap((prev) => {
                                const m = new Map(prev);
                                m.set(moveName, data);
                                return m;
                              });
                            }
                          });
                          // Save moves
                          const filtered = next.map((m) => m.trim());
                          if (selectedEncounter) {
                            onUpdate((r) => updateEncounter(r, selectedEncounter.id, { moves: filtered }));
                          }
                        }}
                        placeholder={`Move ${i + 1}`}
                      />
                      {moveData && (
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <TypeBadge type={moveData.type} small />
                          {moveData.power && (
                            <span className="text-[10px] text-zinc-400">{moveData.power}pw</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Level update */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Update Level</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={editLevel}
                  onChange={(e) => setEditLevel(Number(e.target.value))}
                  min={1}
                  max={100}
                  className="w-24 rounded-lg bg-zinc-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleUpdateLevel}
                  className="rounded-lg bg-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-500 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Soul Link clause warnings */}
            {run.rules.soulLink && selectedEncounter.linkedPokemonId && selectedEncounter.linkedNickname && (() => {
              const isOnTeam = selectedLocation === 'team';
              const partnerOnTeam = selectedEncounter.linkedOnPartnerTeam ?? false;
              const mismatch = isOnTeam !== partnerOnTeam;
              if (!mismatch) return null;
              return (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-amber-300">
                    <span className="font-bold">Soul Link:</span>{' '}
                    {isOnTeam
                      ? `${selectedEncounter.linkedNickname} is in partner's box. Both should be on team or both boxed.`
                      : `${selectedEncounter.linkedNickname} is on partner's team. Both should be on team or both boxed.`
                    }
                  </p>
                </div>
              );
            })()}

            {/* Move actions */}
            <div className="flex gap-2">
              {selectedLocation === 'box' && run.team.length < 6 && (
                <button
                  onClick={handleMoveToParty}
                  className="flex-1 rounded-lg bg-emerald-600 py-2.5 font-medium hover:bg-emerald-500 transition-colors"
                >
                  Move to Party
                  {run.rules.soulLink && selectedEncounter.linkedPokemonId && !selectedEncounter.linkedOnPartnerTeam && (
                    <span className="block text-[10px] font-normal opacity-80">Partner should also add theirs</span>
                  )}
                </button>
              )}
              {selectedLocation === 'team' && (
                <button
                  onClick={handleMoveToBox}
                  className="flex-1 rounded-lg bg-zinc-600 py-2.5 font-medium hover:bg-zinc-500 transition-colors"
                >
                  Move to Box
                  {run.rules.soulLink && selectedEncounter.linkedPokemonId && selectedEncounter.linkedOnPartnerTeam && (
                    <span className="block text-[10px] font-normal opacity-80">Partner should also box theirs</span>
                  )}
                </button>
              )}
            </div>

            {/* Mark dead */}
            <button
              onClick={() => setShowDeathModal(true)}
              className="w-full rounded-lg bg-red-600 py-3 font-bold text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20"
            >
              Mark Dead
            </button>
          </div>
        )}
      </Modal>

      {/* Death confirmation modal */}
      <Modal
        open={showDeathModal}
        onClose={() => {
          setShowDeathModal(false);
          setCauseOfDeath('');
        }}
        title="Mark as Dead"
      >
        {selectedEncounter && (
          <div className="space-y-4">
            {/* Grayscale sprite preview */}
            <div className="flex justify-center">
              <img
                src={getSpriteUrl(selectedEncounter.pokemonId, selectedEncounter.isShiny)}
                alt={selectedEncounter.nickname}
                className="w-20 h-20 pixelated grayscale opacity-60"
              />
            </div>

            <p className="text-zinc-400 text-center">
              How did <span className="font-bold text-white">{selectedEncounter.nickname}</span> die?
            </p>

            {/* Soul Link warning */}
            {run.rules.soulLink && selectedEncounter.linkedPokemonId && selectedEncounter.linkedNickname && (
              <div className="rounded-lg bg-purple-500/10 border border-purple-500/30 px-4 py-2.5 flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-purple-300">
                  <span className="font-bold">Soul Link:</span> {selectedEncounter.linkedNickname} will also die
                </p>
              </div>
            )}

            <input
              type="text"
              value={causeOfDeath}
              onChange={(e) => setCauseOfDeath(e.target.value)}
              placeholder="e.g., Misty's Starmie, Water Pulse crit"
              className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-red-500"
              onKeyDown={(e) => e.key === 'Enter' && handleMarkDead()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowDeathModal(false);
                  setCauseOfDeath('');
                }}
                className="flex-1 rounded-lg bg-zinc-600 py-2.5 font-medium hover:bg-zinc-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkDead}
                className="flex-1 rounded-lg bg-red-600 py-2.5 font-bold hover:bg-red-500 transition-colors text-white"
              >
                Confirm Death
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* RIP toast */}
      {showRipMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-zinc-900/90 border border-zinc-700 rounded-2xl px-8 py-6 text-center shadow-2xl animate-fade-in">
            <p className="text-zinc-500 text-sm uppercase tracking-widest mb-1">Rest in peace</p>
            <p className="text-white text-xl font-bold">{showRipMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
