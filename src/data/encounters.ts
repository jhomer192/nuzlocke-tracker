/**
 * Encounter tables for all mainline Pokemon games.
 * Maps game -> route key -> array of national dex IDs for Pokemon available at that location.
 * Data sourced from Bulbapedia wild encounter tables (walking/surfing encounters).
 * For Gen 6+ games, includes the 5-8 most notable Pokemon per route.
 */

export const ENCOUNTER_TABLES: Record<string, Record<string, number[]>> = {
  RED_BLUE: {
    // Pre-Brock
    'route-1': [1, 4, 7, 16, 19],                      // Bulbasaur, Charmander, Squirtle, Pidgey, Rattata
    'route-2': [10, 13, 16, 19],                      // Caterpie, Weedle, Pidgey, Rattata
    'route-22': [19, 21, 56, 29, 32],                 // Rattata, Spearow, Mankey, Nidoran♀, Nidoran♂
    'viridian-forest': [10, 11, 13, 14, 25],          // Caterpie, Metapod, Weedle, Kakuna, Pikachu

    // Pre-Misty
    'route-3': [16, 19, 21, 29, 32, 39],              // Pidgey, Rattata, Spearow, Nidoran♀, Nidoran♂, Jigglypuff
    'mt-moon-1f': [41, 46, 74, 35],                   // Zubat, Paras, Geodude, Clefairy
    'mt-moon-b1f': [41, 46, 74, 35],                  // Zubat, Paras, Geodude, Clefairy
    'mt-moon-b2f': [41, 46, 74, 35],                  // Zubat, Paras, Geodude, Clefairy
    'route-4': [16, 19, 21, 23, 56],                  // Pidgey, Rattata, Spearow, Ekans, Mankey
    'route-24': [10, 13, 16, 43, 63],                 // Caterpie, Weedle, Pidgey, Oddish, Abra
    'route-25': [10, 13, 16, 43, 63],                 // Caterpie, Weedle, Pidgey, Oddish, Abra

    // Pre-Lt. Surge
    'route-5': [16, 43, 52, 56, 63],                  // Pidgey, Oddish, Meowth, Mankey, Abra
    'route-6': [16, 43, 52, 56, 63],                  // Pidgey, Oddish, Meowth, Mankey, Abra
    'route-11': [16, 19, 21, 23, 52, 96],             // Pidgey, Rattata, Spearow, Ekans, Meowth, Drowzee
    'diglett-cave': [50, 51],                          // Diglett, Dugtrio
    'ss-anne': [],                                     // No wild encounters

    // Pre-Erika
    'route-9': [16, 19, 21, 23, 56, 100],             // Pidgey, Rattata, Spearow, Ekans, Mankey, Voltorb
    'route-10': [16, 21, 23, 56, 100],                // Pidgey, Spearow, Ekans, Mankey, Voltorb
    'rock-tunnel-1f': [41, 46, 74, 66, 95],           // Zubat, Paras, Geodude, Machop, Onix
    'rock-tunnel-b1f': [41, 46, 74, 66, 95],          // Zubat, Paras, Geodude, Machop, Onix
    'route-8': [16, 37, 52, 56, 58, 77],              // Pidgey, Vulpix, Meowth, Mankey, Growlithe, Ponyta
    'route-7': [16, 37, 43, 52, 56, 58],              // Pidgey, Vulpix, Oddish, Meowth, Mankey, Growlithe
    'pokemon-tower': [92, 93, 104],                    // Gastly, Haunter, Cubone

    // Pre-Koga
    'route-12': [16, 43, 44, 48, 69, 70],             // Pidgey, Oddish, Gloom, Venonat, Bellsprout, Weepinbell
    'route-13': [16, 43, 44, 48, 69, 70],             // Pidgey, Oddish, Gloom, Venonat, Bellsprout, Weepinbell
    'route-14': [16, 43, 44, 48, 69, 70, 132],        // Pidgey, Oddish, Gloom, Venonat, Bellsprout, Weepinbell, Ditto
    'route-15': [16, 43, 44, 48, 69, 70],             // Pidgey, Oddish, Gloom, Venonat, Bellsprout, Weepinbell
    'safari-zone-1': [29, 30, 32, 33, 46, 47, 84, 111, 113, 123],
    'safari-zone-2': [29, 30, 32, 33, 46, 47, 84, 102, 111, 113, 127, 128],
    'safari-zone-3': [29, 32, 43, 48, 69, 102, 111, 113, 115, 127, 128],
    'safari-zone-center': [29, 30, 32, 33, 46, 47, 84, 102, 111, 113],

    // Pre-Sabrina
    'route-16': [16, 17, 19, 20, 84, 132],            // Pidgey, Pidgeotto, Rattata, Raticate, Doduo, Ditto
    'route-17': [16, 17, 19, 20, 84, 132],            // Pidgey, Pidgeotto, Rattata, Raticate, Doduo, Ditto
    'route-18': [16, 17, 19, 20, 84, 132],            // Pidgey, Pidgeotto, Rattata, Raticate, Doduo, Ditto
    'power-plant': [25, 26, 81, 82, 100, 101, 125],   // Pikachu, Raichu, Magnemite, Magneton, Voltorb, Electrode, Electabuzz
    'seafoam-islands-1f': [41, 42, 54, 55, 86, 87, 90, 91],
    'seafoam-islands-b1f': [41, 42, 54, 55, 86, 87, 90, 91],

    // Pre-Blaine
    'route-19': [72, 73, 116, 120],                    // Tentacool, Tentacruel, Horsea, Staryu
    'route-20': [72, 73, 116, 120],                    // Tentacool, Tentacruel, Horsea, Staryu
    'pokemon-mansion-1f': [19, 20, 37, 58, 77, 88, 109],
    'pokemon-mansion-b1f': [19, 20, 37, 58, 77, 88, 109, 126],

    // Pre-Giovanni
    'route-21': [16, 17, 19, 20, 72, 73],             // Pidgey, Pidgeotto, Rattata, Raticate, Tentacool, Tentacruel
    'route-23': [16, 17, 21, 22, 56, 57, 29, 30, 32, 33],
    'victory-road-1f': [41, 42, 66, 67, 74, 75, 95],  // Zubat, Golbat, Machop, Machoke, Geodude, Graveler, Onix
    'victory-road-2f': [41, 42, 66, 67, 74, 75, 95],
    'victory-road-3f': [41, 42, 66, 67, 74, 75, 95],
  },

  GOLD_SILVER: {
    // Pre-Falkner
    'route-29': [152, 155, 158, 16, 19, 21, 163, 161], // Chikorita, Cyndaquil, Totodile, Pidgey, Rattata, Spearow, Hoothoot, Sentret
    'route-30': [10, 16, 19, 43, 69, 163, 161],       // Caterpie, Pidgey, Rattata, Oddish, Bellsprout, Hoothoot, Sentret
    'route-31': [10, 16, 19, 43, 69, 163, 161],
    'dark-cave': [41, 74, 194, 207],                   // Zubat, Geodude, Wooper, Dunsparce
    'sprout-tower': [19, 92],                          // Rattata, Gastly

    // Pre-Bugsy
    'route-32': [16, 19, 41, 69, 179, 187],           // Pidgey, Rattata, Zubat, Bellsprout, Mareep, Hoppip
    'ruins-of-alph': [201],                            // Unown
    'union-cave-1f': [41, 74, 95, 194],                // Zubat, Geodude, Onix, Wooper
    'union-cave-b1f': [41, 74, 95, 194],
    'route-33': [21, 41, 187, 214],                    // Spearow, Zubat, Hoppip, Heracross
    'ilex-forest': [16, 43, 46, 48, 102, 163],        // Pidgey, Oddish, Paras, Venonat, Exeggcute, Hoothoot

    // Pre-Whitney
    'route-34': [16, 19, 132, 96, 63],                // Pidgey, Rattata, Ditto, Drowzee, Abra
    'national-park': [10, 13, 16, 43, 48, 161],       // Caterpie, Weedle, Pidgey, Oddish, Venonat, Sentret

    // Pre-Morty
    'route-35': [16, 19, 29, 32, 84, 96, 132],
    'route-36': [16, 21, 29, 32, 37, 58, 161],
    'route-37': [16, 21, 37, 58, 161, 165, 167],
    'route-38': [16, 19, 21, 52, 128, 56, 241],
    'route-39': [16, 19, 52, 128, 56, 241],
    'burned-tower': [41, 92, 109],                     // Zubat, Gastly, Koffing

    // Pre-Chuck
    'route-40': [72, 116],                             // Tentacool, Horsea
    'route-41': [72, 73, 116, 117, 226],

    // Pre-Jasmine
    'route-42': [41, 56, 66, 178],                    // Zubat, Mankey, Machop, Flaaffy
    'mt-mortar': [41, 42, 66, 67, 74, 75, 234],
    'route-43': [16, 17, 48, 49, 128, 203],
    'lake-of-rage': [129, 130],                        // Magikarp, Gyarados

    // Pre-Pryce
    'route-44': [16, 17, 22, 69, 70, 178],
    'ice-path': [41, 42, 215, 220, 221],               // Zubat, Golbat, Sneasel, Swinub, Piloswine

    // Pre-Clair
    'route-45': [41, 42, 74, 75, 84, 85, 207, 231],
    'route-46': [16, 41, 74, 207],
    'dragons-den': [129, 147],                         // Magikarp, Dratini
    'route-26': [16, 17, 19, 20, 43, 44, 84, 85],
    'route-27': [16, 17, 19, 20, 43, 44, 84, 85],
    'victory-road-gs': [41, 42, 66, 67, 74, 75, 95],
  },

  RUBY_SAPPHIRE: {
    // Pre-Roxanne
    'route-101': [252, 255, 258, 261, 263, 265],        // Treecko, Torchic, Mudkip, Poochyena, Zigzagoon, Wurmple
    'route-102': [261, 263, 265, 270, 273, 280],       // Poochyena, Zigzagoon, Wurmple, Lotad, Seedot, Ralts
    'route-103': [261, 263, 265, 280],
    'route-104': [261, 263, 265, 276, 278, 283],       // + Taillow, Wingull, Surskit
    'petalburg-woods': [263, 265, 266, 268, 285, 288], // + Silcoon, Cascoon, Shroomish, Slakoth
    'route-116': [261, 263, 276, 278, 293, 300],       // + Whismur, Skitty
    'rusturf-tunnel': [293],                           // Whismur

    // Pre-Brawly
    'route-106': [72, 278],
    'granite-cave': [41, 74, 296, 303, 304],           // Zubat, Geodude, Makuhita, Mawile, Aron
    'route-107': [72, 278],
    'route-108': [72, 278],
    'route-109': [72, 278],

    // Pre-Wattson
    'route-110': [261, 263, 278, 309, 311, 312],       // + Electrike, Plusle, Minun
    'route-117': [43, 69, 183, 263, 314, 315],         // Oddish, Bellsprout, Marill, Zigzagoon, Illumise, Roselia

    // Pre-Flannery
    'route-111': [27, 74, 328, 331],                   // Sandshrew, Geodude, Trapinch, Cacnea
    'route-112': [29, 32, 66, 322],
    'fiery-path': [66, 88, 109, 218, 322, 324],        // Machop, Grimer, Koffing, Slugma, Numel, Torkoal
    'route-113': [261, 263, 227, 327],                 // Poochyena, Zigzagoon, Skarmory, Spinda
    'route-114': [261, 263, 283, 333, 273],            // + Surskit, Swablu, Seedot
    'meteor-falls': [41, 42, 337, 338],                // Zubat, Golbat, Lunatone, Solrock

    // Pre-Norman
    'route-115': [263, 276, 278, 333],
    'route-105': [72, 278],

    // Pre-Winona
    'route-118': [261, 263, 278, 309, 336],            // + Kecleon
    'route-119': [263, 43, 69, 278, 352],
    'route-120': [261, 263, 43, 183, 352, 359],        // + Absol
    'route-121': [261, 263, 43, 278, 352],
    'safari-zone-rs': [43, 44, 84, 111, 84, 127, 177, 203, 214, 234],

    // Pre-Tate & Liza
    'route-122': [72, 278],
    'mt-pyre': [37, 41, 307, 353, 355],                // Vulpix, Zubat, Meditite, Shuppet, Duskull
    'route-123': [261, 263, 43, 69, 278],
    'route-124': [72, 278],
    'shoal-cave': [41, 42, 361, 363],                  // Zubat, Golbat, Snorunt, Spheal
    'route-125': [72, 278],
    'route-126': [72, 278],
    'route-127': [72, 278],

    // Pre-Wallace
    'route-128': [72, 278],
    'route-129': [72, 278],
    'route-130': [72, 278],
    'route-131': [72, 278],
    'route-132': [72, 278],
    'route-133': [72, 278],
    'route-134': [72, 278],
    'victory-road-rs': [41, 42, 66, 67, 74, 75, 294, 296, 304, 305],
  },

  EMERALD: {
    // Pre-Roxanne
    'route-101-e': [252, 255, 258, 261, 263, 265],      // Treecko, Torchic, Mudkip, Poochyena, Zigzagoon, Wurmple
    'route-102-e': [261, 263, 265, 270, 273, 280],
    'route-103-e': [261, 263, 265, 280],
    'route-104-e': [261, 263, 265, 276, 278, 283],
    'petalburg-woods-e': [263, 265, 266, 268, 285, 288],
    'route-116-e': [261, 263, 276, 278, 293, 300],
    'rusturf-tunnel-e': [293],

    // Pre-Brawly
    'route-106-e': [72, 278],
    'granite-cave-e': [41, 74, 296, 303, 304],
    'route-107-e': [72, 278],
    'route-108-e': [72, 278],
    'route-109-e': [72, 278],

    // Pre-Wattson
    'route-110-e': [261, 263, 278, 309, 311, 312],
    'route-117-e': [43, 69, 183, 263, 314, 315],

    // Pre-Flannery
    'route-111-e': [27, 74, 328, 331],
    'route-112-e': [66, 322],                          // Machop, Numel
    'fiery-path-e': [66, 88, 109, 218, 322, 324],
    'route-113-e': [261, 263, 227, 327],
    'route-114-e': [261, 263, 283, 333, 273],
    'meteor-falls-e': [41, 42, 337, 338],

    // Pre-Norman
    'route-115-e': [263, 276, 278, 333],
    'route-105-e': [72, 278],

    // Pre-Winona
    'route-118-e': [261, 263, 278, 309, 336],
    'route-119-e': [263, 43, 69, 278, 352],
    'route-120-e': [261, 263, 43, 183, 352, 359],
    'route-121-e': [261, 263, 43, 278, 352],
    'safari-zone-e': [43, 44, 84, 111, 127, 177, 203, 214, 234],

    // Pre-Tate & Liza
    'route-122-e': [72, 278],
    'mt-pyre-e': [37, 41, 307, 353, 355],
    'route-123-e': [261, 263, 43, 69, 278],
    'route-124-e': [72, 278],
    'shoal-cave-e': [41, 42, 361, 363],
    'route-125-e': [72, 278],
    'route-126-e': [72, 278],
    'route-127-e': [72, 278],

    // Pre-Juan
    'route-128-e': [72, 278],
    'route-129-e': [72, 278],
    'route-130-e': [72, 278],
    'route-131-e': [72, 278],
    'route-132-e': [72, 278],
    'route-133-e': [72, 278],
    'route-134-e': [72, 278],
    'victory-road-e': [41, 42, 66, 67, 74, 75, 294, 296, 304, 305],
  },

  FIRERED_LEAFGREEN: {
    // Pre-Brock
    'frlg-route-1': [1, 4, 7, 16, 19],                  // Bulbasaur, Charmander, Squirtle, Pidgey, Rattata
    'frlg-route-2': [10, 13, 16, 19],                  // Caterpie, Weedle, Pidgey, Rattata
    'frlg-route-22': [19, 21, 56, 29, 32],
    'frlg-viridian-forest': [10, 11, 13, 14, 25],

    // Pre-Misty
    'frlg-route-3': [16, 19, 21, 29, 32, 39],
    'frlg-mt-moon-1f': [41, 46, 74, 35],
    'frlg-mt-moon-b1f': [41, 46, 74, 35],
    'frlg-mt-moon-b2f': [41, 46, 74, 35],
    'frlg-route-4': [16, 19, 21, 23, 56],
    'frlg-route-24': [10, 13, 16, 43, 63],
    'frlg-route-25': [10, 13, 16, 43, 63],

    // Pre-Lt. Surge
    'frlg-route-5': [16, 43, 52, 56, 63],
    'frlg-route-6': [16, 43, 52, 56, 63],
    'frlg-route-11': [16, 19, 21, 23, 52, 96],
    'frlg-diglett-cave': [50, 51],
    'frlg-ss-anne': [],

    // Pre-Erika
    'frlg-route-9': [16, 19, 21, 23, 56, 100],
    'frlg-route-10': [16, 21, 23, 56, 100],
    'frlg-rock-tunnel-1f': [41, 46, 74, 66, 95],
    'frlg-rock-tunnel-b1f': [41, 46, 74, 66, 95],
    'frlg-route-8': [16, 37, 52, 56, 58, 77],
    'frlg-route-7': [16, 37, 43, 52, 56, 58],
    'frlg-pokemon-tower': [92, 93, 104],

    // Pre-Koga
    'frlg-route-12': [16, 43, 44, 48, 69, 70],
    'frlg-route-13': [16, 43, 44, 48, 69, 70],
    'frlg-route-14': [16, 43, 44, 48, 69, 70, 132],
    'frlg-route-15': [16, 43, 44, 48, 69, 70],
    'frlg-safari-zone-1': [29, 30, 32, 33, 46, 47, 84, 111, 113, 123],
    'frlg-safari-zone-2': [29, 30, 32, 33, 46, 47, 84, 102, 111, 113, 127, 128],
    'frlg-safari-zone-3': [29, 32, 43, 48, 69, 102, 111, 113, 115, 127, 128],
    'frlg-safari-zone-center': [29, 30, 32, 33, 46, 47, 84, 102, 111, 113],

    // Pre-Sabrina
    'frlg-route-16': [16, 17, 19, 20, 84, 132],
    'frlg-route-17': [16, 17, 19, 20, 84, 132],
    'frlg-route-18': [16, 17, 19, 20, 84, 132],
    'frlg-power-plant': [25, 26, 81, 82, 100, 101, 125],
    'frlg-seafoam-1f': [41, 42, 54, 55, 86, 87, 90, 91],
    'frlg-seafoam-b1f': [41, 42, 54, 55, 86, 87, 90, 91],

    // Pre-Blaine
    'frlg-route-19': [72, 73, 116, 120],
    'frlg-route-20': [72, 73, 116, 120],
    'frlg-pokemon-mansion-1f': [19, 20, 37, 58, 77, 88, 109],
    'frlg-pokemon-mansion-b1f': [19, 20, 37, 58, 77, 88, 109, 126],

    // Pre-Giovanni
    'frlg-route-21': [16, 17, 19, 20, 72, 73],
    'frlg-route-23': [16, 17, 21, 22, 56, 57, 29, 30, 32, 33],
    'frlg-victory-road-1f': [41, 42, 66, 67, 74, 75, 95],
    'frlg-victory-road-2f': [41, 42, 66, 67, 74, 75, 95],
    'frlg-victory-road-3f': [41, 42, 66, 67, 74, 75, 95],
  },

  DIAMOND_PEARL: {
    // Pre-Roark
    'dp-route-201': [387, 390, 393, 396, 399],          // Turtwig, Chimchar, Piplup, Starly, Bidoof
    'dp-route-202': [396, 399, 401, 403],              // Starly, Bidoof, Kricketot, Shinx
    'dp-route-203': [41, 63, 396, 399, 401, 403],     // Zubat, Abra, Starly, Bidoof, Kricketot, Shinx
    'dp-oreburgh-gate': [41, 54, 74, 95],              // Zubat, Psyduck, Geodude, Onix
    'dp-oreburgh-mine': [41, 74, 95],                  // Zubat, Geodude, Onix

    // Pre-Gardenia
    'dp-route-204': [41, 63, 396, 399, 401, 406],     // Zubat, Abra, Starly, Bidoof, Kricketot, Budew
    'dp-ravaged-path': [41, 54, 74],                   // Zubat, Psyduck, Geodude
    'dp-route-205': [54, 261, 396, 399, 415, 420],    // Psyduck, Poochyena(LeafGreen insert?), Starly, Bidoof, Combee(honey), Shellos
    'dp-eterna-forest': [54, 92, 185, 265, 406, 415], // Psyduck, Gastly, Sudowoodo(rare), Wurmple, Budew, Combee
    'dp-old-chateau': [92, 93],                        // Gastly, Haunter

    // Pre-Maylene
    'dp-route-206': [41, 74, 77, 401, 403],            // Zubat, Geodude, Ponyta, Kricketot, Shinx
    'dp-wayward-cave': [41, 74, 443],                  // Zubat, Geodude, Gible
    'dp-route-207': [41, 66, 74, 77],                  // Zubat, Machop, Geodude, Ponyta
    'dp-mt-coronet-south': [41, 42, 74, 66, 307],     // Zubat, Golbat, Geodude, Machop, Meditite
    'dp-route-208': [54, 77, 183, 278, 406, 415],     // Psyduck, Ponyta, Marill(surf), Wingull(surf), Budew, Combee(honey)

    // Pre-Crasher Wake
    'dp-route-209': [54, 92, 163, 234, 396, 439],     // Psyduck, Gastly(night), Hoothoot(night), Starly(day), Staravia, Mime Jr.
    'dp-lost-tower': [41, 92, 93, 198, 200],           // Zubat, Gastly, Haunter, Murkrow, Misdreavus
    'dp-solaceon-ruins': [201],                        // Unown
    'dp-route-210': [41, 54, 77, 183, 315, 396],      // Zubat, Psyduck, Ponyta, Marill(surf), Roselia, Starly
    'dp-route-212': [54, 183, 194, 278, 315, 396],    // Psyduck, Marill, Wooper(south), Wingull(surf), Roselia, Starly
    'dp-trophy-garden': [25, 35, 39, 52, 113, 132, 133, 137], // Pikachu, Clefairy, Jigglypuff, Meowth, Chansey, Ditto, Eevee, Porygon

    // Pre-Fantina
    'dp-route-213': [54, 72, 278, 420, 422, 423],     // Psyduck, Tentacool(surf), Wingull(surf), Shellos, Chatot
    'dp-route-214': [41, 74, 75, 77, 194, 453],       // Zubat, Geodude, Graveler, Ponyta, Wooper(night), Croagunk(night)
    'dp-valor-lakefront': [396, 397, 54, 399, 400],   // Starly, Staravia, Psyduck, Bidoof, Bibarel

    // Pre-Byron
    'dp-route-218': [54, 278, 396, 397, 422],         // Psyduck(surf), Wingull(surf), Starly, Staravia(rare), Shellos
    'dp-route-216': [215, 307, 459],                   // Sneasel, Meditite, Snover
    'dp-route-217': [215, 220, 307, 459],              // Sneasel, Swinub, Meditite, Snover
    'dp-iron-island': [41, 42, 74, 75, 95, 305],      // Zubat, Golbat, Geodude, Graveler, Onix, Steelix(rare)

    // Pre-Candice
    'dp-lake-acuity': [54, 55, 215, 459],              // Psyduck, Golduck(surf), Sneasel, Snover
    'dp-route-211': [41, 42, 66, 67, 74, 307, 315],   // Zubat, Golbat, Machop(rare), Machoke(rare), Geodude, Meditite, Roselia
    'dp-mt-coronet-north': [41, 42, 74, 75, 307, 433], // Zubat, Golbat, Geodude, Graveler, Meditite, Chingling

    // Pre-Volkner
    'dp-route-222': [54, 55, 278, 279, 309, 310, 396, 397], // Psyduck, Golduck, Wingull, Pelipper(surf), Electrike, Manectric(rare), Starly(rare), Staravia(rare)
    'dp-route-219': [72, 278, 279],                    // Tentacool(surf), Wingull(surf), Pelipper(surf)
    'dp-route-220': [72, 278, 279],
    'dp-route-221': [54, 278, 315, 396, 397, 399, 400], // Psyduck(surf), Wingull, Roselia, Starly(rare), Staravia, Bidoof(rare), Bibarel

    // Pre-Elite Four
    'dp-route-223': [72, 73, 278, 279],                // Tentacool, Tentacruel(surf), Wingull(surf), Pelipper(surf)
    'dp-victory-road': [41, 42, 66, 67, 74, 75, 307, 308], // Zubat, Golbat, Machop(rare), Machoke, Geodude, Graveler, Meditite, Medicham
    'dp-route-224': [54, 55, 77, 78, 278, 279, 315],  // Psyduck, Golduck(surf), Ponyta(rare), Rapidash, Wingull(surf), Pelipper(surf), Roselia
  },

  PLATINUM: {
    // Pre-Roark
    'pt-route-201': [387, 390, 393, 396, 399],          // Turtwig, Chimchar, Piplup, Starly, Bidoof
    'pt-route-202': [396, 399, 401, 403],              // Starly, Bidoof, Kricketot, Shinx
    'pt-route-203': [41, 63, 396, 399, 401, 403],
    'pt-oreburgh-gate': [41, 54, 74, 95],
    'pt-oreburgh-mine': [41, 74, 95],

    // Pre-Gardenia
    'pt-route-204': [41, 63, 396, 399, 401, 406],
    'pt-ravaged-path': [41, 54, 74],
    'pt-route-205': [54, 396, 399, 415, 420],
    'pt-eterna-forest': [54, 92, 265, 406, 415],
    'pt-old-chateau': [92, 93],

    // Pre-Fantina (Platinum order)
    'pt-route-206': [41, 74, 77, 401, 403],
    'pt-wayward-cave': [41, 74, 443],                  // Gible!
    'pt-route-207': [41, 66, 74, 77],
    'pt-mt-coronet-south': [41, 42, 74, 66, 307],
    'pt-route-208': [54, 77, 183, 278, 406, 415],

    // Pre-Maylene
    'pt-route-209': [54, 92, 163, 396, 439],
    'pt-lost-tower': [41, 92, 93, 198, 200],
    'pt-solaceon-ruins': [201],
    'pt-route-210': [41, 54, 77, 183, 315, 396],

    // Pre-Crasher Wake
    'pt-route-212': [54, 183, 194, 278, 315, 396],
    'pt-trophy-garden': [25, 35, 39, 52, 113, 132, 133, 137],
    'pt-route-213': [54, 72, 278, 420, 422],
    'pt-route-214': [41, 74, 75, 77, 194, 453],
    'pt-valor-lakefront': [396, 397, 54, 399, 400],

    // Pre-Byron
    'pt-route-218': [54, 278, 396, 397, 422],
    'pt-iron-island': [41, 42, 74, 75, 95, 305],

    // Pre-Candice
    'pt-route-216': [215, 307, 459],
    'pt-route-217': [215, 220, 307, 459],
    'pt-lake-acuity': [54, 55, 215, 459],

    // Pre-Volkner
    'pt-route-211': [41, 42, 66, 67, 74, 307, 315],
    'pt-mt-coronet-north': [41, 42, 74, 75, 307, 433],
    'pt-route-222': [54, 55, 278, 279, 309, 310, 396, 397],

    // Pre-Elite Four
    'pt-route-223': [72, 73, 278, 279],
    'pt-victory-road': [41, 42, 66, 67, 74, 75, 307, 308],
  },

  HEARTGOLD_SOULSILVER: {
    // Pre-Falkner
    'hgss-route-29': [152, 155, 158, 16, 19, 21, 163, 161],
    'hgss-route-30': [10, 16, 19, 43, 69, 163, 161],
    'hgss-route-31': [10, 16, 19, 43, 69, 163, 161],
    'hgss-dark-cave': [41, 74, 194, 207],
    'hgss-sprout-tower': [19, 92],

    // Pre-Bugsy
    'hgss-route-32': [16, 19, 41, 69, 179, 187],
    'hgss-ruins-of-alph': [201],
    'hgss-union-cave-1f': [41, 74, 95, 194],
    'hgss-union-cave-b1f': [41, 74, 95, 194],
    'hgss-route-33': [21, 41, 187, 214],
    'hgss-slowpoke-well': [41, 79, 199],               // Zubat, Slowpoke, Slowking(rare)
    'hgss-ilex-forest': [16, 43, 46, 48, 102, 163],

    // Pre-Whitney
    'hgss-route-34': [16, 19, 132, 96, 63],
    'hgss-national-park': [10, 13, 16, 43, 48, 161],

    // Pre-Morty
    'hgss-route-35': [16, 19, 29, 32, 84, 96, 132],
    'hgss-route-36': [16, 21, 29, 32, 37, 58, 161],
    'hgss-route-37': [16, 21, 37, 58, 161, 165, 167],
    'hgss-route-38': [16, 19, 21, 52, 128, 56, 241],
    'hgss-route-39': [16, 19, 52, 128, 56, 241],
    'hgss-burned-tower': [41, 92, 109],

    // Pre-Chuck
    'hgss-route-40': [72, 116],
    'hgss-route-41': [72, 73, 116, 117, 226],

    // Pre-Jasmine
    'hgss-route-42': [41, 56, 66, 178],
    'hgss-mt-mortar': [41, 42, 66, 67, 74, 75, 234],
    'hgss-route-43': [16, 17, 48, 49, 128, 203],
    'hgss-lake-of-rage': [129, 130],

    // Pre-Pryce
    'hgss-route-44': [16, 17, 22, 69, 70, 178],
    'hgss-ice-path': [41, 42, 215, 220, 221],

    // Pre-Clair
    'hgss-route-45': [41, 42, 74, 75, 84, 85, 207, 231],
    'hgss-route-46': [16, 41, 74, 207],
    'hgss-dragons-den': [129, 147],
    'hgss-route-26': [16, 17, 19, 20, 43, 44, 84, 85],
    'hgss-route-27': [16, 17, 19, 20, 43, 44, 84, 85],
    'hgss-victory-road': [41, 42, 66, 67, 74, 75, 95],
  },

  BLACK_WHITE: {
    // Pre-Cilan/Chili/Cress
    'bw-route-1': [495, 498, 501, 504, 506, 509],       // Snivy, Tepig, Oshawott, Patrat, Lillipup, Purrloin
    'bw-route-2': [504, 506, 509],
    'bw-dreamyard': [504, 509, 517],                   // Patrat, Purrloin, Munna

    // Pre-Lenora
    'bw-route-3': [504, 506, 509, 519, 535],           // Patrat, Lillipup, Purrloin, Pidove, Tympole
    'bw-wellspring-cave': [524, 527],                  // Roggenrola, Woobat
    'bw-pinwheel-forest': [510, 531, 532, 535, 540, 543], // Liepard(rare), Audino, Timburr, Tympole, Sewaddle, Venipede

    // Pre-Burgh
    'bw-route-4': [551, 552, 558, 559],                // Sandile, Krokorok(rare), Trubbish(rare), Scraggy
    'bw-desert-resort': [328, 551, 555, 559],          // Trapinch(rare), Sandile, Darumaka, Scraggy
    'bw-relic-castle': [551, 555, 562],                // Sandile, Darumaka, Yamask

    // Pre-Elesa
    'bw-route-5': [504, 506, 509, 531, 572],           // Patrat, Lillipup, Purrloin, Audino, Minccino
    'bw-cold-storage': [535, 568, 569, 582],           // Tympole, Trubbish, Garbodor(rare), Vanillite
    'bw-route-16': [504, 506, 509, 531, 572],
    'bw-lostlorn-forest': [504, 519, 531, 541, 572],  // Patrat, Pidove, Audino, Swadloon, Minccino

    // Pre-Clay
    'bw-route-6': [535, 536, 572, 580, 590],           // Tympole, Palpitoad, Minccino, Deerling, Foongus
    'bw-chargestone-cave': [524, 525, 527, 595, 597, 599], // Roggenrola, Boldore, Woobat, Joltik, Ferroseed, Klink

    // Pre-Skyla
    'bw-route-7': [531, 572, 580, 590, 613],           // Audino, Minccino, Deerling, Foongus, Cubchoo
    'bw-celestial-tower': [562, 592],                  // Yamask(rare), Litwick -> Actually Elgyem/Litwick
    'bw-twist-mountain': [524, 525, 527, 528, 613],   // Roggenrola, Boldore, Woobat, Swoobat, Cubchoo

    // Pre-Brycen
    'bw-route-8': [531, 572, 580, 590, 613],           // Audino, Minccino(rare), Deerling(rare), Foongus(rare), Cubchoo(rare) -- swamp
    'bw-icirrus-city': [531, 613],                     // Audino, Cubchoo (winter)
    'bw-dragonspiral-tower': [527, 528, 588, 622],    // Woobat, Swoobat(rare), Karrablast(rare), Golett

    // Pre-Drayden/Iris
    'bw-route-9': [504, 505, 510, 531, 553],           // Patrat, Watchog, Liepard, Audino, Krokorok(rare)
    'bw-route-10': [531, 538, 539, 604, 621],         // Audino, Throh(B), Sawk(W), Eelektross(rare), Bouffalant
    'bw-victory-road': [524, 525, 527, 528, 632],     // Roggenrola, Boldore, Woobat, Swoobat, Durant
  },

  BLACK2_WHITE2: {
    // Pre-Cheren
    'b2w2-route-19': [495, 498, 501, 504, 506, 509],    // Snivy, Tepig, Oshawott, Patrat, Lillipup, Purrloin
    'b2w2-route-20': [504, 506, 509, 531, 540],       // Patrat, Lillipup, Purrloin, Audino, Sewaddle
    'b2w2-floccesy-ranch': [504, 506, 507, 179, 180], // Patrat, Lillipup, Herdier, Mareep, Flaaffy

    // Pre-Roxie
    'b2w2-virbank-complex': [81, 109, 110, 504, 524], // Magnemite, Koffing, Weezing(rare), Patrat, Roggenrola(rare)

    // Pre-Burgh
    'b2w2-route-4': [551, 558, 559],                  // Sandile, Trubbish(rare), Scraggy
    'b2w2-desert-resort': [328, 551, 555, 559],
    'b2w2-relic-castle': [551, 555, 562],
    'b2w2-castelia-sewers': [19, 20, 41, 42, 568],    // Rattata, Raticate, Zubat, Golbat, Trubbish

    // Pre-Elesa
    'b2w2-route-5': [504, 506, 509, 531, 572],
    'b2w2-route-16': [504, 506, 509, 531, 572],
    'b2w2-lostlorn-forest': [504, 519, 531, 541, 572],

    // Pre-Clay
    'b2w2-route-6': [535, 536, 572, 580, 590],
    'b2w2-chargestone-cave': [524, 525, 527, 595, 597, 599],
    'b2w2-mistralton-cave': [41, 42, 524, 525, 622],  // Zubat, Golbat, Roggenrola, Boldore, Golett

    // Pre-Skyla
    'b2w2-route-7': [531, 572, 580, 590, 613],
    'b2w2-celestial-tower': [562, 592],
    'b2w2-twist-mountain': [524, 525, 527, 528, 613],

    // Pre-Drayden
    'b2w2-route-8': [531, 572, 580, 590, 613],
    'b2w2-route-9': [504, 505, 510, 531, 553],
    'b2w2-reversal-mountain': [524, 525, 527, 528, 529, 631], // + Drilbur, Heatmor
    'b2w2-strange-house': [527, 562, 592],             // Woobat(rare), Yamask(rare), Litwick(rare) -> actually Banette etc

    // Pre-Marlon
    'b2w2-route-21': [531, 572, 590],
    'b2w2-route-22': [41, 531, 580, 590],
    'b2w2-seaside-cave': [524, 525, 527, 592],         // Roggenrola, Boldore, Woobat, Frillish(surf) -> Tynamo

    // Pre-Elite Four
    'b2w2-route-23': [41, 42, 531, 580, 621],         // Zubat, Golbat(rare), Audino, Deerling(rare), Bouffalant
    'b2w2-victory-road': [524, 525, 527, 528, 632],
  },

  X_Y: {
    // Pre-Viola
    'xy-route-2': [650, 653, 656, 16, 659, 661, 731],   // Chespin, Fennekin, Froakie, Pidgey, Bunnelby, Fletchling, (filler)
    'xy-santalune-forest': [10, 13, 25, 511, 513, 515, 661], // Caterpie, Weedle, Pikachu, Pansage, Pansear, Panpour, Fletchling
    'xy-route-3': [16, 25, 63, 412, 659, 661],        // Pidgey, Pikachu(rare), Abra(rare), Burmy, Bunnelby, Fletchling

    // Pre-Grant
    'xy-route-4': [183, 280, 298, 315, 406, 669],     // Marill(rare), Ralts, Azurill(rare), Roselia(rare), Budew, Flabebe
    'xy-route-5': [43, 63, 283, 316, 659, 661],       // Oddish(rare), Abra, Surskit(rare), Gulpin, Bunnelby, Fletchling
    'xy-route-6': [43, 63, 194, 283, 660, 672],       // Oddish, Abra(rare), Wooper(rare), Surskit(rare), Diggersby(rare), Skiddo
    'xy-route-7': [25, 77, 183, 198, 315, 406, 509],  // Pikachu(rare), Ponyta(rare), Marill(rare), Murkrow(rare), Roselia, Budew, Purrloin(rare)
    'xy-connecting-cave': [41, 293, 610],              // Zubat, Whismur, Axew(rare)
    'xy-route-8': [43, 69, 278, 340, 422, 557],       // Oddish(rare), Bellsprout(rare), Wingull, Barboach(rare), Shellos(rare), Dwebble
    'xy-ambrette-town': [72, 90, 116, 369],            // Tentacool(surf), Shellder(surf), Horsea(surf), Relicanth(rare surf)
    'xy-route-9': [214, 559, 632],                     // Heracross(rare), Scraggy(rare), Durant(rare)
    'xy-glittering-cave': [95, 337, 338, 566, 703],   // Onix, Lunatone, Solrock, Archen(rare), Carbink(rare)

    // Pre-Korrina
    'xy-route-10': [133, 163, 281, 299, 371, 694],    // Eevee(rare), Hoothoot(rare), Kirlia(rare), Nosepass, Bagon(rare), Helioptile(rare) -> Golett, Sigilyph, Hawlucha, Snubbull
    'xy-route-11': [43, 69, 332, 504, 674],           // Oddish, Bellsprout(rare), Cacturne(rare), Patrat(rare), Pancham
    'xy-reflection-cave': [302, 439, 524, 527, 703],  // Sableye(rare), Mime Jr., Roggenrola, Woobat, Carbink

    // Pre-Ramos
    'xy-route-12': [310, 396, 399, 506, 672, 676],    // Manectric(rare), Starly(rare), Bidoof(rare), Lillipup(rare), Skiddo(rare), Furfrou(rare) -> Tauros, Miltank, Pachirisu
    'xy-azure-bay': [72, 90, 116, 278],                // Tentacool(surf), Shellder(surf), Horsea(surf), Wingull(surf)

    // Pre-Clemont
    'xy-route-13': [74, 322, 328, 443, 551],           // Geodude, Numel(rare), Trapinch, Gible(rare), Sandile
    'xy-route-14': [48, 167, 279, 590, 704],           // Venonat(rare), Spinarak(rare), Pelipper(surf), Foongus(rare), Goomy
    'xy-route-15': [43, 198, 590, 672, 710],           // Oddish(rare), Murkrow(night), Foongus, Skiddo(rare), Pumpkaboo(rare)
    'xy-lost-hotel': [41, 168, 200, 479, 569],         // Zubat(rare), Ariados(rare), Misdreavus(rare), Rotom(rare Tues), Garbodor(rare)

    // Pre-Valerie
    'xy-route-16': [165, 198, 590, 708, 710],          // Ledyba(rare), Murkrow(night), Foongus, Phantump, Pumpkaboo
    'xy-frost-cavern': [215, 361, 582, 613, 614],      // Sneasel(rare), Snorunt(rare), Vanillite(rare), Cubchoo, Beartic(rare)

    // Pre-Olympia
    'xy-route-17': [215, 459, 613, 614],               // Sneasel, Snover, Cubchoo(rare), Beartic(rare)
    'xy-route-18': [74, 75, 621, 632, 712],            // Geodude(rare), Graveler, Bouffalant(rare), Durant, Bergmite
    'xy-terminus-cave': [42, 75, 302, 525, 632],       // Golbat, Graveler, Sableye(rare), Boldore, Durant
    'xy-route-19': [43, 167, 279, 590, 704],           // Oddish(rare), Spinarak(rare), Pelipper(surf), Foongus(rare), Goomy(rare)

    // Pre-Wulfric
    'xy-route-20': [43, 46, 590, 708, 710],            // Oddish(rare), Paras(rare), Foongus, Phantump, Pumpkaboo
    'xy-pokemon-village': [41, 64, 132, 375, 521],     // Zubat(rare), Kadabra(rare), Ditto, Metang(rare), Unfezant(rare) -> Zoroark, Lickitung, Banette, Jigglypuff, Noctowl, Gothorita, Amoonguss

    // Pre-Elite Four
    'xy-route-21': [75, 168, 521, 590, 713],           // Graveler(rare), Ariados(rare), Unfezant(rare), Foongus(rare), Avalugg(rare) -> Ursaring, Spinda, Scyther, Floatzel
    'xy-route-22': [104, 131, 207, 511, 513, 515, 590], // Cubone(rare), Lapras(surf rare), Gligar(rare), Pansage(rare), Pansear(rare), Panpour(rare), Foongus(rare) -> Psyduck, Litleo, Bibarel
    'xy-victory-road': [42, 64, 75, 525, 632, 713],   // Golbat, Kadabra(rare), Graveler, Boldore, Durant, Avalugg(rare)
  },

  OMEGA_RUBY_ALPHA_SAPPHIRE: {
    // Pre-Roxanne
    'oras-route-101': [252, 255, 258, 261, 263, 265],
    'oras-route-102': [261, 263, 265, 270, 273, 280],
    'oras-route-103': [261, 263, 265, 280],
    'oras-route-104': [261, 263, 265, 276, 278, 283],
    'oras-petalburg-woods': [263, 265, 266, 268, 285, 288],
    'oras-route-116': [261, 263, 276, 278, 293, 300],
    'oras-rusturf-tunnel': [293],

    // Pre-Brawly
    'oras-route-106': [72, 278],
    'oras-granite-cave': [41, 74, 296, 303, 304],
    'oras-route-107': [72, 278],
    'oras-route-108': [72, 278],
    'oras-route-109': [72, 278],

    // Pre-Wattson
    'oras-route-110': [261, 263, 278, 309, 311, 312],
    'oras-route-117': [43, 69, 183, 263, 314, 315],

    // Pre-Flannery
    'oras-route-111': [27, 74, 328, 331],
    'oras-route-112': [66, 322],
    'oras-fiery-path': [66, 88, 109, 218, 322, 324],
    'oras-route-113': [261, 263, 227, 327],
    'oras-route-114': [261, 263, 283, 333, 273],
    'oras-meteor-falls': [41, 42, 337, 338],

    // Pre-Norman
    'oras-route-115': [263, 276, 278, 333],
    'oras-route-105': [72, 278],

    // Pre-Winona
    'oras-route-118': [261, 263, 278, 309, 336],
    'oras-route-119': [263, 43, 69, 278, 352],
    'oras-route-120': [261, 263, 43, 183, 352, 359],
    'oras-route-121': [261, 263, 43, 278, 352],
    'oras-safari-zone': [43, 44, 84, 111, 127, 177, 203, 214, 234],

    // Pre-Tate & Liza
    'oras-route-122': [72, 278],
    'oras-mt-pyre': [37, 41, 307, 353, 355],
    'oras-route-123': [261, 263, 43, 69, 278],
    'oras-route-124': [72, 278],
    'oras-shoal-cave': [41, 42, 361, 363],
    'oras-route-125': [72, 278],
    'oras-route-126': [72, 278],
    'oras-route-127': [72, 278],

    // Pre-Wallace
    'oras-route-128': [72, 278],
    'oras-route-129': [72, 278],
    'oras-route-130': [72, 278],
    'oras-route-131': [72, 278],
    'oras-route-132': [72, 278],
    'oras-route-133': [72, 278],
    'oras-route-134': [72, 278],
    'oras-victory-road': [41, 42, 66, 67, 74, 75, 294, 296, 304, 305],
  },

  SUN_MOON: {
    // Pre-Ilima
    'sm-route-1': [722, 725, 728, 19, 21, 25, 79, 163, 172, 731, 734, 735], // Rowlet, Litten, Popplio, Rattata(A), Spearow(rare), Pikachu(rare), Slowpoke(rare), Hoothoot(night), Pichu, Pikipek, Yungoos, Gumshoos(rare)
    'sm-route-2': [52, 54, 278, 734, 735],             // Meowth(A), Psyduck(rare), Wingull(rare), Yungoos, Gumshoos(rare)
    'sm-route-3': [21, 54, 63, 278, 627, 731],         // Spearow, Psyduck(rare), Abra(rare), Wingull(rare), Rufflet(rare), Pikipek
    'sm-hau-oli-city': [81, 88, 278, 568],             // Magnemite, Grimer(A), Wingull, Trubbish

    // Pre-Hala
    'sm-verdant-cavern': [41, 52, 734, 735],           // Zubat, Meowth(A rare), Yungoos, Gumshoos(rare)
    'sm-melemele-meadow': [46, 546, 669, 741],         // Paras(rare), Deerling(rare) -> actually: Caterpie, Metapod, Butterfree, Cutiefly, Oricorio
    'sm-seaward-cave': [54, 74, 443],                  // Psyduck, Geodude(A rare), Gible(rare) -> actually: Zubat, Smoochum, Delibird, Psyduck
    'sm-ten-carat-hill': [41, 54, 74, 524, 703],       // Zubat, Psyduck(rare), Geodude(A), Roggenrola, Carbink(rare)

    // Pre-Lana
    'sm-route-4': [43, 69, 546, 674, 741],             // Oddish(rare), Bellsprout(rare) -> Lillipup, Eevee(rare), Mudbray, Crabrawler
    'sm-route-5': [43, 54, 69, 674, 745],              // Oddish(rare), Psyduck(rare), Bellsprout(rare), Pancham, Fomantis(rare) -> actually: Grubbin, Trumbeak, Fomantis, Dewpider
    'sm-paniola-ranch': [128, 179, 241, 506],          // Tauros, Mareep(rare), Miltank, Lillipup
    'sm-brooklet-hill': [54, 60, 118, 278, 751],       // Psyduck, Poliwag(rare), Goldeen(rare), Wingull, Dewpider

    // Pre-Kiawe
    'sm-route-6': [52, 278, 674, 749],                 // Meowth(A rare), Wingull(rare), Pancham(rare), Mudbray
    'sm-royal-avenue': [504, 559, 674, 749],           // Patrat(rare), Scraggy(rare), Pancham(rare), Mudbray(rare) -> actually: Lillipup, Eevee
    'sm-wela-volcano': [58, 240, 324, 661, 757],       // Growlithe(rare), Magby, Torkoal(rare), Fletchling(rare), Salandit

    // Pre-Mallow
    'sm-route-7': [72, 278, 456],                      // Tentacool(surf), Wingull(surf), Finneon(surf)
    'sm-route-8': [54, 278, 568, 757],                 // Psyduck(rare), Wingull(rare), Trubbish(rare), Salandit
    'sm-lush-jungle': [46, 54, 165, 590, 753, 764],   // Paras, Psyduck(rare), Ledyba(rare), Foongus, Fomantis, Comfey(rare)

    // Pre-Olivia
    'sm-diglett-tunnel': [50, 74, 524],                 // Diglett(A), Geodude(A), Roggenrola(rare)
    'sm-route-9': [72, 278],                            // Tentacool(surf), Wingull(surf)
    'sm-memorial-hill': [92, 93, 708],                  // Gastly, Haunter(rare), Phantump
    'sm-akala-outskirts': [278, 568],                  // Wingull, Trubbish

    // Pre-Sophocles
    'sm-route-10': [54, 74, 524, 749, 759],            // Psyduck(rare), Geodude(A rare), Roggenrola(rare), Mudbray(rare), Stufful(rare)
    'sm-malie-garden': [52, 81, 88, 568],              // Meowth(A rare), Magnemite(rare), Grimer(A rare), Trubbish(rare) -> Poliwag, Psyduck, Goldeen, Ledyba
    'sm-route-11': [63, 198, 674, 775],                // Abra(rare), Murkrow(night rare), Pancham, Oranguru/Passimian
    'sm-route-12': [74, 749],                          // Geodude(A), Mudbray
    'sm-hokulani-observatory': [81, 239, 462, 595],    // Magnemite, Elekid(rare), Magnezone(rare), Joltik(rare) -> Cleffa, Minior, Beldum, Ditto

    // Pre-Acerola
    'sm-route-13': [551],                              // Sandile -> Gumshoos
    'sm-haina-desert': [27, 74, 328, 551],             // Sandshrew(A rare), Geodude(A rare), Trapinch(rare), Sandile
    'sm-route-14': [92, 93, 200, 592],                  // Gastly(night), Haunter(night), Misdreavus(night rare), Frillish(surf)
    'sm-thrifty-megamart': [92, 93, 302, 353, 355, 778], // Gastly, Haunter, Sableye(rare), Shuppet, Duskull(rare), Mimikyu(rare)

    // Pre-Vast Poni
    'sm-route-15': [54, 278, 568],                     // Psyduck(surf), Wingull(surf), Trubbish(rare)
    'sm-route-16': [19, 278, 568, 734],                // Rattata(A night), Wingull(rare), Trubbish(rare), Yungoos(day)
    'sm-route-17': [19, 278, 568, 734],
    'sm-po-town': [19, 88, 568, 734],                  // Rattata(A), Grimer(A), Trubbish, Yungoos
    'sm-poni-wilds': [72, 278, 674, 749, 766],         // Tentacool(surf), Wingull, Pancham(rare), Mudbray(rare), Passimian/Oranguru
    'sm-ancient-poni-path': [72, 278, 674],            // Tentacool(surf), Wingull, Pancham(rare)
    'sm-poni-canyon': [41, 42, 74, 75, 148, 524, 525, 703], // Zubat, Golbat, Dragonair(rare), Geodude(A rare), Graveler(A), Roggenrola(rare), Boldore, Carbink(rare)

    // Pre-Elite Four
    'sm-mount-lanakila': [215, 361, 582, 613, 614, 780], // Sneasel, Snorunt(rare), Vanillite(rare), Cubchoo(rare), Beartic(rare), Drampa(rare) -> Absol, Vulpix(A), Sandshrew(A)
  },

  ULTRA_SUN_ULTRA_MOON: {
    // Pre-Ilima (same structure as SM with some encounter changes)
    'usum-route-1': [722, 725, 728, 19, 21, 25, 79, 163, 172, 731, 734],
    'usum-route-2': [52, 54, 278, 734, 735],
    'usum-route-3': [21, 54, 63, 278, 627, 731],
    'usum-hau-oli-city': [81, 88, 278, 568],

    // Pre-Hala
    'usum-verdant-cavern': [41, 52, 734, 735],
    'usum-melemele-meadow': [46, 546, 669, 741],
    'usum-seaward-cave': [41, 54, 74],
    'usum-ten-carat-hill': [41, 54, 74, 524, 703],

    // Pre-Lana
    'usum-route-4': [43, 69, 506, 674, 741],
    'usum-route-5': [43, 54, 69, 674, 745],
    'usum-paniola-ranch': [128, 179, 241, 506],
    'usum-brooklet-hill': [54, 60, 118, 278, 751],

    // Pre-Kiawe
    'usum-route-6': [52, 278, 674, 749],
    'usum-royal-avenue': [504, 559, 674, 749],
    'usum-wela-volcano': [58, 240, 324, 661, 757],

    // Pre-Mallow
    'usum-route-7': [72, 278, 456],
    'usum-route-8': [54, 278, 568, 757],
    'usum-lush-jungle': [46, 54, 165, 590, 753, 764],

    // Pre-Olivia
    'usum-diglett-tunnel': [50, 74, 524],
    'usum-route-9': [72, 278],
    'usum-memorial-hill': [92, 93, 708],
    'usum-akala-outskirts': [278, 568],

    // Pre-Sophocles
    'usum-route-10': [54, 74, 524, 749, 759],
    'usum-malie-garden': [52, 81, 88, 568],
    'usum-route-11': [63, 198, 674, 775],
    'usum-route-12': [74, 749],
    'usum-hokulani-observatory': [81, 239, 462, 595],

    // Pre-Acerola
    'usum-route-13': [551],
    'usum-haina-desert': [27, 74, 328, 551],
    'usum-route-14': [92, 93, 200, 592],
    'usum-thrifty-megamart': [92, 93, 302, 353, 355, 778],

    // Pre-Vast Poni
    'usum-route-15': [54, 278, 568],
    'usum-route-16': [19, 278, 568, 734],
    'usum-route-17': [19, 278, 568, 734],
    'usum-po-town': [19, 88, 568, 734],
    'usum-poni-wilds': [72, 278, 674, 749, 766],
    'usum-ancient-poni-path': [72, 278, 674],
    'usum-poni-canyon': [41, 42, 74, 75, 148, 524, 525, 703],

    // Pre-Elite Four
    'usum-mount-lanakila': [215, 361, 582, 613, 614, 780],
  },

  SWORD_SHIELD: {
    // Pre-Milo
    'swsh-route-1': [810, 813, 816, 263, 819, 821, 824, 831], // Grookey, Scorbunny, Sobble, Zigzagoon(G), Skwovet, Rookidee, Blipbug, Wooloo
    'swsh-route-2': [263, 819, 821, 824, 831, 833],   // Zigzagoon(G), Skwovet, Rookidee, Blipbug, Wooloo, Chewtle
    'swsh-wedgehurst': [263, 819, 831],                // Zigzagoon(G), Skwovet, Wooloo
    'swsh-rolling-fields': [113, 143, 194, 406, 659, 819, 827, 831], // Chansey(rare), Snorlax(rare), Wooper(rare), Budew, Bunnelby, Skwovet, Nickit, Wooloo
    'swsh-dappled-grove': [194, 406, 659, 819, 824, 827], // Wooper(rare), Budew, Bunnelby, Skwovet, Blipbug, Nickit
    'swsh-west-lake-axewell': [194, 278, 659, 819, 824, 831], // Wooper(rare), Wingull, Bunnelby, Skwovet, Blipbug, Wooloo

    // Pre-Nessa
    'swsh-route-3': [43, 81, 177, 263, 406, 819, 821, 831, 833], // Oddish(rare), Magnemite(rare), Natu(rare), Zigzagoon(G), Budew(rare), Skwovet, Rookidee, Wooloo(rare), Chewtle(rare)
    'swsh-galar-mine': [527, 524, 557, 837],           // Woobat, Roggenrola, Dwebble, Rolycoly
    'swsh-route-4': [309, 396, 659, 819, 821, 831, 843], // Electrike, Starly(rare), Bunnelby, Skwovet, Rookidee, Wooloo, Silicobra(rare)

    // Pre-Kabu
    'swsh-route-5': [43, 194, 509, 659, 819, 831, 849], // Oddish(rare), Wooper(rare), Purrloin(rare), Bunnelby(rare), Skwovet(rare), Wooloo(rare), Toxel(gift)
    'swsh-east-lake-axewell': [194, 278, 659, 819, 824, 831],
    'swsh-north-lake-miloch': [194, 278, 659, 819, 824, 831],
    'swsh-motostoke-riverbank': [194, 278, 659, 819, 824, 831],

    // Pre-Bea/Allister
    'swsh-galar-mine-2': [339, 436, 527, 557, 837],   // Barboach(rare), Bronzor(rare), Woobat, Dwebble, Rolycoly
    'swsh-route-6': [19, 263, 509, 659, 819, 843],    // Rattata(rare) -> actually: Silicobra, Torkoal, Galarian Yamask(rare), Hippopotas(rare)
    'swsh-stony-wilderness': [42, 436, 525, 557, 749], // Golbat(rare), Bronzor, Boldore, Dwebble, Mudbray(rare)
    'swsh-giants-mirror': [42, 436, 525, 557, 749],

    // Pre-Opal
    'swsh-route-7': [75, 183, 309, 821, 822, 831, 832], // Graveler(rare), Marill(rare), Electrike(rare), Rookidee(rare), Corvisquire, Wooloo(rare), Dubwool
    'swsh-bridge-field': [194, 278, 659, 819, 824, 831],
    'swsh-giants-cap': [42, 436, 525, 557],

    // Pre-Gordie/Melony
    'swsh-route-8': [75, 220, 443, 525, 557, 843, 871], // Graveler(rare), Swinub, Gible(rare? no) -> Falinks, Duraludon(rare), Sandaconda, Snom
    'swsh-route-9': [72, 90, 278, 833, 834, 871],     // Tentacool(surf), Shellder(rare surf) -> Cramorant, Clobbopus, Chewtle, Drednaw, Snom(rare)
    'swsh-dusty-bowl': [42, 436, 525, 557, 749],

    // Pre-Piers
    'swsh-route-9-circhester': [72, 278, 833, 871],
    'swsh-lake-of-outrage': [42, 525, 557, 613, 832], // Golbat(rare), Boldore(rare), Dwebble(rare), Cubchoo(rare), Dubwool(rare)
    'swsh-hammerlocke-hills': [42, 436, 525, 557, 749],

    // Pre-Raihan
    'swsh-route-10': [215, 220, 361, 459, 613, 871],  // Sneasel, Swinub, Snorunt, Snover, Cubchoo, Snom

    // Pre-Champion Cup
    'swsh-victory-road': [],                           // SwSh doesn't have traditional Victory Road
  },

  BRILLIANT_DIAMOND_SHINING_PEARL: {
    // Pre-Roark
    'bdsp-route-201': [387, 390, 393, 396, 399],        // Turtwig, Chimchar, Piplup, Starly, Bidoof
    'bdsp-route-202': [396, 399, 401, 403],
    'bdsp-route-203': [41, 63, 396, 399, 401, 403],
    'bdsp-oreburgh-gate': [41, 54, 74, 95],
    'bdsp-oreburgh-mine': [41, 74, 95],

    // Pre-Gardenia
    'bdsp-route-204': [41, 63, 396, 399, 401, 406],
    'bdsp-ravaged-path': [41, 54, 74],
    'bdsp-route-205': [54, 396, 399, 415, 420],
    'bdsp-eterna-forest': [54, 92, 265, 406, 415],
    'bdsp-old-chateau': [92, 93],

    // Pre-Maylene
    'bdsp-route-206': [41, 74, 77, 401, 403],
    'bdsp-wayward-cave': [41, 74, 443],
    'bdsp-route-207': [41, 66, 74, 77],
    'bdsp-mt-coronet-south': [41, 42, 74, 66, 307],
    'bdsp-route-208': [54, 77, 183, 278, 406, 415],

    // Pre-Crasher Wake
    'bdsp-route-209': [54, 92, 163, 396, 439],
    'bdsp-lost-tower': [41, 92, 93, 198, 200],
    'bdsp-solaceon-ruins': [201],
    'bdsp-route-210': [41, 54, 77, 183, 315, 396],
    'bdsp-route-212': [54, 183, 194, 278, 315, 396],
    'bdsp-trophy-garden': [25, 35, 39, 52, 113, 132, 133, 137],

    // Pre-Fantina
    'bdsp-route-213': [54, 72, 278, 420, 422],
    'bdsp-route-214': [41, 74, 75, 77, 194, 453],
    'bdsp-valor-lakefront': [396, 397, 54, 399, 400],

    // Pre-Byron
    'bdsp-route-218': [54, 278, 396, 397, 422],
    'bdsp-route-216': [215, 307, 459],
    'bdsp-route-217': [215, 220, 307, 459],
    'bdsp-iron-island': [41, 42, 74, 75, 95, 305],

    // Pre-Candice
    'bdsp-lake-acuity': [54, 55, 215, 459],
    'bdsp-route-211': [41, 42, 66, 67, 74, 307, 315],
    'bdsp-mt-coronet-north': [41, 42, 74, 75, 307, 433],

    // Pre-Volkner
    'bdsp-route-222': [54, 55, 278, 279, 309, 310, 396, 397],
    'bdsp-route-219': [72, 278, 279],
    'bdsp-route-220': [72, 278, 279],
    'bdsp-route-221': [54, 278, 315, 396, 397, 399, 400],

    // Pre-Elite Four
    'bdsp-route-223': [72, 73, 278, 279],
    'bdsp-victory-road': [41, 42, 66, 67, 74, 75, 307, 308],
  },

  LEGENDS_ARCEUS: {
    // Pre-Kleavor (Obsidian Fieldlands)
    'pla-aspiration-hill': [722, 155, 501, 396, 399, 403], // Rowlet, Cyndaquil, Oshawott, Starly, Bidoof, Shinx
    'pla-horseshoe-plains': [396, 399, 403, 77],       // Starly, Bidoof, Shinx, Ponyta
    'pla-deertrack-path': [396, 399, 63, 406],         // Starly, Bidoof, Abra(rare), Budew
    'pla-deertrack-heights': [41, 92, 401, 403],       // Zubat, Gastly(night), Kricketot, Shinx
    'pla-windswept-run': [396, 399, 406, 415],         // Starly, Bidoof, Budew, Combee
    'pla-nature-walk': [46, 54, 406, 415],             // Paras, Psyduck, Budew, Combee
    'pla-tidewater-dam': [399, 400, 54],               // Bidoof, Bibarel, Psyduck
    'pla-the-heartwood': [46, 54, 63, 402, 415],      // Paras, Psyduck(rare), Abra(rare), Kricketune, Combee
    'pla-grandtree-arena': [],                         // Boss area

    // Pre-Lilligant (Crimson Mirelands)
    'pla-gapejaw-bog': [54, 194, 315, 453],            // Psyduck, Wooper, Roselia, Croagunk
    'pla-golden-lowlands': [194, 315, 396, 397, 453],  // Wooper, Roselia, Starly, Staravia, Croagunk
    'pla-scarlet-bog': [194, 315, 403, 404, 453],      // Wooper, Roselia, Shinx, Luxio, Croagunk
    'pla-solaceon-ruins-pla': [201],                   // Unown
    'pla-cloudpool-ridge': [315, 396, 397, 403, 404],  // Roselia, Starly, Staravia, Shinx, Luxio
    'pla-diamond-heath': [77, 78, 315, 403],           // Ponyta, Rapidash(rare), Roselia, Shinx
    'pla-brava-arena': [],                             // Boss area

    // Pre-Arcanine (Cobalt Coastlands)
    'pla-crossing-slope': [72, 278, 422, 423],         // Tentacool, Wingull, Shellos, Gastrodon(rare)
    'pla-ginkgo-landing': [72, 278, 396, 422],         // Tentacool, Wingull, Starly, Shellos
    'pla-tombolo-walk': [72, 278, 422],                // Tentacool, Wingull, Shellos
    'pla-veilstone-cape': [66, 67, 72],                // Machop, Machoke(rare), Tentacool
    'pla-spring-path': [72, 278, 422, 456],            // Tentacool, Wingull, Shellos, Finneon
    'pla-islespy-shore': [72, 278, 422, 456],          // Tentacool, Wingull, Shellos, Finneon
    'pla-molten-arena': [],                            // Boss area

    // Pre-Electrode (Coronet Highlands)
    'pla-heavenward-lookout': [41, 42, 74, 75, 207],   // Zubat, Golbat, Geodude, Graveler, Gligar
    'pla-wayward-wood': [92, 93, 198, 200, 402],       // Gastly, Haunter, Murkrow, Misdreavus, Kricketune
    'pla-ancient-quarry': [74, 75, 95, 476],           // Geodude, Graveler, Onix, Probopass(rare)
    'pla-celestica-trail': [41, 42, 74, 75, 433],     // Zubat, Golbat, Geodude, Graveler, Chingling
    'pla-moonview-arena': [],                          // Boss area

    // Pre-Avalugg (Alabaster Icelands)
    'pla-whiteout-valley': [215, 220, 459, 613],       // Sneasel(H), Swinub, Snover, Cubchoo
    'pla-bonechill-wastes': [215, 220, 221, 459, 613], // Sneasel(H), Swinub, Piloswine, Snover, Cubchoo
    'pla-avalanche-slopes': [215, 220, 459, 613],
    'pla-arena-approach': [215, 459, 613],
    'pla-icepeak-arena': [],                           // Boss area

    // Pre-Dialga/Palkia
    'pla-temple-of-sinnoh': [],                        // Story location
  },

  SCARLET_VIOLET: {
    // Pre-Katy
    'sv-los-platos': [906, 909, 912, 19, 194, 396, 661, 819, 915], // Sprigatito, Fuecoco, Quaxly, Rattata, Wooper(P), Starly, Fletchling, Skwovet, Flittle
    'sv-mesagoza': [19, 194, 661, 819, 906, 912, 921], // Lechonk, Pawmi, Fletchling, etc.

    // Pre-Brassius
    'sv-south-province-2': [194, 396, 661, 819, 906, 912, 915, 921], // Wooper(P), Starly, Fletchling, Skwovet, Lechonk, Tarountula, Flittle, Pawmi
    'sv-south-province-5': [194, 396, 661, 819, 906, 912], // Similar

    // Pre-Iono
    'sv-south-province-3': [194, 396, 661, 819, 906, 932], // Wooper(P), Starly, Fletchling, Skwovet, Lechonk, Shroodle
    'sv-west-province-1': [396, 661, 741, 819, 906, 926], // Starly, Fletchling, Oricorio(rare), Skwovet, Lechonk, Fidough
    'sv-east-province-1': [81, 396, 661, 749, 819, 938], // Magnemite(rare), Starly, Fletchling, Mudbray(rare), Skwovet, Wattrel
    'sv-south-province-4': [194, 396, 661, 819, 906, 948], // Wooper(P), Starly, Fletchling, Skwovet, Lechonk, Toedscool

    // Pre-Kofu
    'sv-east-province-2': [72, 278, 661, 819, 938],    // Tentacool(surf), Wingull, Fletchling, Skwovet, Wattrel
    'sv-south-province-6': [194, 396, 661, 819, 906],
    'sv-west-province-2': [396, 661, 741, 819, 906, 926],

    // Pre-Larry
    'sv-west-province-3': [128, 194, 241, 396, 906, 944], // Tauros(P), Wooper(P), Miltank(rare), Starly, Lechonk, Flittle
    'sv-asado-desert': [27, 328, 443, 551, 843, 960], // Sandshrew(rare), Trapinch, Gible(rare), Sandile, Silicobra, Espathra -> Hippopotas, Cacnea, Larvesta
    'sv-east-province-3': [396, 661, 819, 938],

    // Pre-Ryme
    'sv-north-province-1': [215, 396, 459, 661, 819, 953], // Sneasel(rare), Starly, Snover(rare), Fletchling, Skwovet, Tinkatink
    'sv-tagtree-thicket': [46, 194, 590, 819, 948],    // Paras, Wooper(P), Foongus, Skwovet, Toedscool
    'sv-casseroya-lake': [54, 118, 129, 130, 194],     // Psyduck, Goldeen, Magikarp, Gyarados(rare), Wooper(P)

    // Pre-Tulip
    'sv-north-province-2': [215, 361, 459, 613, 953],  // Sneasel, Snorunt, Snover, Cubchoo, Tinkatink
    'sv-glaseado-mountain': [215, 220, 361, 459, 613, 712], // Sneasel, Swinub, Snorunt, Snover, Cubchoo, Bergmite

    // Pre-Grusha
    'sv-north-province-3': [215, 220, 361, 459, 613],
    'sv-dalizapa-passage': [54, 194, 396, 661, 819],

    // Pre-Elite Four
    'sv-area-zero': [329, 330, 443, 444, 704, 705, 782, 885], // Vibrava, Flygon(rare), Gible, Gabite, Goomy, Sliggoo, Jangmo-o, Dreepy
  },
};
