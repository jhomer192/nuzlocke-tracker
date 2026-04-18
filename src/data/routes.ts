import type { Game, GameLocation } from '../types';

const RED_BLUE_ROUTES: GameLocation[] = [
  // Pre-Brock
  { key: 'route-1', name: 'Route 1', segment: 'Pre-Brock' },
  { key: 'route-2', name: 'Route 2', segment: 'Pre-Brock' },
  { key: 'route-22', name: 'Route 22', segment: 'Pre-Brock' },
  { key: 'viridian-forest', name: 'Viridian Forest', segment: 'Pre-Brock' },
  // Pre-Misty
  { key: 'route-3', name: 'Route 3', segment: 'Pre-Misty' },
  { key: 'mt-moon-1f', name: 'Mt. Moon 1F', segment: 'Pre-Misty' },
  { key: 'mt-moon-b1f', name: 'Mt. Moon B1F', segment: 'Pre-Misty' },
  { key: 'mt-moon-b2f', name: 'Mt. Moon B2F', segment: 'Pre-Misty' },
  { key: 'route-4', name: 'Route 4', segment: 'Pre-Misty' },
  { key: 'route-24', name: 'Route 24', segment: 'Pre-Misty' },
  { key: 'route-25', name: 'Route 25', segment: 'Pre-Misty' },
  // Pre-Lt. Surge
  { key: 'route-5', name: 'Route 5', segment: 'Pre-Lt. Surge' },
  { key: 'route-6', name: 'Route 6', segment: 'Pre-Lt. Surge' },
  { key: 'route-11', name: 'Route 11', segment: 'Pre-Lt. Surge' },
  { key: 'diglett-cave', name: "Diglett's Cave", segment: 'Pre-Lt. Surge' },
  { key: 'ss-anne', name: 'S.S. Anne', segment: 'Pre-Lt. Surge' },
  // Pre-Erika
  { key: 'route-9', name: 'Route 9', segment: 'Pre-Erika' },
  { key: 'route-10', name: 'Route 10', segment: 'Pre-Erika' },
  { key: 'rock-tunnel-1f', name: 'Rock Tunnel 1F', segment: 'Pre-Erika' },
  { key: 'rock-tunnel-b1f', name: 'Rock Tunnel B1F', segment: 'Pre-Erika' },
  { key: 'route-8', name: 'Route 8', segment: 'Pre-Erika' },
  { key: 'route-7', name: 'Route 7', segment: 'Pre-Erika' },
  { key: 'pokemon-tower', name: 'Pokemon Tower', segment: 'Pre-Erika' },
  // Pre-Koga
  { key: 'route-12', name: 'Route 12', segment: 'Pre-Koga' },
  { key: 'route-13', name: 'Route 13', segment: 'Pre-Koga' },
  { key: 'route-14', name: 'Route 14', segment: 'Pre-Koga' },
  { key: 'route-15', name: 'Route 15', segment: 'Pre-Koga' },
  { key: 'safari-zone-1', name: 'Safari Zone Area 1', segment: 'Pre-Koga' },
  { key: 'safari-zone-2', name: 'Safari Zone Area 2', segment: 'Pre-Koga' },
  { key: 'safari-zone-3', name: 'Safari Zone Area 3', segment: 'Pre-Koga' },
  { key: 'safari-zone-center', name: 'Safari Zone Center', segment: 'Pre-Koga' },
  // Pre-Sabrina
  { key: 'route-16', name: 'Route 16', segment: 'Pre-Sabrina' },
  { key: 'route-17', name: 'Route 17', segment: 'Pre-Sabrina' },
  { key: 'route-18', name: 'Route 18', segment: 'Pre-Sabrina' },
  { key: 'power-plant', name: 'Power Plant', segment: 'Pre-Sabrina' },
  { key: 'seafoam-islands-1f', name: 'Seafoam Islands 1F', segment: 'Pre-Sabrina' },
  { key: 'seafoam-islands-b1f', name: 'Seafoam Islands B1F', segment: 'Pre-Sabrina' },
  // Pre-Blaine
  { key: 'route-19', name: 'Route 19', segment: 'Pre-Blaine' },
  { key: 'route-20', name: 'Route 20', segment: 'Pre-Blaine' },
  { key: 'pokemon-mansion-1f', name: 'Pokemon Mansion 1F', segment: 'Pre-Blaine' },
  { key: 'pokemon-mansion-b1f', name: 'Pokemon Mansion B1F', segment: 'Pre-Blaine' },
  // Pre-Giovanni
  { key: 'route-21', name: 'Route 21', segment: 'Pre-Giovanni' },
  { key: 'route-23', name: 'Route 23', segment: 'Pre-Giovanni' },
  { key: 'victory-road-1f', name: 'Victory Road 1F', segment: 'Pre-Giovanni' },
  { key: 'victory-road-2f', name: 'Victory Road 2F', segment: 'Pre-Giovanni' },
  { key: 'victory-road-3f', name: 'Victory Road 3F', segment: 'Pre-Giovanni' },
];

const GOLD_SILVER_ROUTES: GameLocation[] = [
  // Pre-Falkner
  { key: 'route-29', name: 'Route 29', segment: 'Pre-Falkner' },
  { key: 'route-30', name: 'Route 30', segment: 'Pre-Falkner' },
  { key: 'route-31', name: 'Route 31', segment: 'Pre-Falkner' },
  { key: 'dark-cave', name: 'Dark Cave', segment: 'Pre-Falkner' },
  { key: 'sprout-tower', name: 'Sprout Tower', segment: 'Pre-Falkner' },
  // Pre-Bugsy
  { key: 'route-32', name: 'Route 32', segment: 'Pre-Bugsy' },
  { key: 'ruins-of-alph', name: 'Ruins of Alph', segment: 'Pre-Bugsy' },
  { key: 'union-cave-1f', name: 'Union Cave 1F', segment: 'Pre-Bugsy' },
  { key: 'union-cave-b1f', name: 'Union Cave B1F', segment: 'Pre-Bugsy' },
  { key: 'route-33', name: 'Route 33', segment: 'Pre-Bugsy' },
  { key: 'ilex-forest', name: 'Ilex Forest', segment: 'Pre-Bugsy' },
  // Pre-Whitney
  { key: 'route-34', name: 'Route 34', segment: 'Pre-Whitney' },
  { key: 'national-park', name: 'National Park', segment: 'Pre-Whitney' },
  // Pre-Morty
  { key: 'route-35', name: 'Route 35', segment: 'Pre-Morty' },
  { key: 'route-36', name: 'Route 36', segment: 'Pre-Morty' },
  { key: 'route-37', name: 'Route 37', segment: 'Pre-Morty' },
  { key: 'route-38', name: 'Route 38', segment: 'Pre-Morty' },
  { key: 'route-39', name: 'Route 39', segment: 'Pre-Morty' },
  { key: 'burned-tower', name: 'Burned Tower', segment: 'Pre-Morty' },
  // Pre-Chuck
  { key: 'route-40', name: 'Route 40', segment: 'Pre-Chuck' },
  { key: 'route-41', name: 'Route 41', segment: 'Pre-Chuck' },
  // Pre-Jasmine
  { key: 'route-42', name: 'Route 42', segment: 'Pre-Jasmine' },
  { key: 'mt-mortar', name: 'Mt. Mortar', segment: 'Pre-Jasmine' },
  { key: 'route-43', name: 'Route 43', segment: 'Pre-Jasmine' },
  { key: 'lake-of-rage', name: 'Lake of Rage', segment: 'Pre-Jasmine' },
  // Pre-Pryce
  { key: 'route-44', name: 'Route 44', segment: 'Pre-Pryce' },
  { key: 'ice-path', name: 'Ice Path', segment: 'Pre-Pryce' },
  // Pre-Clair
  { key: 'route-45', name: 'Route 45', segment: 'Pre-Clair' },
  { key: 'route-46', name: 'Route 46', segment: 'Pre-Clair' },
  { key: 'dragons-den', name: "Dragon's Den", segment: 'Pre-Clair' },
  { key: 'route-26', name: 'Route 26', segment: 'Pre-Clair' },
  { key: 'route-27', name: 'Route 27', segment: 'Pre-Clair' },
  { key: 'victory-road-gs', name: 'Victory Road', segment: 'Pre-Clair' },
];

const RUBY_SAPPHIRE_ROUTES: GameLocation[] = [
  // Pre-Roxanne
  { key: 'route-101', name: 'Route 101', segment: 'Pre-Roxanne' },
  { key: 'route-102', name: 'Route 102', segment: 'Pre-Roxanne' },
  { key: 'route-103', name: 'Route 103', segment: 'Pre-Roxanne' },
  { key: 'route-104', name: 'Route 104', segment: 'Pre-Roxanne' },
  { key: 'petalburg-woods', name: 'Petalburg Woods', segment: 'Pre-Roxanne' },
  { key: 'route-116', name: 'Route 116', segment: 'Pre-Roxanne' },
  { key: 'rusturf-tunnel', name: 'Rusturf Tunnel', segment: 'Pre-Roxanne' },
  // Pre-Brawly
  { key: 'route-106', name: 'Route 106', segment: 'Pre-Brawly' },
  { key: 'granite-cave', name: 'Granite Cave', segment: 'Pre-Brawly' },
  { key: 'route-107', name: 'Route 107', segment: 'Pre-Brawly' },
  { key: 'route-108', name: 'Route 108', segment: 'Pre-Brawly' },
  { key: 'route-109', name: 'Route 109', segment: 'Pre-Brawly' },
  // Pre-Wattson
  { key: 'route-110', name: 'Route 110', segment: 'Pre-Wattson' },
  { key: 'route-117', name: 'Route 117', segment: 'Pre-Wattson' },
  // Pre-Flannery
  { key: 'route-111', name: 'Route 111', segment: 'Pre-Flannery' },
  { key: 'route-112', name: 'Route 112', segment: 'Pre-Flannery' },
  { key: 'fiery-path', name: 'Fiery Path', segment: 'Pre-Flannery' },
  { key: 'route-113', name: 'Route 113', segment: 'Pre-Flannery' },
  { key: 'route-114', name: 'Route 114', segment: 'Pre-Flannery' },
  { key: 'meteor-falls', name: 'Meteor Falls', segment: 'Pre-Flannery' },
  // Pre-Norman
  { key: 'route-115', name: 'Route 115', segment: 'Pre-Norman' },
  { key: 'route-105', name: 'Route 105', segment: 'Pre-Norman' },
  // Pre-Winona
  { key: 'route-118', name: 'Route 118', segment: 'Pre-Winona' },
  { key: 'route-119', name: 'Route 119', segment: 'Pre-Winona' },
  { key: 'route-120', name: 'Route 120', segment: 'Pre-Winona' },
  { key: 'route-121', name: 'Route 121', segment: 'Pre-Winona' },
  { key: 'safari-zone-rs', name: 'Safari Zone', segment: 'Pre-Winona' },
  // Pre-Tate & Liza
  { key: 'route-122', name: 'Route 122', segment: 'Pre-Tate & Liza' },
  { key: 'mt-pyre', name: 'Mt. Pyre', segment: 'Pre-Tate & Liza' },
  { key: 'route-123', name: 'Route 123', segment: 'Pre-Tate & Liza' },
  { key: 'route-124', name: 'Route 124', segment: 'Pre-Tate & Liza' },
  { key: 'shoal-cave', name: 'Shoal Cave', segment: 'Pre-Tate & Liza' },
  { key: 'route-125', name: 'Route 125', segment: 'Pre-Tate & Liza' },
  { key: 'route-126', name: 'Route 126', segment: 'Pre-Tate & Liza' },
  { key: 'route-127', name: 'Route 127', segment: 'Pre-Tate & Liza' },
  // Pre-Wallace/Juan
  { key: 'route-128', name: 'Route 128', segment: 'Pre-Wallace' },
  { key: 'route-129', name: 'Route 129', segment: 'Pre-Wallace' },
  { key: 'route-130', name: 'Route 130', segment: 'Pre-Wallace' },
  { key: 'route-131', name: 'Route 131', segment: 'Pre-Wallace' },
  { key: 'route-132', name: 'Route 132', segment: 'Pre-Wallace' },
  { key: 'route-133', name: 'Route 133', segment: 'Pre-Wallace' },
  { key: 'route-134', name: 'Route 134', segment: 'Pre-Wallace' },
  { key: 'victory-road-rs', name: 'Victory Road', segment: 'Pre-Wallace' },
];

export const GAME_ROUTES: Record<Game, GameLocation[]> = {
  RED_BLUE: RED_BLUE_ROUTES,
  GOLD_SILVER: GOLD_SILVER_ROUTES,
  RUBY_SAPPHIRE: RUBY_SAPPHIRE_ROUTES,
};

export const BADGE_NAMES: Record<Game, string[]> = {
  RED_BLUE: ['Boulder', 'Cascade', 'Thunder', 'Rainbow', 'Soul', 'Marsh', 'Volcano', 'Earth'],
  GOLD_SILVER: ['Zephyr', 'Hive', 'Plain', 'Fog', 'Storm', 'Mineral', 'Glacier', 'Rising'],
  RUBY_SAPPHIRE: ['Stone', 'Knuckle', 'Dynamo', 'Heat', 'Balance', 'Feather', 'Mind', 'Rain'],
};
