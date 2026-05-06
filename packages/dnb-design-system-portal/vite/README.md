# Vite Portal

Current notes for the Eufemia documentation portal's Vite-based development and build pipeline.

## Quick Start

```bash
yarn start              # Vite dev server
yarn build              # Production prerender build
yarn build:algolia      # Push search index to Algolia
yarn serve              # Preview the production build locally
yarn test:e2e:portal    # Run e2e tests against a preview server
```

## Directory Structure

```bash
vite/
├── client/
│   ├── index.html
│   ├── entry.tsx
│   ├── plugins/
│   │   ├── portal-pages.ts
│   │   ├── eufemia-theme.ts
│   │   ├── build-info.ts
│   │   ├── prefetch-on-hover.ts
│   │   ├── catch-links.ts
│   │   ├── scroll-position.ts
│   │   ├── test-page-filter.ts
│   │   ├── eufemia-prebuild.ts
│   │   └── redirect-index-html.ts
│   └── shims/
│       ├── portal-query.tsx
│       └── theme-handler.ts
├── prod/
│   ├── entry-server.tsx
│   ├── prerender.mjs
│   ├── prerender-worker.mjs
│   ├── prerender-utils.ts
│   ├── push-algolia.mjs
│   └── generate-llm-metadata.mts
├── vite-env.d.ts
└── README.md
```

## Build Flow

In development, Vite serves the portal as a React Router application.

In production, `prerender.mjs` builds the client and server bundles, collects route URLs from `virtual:portal-pages`, prerenders them in worker threads, and writes static HTML into `public/`. The build also generates LLM metadata and copies fonts into the output directory.

## Virtual Modules

- `virtual:portal-pages` provides route definitions and the static `allMdxNodes` data set.
- `virtual:eufemia-theme-styles` loads core theme styles and enables runtime theme switching.
- `virtual:build-info` exposes computed build metadata.
- `virtual:prefetch-on-hover`, `virtual:catch-links`, and `virtual:scroll-position` provide client-side navigation helpers.

## Key Plugins

- `portal-pages` scans `src/docs/` and builds the route and MDX metadata registry.
- `eufemia-theme` discovers theme assets, injects color-scheme bootstrapping scripts, and manages runtime theme loading.
- `test-page-filter` limits production builds to the routes needed for visual and e2e test runs.
- `eufemia-prebuild` rewrites `@dnb/eufemia/src/...` imports to `@dnb/eufemia/build/...` when a prebuilt package is available.
- `build-info` computes `releaseVersion`, `buildVersion`, and `changelogVersion` at build time.

## Production Scripts

- `prerender.mjs` runs the full production build and prerender flow.
- `prerender-utils.ts` contains shared HTML injection and markdown path helpers.
- `push-algolia.mjs` scans MDX files and sends search records to Algolia.
- `generate-llm-metadata.mts` creates `llms.txt` and markdown copies for documentation entries.

## Current Gaps

- Responsive image processing is still not part of the Vite pipeline.
- PWA manifest and offline support are not part of the current build.
- A reusable table-of-contents component would simplify some page-specific MDX utilities.
