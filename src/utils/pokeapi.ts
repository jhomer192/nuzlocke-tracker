import type { PokemonData } from '../types';
import { getCachedPokemon, savePokemonToCache } from './storage';

// Full list of Gen 1-3 Pokemon names for autocomplete (national dex 1-386)
let pokemonList: { id: number; name: string }[] = [];
let listLoaded = false;

export async function loadPokemonList(): Promise<{ id: number; name: string }[]> {
  if (listLoaded) return pokemonList;

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    const data = await res.json();
    pokemonList = data.results.map((p: { name: string }, i: number) => ({
      id: i + 1,
      name: p.name,
    }));
    listLoaded = true;
  } catch {
    // Fallback: return empty list, user can still type
    pokemonList = [];
  }
  return pokemonList;
}

export function searchPokemon(query: string): { id: number; name: string }[] {
  if (!query || query.length < 2) return [];
  const lower = query.toLowerCase();
  return pokemonList
    .filter((p) => p.name.includes(lower))
    .slice(0, 10);
}

export async function fetchPokemonData(idOrName: number | string): Promise<PokemonData | null> {
  // Check cache first
  if (typeof idOrName === 'number') {
    const cached = getCachedPokemon(idOrName);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    if (!res.ok) return null;
    const data = await res.json();

    const pokemon: PokemonData = {
      id: data.id,
      name: data.name,
      types: data.types.map((t: { type: { name: string } }) => t.type.name),
      sprite: data.sprites?.versions?.['generation-iii']?.['firered-leafgreen']?.front_default
        ?? data.sprites.front_default
        ?? '',
      stats: {
        hp: data.stats[0].base_stat,
        atk: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        spa: data.stats[3].base_stat,
        spd: data.stats[4].base_stat,
        spe: data.stats[5].base_stat,
      },
    };

    savePokemonToCache(pokemon);
    return pokemon;
  } catch {
    return null;
  }
}

/**
 * Get the best pixel sprite URL for a Pokemon.
 * Normal sprites use generation-appropriate pixel art.
 * Shiny sprites use the default shiny set (available for all Pokemon).
 */
export function getSpriteUrl(pokemonId: number, shiny = false): string {
  const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  if (shiny) {
    return `${base}/shiny/${pokemonId}.png`;
  }
  if (pokemonId <= 151) {
    return `${base}/versions/generation-iii/firered-leafgreen/${pokemonId}.png`;
  }
  if (pokemonId <= 251) {
    return `${base}/versions/generation-ii/crystal/transparent/${pokemonId}.png`;
  }
  if (pokemonId <= 386) {
    return `${base}/versions/generation-iii/emerald/${pokemonId}.png`;
  }
  return `${base}/${pokemonId}.png`;
}
