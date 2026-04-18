import type { Run, PokemonData } from '../types';

const RUNS_KEY = 'nuzlocke_runs';
const POKEMON_CACHE_KEY = 'pokeapi_cache';

export function loadRuns(): Run[] {
  try {
    const raw = localStorage.getItem(RUNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRuns(runs: Run[]): void {
  localStorage.setItem(RUNS_KEY, JSON.stringify(runs));
}

export function loadPokemonCache(): Record<number, PokemonData> {
  try {
    const raw = localStorage.getItem(POKEMON_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function savePokemonToCache(pokemon: PokemonData): void {
  const cache = loadPokemonCache();
  cache[pokemon.id] = pokemon;
  localStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(cache));
}

export function getCachedPokemon(id: number): PokemonData | null {
  const cache = loadPokemonCache();
  return cache[id] ?? null;
}
