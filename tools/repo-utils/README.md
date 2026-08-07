# Repo Utils

Shared repository helpers used by the Eufemia packages for CI detection and Vitest orchestration.

## How it works

Distributed as a dual package with CommonJS (`node-utils.js`), ESM (`node-utils.mjs`) and type definitions (`node-utils.d.ts`).

Exposed helpers:

- `isCI` – boolean flag that is `true` when running in a CI environment.
- `isCICheck()` – re-evaluates the CI environment and returns the result.
- `splitVitestArgs(args)` – splits raw CLI arguments into `filters` and `vitestArgs`.
- `matchFiltersToFiles(filters, candidateFiles)` – maps each filter to the files it matches.
- `prepareVitestRun(args, matchingFilesByFilter)` – resolves the filters, Vitest args and test files for a run.

## Usage

```ts
import { isCI } from 'repo-utils'
```

Consumed by [`@dnb/eufemia`](../../packages/dnb-eufemia) and the [design system portal](../../packages/dnb-design-system-portal) in their Playwright and Vitest configuration.

## Scripts

- `yarn test:ci` – run the helper tests with Node.
