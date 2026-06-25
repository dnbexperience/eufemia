# eufemia-starter

✨ Use this Eufemia starter to create and report issues.
🍀 Remember to update related versions.

## Removing unused Eufemia CSS

The normal production build removes unused Eufemia component CSS:

```bash
yarn build
```

The starter includes PurgeCSS as a development dependency and registers
`eufemiaCssOptimizer()` in `vite.config.ts`. The plugin detects imported
Eufemia components, preserves their style dependencies, and optimizes Eufemia's
aggregate component CSS before Vite emits and hashes the asset. Application CSS,
Eufemia core CSS, and theme basis CSS are unchanged. The build reports the
detected components and before/after Eufemia CSS size.

In this monorepo, the starter's `dev`, `build`, and `preview` commands generate
the Eufemia build manifest before Vite starts. The published StackBlitz template
uses the manifest already included in the installed `@dnb/eufemia` package, so
the preparation script no-ops when the monorepo source and private generator are
not present.
