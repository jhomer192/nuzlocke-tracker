import { useState, useEffect } from 'react';
import type { Run, Encounter, PokemonData } from '../types';
import { getSpriteUrl, fetchPokemonData } from '../utils/pokeapi';
import { moveToParty, moveToBox, markDead, updateEncounter } from '../hooks/useRuns';
import { TypeBadge } from './TypeBadge';
import { Modal } from './Modal';

interface TeamTabProps {
  run: Run;
  onUpdate: (updater: (run: Run) => Run) => void;
}

function PokemonCard({
  encounter,
  location,
  onTap,
  isDead,
}: {
  encounter: Encounter;
  location: 'team' | 'box';
  onTap: () => void;
  isDead?: boolean;
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
      <img
        src={getSpriteUrl(encounter.pokemonId)}
        alt={encounter.nickname}
        className={`w-14 h-14 pixelated ${isDead ? 'grayscale' : ''}`}
      />
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
      </div>
    </button>
  );
}

export function TeamTab({ run, onUpdate }: TeamTabProps) {
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'team' | 'box'>('team');
  const [showDeathModal, setShowDeathModal] = useState(false);
  const [causeOfDeath, setCauseOfDeath] = useState('');
  const [editLevel, setEditLevel] = useState(0);

  const teamEncounters = run.team
    .map((id) => run.encounters.find((e) => e.id === id))
    .filter((e): e is Encounter => !!e);

  const boxEncounters = run.box
    .map((id) => run.encounters.find((e) => e.id === id))
    .filter((e): e is Encounter => !!e);

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
    setSelectedEncounter(null);
  };

  const handleMarkDead = () => {
    if (!selectedEncounter) return;
    onUpdate((r) => markDead(r, selectedEncounter.id, causeOfDeath));
    setShowDeathModal(false);
    setCauseOfDeath('');
    setSelectedEncounter(null);
  };

  return (
    <div className="tab-content p-4 pb-20 space-y-6">
      {/* Party */}
      <div>
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Party ({teamEncounters.length}/6)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {teamEncounters.map((enc) => (
            <PokemonCard
              key={enc.id}
              encounter={enc}
              location="team"
              onTap={() => handleSelectPokemon(enc, 'team')}
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
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={getSpriteUrl(selectedEncounter.pokemonId)}
                alt={selectedEncounter.nickname}
                className="w-20 h-20 pixelated"
              />
              <div>
                <p className="font-bold text-lg">{selectedEncounter.nickname}</p>
                <p className="text-zinc-400">Lv.{selectedEncounter.level}</p>
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

            {/* Move actions */}
            <div className="flex gap-2">
              {selectedLocation === 'box' && run.team.length < 6 && (
                <button
                  onClick={handleMoveToParty}
                  className="flex-1 rounded-lg bg-emerald-600 py-2.5 font-medium hover:bg-emerald-500 transition-colors"
                >
                  Move to Party
                </button>
              )}
              {selectedLocation === 'team' && (
                <button
                  onClick={handleMoveToBox}
                  className="flex-1 rounded-lg bg-zinc-600 py-2.5 font-medium hover:bg-zinc-500 transition-colors"
                >
                  Move to Box
                </button>
              )}
            </div>

            {/* Mark dead */}
            <button
              onClick={() => setShowDeathModal(true)}
              className="w-full rounded-lg bg-red-600/20 py-2.5 font-medium text-red-400 hover:bg-red-600/30 border border-red-600/30 transition-colors"
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
        <div className="space-y-4">
          <p className="text-zinc-400">
            <span className="font-bold text-white">{selectedEncounter?.nickname}</span> has fallen.
            What happened?
          </p>
          <textarea
            value={causeOfDeath}
            onChange={(e) => setCauseOfDeath(e.target.value)}
            placeholder="e.g., Misty's Starmie, Water Pulse crit"
            rows={3}
            className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-red-500 resize-none"
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
              className="flex-1 rounded-lg bg-red-600 py-2.5 font-medium hover:bg-red-500 transition-colors"
            >
              Confirm Death
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
