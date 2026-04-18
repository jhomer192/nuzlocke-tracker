export type Game = 'RED_BLUE' | 'GOLD_SILVER' | 'RUBY_SAPPHIRE';

export interface RuleSet {
  duplicateClause: boolean;
  shinyClause: boolean;
  levelCap: boolean;
}

export interface Run {
  id: string;
  name: string;
  game: Game;
  rules: RuleSet;
  status: 'active' | 'won' | 'wiped';
  startedAt: string;
  badges: boolean[];
  encounters: Encounter[];
  team: string[];
  box: string[];
  graveyard: string[];
}

export interface Encounter {
  id: string;
  route: string;
  pokemonId: number;
  nickname: string;
  status: 'alive' | 'dead' | 'missed';
  level: number;
  isShiny?: boolean;
  causeOfDeath?: string;
  caughtAt: string;
  diedAt?: string;
}

// Level caps per gym for each game (ace Pokemon level)
export const LEVEL_CAPS: Record<Game, Record<string, number>> = {
  RED_BLUE: {
    'Pre-Brock': 14,
    'Pre-Misty': 21,
    'Pre-Lt. Surge': 24,
    'Pre-Erika': 29,
    'Pre-Koga': 43,
    'Pre-Sabrina': 43,
    'Pre-Blaine': 47,
    'Pre-Giovanni': 50,
    'Pre-Elite Four': 65,
  },
  GOLD_SILVER: {
    'Pre-Falkner': 13,
    'Pre-Bugsy': 17,
    'Pre-Whitney': 20,
    'Pre-Morty': 25,
    'Pre-Chuck': 31,
    'Pre-Jasmine': 35,
    'Pre-Pryce': 34,
    'Pre-Clair': 41,
    'Pre-Elite Four': 50,
  },
  RUBY_SAPPHIRE: {
    'Pre-Roxanne': 15,
    'Pre-Brawly': 19,
    'Pre-Wattson': 24,
    'Pre-Flannery': 29,
    'Pre-Norman': 31,
    'Pre-Winona': 33,
    'Pre-Tate & Liza': 42,
    'Pre-Wallace': 43,
    'Pre-Elite Four': 58,
  },
};

export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
}

export interface GameLocation {
  key: string;
  name: string;
  segment: string;
}

export const GAME_NAMES: Record<Game, string> = {
  RED_BLUE: 'Red / Blue',
  GOLD_SILVER: 'Gold / Silver',
  RUBY_SAPPHIRE: 'Ruby / Sapphire',
};

export const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
] as const;

export type PokemonType = typeof ALL_TYPES[number];
