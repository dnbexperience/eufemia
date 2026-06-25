# eufemia-css-optimizer

Internal tooling that builds the `@dnb/eufemia` **style manifest** from the
Eufemia source (the shared foundation).

The manifest powers safe removal of unused component CSS. The consumer-facing
helper that turns the manifest into a PurgeCSS safelist ships from the library
itself at `@dnb/eufemia/style/optimizer`; this package only _generates_ the
manifest during the Eufemia build.

## Why this exists

Eufemia's JavaScript is tree-shakeable, but the CSS is not: importing
`@dnb/eufemia/style` ships every component's styles. Naive class-based purging is
unsafe because Eufemia composes modifier classes at runtime, e.g.:

```tsx
className={`dnb-button--${variant}`}
className={`dnb-input--${size}`}
```

The full class string never appears literally in your bundle, so a content scan
would delete those rules and break styling.

The safe unit of removal is therefore the **component block**, not the
individual class: keep every class of a component you use, drop the blocks you
never use. Components also depend on each other's blocks, either by styling them
(e.g. `Autocomplete` styles `Input` and `DrawerList`) or by rendering them
(e.g. `Button` renders `Tooltip` through the `tooltip` prop). This graph is
derived statically from the `dnb-*` class selectors in each component's own
`style/*.scss` files and from the sibling components it renders as JSX.

## What it does not do

- It does not purge `dnb-ui-core` or `ui-theme-basis`. Keep those unpurged.
- It only resolves components whose export name matches their directory name.
  Verify the detected list and add namespaced/compound exports manually.
- Render dependencies are detected from JSX usage of imported sibling
  components. A block reached only through fully dynamic indirection (never
  written as a `<Component>` tag in the source) is not tracked.

## API

```ts
import { generateStyleManifest } from 'eufemia-css-optimizer'
```

### Generate the manifest

```ts
const manifest = generateStyleManifest({
  // Path to the @dnb/eufemia source (or the published package src layout)
  sourceRoot: 'node_modules/@dnb/eufemia/src',
})
```

Each entry contains the BEM `classPrefix` and the transitive `dependencies`.

## Shipped manifest and helper

`@dnb/eufemia` publishes the prebuilt manifest and a consumer helper under its
`style` subpath, so applications never need to install this (internal) package
or read the Eufemia source:

```js
// purgecss.config.js
import { createSafelist } from '@dnb/eufemia/style/optimizer'

export default {
  content: ['src/**/*.{ts,tsx}'],
  css: ['@dnb/eufemia/style/themes/ui/ui-theme-components.min.css'],
  safelist: { greedy: createSafelist({ sources: ['src'] }).greedy },
}
```

`createSafelist` loads the shipped `@dnb/eufemia/style/style-manifest.json`,
auto-detects the components your source imports, expands them with their
transitive dependencies, and returns greedy regexes that keep each block and its
`--modifier` / `__element` classes without matching unrelated blocks that share a
dash-prefix (`dnb-button` will not keep `dnb-button-row`). Pass `components` to
opt out and manage the list yourself. See the "Removing unused CSS" section of
the Eufemia "Importing CSS" guide for the full example.

## CLI

```bash
# Print the manifest for the workspace Eufemia source
yarn generate

# Or target a specific source root and write to a file
yarn generate --source node_modules/@dnb/eufemia/src --out style-manifest.json
```

## Tests

```bash
yarn test
```
