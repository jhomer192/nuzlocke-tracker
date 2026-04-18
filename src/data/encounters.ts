/**
 * Encounter tables for Gen I-III games.
 * Maps game -> route key -> array of national dex IDs for Pokemon available at that location.
 * Data sourced from Bulbapedia wild encounter tables (walking/surfing encounters).
 */

export const ENCOUNTER_TABLES: Record<string, Record<string, number[]>> = {
  RED_BLUE: {
    // Pre-Brock
    'route-1': [16, 19],                              // Pidgey, Rattata
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
    'ss-anne': [],                                     // No wild encounters (trainer battles only)

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
    'safari-zone-1': [29, 30, 32, 33, 46, 47, 84, 111, 113, 123], // Nidoran♀/♂, Nidorina/o, Paras, Parasect, Doduo, Rhyhorn, Chansey, Scyther
    'safari-zone-2': [29, 30, 32, 33, 46, 47, 84, 102, 111, 113, 127, 128], // + Exeggcute, Chansey, Pinsir, Tauros
    'safari-zone-3': [29, 32, 43, 48, 69, 102, 111, 113, 115, 127, 128], // Nidoran♀/♂, Oddish, Venonat, Bellsprout, Exeggcute, Rhyhorn, Chansey, Kangaskhan, Pinsir, Tauros
    'safari-zone-center': [29, 30, 32, 33, 46, 47, 84, 102, 111, 113], // Nidoran♀/♂, Nidorina/o, Paras, Parasect, Doduo, Exeggcute, Rhyhorn, Chansey

    // Pre-Sabrina
    'route-16': [16, 17, 19, 20, 84, 132],            // Pidgey, Pidgeotto, Rattata, Raticate, Doduo, Ditto
    'route-17': [16, 17, 19, 20, 84, 132],            // Pidgey, Pidgeotto, Rattata, Raticate, Doduo, Ditto
    'route-18': [16, 17, 19, 20, 84, 132],            // Pidgey, Pidgeotto, Rattata, Raticate, Doduo, Ditto
    'power-plant': [25, 26, 81, 82, 100, 101, 125],   // Pikachu, Raichu, Magnemite, Magneton, Voltorb, Electrode, Electabuzz
    'seafoam-islands-1f': [41, 42, 54, 55, 86, 87, 90, 91], // Zubat, Golbat, Psyduck, Golduck, Seel, Dewgong, Shellder, Cloyster
    'seafoam-islands-b1f': [41, 42, 54, 55, 86, 87, 90, 91], // Zubat, Golbat, Psyduck, Golduck, Seel, Dewgong, Shellder, Cloyster

    // Pre-Blaine
    'route-19': [72, 73, 116, 120],                    // Tentacool, Tentacruel, Horsea, Staryu (surfing)
    'route-20': [72, 73, 116, 120],                    // Tentacool, Tentacruel, Horsea, Staryu (surfing)
    'pokemon-mansion-1f': [19, 20, 37, 58, 77, 88, 109], // Rattata, Raticate, Vulpix, Growlithe, Ponyta, Grimer, Koffing
    'pokemon-mansion-b1f': [19, 20, 37, 58, 77, 88, 109, 126], // + Magmar

    // Pre-Giovanni
    'route-21': [16, 17, 19, 20, 72, 73],             // Pidgey, Pidgeotto, Rattata, Raticate, Tentacool, Tentacruel
    'route-23': [16, 17, 21, 22, 56, 57, 29, 30, 32, 33], // Pidgey, Pidgeotto, Spearow, Fearow, Mankey, Primeape, Nidoran♀/♂, Nidorina/o
    'victory-road-1f': [41, 42, 66, 67, 74, 75, 95],  // Zubat, Golbat, Machop, Machoke, Geodude, Graveler, Onix
    'victory-road-2f': [41, 42, 66, 67, 74, 75, 95],  // Zubat, Golbat, Machop, Machoke, Geodude, Graveler, Onix
    'victory-road-3f': [41, 42, 66, 67, 74, 75, 95],  // Zubat, Golbat, Machop, Machoke, Geodude, Graveler, Onix
  },

  GOLD_SILVER: {
    // Pre-Falkner
    'route-29': [16, 19, 21, 163, 161],               // Pidgey, Rattata, Spearow, Hoothoot (night), Sentret
    'route-30': [10, 16, 19, 43, 69, 163, 161],       // Caterpie, Pidgey, Rattata, Oddish (night), Bellsprout (night), Hoothoot (night), Sentret
    'route-31': [10, 16, 19, 43, 69, 163, 161],       // Caterpie, Pidgey, Rattata, Oddish, Bellsprout, Hoothoot, Sentret
    'dark-cave': [41, 74, 194, 207],                   // Zubat, Geodude, Wooper, Dunsparce
    'sprout-tower': [19, 92],                          // Rattata, Gastly

    // Pre-Bugsy
    'route-32': [16, 19, 41, 69, 179, 187],           // Pidgey, Rattata, Zubat (night), Bellsprout, Mareep, Hoppip
    'ruins-of-alph': [201],                            // Unown
    'union-cave-1f': [41, 74, 95, 194],                // Zubat, Geodude, Onix, Wooper
    'union-cave-b1f': [41, 74, 95, 194],               // Zubat, Geodude, Onix, Wooper
    'route-33': [21, 41, 187, 214],                    // Spearow, Zubat, Hoppip, Heracross (headbutt)
    'ilex-forest': [16, 43, 46, 48, 102, 163],        // Pidgey, Oddish, Paras, Venonat, Exeggcute (headbutt), Hoothoot

    // Pre-Whitney
    'route-34': [16, 19, 132, 96, 63],                // Pidgey, Rattata, Ditto, Drowzee, Abra
    'national-park': [10, 13, 16, 43, 48, 161],       // Caterpie, Weedle, Pidgey, Oddish (night), Venonat (night), Sentret (day)

    // Pre-Morty
    'route-35': [16, 19, 29, 32, 84, 96, 132],        // Pidgey, Rattata, Nidoran♀, Nidoran♂, Doduo, Drowzee, Ditto
    'route-36': [16, 21, 29, 32, 37, 58, 161],        // Pidgey, Spearow (morn), Nidoran♀, Nidoran♂, Vulpix (night), Growlithe (day), Sentret (morn)
    'route-37': [16, 21, 37, 58, 161, 165, 167],      // Pidgey, Spearow, Vulpix, Growlithe, Sentret, Ledyba, Spinarak
    'route-38': [16, 19, 21, 52, 128, 56, 241],       // Pidgey, Rattata, Spearow, Meowth, Tauros, Mankey (morn), Miltank
    'route-39': [16, 19, 52, 128, 56, 241],           // Pidgey, Rattata, Meowth, Tauros, Mankey, Miltank
    'burned-tower': [41, 92, 109],                     // Zubat, Gastly (night), Koffing

    // Pre-Chuck
    'route-40': [72, 116],                             // Tentacool, Horsea (surf)
    'route-41': [72, 73, 116, 117, 226],              // Tentacool, Tentacruel, Horsea (surf), Seadra (surf), Mantine

    // Pre-Jasmine
    'route-42': [41, 56, 66, 178],                    // Zubat, Mankey, Machop (morn), Flaaffy
    'mt-mortar': [41, 42, 66, 67, 74, 75, 234],       // Zubat, Golbat, Machop, Machoke, Geodude, Graveler, Tyrogue
    'route-43': [16, 17, 48, 49, 128, 203],           // Pidgey, Pidgeotto, Venonat, Venomoth, Tauros, Girafarig (morn/day)
    'lake-of-rage': [129, 130],                        // Magikarp, Gyarados (surf)

    // Pre-Pryce
    'route-44': [16, 17, 22, 69, 70, 178],            // Pidgey, Pidgeotto (morn), Fearow, Bellsprout, Weepinbell, Flaaffy (morn)
    'ice-path': [41, 42, 215, 220, 221],              // Zubat, Golbat, Sneasel, Swinub, Piloswine

    // Pre-Clair
    'route-45': [41, 42, 74, 75, 84, 85, 207, 231],  // Zubat (night), Golbat (night), Geodude, Graveler, Doduo (morn), Dodrio, Dunsparce (morn), Phanpy
    'route-46': [16, 41, 74, 207],                    // Pidgey (morn/day), Zubat (night), Geodude, Dunsparce (morn)
    'dragons-den': [129, 147],                         // Magikarp, Dratini (surf)
    'route-26': [16, 17, 19, 20, 43, 44, 84, 85],    // Pidgey, Pidgeotto, Rattata, Raticate, Oddish, Gloom, Doduo, Dodrio
    'route-27': [16, 17, 19, 20, 43, 44, 84, 85],    // Pidgey, Pidgeotto, Rattata, Raticate, Oddish, Gloom, Doduo, Dodrio
    'victory-road-gs': [41, 42, 66, 67, 74, 75, 95], // Zubat, Golbat, Machop, Machoke, Geodude, Graveler, Onix
  },

  RUBY_SAPPHIRE: {
    // Pre-Roxanne
    'route-101': [261, 263, 265],                      // Poochyena, Zigzagoon, Wurmple
    'route-102': [261, 263, 265, 270, 273, 280],       // Poochyena, Zigzagoon, Wurmple, Lotad, Seedot, Ralts
    'route-103': [261, 263, 265, 280],                 // Poochyena, Zigzagoon, Wurmple, Ralts (rare)
    'route-104': [261, 263, 265, 276, 278, 283],       // Poochyena, Zigzagoon, Wurmple, Taillow, Wingull, Surskit (rare)
    'petalburg-woods': [263, 265, 266, 268, 285, 288], // Zigzagoon, Wurmple, Silcoon, Cascoon, Shroomish, Slakoth
    'route-116': [261, 263, 276, 278, 293, 300],       // Poochyena, Zigzagoon, Taillow, Wingull, Whismur, Skitty (rare)
    'rusturf-tunnel': [293],                           // Whismur

    // Pre-Brawly
    'route-106': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'granite-cave': [41, 74, 296, 303, 304],           // Zubat, Geodude, Makuhita, Mawile, Aron
    'route-107': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-108': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-109': [72, 278],                            // Tentacool (surf), Wingull (surf)

    // Pre-Wattson
    'route-110': [261, 263, 278, 309, 311, 312],       // Poochyena, Zigzagoon, Wingull, Electrike, Plusle, Minun
    'route-117': [43, 69, 183, 263, 314, 315],         // Oddish, Bellsprout(S), Marill, Zigzagoon (rare), Illumise, Roselia

    // Pre-Flannery
    'route-111': [27, 74, 328, 331],                   // Sandshrew, Geodude (rock smash), Trapinch, Cacnea
    'route-112': [29, 32, 66, 322],                    // Nidoran♀ (not in RS but Numel area), Numel (322)
    'fiery-path': [66, 88, 109, 218, 322, 324],        // Machop (rare), Grimer, Koffing, Slugma, Numel, Torkoal
    'route-113': [261, 263, 227, 327],                 // Poochyena (rare), Zigzagoon (rare), Skarmory, Spinda
    'route-114': [261, 263, 283, 333, 273],            // Poochyena (rare), Zigzagoon (rare), Surskit, Swablu, Seedot
    'meteor-falls': [41, 42, 337, 338],                // Zubat, Golbat, Lunatone(S), Solrock(R)

    // Pre-Norman
    'route-115': [263, 276, 278, 333],                 // Zigzagoon, Taillow, Wingull, Swablu
    'route-105': [72, 278],                            // Tentacool (surf), Wingull (surf)

    // Pre-Winona
    'route-118': [261, 263, 278, 309, 336],            // Poochyena, Zigzagoon, Wingull, Electrike, Kecleon (rare)
    'route-119': [263, 43, 69, 278, 352],              // Zigzagoon, Oddish, Bellsprout(S), Wingull, Kecleon (invisible)
    'route-120': [261, 263, 43, 183, 352, 359],        // Poochyena, Zigzagoon, Oddish, Marill, Kecleon, Absol
    'route-121': [261, 263, 43, 278, 352],             // Poochyena, Zigzagoon, Oddish, Wingull, Kecleon
    'safari-zone-rs': [43, 44, 84, 111, 84, 127, 177, 203, 214, 234], // Oddish, Gloom, Doduo, Rhyhorn, Natu, Girafarig, Heracross (rare), Pikachu(25), Wobbuffet

    // Pre-Tate & Liza
    'route-122': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'mt-pyre': [37, 41, 307, 353, 355],                // Vulpix, Zubat (inside), Meditite, Shuppet, Duskull
    'route-123': [261, 263, 43, 69, 278],              // Poochyena, Zigzagoon, Oddish, Bellsprout(S), Wingull
    'route-124': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'shoal-cave': [41, 42, 361, 363],                  // Zubat, Golbat, Snorunt, Spheal
    'route-125': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-126': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-127': [72, 278],                            // Tentacool (surf), Wingull (surf)

    // Pre-Wallace
    'route-128': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-129': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-130': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-131': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-132': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-133': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'route-134': [72, 278],                            // Tentacool (surf), Wingull (surf)
    'victory-road-rs': [41, 42, 66, 67, 74, 75, 294, 296, 304, 305], // Zubat, Golbat, Machop (rare), Machoke (rare), Geodude, Graveler, Loudred, Makuhita, Aron, Lairon
  },
};
