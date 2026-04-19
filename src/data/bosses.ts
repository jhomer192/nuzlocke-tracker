import type { Game } from '../types';

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

// ── Export map ──────────────────────────────────────────────────────────────

export const BOSS_DATA: Partial<Record<Game, BossEntry[]>> = {
  RED_BLUE: RED_BLUE_BOSSES,
  GOLD_SILVER: GOLD_SILVER_BOSSES,
  RUBY_SAPPHIRE: RUBY_SAPPHIRE_BOSSES,
  EMERALD: EMERALD_BOSSES,
};

/** Look up the boss for a given game + segment */
export function getBossForSegment(game: Game, segment: string): BossEntry | undefined {
  const bosses = BOSS_DATA[game];
  if (!bosses) return undefined;
  return bosses.find((b) => b.segment === segment);
}

/** Get all bosses for a segment (for E4 segments with multiple bosses) */
export function getBossesForSegment(game: Game, segment: string): BossEntry[] {
  const bosses = BOSS_DATA[game];
  if (!bosses) return [];
  return bosses.filter((b) => b.segment === segment);
}
