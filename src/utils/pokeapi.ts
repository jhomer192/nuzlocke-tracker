import type { PokemonData, MoveData } from '../types';
import { getCachedPokemon, savePokemonToCache, getCachedMove, saveMoveToCache } from './storage';

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
  // Check cache first (re-fetch if missing new fields like abilities)
  if (typeof idOrName === 'number') {
    const cached = getCachedPokemon(idOrName);
    if (cached && cached.abilities) return cached;
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
      abilities: data.abilities.map(
        (a: { ability: { name: string }; is_hidden: boolean }) =>
          a.is_hidden ? `${a.ability.name} (Hidden)` : a.ability.name
      ),
    };

    // Fetch evolution data
    try {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
      if (speciesRes.ok) {
        const speciesData = await speciesRes.json();
        const evoChainUrl = speciesData.evolution_chain?.url;
        if (evoChainUrl) {
          const evoRes = await fetch(evoChainUrl);
          if (evoRes.ok) {
            const evoData = await evoRes.json();
            pokemon.evolvesTo = findEvolutions(evoData.chain, data.name);
          }
        }
      }
    } catch {
      // Evolution data is nice-to-have, not critical
    }

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

/** Parse an evolution chain to find what the given Pokemon evolves into */
function findEvolutions(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chain: any,
  currentName: string
): PokemonData['evolvesTo'] {
  // BFS through the chain to find the current pokemon, then return its evolvesTo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queue: any[] = [chain];
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node.species.name === currentName) {
      if (!node.evolves_to || node.evolves_to.length === 0) return undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return node.evolves_to.map((evo: any) => {
        const detail = evo.evolution_details?.[0];
        let method = 'Unknown';
        let level: number | undefined;

        if (detail) {
          if (detail.trigger?.name === 'level-up') {
            if (detail.min_level) {
              method = `Level ${detail.min_level}`;
              level = detail.min_level;
            } else if (detail.min_happiness) {
              method = 'Friendship';
            } else if (detail.known_move) {
              method = `Knows ${detail.known_move.name}`;
            } else if (detail.time_of_day) {
              method = `Level up (${detail.time_of_day})`;
            } else {
              method = 'Level up';
            }
          } else if (detail.trigger?.name === 'use-item') {
            const itemName = detail.item?.name?.replace(/-/g, ' ') ?? 'item';
            method = itemName.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          } else if (detail.trigger?.name === 'trade') {
            method = detail.held_item
              ? `Trade holding ${detail.held_item.name.replace(/-/g, ' ')}`
              : 'Trade';
          } else if (detail.trigger?.name) {
            method = detail.trigger.name.replace(/-/g, ' ');
          }
        }

        // Extract dex ID from species URL
        const urlParts = evo.species.url.split('/').filter(Boolean);
        const speciesId = parseInt(urlParts[urlParts.length - 1], 10);

        return {
          name: evo.species.name,
          id: speciesId,
          method,
          level,
        };
      });
    }
    if (node.evolves_to) {
      queue.push(...node.evolves_to);
    }
  }
  return undefined;
}

/** Full cached move list for autocomplete */
let moveList: { name: string; type?: string }[] = [];
let moveListLoaded = false;

const MOVE_LIST_CACHE_KEY = 'nuzlocke_move_list';
const MOVE_LIST_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 1 week

export async function loadMoveList(): Promise<{ name: string; type?: string }[]> {
  if (moveListLoaded && moveList.length > 0) return moveList;

  // Try localStorage cache first
  try {
    const cached = localStorage.getItem(MOVE_LIST_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.timestamp && Date.now() - parsed.timestamp < MOVE_LIST_CACHE_TTL && parsed.data?.length > 0) {
        moveList = parsed.data;
        moveListLoaded = true;
        return moveList;
      }
    }
  } catch {
    // Cache miss, fetch from API
  }

  try {
    const res = await fetch('https://pokeapi.co/api/v2/move?limit=1000');
    const data = await res.json();
    moveList = data.results.map((m: { name: string; url: string }) => ({
      name: m.name,
    }));
    moveListLoaded = true;

    // Cache to localStorage
    try {
      localStorage.setItem(MOVE_LIST_CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: moveList,
      }));
    } catch {
      // localStorage full, no big deal
    }
  } catch {
    moveList = [];
  }
  return moveList;
}

export function searchMoves(query: string): { name: string; type?: string }[] {
  if (!query || query.length < 2) return [];
  const lower = query.toLowerCase().replace(/\s+/g, '-');
  return moveList
    .filter((m) => m.name.includes(lower))
    .slice(0, 5);
}

/** Fetch move data from PokeAPI with localStorage caching */
export async function fetchMoveData(name: string): Promise<MoveData | null> {
  if (!name.trim()) return null;

  const normalized = name.trim().toLowerCase().replace(/\s+/g, '-');

  // Check cache
  const cached = getCachedMove(normalized);
  if (cached) return cached;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${normalized}`);
    if (!res.ok) return null;
    const data = await res.json();

    const move: MoveData = {
      name: data.name,
      type: data.type.name,
      power: data.power,
      accuracy: data.accuracy,
      damageClass: data.damage_class.name as MoveData['damageClass'],
    };

    saveMoveToCache(move);
    return move;
  } catch {
    return null;
  }
}
