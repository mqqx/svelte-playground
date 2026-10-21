# Svelte Playground

A collection of interactive calculators and toy apps built with Svelte 5 and runes syntax (`$state`, `$derived`, `$effect`).

## Demo

https://svelte.hmmr.dev

## Calculators

- **Compound Interest** -- basic compound interest over time
- **Compound Interest with Monthly Contribution** -- compound interest with recurring monthly deposits and tax calculation
- **Compound Annual Growth Rate** -- CAGR between a start and end price
- **Gross Net Wage** -- German income tax calculator with tax categories
- **Random Green Grid** -- configurable grid of random numbers with green color mapping
- **Counter** -- simple counter
- **Sudoku** -- generated puzzles with a unique solution, three difficulty levels, conflict highlighting and keyboard input

## Features

- Locale-aware currency formatting via `Intl.NumberFormat` (symbol placement, decimals, grouping)
- Currency picker with 28 currencies, auto-detected from browser locale
- Shared state across calculators (seed capital, interest rate, years persist when switching views)
- Data-driven navigation via a calculator registry -- add a component and a registry entry to create a new calculator

## Tech Stack

- [Svelte 5](https://svelte.dev/) with runes syntax
- [Vite 8](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)
- TypeScript
- Docker (nginx) behind Traefik on our VPS, released from a local machine with `DEPLOY_HOST=root@<vps ip> ops/release.sh X.Y.Z` -- see [docs/deployment.md](docs/deployment.md)

## Getting Started

Requires Node 22.12 or newer.

```sh
npm install
npm run dev
```

## Scripts

| Command           | Description                        |
|:------------------|:-----------------------------------|
| `npm run dev`     | Start dev server                   |
| `npm run build`   | Production build                   |
| `npm run preview` | Preview production build           |
| `npm run check`   | Run svelte-check for type errors   |
| `npm run test`    | Run tests                          |

## License

MIT
