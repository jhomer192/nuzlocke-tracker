import type { Run, PokemonData, MoveData, CustomGameDef } from '../types';

const RUNS_KEY = 'nuzlocke_runs';
const POKEMON_CACHE_KEY = 'pokeapi_cache';
const MOVE_CACHE_KEY = 'pokeapi_move_cache';
const CUSTOM_GAMES_KEY = 'nuzlocke:custom-games';

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

// Move data caching
export function getCachedMove(name: string): MoveData | null {
  try {
    const raw = localStorage.getItem(MOVE_CACHE_KEY);
    const cache: Record<string, MoveData> = raw ? JSON.parse(raw) : {};
    return cache[name] ?? null;
  } catch {
    return null;
  }
}

export function saveMoveToCache(move: MoveData): void {
  try {
    const raw = localStorage.getItem(MOVE_CACHE_KEY);
    const cache: Record<string, MoveData> = raw ? JSON.parse(raw) : {};
    cache[move.name] = move;
    localStorage.setItem(MOVE_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage full or other issue -- non-critical
  }
}

// Custom game definitions
export function loadCustomGames(): CustomGameDef[] {
  try {
    const raw = localStorage.getItem(CUSTOM_GAMES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomGames(games: CustomGameDef[]): void {
  localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(games));
}

export function getCustomGame(id: string): CustomGameDef | null {
  return loadCustomGames().find((g) => g.id === id) ?? null;
}
