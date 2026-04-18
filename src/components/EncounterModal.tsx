import { useState } from 'react';
import { Modal } from './Modal';
import { PokemonSearch } from './PokemonSearch';
import type { PokemonData, Encounter } from '../types';
import { generateId } from '../utils/id';

interface EncounterModalProps {
  open: boolean;
  onClose: () => void;
  routeName: string;
  routeKey: string;
  existingEncounter?: Encounter;
  onSave: (encounter: Encounter) => void;
}

export function EncounterModal({
  open,
  onClose,
  routeName,
  routeKey,
  existingEncounter,
  onSave,
}: EncounterModalProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [nickname, setNickname] = useState(existingEncounter?.nickname ?? '');
  const [level, setLevel] = useState(existingEncounter?.level ?? 5);
  const [status, setStatus] = useState<'alive' | 'missed'>(
    existingEncounter?.status === 'missed' ? 'missed' : 'alive'
  );

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
      caughtAt: existingEncounter?.caughtAt ?? new Date().toISOString(),
    };
    onSave(encounter);
    onClose();
  };

  const canSave = selectedPokemon || existingEncounter;

  return (
    <Modal open={open} onClose={onClose} title={routeName}>
      <div className="space-y-4">
        {!existingEncounter && (
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Pokemon</label>
            <PokemonSearch onSelect={setSelectedPokemon} />
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
