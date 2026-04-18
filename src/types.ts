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
  causeOfDeath?: string;
  caughtAt: string;
  diedAt?: string;
}

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
