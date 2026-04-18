import { useState, useEffect, useRef, useCallback } from 'react';
import { searchPokemon, fetchPokemonData, loadPokemonList, getSpriteUrl } from '../utils/pokeapi';
import type { PokemonData } from '../types';
import { TypeBadge } from './TypeBadge';

interface PokemonSearchProps {
  onSelect: (pokemon: PokemonData) => void;
  placeholder?: string;
}

export function PokemonSearch({ onSelect, placeholder = 'Search Pokemon...' }: PokemonSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [listReady, setListReady] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPokemonList().then(() => setListReady(true));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (value.length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      debounceRef.current = setTimeout(() => {
        const matches = searchPokemon(value);
        setResults(matches);
        setShowDropdown(matches.length > 0);
      }, 300);
    },
    []
  );

  const handleSelect = async (item: { id: number; name: string }) => {
    setLoading(true);
    setShowDropdown(false);
    setQuery(item.name);
    const data = await fetchPokemonData(item.id);
    if (data) {
      setSelectedPreview(data);
      onSelect(data);
    }
    setLoading(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        placeholder={listReady ? placeholder : 'Loading Pokemon list...'}
        className="w-full rounded-lg bg-zinc-700 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        disabled={!listReady}
      />
      {loading && (
        <div className="absolute right-3 top-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-500 border-t-emerald-400" />
        </div>
      )}

      {showDropdown && (
        <div className="absolute z-30 mt-1 w-full rounded-lg bg-zinc-700 shadow-xl border border-zinc-600 max-h-64 overflow-y-auto">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => handleSelect(r)}
              className="flex items-center gap-3 w-full px-4 py-2 hover:bg-zinc-600 transition-colors text-left"
            >
              <img
                src={getSpriteUrl(r.id)}
                alt={r.name}
                className="w-10 h-10 pixelated"
                loading="lazy"
              />
              <span className="capitalize font-medium">{r.name}</span>
              <span className="text-zinc-400 text-sm">#{r.id}</span>
            </button>
          ))}
        </div>
      )}

      {selectedPreview && (
        <div className="mt-3 flex items-center gap-4 rounded-lg bg-zinc-700/50 p-3">
          <img
            src={selectedPreview.sprite || getSpriteUrl(selectedPreview.id)}
            alt={selectedPreview.name}
            className="w-16 h-16 pixelated"
          />
          <div>
            <p className="font-bold capitalize text-lg">{selectedPreview.name}</p>
            <div className="flex gap-1.5 mt-1">
              {selectedPreview.types.map((t) => (
                <TypeBadge key={t} type={t} small />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
