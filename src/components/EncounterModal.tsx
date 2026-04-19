import { useState, useEffect, useCallback } from 'react';
import { Modal } from './Modal';
import { PokemonSearch } from './PokemonSearch';
import type { PokemonData, Encounter, Game } from '../types';
import { generateId } from '../utils/id';
import { ENCOUNTER_TABLES } from '../data/encounters';
import { getSpriteUrl, fetchPokemonData, loadPokemonList } from '../utils/pokeapi';
import { TypeBadge } from './TypeBadge';

interface EncounterModalProps {
  open: boolean;
  onClose: () => void;
  routeName: string;
  routeKey: string;
  game: Game;
  existingEncounter?: Encounter;
  onSave: (encounter: Encounter) => void;
  isShinyClauseAdd?: boolean;
  soulLink?: boolean;
  ownedPokemonIds?: Set<number>;
}

export function EncounterModal({
  open,
  onClose,
  routeName,
  routeKey,
  game,
  existingEncounter,
  onSave,
  isShinyClauseAdd,
  soulLink,
  ownedPokemonIds,
}: EncounterModalProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [nickname, setNickname] = useState(existingEncounter?.nickname ?? '');
  const [level, setLevel] = useState(existingEncounter?.level ?? 5);
  const [isShiny, setIsShiny] = useState(existingEncounter?.isShiny ?? (isShinyClauseAdd ? true : false));
  const [status, setStatus] = useState<'alive' | 'missed'>(
    existingEncounter?.status === 'missed' ? 'missed' : 'alive'
  );
  const [showManualSearch, setShowManualSearch] = useState(false);
  const [encounterNames, setEncounterNames] = useState<Map<number, string>>(new Map());
  const [encounterTypes, setEncounterTypes] = useState<Map<number, string[]>>(new Map());

  // Soul Link fields
  const [linkedPokemon, setLinkedPokemon] = useState<PokemonData | null>(null);
  const [linkedNickname, setLinkedNickname] = useState(existingEncounter?.linkedNickname ?? '');
  const [linkedOnPartnerTeam, setLinkedOnPartnerTeam] = useState(existingEncounter?.linkedOnPartnerTeam ?? false);
  const [showLinkedSearch, setShowLinkedSearch] = useState(false);
  const [showLinkedManualSearch, setShowLinkedManualSearch] = useState(false);

  // Initialize linked pokemon from existing encounter
  useEffect(() => {
    if (existingEncounter?.linkedPokemonId) {
      fetchPokemonData(existingEncounter.linkedPokemonId).then((data) => {
        if (data) setLinkedPokemon(data);
      });
    }
  }, [existingEncounter?.linkedPokemonId]);

  const routeEncounters = ENCOUNTER_TABLES[game]?.[routeKey] ?? [];

  // Load pokemon names for the encounter list
  useEffect(() => {
    if (routeEncounters.length === 0) return;
    loadPokemonList().then((list) => {
      const nameMap = new Map<number, string>();
      for (const id of routeEncounters) {
        const found = list.find((p) => p.id === id);
        if (found) nameMap.set(id, found.name);
      }
      setEncounterNames(nameMap);
    });
  }, [routeKey, game]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load types for encounter list pokemon
  useEffect(() => {
    if (routeEncounters.length === 0) return;
    const loadTypes = async () => {
      const typeMap = new Map<number, string[]>();
      for (const id of routeEncounters) {
        const data = await fetchPokemonData(id);
        if (data) typeMap.set(id, data.types);
      }
      setEncounterTypes(typeMap);
    };
    loadTypes();
  }, [routeKey, game]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuickSelect = useCallback(async (pokemonId: number) => {
    const data = await fetchPokemonData(pokemonId);
    if (data) {
      setSelectedPokemon(data);
      setShowManualSearch(false);
    }
  }, []);

  const handleSave = () => {
    const pokemonId = selectedPokemon?.id ?? existingEncounter?.pokemonId;
    if (!pokemonId) return;

    const encounter: Encounter = {
      id: existingEncounter?.id ?? generateId(),
      route: routeKey,
      pokemonId,
      nickname: nickname || selectedPokemon?.name || '',
      status,
      level,
      isShiny,
      isGift: routeKey === 'gift-starter' || undefined,
      caughtAt: existingEncounter?.caughtAt ?? new Date().toISOString(),
      ...(soulLink && linkedPokemon ? {
        linkedPokemonId: linkedPokemon.id,
        linkedNickname: linkedNickname || linkedPokemon.name,
        linkedOnPartnerTeam,
      } : {}),
    };
    onSave(encounter);
    onClose();
  };

  const canSave = selectedPokemon || existingEncounter;

  return (
    <Modal open={open} onClose={onClose} title={routeName}>
      <div className="space-y-4">
        {/* Shiny Clause banner */}
        {isShinyClauseAdd && (
          <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 px-4 py-2.5 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">&#10024;</span>
            <p className="text-sm text-yellow-300">
              Shiny Clause: this catch doesn&apos;t count against your route limit
            </p>
          </div>
        )}

        {!existingEncounter && (
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Pokemon</label>

            {/* Selected pokemon preview */}
            {selectedPokemon && !showManualSearch && (
              <div className="flex items-center gap-3 rounded-lg bg-zinc-700/50 p-3 mb-3">
                <img
                  src={selectedPokemon.sprite || getSpriteUrl(selectedPokemon.id)}
                  alt={selectedPokemon.name}
                  className="w-14 h-14 pixelated"
                />
                <div className="flex-1">
                  <p className="font-bold capitalize text-lg">{selectedPokemon.name}</p>
                  <div className="flex gap-1.5 mt-1">
                    {selectedPokemon.types.map((t) => (
                      <TypeBadge key={t} type={t} small />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPokemon(null)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Route encounter suggestions */}
            {!selectedPokemon && routeEncounters.length > 0 && !showManualSearch && (
              <div className="rounded-lg bg-zinc-700/30 border border-zinc-700 max-h-64 overflow-y-auto mb-2">
                {routeEncounters.map((id) => {
                  const name = encounterNames.get(id) ?? `#${id}`;
                  const types = encounterTypes.get(id) ?? [];
                  return (
                    <button
                      key={id}
                      onClick={() => handleQuickSelect(id)}
                      className="flex items-center gap-3 w-full px-3 py-2 hover:bg-zinc-600/50 transition-colors text-left border-b border-zinc-700/50 last:border-b-0"
                    >
                      <img
                        src={getSpriteUrl(id)}
                        alt={name}
                        className="w-10 h-10 pixelated"
                        loading="lazy"
                      />
                      <span className="capitalize font-medium flex-1">
                        {name}
                        {ownedPokemonIds?.has(id) && (
                          <span className="ml-1.5 text-xs text-emerald-400 font-semibold" title="Already owned">&#10003;</span>
                        )}
                      </span>
                      <div className="flex gap-1">
                        {types.map((t) => (
                          <TypeBadge key={t} type={t} small />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Manual search toggle / fallback */}
            {!selectedPokemon && (
              <>
                {showManualSearch ? (
                  <div>
                    {routeEncounters.length > 0 && (
                      <button
                        onClick={() => setShowManualSearch(false)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 mb-2 flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to route encounters
                      </button>
                    )}
                    <PokemonSearch onSelect={(p) => { setSelectedPokemon(p); setShowManualSearch(false); }} />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowManualSearch(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-600 py-2.5 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search manually
                  </button>
                )}
              </>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter nickname..."
            className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1.5">Level</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            min={1}
            max={100}
            className="w-24 rounded-lg bg-zinc-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={isShiny}
            onChange={(e) => setIsShiny(e.target.checked)}
            className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
            &#10024; Shiny
          </span>
        </label>

        {/* Soul Link fields */}
        {soulLink && (
          <div className="rounded-lg bg-purple-500/10 border border-purple-500/30 p-4 space-y-3">
            <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Soul Link - Partner&apos;s Pokemon
            </h4>

            {linkedPokemon && !showLinkedSearch ? (
              <div className="flex items-center gap-3 rounded-lg bg-zinc-700/50 p-3">
                <img
                  src={getSpriteUrl(linkedPokemon.id)}
                  alt={linkedPokemon.name}
                  className="w-12 h-12 pixelated"
                />
                <div className="flex-1">
                  <p className="font-bold capitalize">{linkedPokemon.name}</p>
                  <div className="flex gap-1 mt-1">
                    {linkedPokemon.types.map((t) => (
                      <TypeBadge key={t} type={t} small />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { setLinkedPokemon(null); setShowLinkedSearch(true); setShowLinkedManualSearch(false); }}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                {/* Route encounter suggestions for partner */}
                {routeEncounters.length > 0 && !showLinkedManualSearch && (
                  <div className="rounded-lg bg-zinc-700/30 border border-zinc-700 max-h-48 overflow-y-auto mb-2">
                    {routeEncounters.map((id) => {
                      const name = encounterNames.get(id) ?? `#${id}`;
                      const types = encounterTypes.get(id) ?? [];
                      return (
                        <button
                          key={id}
                          onClick={async () => {
                            const data = await fetchPokemonData(id);
                            if (data) { setLinkedPokemon(data); setShowLinkedSearch(false); }
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-zinc-600/50 transition-colors text-left border-b border-zinc-700/50 last:border-b-0"
                        >
                          <img src={getSpriteUrl(id)} alt={name} className="w-8 h-8 pixelated" loading="lazy" />
                          <span className="capitalize text-sm font-medium flex-1">{name}</span>
                          <div className="flex gap-1">
                            {types.map((t) => (
                              <TypeBadge key={t} type={t} small />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                {!showLinkedManualSearch && (
                  <button
                    onClick={() => setShowLinkedManualSearch(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 mb-1"
                  >
                    Search all Pokemon instead
                  </button>
                )}
                {showLinkedManualSearch && (
                  <div>
                    {routeEncounters.length > 0 && (
                      <button
                        onClick={() => setShowLinkedManualSearch(false)}
                        className="text-xs text-purple-400 hover:text-purple-300 mb-2 flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to route encounters
                      </button>
                    )}
                    <PokemonSearch onSelect={(p) => { setLinkedPokemon(p); setShowLinkedSearch(false); setShowLinkedManualSearch(false); }} />
                  </div>
                )}
                {routeEncounters.length === 0 && !showLinkedManualSearch && (
                  <PokemonSearch onSelect={(p) => { setLinkedPokemon(p); setShowLinkedSearch(false); }} />
                )}
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Partner&apos;s Nickname</label>
              <input
                type="text"
                value={linkedNickname}
                onChange={(e) => setLinkedNickname(e.target.value)}
                placeholder="Partner's nickname..."
                className="w-full rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={linkedOnPartnerTeam}
                onChange={(e) => setLinkedOnPartnerTeam(e.target.checked)}
                className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                On partner&apos;s active team
              </span>
            </label>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
          <div className="flex gap-3">
            <button
              onClick={() => setStatus('alive')}
              className={`flex-1 rounded-lg py-2.5 font-medium transition-all ${
                status === 'alive'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Caught
            </button>
            <button
              onClick={() => setStatus('missed')}
              className={`flex-1 rounded-lg py-2.5 font-medium transition-all ${
                status === 'missed'
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Missed
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-2"
        >
          {existingEncounter ? 'Update Encounter' : 'Log Encounter'}
        </button>
      </div>
    </Modal>
  );
}
