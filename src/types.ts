export type Game =
  | 'RED_BLUE'
  | 'GOLD_SILVER'
  | 'RUBY_SAPPHIRE'
  | 'EMERALD'
  | 'FIRERED_LEAFGREEN'
  | 'DIAMOND_PEARL'
  | 'PLATINUM'
  | 'HEARTGOLD_SOULSILVER'
  | 'BLACK_WHITE'
  | 'BLACK2_WHITE2'
  | 'X_Y'
  | 'OMEGA_RUBY_ALPHA_SAPPHIRE'
  | 'SUN_MOON'
  | 'ULTRA_SUN_ULTRA_MOON'
  | 'SWORD_SHIELD'
  | 'BRILLIANT_DIAMOND_SHINING_PEARL'
  | 'LEGENDS_ARCEUS'
  | 'SCARLET_VIOLET'
  | 'CUSTOM';

export interface RuleSet {
  duplicateClause: boolean;
  shinyClause: boolean;
  levelCap: boolean;
  soulLink: boolean;
}

export interface Run {
  id: string;
  name: string;
  game: Game;
  customGameId?: string; // references a CustomGameDef when game === 'CUSTOM'
  rules: RuleSet;
  status: 'active' | 'won' | 'wiped';
  startedAt: string;
  badges: boolean[];
  encounters: Encounter[];
  team: string[];
  box: string[];
  graveyard: string[];
  defeatedBosses?: string[];
}

export interface Encounter {
  id: string;
  route: string;
  pokemonId: number;
  nickname: string;
  status: 'alive' | 'dead' | 'missed';
  level: number;
  isShiny?: boolean;
  isGift?: boolean;              // gift Pokemon (starter, in-game trade, etc.) - doesn't consume route encounter
  causeOfDeath?: string;
  caughtAt: string;
  diedAt?: string;
  moves?: string[]; // up to 4 move names
  linkedPokemonId?: number;      // partner's Pokemon national dex ID (soul link)
  linkedNickname?: string;       // partner's nickname for their Pokemon (soul link)
  linkedOnPartnerTeam?: boolean; // is partner's linked Pokemon on their active team? (soul link)
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
  EMERALD: {
    'Pre-Roxanne': 15,
    'Pre-Brawly': 19,
    'Pre-Wattson': 24,
    'Pre-Flannery': 29,
    'Pre-Norman': 31,
    'Pre-Winona': 33,
    'Pre-Tate & Liza': 42,
    'Pre-Juan': 46,
    'Pre-Elite Four': 58,
  },
  FIRERED_LEAFGREEN: {
    'Pre-Brock': 14,
    'Pre-Misty': 21,
    'Pre-Lt. Surge': 24,
    'Pre-Erika': 29,
    'Pre-Koga': 43,
    'Pre-Sabrina': 43,
    'Pre-Blaine': 47,
    'Pre-Giovanni': 50,
    'Pre-Elite Four': 63,
  },
  DIAMOND_PEARL: {
    'Pre-Roark': 14,
    'Pre-Gardenia': 22,
    'Pre-Maylene': 30,
    'Pre-Crasher Wake': 30,
    'Pre-Fantina': 36,
    'Pre-Byron': 39,
    'Pre-Candice': 42,
    'Pre-Volkner': 49,
    'Pre-Elite Four': 66,
  },
  PLATINUM: {
    'Pre-Roark': 14,
    'Pre-Gardenia': 22,
    'Pre-Fantina': 26,
    'Pre-Maylene': 32,
    'Pre-Crasher Wake': 37,
    'Pre-Byron': 39,
    'Pre-Candice': 42,
    'Pre-Volkner': 49,
    'Pre-Elite Four': 66,
  },
  HEARTGOLD_SOULSILVER: {
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
  BLACK_WHITE: {
    'Pre-Cilan/Chili/Cress': 14,
    'Pre-Lenora': 20,
    'Pre-Burgh': 24,
    'Pre-Elesa': 27,
    'Pre-Clay': 31,
    'Pre-Skyla': 35,
    'Pre-Brycen': 39,
    'Pre-Drayden/Iris': 43,
    'Pre-Elite Four': 50,
  },
  BLACK2_WHITE2: {
    'Pre-Cheren': 13,
    'Pre-Roxie': 18,
    'Pre-Burgh': 24,
    'Pre-Elesa': 29,
    'Pre-Clay': 33,
    'Pre-Skyla': 37,
    'Pre-Drayden': 46,
    'Pre-Marlon': 49,
    'Pre-Elite Four': 57,
  },
  X_Y: {
    'Pre-Viola': 12,
    'Pre-Grant': 25,
    'Pre-Korrina': 32,
    'Pre-Ramos': 34,
    'Pre-Clemont': 37,
    'Pre-Valerie': 42,
    'Pre-Olympia': 48,
    'Pre-Wulfric': 56,
    'Pre-Elite Four': 65,
  },
  OMEGA_RUBY_ALPHA_SAPPHIRE: {
    'Pre-Roxanne': 15,
    'Pre-Brawly': 19,
    'Pre-Wattson': 24,
    'Pre-Flannery': 29,
    'Pre-Norman': 31,
    'Pre-Winona': 33,
    'Pre-Tate & Liza': 45,
    'Pre-Wallace': 46,
    'Pre-Elite Four': 59,
  },
  SUN_MOON: {
    'Pre-Ilima': 12,
    'Pre-Hala': 15,
    'Pre-Lana': 24,
    'Pre-Kiawe': 26,
    'Pre-Mallow': 24,
    'Pre-Olivia': 27,
    'Pre-Sophocles': 33,
    'Pre-Acerola': 35,
    'Pre-Vast Poni': 49,
    'Pre-Elite Four': 56,
  },
  ULTRA_SUN_ULTRA_MOON: {
    'Pre-Ilima': 12,
    'Pre-Hala': 15,
    'Pre-Lana': 24,
    'Pre-Kiawe': 26,
    'Pre-Mallow': 24,
    'Pre-Olivia': 27,
    'Pre-Sophocles': 33,
    'Pre-Acerola': 35,
    'Pre-Vast Poni': 49,
    'Pre-Elite Four': 60,
  },
  SWORD_SHIELD: {
    'Pre-Milo': 20,
    'Pre-Nessa': 24,
    'Pre-Kabu': 27,
    'Pre-Bea/Allister': 36,
    'Pre-Opal': 38,
    'Pre-Gordie/Melony': 42,
    'Pre-Piers': 46,
    'Pre-Raihan': 48,
    'Pre-Champion Cup': 65,
  },
  BRILLIANT_DIAMOND_SHINING_PEARL: {
    'Pre-Roark': 14,
    'Pre-Gardenia': 22,
    'Pre-Maylene': 30,
    'Pre-Crasher Wake': 30,
    'Pre-Fantina': 36,
    'Pre-Byron': 39,
    'Pre-Candice': 42,
    'Pre-Volkner': 49,
    'Pre-Elite Four': 66,
  },
  LEGENDS_ARCEUS: {
    'Pre-Kleavor': 18,
    'Pre-Lilligant': 30,
    'Pre-Arcanine': 36,
    'Pre-Electrode': 46,
    'Pre-Avalugg': 56,
    'Pre-Dialga/Palkia': 65,
  },
  SCARLET_VIOLET: {
    'Pre-Katy': 15,
    'Pre-Brassius': 17,
    'Pre-Iono': 24,
    'Pre-Kofu': 30,
    'Pre-Larry': 36,
    'Pre-Ryme': 42,
    'Pre-Tulip': 45,
    'Pre-Grusha': 48,
    'Pre-Elite Four': 62,
  },
  CUSTOM: {},
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
  abilities?: string[];
  evolvesTo?: { name: string; id: number; method: string; level?: number }[];
}

export interface MoveData {
  name: string;
  type: string;
  power: number | null;
  accuracy: number | null;
  damageClass: 'physical' | 'special' | 'status';
}

export interface CustomBoss {
  name: string;          // "Gym Leader Aria"
  segment: string;       // "Pre-Aria"
  pokemon: Array<{
    name: string;        // "Gardevoir"
    level: number;       // 45
    types: string;       // "psychic, fairy"
  }>;
  levelCap?: number;     // the ace's level
}

export interface CustomGameDef {
  id: string;
  name: string;
  generation: number;
  badgeCount: number;
  badgeNames: string[];
  routes: GameLocation[];
  bosses?: CustomBoss[];
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
  EMERALD: 'Emerald',
  FIRERED_LEAFGREEN: 'FireRed / LeafGreen',
  DIAMOND_PEARL: 'Diamond / Pearl',
  PLATINUM: 'Platinum',
  HEARTGOLD_SOULSILVER: 'HeartGold / SoulSilver',
  BLACK_WHITE: 'Black / White',
  BLACK2_WHITE2: 'Black 2 / White 2',
  X_Y: 'X / Y',
  OMEGA_RUBY_ALPHA_SAPPHIRE: 'Omega Ruby / Alpha Sapphire',
  SUN_MOON: 'Sun / Moon',
  ULTRA_SUN_ULTRA_MOON: 'Ultra Sun / Ultra Moon',
  SWORD_SHIELD: 'Sword / Shield',
  BRILLIANT_DIAMOND_SHINING_PEARL: 'Brilliant Diamond / Shining Pearl',
  LEGENDS_ARCEUS: 'Legends: Arceus',
  SCARLET_VIOLET: 'Scarlet / Violet',
  CUSTOM: 'Custom / Fan Game',
};

export const GAME_GENERATIONS: Record<Game, number> = {
  RED_BLUE: 1,
  GOLD_SILVER: 2,
  RUBY_SAPPHIRE: 3,
  EMERALD: 3,
  FIRERED_LEAFGREEN: 3,
  DIAMOND_PEARL: 4,
  PLATINUM: 4,
  HEARTGOLD_SOULSILVER: 4,
  BLACK_WHITE: 5,
  BLACK2_WHITE2: 5,
  X_Y: 6,
  OMEGA_RUBY_ALPHA_SAPPHIRE: 6,
  SUN_MOON: 7,
  ULTRA_SUN_ULTRA_MOON: 7,
  SWORD_SHIELD: 8,
  BRILLIANT_DIAMOND_SHINING_PEARL: 8,
  LEGENDS_ARCEUS: 8,
  SCARLET_VIOLET: 9,
  CUSTOM: 6, // default to gen 6 for custom; overridden by CustomGameDef.generation
};

export const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
] as const;

export type PokemonType = typeof ALL_TYPES[number];
