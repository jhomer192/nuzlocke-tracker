import type { Game, CustomBoss } from '../types';
import { getCustomGame } from '../utils/storage';

export interface BossPokemon {
  name: string;
  id: number;       // national dex
  level: number;
  types: string[];
  moves: string[];
  ability?: string;
  item?: string;
}

export interface BossEntry {
  name: string;
  segment: string;   // matches route segment like "Pre-Brock"
  pokemon: BossPokemon[];
}

// ── Red / Blue ─────────────────────────────────────────────────────────────

const RED_BLUE_BOSSES: BossEntry[] = [
  // Rival battles (assuming player chose Squirtle, so Blue has Bulbasaur line)
  {
    name: 'Rival (Route 22)',
    segment: 'Pre-Brock',
    pokemon: [
      { name: 'Bulbasaur', id: 1, level: 5, types: ['grass', 'poison'], moves: ['Tackle', 'Growl'] },
    ],
  },
  {
    name: 'Rival (Cerulean City)',
    segment: 'Pre-Misty',
    pokemon: [
      { name: 'Pidgeotto', id: 17, level: 17, types: ['normal', 'flying'], moves: ['Gust', 'Sand Attack', 'Quick Attack'] },
      { name: 'Raticate', id: 20, level: 15, types: ['normal'], moves: ['Tackle', 'Tail Whip', 'Quick Attack', 'Hyper Fang'] },
      { name: 'Abra', id: 63, level: 16, types: ['psychic'], moves: ['Teleport'] },
      { name: 'Ivysaur', id: 2, level: 18, types: ['grass', 'poison'], moves: ['Tackle', 'Leech Seed', 'Vine Whip'] },
    ],
  },
  {
    name: 'Rival (S.S. Anne)',
    segment: 'Pre-Lt. Surge',
    pokemon: [
      { name: 'Pidgeotto', id: 17, level: 19, types: ['normal', 'flying'], moves: ['Gust', 'Sand Attack', 'Quick Attack'] },
      { name: 'Raticate', id: 20, level: 18, types: ['normal'], moves: ['Tackle', 'Tail Whip', 'Quick Attack', 'Hyper Fang'] },
      { name: 'Kadabra', id: 64, level: 20, types: ['psychic'], moves: ['Confusion', 'Disable'] },
      { name: 'Ivysaur', id: 2, level: 22, types: ['grass', 'poison'], moves: ['Tackle', 'Leech Seed', 'Vine Whip', 'PoisonPowder'] },
    ],
  },
  {
    name: 'Rival (Pokemon Tower)',
    segment: 'Pre-Erika',
    pokemon: [
      { name: 'Pidgeotto', id: 17, level: 23, types: ['normal', 'flying'], moves: ['Gust', 'Sand Attack', 'Quick Attack', 'Whirlwind'] },
      { name: 'Growlithe', id: 58, level: 22, types: ['fire'], moves: ['Bite', 'Roar', 'Ember', 'Leer'] },
      { name: 'Exeggcute', id: 102, level: 22, types: ['grass', 'psychic'], moves: ['Barrage', 'Hypnosis', 'Reflect'] },
      { name: 'Kadabra', id: 64, level: 20, types: ['psychic'], moves: ['Confusion', 'Disable', 'Psybeam'] },
      { name: 'Ivysaur', id: 2, level: 25, types: ['grass', 'poison'], moves: ['Vine Whip', 'PoisonPowder', 'Razor Leaf', 'Leech Seed'] },
    ],
  },
  {
    name: 'Rival (Silph Co.)',
    segment: 'Pre-Sabrina',
    pokemon: [
      { name: 'Pidgeot', id: 18, level: 37, types: ['normal', 'flying'], moves: ['Wing Attack', 'Quick Attack', 'Whirlwind', 'Mirror Move'] },
      { name: 'Growlithe', id: 58, level: 35, types: ['fire'], moves: ['Ember', 'Leer', 'Take Down', 'Agility'] },
      { name: 'Exeggcute', id: 102, level: 38, types: ['grass', 'psychic'], moves: ['Barrage', 'Hypnosis', 'Reflect', 'Leech Seed'] },
      { name: 'Alakazam', id: 65, level: 35, types: ['psychic'], moves: ['Psybeam', 'Recover', 'Psychic', 'Reflect'] },
      { name: 'Venusaur', id: 3, level: 37, types: ['grass', 'poison'], moves: ['Razor Leaf', 'PoisonPowder', 'Sleep Powder', 'Growth'] },
    ],
  },
  {
    name: 'Brock',
    segment: 'Pre-Brock',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Tackle', 'Defense Curl'] },
      { name: 'Onix', id: 95, level: 14, types: ['rock', 'ground'], moves: ['Tackle', 'Screech', 'Bide', 'Bind'] },
    ],
  },
  {
    name: 'Misty',
    segment: 'Pre-Misty',
    pokemon: [
      { name: 'Staryu', id: 120, level: 18, types: ['water'], moves: ['Tackle', 'Water Gun', 'Harden', 'BubbleBeam'] },
      { name: 'Starmie', id: 121, level: 21, types: ['water', 'psychic'], moves: ['Tackle', 'Water Gun', 'Harden', 'BubbleBeam'] },
    ],
  },
  {
    name: 'Lt. Surge',
    segment: 'Pre-Lt. Surge',
    pokemon: [
      { name: 'Voltorb', id: 100, level: 21, types: ['electric'], moves: ['Tackle', 'Screech', 'SonicBoom'] },
      { name: 'Pikachu', id: 25, level: 18, types: ['electric'], moves: ['Thunder Wave', 'Quick Attack', 'Thunderbolt'] },
      { name: 'Raichu', id: 26, level: 24, types: ['electric'], moves: ['Thunder Wave', 'Thunderbolt', 'Mega Punch', 'Mega Kick'] },
    ],
  },
  {
    name: 'Erika',
    segment: 'Pre-Erika',
    pokemon: [
      { name: 'Victreebel', id: 71, level: 29, types: ['grass', 'poison'], moves: ['Razor Leaf', 'PoisonPowder', 'Sleep Powder', 'Wrap'] },
      { name: 'Tangela', id: 114, level: 24, types: ['grass'], moves: ['Constrict', 'Bind', 'Mega Drain'] },
      { name: 'Vileplume', id: 45, level: 29, types: ['grass', 'poison'], moves: ['Petal Dance', 'PoisonPowder', 'Sleep Powder', 'Mega Drain'] },
    ],
  },
  {
    name: 'Koga',
    segment: 'Pre-Koga',
    pokemon: [
      { name: 'Koffing', id: 109, level: 37, types: ['poison'], moves: ['Tackle', 'SmokeScreen', 'Sludge', 'Self-Destruct'] },
      { name: 'Muk', id: 89, level: 39, types: ['poison'], moves: ['Pound', 'Minimize', 'Sludge', 'Toxic'] },
      { name: 'Koffing', id: 109, level: 37, types: ['poison'], moves: ['Tackle', 'SmokeScreen', 'Sludge', 'Self-Destruct'] },
      { name: 'Weezing', id: 110, level: 43, types: ['poison'], moves: ['Tackle', 'SmokeScreen', 'Sludge', 'Self-Destruct'] },
    ],
  },
  {
    name: 'Sabrina',
    segment: 'Pre-Sabrina',
    pokemon: [
      { name: 'Kadabra', id: 64, level: 38, types: ['psychic'], moves: ['Psybeam', 'Recover', 'Kinesis', 'Psychic'] },
      { name: 'Mr. Mime', id: 122, level: 37, types: ['psychic'], moves: ['Confusion', 'Barrier', 'Light Screen', 'DoubleSlap'] },
      { name: 'Venomoth', id: 49, level: 38, types: ['bug', 'poison'], moves: ['PoisonPowder', 'Leech Life', 'Stun Spore', 'Psybeam'] },
      { name: 'Alakazam', id: 65, level: 43, types: ['psychic'], moves: ['Psybeam', 'Recover', 'Kinesis', 'Psychic'] },
    ],
  },
  {
    name: 'Blaine',
    segment: 'Pre-Blaine',
    pokemon: [
      { name: 'Growlithe', id: 58, level: 42, types: ['fire'], moves: ['Ember', 'Leer', 'Take Down', 'Agility'] },
      { name: 'Ponyta', id: 77, level: 40, types: ['fire'], moves: ['Tail Whip', 'Stomp', 'Growl', 'Fire Spin'] },
      { name: 'Rapidash', id: 78, level: 42, types: ['fire'], moves: ['Tail Whip', 'Stomp', 'Growl', 'Fire Spin'] },
      { name: 'Arcanine', id: 59, level: 47, types: ['fire'], moves: ['Ember', 'Fire Blast', 'Take Down', 'Agility'] },
    ],
  },
  {
    name: 'Giovanni',
    segment: 'Pre-Giovanni',
    pokemon: [
      { name: 'Rhyhorn', id: 111, level: 45, types: ['ground', 'rock'], moves: ['Stomp', 'Tail Whip', 'Fury Attack', 'Horn Drill'] },
      { name: 'Dugtrio', id: 51, level: 42, types: ['ground'], moves: ['Dig', 'Sand Attack', 'Slash', 'Earthquake'] },
      { name: 'Nidoqueen', id: 31, level: 44, types: ['poison', 'ground'], moves: ['Scratch', 'Tail Whip', 'Body Slam', 'Earthquake'] },
      { name: 'Nidoking', id: 34, level: 45, types: ['poison', 'ground'], moves: ['Tackle', 'Poison Sting', 'Thrash', 'Earthquake'] },
      { name: 'Rhydon', id: 112, level: 50, types: ['ground', 'rock'], moves: ['Stomp', 'Tail Whip', 'Fury Attack', 'Horn Drill'] },
    ],
  },
  // Elite Four
  {
    name: 'Elite Four: Lorelei',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dewgong', id: 87, level: 54, types: ['water', 'ice'], moves: ['Aurora Beam', 'Growl', 'Rest', 'Take Down'] },
      { name: 'Cloyster', id: 91, level: 53, types: ['water', 'ice'], moves: ['Clamp', 'Aurora Beam', 'Spike Cannon', 'Supersonic'] },
      { name: 'Slowbro', id: 80, level: 54, types: ['water', 'psychic'], moves: ['Water Gun', 'Growl', 'Withdraw', 'Amnesia'] },
      { name: 'Jynx', id: 124, level: 56, types: ['ice', 'psychic'], moves: ['Ice Punch', 'Thrash', 'Lovely Kiss', 'Double Slap'] },
      { name: 'Lapras', id: 131, level: 56, types: ['water', 'ice'], moves: ['Body Slam', 'Confuse Ray', 'Hydro Pump', 'Blizzard'] },
    ],
  },
  {
    name: 'Elite Four: Bruno',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Onix', id: 95, level: 53, types: ['rock', 'ground'], moves: ['Rock Throw', 'Rage', 'Slam', 'Harden'] },
      { name: 'Hitmonchan', id: 107, level: 55, types: ['fighting'], moves: ['Ice Punch', 'Thunder Punch', 'Fire Punch', 'Counter'] },
      { name: 'Hitmonlee', id: 106, level: 55, types: ['fighting'], moves: ['Jump Kick', 'High Jump Kick', 'Mega Kick', 'Focus Energy'] },
      { name: 'Onix', id: 95, level: 56, types: ['rock', 'ground'], moves: ['Rock Throw', 'Rage', 'Slam', 'Harden'] },
      { name: 'Machamp', id: 68, level: 58, types: ['fighting'], moves: ['Leer', 'Focus Energy', 'Fissure', 'Submission'] },
    ],
  },
  {
    name: 'Elite Four: Agatha',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Gengar', id: 94, level: 56, types: ['ghost', 'poison'], moves: ['Confuse Ray', 'Night Shade', 'Hypnosis', 'Dream Eater'] },
      { name: 'Golbat', id: 42, level: 56, types: ['poison', 'flying'], moves: ['Bite', 'Screech', 'Leech Life', 'Wing Attack'] },
      { name: 'Haunter', id: 93, level: 55, types: ['ghost', 'poison'], moves: ['Confuse Ray', 'Night Shade', 'Hypnosis', 'Dream Eater'] },
      { name: 'Arbok', id: 24, level: 58, types: ['poison'], moves: ['Bite', 'Glare', 'Screech', 'Acid'] },
      { name: 'Gengar', id: 94, level: 60, types: ['ghost', 'poison'], moves: ['Confuse Ray', 'Night Shade', 'Toxic', 'Dream Eater'] },
    ],
  },
  {
    name: 'Elite Four: Lance',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 58, types: ['water', 'flying'], moves: ['Dragon Rage', 'Leer', 'Hydro Pump', 'Hyper Beam'] },
      { name: 'Dragonair', id: 148, level: 56, types: ['dragon'], moves: ['Agility', 'Slam', 'Dragon Rage', 'Hyper Beam'] },
      { name: 'Dragonair', id: 148, level: 56, types: ['dragon'], moves: ['Agility', 'Slam', 'Dragon Rage', 'Hyper Beam'] },
      { name: 'Aerodactyl', id: 142, level: 60, types: ['rock', 'flying'], moves: ['Supersonic', 'Take Down', 'Bite', 'Hyper Beam'] },
      { name: 'Dragonite', id: 149, level: 62, types: ['dragon', 'flying'], moves: ['Agility', 'Slam', 'Barrier', 'Hyper Beam'] },
    ],
  },
  {
    name: 'Blue (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Pidgeot', id: 18, level: 61, types: ['normal', 'flying'], moves: ['Wing Attack', 'Mirror Move', 'Sky Attack', 'Whirlwind'] },
      { name: 'Alakazam', id: 65, level: 59, types: ['psychic'], moves: ['Psybeam', 'Reflect', 'Recover', 'Psychic'] },
      { name: 'Rhydon', id: 112, level: 61, types: ['ground', 'rock'], moves: ['Horn Drill', 'Leer', 'Take Down', 'Earthquake'] },
      { name: 'Gyarados', id: 130, level: 61, types: ['water', 'flying'], moves: ['Dragon Rage', 'Leer', 'Hydro Pump', 'Hyper Beam'] },
      { name: 'Arcanine', id: 59, level: 63, types: ['fire'], moves: ['Ember', 'Leer', 'Fire Blast', 'Take Down'] },
      { name: 'Exeggutor', id: 103, level: 65, types: ['grass', 'psychic'], moves: ['Barrage', 'Hypnosis', 'Stomp'] },
    ],
  },
];

// ── Gold / Silver ──────────────────────────────────────────────────────────

const GOLD_SILVER_BOSSES: BossEntry[] = [
  // Rival battles (assuming player chose Cyndaquil, so Silver has Totodile line)
  {
    name: 'Rival (Cherrygrove City)',
    segment: 'Pre-Falkner',
    pokemon: [
      { name: 'Totodile', id: 158, level: 5, types: ['water'], moves: ['Scratch', 'Leer'] },
    ],
  },
  {
    name: 'Rival (Azalea Town)',
    segment: 'Pre-Bugsy',
    pokemon: [
      { name: 'Gastly', id: 92, level: 14, types: ['ghost', 'poison'], moves: ['Lick', 'Spite', 'Hypnosis', 'Mean Look'] },
      { name: 'Zubat', id: 41, level: 14, types: ['poison', 'flying'], moves: ['Leech Life', 'Supersonic', 'Bite'] },
      { name: 'Croconaw', id: 159, level: 16, types: ['water'], moves: ['Scratch', 'Leer', 'Rage', 'Water Gun'] },
    ],
  },
  {
    name: 'Rival (Burned Tower)',
    segment: 'Pre-Morty',
    pokemon: [
      { name: 'Haunter', id: 93, level: 20, types: ['ghost', 'poison'], moves: ['Lick', 'Spite', 'Mean Look', 'Curse'] },
      { name: 'Zubat', id: 41, level: 22, types: ['poison', 'flying'], moves: ['Leech Life', 'Supersonic', 'Bite', 'Confuse Ray'] },
      { name: 'Magnemite', id: 81, level: 18, types: ['electric', 'steel'], moves: ['Tackle', 'ThunderShock', 'SonicBoom', 'Thunder Wave'] },
      { name: 'Croconaw', id: 159, level: 22, types: ['water'], moves: ['Scratch', 'Leer', 'Rage', 'Water Gun'] },
    ],
  },
  {
    name: 'Rival (Victory Road)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Sneasel', id: 215, level: 34, types: ['dark', 'ice'], moves: ['Quick Attack', 'Screech', 'Faint Attack', 'Fury Cutter'] },
      { name: 'Haunter', id: 93, level: 35, types: ['ghost', 'poison'], moves: ['Mean Look', 'Curse', 'Shadow Ball', 'Confuse Ray'] },
      { name: 'Magneton', id: 82, level: 35, types: ['electric', 'steel'], moves: ['Thunder Wave', 'SonicBoom', 'Thunderbolt', 'Swift'] },
      { name: 'Golbat', id: 42, level: 36, types: ['poison', 'flying'], moves: ['Leech Life', 'Bite', 'Confuse Ray', 'Wing Attack'] },
      { name: 'Kadabra', id: 64, level: 35, types: ['psychic'], moves: ['Disable', 'Psybeam', 'Recover', 'Future Sight'] },
      { name: 'Feraligatr', id: 160, level: 38, types: ['water'], moves: ['Rage', 'Water Gun', 'Slash', 'Surf'] },
    ],
  },
  {
    name: 'Falkner',
    segment: 'Pre-Falkner',
    pokemon: [
      { name: 'Pidgey', id: 16, level: 7, types: ['normal', 'flying'], moves: ['Tackle', 'Mud-Slap'] },
      { name: 'Pidgeotto', id: 17, level: 9, types: ['normal', 'flying'], moves: ['Tackle', 'Mud-Slap', 'Gust'] },
    ],
  },
  {
    name: 'Bugsy',
    segment: 'Pre-Bugsy',
    pokemon: [
      { name: 'Metapod', id: 11, level: 14, types: ['bug'], moves: ['Tackle', 'String Shot', 'Harden'] },
      { name: 'Kakuna', id: 14, level: 14, types: ['bug', 'poison'], moves: ['Poison Sting', 'String Shot', 'Harden'] },
      { name: 'Scyther', id: 123, level: 16, types: ['bug', 'flying'], moves: ['Quick Attack', 'Leer', 'Fury Cutter'] },
    ],
  },
  {
    name: 'Whitney',
    segment: 'Pre-Whitney',
    pokemon: [
      { name: 'Clefairy', id: 35, level: 18, types: ['normal'], moves: ['DoubleSlap', 'Mimic', 'Encore', 'Metronome'] },
      { name: 'Miltank', id: 241, level: 20, types: ['normal'], moves: ['Rollout', 'Attract', 'Stomp', 'Milk Drink'] },
    ],
  },
  {
    name: 'Morty',
    segment: 'Pre-Morty',
    pokemon: [
      { name: 'Gastly', id: 92, level: 21, types: ['ghost', 'poison'], moves: ['Lick', 'Spite', 'Mean Look', 'Curse'] },
      { name: 'Haunter', id: 93, level: 21, types: ['ghost', 'poison'], moves: ['Hypnosis', 'Mimic', 'Curse', 'Night Shade'] },
      { name: 'Gengar', id: 94, level: 25, types: ['ghost', 'poison'], moves: ['Hypnosis', 'Shadow Ball', 'Mean Look', 'Dream Eater'] },
      { name: 'Haunter', id: 93, level: 23, types: ['ghost', 'poison'], moves: ['Spite', 'Mean Look', 'Mimic', 'Night Shade'] },
    ],
  },
  {
    name: 'Chuck',
    segment: 'Pre-Chuck',
    pokemon: [
      { name: 'Primeape', id: 57, level: 27, types: ['fighting'], moves: ['Leer', 'Rage', 'Karate Chop', 'Fury Swipes'] },
      { name: 'Poliwrath', id: 62, level: 30, types: ['water', 'fighting'], moves: ['Hypnosis', 'Mind Reader', 'Surf', 'DynamicPunch'] },
    ],
  },
  {
    name: 'Jasmine',
    segment: 'Pre-Jasmine',
    pokemon: [
      { name: 'Magnemite', id: 81, level: 30, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Supersonic', 'SonicBoom', 'Thunder Wave'] },
      { name: 'Magnemite', id: 81, level: 30, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Supersonic', 'SonicBoom', 'Thunder Wave'] },
      { name: 'Steelix', id: 208, level: 35, types: ['steel', 'ground'], moves: ['Screech', 'Sunny Day', 'Rock Throw', 'Iron Tail'] },
    ],
  },
  {
    name: 'Pryce',
    segment: 'Pre-Pryce',
    pokemon: [
      { name: 'Seel', id: 86, level: 27, types: ['water'], moves: ['Headbutt', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Dewgong', id: 87, level: 29, types: ['water', 'ice'], moves: ['Headbutt', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Piloswine', id: 221, level: 31, types: ['ice', 'ground'], moves: ['Fury Attack', 'Icy Wind', 'Mist', 'Blizzard'] },
    ],
  },
  {
    name: 'Clair',
    segment: 'Pre-Clair',
    pokemon: [
      { name: 'Dragonair', id: 148, level: 37, types: ['dragon'], moves: ['Thunder Wave', 'Surf', 'Slam', 'DragonBreath'] },
      { name: 'Dragonair', id: 148, level: 37, types: ['dragon'], moves: ['Thunder Wave', 'Ice Beam', 'Slam', 'DragonBreath'] },
      { name: 'Dragonair', id: 148, level: 37, types: ['dragon'], moves: ['Thunder Wave', 'Thunderbolt', 'Slam', 'DragonBreath'] },
      { name: 'Kingdra', id: 230, level: 40, types: ['water', 'dragon'], moves: ['SmokeScreen', 'Surf', 'Hyper Beam', 'DragonBreath'] },
    ],
  },
  // Elite Four
  {
    name: 'Elite Four: Will',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Xatu', id: 178, level: 40, types: ['psychic', 'flying'], moves: ['Quick Attack', 'Confuse Ray', 'Future Sight', 'Psychic'] },
      { name: 'Jynx', id: 124, level: 41, types: ['ice', 'psychic'], moves: ['DoubleSlap', 'Lovely Kiss', 'Ice Punch', 'Psychic'] },
      { name: 'Exeggutor', id: 103, level: 41, types: ['grass', 'psychic'], moves: ['Reflect', 'Leech Seed', 'Egg Bomb', 'Psychic'] },
      { name: 'Slowbro', id: 80, level: 41, types: ['water', 'psychic'], moves: ['Curse', 'Amnesia', 'Body Slam', 'Psychic'] },
      { name: 'Xatu', id: 178, level: 42, types: ['psychic', 'flying'], moves: ['Quick Attack', 'Confuse Ray', 'Future Sight', 'Psychic'] },
    ],
  },
  {
    name: 'Elite Four: Koga',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Ariados', id: 168, level: 40, types: ['bug', 'poison'], moves: ['Double Team', 'Giga Drain', 'Baton Pass', 'Sludge Bomb'] },
      { name: 'Forretress', id: 205, level: 43, types: ['bug', 'steel'], moves: ['Protect', 'Swift', 'Explosion', 'Spikes'] },
      { name: 'Muk', id: 89, level: 42, types: ['poison'], moves: ['Minimize', 'Acid Armor', 'Sludge Bomb', 'Toxic'] },
      { name: 'Venomoth', id: 49, level: 41, types: ['bug', 'poison'], moves: ['Supersonic', 'Gust', 'Psychic', 'Toxic'] },
      { name: 'Crobat', id: 169, level: 44, types: ['poison', 'flying'], moves: ['Double Team', 'Quick Attack', 'Wing Attack', 'Toxic'] },
    ],
  },
  {
    name: 'Elite Four: Bruno',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Hitmontop', id: 237, level: 42, types: ['fighting'], moves: ['Quick Attack', 'Pursuit', 'Counter', 'Dig'] },
      { name: 'Hitmonlee', id: 106, level: 42, types: ['fighting'], moves: ['Swagger', 'Double Kick', 'Hi Jump Kick', 'Foresight'] },
      { name: 'Hitmonchan', id: 107, level: 42, types: ['fighting'], moves: ['Thunder Punch', 'Ice Punch', 'Fire Punch', 'Mach Punch'] },
      { name: 'Onix', id: 95, level: 43, types: ['rock', 'ground'], moves: ['Bind', 'Rock Throw', 'Earthquake', 'Sandstorm'] },
      { name: 'Machamp', id: 68, level: 46, types: ['fighting'], moves: ['Vital Throw', 'Rock Slide', 'Foresight', 'Cross Chop'] },
    ],
  },
  {
    name: 'Elite Four: Karen',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Umbreon', id: 197, level: 42, types: ['dark'], moves: ['Sand Attack', 'Confuse Ray', 'Faint Attack', 'Mean Look'] },
      { name: 'Vileplume', id: 45, level: 42, types: ['grass', 'poison'], moves: ['Stun Spore', 'Acid', 'Petal Dance', 'Moonlight'] },
      { name: 'Gengar', id: 94, level: 45, types: ['ghost', 'poison'], moves: ['Lick', 'Spite', 'Curse', 'Destiny Bond'] },
      { name: 'Murkrow', id: 198, level: 44, types: ['dark', 'flying'], moves: ['Quick Attack', 'Pursuit', 'Whirlwind', 'Faint Attack'] },
      { name: 'Houndoom', id: 229, level: 47, types: ['dark', 'fire'], moves: ['Pursuit', 'Roar', 'Crunch', 'Flamethrower'] },
    ],
  },
  {
    name: 'Lance (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 44, types: ['water', 'flying'], moves: ['Rain Dance', 'Surf', 'Flail', 'Hyper Beam'] },
      { name: 'Dragonite', id: 149, level: 47, types: ['dragon', 'flying'], moves: ['Thunder Wave', 'Twister', 'Thunder', 'Hyper Beam'] },
      { name: 'Dragonite', id: 149, level: 47, types: ['dragon', 'flying'], moves: ['Thunder Wave', 'Twister', 'Blizzard', 'Hyper Beam'] },
      { name: 'Aerodactyl', id: 142, level: 46, types: ['rock', 'flying'], moves: ['Wing Attack', 'AncientPower', 'Rock Slide', 'Hyper Beam'] },
      { name: 'Charizard', id: 6, level: 46, types: ['fire', 'flying'], moves: ['Flamethrower', 'Slash', 'Wing Attack', 'Hyper Beam'] },
      { name: 'Dragonite', id: 149, level: 50, types: ['dragon', 'flying'], moves: ['Fire Blast', 'Safeguard', 'Outrage', 'Hyper Beam'] },
    ],
  },
];

// ── Ruby / Sapphire ────────────────────────────────────────────────────────

const RUBY_SAPPHIRE_BOSSES: BossEntry[] = [
  // Rival battles (assuming player chose Treecko, so rival has Torchic line)
  {
    name: 'Rival (Route 103)',
    segment: 'Pre-Roxanne',
    pokemon: [
      { name: 'Torchic', id: 255, level: 5, types: ['fire'], moves: ['Scratch', 'Growl'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Rival (Route 110)',
    segment: 'Pre-Wattson',
    pokemon: [
      { name: 'Wingull', id: 278, level: 18, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Wing Attack'], ability: 'Keen Eye' },
      { name: 'Lombre', id: 271, level: 18, types: ['water', 'grass'], moves: ['Absorb', 'Nature Power', 'Fake Out', 'Fury Swipes'], ability: 'Swift Swim' },
      { name: 'Combusken', id: 256, level: 20, types: ['fire', 'fighting'], moves: ['Peck', 'Focus Energy', 'Ember', 'Double Kick'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Rival (Route 119)',
    segment: 'Pre-Winona',
    pokemon: [
      { name: 'Pelipper', id: 279, level: 29, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Wing Attack', 'Protect'], ability: 'Keen Eye' },
      { name: 'Lombre', id: 271, level: 29, types: ['water', 'grass'], moves: ['Absorb', 'Nature Power', 'Fake Out', 'Fury Swipes'], ability: 'Swift Swim' },
      { name: 'Combusken', id: 256, level: 31, types: ['fire', 'fighting'], moves: ['Peck', 'Double Kick', 'Ember', 'Bulk Up'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Rival (Lilycove City)',
    segment: 'Pre-Tate & Liza',
    pokemon: [
      { name: 'Pelipper', id: 279, level: 31, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Wing Attack', 'Protect'], ability: 'Keen Eye' },
      { name: 'Ludicolo', id: 272, level: 32, types: ['water', 'grass'], moves: ['Nature Power', 'Fake Out', 'Surf', 'Giga Drain'], ability: 'Swift Swim' },
      { name: 'Blaziken', id: 257, level: 34, types: ['fire', 'fighting'], moves: ['Blaze Kick', 'Double Kick', 'Peck', 'Bulk Up'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Roxanne',
    segment: 'Pre-Roxanne',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Tackle', 'Defense Curl', 'Rock Throw', 'Rock Tomb'], ability: 'Rock Head' },
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Tackle', 'Defense Curl', 'Rock Throw', 'Rock Tomb'], ability: 'Rock Head' },
      { name: 'Nosepass', id: 299, level: 15, types: ['rock'], moves: ['Block', 'Harden', 'Tackle', 'Rock Tomb'], ability: 'Sturdy' },
    ],
  },
  {
    name: 'Brawly',
    segment: 'Pre-Brawly',
    pokemon: [
      { name: 'Machop', id: 66, level: 16, types: ['fighting'], moves: ['Karate Chop', 'Low Kick', 'Seismic Toss', 'Bulk Up'], ability: 'Guts' },
      { name: 'Meditite', id: 307, level: 16, types: ['fighting', 'psychic'], moves: ['Focus Punch', 'Light Screen', 'Reflect', 'Bulk Up'], ability: 'Pure Power' },
      { name: 'Makuhita', id: 296, level: 19, types: ['fighting'], moves: ['Arm Thrust', 'Vital Throw', 'Reversal', 'Bulk Up'], ability: 'Thick Fat' },
    ],
  },
  {
    name: 'Wattson',
    segment: 'Pre-Wattson',
    pokemon: [
      { name: 'Voltorb', id: 100, level: 20, types: ['electric'], moves: ['Rollout', 'Spark', 'SonicBoom', 'Self-Destruct'], ability: 'Soundproof' },
      { name: 'Electrike', id: 309, level: 20, types: ['electric'], moves: ['Shock Wave', 'Leer', 'Quick Attack', 'Howl'], ability: 'Static' },
      { name: 'Magneton', id: 82, level: 22, types: ['electric', 'steel'], moves: ['SonicBoom', 'Thunder Wave', 'Shock Wave', 'Supersonic'], ability: 'Magnet Pull' },
      { name: 'Manectric', id: 310, level: 24, types: ['electric'], moves: ['Quick Attack', 'Shock Wave', 'Thunder Wave', 'Howl'], ability: 'Static' },
    ],
  },
  {
    name: 'Flannery',
    segment: 'Pre-Flannery',
    pokemon: [
      { name: 'Numel', id: 322, level: 24, types: ['fire', 'ground'], moves: ['Overheat', 'Magnitude', 'Tackle', 'Sunny Day'], ability: 'Oblivious' },
      { name: 'Slugma', id: 218, level: 24, types: ['fire'], moves: ['Overheat', 'Smog', 'Light Screen', 'Sunny Day'], ability: 'Magma Armor' },
      { name: 'Torkoal', id: 324, level: 29, types: ['fire'], moves: ['Overheat', 'Body Slam', 'Flail', 'Attract'], ability: 'White Smoke' },
    ],
  },
  {
    name: 'Norman',
    segment: 'Pre-Norman',
    pokemon: [
      { name: 'Spinda', id: 327, level: 27, types: ['normal'], moves: ['Teeter Dance', 'Psybeam', 'Facade', 'Encore'], ability: 'Own Tempo' },
      { name: 'Vigoroth', id: 288, level: 27, types: ['normal'], moves: ['Slash', 'Facade', 'Encore', 'Faint Attack'], ability: 'Vital Spirit' },
      { name: 'Linoone', id: 264, level: 29, types: ['normal'], moves: ['Slash', 'Belly Drum', 'Headbutt', 'Facade'], ability: 'Pickup' },
      { name: 'Slaking', id: 289, level: 31, types: ['normal'], moves: ['Counter', 'Yawn', 'Facade', 'Faint Attack'], ability: 'Truant' },
    ],
  },
  {
    name: 'Winona',
    segment: 'Pre-Winona',
    pokemon: [
      { name: 'Swablu', id: 333, level: 29, types: ['normal', 'flying'], moves: ['Perish Song', 'Mirror Move', 'Safeguard', 'Aerial Ace'], ability: 'Natural Cure' },
      { name: 'Tropius', id: 357, level: 29, types: ['grass', 'flying'], moves: ['Sunny Day', 'SolarBeam', 'Aerial Ace', 'Synthesis'], ability: 'Chlorophyll' },
      { name: 'Pelipper', id: 279, level: 30, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Protect', 'Aerial Ace'], ability: 'Keen Eye' },
      { name: 'Skarmory', id: 227, level: 31, types: ['steel', 'flying'], moves: ['Sand Attack', 'Fury Attack', 'Steel Wing', 'Aerial Ace'], ability: 'Keen Eye' },
      { name: 'Altaria', id: 334, level: 33, types: ['dragon', 'flying'], moves: ['Earthquake', 'DragonBreath', 'Dragon Dance', 'Aerial Ace'], ability: 'Natural Cure' },
    ],
  },
  {
    name: 'Tate & Liza',
    segment: 'Pre-Tate & Liza',
    pokemon: [
      { name: 'Claydol', id: 344, level: 41, types: ['ground', 'psychic'], moves: ['Earthquake', 'AncientPower', 'Psychic', 'Light Screen'], ability: 'Levitate' },
      { name: 'Xatu', id: 178, level: 41, types: ['psychic', 'flying'], moves: ['Psychic', 'Sunny Day', 'Confuse Ray', 'Calm Mind'], ability: 'Synchronize' },
      { name: 'Lunatone', id: 337, level: 42, types: ['rock', 'psychic'], moves: ['Psychic', 'Hypnosis', 'Calm Mind', 'Light Screen'], ability: 'Levitate' },
      { name: 'Solrock', id: 338, level: 42, types: ['rock', 'psychic'], moves: ['Psychic', 'Sunny Day', 'Flamethrower', 'SolarBeam'], ability: 'Levitate' },
    ],
  },
  {
    name: 'Wallace',
    segment: 'Pre-Wallace',
    pokemon: [
      { name: 'Luvdisc', id: 370, level: 40, types: ['water'], moves: ['Water Pulse', 'Attract', 'Sweet Kiss', 'Flail'], ability: 'Swift Swim' },
      { name: 'Whiscash', id: 340, level: 42, types: ['water', 'ground'], moves: ['Rain Dance', 'Water Pulse', 'Amnesia', 'Earthquake'], ability: 'Oblivious' },
      { name: 'Sealeo', id: 364, level: 40, types: ['ice', 'water'], moves: ['Water Pulse', 'Body Slam', 'Aurora Beam', 'Encore'], ability: 'Thick Fat' },
      { name: 'Seaking', id: 119, level: 42, types: ['water'], moves: ['Water Pulse', 'Rain Dance', 'Fury Attack', 'Horn Drill'], ability: 'Swift Swim' },
      { name: 'Milotic', id: 350, level: 43, types: ['water'], moves: ['Water Pulse', 'Twister', 'Recover', 'Ice Beam'], ability: 'Marvel Scale' },
    ],
  },
  // Elite Four
  {
    name: 'Elite Four: Sidney',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Mightyena', id: 262, level: 46, types: ['dark'], moves: ['Roar', 'Double Edge', 'Sand Attack', 'Crunch'], ability: 'Intimidate' },
      { name: 'Shiftry', id: 275, level: 48, types: ['grass', 'dark'], moves: ['Double Team', 'Swagger', 'Extrasensory', 'Faint Attack'], ability: 'Chlorophyll' },
      { name: 'Cacturne', id: 332, level: 46, types: ['grass', 'dark'], moves: ['Leech Seed', 'Faint Attack', 'Needle Arm', 'Cotton Spore'], ability: 'Sand Veil' },
      { name: 'Crawdaunt', id: 342, level: 48, types: ['water', 'dark'], moves: ['Surf', 'Swords Dance', 'Strength', 'Facade'], ability: 'Shell Armor' },
      { name: 'Absol', id: 359, level: 49, types: ['dark'], moves: ['Aerial Ace', 'Rock Slide', 'Swords Dance', 'Slash'], ability: 'Pressure' },
    ],
  },
  {
    name: 'Elite Four: Phoebe',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dusclops', id: 356, level: 48, types: ['ghost'], moves: ['Shadow Punch', 'Confuse Ray', 'Curse', 'Protect'], ability: 'Pressure' },
      { name: 'Banette', id: 354, level: 49, types: ['ghost'], moves: ['Shadow Ball', 'Grudge', 'Will-O-Wisp', 'Faint Attack'], ability: 'Insomnia' },
      { name: 'Sableye', id: 302, level: 50, types: ['dark', 'ghost'], moves: ['Shadow Ball', 'Double Team', 'Night Shade', 'Faint Attack'], ability: 'Keen Eye' },
      { name: 'Banette', id: 354, level: 49, types: ['ghost'], moves: ['Shadow Ball', 'Grudge', 'Toxic', 'Psychic'], ability: 'Insomnia' },
      { name: 'Dusclops', id: 356, level: 51, types: ['ghost'], moves: ['Shadow Punch', 'Ice Beam', 'Rock Slide', 'Earthquake'], ability: 'Pressure' },
    ],
  },
  {
    name: 'Elite Four: Glacia',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Glalie', id: 362, level: 50, types: ['ice'], moves: ['Light Screen', 'Crunch', 'Icy Wind', 'Ice Beam'], ability: 'Inner Focus' },
      { name: 'Sealeo', id: 364, level: 50, types: ['ice', 'water'], moves: ['Encore', 'Body Slam', 'Hail', 'Ice Ball'], ability: 'Thick Fat' },
      { name: 'Sealeo', id: 364, level: 52, types: ['ice', 'water'], moves: ['Attract', 'Double Edge', 'Hail', 'Blizzard'], ability: 'Thick Fat' },
      { name: 'Glalie', id: 362, level: 52, types: ['ice'], moves: ['Shadow Ball', 'Explosion', 'Hail', 'Ice Beam'], ability: 'Inner Focus' },
      { name: 'Walrein', id: 365, level: 53, types: ['ice', 'water'], moves: ['Surf', 'Body Slam', 'Ice Beam', 'Sheer Cold'], ability: 'Thick Fat' },
    ],
  },
  {
    name: 'Elite Four: Drake',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Shelgon', id: 372, level: 52, types: ['dragon'], moves: ['Rock Tomb', 'Dragon Claw', 'Protect', 'Double Edge'], ability: 'Rock Head' },
      { name: 'Altaria', id: 334, level: 54, types: ['dragon', 'flying'], moves: ['Dragon Dance', 'Take Down', 'DragonBreath', 'Aerial Ace'], ability: 'Natural Cure' },
      { name: 'Flygon', id: 330, level: 53, types: ['ground', 'dragon'], moves: ['Flamethrower', 'Crunch', 'Dragon Claw', 'Dig'], ability: 'Levitate' },
      { name: 'Flygon', id: 330, level: 53, types: ['ground', 'dragon'], moves: ['Flamethrower', 'Crunch', 'Dragon Claw', 'Sandstorm'], ability: 'Levitate' },
      { name: 'Salamence', id: 373, level: 55, types: ['dragon', 'flying'], moves: ['Flamethrower', 'Dragon Claw', 'Rock Slide', 'Crunch'], ability: 'Intimidate' },
    ],
  },
  {
    name: 'Steven (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Skarmory', id: 227, level: 57, types: ['steel', 'flying'], moves: ['Toxic', 'Aerial Ace', 'Spikes', 'Steel Wing'], ability: 'Keen Eye' },
      { name: 'Claydol', id: 344, level: 55, types: ['ground', 'psychic'], moves: ['Reflect', 'Light Screen', 'AncientPower', 'Earthquake'], ability: 'Levitate' },
      { name: 'Aggron', id: 306, level: 56, types: ['steel', 'rock'], moves: ['Thunder', 'Earthquake', 'SolarBeam', 'Dragon Claw'], ability: 'Sturdy' },
      { name: 'Cradily', id: 346, level: 56, types: ['rock', 'grass'], moves: ['Giga Drain', 'AncientPower', 'Sludge Bomb', 'Confuse Ray'], ability: 'Suction Cups' },
      { name: 'Armaldo', id: 348, level: 56, types: ['rock', 'bug'], moves: ['Water Pulse', 'AncientPower', 'Aerial Ace', 'Slash'], ability: 'Battle Armor' },
      { name: 'Metagross', id: 376, level: 58, types: ['steel', 'psychic'], moves: ['Earthquake', 'Psychic', 'Meteor Mash', 'Hyper Beam'], ability: 'Clear Body' },
    ],
  },
];

// ── Emerald ────────────────────────────────────────────────────────────────

const EMERALD_BOSSES: BossEntry[] = [
  // Rival battles (assuming player chose Treecko, so rival has Torchic line)
  {
    name: 'Rival (Route 103)',
    segment: 'Pre-Roxanne',
    pokemon: [
      { name: 'Torchic', id: 255, level: 5, types: ['fire'], moves: ['Scratch', 'Growl'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Rival (Route 110)',
    segment: 'Pre-Wattson',
    pokemon: [
      { name: 'Wingull', id: 278, level: 18, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Wing Attack'], ability: 'Keen Eye' },
      { name: 'Lombre', id: 271, level: 18, types: ['water', 'grass'], moves: ['Absorb', 'Nature Power', 'Fake Out', 'Fury Swipes'], ability: 'Swift Swim' },
      { name: 'Combusken', id: 256, level: 20, types: ['fire', 'fighting'], moves: ['Peck', 'Focus Energy', 'Ember', 'Double Kick'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Rival (Route 119)',
    segment: 'Pre-Winona',
    pokemon: [
      { name: 'Pelipper', id: 279, level: 29, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Wing Attack', 'Protect'], ability: 'Keen Eye' },
      { name: 'Lombre', id: 271, level: 29, types: ['water', 'grass'], moves: ['Absorb', 'Nature Power', 'Fake Out', 'Fury Swipes'], ability: 'Swift Swim' },
      { name: 'Combusken', id: 256, level: 31, types: ['fire', 'fighting'], moves: ['Peck', 'Double Kick', 'Ember', 'Bulk Up'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Rival (Lilycove City)',
    segment: 'Pre-Tate & Liza',
    pokemon: [
      { name: 'Pelipper', id: 279, level: 31, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Wing Attack', 'Protect'], ability: 'Keen Eye' },
      { name: 'Ludicolo', id: 272, level: 32, types: ['water', 'grass'], moves: ['Nature Power', 'Fake Out', 'Surf', 'Giga Drain'], ability: 'Swift Swim' },
      { name: 'Blaziken', id: 257, level: 34, types: ['fire', 'fighting'], moves: ['Blaze Kick', 'Double Kick', 'Peck', 'Bulk Up'], ability: 'Blaze' },
    ],
  },
  {
    name: 'Roxanne',
    segment: 'Pre-Roxanne',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Tackle', 'Defense Curl', 'Rock Throw', 'Rock Tomb'], ability: 'Rock Head' },
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Tackle', 'Defense Curl', 'Rock Throw', 'Rock Tomb'], ability: 'Rock Head' },
      { name: 'Nosepass', id: 299, level: 15, types: ['rock'], moves: ['Block', 'Harden', 'Tackle', 'Rock Tomb'], ability: 'Sturdy' },
    ],
  },
  {
    name: 'Brawly',
    segment: 'Pre-Brawly',
    pokemon: [
      { name: 'Machop', id: 66, level: 16, types: ['fighting'], moves: ['Karate Chop', 'Low Kick', 'Seismic Toss', 'Bulk Up'], ability: 'Guts' },
      { name: 'Meditite', id: 307, level: 16, types: ['fighting', 'psychic'], moves: ['Focus Punch', 'Light Screen', 'Reflect', 'Bulk Up'], ability: 'Pure Power' },
      { name: 'Makuhita', id: 296, level: 19, types: ['fighting'], moves: ['Arm Thrust', 'Vital Throw', 'Reversal', 'Bulk Up'], ability: 'Thick Fat' },
    ],
  },
  {
    name: 'Wattson',
    segment: 'Pre-Wattson',
    pokemon: [
      { name: 'Voltorb', id: 100, level: 20, types: ['electric'], moves: ['Rollout', 'Spark', 'SonicBoom', 'Self-Destruct'], ability: 'Soundproof' },
      { name: 'Electrike', id: 309, level: 20, types: ['electric'], moves: ['Shock Wave', 'Leer', 'Quick Attack', 'Howl'], ability: 'Static' },
      { name: 'Magneton', id: 82, level: 22, types: ['electric', 'steel'], moves: ['SonicBoom', 'Thunder Wave', 'Shock Wave', 'Supersonic'], ability: 'Magnet Pull' },
      { name: 'Manectric', id: 310, level: 24, types: ['electric'], moves: ['Quick Attack', 'Shock Wave', 'Thunder Wave', 'Howl'], ability: 'Static' },
    ],
  },
  {
    name: 'Flannery',
    segment: 'Pre-Flannery',
    pokemon: [
      { name: 'Numel', id: 322, level: 24, types: ['fire', 'ground'], moves: ['Overheat', 'Magnitude', 'Tackle', 'Sunny Day'], ability: 'Oblivious' },
      { name: 'Slugma', id: 218, level: 24, types: ['fire'], moves: ['Overheat', 'Smog', 'Light Screen', 'Sunny Day'], ability: 'Magma Armor' },
      { name: 'Camerupt', id: 323, level: 26, types: ['fire', 'ground'], moves: ['Overheat', 'Tackle', 'Attract', 'Sunny Day'], ability: 'Magma Armor' },
      { name: 'Torkoal', id: 324, level: 29, types: ['fire'], moves: ['Overheat', 'Body Slam', 'Flail', 'Attract'], ability: 'White Smoke' },
    ],
  },
  {
    name: 'Norman',
    segment: 'Pre-Norman',
    pokemon: [
      { name: 'Spinda', id: 327, level: 27, types: ['normal'], moves: ['Teeter Dance', 'Psybeam', 'Facade', 'Encore'], ability: 'Own Tempo' },
      { name: 'Vigoroth', id: 288, level: 27, types: ['normal'], moves: ['Slash', 'Facade', 'Encore', 'Faint Attack'], ability: 'Vital Spirit' },
      { name: 'Linoone', id: 264, level: 29, types: ['normal'], moves: ['Slash', 'Belly Drum', 'Headbutt', 'Facade'], ability: 'Pickup' },
      { name: 'Slaking', id: 289, level: 31, types: ['normal'], moves: ['Counter', 'Yawn', 'Facade', 'Faint Attack'], ability: 'Truant' },
    ],
  },
  {
    name: 'Winona',
    segment: 'Pre-Winona',
    pokemon: [
      { name: 'Swablu', id: 333, level: 29, types: ['normal', 'flying'], moves: ['Perish Song', 'Mirror Move', 'Safeguard', 'Aerial Ace'], ability: 'Natural Cure' },
      { name: 'Tropius', id: 357, level: 29, types: ['grass', 'flying'], moves: ['Sunny Day', 'SolarBeam', 'Aerial Ace', 'Synthesis'], ability: 'Chlorophyll' },
      { name: 'Pelipper', id: 279, level: 30, types: ['water', 'flying'], moves: ['Water Gun', 'Supersonic', 'Protect', 'Aerial Ace'], ability: 'Keen Eye' },
      { name: 'Skarmory', id: 227, level: 31, types: ['steel', 'flying'], moves: ['Sand Attack', 'Fury Attack', 'Steel Wing', 'Aerial Ace'], ability: 'Keen Eye' },
      { name: 'Altaria', id: 334, level: 33, types: ['dragon', 'flying'], moves: ['Earthquake', 'DragonBreath', 'Dragon Dance', 'Aerial Ace'], ability: 'Natural Cure' },
    ],
  },
  {
    name: 'Tate & Liza',
    segment: 'Pre-Tate & Liza',
    pokemon: [
      { name: 'Claydol', id: 344, level: 41, types: ['ground', 'psychic'], moves: ['Earthquake', 'AncientPower', 'Psychic', 'Light Screen'], ability: 'Levitate' },
      { name: 'Xatu', id: 178, level: 41, types: ['psychic', 'flying'], moves: ['Psychic', 'Sunny Day', 'Confuse Ray', 'Calm Mind'], ability: 'Synchronize' },
      { name: 'Lunatone', id: 337, level: 42, types: ['rock', 'psychic'], moves: ['Psychic', 'Hypnosis', 'Calm Mind', 'Light Screen'], ability: 'Levitate' },
      { name: 'Solrock', id: 338, level: 42, types: ['rock', 'psychic'], moves: ['Psychic', 'Sunny Day', 'Flamethrower', 'SolarBeam'], ability: 'Levitate' },
    ],
  },
  {
    name: 'Juan',
    segment: 'Pre-Juan',
    pokemon: [
      { name: 'Luvdisc', id: 370, level: 41, types: ['water'], moves: ['Water Pulse', 'Attract', 'Sweet Kiss', 'Flail'], ability: 'Swift Swim' },
      { name: 'Whiscash', id: 340, level: 41, types: ['water', 'ground'], moves: ['Rain Dance', 'Water Pulse', 'Amnesia', 'Earthquake'], ability: 'Oblivious' },
      { name: 'Sealeo', id: 364, level: 43, types: ['ice', 'water'], moves: ['Water Pulse', 'Body Slam', 'Aurora Beam', 'Encore'], ability: 'Thick Fat' },
      { name: 'Crawdaunt', id: 342, level: 43, types: ['water', 'dark'], moves: ['Water Pulse', 'Crabhammer', 'Taunt', 'Leer'], ability: 'Shell Armor' },
      { name: 'Kingdra', id: 230, level: 46, types: ['water', 'dragon'], moves: ['Water Pulse', 'Dragon Dance', 'Ice Beam', 'Double Team'], ability: 'Swift Swim' },
    ],
  },
  // Elite Four (Emerald has different levels and some different Pokemon from RS)
  {
    name: 'Elite Four: Sidney',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Mightyena', id: 262, level: 46, types: ['dark'], moves: ['Roar', 'Double Edge', 'Sand Attack', 'Crunch'], ability: 'Intimidate' },
      { name: 'Shiftry', id: 275, level: 48, types: ['grass', 'dark'], moves: ['Double Team', 'Swagger', 'Extrasensory', 'Faint Attack'], ability: 'Chlorophyll' },
      { name: 'Cacturne', id: 332, level: 46, types: ['grass', 'dark'], moves: ['Leech Seed', 'Faint Attack', 'Needle Arm', 'Cotton Spore'], ability: 'Sand Veil' },
      { name: 'Crawdaunt', id: 342, level: 48, types: ['water', 'dark'], moves: ['Surf', 'Swords Dance', 'Strength', 'Facade'], ability: 'Shell Armor' },
      { name: 'Absol', id: 359, level: 49, types: ['dark'], moves: ['Aerial Ace', 'Rock Slide', 'Swords Dance', 'Slash'], ability: 'Pressure' },
    ],
  },
  {
    name: 'Elite Four: Phoebe',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dusclops', id: 356, level: 48, types: ['ghost'], moves: ['Shadow Punch', 'Confuse Ray', 'Curse', 'Protect'], ability: 'Pressure' },
      { name: 'Banette', id: 354, level: 49, types: ['ghost'], moves: ['Shadow Ball', 'Grudge', 'Will-O-Wisp', 'Faint Attack'], ability: 'Insomnia' },
      { name: 'Sableye', id: 302, level: 50, types: ['dark', 'ghost'], moves: ['Shadow Ball', 'Double Team', 'Night Shade', 'Faint Attack'], ability: 'Keen Eye' },
      { name: 'Banette', id: 354, level: 49, types: ['ghost'], moves: ['Shadow Ball', 'Grudge', 'Toxic', 'Psychic'], ability: 'Insomnia' },
      { name: 'Dusclops', id: 356, level: 51, types: ['ghost'], moves: ['Shadow Punch', 'Ice Beam', 'Rock Slide', 'Earthquake'], ability: 'Pressure' },
    ],
  },
  {
    name: 'Elite Four: Glacia',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Glalie', id: 362, level: 50, types: ['ice'], moves: ['Light Screen', 'Crunch', 'Icy Wind', 'Ice Beam'], ability: 'Inner Focus' },
      { name: 'Sealeo', id: 364, level: 50, types: ['ice', 'water'], moves: ['Encore', 'Body Slam', 'Hail', 'Ice Ball'], ability: 'Thick Fat' },
      { name: 'Sealeo', id: 364, level: 52, types: ['ice', 'water'], moves: ['Attract', 'Double Edge', 'Hail', 'Blizzard'], ability: 'Thick Fat' },
      { name: 'Glalie', id: 362, level: 52, types: ['ice'], moves: ['Shadow Ball', 'Explosion', 'Hail', 'Ice Beam'], ability: 'Inner Focus' },
      { name: 'Walrein', id: 365, level: 53, types: ['ice', 'water'], moves: ['Surf', 'Body Slam', 'Ice Beam', 'Sheer Cold'], ability: 'Thick Fat' },
    ],
  },
  {
    name: 'Elite Four: Drake',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Shelgon', id: 372, level: 52, types: ['dragon'], moves: ['Rock Tomb', 'Dragon Claw', 'Protect', 'Double Edge'], ability: 'Rock Head' },
      { name: 'Altaria', id: 334, level: 54, types: ['dragon', 'flying'], moves: ['Dragon Dance', 'Take Down', 'DragonBreath', 'Aerial Ace'], ability: 'Natural Cure' },
      { name: 'Flygon', id: 330, level: 53, types: ['ground', 'dragon'], moves: ['Flamethrower', 'Crunch', 'Dragon Claw', 'Dig'], ability: 'Levitate' },
      { name: 'Flygon', id: 330, level: 53, types: ['ground', 'dragon'], moves: ['Flamethrower', 'Crunch', 'Dragon Claw', 'Sandstorm'], ability: 'Levitate' },
      { name: 'Salamence', id: 373, level: 55, types: ['dragon', 'flying'], moves: ['Flamethrower', 'Dragon Claw', 'Rock Slide', 'Crunch'], ability: 'Intimidate' },
    ],
  },
  {
    name: 'Wallace (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Wailord', id: 321, level: 57, types: ['water'], moves: ['Rain Dance', 'Water Spout', 'Double Edge', 'Blizzard'], ability: 'Water Veil' },
      { name: 'Tentacruel', id: 73, level: 55, types: ['water', 'poison'], moves: ['Toxic', 'Hydro Pump', 'Sludge Bomb', 'Ice Beam'], ability: 'Clear Body' },
      { name: 'Ludicolo', id: 272, level: 56, types: ['water', 'grass'], moves: ['Giga Drain', 'Surf', 'Leech Seed', 'Double Team'], ability: 'Swift Swim' },
      { name: 'Whiscash', id: 340, level: 56, types: ['water', 'ground'], moves: ['Earthquake', 'Surf', 'Amnesia', 'Hyper Beam'], ability: 'Oblivious' },
      { name: 'Gyarados', id: 130, level: 56, types: ['water', 'flying'], moves: ['Dragon Dance', 'Earthquake', 'Hyper Beam', 'Surf'], ability: 'Intimidate' },
      { name: 'Milotic', id: 350, level: 58, types: ['water'], moves: ['Recover', 'Surf', 'Ice Beam', 'Toxic'], ability: 'Marvel Scale' },
    ],
  },
];

// ── FireRed / LeafGreen ───────────────────────────────────────────────────

const FIRERED_LEAFGREEN_BOSSES: BossEntry[] = [
  {
    name: 'Brock',
    segment: 'Pre-Brock',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Tackle', 'Defense Curl'] },
      { name: 'Onix', id: 95, level: 14, types: ['rock', 'ground'], moves: ['Tackle', 'Rock Tomb', 'Bind'] },
    ],
  },
  {
    name: 'Misty',
    segment: 'Pre-Misty',
    pokemon: [
      { name: 'Staryu', id: 120, level: 18, types: ['water'], moves: ['Tackle', 'Water Pulse', 'Harden', 'Recover'] },
      { name: 'Starmie', id: 121, level: 21, types: ['water', 'psychic'], moves: ['Water Pulse', 'Rapid Spin', 'Recover', 'Swift'] },
    ],
  },
  {
    name: 'Lt. Surge',
    segment: 'Pre-Lt. Surge',
    pokemon: [
      { name: 'Voltorb', id: 100, level: 21, types: ['electric'], moves: ['Shock Wave', 'SonicBoom', 'Tackle'] },
      { name: 'Pikachu', id: 25, level: 18, types: ['electric'], moves: ['Quick Attack', 'Thunder Wave', 'Shock Wave', 'Double Team'] },
      { name: 'Raichu', id: 26, level: 24, types: ['electric'], moves: ['Shock Wave', 'Thunder Wave', 'Quick Attack', 'Double Team'] },
    ],
  },
  {
    name: 'Erika',
    segment: 'Pre-Erika',
    pokemon: [
      { name: 'Victreebel', id: 71, level: 29, types: ['grass', 'poison'], moves: ['Stun Spore', 'Acid', 'PoisonPowder', 'Giga Drain'] },
      { name: 'Tangela', id: 114, level: 24, types: ['grass'], moves: ['Ingrain', 'Constrict', 'PoisonPowder', 'Giga Drain'] },
      { name: 'Vileplume', id: 45, level: 29, types: ['grass', 'poison'], moves: ['Sleep Powder', 'Acid', 'Stun Spore', 'Giga Drain'] },
    ],
  },
  {
    name: 'Koga',
    segment: 'Pre-Koga',
    pokemon: [
      { name: 'Koffing', id: 109, level: 37, types: ['poison'], moves: ['Self-Destruct', 'Sludge', 'SmokeScreen', 'Tackle'] },
      { name: 'Muk', id: 89, level: 39, types: ['poison'], moves: ['Minimize', 'Sludge', 'Acid Armor', 'Toxic'] },
      { name: 'Koffing', id: 109, level: 37, types: ['poison'], moves: ['Self-Destruct', 'Sludge', 'SmokeScreen', 'Tackle'] },
      { name: 'Weezing', id: 110, level: 43, types: ['poison'], moves: ['Self-Destruct', 'Sludge', 'SmokeScreen', 'Toxic'] },
    ],
  },
  {
    name: 'Sabrina',
    segment: 'Pre-Sabrina',
    pokemon: [
      { name: 'Kadabra', id: 64, level: 38, types: ['psychic'], moves: ['Psybeam', 'Reflect', 'Future Sight', 'Calm Mind'] },
      { name: 'Mr. Mime', id: 122, level: 37, types: ['psychic'], moves: ['Barrier', 'Psybeam', 'Baton Pass', 'Calm Mind'] },
      { name: 'Venomoth', id: 49, level: 38, types: ['bug', 'poison'], moves: ['Psybeam', 'Gust', 'Leech Life', 'Supersonic'] },
      { name: 'Alakazam', id: 65, level: 43, types: ['psychic'], moves: ['Psychic', 'Reflect', 'Future Sight', 'Calm Mind'] },
    ],
  },
  {
    name: 'Blaine',
    segment: 'Pre-Blaine',
    pokemon: [
      { name: 'Growlithe', id: 58, level: 42, types: ['fire'], moves: ['Fire Blast', 'Take Down', 'Agility', 'Bite'] },
      { name: 'Ponyta', id: 77, level: 40, types: ['fire'], moves: ['Fire Blast', 'Stomp', 'Bounce', 'Fire Spin'] },
      { name: 'Rapidash', id: 78, level: 42, types: ['fire'], moves: ['Fire Blast', 'Stomp', 'Bounce', 'Fire Spin'] },
      { name: 'Arcanine', id: 59, level: 47, types: ['fire'], moves: ['Fire Blast', 'ExtremeSpeed', 'Bite', 'Take Down'] },
    ],
  },
  {
    name: 'Giovanni',
    segment: 'Pre-Giovanni',
    pokemon: [
      { name: 'Rhyhorn', id: 111, level: 45, types: ['ground', 'rock'], moves: ['Earthquake', 'Take Down', 'Rock Blast', 'Scary Face'] },
      { name: 'Dugtrio', id: 51, level: 42, types: ['ground'], moves: ['Earthquake', 'Slash', 'Sand Tomb', 'Mud-Slap'] },
      { name: 'Nidoqueen', id: 31, level: 44, types: ['poison', 'ground'], moves: ['Earthquake', 'Body Slam', 'Superpower', 'Double Kick'] },
      { name: 'Nidoking', id: 34, level: 45, types: ['poison', 'ground'], moves: ['Earthquake', 'Thrash', 'Megahorn', 'Poison Sting'] },
      { name: 'Rhydon', id: 112, level: 50, types: ['ground', 'rock'], moves: ['Earthquake', 'Rock Blast', 'Scary Face', 'Megahorn'] },
    ],
  },
  {
    name: 'Elite Four: Lorelei',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dewgong', id: 87, level: 52, types: ['water', 'ice'], moves: ['Ice Beam', 'Surf', 'Hail', 'Safeguard'] },
      { name: 'Cloyster', id: 91, level: 51, types: ['water', 'ice'], moves: ['Ice Beam', 'Surf', 'Hail', 'Protect'] },
      { name: 'Slowbro', id: 80, level: 52, types: ['water', 'psychic'], moves: ['Ice Beam', 'Surf', 'Yawn', 'Psychic'] },
      { name: 'Jynx', id: 124, level: 54, types: ['ice', 'psychic'], moves: ['Ice Punch', 'Lovely Kiss', 'Attract', 'Double Slap'] },
      { name: 'Lapras', id: 131, level: 54, types: ['water', 'ice'], moves: ['Ice Beam', 'Surf', 'Body Slam', 'Confuse Ray'] },
    ],
  },
  {
    name: 'Elite Four: Bruno',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Onix', id: 95, level: 51, types: ['rock', 'ground'], moves: ['Earthquake', 'Rock Tomb', 'Iron Tail', 'Roar'] },
      { name: 'Hitmonchan', id: 107, level: 53, types: ['fighting'], moves: ['Sky Uppercut', 'Mach Punch', 'Rock Tomb', 'Counter'] },
      { name: 'Hitmonlee', id: 106, level: 53, types: ['fighting'], moves: ['Hi Jump Kick', 'Mega Kick', 'Foresight', 'Brick Break'] },
      { name: 'Onix', id: 95, level: 54, types: ['rock', 'ground'], moves: ['Earthquake', 'Rock Tomb', 'Iron Tail', 'Dragon Breath'] },
      { name: 'Machamp', id: 68, level: 56, types: ['fighting'], moves: ['Cross Chop', 'Bulk Up', 'Scary Face', 'Rock Tomb'] },
    ],
  },
  {
    name: 'Elite Four: Agatha',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Gengar', id: 94, level: 54, types: ['ghost', 'poison'], moves: ['Shadow Punch', 'Confuse Ray', 'Toxic', 'Hypnosis'] },
      { name: 'Golbat', id: 42, level: 54, types: ['poison', 'flying'], moves: ['Air Cutter', 'Bite', 'Confuse Ray', 'Poison Fang'] },
      { name: 'Haunter', id: 93, level: 53, types: ['ghost', 'poison'], moves: ['Shadow Ball', 'Hypnosis', 'Mean Look', 'Curse'] },
      { name: 'Arbok', id: 24, level: 56, types: ['poison'], moves: ['Sludge Bomb', 'Bite', 'Screech', 'Iron Tail'] },
      { name: 'Gengar', id: 94, level: 58, types: ['ghost', 'poison'], moves: ['Shadow Ball', 'Sludge Bomb', 'Hypnosis', 'Nightmare'] },
    ],
  },
  {
    name: 'Elite Four: Lance',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 56, types: ['water', 'flying'], moves: ['Hyper Beam', 'Dragon Rage', 'Bite', 'Twister'] },
      { name: 'Dragonair', id: 148, level: 54, types: ['dragon'], moves: ['Hyper Beam', 'Dragon Rage', 'Outrage', 'Thunder Wave'] },
      { name: 'Dragonair', id: 148, level: 54, types: ['dragon'], moves: ['Hyper Beam', 'Dragon Rage', 'Outrage', 'Thunderbolt'] },
      { name: 'Aerodactyl', id: 142, level: 58, types: ['rock', 'flying'], moves: ['Hyper Beam', 'AncientPower', 'Wing Attack', 'Scary Face'] },
      { name: 'Dragonite', id: 149, level: 60, types: ['dragon', 'flying'], moves: ['Hyper Beam', 'Outrage', 'Wing Attack', 'Safeguard'] },
    ],
  },
  {
    name: 'Blue (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Pidgeot', id: 18, level: 59, types: ['normal', 'flying'], moves: ['Aerial Ace', 'Feather Dance', 'Sand Attack', 'Whirlwind'] },
      { name: 'Alakazam', id: 65, level: 57, types: ['psychic'], moves: ['Psychic', 'Future Sight', 'Reflect', 'Recover'] },
      { name: 'Rhydon', id: 112, level: 59, types: ['ground', 'rock'], moves: ['Earthquake', 'Take Down', 'Rock Tomb', 'Scary Face'] },
      { name: 'Gyarados', id: 130, level: 59, types: ['water', 'flying'], moves: ['Hydro Pump', 'Dragon Dance', 'Bite', 'Thrash'] },
      { name: 'Arcanine', id: 59, level: 61, types: ['fire'], moves: ['Flamethrower', 'ExtremeSpeed', 'Bite', 'Roar'] },
      { name: 'Exeggutor', id: 103, level: 63, types: ['grass', 'psychic'], moves: ['Giga Drain', 'Egg Bomb', 'Sleep Powder', 'Light Screen'] },
    ],
  },
];

// ── Diamond / Pearl ───────────────────────────────────────────────────────

const DIAMOND_PEARL_BOSSES: BossEntry[] = [
  {
    name: 'Roark',
    segment: 'Pre-Roark',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Stealth Rock', 'Rock Throw', 'Mud Sport'] },
      { name: 'Onix', id: 95, level: 12, types: ['rock', 'ground'], moves: ['Stealth Rock', 'Rock Throw', 'Screech', 'Bind'] },
      { name: 'Cranidos', id: 408, level: 14, types: ['rock'], moves: ['Headbutt', 'Leer', 'Pursuit'] },
    ],
  },
  {
    name: 'Gardenia',
    segment: 'Pre-Gardenia',
    pokemon: [
      { name: 'Cherubi', id: 420, level: 19, types: ['grass'], moves: ['Grass Knot', 'Safeguard', 'Leech Seed'] },
      { name: 'Turtwig', id: 387, level: 19, types: ['grass'], moves: ['Razor Leaf', 'Reflect', 'Grass Knot', 'Sunny Day'] },
      { name: 'Roserade', id: 407, level: 22, types: ['grass', 'poison'], moves: ['Grass Knot', 'Stun Spore', 'Poison Sting', 'Magical Leaf'] },
    ],
  },
  {
    name: 'Maylene',
    segment: 'Pre-Maylene',
    pokemon: [
      { name: 'Meditite', id: 307, level: 27, types: ['fighting', 'psychic'], moves: ['Drain Punch', 'Confusion', 'Detect', 'Fake Out'] },
      { name: 'Machoke', id: 67, level: 27, types: ['fighting'], moves: ['Karate Chop', 'Rock Tomb', 'Strength', 'Foresight'] },
      { name: 'Lucario', id: 448, level: 30, types: ['fighting', 'steel'], moves: ['Drain Punch', 'Metal Claw', 'Force Palm', 'Bone Rush'] },
    ],
  },
  {
    name: 'Crasher Wake',
    segment: 'Pre-Crasher Wake',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 27, types: ['water', 'flying'], moves: ['Waterfall', 'Bite', 'Twister', 'Brine'] },
      { name: 'Quagsire', id: 195, level: 27, types: ['water', 'ground'], moves: ['Mud Shot', 'Water Pulse', 'Mud Bomb', 'Rock Tomb'] },
      { name: 'Floatzel', id: 419, level: 30, types: ['water'], moves: ['Aqua Jet', 'Pursuit', 'Brine', 'Swift'] },
    ],
  },
  {
    name: 'Fantina',
    segment: 'Pre-Fantina',
    pokemon: [
      { name: 'Duskull', id: 355, level: 24, types: ['ghost'], moves: ['Will-O-Wisp', 'Pursuit', 'Shadow Sneak', 'Future Sight'] },
      { name: 'Haunter', id: 93, level: 24, types: ['ghost', 'poison'], moves: ['Shadow Claw', 'Confuse Ray', 'Hypnosis', 'Sucker Punch'] },
      { name: 'Mismagius', id: 429, level: 26, types: ['ghost'], moves: ['Shadow Ball', 'Psybeam', 'Confuse Ray', 'Magical Leaf'] },
    ],
  },
  {
    name: 'Byron',
    segment: 'Pre-Byron',
    pokemon: [
      { name: 'Bronzor', id: 436, level: 36, types: ['steel', 'psychic'], moves: ['Flash Cannon', 'Confuse Ray', 'Hypnosis', 'Extrasensory'] },
      { name: 'Steelix', id: 208, level: 36, types: ['steel', 'ground'], moves: ['Flash Cannon', 'Earthquake', 'Ice Fang', 'Sandstorm'] },
      { name: 'Bastiodon', id: 411, level: 39, types: ['rock', 'steel'], moves: ['Flash Cannon', 'AncientPower', 'Iron Defense', 'Metal Burst'] },
    ],
  },
  {
    name: 'Candice',
    segment: 'Pre-Candice',
    pokemon: [
      { name: 'Sneasel', id: 215, level: 38, types: ['dark', 'ice'], moves: ['Slash', 'Avalanche', 'Faint Attack', 'Icy Wind'] },
      { name: 'Piloswine', id: 221, level: 38, types: ['ice', 'ground'], moves: ['Avalanche', 'Stone Edge', 'Earthquake', 'Hail'] },
      { name: 'Abomasnow', id: 460, level: 40, types: ['grass', 'ice'], moves: ['Wood Hammer', 'Avalanche', 'Water Pulse', 'Swagger'] },
      { name: 'Froslass', id: 478, level: 42, types: ['ice', 'ghost'], moves: ['Blizzard', 'Shadow Ball', 'Psychic', 'Hail'] },
    ],
  },
  {
    name: 'Volkner',
    segment: 'Pre-Volkner',
    pokemon: [
      { name: 'Raichu', id: 26, level: 46, types: ['electric'], moves: ['Charge Beam', 'Signal Beam', 'Quick Attack', 'Brick Break'] },
      { name: 'Ambipom', id: 424, level: 47, types: ['normal'], moves: ['Shock Wave', 'Last Resort', 'Baton Pass', 'Agility'] },
      { name: 'Octillery', id: 224, level: 47, types: ['water'], moves: ['Charge Beam', 'Aurora Beam', 'Bullet Seed', 'Focus Energy'] },
      { name: 'Luxray', id: 405, level: 49, types: ['electric'], moves: ['Thunder Fang', 'Crunch', 'Ice Fang', 'Charge'] },
    ],
  },
  {
    name: 'Elite Four: Aaron',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dustox', id: 269, level: 53, types: ['bug', 'poison'], moves: ['Bug Buzz', 'Toxic', 'Light Screen', 'Double Team'] },
      { name: 'Beautifly', id: 267, level: 53, types: ['bug', 'flying'], moves: ['Bug Buzz', 'Psychic', 'Shadow Ball', 'Energy Ball'] },
      { name: 'Vespiquen', id: 416, level: 54, types: ['bug', 'flying'], moves: ['Attack Order', 'Defend Order', 'Heal Order', 'Power Gem'] },
      { name: 'Heracross', id: 214, level: 54, types: ['bug', 'fighting'], moves: ['Megahorn', 'Close Combat', 'Night Slash', 'Stone Edge'] },
      { name: 'Drapion', id: 452, level: 57, types: ['poison', 'dark'], moves: ['Cross Poison', 'X-Scissor', 'Ice Fang', 'Aerial Ace'] },
    ],
  },
  {
    name: 'Elite Four: Bertha',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Quagsire', id: 195, level: 55, types: ['water', 'ground'], moves: ['Dig', 'Sandstorm', 'Protect', 'Surf'] },
      { name: 'Sudowoodo', id: 185, level: 56, types: ['rock'], moves: ['Sucker Punch', 'Earthquake', 'Sandstorm', 'Rock Slide'] },
      { name: 'Golem', id: 76, level: 56, types: ['rock', 'ground'], moves: ['Earthquake', 'Sandstorm', 'Fire Punch', 'Thunder Punch'] },
      { name: 'Whiscash', id: 340, level: 55, types: ['water', 'ground'], moves: ['Zen Headbutt', 'Earthquake', 'Sandstorm', 'Aqua Tail'] },
      { name: 'Hippowdon', id: 450, level: 59, types: ['ground'], moves: ['Earthquake', 'Crunch', 'Yawn', 'Stone Edge'] },
    ],
  },
  {
    name: 'Elite Four: Flint',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Rapidash', id: 78, level: 58, types: ['fire'], moves: ['Flare Blitz', 'SolarBeam', 'Sunny Day', 'Bounce'] },
      { name: 'Steelix', id: 208, level: 57, types: ['steel', 'ground'], moves: ['Fire Fang', 'Iron Tail', 'Screech', 'Crunch'] },
      { name: 'Drifblim', id: 426, level: 58, types: ['ghost', 'flying'], moves: ['Will-O-Wisp', 'Baton Pass', 'Ominous Wind', 'Double Team'] },
      { name: 'Lopunny', id: 428, level: 57, types: ['normal'], moves: ['Fire Punch', 'Mirror Coat', 'Charm', 'Sunny Day'] },
      { name: 'Infernape', id: 392, level: 61, types: ['fire', 'fighting'], moves: ['Flare Blitz', 'Close Combat', 'Mach Punch', 'Thunder Punch'] },
    ],
  },
  {
    name: 'Elite Four: Lucian',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Mr. Mime', id: 122, level: 59, types: ['psychic'], moves: ['Psychic', 'Thunderbolt', 'Light Screen', 'Reflect'] },
      { name: 'Girafarig', id: 203, level: 59, types: ['normal', 'psychic'], moves: ['Psychic', 'Shadow Ball', 'Crunch', 'Double Hit'] },
      { name: 'Medicham', id: 308, level: 60, types: ['fighting', 'psychic'], moves: ['Psychic', 'Drain Punch', 'Ice Punch', 'Thunder Punch'] },
      { name: 'Alakazam', id: 65, level: 60, types: ['psychic'], moves: ['Psychic', 'Focus Blast', 'Recover', 'Energy Ball'] },
      { name: 'Bronzong', id: 437, level: 63, types: ['steel', 'psychic'], moves: ['Psychic', 'Earthquake', 'Gyro Ball', 'Calm Mind'] },
    ],
  },
  {
    name: 'Cynthia (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Spiritomb', id: 442, level: 61, types: ['ghost', 'dark'], moves: ['Dark Pulse', 'Shadow Ball', 'Silver Wind', 'Psychic'] },
      { name: 'Roserade', id: 407, level: 60, types: ['grass', 'poison'], moves: ['Energy Ball', 'Sludge Bomb', 'Shadow Ball', 'Extrasensory'] },
      { name: 'Gastrodon', id: 423, level: 60, types: ['water', 'ground'], moves: ['Surf', 'Earthquake', 'Stone Edge', 'Sludge Bomb'] },
      { name: 'Lucario', id: 448, level: 63, types: ['fighting', 'steel'], moves: ['Aura Sphere', 'Dragon Pulse', 'Psychic', 'Shadow Ball'] },
      { name: 'Milotic', id: 350, level: 63, types: ['water'], moves: ['Surf', 'Ice Beam', 'Mirror Coat', 'Aqua Ring'] },
      { name: 'Garchomp', id: 445, level: 66, types: ['dragon', 'ground'], moves: ['Dragon Rush', 'Earthquake', 'Brick Break', 'Giga Impact'] },
    ],
  },
];

// ── Platinum ──────────────────────────────────────────────────────────────

const PLATINUM_BOSSES: BossEntry[] = [
  {
    name: 'Roark',
    segment: 'Pre-Roark',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Stealth Rock', 'Rock Throw'] },
      { name: 'Onix', id: 95, level: 12, types: ['rock', 'ground'], moves: ['Stealth Rock', 'Rock Throw', 'Screech'] },
      { name: 'Cranidos', id: 408, level: 14, types: ['rock'], moves: ['Headbutt', 'Leer', 'Pursuit'] },
    ],
  },
  {
    name: 'Gardenia',
    segment: 'Pre-Gardenia',
    pokemon: [
      { name: 'Cherubi', id: 420, level: 19, types: ['grass'], moves: ['Grass Knot', 'Safeguard', 'Leech Seed'] },
      { name: 'Turtwig', id: 387, level: 19, types: ['grass'], moves: ['Razor Leaf', 'Reflect', 'Sunny Day'] },
      { name: 'Roserade', id: 407, level: 22, types: ['grass', 'poison'], moves: ['Grass Knot', 'Stun Spore', 'Magical Leaf', 'Poison Sting'] },
    ],
  },
  {
    name: 'Fantina',
    segment: 'Pre-Fantina',
    pokemon: [
      { name: 'Duskull', id: 355, level: 24, types: ['ghost'], moves: ['Will-O-Wisp', 'Pursuit', 'Shadow Sneak', 'Future Sight'] },
      { name: 'Haunter', id: 93, level: 24, types: ['ghost', 'poison'], moves: ['Shadow Claw', 'Confuse Ray', 'Hypnosis', 'Sucker Punch'] },
      { name: 'Mismagius', id: 429, level: 26, types: ['ghost'], moves: ['Shadow Ball', 'Psybeam', 'Confuse Ray', 'Magical Leaf'] },
    ],
  },
  {
    name: 'Maylene',
    segment: 'Pre-Maylene',
    pokemon: [
      { name: 'Meditite', id: 307, level: 28, types: ['fighting', 'psychic'], moves: ['Drain Punch', 'Confusion', 'Detect', 'Fake Out'] },
      { name: 'Machoke', id: 67, level: 29, types: ['fighting'], moves: ['Karate Chop', 'Rock Tomb', 'Strength'] },
      { name: 'Lucario', id: 448, level: 32, types: ['fighting', 'steel'], moves: ['Drain Punch', 'Metal Claw', 'Force Palm', 'Bone Rush'] },
    ],
  },
  {
    name: 'Crasher Wake',
    segment: 'Pre-Crasher Wake',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 33, types: ['water', 'flying'], moves: ['Waterfall', 'Bite', 'Twister', 'Brine'] },
      { name: 'Quagsire', id: 195, level: 34, types: ['water', 'ground'], moves: ['Mud Shot', 'Water Pulse', 'Mud Bomb', 'Rock Tomb'] },
      { name: 'Floatzel', id: 419, level: 37, types: ['water'], moves: ['Aqua Jet', 'Pursuit', 'Brine', 'Ice Fang'] },
    ],
  },
  {
    name: 'Byron',
    segment: 'Pre-Byron',
    pokemon: [
      { name: 'Magneton', id: 82, level: 37, types: ['electric', 'steel'], moves: ['Flash Cannon', 'Tri Attack', 'Thunderbolt', 'Metal Sound'] },
      { name: 'Steelix', id: 208, level: 38, types: ['steel', 'ground'], moves: ['Flash Cannon', 'Earthquake', 'Ice Fang', 'Sandstorm'] },
      { name: 'Bastiodon', id: 411, level: 41, types: ['rock', 'steel'], moves: ['Flash Cannon', 'AncientPower', 'Iron Defense', 'Metal Burst'] },
    ],
  },
  {
    name: 'Candice',
    segment: 'Pre-Candice',
    pokemon: [
      { name: 'Sneasel', id: 215, level: 40, types: ['dark', 'ice'], moves: ['Slash', 'Avalanche', 'Faint Attack', 'Icy Wind'] },
      { name: 'Piloswine', id: 221, level: 40, types: ['ice', 'ground'], moves: ['Avalanche', 'Stone Edge', 'Earthquake', 'Hail'] },
      { name: 'Abomasnow', id: 460, level: 42, types: ['grass', 'ice'], moves: ['Wood Hammer', 'Avalanche', 'Water Pulse', 'Swagger'] },
      { name: 'Froslass', id: 478, level: 44, types: ['ice', 'ghost'], moves: ['Blizzard', 'Shadow Ball', 'Psychic', 'Hail'] },
    ],
  },
  {
    name: 'Volkner',
    segment: 'Pre-Volkner',
    pokemon: [
      { name: 'Jolteon', id: 135, level: 46, types: ['electric'], moves: ['Charge Beam', 'Shadow Ball', 'Quick Attack', 'Thunder Wave'] },
      { name: 'Raichu', id: 26, level: 46, types: ['electric'], moves: ['Charge Beam', 'Signal Beam', 'Quick Attack', 'Brick Break'] },
      { name: 'Luxray', id: 405, level: 48, types: ['electric'], moves: ['Thunder Fang', 'Crunch', 'Ice Fang', 'Fire Fang'] },
      { name: 'Electivire', id: 466, level: 50, types: ['electric'], moves: ['Thunder Punch', 'Fire Punch', 'Ice Punch', 'Giga Impact'] },
    ],
  },
  {
    name: 'Elite Four: Aaron',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Yanmega', id: 469, level: 49, types: ['bug', 'flying'], moves: ['Bug Buzz', 'Air Slash', 'AncientPower', 'Double Team'] },
      { name: 'Scizor', id: 212, level: 49, types: ['bug', 'steel'], moves: ['X-Scissor', 'Iron Head', 'Night Slash', 'Quick Attack'] },
      { name: 'Vespiquen', id: 416, level: 50, types: ['bug', 'flying'], moves: ['Attack Order', 'Defend Order', 'Heal Order', 'Power Gem'] },
      { name: 'Heracross', id: 214, level: 51, types: ['bug', 'fighting'], moves: ['Megahorn', 'Close Combat', 'Night Slash', 'Stone Edge'] },
      { name: 'Drapion', id: 452, level: 53, types: ['poison', 'dark'], moves: ['Cross Poison', 'X-Scissor', 'Ice Fang', 'Aerial Ace'] },
    ],
  },
  {
    name: 'Elite Four: Bertha',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Whiscash', id: 340, level: 50, types: ['water', 'ground'], moves: ['Zen Headbutt', 'Earthquake', 'Sandstorm', 'Aqua Tail'] },
      { name: 'Gliscor', id: 472, level: 53, types: ['ground', 'flying'], moves: ['Earthquake', 'Fire Fang', 'Ice Fang', 'Thunder Fang'] },
      { name: 'Golem', id: 76, level: 52, types: ['rock', 'ground'], moves: ['Earthquake', 'Sandstorm', 'Fire Punch', 'Thunder Punch'] },
      { name: 'Rhyperior', id: 464, level: 52, types: ['ground', 'rock'], moves: ['Earthquake', 'Rock Wrecker', 'Megahorn', 'Avalanche'] },
      { name: 'Hippowdon', id: 450, level: 55, types: ['ground'], moves: ['Earthquake', 'Crunch', 'Yawn', 'Stone Edge'] },
    ],
  },
  {
    name: 'Elite Four: Flint',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Houndoom', id: 229, level: 52, types: ['dark', 'fire'], moves: ['Flamethrower', 'Dark Pulse', 'Sludge Bomb', 'Sunny Day'] },
      { name: 'Flareon', id: 136, level: 55, types: ['fire'], moves: ['Overheat', 'Quick Attack', 'Will-O-Wisp', 'Giga Impact'] },
      { name: 'Rapidash', id: 78, level: 53, types: ['fire'], moves: ['Flare Blitz', 'SolarBeam', 'Sunny Day', 'Bounce'] },
      { name: 'Infernape', id: 392, level: 55, types: ['fire', 'fighting'], moves: ['Flare Blitz', 'Close Combat', 'Mach Punch', 'Thunder Punch'] },
      { name: 'Magmortar', id: 467, level: 57, types: ['fire'], moves: ['Flamethrower', 'Thunderbolt', 'SolarBeam', 'Hyper Beam'] },
    ],
  },
  {
    name: 'Elite Four: Lucian',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Mr. Mime', id: 122, level: 53, types: ['psychic'], moves: ['Psychic', 'Thunderbolt', 'Light Screen', 'Reflect'] },
      { name: 'Espeon', id: 196, level: 55, types: ['psychic'], moves: ['Psychic', 'Shadow Ball', 'Quick Attack', 'Signal Beam'] },
      { name: 'Bronzong', id: 437, level: 54, types: ['steel', 'psychic'], moves: ['Psychic', 'Earthquake', 'Gyro Ball', 'Calm Mind'] },
      { name: 'Alakazam', id: 65, level: 56, types: ['psychic'], moves: ['Psychic', 'Focus Blast', 'Recover', 'Energy Ball'] },
      { name: 'Gallade', id: 475, level: 59, types: ['psychic', 'fighting'], moves: ['Psycho Cut', 'Drain Punch', 'Leaf Blade', 'Stone Edge'] },
    ],
  },
  {
    name: 'Cynthia (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Spiritomb', id: 442, level: 58, types: ['ghost', 'dark'], moves: ['Dark Pulse', 'Shadow Ball', 'Silver Wind', 'Psychic'] },
      { name: 'Roserade', id: 407, level: 58, types: ['grass', 'poison'], moves: ['Energy Ball', 'Sludge Bomb', 'Shadow Ball', 'Extrasensory'] },
      { name: 'Togekiss', id: 468, level: 60, types: ['fairy', 'flying'], moves: ['Air Slash', 'Aura Sphere', 'Water Pulse', 'Shock Wave'] },
      { name: 'Lucario', id: 448, level: 60, types: ['fighting', 'steel'], moves: ['Aura Sphere', 'Dragon Pulse', 'Psychic', 'Shadow Ball'] },
      { name: 'Milotic', id: 350, level: 58, types: ['water'], moves: ['Surf', 'Ice Beam', 'Mirror Coat', 'Aqua Ring'] },
      { name: 'Garchomp', id: 445, level: 62, types: ['dragon', 'ground'], moves: ['Dragon Rush', 'Earthquake', 'Brick Break', 'Giga Impact'] },
    ],
  },
];

// ── HeartGold / SoulSilver ────────────────────────────────────────────────

const HEARTGOLD_SOULSILVER_BOSSES: BossEntry[] = [
  {
    name: 'Falkner',
    segment: 'Pre-Falkner',
    pokemon: [
      { name: 'Pidgey', id: 16, level: 9, types: ['normal', 'flying'], moves: ['Tackle', 'Sand Attack', 'Gust'] },
      { name: 'Pidgeotto', id: 17, level: 13, types: ['normal', 'flying'], moves: ['Tackle', 'Gust', 'Roost'] },
    ],
  },
  {
    name: 'Bugsy',
    segment: 'Pre-Bugsy',
    pokemon: [
      { name: 'Metapod', id: 11, level: 15, types: ['bug'], moves: ['Tackle', 'String Shot', 'Harden'] },
      { name: 'Kakuna', id: 14, level: 15, types: ['bug', 'poison'], moves: ['Poison Sting', 'String Shot', 'Harden'] },
      { name: 'Scyther', id: 123, level: 17, types: ['bug', 'flying'], moves: ['U-turn', 'Quick Attack', 'Leer', 'Focus Energy'] },
    ],
  },
  {
    name: 'Whitney',
    segment: 'Pre-Whitney',
    pokemon: [
      { name: 'Clefairy', id: 35, level: 17, types: ['normal'], moves: ['DoubleSlap', 'Mimic', 'Encore', 'Metronome'] },
      { name: 'Miltank', id: 241, level: 19, types: ['normal'], moves: ['Rollout', 'Attract', 'Stomp', 'Milk Drink'] },
    ],
  },
  {
    name: 'Morty',
    segment: 'Pre-Morty',
    pokemon: [
      { name: 'Gastly', id: 92, level: 21, types: ['ghost', 'poison'], moves: ['Lick', 'Spite', 'Mean Look', 'Curse'] },
      { name: 'Haunter', id: 93, level: 21, types: ['ghost', 'poison'], moves: ['Hypnosis', 'Curse', 'Mean Look', 'Shadow Ball'] },
      { name: 'Haunter', id: 93, level: 23, types: ['ghost', 'poison'], moves: ['Hypnosis', 'Curse', 'Mean Look', 'Shadow Ball'] },
      { name: 'Gengar', id: 94, level: 25, types: ['ghost', 'poison'], moves: ['Shadow Ball', 'Sucker Punch', 'Mean Look', 'Hypnosis'] },
    ],
  },
  {
    name: 'Chuck',
    segment: 'Pre-Chuck',
    pokemon: [
      { name: 'Primeape', id: 57, level: 29, types: ['fighting'], moves: ['Leer', 'Double Team', 'Rock Slide', 'Focus Punch'] },
      { name: 'Poliwrath', id: 62, level: 31, types: ['water', 'fighting'], moves: ['Hypnosis', 'Focus Punch', 'Surf', 'Body Slam'] },
    ],
  },
  {
    name: 'Jasmine',
    segment: 'Pre-Jasmine',
    pokemon: [
      { name: 'Magnemite', id: 81, level: 30, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Supersonic', 'SonicBoom', 'Thunder Wave'] },
      { name: 'Magnemite', id: 81, level: 30, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Supersonic', 'SonicBoom', 'Thunder Wave'] },
      { name: 'Steelix', id: 208, level: 35, types: ['steel', 'ground'], moves: ['Iron Tail', 'Rock Throw', 'Screech', 'Sandstorm'] },
    ],
  },
  {
    name: 'Pryce',
    segment: 'Pre-Pryce',
    pokemon: [
      { name: 'Seel', id: 86, level: 30, types: ['water'], moves: ['Hail', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Dewgong', id: 87, level: 32, types: ['water', 'ice'], moves: ['Hail', 'Ice Shard', 'Aurora Beam', 'Rest'] },
      { name: 'Piloswine', id: 221, level: 34, types: ['ice', 'ground'], moves: ['Hail', 'Ice Fang', 'Mud Bomb', 'Blizzard'] },
    ],
  },
  {
    name: 'Clair',
    segment: 'Pre-Clair',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 38, types: ['water', 'flying'], moves: ['Dragon Pulse', 'Twister', 'DragonBreath', 'Bite'] },
      { name: 'Dragonair', id: 148, level: 38, types: ['dragon'], moves: ['Dragon Pulse', 'Thunder Wave', 'Slam', 'Fire Blast'] },
      { name: 'Dragonair', id: 148, level: 38, types: ['dragon'], moves: ['Dragon Pulse', 'Thunder Wave', 'Slam', 'Aqua Tail'] },
      { name: 'Kingdra', id: 230, level: 41, types: ['water', 'dragon'], moves: ['Dragon Pulse', 'Hydro Pump', 'SmokeScreen', 'Hyper Beam'] },
    ],
  },
  {
    name: 'Elite Four: Will',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Xatu', id: 178, level: 40, types: ['psychic', 'flying'], moves: ['Psychic', 'Confuse Ray', 'U-turn', 'Aerial Ace'] },
      { name: 'Jynx', id: 124, level: 41, types: ['ice', 'psychic'], moves: ['Psychic', 'Ice Punch', 'Lovely Kiss', 'Double Slap'] },
      { name: 'Exeggutor', id: 103, level: 41, types: ['grass', 'psychic'], moves: ['Psychic', 'Egg Bomb', 'Reflect', 'Hypnosis'] },
      { name: 'Slowbro', id: 80, level: 41, types: ['water', 'psychic'], moves: ['Psychic', 'Body Slam', 'Amnesia', 'Curse'] },
      { name: 'Xatu', id: 178, level: 42, types: ['psychic', 'flying'], moves: ['Psychic', 'Confuse Ray', 'Shadow Ball', 'Me First'] },
    ],
  },
  {
    name: 'Elite Four: Koga',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Ariados', id: 168, level: 40, types: ['bug', 'poison'], moves: ['Bug Bite', 'Poison Jab', 'Baton Pass', 'Giga Drain'] },
      { name: 'Forretress', id: 205, level: 43, types: ['bug', 'steel'], moves: ['Explosion', 'Toxic Spikes', 'Protect', 'Swift'] },
      { name: 'Muk', id: 89, level: 42, types: ['poison'], moves: ['Gunk Shot', 'Minimize', 'Screech', 'Toxic'] },
      { name: 'Venomoth', id: 49, level: 41, types: ['bug', 'poison'], moves: ['Bug Buzz', 'Psychic', 'Signal Beam', 'Toxic'] },
      { name: 'Crobat', id: 169, level: 44, types: ['poison', 'flying'], moves: ['Wing Attack', 'Cross Poison', 'Confuse Ray', 'Double Team'] },
    ],
  },
  {
    name: 'Elite Four: Bruno',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Hitmontop', id: 237, level: 42, types: ['fighting'], moves: ['Dig', 'Triple Kick', 'Counter', 'Quick Attack'] },
      { name: 'Hitmonlee', id: 106, level: 42, types: ['fighting'], moves: ['Hi Jump Kick', 'Blaze Kick', 'Swagger', 'Focus Energy'] },
      { name: 'Hitmonchan', id: 107, level: 42, types: ['fighting'], moves: ['Thunder Punch', 'Ice Punch', 'Fire Punch', 'Bullet Punch'] },
      { name: 'Onix', id: 95, level: 43, types: ['rock', 'ground'], moves: ['Earthquake', 'Rock Slide', 'Sandstorm', 'Dragon Breath'] },
      { name: 'Machamp', id: 68, level: 46, types: ['fighting'], moves: ['Cross Chop', 'Revenge', 'Foresight', 'Rock Slide'] },
    ],
  },
  {
    name: 'Elite Four: Karen',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Umbreon', id: 197, level: 42, types: ['dark'], moves: ['Dark Pulse', 'Confuse Ray', 'Faint Attack', 'Mean Look'] },
      { name: 'Vileplume', id: 45, level: 42, types: ['grass', 'poison'], moves: ['Petal Dance', 'Stun Spore', 'Acid', 'Moonlight'] },
      { name: 'Gengar', id: 94, level: 45, types: ['ghost', 'poison'], moves: ['Shadow Ball', 'Spite', 'Curse', 'Destiny Bond'] },
      { name: 'Murkrow', id: 198, level: 44, types: ['dark', 'flying'], moves: ['Faint Attack', 'Sucker Punch', 'Whirlwind', 'Pursuit'] },
      { name: 'Houndoom', id: 229, level: 47, types: ['dark', 'fire'], moves: ['Flamethrower', 'Dark Pulse', 'Crunch', 'Nasty Plot'] },
    ],
  },
  {
    name: 'Lance (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 46, types: ['water', 'flying'], moves: ['Dragon Dance', 'Waterfall', 'Ice Fang', 'Flail'] },
      { name: 'Dragonite', id: 149, level: 49, types: ['dragon', 'flying'], moves: ['Thunder', 'Hyper Beam', 'Dragon Rush', 'Safeguard'] },
      { name: 'Dragonite', id: 149, level: 49, types: ['dragon', 'flying'], moves: ['Blizzard', 'Hyper Beam', 'Dragon Rush', 'Fire Blast'] },
      { name: 'Charizard', id: 6, level: 48, types: ['fire', 'flying'], moves: ['Flamethrower', 'Air Slash', 'Shadow Claw', 'Dragon Claw'] },
      { name: 'Aerodactyl', id: 142, level: 48, types: ['rock', 'flying'], moves: ['Rock Slide', 'Aerial Ace', 'Crunch', 'Thunder Fang'] },
      { name: 'Dragonite', id: 149, level: 50, types: ['dragon', 'flying'], moves: ['Outrage', 'Hyper Beam', 'Fire Blast', 'Safeguard'] },
    ],
  },
];

// ── Black / White ─────────────────────────────────────────────────────────

const BLACK_WHITE_BOSSES: BossEntry[] = [
  {
    name: 'Cilan/Chili/Cress',
    segment: 'Pre-Cilan/Chili/Cress',
    pokemon: [
      { name: 'Lillipup', id: 506, level: 12, types: ['normal'], moves: ['Work Up', 'Bite', 'Tackle'] },
      { name: 'Pansage', id: 511, level: 14, types: ['grass'], moves: ['Work Up', 'Vine Whip', 'Bite'] },
    ],
  },
  {
    name: 'Lenora',
    segment: 'Pre-Lenora',
    pokemon: [
      { name: 'Herdier', id: 507, level: 18, types: ['normal'], moves: ['Bite', 'Retaliate', 'Take Down', 'Leer'] },
      { name: 'Watchog', id: 505, level: 20, types: ['normal'], moves: ['Retaliate', 'Hypnosis', 'Crunch', 'Leer'] },
    ],
  },
  {
    name: 'Burgh',
    segment: 'Pre-Burgh',
    pokemon: [
      { name: 'Whirlipede', id: 544, level: 21, types: ['bug', 'poison'], moves: ['Poison Tail', 'Screech', 'Pursuit'] },
      { name: 'Dwebble', id: 557, level: 21, types: ['bug', 'rock'], moves: ['Smack Down', 'Faint Attack', 'Sand Attack'] },
      { name: 'Leavanny', id: 542, level: 23, types: ['bug', 'grass'], moves: ['Razor Leaf', 'String Shot', 'Bug Bite', 'Cut'] },
    ],
  },
  {
    name: 'Elesa',
    segment: 'Pre-Elesa',
    pokemon: [
      { name: 'Emolga', id: 587, level: 25, types: ['electric', 'flying'], moves: ['Volt Switch', 'Aerial Ace', 'Pursuit', 'Quick Attack'] },
      { name: 'Emolga', id: 587, level: 25, types: ['electric', 'flying'], moves: ['Volt Switch', 'Aerial Ace', 'Pursuit', 'Quick Attack'] },
      { name: 'Zebstrika', id: 523, level: 27, types: ['electric'], moves: ['Volt Switch', 'Flame Charge', 'Spark', 'Quick Attack'] },
    ],
  },
  {
    name: 'Clay',
    segment: 'Pre-Clay',
    pokemon: [
      { name: 'Krokorok', id: 552, level: 29, types: ['ground', 'dark'], moves: ['Bulldoze', 'Crunch', 'Torment', 'Swagger'] },
      { name: 'Palpitoad', id: 536, level: 29, types: ['water', 'ground'], moves: ['Bulldoze', 'Muddy Water', 'Aqua Ring', 'Rain Dance'] },
      { name: 'Excadrill', id: 530, level: 31, types: ['ground', 'steel'], moves: ['Bulldoze', 'Slash', 'Rock Slide', 'Hone Claws'] },
    ],
  },
  {
    name: 'Skyla',
    segment: 'Pre-Skyla',
    pokemon: [
      { name: 'Swoobat', id: 528, level: 33, types: ['psychic', 'flying'], moves: ['Acrobatics', 'Heart Stamp', 'Assurance', 'Attract'] },
      { name: 'Unfezant', id: 521, level: 33, types: ['normal', 'flying'], moves: ['Air Slash', 'Razor Wind', 'Quick Attack', 'Leer'] },
      { name: 'Swanna', id: 581, level: 35, types: ['water', 'flying'], moves: ['Air Slash', 'BubbleBeam', 'Aerial Ace', 'Aqua Ring'] },
    ],
  },
  {
    name: 'Brycen',
    segment: 'Pre-Brycen',
    pokemon: [
      { name: 'Vanillish', id: 583, level: 37, types: ['ice'], moves: ['Frost Breath', 'Acid Armor', 'Mirror Shot', 'Astonish'] },
      { name: 'Cryogonal', id: 615, level: 37, types: ['ice'], moves: ['Frost Breath', 'Aurora Beam', 'Reflect', 'Rapid Spin'] },
      { name: 'Beartic', id: 614, level: 39, types: ['ice'], moves: ['Icicle Crash', 'Brine', 'Swagger', 'Slash'] },
    ],
  },
  {
    name: 'Drayden/Iris',
    segment: 'Pre-Drayden/Iris',
    pokemon: [
      { name: 'Fraxure', id: 611, level: 41, types: ['dragon'], moves: ['Dragon Tail', 'Dragon Dance', 'Assurance', 'Slash'] },
      { name: 'Druddigon', id: 621, level: 41, types: ['dragon'], moves: ['Dragon Tail', 'Crunch', 'Revenge', 'Chip Away'] },
      { name: 'Haxorus', id: 612, level: 43, types: ['dragon'], moves: ['Dragon Tail', 'Dragon Dance', 'Assurance', 'Slash'] },
    ],
  },
  {
    name: 'Elite Four: Shauntal',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Cofagrigus', id: 563, level: 48, types: ['ghost'], moves: ['Shadow Ball', 'Psychic', 'Will-O-Wisp', 'Grass Knot'] },
      { name: 'Jellicent', id: 593, level: 48, types: ['water', 'ghost'], moves: ['Shadow Ball', 'Surf', 'Energy Ball', 'Brine'] },
      { name: 'Golurk', id: 623, level: 48, types: ['ground', 'ghost'], moves: ['Shadow Punch', 'Earthquake', 'Brick Break', 'Curse'] },
      { name: 'Chandelure', id: 609, level: 50, types: ['ghost', 'fire'], moves: ['Shadow Ball', 'Fire Blast', 'Psychic', 'Payback'] },
    ],
  },
  {
    name: 'Elite Four: Grimsley',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Scrafty', id: 560, level: 48, types: ['dark', 'fighting'], moves: ['Crunch', 'Brick Break', 'Poison Jab', 'Sand Attack'] },
      { name: 'Krookodile', id: 553, level: 48, types: ['ground', 'dark'], moves: ['Crunch', 'Earthquake', 'Dragon Claw', 'Foul Play'] },
      { name: 'Liepard', id: 510, level: 48, types: ['dark'], moves: ['Night Slash', 'Fake Out', 'Attract', 'Aerial Ace'] },
      { name: 'Bisharp', id: 625, level: 50, types: ['dark', 'steel'], moves: ['Night Slash', 'X-Scissor', 'Metal Claw', 'Aerial Ace'] },
    ],
  },
  {
    name: 'Elite Four: Caitlin',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Reuniclus', id: 579, level: 48, types: ['psychic'], moves: ['Psychic', 'Energy Ball', 'Focus Blast', 'Thunder'] },
      { name: 'Musharna', id: 518, level: 48, types: ['psychic'], moves: ['Psychic', 'Shadow Ball', 'Charge Beam', 'Reflect'] },
      { name: 'Sigilyph', id: 561, level: 48, types: ['psychic', 'flying'], moves: ['Psychic', 'Air Slash', 'Shadow Ball', 'Ice Beam'] },
      { name: 'Gothitelle', id: 576, level: 50, types: ['psychic'], moves: ['Psychic', 'Shadow Ball', 'Thunderbolt', 'Calm Mind'] },
    ],
  },
  {
    name: 'Elite Four: Marshal',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Throh', id: 538, level: 48, types: ['fighting'], moves: ['Storm Throw', 'Stone Edge', 'Bulldoze', 'Payback'] },
      { name: 'Sawk', id: 539, level: 48, types: ['fighting'], moves: ['Karate Chop', 'Stone Edge', 'Grass Knot', 'Retaliate'] },
      { name: 'Mienshao', id: 620, level: 48, types: ['fighting'], moves: ['Hi Jump Kick', 'U-turn', 'Rock Slide', 'Retaliate'] },
      { name: 'Conkeldurr', id: 534, level: 50, types: ['fighting'], moves: ['Hammer Arm', 'Stone Edge', 'Grass Knot', 'Bulk Up'] },
    ],
  },
  {
    name: 'N (Final)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Zekrom', id: 644, level: 52, types: ['dragon', 'electric'], moves: ['Fusion Bolt', 'Dragon Breath', 'Slash', 'Zen Headbutt'] },
      { name: 'Carracosta', id: 565, level: 50, types: ['water', 'rock'], moves: ['Waterfall', 'Stone Edge', 'Aqua Jet', 'Crunch'] },
      { name: 'Vanilluxe', id: 584, level: 50, types: ['ice'], moves: ['Blizzard', 'Flash Cannon', 'Hail', 'Frost Breath'] },
      { name: 'Zoroark', id: 571, level: 50, types: ['dark'], moves: ['Night Slash', 'Flamethrower', 'Focus Blast', 'Retaliate'] },
      { name: 'Klinklang', id: 601, level: 50, types: ['steel'], moves: ['Flash Cannon', 'Thunderbolt', 'Hyper Beam', 'Metal Sound'] },
      { name: 'Archeops', id: 567, level: 50, types: ['rock', 'flying'], moves: ['Acrobatics', 'Stone Edge', 'Dragon Claw', 'Crunch'] },
    ],
  },
];

// ── Black 2 / White 2 ────────────────────────────────────────────────────

const BLACK2_WHITE2_BOSSES: BossEntry[] = [
  {
    name: 'Cheren',
    segment: 'Pre-Cheren',
    pokemon: [
      { name: 'Patrat', id: 504, level: 11, types: ['normal'], moves: ['Work Up', 'Tackle', 'Bite', 'Leer'] },
      { name: 'Lillipup', id: 506, level: 13, types: ['normal'], moves: ['Work Up', 'Tackle', 'Bite', 'Leer'] },
    ],
  },
  {
    name: 'Roxie',
    segment: 'Pre-Roxie',
    pokemon: [
      { name: 'Koffing', id: 109, level: 16, types: ['poison'], moves: ['Tackle', 'Poison Gas', 'Assurance', 'Clear Smog'] },
      { name: 'Whirlipede', id: 544, level: 18, types: ['bug', 'poison'], moves: ['Venoshock', 'Pursuit', 'Poison Tail', 'Screech'] },
    ],
  },
  {
    name: 'Burgh',
    segment: 'Pre-Burgh',
    pokemon: [
      { name: 'Swadloon', id: 541, level: 22, types: ['bug', 'grass'], moves: ['Razor Leaf', 'String Shot', 'Bug Bite', 'Struggle Bug'] },
      { name: 'Dwebble', id: 557, level: 22, types: ['bug', 'rock'], moves: ['Smack Down', 'Struggle Bug', 'Faint Attack'] },
      { name: 'Leavanny', id: 542, level: 24, types: ['bug', 'grass'], moves: ['Razor Leaf', 'String Shot', 'Struggle Bug', 'Cut'] },
    ],
  },
  {
    name: 'Elesa',
    segment: 'Pre-Elesa',
    pokemon: [
      { name: 'Emolga', id: 587, level: 28, types: ['electric', 'flying'], moves: ['Volt Switch', 'Aerial Ace', 'Pursuit', 'Quick Attack'] },
      { name: 'Flaaffy', id: 180, level: 28, types: ['electric'], moves: ['Volt Switch', 'Take Down', 'Confuse Ray'] },
      { name: 'Zebstrika', id: 523, level: 30, types: ['electric'], moves: ['Volt Switch', 'Flame Charge', 'Pursuit', 'Quick Attack'] },
    ],
  },
  {
    name: 'Clay',
    segment: 'Pre-Clay',
    pokemon: [
      { name: 'Krokorok', id: 552, level: 31, types: ['ground', 'dark'], moves: ['Bulldoze', 'Crunch', 'Torment', 'Swagger'] },
      { name: 'Sandslash', id: 28, level: 31, types: ['ground'], moves: ['Bulldoze', 'Slash', 'Crush Claw', 'Hone Claws'] },
      { name: 'Excadrill', id: 530, level: 33, types: ['ground', 'steel'], moves: ['Bulldoze', 'Slash', 'Rock Slide', 'Metal Claw'] },
    ],
  },
  {
    name: 'Skyla',
    segment: 'Pre-Skyla',
    pokemon: [
      { name: 'Swoobat', id: 528, level: 37, types: ['psychic', 'flying'], moves: ['Acrobatics', 'Heart Stamp', 'Assurance', 'Attract'] },
      { name: 'Skarmory', id: 227, level: 37, types: ['steel', 'flying'], moves: ['Air Slash', 'Steel Wing', 'Fury Attack', 'Agility'] },
      { name: 'Swanna', id: 581, level: 39, types: ['water', 'flying'], moves: ['Air Slash', 'BubbleBeam', 'Aerial Ace', 'FeatherDance'] },
    ],
  },
  {
    name: 'Drayden',
    segment: 'Pre-Drayden',
    pokemon: [
      { name: 'Druddigon', id: 621, level: 46, types: ['dragon'], moves: ['Dragon Tail', 'Crunch', 'Revenge', 'Chip Away'] },
      { name: 'Flygon', id: 330, level: 46, types: ['ground', 'dragon'], moves: ['Dragon Tail', 'Earth Power', 'Rock Slide', 'Crunch'] },
      { name: 'Haxorus', id: 612, level: 48, types: ['dragon'], moves: ['Dragon Tail', 'Dragon Dance', 'Slash', 'Assurance'] },
    ],
  },
  {
    name: 'Marlon',
    segment: 'Pre-Marlon',
    pokemon: [
      { name: 'Carracosta', id: 565, level: 49, types: ['water', 'rock'], moves: ['Scald', 'Crunch', 'Shell Smash', 'Smack Down'] },
      { name: 'Wailord', id: 321, level: 49, types: ['water'], moves: ['Scald', 'Bounce', 'Amnesia', 'Rollout'] },
      { name: 'Jellicent', id: 593, level: 51, types: ['water', 'ghost'], moves: ['Scald', 'Shadow Ball', 'Ominous Wind', 'Recover'] },
    ],
  },
  {
    name: 'Elite Four: Shauntal',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Cofagrigus', id: 563, level: 56, types: ['ghost'], moves: ['Shadow Ball', 'Psychic', 'Will-O-Wisp', 'Grass Knot'] },
      { name: 'Golurk', id: 623, level: 56, types: ['ground', 'ghost'], moves: ['Shadow Punch', 'Earthquake', 'Brick Break', 'Curse'] },
      { name: 'Drifblim', id: 426, level: 56, types: ['ghost', 'flying'], moves: ['Shadow Ball', 'Psychic', 'Acrobatics', 'Thunderbolt'] },
      { name: 'Chandelure', id: 609, level: 58, types: ['ghost', 'fire'], moves: ['Shadow Ball', 'Fire Blast', 'Psychic', 'Energy Ball'] },
    ],
  },
  {
    name: 'Elite Four: Grimsley',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Liepard', id: 510, level: 56, types: ['dark'], moves: ['Night Slash', 'Fake Out', 'Attract', 'Aerial Ace'] },
      { name: 'Scrafty', id: 560, level: 56, types: ['dark', 'fighting'], moves: ['Crunch', 'Brick Break', 'Poison Jab', 'Rock Tomb'] },
      { name: 'Krookodile', id: 553, level: 56, types: ['ground', 'dark'], moves: ['Crunch', 'Earthquake', 'Dragon Claw', 'Foul Play'] },
      { name: 'Bisharp', id: 625, level: 58, types: ['dark', 'steel'], moves: ['Night Slash', 'X-Scissor', 'Iron Head', 'Aerial Ace'] },
    ],
  },
  {
    name: 'Elite Four: Caitlin',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Musharna', id: 518, level: 56, types: ['psychic'], moves: ['Psychic', 'Shadow Ball', 'Charge Beam', 'Reflect'] },
      { name: 'Sigilyph', id: 561, level: 56, types: ['psychic', 'flying'], moves: ['Psychic', 'Air Slash', 'Shadow Ball', 'Ice Beam'] },
      { name: 'Reuniclus', id: 579, level: 56, types: ['psychic'], moves: ['Psychic', 'Energy Ball', 'Focus Blast', 'Thunder'] },
      { name: 'Gothitelle', id: 576, level: 58, types: ['psychic'], moves: ['Psychic', 'Shadow Ball', 'Thunderbolt', 'Calm Mind'] },
    ],
  },
  {
    name: 'Elite Four: Marshal',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Throh', id: 538, level: 56, types: ['fighting'], moves: ['Storm Throw', 'Stone Edge', 'Bulldoze', 'Payback'] },
      { name: 'Sawk', id: 539, level: 56, types: ['fighting'], moves: ['Close Combat', 'Stone Edge', 'Payback', 'Retaliate'] },
      { name: 'Mienshao', id: 620, level: 56, types: ['fighting'], moves: ['Hi Jump Kick', 'U-turn', 'Rock Slide', 'Bounce'] },
      { name: 'Conkeldurr', id: 534, level: 58, types: ['fighting'], moves: ['Hammer Arm', 'Stone Edge', 'Grass Knot', 'Bulk Up'] },
    ],
  },
  {
    name: 'Iris (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Hydreigon', id: 635, level: 57, types: ['dark', 'dragon'], moves: ['Dragon Pulse', 'Flamethrower', 'Surf', 'Focus Blast'] },
      { name: 'Druddigon', id: 621, level: 57, types: ['dragon'], moves: ['Dragon Tail', 'Flamethrower', 'Focus Blast', 'Rock Slide'] },
      { name: 'Aggron', id: 306, level: 57, types: ['steel', 'rock'], moves: ['Automize', 'Double-Edge', 'Dragon Claw', 'Rock Slide'] },
      { name: 'Archeops', id: 567, level: 57, types: ['rock', 'flying'], moves: ['Acrobatics', 'Stone Edge', 'Dragon Claw', 'Endeavor'] },
      { name: 'Lapras', id: 131, level: 57, types: ['water', 'ice'], moves: ['Surf', 'Ice Beam', 'Thunderbolt', 'Sing'] },
      { name: 'Haxorus', id: 612, level: 59, types: ['dragon'], moves: ['Outrage', 'Earthquake', 'X-Scissor', 'Dragon Dance'] },
    ],
  },
];

// ── X / Y ─────────────────────────────────────────────────────────────────

const X_Y_BOSSES: BossEntry[] = [
  {
    name: 'Viola',
    segment: 'Pre-Viola',
    pokemon: [
      { name: 'Surskit', id: 283, level: 10, types: ['bug', 'water'], moves: ['Bubble', 'Quick Attack', 'Water Sport'] },
      { name: 'Vivillon', id: 666, level: 12, types: ['bug', 'flying'], moves: ['Tackle', 'Infestation', 'Harden'] },
    ],
  },
  {
    name: 'Grant',
    segment: 'Pre-Grant',
    pokemon: [
      { name: 'Amaura', id: 698, level: 25, types: ['rock', 'ice'], moves: ['Take Down', 'Aurora Beam', 'Rock Tomb', 'Thunder Wave'] },
      { name: 'Tyrunt', id: 696, level: 25, types: ['rock', 'dragon'], moves: ['Bite', 'Rock Tomb', 'Stomp', 'Strength'] },
    ],
  },
  {
    name: 'Korrina',
    segment: 'Pre-Korrina',
    pokemon: [
      { name: 'Mienfoo', id: 619, level: 29, types: ['fighting'], moves: ['Power-Up Punch', 'Fake Out', 'Double Slap', 'Swift'] },
      { name: 'Machoke', id: 67, level: 28, types: ['fighting'], moves: ['Power-Up Punch', 'Rock Tomb', 'Leer', 'Strength'] },
      { name: 'Hawlucha', id: 701, level: 32, types: ['fighting', 'flying'], moves: ['Power-Up Punch', 'Flying Press', 'Hone Claws', 'Aerial Ace'] },
    ],
  },
  {
    name: 'Ramos',
    segment: 'Pre-Ramos',
    pokemon: [
      { name: 'Jumpluff', id: 189, level: 30, types: ['grass', 'flying'], moves: ['Acrobatics', 'Leech Seed', 'Grass Knot'] },
      { name: 'Weepinbell', id: 70, level: 31, types: ['grass', 'poison'], moves: ['Poison Powder', 'Acid', 'Grass Knot'] },
      { name: 'Gogoat', id: 673, level: 34, types: ['grass'], moves: ['Bulldoze', 'Take Down', 'Grass Knot', 'Bulk Up'] },
    ],
  },
  {
    name: 'Clemont',
    segment: 'Pre-Clemont',
    pokemon: [
      { name: 'Emolga', id: 587, level: 35, types: ['electric', 'flying'], moves: ['Aerial Ace', 'Volt Switch', 'Quick Attack'] },
      { name: 'Magneton', id: 82, level: 35, types: ['electric', 'steel'], moves: ['Electric Terrain', 'Mirror Shot', 'Thunderbolt'] },
      { name: 'Heliolisk', id: 695, level: 37, types: ['electric', 'normal'], moves: ['Thunderbolt', 'Grass Knot', 'Quick Attack', 'Thunder Wave'] },
    ],
  },
  {
    name: 'Valerie',
    segment: 'Pre-Valerie',
    pokemon: [
      { name: 'Mawile', id: 303, level: 38, types: ['steel', 'fairy'], moves: ['Crunch', 'Iron Defense', 'Feint Attack'] },
      { name: 'Mr. Mime', id: 122, level: 39, types: ['psychic', 'fairy'], moves: ['Psychic', 'Dazzling Gleam', 'Light Screen', 'Reflect'] },
      { name: 'Sylveon', id: 700, level: 42, types: ['fairy'], moves: ['Dazzling Gleam', 'Charm', 'Swift', 'Skill Swap'] },
    ],
  },
  {
    name: 'Olympia',
    segment: 'Pre-Olympia',
    pokemon: [
      { name: 'Sigilyph', id: 561, level: 44, types: ['psychic', 'flying'], moves: ['Psychic', 'Air Slash', 'Light Screen', 'Reflect'] },
      { name: 'Slowking', id: 199, level: 45, types: ['water', 'psychic'], moves: ['Psychic', 'Power Gem', 'Yawn', 'Calm Mind'] },
      { name: 'Meowstic', id: 678, level: 48, types: ['psychic'], moves: ['Psychic', 'Shadow Ball', 'Fake Out', 'Calm Mind'] },
    ],
  },
  {
    name: 'Wulfric',
    segment: 'Pre-Wulfric',
    pokemon: [
      { name: 'Abomasnow', id: 460, level: 56, types: ['grass', 'ice'], moves: ['Energy Ball', 'Ice Beam', 'Ice Shard', 'Leech Seed'] },
      { name: 'Cryogonal', id: 615, level: 55, types: ['ice'], moves: ['Flash Cannon', 'Ice Beam', 'Confuse Ray', 'Hail'] },
      { name: 'Avalugg', id: 713, level: 59, types: ['ice'], moves: ['Crunch', 'Avalanche', 'Curse', 'Gyro Ball'] },
    ],
  },
  {
    name: 'Elite Four: Malva',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Pyroar', id: 668, level: 63, types: ['fire', 'normal'], moves: ['Hyper Voice', 'Flamethrower', 'Noble Roar', 'Wild Charge'] },
      { name: 'Torkoal', id: 324, level: 63, types: ['fire'], moves: ['Flamethrower', 'Curse', 'Stone Edge', 'Flame Vortex'] },
      { name: 'Chandelure', id: 609, level: 63, types: ['ghost', 'fire'], moves: ['Shadow Ball', 'Flamethrower', 'Confuse Ray', 'Confide'] },
      { name: 'Talonflame', id: 663, level: 65, types: ['fire', 'flying'], moves: ['Brave Bird', 'Flare Blitz', 'Quick Attack', 'Flail'] },
    ],
  },
  {
    name: 'Elite Four: Siebold',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Clawitzer', id: 693, level: 63, types: ['water'], moves: ['Water Pulse', 'Dark Pulse', 'Aura Sphere', 'Dragon Pulse'] },
      { name: 'Gyarados', id: 130, level: 63, types: ['water', 'flying'], moves: ['Waterfall', 'Ice Fang', 'Earthquake', 'Dragon Dance'] },
      { name: 'Starmie', id: 121, level: 63, types: ['water', 'psychic'], moves: ['Surf', 'Psychic', 'Dazzling Gleam', 'Light Screen'] },
      { name: 'Barbaracle', id: 689, level: 65, types: ['rock', 'water'], moves: ['Stone Edge', 'Razor Shell', 'Cross Chop', 'X-Scissor'] },
    ],
  },
  {
    name: 'Elite Four: Wikstrom',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Klefki', id: 707, level: 63, types: ['steel', 'fairy'], moves: ['Flash Cannon', 'Dazzling Gleam', 'Spikes', 'Torment'] },
      { name: 'Probopass', id: 476, level: 63, types: ['rock', 'steel'], moves: ['Flash Cannon', 'Power Gem', 'Earth Power', 'Discharge'] },
      { name: 'Scizor', id: 212, level: 63, types: ['bug', 'steel'], moves: ['X-Scissor', 'Iron Head', 'Quick Attack', 'Night Slash'] },
      { name: 'Aegislash', id: 681, level: 65, types: ['steel', 'ghost'], moves: ['King\'s Shield', 'Shadow Claw', 'Iron Head', 'Sacred Sword'] },
    ],
  },
  {
    name: 'Elite Four: Drasna',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dragalge', id: 691, level: 63, types: ['poison', 'dragon'], moves: ['Dragon Pulse', 'Sludge Bomb', 'Thunderbolt', 'Surf'] },
      { name: 'Altaria', id: 334, level: 63, types: ['dragon', 'flying'], moves: ['Dragon Pulse', 'Cotton Guard', 'Moonblast', 'Flamethrower'] },
      { name: 'Druddigon', id: 621, level: 63, types: ['dragon'], moves: ['Dragon Tail', 'Revenge', 'Chip Away', 'Rock Slide'] },
      { name: 'Noivern', id: 715, level: 65, types: ['flying', 'dragon'], moves: ['Dragon Pulse', 'Flamethrower', 'Air Slash', 'Super Fang'] },
    ],
  },
  {
    name: 'Diantha (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Hawlucha', id: 701, level: 64, types: ['fighting', 'flying'], moves: ['Flying Press', 'X-Scissor', 'Swords Dance', 'Poison Jab'] },
      { name: 'Tyrantrum', id: 697, level: 65, types: ['rock', 'dragon'], moves: ['Head Smash', 'Dragon Claw', 'Earthquake', 'Crunch'] },
      { name: 'Aurorus', id: 699, level: 65, types: ['rock', 'ice'], moves: ['Blizzard', 'Thunder', 'Reflect', 'Light Screen'] },
      { name: 'Gourgeist', id: 711, level: 65, types: ['ghost', 'grass'], moves: ['Shadow Sneak', 'Phantom Force', 'Trick-or-Treat', 'Seed Bomb'] },
      { name: 'Goodra', id: 706, level: 66, types: ['dragon'], moves: ['Dragon Pulse', 'Fire Blast', 'Muddy Water', 'Focus Blast'] },
      { name: 'Gardevoir', id: 282, level: 68, types: ['psychic', 'fairy'], moves: ['Moonblast', 'Psychic', 'Shadow Ball', 'Thunderbolt'] },
    ],
  },
];

// ── Omega Ruby / Alpha Sapphire ───────────────────────────────────────────

const ORAS_BOSSES: BossEntry[] = [
  {
    name: 'Roxanne',
    segment: 'Pre-Roxanne',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Rock Tomb', 'Tackle', 'Defense Curl'] },
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Rock Tomb', 'Tackle', 'Defense Curl'] },
      { name: 'Nosepass', id: 299, level: 14, types: ['rock'], moves: ['Rock Tomb', 'Thunder Wave', 'Harden', 'Tackle'] },
    ],
  },
  {
    name: 'Brawly',
    segment: 'Pre-Brawly',
    pokemon: [
      { name: 'Machop', id: 66, level: 14, types: ['fighting'], moves: ['Karate Chop', 'Seismic Toss', 'Bulk Up', 'Low Kick'] },
      { name: 'Meditite', id: 307, level: 14, types: ['fighting', 'psychic'], moves: ['Bulk Up', 'Confusion', 'Bide', 'Detect'] },
      { name: 'Makuhita', id: 296, level: 16, types: ['fighting'], moves: ['Arm Thrust', 'Bulk Up', 'Knock Off', 'Sand Attack'] },
    ],
  },
  {
    name: 'Wattson',
    segment: 'Pre-Wattson',
    pokemon: [
      { name: 'Magnemite', id: 81, level: 19, types: ['electric', 'steel'], moves: ['Volt Switch', 'Magnet Bomb', 'Thunder Wave'] },
      { name: 'Voltorb', id: 100, level: 19, types: ['electric'], moves: ['Volt Switch', 'Rollout', 'Charge'] },
      { name: 'Magneton', id: 82, level: 21, types: ['electric', 'steel'], moves: ['Volt Switch', 'Supersonic', 'Thunder Wave', 'Magnet Bomb'] },
    ],
  },
  {
    name: 'Flannery',
    segment: 'Pre-Flannery',
    pokemon: [
      { name: 'Slugma', id: 218, level: 26, types: ['fire'], moves: ['Overheat', 'Rock Slide', 'Light Screen', 'Sunny Day'] },
      { name: 'Numel', id: 322, level: 26, types: ['fire', 'ground'], moves: ['Overheat', 'Earthquake', 'Sunny Day', 'Bulldoze'] },
      { name: 'Torkoal', id: 324, level: 28, types: ['fire'], moves: ['Overheat', 'Body Slam', 'Attract', 'Curse'] },
    ],
  },
  {
    name: 'Norman',
    segment: 'Pre-Norman',
    pokemon: [
      { name: 'Slaking', id: 289, level: 28, types: ['normal'], moves: ['Retaliate', 'Yawn', 'Feint Attack', 'Encore'] },
      { name: 'Vigoroth', id: 288, level: 28, types: ['normal'], moves: ['Retaliate', 'Slash', 'Encore', 'Feint Attack'] },
      { name: 'Slaking', id: 289, level: 30, types: ['normal'], moves: ['Retaliate', 'Chip Away', 'Feint Attack', 'Counter'] },
    ],
  },
  {
    name: 'Winona',
    segment: 'Pre-Winona',
    pokemon: [
      { name: 'Swellow', id: 277, level: 33, types: ['normal', 'flying'], moves: ['Aerial Ace', 'Quick Attack', 'Endeavor'] },
      { name: 'Pelipper', id: 279, level: 33, types: ['water', 'flying'], moves: ['Water Pulse', 'Roost', 'Aerial Ace', 'Protect'] },
      { name: 'Skarmory', id: 227, level: 33, types: ['steel', 'flying'], moves: ['Steel Wing', 'Aerial Ace', 'Sand Attack', 'Spikes'] },
      { name: 'Altaria', id: 334, level: 35, types: ['dragon', 'flying'], moves: ['Dragon Pulse', 'Cotton Guard', 'Aerial Ace', 'Roost'] },
    ],
  },
  {
    name: 'Tate & Liza',
    segment: 'Pre-Tate & Liza',
    pokemon: [
      { name: 'Lunatone', id: 337, level: 45, types: ['rock', 'psychic'], moves: ['Psychic', 'Hypnosis', 'Rock Slide', 'Calm Mind'] },
      { name: 'Solrock', id: 338, level: 45, types: ['rock', 'psychic'], moves: ['Psychic', 'Solar Beam', 'Sunny Day', 'Fire Spin'] },
    ],
  },
  {
    name: 'Wallace',
    segment: 'Pre-Wallace',
    pokemon: [
      { name: 'Luvdisc', id: 370, level: 44, types: ['water'], moves: ['Water Pulse', 'Attract', 'Sweet Kiss', 'Icy Wind'] },
      { name: 'Whiscash', id: 340, level: 44, types: ['water', 'ground'], moves: ['Water Pulse', 'Earthquake', 'Rain Dance', 'Amnesia'] },
      { name: 'Sealeo', id: 364, level: 44, types: ['ice', 'water'], moves: ['Water Pulse', 'Body Slam', 'Aurora Beam', 'Encore'] },
      { name: 'Seaking', id: 119, level: 44, types: ['water'], moves: ['Water Pulse', 'Horn Drill', 'Megahorn', 'Rain Dance'] },
      { name: 'Milotic', id: 350, level: 46, types: ['water'], moves: ['Water Pulse', 'Ice Beam', 'Recover', 'Disarming Voice'] },
    ],
  },
  {
    name: 'Elite Four: Sidney',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Mightyena', id: 262, level: 50, types: ['dark'], moves: ['Crunch', 'Sucker Punch', 'Take Down', 'Swagger'] },
      { name: 'Shiftry', id: 275, level: 50, types: ['grass', 'dark'], moves: ['Extrasensory', 'Fake Out', 'Leaf Blade', 'Feint Attack'] },
      { name: 'Cacturne', id: 332, level: 50, types: ['grass', 'dark'], moves: ['Needle Arm', 'Leech Seed', 'Spiky Shield', 'Payback'] },
      { name: 'Sharpedo', id: 319, level: 50, types: ['water', 'dark'], moves: ['Crunch', 'Aqua Jet', 'Poison Fang', 'Slash'] },
      { name: 'Absol', id: 359, level: 52, types: ['dark'], moves: ['Night Slash', 'Psycho Cut', 'Aerial Ace', 'Swords Dance'] },
    ],
  },
  {
    name: 'Elite Four: Phoebe',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dusknoir', id: 477, level: 51, types: ['ghost'], moves: ['Shadow Punch', 'Curse', 'Ice Punch', 'Fire Punch'] },
      { name: 'Banette', id: 354, level: 51, types: ['ghost'], moves: ['Shadow Ball', 'Will-O-Wisp', 'Feint Attack', 'Grudge'] },
      { name: 'Sableye', id: 302, level: 51, types: ['dark', 'ghost'], moves: ['Shadow Ball', 'Power Gem', 'Faint Attack', 'Fake Out'] },
      { name: 'Banette', id: 354, level: 51, types: ['ghost'], moves: ['Shadow Ball', 'Psychic', 'Thunderbolt', 'Spite'] },
      { name: 'Dusknoir', id: 477, level: 53, types: ['ghost'], moves: ['Shadow Punch', 'Earthquake', 'Ice Punch', 'Hex'] },
    ],
  },
  {
    name: 'Elite Four: Glacia',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Glalie', id: 362, level: 52, types: ['ice'], moves: ['Ice Beam', 'Crunch', 'Light Screen', 'Hail'] },
      { name: 'Froslass', id: 478, level: 52, types: ['ice', 'ghost'], moves: ['Shadow Ball', 'Blizzard', 'Confuse Ray', 'Hail'] },
      { name: 'Beartic', id: 614, level: 52, types: ['ice'], moves: ['Icicle Crash', 'Brick Break', 'Swagger', 'Shadow Claw'] },
      { name: 'Glalie', id: 362, level: 52, types: ['ice'], moves: ['Ice Beam', 'Shadow Ball', 'Explosion', 'Hail'] },
      { name: 'Walrein', id: 365, level: 54, types: ['ice', 'water'], moves: ['Blizzard', 'Surf', 'Body Slam', 'Sheer Cold'] },
    ],
  },
  {
    name: 'Elite Four: Drake',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Altaria', id: 334, level: 53, types: ['dragon', 'flying'], moves: ['Dragon Pulse', 'Cotton Guard', 'Moonblast', 'Flamethrower'] },
      { name: 'Flygon', id: 330, level: 53, types: ['ground', 'dragon'], moves: ['Dragon Claw', 'Earthquake', 'Flamethrower', 'Screech'] },
      { name: 'Kingdra', id: 230, level: 53, types: ['water', 'dragon'], moves: ['Dragon Pulse', 'Surf', 'Ice Beam', 'Yawn'] },
      { name: 'Dragalge', id: 691, level: 53, types: ['poison', 'dragon'], moves: ['Dragon Pulse', 'Sludge Wave', 'Thunderbolt', 'Hydro Pump'] },
      { name: 'Salamence', id: 373, level: 55, types: ['dragon', 'flying'], moves: ['Dragon Rush', 'Crunch', 'Zen Headbutt', 'Thunder Fang'] },
    ],
  },
  {
    name: 'Steven (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Skarmory', id: 227, level: 57, types: ['steel', 'flying'], moves: ['Steel Wing', 'Spikes', 'Toxic', 'Aerial Ace'] },
      { name: 'Claydol', id: 344, level: 57, types: ['ground', 'psychic'], moves: ['Earth Power', 'Extrasensory', 'Light Screen', 'Reflect'] },
      { name: 'Aggron', id: 306, level: 57, types: ['steel', 'rock'], moves: ['Iron Tail', 'Stone Edge', 'Earthquake', 'Dragon Claw'] },
      { name: 'Cradily', id: 346, level: 57, types: ['rock', 'grass'], moves: ['Giga Drain', 'AncientPower', 'Sludge Bomb', 'Confuse Ray'] },
      { name: 'Armaldo', id: 348, level: 57, types: ['rock', 'bug'], moves: ['X-Scissor', 'Rock Blast', 'Crush Claw', 'Aerial Ace'] },
      { name: 'Metagross', id: 376, level: 59, types: ['steel', 'psychic'], moves: ['Meteor Mash', 'Zen Headbutt', 'Giga Impact', 'Bullet Punch'] },
    ],
  },
];

// ── Sun / Moon ────────────────────────────────────────────────────────────

const SUN_MOON_BOSSES: BossEntry[] = [
  {
    name: 'Ilima (Trial)',
    segment: 'Pre-Ilima',
    pokemon: [
      { name: 'Gumshoos', id: 735, level: 12, types: ['normal'], moves: ['Bite', 'Pursuit', 'Sand Attack', 'Super Fang'] },
    ],
  },
  {
    name: 'Hala (Kahuna)',
    segment: 'Pre-Hala',
    pokemon: [
      { name: 'Mankey', id: 56, level: 14, types: ['fighting'], moves: ['Pursuit', 'Karate Chop', 'Focus Energy'] },
      { name: 'Makuhita', id: 296, level: 14, types: ['fighting'], moves: ['Fake Out', 'Sand Attack', 'Arm Thrust', 'Knock Off'] },
      { name: 'Crabrawler', id: 739, level: 15, types: ['fighting'], moves: ['Power-Up Punch', 'Pursuit', 'Leer', 'All-Out Pummeling'] },
    ],
  },
  {
    name: 'Lana (Trial)',
    segment: 'Pre-Lana',
    pokemon: [
      { name: 'Wishiwashi', id: 746, level: 24, types: ['water'], moves: ['Water Gun', 'Tearful Look', 'Brine', 'Aqua Tail'] },
    ],
  },
  {
    name: 'Kiawe (Trial)',
    segment: 'Pre-Kiawe',
    pokemon: [
      { name: 'Salazzle', id: 758, level: 26, types: ['poison', 'fire'], moves: ['Flame Burst', 'Toxic', 'Venoshock', 'Torment'] },
    ],
  },
  {
    name: 'Mallow (Trial)',
    segment: 'Pre-Mallow',
    pokemon: [
      { name: 'Lurantis', id: 754, level: 24, types: ['grass'], moves: ['Solar Blade', 'X-Scissor', 'Razor Leaf', 'Synthesis'] },
    ],
  },
  {
    name: 'Olivia (Kahuna)',
    segment: 'Pre-Olivia',
    pokemon: [
      { name: 'Nosepass', id: 299, level: 26, types: ['rock'], moves: ['Rock Slide', 'Thunder Wave', 'Block'] },
      { name: 'Boldore', id: 525, level: 26, types: ['rock'], moves: ['Rock Blast', 'Headbutt', 'Mud-Slap'] },
      { name: 'Lycanroc', id: 745, level: 27, types: ['rock'], moves: ['Rock Throw', 'Bite', 'Rock Tomb', 'Continental Crush'] },
    ],
  },
  {
    name: 'Sophocles (Trial)',
    segment: 'Pre-Sophocles',
    pokemon: [
      { name: 'Vikavolt', id: 738, level: 33, types: ['bug', 'electric'], moves: ['Spark', 'Vice Grip', 'Mud-Slap', 'Bug Bite'] },
    ],
  },
  {
    name: 'Acerola (Trial)',
    segment: 'Pre-Acerola',
    pokemon: [
      { name: 'Mimikyu', id: 778, level: 35, types: ['ghost', 'fairy'], moves: ['Shadow Claw', 'Play Rough', 'Mimic', 'Astonish'] },
    ],
  },
  {
    name: 'Nanu (Kahuna)',
    segment: 'Pre-Vast Poni',
    pokemon: [
      { name: 'Sableye', id: 302, level: 43, types: ['dark', 'ghost'], moves: ['Shadow Claw', 'Power Gem', 'Fake Out', 'Shadow Ball'] },
      { name: 'Krokorok', id: 552, level: 43, types: ['ground', 'dark'], moves: ['Crunch', 'Earthquake', 'Swagger', 'Assurance'] },
      { name: 'Persian', id: 53, level: 44, types: ['dark'], moves: ['Power Gem', 'Dark Pulse', 'Fake Out', 'Black Hole Eclipse'] },
    ],
  },
  {
    name: 'Hapu (Kahuna)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dugtrio', id: 51, level: 47, types: ['ground', 'steel'], moves: ['Earthquake', 'Iron Head', 'Sucker Punch'] },
      { name: 'Gastrodon', id: 423, level: 47, types: ['water', 'ground'], moves: ['Muddy Water', 'Earth Power', 'Recover'] },
      { name: 'Flygon', id: 330, level: 47, types: ['ground', 'dragon'], moves: ['Earth Power', 'Dragon Breath', 'Rock Slide'] },
      { name: 'Mudsdale', id: 750, level: 48, types: ['ground'], moves: ['Earthquake', 'Heavy Slam', 'Counter', 'Tectonic Rage'] },
    ],
  },
  {
    name: 'Elite Four: Hala',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Hariyama', id: 297, level: 54, types: ['fighting'], moves: ['Fake Out', 'Close Combat', 'Knock Off', 'Ice Punch'] },
      { name: 'Primeape', id: 57, level: 54, types: ['fighting'], moves: ['Cross Chop', 'Outrage', 'Punishment', 'U-turn'] },
      { name: 'Bewear', id: 760, level: 54, types: ['normal', 'fighting'], moves: ['Hammer Arm', 'Ice Punch', 'Thrash', 'Brutal Swing'] },
      { name: 'Poliwrath', id: 62, level: 54, types: ['water', 'fighting'], moves: ['Waterfall', 'Submission', 'Body Slam', 'Scald'] },
      { name: 'Crabominable', id: 740, level: 55, types: ['fighting', 'ice'], moves: ['Close Combat', 'Ice Hammer', 'Stone Edge', 'All-Out Pummeling'] },
    ],
  },
  {
    name: 'Elite Four: Olivia',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Relicanth', id: 369, level: 54, types: ['water', 'rock'], moves: ['Head Smash', 'Aqua Tail', 'Yawn', 'Double-Edge'] },
      { name: 'Carbink', id: 703, level: 54, types: ['rock', 'fairy'], moves: ['Power Gem', 'Moonblast', 'Reflect', 'Light Screen'] },
      { name: 'Golem', id: 76, level: 54, types: ['rock', 'electric'], moves: ['Steamroller', 'Discharge', 'Rock Blast', 'Thunder Punch'] },
      { name: 'Probopass', id: 476, level: 54, types: ['rock', 'steel'], moves: ['Earth Power', 'Power Gem', 'Sandstorm', 'Thunder Wave'] },
      { name: 'Lycanroc', id: 745, level: 55, types: ['rock'], moves: ['Stone Edge', 'Crunch', 'Stealth Rock', 'Continental Crush'] },
    ],
  },
  {
    name: 'Elite Four: Acerola',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Sableye', id: 302, level: 54, types: ['dark', 'ghost'], moves: ['Shadow Claw', 'Fake Out', 'Power Gem', 'Zen Headbutt'] },
      { name: 'Dhelmise', id: 781, level: 54, types: ['ghost', 'grass'], moves: ['Shadow Ball', 'Energy Ball', 'Whirlpool', 'Phantom Force'] },
      { name: 'Drifblim', id: 426, level: 54, types: ['ghost', 'flying'], moves: ['Shadow Ball', 'Icy Wind', 'Amnesia', 'Baton Pass'] },
      { name: 'Froslass', id: 478, level: 54, types: ['ice', 'ghost'], moves: ['Shadow Ball', 'Blizzard', 'Confuse Ray', 'Hail'] },
      { name: 'Palossand', id: 770, level: 55, types: ['ghost', 'ground'], moves: ['Shadow Ball', 'Earth Power', 'Shore Up', 'Never-Ending Nightmare'] },
    ],
  },
  {
    name: 'Elite Four: Kahili',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Skarmory', id: 227, level: 54, types: ['steel', 'flying'], moves: ['Steel Wing', 'Spikes', 'Slash', 'X-Scissor'] },
      { name: 'Crobat', id: 169, level: 54, types: ['poison', 'flying'], moves: ['Cross Poison', 'Air Slash', 'Confuse Ray', 'U-turn'] },
      { name: 'Oricorio', id: 741, level: 54, types: ['fire', 'flying'], moves: ['Revelation Dance', 'Air Slash', 'Teeter Dance', 'Captivate'] },
      { name: 'Mandibuzz', id: 630, level: 54, types: ['dark', 'flying'], moves: ['Brave Bird', 'Bone Rush', 'Punishment', 'Tailwind'] },
      { name: 'Toucannon', id: 733, level: 55, types: ['normal', 'flying'], moves: ['Beak Blast', 'Bullet Seed', 'Rock Blast', 'Supersonic Skystrike'] },
    ],
  },
  {
    name: 'Professor Kukui',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Lycanroc', id: 745, level: 57, types: ['rock'], moves: ['Stone Edge', 'Accelerock', 'Crunch', 'Stealth Rock'] },
      { name: 'Snorlax', id: 143, level: 56, types: ['normal'], moves: ['Body Slam', 'Heavy Slam', 'Crunch', 'High Horsepower'] },
      { name: 'Magnezone', id: 462, level: 56, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Flash Cannon', 'Thunder Wave'] },
      { name: 'Braviary', id: 628, level: 56, types: ['normal', 'flying'], moves: ['Brave Bird', 'Crush Claw', 'Tailwind', 'Whirlwind'] },
      { name: 'Ninetales', id: 38, level: 56, types: ['ice', 'fairy'], moves: ['Blizzard', 'Dazzling Gleam', 'Ice Shard', 'Safeguard'] },
      { name: 'Incineroar', id: 727, level: 58, types: ['fire', 'dark'], moves: ['Darkest Lariat', 'Flare Blitz', 'Cross Chop', 'Outrage'] },
    ],
  },
];

// ── Ultra Sun / Ultra Moon ────────────────────────────────────────────────

const ULTRA_SUN_ULTRA_MOON_BOSSES: BossEntry[] = [
  {
    name: 'Ilima (Trial)',
    segment: 'Pre-Ilima',
    pokemon: [
      { name: 'Gumshoos', id: 735, level: 12, types: ['normal'], moves: ['Bite', 'Pursuit', 'Sand Attack', 'Super Fang'] },
    ],
  },
  {
    name: 'Hala (Kahuna)',
    segment: 'Pre-Hala',
    pokemon: [
      { name: 'Mankey', id: 56, level: 14, types: ['fighting'], moves: ['Pursuit', 'Karate Chop', 'Focus Energy'] },
      { name: 'Makuhita', id: 296, level: 14, types: ['fighting'], moves: ['Fake Out', 'Sand Attack', 'Arm Thrust', 'Knock Off'] },
      { name: 'Crabrawler', id: 739, level: 15, types: ['fighting'], moves: ['Power-Up Punch', 'Pursuit', 'Leer', 'All-Out Pummeling'] },
    ],
  },
  {
    name: 'Lana (Trial)',
    segment: 'Pre-Lana',
    pokemon: [
      { name: 'Araquanid', id: 752, level: 24, types: ['water', 'bug'], moves: ['Bug Bite', 'Aurora Beam', 'Bubble Beam', 'Spider Web'] },
    ],
  },
  {
    name: 'Kiawe (Trial)',
    segment: 'Pre-Kiawe',
    pokemon: [
      { name: 'Marowak', id: 105, level: 26, types: ['fire', 'ghost'], moves: ['Flame Wheel', 'Hex', 'Will-O-Wisp', 'Shadow Bone'] },
    ],
  },
  {
    name: 'Mallow (Trial)',
    segment: 'Pre-Mallow',
    pokemon: [
      { name: 'Lurantis', id: 754, level: 24, types: ['grass'], moves: ['Solar Blade', 'X-Scissor', 'Razor Leaf', 'Synthesis'] },
    ],
  },
  {
    name: 'Olivia (Kahuna)',
    segment: 'Pre-Olivia',
    pokemon: [
      { name: 'Nosepass', id: 299, level: 26, types: ['rock'], moves: ['Rock Slide', 'Thunder Wave', 'Block'] },
      { name: 'Boldore', id: 525, level: 26, types: ['rock'], moves: ['Rock Blast', 'Headbutt', 'Mud-Slap'] },
      { name: 'Lycanroc', id: 745, level: 27, types: ['rock'], moves: ['Rock Throw', 'Bite', 'Rock Tomb', 'Continental Crush'] },
    ],
  },
  {
    name: 'Sophocles (Trial)',
    segment: 'Pre-Sophocles',
    pokemon: [
      { name: 'Togedemaru', id: 777, level: 33, types: ['electric', 'steel'], moves: ['Zing Zap', 'Iron Head', 'Spiky Shield', 'Bounce'] },
    ],
  },
  {
    name: 'Acerola (Trial)',
    segment: 'Pre-Acerola',
    pokemon: [
      { name: 'Mimikyu', id: 778, level: 35, types: ['ghost', 'fairy'], moves: ['Shadow Claw', 'Play Rough', 'Mimic', 'Astonish'] },
    ],
  },
  {
    name: 'Nanu (Kahuna)',
    segment: 'Pre-Vast Poni',
    pokemon: [
      { name: 'Sableye', id: 302, level: 43, types: ['dark', 'ghost'], moves: ['Shadow Claw', 'Power Gem', 'Fake Out'] },
      { name: 'Krokorok', id: 552, level: 43, types: ['ground', 'dark'], moves: ['Crunch', 'Earthquake', 'Swagger'] },
      { name: 'Persian', id: 53, level: 44, types: ['dark'], moves: ['Power Gem', 'Dark Pulse', 'Fake Out', 'Black Hole Eclipse'] },
    ],
  },
  {
    name: 'Hapu (Kahuna)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dugtrio', id: 51, level: 48, types: ['ground', 'steel'], moves: ['Earthquake', 'Iron Head', 'Sucker Punch'] },
      { name: 'Gastrodon', id: 423, level: 48, types: ['water', 'ground'], moves: ['Muddy Water', 'Earth Power', 'Recover'] },
      { name: 'Flygon', id: 330, level: 48, types: ['ground', 'dragon'], moves: ['Earth Power', 'Dragon Breath', 'Rock Slide'] },
      { name: 'Mudsdale', id: 750, level: 49, types: ['ground'], moves: ['Earthquake', 'Heavy Slam', 'Counter', 'Tectonic Rage'] },
    ],
  },
  {
    name: 'Elite Four: Molayne',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Klefki', id: 707, level: 56, types: ['steel', 'fairy'], moves: ['Flash Cannon', 'Dazzling Gleam', 'Spikes', 'Thunder Wave'] },
      { name: 'Bisharp', id: 625, level: 56, types: ['dark', 'steel'], moves: ['Night Slash', 'Iron Head', 'X-Scissor', 'Swords Dance'] },
      { name: 'Magnezone', id: 462, level: 56, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Flash Cannon', 'Thunder Wave'] },
      { name: 'Metagross', id: 376, level: 56, types: ['steel', 'psychic'], moves: ['Zen Headbutt', 'Meteor Mash', 'Bullet Punch', 'Hammer Arm'] },
      { name: 'Durandal', id: 681, level: 57, types: ['steel', 'ghost'], moves: ['Iron Head', 'Shadow Claw', 'Sacred Sword', 'King\'s Shield'] },
    ],
  },
  {
    name: 'Elite Four: Olivia',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Armaldo', id: 348, level: 56, types: ['rock', 'bug'], moves: ['X-Scissor', 'Rock Blast', 'Crush Claw'] },
      { name: 'Cradily', id: 346, level: 56, types: ['rock', 'grass'], moves: ['Giga Drain', 'AncientPower', 'Sludge Bomb'] },
      { name: 'Gigalith', id: 526, level: 56, types: ['rock'], moves: ['Stone Edge', 'Earthquake', 'Stealth Rock'] },
      { name: 'Probopass', id: 476, level: 56, types: ['rock', 'steel'], moves: ['Power Gem', 'Earth Power', 'Flash Cannon'] },
      { name: 'Lycanroc', id: 745, level: 57, types: ['rock'], moves: ['Stone Edge', 'Crunch', 'Drill Run', 'Continental Crush'] },
    ],
  },
  {
    name: 'Elite Four: Acerola',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Banette', id: 354, level: 56, types: ['ghost'], moves: ['Shadow Claw', 'Will-O-Wisp', 'Sucker Punch'] },
      { name: 'Drifblim', id: 426, level: 56, types: ['ghost', 'flying'], moves: ['Shadow Ball', 'Fly', 'Amnesia'] },
      { name: 'Dhelmise', id: 781, level: 56, types: ['ghost', 'grass'], moves: ['Shadow Ball', 'Energy Ball', 'Phantom Force'] },
      { name: 'Froslass', id: 478, level: 56, types: ['ice', 'ghost'], moves: ['Shadow Ball', 'Blizzard', 'Confuse Ray'] },
      { name: 'Palossand', id: 770, level: 57, types: ['ghost', 'ground'], moves: ['Shadow Ball', 'Earth Power', 'Shore Up', 'Never-Ending Nightmare'] },
    ],
  },
  {
    name: 'Elite Four: Kahili',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Braviary', id: 628, level: 56, types: ['normal', 'flying'], moves: ['Brave Bird', 'Crush Claw', 'Tailwind', 'Whirlwind'] },
      { name: 'Hawlucha', id: 701, level: 56, types: ['fighting', 'flying'], moves: ['High Jump Kick', 'Aerial Ace', 'Poison Jab'] },
      { name: 'Oricorio', id: 741, level: 56, types: ['fire', 'flying'], moves: ['Revelation Dance', 'Air Slash', 'Teeter Dance'] },
      { name: 'Mandibuzz', id: 630, level: 56, types: ['dark', 'flying'], moves: ['Brave Bird', 'Bone Rush', 'Punishment'] },
      { name: 'Toucannon', id: 733, level: 57, types: ['normal', 'flying'], moves: ['Beak Blast', 'Bullet Seed', 'Rock Blast', 'Supersonic Skystrike'] },
    ],
  },
  {
    name: 'Professor Kukui',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Lycanroc', id: 745, level: 58, types: ['rock'], moves: ['Stone Edge', 'Accelerock', 'Crunch', 'Stealth Rock'] },
      { name: 'Snorlax', id: 143, level: 58, types: ['normal'], moves: ['Body Slam', 'Heavy Slam', 'Crunch', 'High Horsepower'] },
      { name: 'Magnezone', id: 462, level: 58, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Flash Cannon', 'Thunder Wave'] },
      { name: 'Braviary', id: 628, level: 58, types: ['normal', 'flying'], moves: ['Brave Bird', 'Crush Claw', 'Tailwind'] },
      { name: 'Ninetales', id: 38, level: 58, types: ['ice', 'fairy'], moves: ['Blizzard', 'Dazzling Gleam', 'Ice Shard'] },
      { name: 'Incineroar', id: 727, level: 60, types: ['fire', 'dark'], moves: ['Darkest Lariat', 'Flare Blitz', 'Cross Chop', 'Outrage'] },
    ],
  },
];

// ── Sword / Shield ────────────────────────────────────────────────────────

const SWORD_SHIELD_BOSSES: BossEntry[] = [
  {
    name: 'Milo',
    segment: 'Pre-Milo',
    pokemon: [
      { name: 'Gossifleur', id: 829, level: 19, types: ['grass'], moves: ['Magical Leaf', 'Rapid Spin', 'Sweet Scent'] },
      { name: 'Eldegoss', id: 830, level: 20, types: ['grass'], moves: ['Magical Leaf', 'Leafage', 'Rapid Spin', 'Max Overgrowth'] },
    ],
  },
  {
    name: 'Nessa',
    segment: 'Pre-Nessa',
    pokemon: [
      { name: 'Goldeen', id: 118, level: 22, types: ['water'], moves: ['Water Pulse', 'Horn Attack', 'Agility'] },
      { name: 'Arrokuda', id: 846, level: 23, types: ['water'], moves: ['Aqua Jet', 'Bite', 'Fury Attack'] },
      { name: 'Drednaw', id: 834, level: 24, types: ['water', 'rock'], moves: ['Razor Shell', 'Bite', 'Headbutt', 'Max Geyser'] },
    ],
  },
  {
    name: 'Kabu',
    segment: 'Pre-Kabu',
    pokemon: [
      { name: 'Ninetales', id: 38, level: 25, types: ['fire'], moves: ['Fire Spin', 'Quick Attack', 'Will-O-Wisp'] },
      { name: 'Arcanine', id: 59, level: 25, types: ['fire'], moves: ['Flame Wheel', 'Bite', 'Will-O-Wisp', 'Retaliate'] },
      { name: 'Centiskorch', id: 851, level: 27, types: ['fire', 'bug'], moves: ['Bug Bite', 'Flame Wheel', 'Coil', 'Max Flare'] },
    ],
  },
  {
    name: 'Bea/Allister',
    segment: 'Pre-Bea/Allister',
    pokemon: [
      { name: 'Hitmontop', id: 237, level: 34, types: ['fighting'], moves: ['Triple Kick', 'Counter', 'Detect'] },
      { name: 'Pangoro', id: 675, level: 34, types: ['fighting', 'dark'], moves: ['Circle Throw', 'Bullet Punch', 'Crunch'] },
      { name: 'Sirfetch\'d', id: 865, level: 35, types: ['fighting'], moves: ['Detect', 'Brutal Swing', 'Revenge'] },
      { name: 'Machamp', id: 68, level: 36, types: ['fighting'], moves: ['Strength', 'Revenge', 'Knock Off', 'Max Knuckle'] },
    ],
  },
  {
    name: 'Opal',
    segment: 'Pre-Opal',
    pokemon: [
      { name: 'Weezing', id: 110, level: 36, types: ['poison', 'fairy'], moves: ['Fairy Wind', 'Sludge', 'Tackle'] },
      { name: 'Mawile', id: 303, level: 36, types: ['steel', 'fairy'], moves: ['Crunch', 'Iron Defense', 'Fairy Wind'] },
      { name: 'Togekiss', id: 468, level: 37, types: ['fairy', 'flying'], moves: ['Air Slash', 'Fairy Wind', 'Ancient Power'] },
      { name: 'Alcremie', id: 869, level: 38, types: ['fairy'], moves: ['Dazzling Gleam', 'Mystical Fire', 'Acid Armor', 'Max Starfall'] },
    ],
  },
  {
    name: 'Gordie/Melony',
    segment: 'Pre-Gordie/Melony',
    pokemon: [
      { name: 'Barbaracle', id: 689, level: 40, types: ['rock', 'water'], moves: ['Shell Smash', 'Rock Tomb', 'Slash'] },
      { name: 'Shuckle', id: 213, level: 40, types: ['bug', 'rock'], moves: ['Rock Tomb', 'Struggle Bug', 'Guard Split'] },
      { name: 'Stonjourner', id: 874, level: 41, types: ['rock'], moves: ['Rock Tomb', 'Body Slam', 'Stealth Rock'] },
      { name: 'Coalossal', id: 839, level: 42, types: ['rock', 'fire'], moves: ['Rock Tomb', 'Heat Crash', 'Tar Shot', 'Max Rockfall'] },
    ],
  },
  {
    name: 'Piers',
    segment: 'Pre-Piers',
    pokemon: [
      { name: 'Scrafty', id: 560, level: 44, types: ['dark', 'fighting'], moves: ['Fake Out', 'Payback', 'Brick Break', 'Swagger'] },
      { name: 'Malamar', id: 687, level: 44, types: ['dark', 'psychic'], moves: ['Night Slash', 'Foul Play', 'Psycho Cut'] },
      { name: 'Skuntank', id: 435, level: 45, types: ['poison', 'dark'], moves: ['Sucker Punch', 'Snarl', 'Toxic'] },
      { name: 'Obstagoon', id: 862, level: 46, types: ['dark', 'normal'], moves: ['Night Slash', 'Counter', 'Obstruct', 'Shadow Claw'] },
    ],
  },
  {
    name: 'Raihan',
    segment: 'Pre-Raihan',
    pokemon: [
      { name: 'Flygon', id: 330, level: 47, types: ['ground', 'dragon'], moves: ['Steel Wing', 'Dragon Claw', 'Earth Power', 'Crunch'] },
      { name: 'Gigalith', id: 526, level: 46, types: ['rock'], moves: ['Stealth Rock', 'Rock Blast', 'Body Press'] },
      { name: 'Sandaconda', id: 844, level: 46, types: ['ground'], moves: ['Fire Fang', 'Earthquake', 'Minimize'] },
      { name: 'Duraludon', id: 884, level: 48, types: ['steel', 'dragon'], moves: ['Dragon Claw', 'Iron Head', 'Stone Edge', 'Max Wyrmwind'] },
    ],
  },
  {
    name: 'Champion Cup: Marnie',
    segment: 'Pre-Champion Cup',
    pokemon: [
      { name: 'Liepard', id: 510, level: 47, types: ['dark'], moves: ['Fake Out', 'Nasty Plot', 'Snarl', 'Torment'] },
      { name: 'Toxicroak', id: 454, level: 47, types: ['poison', 'fighting'], moves: ['Sucker Punch', 'Poison Jab', 'Venoshock'] },
      { name: 'Scrafty', id: 560, level: 47, types: ['dark', 'fighting'], moves: ['Fake Out', 'Payback', 'Brick Break'] },
      { name: 'Morpeko', id: 877, level: 48, types: ['electric', 'dark'], moves: ['Aura Wheel', 'Bullet Seed', 'Bite', 'Spark'] },
      { name: 'Grimmsnarl', id: 861, level: 49, types: ['dark', 'fairy'], moves: ['Spirit Break', 'Darkest Lariat', 'Bulk Up', 'Max Darkness'] },
    ],
  },
  {
    name: 'Champion Cup: Hop',
    segment: 'Pre-Champion Cup',
    pokemon: [
      { name: 'Dubwool', id: 832, level: 48, types: ['normal'], moves: ['Cotton Guard', 'Body Slam', 'Zen Headbutt'] },
      { name: 'Corviknight', id: 823, level: 48, types: ['flying', 'steel'], moves: ['Steel Wing', 'Brave Bird', 'Swagger'] },
      { name: 'Pincurchin', id: 871, level: 47, types: ['electric'], moves: ['Zing Zap', 'Recover', 'Curse'] },
      { name: 'Snorlax', id: 143, level: 48, types: ['normal'], moves: ['Body Slam', 'Earthquake', 'Heavy Slam'] },
      { name: 'Cinderace', id: 815, level: 49, types: ['fire'], moves: ['Pyro Ball', 'Bounce', 'Feint', 'Max Flare'] },
    ],
  },
  {
    name: 'Leon (Champion)',
    segment: 'Pre-Champion Cup',
    pokemon: [
      { name: 'Aegislash', id: 681, level: 62, types: ['steel', 'ghost'], moves: ['King\'s Shield', 'Sacred Sword', 'Shadow Ball', 'Flash Cannon'] },
      { name: 'Haxorus', id: 612, level: 63, types: ['dragon'], moves: ['Outrage', 'Iron Tail', 'Earthquake', 'Poison Jab'] },
      { name: 'Seismitoad', id: 537, level: 64, types: ['water', 'ground'], moves: ['Liquidation', 'Earthquake', 'Drain Punch'] },
      { name: 'Dragapult', id: 887, level: 62, types: ['dragon', 'ghost'], moves: ['Shadow Ball', 'Dragon Breath', 'Flamethrower', 'Thunderbolt'] },
      { name: 'Mr. Rime', id: 866, level: 64, types: ['ice', 'psychic'], moves: ['Freeze-Dry', 'Psychic', 'Thunderbolt', 'Rapid Spin'] },
      { name: 'Charizard', id: 6, level: 65, types: ['fire', 'flying'], moves: ['Flamethrower', 'Air Slash', 'Ancient Power', 'Max Overgrowth'] },
    ],
  },
];

// ── Brilliant Diamond / Shining Pearl ─────────────────────────────────────

const BDSP_BOSSES: BossEntry[] = [
  {
    name: 'Roark',
    segment: 'Pre-Roark',
    pokemon: [
      { name: 'Geodude', id: 74, level: 12, types: ['rock', 'ground'], moves: ['Stealth Rock', 'Rock Throw'] },
      { name: 'Onix', id: 95, level: 12, types: ['rock', 'ground'], moves: ['Stealth Rock', 'Rock Throw', 'Screech'] },
      { name: 'Cranidos', id: 408, level: 14, types: ['rock'], moves: ['Headbutt', 'Leer', 'Pursuit'] },
    ],
  },
  {
    name: 'Gardenia',
    segment: 'Pre-Gardenia',
    pokemon: [
      { name: 'Cherubi', id: 420, level: 19, types: ['grass'], moves: ['Grass Knot', 'Safeguard', 'Leech Seed'] },
      { name: 'Turtwig', id: 387, level: 19, types: ['grass'], moves: ['Razor Leaf', 'Reflect', 'Sunny Day'] },
      { name: 'Roserade', id: 407, level: 22, types: ['grass', 'poison'], moves: ['Grass Knot', 'Stun Spore', 'Magical Leaf', 'Poison Sting'] },
    ],
  },
  {
    name: 'Maylene',
    segment: 'Pre-Maylene',
    pokemon: [
      { name: 'Meditite', id: 307, level: 27, types: ['fighting', 'psychic'], moves: ['Drain Punch', 'Confusion', 'Detect'] },
      { name: 'Machoke', id: 67, level: 27, types: ['fighting'], moves: ['Karate Chop', 'Rock Tomb', 'Strength'] },
      { name: 'Lucario', id: 448, level: 30, types: ['fighting', 'steel'], moves: ['Drain Punch', 'Metal Claw', 'Force Palm'] },
    ],
  },
  {
    name: 'Crasher Wake',
    segment: 'Pre-Crasher Wake',
    pokemon: [
      { name: 'Gyarados', id: 130, level: 27, types: ['water', 'flying'], moves: ['Waterfall', 'Bite', 'Twister'] },
      { name: 'Quagsire', id: 195, level: 27, types: ['water', 'ground'], moves: ['Mud Shot', 'Water Pulse', 'Mud Bomb'] },
      { name: 'Floatzel', id: 419, level: 30, types: ['water'], moves: ['Aqua Jet', 'Pursuit', 'Brine'] },
    ],
  },
  {
    name: 'Fantina',
    segment: 'Pre-Fantina',
    pokemon: [
      { name: 'Duskull', id: 355, level: 32, types: ['ghost'], moves: ['Will-O-Wisp', 'Shadow Sneak', 'Future Sight'] },
      { name: 'Haunter', id: 93, level: 34, types: ['ghost', 'poison'], moves: ['Shadow Claw', 'Confuse Ray', 'Hypnosis'] },
      { name: 'Mismagius', id: 429, level: 36, types: ['ghost'], moves: ['Shadow Ball', 'Psybeam', 'Confuse Ray', 'Magical Leaf'] },
    ],
  },
  {
    name: 'Byron',
    segment: 'Pre-Byron',
    pokemon: [
      { name: 'Bronzor', id: 436, level: 36, types: ['steel', 'psychic'], moves: ['Flash Cannon', 'Confuse Ray', 'Extrasensory'] },
      { name: 'Steelix', id: 208, level: 36, types: ['steel', 'ground'], moves: ['Flash Cannon', 'Earthquake', 'Ice Fang'] },
      { name: 'Bastiodon', id: 411, level: 39, types: ['rock', 'steel'], moves: ['Flash Cannon', 'AncientPower', 'Metal Burst'] },
    ],
  },
  {
    name: 'Candice',
    segment: 'Pre-Candice',
    pokemon: [
      { name: 'Sneasel', id: 215, level: 38, types: ['dark', 'ice'], moves: ['Slash', 'Avalanche', 'Faint Attack'] },
      { name: 'Piloswine', id: 221, level: 38, types: ['ice', 'ground'], moves: ['Avalanche', 'Stone Edge', 'Earthquake'] },
      { name: 'Abomasnow', id: 460, level: 40, types: ['grass', 'ice'], moves: ['Wood Hammer', 'Avalanche', 'Water Pulse'] },
      { name: 'Froslass', id: 478, level: 42, types: ['ice', 'ghost'], moves: ['Blizzard', 'Shadow Ball', 'Psychic'] },
    ],
  },
  {
    name: 'Volkner',
    segment: 'Pre-Volkner',
    pokemon: [
      { name: 'Raichu', id: 26, level: 46, types: ['electric'], moves: ['Charge Beam', 'Signal Beam', 'Quick Attack'] },
      { name: 'Ambipom', id: 424, level: 47, types: ['normal'], moves: ['Shock Wave', 'Last Resort', 'Baton Pass'] },
      { name: 'Octillery', id: 224, level: 47, types: ['water'], moves: ['Charge Beam', 'Aurora Beam', 'Bullet Seed'] },
      { name: 'Luxray', id: 405, level: 49, types: ['electric'], moves: ['Thunder Fang', 'Crunch', 'Ice Fang'] },
    ],
  },
  {
    name: 'Elite Four: Aaron',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Dustox', id: 269, level: 53, types: ['bug', 'poison'], moves: ['Bug Buzz', 'Toxic', 'Light Screen'] },
      { name: 'Beautifly', id: 267, level: 53, types: ['bug', 'flying'], moves: ['Bug Buzz', 'Psychic', 'Energy Ball'] },
      { name: 'Vespiquen', id: 416, level: 54, types: ['bug', 'flying'], moves: ['Attack Order', 'Defend Order', 'Heal Order'] },
      { name: 'Heracross', id: 214, level: 54, types: ['bug', 'fighting'], moves: ['Megahorn', 'Close Combat', 'Stone Edge'] },
      { name: 'Drapion', id: 452, level: 57, types: ['poison', 'dark'], moves: ['Cross Poison', 'X-Scissor', 'Ice Fang'] },
    ],
  },
  {
    name: 'Elite Four: Bertha',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Quagsire', id: 195, level: 55, types: ['water', 'ground'], moves: ['Dig', 'Sandstorm', 'Surf'] },
      { name: 'Sudowoodo', id: 185, level: 56, types: ['rock'], moves: ['Sucker Punch', 'Earthquake', 'Rock Slide'] },
      { name: 'Golem', id: 76, level: 56, types: ['rock', 'ground'], moves: ['Earthquake', 'Fire Punch', 'Thunder Punch'] },
      { name: 'Whiscash', id: 340, level: 55, types: ['water', 'ground'], moves: ['Earthquake', 'Zen Headbutt', 'Aqua Tail'] },
      { name: 'Hippowdon', id: 450, level: 59, types: ['ground'], moves: ['Earthquake', 'Crunch', 'Yawn', 'Stone Edge'] },
    ],
  },
  {
    name: 'Elite Four: Flint',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Rapidash', id: 78, level: 58, types: ['fire'], moves: ['Flare Blitz', 'SolarBeam', 'Bounce'] },
      { name: 'Steelix', id: 208, level: 57, types: ['steel', 'ground'], moves: ['Fire Fang', 'Iron Tail', 'Crunch'] },
      { name: 'Drifblim', id: 426, level: 58, types: ['ghost', 'flying'], moves: ['Will-O-Wisp', 'Baton Pass', 'Strength Sap'] },
      { name: 'Lopunny', id: 428, level: 57, types: ['normal'], moves: ['Fire Punch', 'Mirror Coat', 'Charm'] },
      { name: 'Infernape', id: 392, level: 61, types: ['fire', 'fighting'], moves: ['Flare Blitz', 'Close Combat', 'Mach Punch', 'Thunder Punch'] },
    ],
  },
  {
    name: 'Elite Four: Lucian',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Mr. Mime', id: 122, level: 59, types: ['psychic'], moves: ['Psychic', 'Thunderbolt', 'Light Screen', 'Reflect'] },
      { name: 'Girafarig', id: 203, level: 59, types: ['normal', 'psychic'], moves: ['Psychic', 'Shadow Ball', 'Crunch'] },
      { name: 'Medicham', id: 308, level: 60, types: ['fighting', 'psychic'], moves: ['Psychic', 'Drain Punch', 'Ice Punch'] },
      { name: 'Alakazam', id: 65, level: 60, types: ['psychic'], moves: ['Psychic', 'Focus Blast', 'Recover'] },
      { name: 'Bronzong', id: 437, level: 63, types: ['steel', 'psychic'], moves: ['Psychic', 'Earthquake', 'Gyro Ball'] },
    ],
  },
  {
    name: 'Cynthia (Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Spiritomb', id: 442, level: 61, types: ['ghost', 'dark'], moves: ['Dark Pulse', 'Shadow Ball', 'Psychic'] },
      { name: 'Roserade', id: 407, level: 60, types: ['grass', 'poison'], moves: ['Energy Ball', 'Sludge Bomb', 'Shadow Ball'] },
      { name: 'Gastrodon', id: 423, level: 60, types: ['water', 'ground'], moves: ['Surf', 'Earthquake', 'Sludge Bomb'] },
      { name: 'Lucario', id: 448, level: 63, types: ['fighting', 'steel'], moves: ['Aura Sphere', 'Dragon Pulse', 'Flash Cannon'] },
      { name: 'Milotic', id: 350, level: 63, types: ['water'], moves: ['Surf', 'Ice Beam', 'Mirror Coat'] },
      { name: 'Garchomp', id: 445, level: 66, types: ['dragon', 'ground'], moves: ['Dragon Claw', 'Earthquake', 'Poison Jab', 'Swords Dance'] },
    ],
  },
];

// ── Legends: Arceus ───────────────────────────────────────────────────────

const LEGENDS_ARCEUS_BOSSES: BossEntry[] = [
  {
    name: 'Noble Kleavor',
    segment: 'Pre-Kleavor',
    pokemon: [
      { name: 'Kleavor', id: 900, level: 18, types: ['bug', 'rock'], moves: ['Stone Axe', 'X-Scissor', 'Air Slash'] },
    ],
  },
  {
    name: 'Noble Lilligant',
    segment: 'Pre-Lilligant',
    pokemon: [
      { name: 'Lilligant', id: 549, level: 30, types: ['grass', 'fighting'], moves: ['Victory Dance', 'Energy Ball', 'Drain Punch'] },
    ],
  },
  {
    name: 'Noble Arcanine',
    segment: 'Pre-Arcanine',
    pokemon: [
      { name: 'Arcanine', id: 59, level: 36, types: ['fire', 'rock'], moves: ['Rock Slide', 'Flamethrower', 'Crunch', 'Raging Fury'] },
    ],
  },
  {
    name: 'Noble Electrode',
    segment: 'Pre-Electrode',
    pokemon: [
      { name: 'Electrode', id: 101, level: 46, types: ['electric', 'grass'], moves: ['Thunder', 'Energy Ball', 'Chloroblast'] },
    ],
  },
  {
    name: 'Noble Avalugg',
    segment: 'Pre-Avalugg',
    pokemon: [
      { name: 'Avalugg', id: 713, level: 56, types: ['ice', 'rock'], moves: ['Mountain Gale', 'Rock Slide', 'Crunch', 'Double-Edge'] },
    ],
  },
  {
    name: 'Origin Dialga/Palkia',
    segment: 'Pre-Dialga/Palkia',
    pokemon: [
      { name: 'Dialga', id: 483, level: 65, types: ['steel', 'dragon'], moves: ['Roar of Time', 'Flash Cannon', 'Earth Power', 'Dragon Pulse'] },
    ],
  },
];

// ── Scarlet / Violet ──────────────────────────────────────────────────────

const SCARLET_VIOLET_BOSSES: BossEntry[] = [
  {
    name: 'Katy',
    segment: 'Pre-Katy',
    pokemon: [
      { name: 'Nymble', id: 948, level: 14, types: ['bug'], moves: ['Struggle Bug', 'Pounce'] },
      { name: 'Tarountula', id: 917, level: 14, types: ['bug'], moves: ['Bug Bite', 'String Shot'] },
      { name: 'Teddiursa', id: 216, level: 15, types: ['normal'], moves: ['Fury Cutter', 'Lick', 'Baby-Doll Eyes'] },
    ],
  },
  {
    name: 'Brassius',
    segment: 'Pre-Brassius',
    pokemon: [
      { name: 'Petilil', id: 548, level: 16, types: ['grass'], moves: ['Mega Drain', 'Sleep Powder'] },
      { name: 'Smoliv', id: 928, level: 16, types: ['grass', 'normal'], moves: ['Razor Leaf', 'Tackle'] },
      { name: 'Sudowoodo', id: 185, level: 17, types: ['rock'], moves: ['Rock Throw', 'Trailblaze', 'Counter'] },
    ],
  },
  {
    name: 'Iono',
    segment: 'Pre-Iono',
    pokemon: [
      { name: 'Wattrel', id: 940, level: 23, types: ['electric', 'flying'], moves: ['Spark', 'Pluck', 'Quick Attack'] },
      { name: 'Bellibolt', id: 939, level: 23, types: ['electric'], moves: ['Spark', 'Mud-Slap', 'Water Gun'] },
      { name: 'Luxio', id: 404, level: 23, types: ['electric'], moves: ['Spark', 'Bite', 'Swagger'] },
      { name: 'Mismagius', id: 429, level: 24, types: ['ghost'], moves: ['Hex', 'Confuse Ray', 'Charge Beam'] },
    ],
  },
  {
    name: 'Kofu',
    segment: 'Pre-Kofu',
    pokemon: [
      { name: 'Veluza', id: 976, level: 29, types: ['water', 'psychic'], moves: ['Aqua Cutter', 'Psycho Cut', 'Slash'] },
      { name: 'Wugtrio', id: 961, level: 29, types: ['water'], moves: ['Water Pulse', 'Headbutt', 'Mud-Slap'] },
      { name: 'Crabominable', id: 740, level: 30, types: ['fighting', 'ice'], moves: ['Crabhammer', 'Rock Smash', 'Slam'] },
    ],
  },
  {
    name: 'Larry',
    segment: 'Pre-Larry',
    pokemon: [
      { name: 'Komala', id: 775, level: 35, types: ['normal'], moves: ['Sucker Punch', 'Yawn', 'Slam'] },
      { name: 'Dudunsparce', id: 982, level: 35, types: ['normal'], moves: ['Drill Run', 'Glare', 'Body Slam', 'Hyper Drill'] },
      { name: 'Staraptor', id: 398, level: 36, types: ['normal', 'flying'], moves: ['Aerial Ace', 'Facade', 'Endeavor'] },
    ],
  },
  {
    name: 'Ryme',
    segment: 'Pre-Ryme',
    pokemon: [
      { name: 'Mimikyu', id: 778, level: 41, types: ['ghost', 'fairy'], moves: ['Shadow Claw', 'Play Rough', 'Curse'] },
      { name: 'Banette', id: 354, level: 41, types: ['ghost'], moves: ['Shadow Claw', 'Sucker Punch', 'Will-O-Wisp'] },
      { name: 'Houndstone', id: 972, level: 41, types: ['ghost'], moves: ['Phantom Force', 'Play Rough', 'Psychic Fangs'] },
      { name: 'Toxtricity', id: 849, level: 42, types: ['electric', 'poison'], moves: ['Hex', 'Discharge', 'Hyper Voice'] },
    ],
  },
  {
    name: 'Tulip',
    segment: 'Pre-Tulip',
    pokemon: [
      { name: 'Farigiraf', id: 981, level: 44, types: ['normal', 'psychic'], moves: ['Psychic', 'Crunch', 'Zen Headbutt'] },
      { name: 'Gardevoir', id: 282, level: 44, types: ['psychic', 'fairy'], moves: ['Psychic', 'Dazzling Gleam', 'Shadow Ball'] },
      { name: 'Espathra', id: 956, level: 44, types: ['psychic'], moves: ['Psychic', 'Dazzling Gleam', 'Quick Attack'] },
      { name: 'Florges', id: 671, level: 45, types: ['fairy'], moves: ['Psychic', 'Moonblast', 'Petal Blizzard'] },
    ],
  },
  {
    name: 'Grusha',
    segment: 'Pre-Grusha',
    pokemon: [
      { name: 'Frosmoth', id: 873, level: 47, types: ['ice', 'bug'], moves: ['Ice Beam', 'Bug Buzz', 'Blizzard'] },
      { name: 'Beartic', id: 614, level: 47, types: ['ice'], moves: ['Icicle Crash', 'Earthquake', 'Aqua Jet'] },
      { name: 'Cetitan', id: 975, level: 47, types: ['ice'], moves: ['Ice Spinner', 'Earthquake', 'Liquidation'] },
      { name: 'Altaria', id: 334, level: 48, types: ['dragon', 'flying'], moves: ['Ice Beam', 'Hurricane', 'Dragon Pulse'] },
    ],
  },
  {
    name: 'Elite Four: Rika',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Whiscash', id: 340, level: 57, types: ['water', 'ground'], moves: ['Earth Power', 'Muddy Water', 'Fissure'] },
      { name: 'Camerupt', id: 323, level: 57, types: ['fire', 'ground'], moves: ['Earth Power', 'Flash Cannon', 'Yawn'] },
      { name: 'Donphan', id: 232, level: 57, types: ['ground'], moves: ['Earthquake', 'Stone Edge', 'Ice Shard'] },
      { name: 'Dugtrio', id: 51, level: 57, types: ['ground'], moves: ['Earthquake', 'Sucker Punch', 'Stone Edge'] },
      { name: 'Clodsire', id: 980, level: 58, types: ['poison', 'ground'], moves: ['Earthquake', 'Poison Jab', 'Megahorn'] },
    ],
  },
  {
    name: 'Elite Four: Poppy',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Copperajah', id: 879, level: 58, types: ['steel'], moves: ['Heavy Slam', 'Play Rough', 'High Horsepower'] },
      { name: 'Magnezone', id: 462, level: 58, types: ['electric', 'steel'], moves: ['Thunderbolt', 'Flash Cannon', 'Tri Attack'] },
      { name: 'Bronzong', id: 437, level: 58, types: ['steel', 'psychic'], moves: ['Iron Head', 'Zen Headbutt', 'Earthquake'] },
      { name: 'Corviknight', id: 823, level: 58, types: ['flying', 'steel'], moves: ['Iron Head', 'Brave Bird', 'Body Press'] },
      { name: 'Tinkaton', id: 959, level: 59, types: ['fairy', 'steel'], moves: ['Gigaton Hammer', 'Play Rough', 'Stone Edge'] },
    ],
  },
  {
    name: 'Elite Four: Larry',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Tropius', id: 357, level: 59, types: ['grass', 'flying'], moves: ['Air Slash', 'Dragon Pulse', 'Earthquake'] },
      { name: 'Oricorio', id: 741, level: 59, types: ['electric', 'flying'], moves: ['Air Slash', 'Revelation Dance', 'Teeter Dance'] },
      { name: 'Staraptor', id: 398, level: 59, types: ['normal', 'flying'], moves: ['Brave Bird', 'Close Combat', 'Facade'] },
      { name: 'Altaria', id: 334, level: 59, types: ['dragon', 'flying'], moves: ['Dragon Pulse', 'Hurricane', 'Moonblast'] },
      { name: 'Flamigo', id: 973, level: 60, types: ['flying', 'fighting'], moves: ['Close Combat', 'Brave Bird', 'Throat Chop'] },
    ],
  },
  {
    name: 'Elite Four: Hassel',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Noivern', id: 715, level: 60, types: ['flying', 'dragon'], moves: ['Dragon Pulse', 'Air Slash', 'Super Fang'] },
      { name: 'Dragalge', id: 691, level: 60, types: ['poison', 'dragon'], moves: ['Dragon Pulse', 'Sludge Bomb', 'Thunderbolt'] },
      { name: 'Haxorus', id: 612, level: 60, types: ['dragon'], moves: ['Dragon Claw', 'Crunch', 'Rock Slide'] },
      { name: 'Flapple', id: 841, level: 60, types: ['grass', 'dragon'], moves: ['Dragon Rush', 'Grav Apple', 'Aerial Ace'] },
      { name: 'Baxcalibur', id: 998, level: 61, types: ['dragon', 'ice'], moves: ['Glaive Rush', 'Icicle Crash', 'Ice Shard'] },
    ],
  },
  {
    name: 'Geeta (Top Champion)',
    segment: 'Pre-Elite Four',
    pokemon: [
      { name: 'Espathra', id: 956, level: 61, types: ['psychic'], moves: ['Psychic', 'Quick Attack', 'Dazzling Gleam'] },
      { name: 'Gogoat', id: 673, level: 61, types: ['grass'], moves: ['Horn Leech', 'Bulk Up', 'Zen Headbutt'] },
      { name: 'Veluza', id: 976, level: 61, types: ['water', 'psychic'], moves: ['Aqua Cutter', 'Psycho Cut', 'Ice Fang'] },
      { name: 'Avalugg', id: 713, level: 61, types: ['ice'], moves: ['Icicle Crash', 'Earthquake', 'Crunch'] },
      { name: 'Kingambit', id: 983, level: 61, types: ['dark', 'steel'], moves: ['Kowtow Cleave', 'Iron Head', 'Stone Edge'] },
      { name: 'Glimmora', id: 970, level: 62, types: ['rock', 'poison'], moves: ['Sludge Wave', 'Power Gem', 'Dazzling Gleam', 'Earth Power'] },
    ],
  },
];

// ── Export map ──────────────────────────────────────────────────────────────

export const BOSS_DATA: Partial<Record<Game, BossEntry[]>> = {
  RED_BLUE: RED_BLUE_BOSSES,
  GOLD_SILVER: GOLD_SILVER_BOSSES,
  RUBY_SAPPHIRE: RUBY_SAPPHIRE_BOSSES,
  EMERALD: EMERALD_BOSSES,
  FIRERED_LEAFGREEN: FIRERED_LEAFGREEN_BOSSES,
  DIAMOND_PEARL: DIAMOND_PEARL_BOSSES,
  PLATINUM: PLATINUM_BOSSES,
  HEARTGOLD_SOULSILVER: HEARTGOLD_SOULSILVER_BOSSES,
  BLACK_WHITE: BLACK_WHITE_BOSSES,
  BLACK2_WHITE2: BLACK2_WHITE2_BOSSES,
  X_Y: X_Y_BOSSES,
  OMEGA_RUBY_ALPHA_SAPPHIRE: ORAS_BOSSES,
  SUN_MOON: SUN_MOON_BOSSES,
  ULTRA_SUN_ULTRA_MOON: ULTRA_SUN_ULTRA_MOON_BOSSES,
  SWORD_SHIELD: SWORD_SHIELD_BOSSES,
  BRILLIANT_DIAMOND_SHINING_PEARL: BDSP_BOSSES,
  LEGENDS_ARCEUS: LEGENDS_ARCEUS_BOSSES,
  SCARLET_VIOLET: SCARLET_VIOLET_BOSSES,
};

/** Look up the boss for a given game + segment */
export function getBossForSegment(game: Game, segment: string): BossEntry | undefined {
  const bosses = BOSS_DATA[game];
  if (!bosses) return undefined;
  return bosses.find((b) => b.segment === segment);
}

/** Convert a CustomBoss to BossEntry format */
function customBossToBossEntry(cb: CustomBoss): BossEntry {
  return {
    name: cb.name,
    segment: cb.segment,
    pokemon: cb.pokemon.map((p) => ({
      name: p.name,
      id: 0,  // no dex ID for custom pokemon
      level: p.level,
      types: p.types.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
      moves: [],
    })),
  };
}

/** Get all bosses for a segment (for E4 segments with multiple bosses) */
export function getBossesForSegment(game: Game, segment: string, customGameId?: string): BossEntry[] {
  // For custom games, look up the CustomGameDef bosses
  if (game === 'CUSTOM' && customGameId) {
    const def = getCustomGame(customGameId);
    if (def?.bosses) {
      return def.bosses
        .filter((b) => b.segment === segment)
        .map(customBossToBossEntry);
    }
    return [];
  }

  const bosses = BOSS_DATA[game];
  if (!bosses) return [];
  return bosses.filter((b) => b.segment === segment);
}
