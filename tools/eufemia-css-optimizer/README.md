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
  sourceRoot: 'packages/dnb-eufemia/src',
})
```

The manifest is generated during `@dnb/eufemia` package preparation at
`packages/dnb-eufemia/build/style/style-manifest.json`. It is a build artifact,
not committed source, and ships in the published package at
`style/style-manifest.json` beside the optimizer. Generator tests verify that a
fresh generation is deterministic and that all derived dependencies reference
real manifest entries.

Each entry contains the BEM `classPrefix` and the transitive `dependencies`.

## Shipped manifest and integrations

`@dnb/eufemia` publishes the prebuilt manifest and consumer integrations under
its `style` subpath. Applications never need to install this internal package or
read Eufemia source.

Vite applications should use the first-class plugin:

```ts
import { eufemiaCssOptimizer } from '@dnb/eufemia/style/vite-plugin.js'

export default defineConfig({
  plugins: [react(), eufemiaCssOptimizer()],
})
```

For non-Vite builds, use both lower-level helpers. `protectWhereSelectors` is
required because a safelist alone cannot preserve Eufemia's nested
`:where(:not(…))` and `:is(:not(…))` rules:

```js
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { PurgeCSS } from 'purgecss'
import {
  createSafelist,
  protectWhereSelectors,
} from '@dnb/eufemia/style/optimizer.js'

const require = createRequire(import.meta.url)
const { greedy } = createSafelist({ sources: ['src'] })
const cssPath =
  require.resolve('@dnb/eufemia/style/themes/ui/ui-theme-components.min.css')
const eufemiaCss = await readFile(cssPath, 'utf8')

const [result] = await new PurgeCSS().purge({
  content: ['src/**/*.{ts,tsx}'],
  css: [{ raw: protectWhereSelectors(eufemiaCss, greedy) }],
  safelist: { greedy },
})
```

`createSafelist` loads the shipped `@dnb/eufemia/style/style-manifest.json`,
auto-detects the components your source imports, expands them with their
transitive dependencies, and returns greedy regexes that keep each block and its
`--modifier` / `__element` classes without matching unrelated blocks that share a
dash-prefix (`dnb-button` will not keep `dnb-button-row`). Pass `components` to
opt out and manage the list yourself. See the "Removing unused CSS" section of
the Eufemia "Importing CSS" guide for the public API.

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
