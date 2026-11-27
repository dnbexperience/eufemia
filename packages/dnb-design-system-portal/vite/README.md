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

- `virtual:portal-data` provides the metadata index used by menus, page layouts, and component lists. The browser receives no redirect aliases or global table-of-contents trees.
- `virtual:portal-pages` provides route definitions. Production HTML identifies and preloads its own page module and includes route hints for its rendered links. Hover, focus, and press preload hinted destinations directly, including their styles and module dependencies. Links added later and redirects discover the full registry on demand. React Router adds missing routes without replacing the mounted application. If discovery fails during navigation, the destination loads as a normal document.
- `virtual:portal-page/<slug>` keeps each page addressable as a dynamic entry even when other pages import the same source.
- `virtual:eufemia-theme-styles` loads core theme styles and enables runtime theme switching.
- `virtual:build-info` exposes computed build metadata.
- `virtual:prefetch-on-hover`, `virtual:catch-links`, and `virtual:scroll-position` provide client-side navigation helpers.

## Key Plugins

- `portal-pages` scans `src/docs/` and builds the route and MDX metadata registry.
- `eufemia-theme` discovers theme assets, injects color-scheme bootstrapping scripts, and manages runtime theme loading.
- `test-page-filter` limits production builds to the routes needed for visual and e2e test runs.
- `eufemia-prebuild` rewrites `@dnb/eufemia`, `@dnb/eufemia/src/...`, and public package subpaths to `@dnb/eufemia/build/...` when a prebuilt package is available.
- `build-info` computes `releaseVersion` and `buildVersion` at build time.
- `production-dependencies` fails the client build when it includes a package that `dependencies` do not bring in, so the dependency checks see what the browser gets.

## Production Scripts

- `prerender.mjs` runs the full production build and prerender flow.
- `prerender-utils.ts` contains shared HTML injection and markdown path helpers.
- `push-algolia.mjs` reuses the MCP/llms.txt MDX converter to index each documentation section and its prose. Production indexing verifies anchors against prerendered HTML and atomically replaces records and search settings, preserving synonyms and rules. Use `--dry-run` to inspect source records without publishing.
- `generate-llm-metadata.mts` creates `llms.txt` and markdown copies for documentation entries.

The search panel offers Web, iOS, and Android platform chips, defaulting to Web. Changing the platform reruns the current query. Each section record carries a `platform` facet. Routes under `/web/`, `/ios/`, and `/android/` belong to their platform; all other routes, such as `/collections/icons/`, belong to all three. Algolia applies the selected `platform` filter before ranking and limiting results.

Search indexes each routable MDX source once. Imported tabs with their own route stay under that route, so Button demos link to `/web/components/button/demos/#primary-button`. Fragments and first-tab overviews are inlined into their consuming page. The Portal page composition remains unchanged.

Search excludes drafts, non-routes, and pages marked `search: false`. Crawler rules in `robots.txt` apply independently, so a page such as `/collections/icons/` can remain available in Portal search.

During development, `search-dev` serves the same section records at `/_search?q=...&platform=web` (also `ios` or `android`; defaults to `web`). Its lightweight local ranking lets the Portal preview body-text search without updating Algolia or shipping the corpus to the browser. Production continues to use Algolia for ranking, snippets, and typo tolerance.

When changing the record schema or search settings, update `dev_eufemia_docs` before reviewing branch previews. From the Portal workspace, build the full site with `yarn build`, then run `ALGOLIA_INDEX_NAME=dev_eufemia_docs yarn build:algolia` with `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` configured locally. The write key needs the `editSettings` ACL in addition to the permissions for replacing records and indexes. Verify common queries, section snippets, and each platform filter on the preview. The release workflow updates the production index before deploying the Portal.

## Current Gaps

- Responsive image processing is still not part of the Vite pipeline.
- PWA manifest and offline support are not part of the current build.
- A reusable table-of-contents component would simplify some page-specific MDX utilities.
