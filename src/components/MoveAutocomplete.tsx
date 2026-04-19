import { useState, useEffect, useRef, useCallback } from 'react';
import { searchMoves, loadMoveList, fetchMoveData } from '../utils/pokeapi';
import { TypeBadge } from './TypeBadge';

interface MoveAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (moveName: string) => void;
  placeholder?: string;
}

export function MoveAutocomplete({ value, onChange, onSelect, placeholder }: MoveAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<{ name: string; type?: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [moveTypes, setMoveTypes] = useState<Map<string, string>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load move list on mount
  useEffect(() => {
    loadMoveList();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Filter suggestions when value changes
  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }
    const results = searchMoves(value);
    setSuggestions(results);

    // Fetch type data for each suggestion
    results.forEach(async (r) => {
      if (moveTypes.has(r.name)) return;
      const data = await fetchMoveData(r.name);
      if (data) {
        setMoveTypes((prev) => {
          const next = new Map(prev);
          next.set(r.name, data.type);
          return next;
        });
      }
    });
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setOpen(true);
  }, [onChange]);

  const handleSelect = useCallback((moveName: string) => {
    // Display name: replace hyphens with spaces, title case
    const display = moveName.replace(/-/g, ' ');
    onChange(display);
    onSelect(moveName);
    setOpen(false);
  }, [onChange, onSelect]);

  return (
    <div ref={containerRef} className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInput}
        onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
        placeholder={placeholder}
        className="w-full rounded-lg bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 rounded-lg bg-zinc-800 border border-zinc-600 shadow-xl overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s.name}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(s.name)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              <span className="flex-1 capitalize">{s.name.replace(/-/g, ' ')}</span>
              {moveTypes.get(s.name) && (
                <TypeBadge type={moveTypes.get(s.name)!} small />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
