# Vite Dev Server

Fast development server for the Eufemia documentation portal, replacing Gatsby's webpack-based dev server.

## Quick Start

```bash
yarn start              # Vite dev server (default)
yarn start:gatsby       # Gatsby dev server (legacy)
yarn build              # Production build (prerender all routes)
yarn build:algolia      # Push search index to Algolia
yarn preview            # Preview the production build locally
yarn test:e2e:portal    # Run e2e tests against a Vite preview server
```

## Directory Structure

```
vite/
├── client/
│   ├── index.html          # HTML entry point
│   ├── entry.tsx           # React app entry (providers, routing, layout)
│   ├── plugins/
│   │   ├── portal-pages.ts       # File-system routing (virtual:portal-pages)
│   │   ├── eufemia-theme.ts      # Theme CSS discovery + toggling (virtual:eufemia-theme-styles)
│   │   ├── build-info.ts         # Build info injection (virtual:build-info)
│   │   ├── prefetch-on-hover.ts  # Prefetch route chunks on link hover (virtual:prefetch-on-hover)
│   │   ├── catch-links.ts        # SPA navigation for internal links (virtual:catch-links)
│   │   ├── scroll-position.ts    # Sidebar scroll persistence (virtual:scroll-position)
│   │   ├── test-page-filter.ts   # Page filtering for test builds (IS_VISUAL_TEST, IS_E2E)
│   │   ├── eufemia-prebuild.ts   # Use pre-built @dnb/eufemia in production builds
│   │   └── redirect-index-html.ts# 301 redirect /path/index.html → /path/
│   └── shims/
│       ├── gatsby.tsx       # Shims for gatsby imports (Link, graphql, useStaticQuery, navigate)
│       ├── reach-router.tsx # Maps @gatsbyjs/reach-router to react-router-dom
│       └── theme-handler.ts # Runtime theme switching (replaces gatsby-plugin-eufemia-theme-handler)
├── prod/
│   ├── entry-server.tsx       # SSR entry for prerendering
│   ├── prerender.mjs          # Static site generation script
│   ├── prerender-worker.mjs   # Worker thread for parallel rendering
│   ├── prerender-utils.ts     # Shared helpers (HTML injection, markdown link resolution)
│   ├── push-algolia.mjs       # Algolia search index push
│   └── generate-llm-metadata.ts # LLM metadata generation
├── vite-env.d.ts           # Vite/virtual module type declarations
└── README.md
```

## How It Works

The Vite portal replaces Gatsby's webpack dev server and static site generator with a faster, simpler stack. In development, Vite serves the portal as a single-page app with React Router handling client-side navigation. For production, a custom prerender step crawls every route, renders it to static HTML with Emotion-extracted CSS, and writes the result to disk — producing the same static site output as Gatsby.

Gatsby-specific APIs (Link, useStaticQuery, graphql) are shimmed so the portal source code works without changes.

### Entry Point

`entry.tsx` sets up the same provider stack as Gatsby's `gatsby-browser.tsx`: Emotion cache, Eufemia Provider, IsolatedStyleScope, Theme, MDX provider, and a `PortalLayout` wrapper with scroll position persistence.

### Plugins

**portal-pages** — Scans `src/docs/` for `.mdx` and `.tsx` files, extracts frontmatter, and generates a virtual module (`virtual:portal-pages`) exporting React Router routes and an `allMdxNodes` array that replaces Gatsby's GraphQL layer.

**eufemia-theme** — Discovers Eufemia theme SCSS/CSS files, categorizes them into core (always enabled) and per-theme groups, and exposes a virtual module (`virtual:eufemia-theme-styles`) that imports all styles and provides runtime theme switching via `window.__applyEufemiaThemeStyles__()`.

**redirect-index-html** — Redirects `/path/index.html` requests to `/path/` with a 301, matching Gatsby's clean-URL behavior. Applied to both the dev and preview servers.

**prefetch-on-hover** — Prefetches route chunks when internal links are hovered or focused. When the user moves their pointer over (or tabs to) an internal `<a>` link, the target route's `lazy()` import is triggered so the JS chunk is cached by the browser — subsequent navigation resolves instantly. Equivalent to Gatsby's built-in link prefetching. The runtime code is served via a virtual module (`virtual:prefetch-on-hover`) that exports a `usePrefetchOnHover` React hook.

**catch-links** — Intercepts clicks on internal `<a>` tags and navigates via React Router instead of triggering a full page reload. Equivalent to `gatsby-plugin-catch-links`. The runtime code is served via a virtual module (`virtual:catch-links`) that exports a `useCatchLinks` React hook.

**scroll-position** — Persists and restores scroll positions for sidebar elements across route changes using localStorage. Equivalent to `gatsby-plugin-scroll-position`. Handles iOS Safari's `pagehide` event for back-forward cache compatibility. Served via a virtual module (`virtual:scroll-position`).

**test-page-filter** — Filters portal pages for test builds. When `IS_VISUAL_TEST=1` is set, scans `.screenshot.test.ts` files for `setupPageScreenshot`/`makeScreenshot` URLs. When `IS_E2E=1`, scans `.spec.ts` and `.e2e.spec.ts` files for `page.goto()` URLs. Only matching pages (plus error pages and fallback pages) are kept. Equivalent to Gatsby's `onCreatePage` hook that deletes pages not needed by the build variant.

**eufemia-prebuild** — Detects a pre-built `@dnb/eufemia` package (`build/index.js`) and rewrites all `@dnb/eufemia/src/...` imports to `@dnb/eufemia/build/...` during production builds. This avoids on-the-fly transpilation of the Eufemia source tree, speeding up the build. In dev mode the plugin is a no-op so sources are used directly for fast HMR. Equivalent to Gatsby's `normalModuleReplacement` in `gatsby-node.js`.

**build-info** — Provides portal build information (`releaseVersion`, `buildVersion`, `changelogVersion`) via a virtual module (`virtual:build-info`). On CI, `releaseVersion` is read from `package.json` (set by `build:version`), `changelogVersion` is extracted from the first heading in `EUFEMIA_CHANGELOG.mdx`, and `buildVersion` is generated as the current timestamp. The plugin also intercepts imports of `src/shared/buildInfo.ts`, replacing the static `package.json` fallback with computed values at build time. This replaces the Gatsby approach of mutating `package.json` fields via `scripts/version.js`.

### Shims

The shims replace Gatsby-specific packages so the portal's source code works unchanged:

- `gatsby` → Link (react-router-dom), graphql (string passthrough), useStaticQuery (returns pre-computed MDX data), navigate
- `gatsby-plugin-eufemia-theme-handler` → getTheme, setTheme, useThemeHandler using localStorage + CSS toggling
- `@gatsbyjs/reach-router` → re-exports from react-router-dom

### Improvements

These are features the Vite portal does better or differently than Gatsby:

- **Parallel prerendering** — Worker threads render pages concurrently, significantly reducing build time.
- **First-tab deduplication** — The first tab (e.g. `/info/`) redirects to its parent path, so `/uilib/components/button/` serves the same content that Gatsby served at `/uilib/components/button/info/`. One fewer page to render and index.
- **Clean URL redirects** — `/path/index.html` is 301-redirected to `/path/`, matching Gatsby's built-in behavior without a plugin.
- **Dynamic markdown alternate links** — Resolved from frontmatter at build time instead of hardcoded tab names, so custom tabs work automatically.
- **Theme loading** — Non-default brand themes are lazy-loaded via `<link>` toggling, avoiding a flash of the wrong theme on page load.

### Production Scripts

**prerender.mjs** — Builds the Vite app in SSR mode, collects all route URLs from `virtual:portal-pages`, then renders each page to static HTML using worker threads (`prerender-worker.mjs`). Injects SEO meta tags, Emotion-extracted CSS, color-scheme scripts, markdown alternate links, and fonts. Writes redirect routes as `<meta http-equiv="refresh">` HTML files.

**prerender-utils.ts** — Shared helpers used by the prerender scripts: `injectHtml()` inserts meta tags and styles into rendered HTML; `getMdPath()` resolves markdown alternate link paths from frontmatter.

**push-algolia.mjs** — Scans `src/docs/` for MDX files, extracts headings from the remark AST, and pushes search records to the Algolia index.

**generate-llm-metadata.ts** — Produces `llms.txt` and per-page markdown copies for LLM consumption, run automatically at the end of the prerender step.

### Configuration

The main Vite config lives at `vite.config.ts` in the portal root. It wires together:

- MDX compilation (remark-gfm, frontmatter extraction)
- Babel transforms for react-live (ComponentBox)
- PostCSS isolated style scoping
- SCSS preprocessing
- Module aliases for Gatsby shims
- Import stripping for non-existent Example exports

## Gaps vs Gatsby

### Dev Server

| Feature                                     | Impact     | Notes                                                                             |
| ------------------------------------------- | ---------- | --------------------------------------------------------------------------------- |
| ❌ Image processing (sharp + remark-images) | Low        | MDX images render at full size without responsive sizing or blur-up placeholders. |
| ❌ PWA manifest                             | Negligible | Not served in dev. Not needed during development.                                 |

### Production Build

| Feature                         | Gatsby Plugin                        | Vite Status                                                          |
| ------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| ✅ SSR / Static Site Generation | Built-in                             | Custom prerender step for all routes                                 |
| ✅ Algolia search index push    | `gatsby-plugin-algolia`              | `push-algolia.mjs` script scanning src/docs/ for MDX files           |
| ✅ Headings schema for search   | `createSchemaCustomization`          | remark AST heading extraction in push-algolia.mjs                    |
| ✅ HTML meta redirects          | `gatsby-plugin-meta-redirect`        | `redirect_from` frontmatter → React Router redirect → meta-refresh   |
| ✅ SEO meta tags                | `gatsby-ssr.tsx` + `PortalHead.tsx`  | Per-page title, description, OG tags injected during prerender       |
| ✅ Color scheme scripts         | `html.tsx`                           | Inline `<script>` reading localStorage before first paint            |
| ✅ Fonts                        | `gatsby-node.js` `onPostBuild`       | Copied to `/fonts/` during prerender (CDN for Eufemia consumers)     |
| ✅ Trailing slashes             | Built-in                             | `collectUrls` enforces trailing slashes on all routes                |
| ✅ Emotion SSR extraction       | `gatsby-plugin-emotion`              | Emotion CSS extracted during renderToString, injected into `<head>`  |
| ✅ LLM metadata generation      | `gatsby-plugin-eufemia-llm-metadata` | Auto-generated at end of prerender (llms.txt + markdown copies)      |
| ✅ Build info (version/date)    | `scripts/version.js` + package.json  | `build-info` plugin computes values at build time                    |
| ✅ Test build variants          | `gatsby-node.js` `onCreatePage`      | `test-page-filter` plugin: `IS_VISUAL_TEST`, `IS_E2E` page filtering |
| ✅ Use @dnb/eufemia build       | `gatsby-node.js` resolve aliases     | `eufemia-prebuild` plugin rewrites `/src/` → `/build/` imports       |
| ❌ Browserslist support         | Built-in (via Babel/PostCSS)         | Vite targets modern browsers by default; configure `build.target`    |
| ❌ Image optimization           | `gatsby-plugin-sharp`                | Remark plugin for responsive images                                  |
| ❌ PWA manifest + offline       | `gatsby-plugin-manifest/offline`     | `vite-plugin-pwa` with Workbox                                       |

### Improvements to make

- **Reusable Toc component** — The current `TableOfContents` component (used by `contribute/getting-started`) requires a custom `useStaticQuery` call with a GraphQL glob filter per page. Replace this with a simple `<Toc />` component that can be dropped into any MDX page and automatically renders a table of contents from the page's own headings, without needing a separate query or utility file.
