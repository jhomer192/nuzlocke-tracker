# Nuzlocke Tracker

A run tracker for Pokémon Nuzlocke challenges: route encounters, the active team, the graveyard, badges, and gym leader prep in one place.

Live at **https://jackhomer.com/nuzlocke-tracker/**

![The routes view of a FireRed run](https://jackhomer.com/screenshots/nuzlocke-tracker.webp)

## What it does

Start a run against any of the 18 mainline game sets, from Red/Blue to Scarlet/Violet, or define a custom fan game with your own locations, bosses, and badge count. Duplicate clause, shiny clause, level cap, and soul link are per-run toggles.

- Routes: log the one encounter you get per location. The catch list comes from that route's wild encounter table, filtered by game version so exclusives from the other version stay out. Encounters can be caught, missed, or dead, and carry a level, a nickname, and a cause of death.
- Team: a six-slot party and a box, with sprites, stats, types, and up to four moves per Pokémon. Marking one dead sends it to the graveyard and out of the party in one step. Runs export to JSON by copy or download.
- Analysis: defensive and offensive type matchups for the current team, computed against the type chart for the run's generation, with types nothing on the team resists called out as gaps.
- Boss prep: the gym leader or major fight for the current badge segment, with each of their Pokémon's level, moves, types, and weaknesses. Mark bosses defeated as you clear them.
- Level cap: when the rule is on, the ace level of the next boss is pinned to the top of the run, keyed to how many badges you have.
- Graveyard and shinies: every loss with its cause, and shiny encounters across all runs.

Runs are stored in the browser. There is no account and no server.

## Running it locally

```sh
npm install
npm run dev
```

`npm run build` type-checks and writes the static site to `dist/`. Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.

## Stack

React 19, TypeScript, Vite, and Tailwind CSS v4. Routing is `react-router-dom` in hash mode, since Pages serves the app from a subpath. State lives in `localStorage`. Sprites, stats, and move data come from [PokéAPI](https://pokeapi.co) and are cached in the browser after the first fetch.

Write-up: https://jackhomer.com/projects/nuzlocke/
