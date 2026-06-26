/**
 * Remove unused Eufemia component CSS from the production build.
 *
 * Runs after `vite build`: it builds a safe PurgeCSS safelist with
 * `createSafelist` (which expands every component you import to the blocks it
 * styles and renders) and feeds it to PurgeCSS, so only the component CSS this
 * app actually uses survives.
 *
 * The style manifest is produced when `@dnb/eufemia` is built
 * (`yarn build:style-manifest`) and shipped inside the package. Resolution is
 * therefore environment-aware, so the same script works in two places:
 *
 * - A published app / StackBlitz consumes the built `@dnb/eufemia`, which ships
 *   `style/optimizer.js` and `style/style-manifest.json`. We import the helper
 *   from there and let `createSafelist` auto-load the shipped manifest – exactly
 *   how a real app consumes it (no build-time generation needed).
 * - This monorepo has nothing built under `@dnb/eufemia/style/*`, so we fall
 *   back to the source helper (`@dnb/eufemia/src/style/optimizer.ts`) and
 *   generate the manifest from `@dnb/eufemia/src` with the workspace-only
 *   `eufemia-css-optimizer` tool.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PurgeCSS } from 'purgecss'
import type {
  CreateSafelistOptions,
  Safelist,
  StyleManifest,
} from '@dnb/eufemia/src/style/optimizer.ts'

type Optimizer = {
  createSafelist: (options?: CreateSafelistOptions) => Safelist
  protectWhereSelectors: (css: string, safelist: RegExp[]) => string
}

const here = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(here, '..')
const distDir = path.join(projectRoot, 'dist')
const assetsDir = path.join(distDir, 'assets')

const { createSafelist, protectWhereSelectors, manifest } =
  await resolveOptimizer()

const { greedy, components } = createSafelist({
  manifest,
  sources: ['src'],
})

// Shield the `:where(:not(…))` rules PurgeCSS cannot keep on its own (for
// example the anchor styles) before purging.
for (const name of readdirSync(assetsDir)) {
  if (!name.endsWith('.css')) {
    continue
  }

  const file = path.join(assetsDir, name)
  const css = readFileSync(file, 'utf-8')
  const guarded = protectWhereSelectors(css, greedy)

  if (guarded !== css) {
    writeFileSync(file, guarded)
  }
}

const result = await new PurgeCSS().purge({
  content: [
    path.join(distDir, 'index.html'),
    path.join(distDir, 'assets/*.js'),
  ],
  css: [path.join(distDir, 'assets/*.css')],
  safelist: { greedy },
})

let bytesBefore = 0
let bytesAfter = 0

for (const file of result) {
  if (!file.file) {
    continue
  }

  bytesBefore += Buffer.byteLength(readFileSync(file.file, 'utf-8'))
  bytesAfter += Buffer.byteLength(file.css)

  writeFileSync(file.file, file.css)
}

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} kB`
const saved = bytesBefore - bytesAfter
const percent = bytesBefore > 0 ? (saved / bytesBefore) * 100 : 0

console.log('\nEufemia CSS optimizer')
console.log(`  Detected components: ${components.join(', ') || '(none)'}`)
console.log(
  `  CSS: ${kb(bytesBefore)} -> ${kb(bytesAfter)} ` +
    `(removed ${kb(saved)}, ${percent.toFixed(1)}%)\n`
)

/**
 * Load the optimizer helper and (when needed) the style manifest from whichever
 * `@dnb/eufemia` is available – the built package on StackBlitz, or the
 * workspace source inside this monorepo.
 */
async function resolveOptimizer(): Promise<
  Optimizer & { manifest?: StyleManifest }
> {
  try {
    // Published package (StackBlitz consumes the built `@dnb/eufemia`): the
    // helper and the manifest ship under `@dnb/eufemia/style/*`. A non-literal
    // specifier keeps TypeScript from resolving the built path in this monorepo,
    // where it does not exist. `createSafelist` auto-loads the shipped manifest.
    const builtSpecifier = '@dnb/eufemia/style/optimizer.js'
    const optimizer = (await import(
      builtSpecifier
    )) as unknown as Optimizer

    return {
      createSafelist: optimizer.createSafelist,
      protectWhereSelectors: optimizer.protectWhereSelectors,
    }
  } catch {
    // Monorepo: nothing is built under `@dnb/eufemia/style/*`, so run against
    // the workspace source and generate the manifest with the workspace-only
    // `eufemia-css-optimizer` tool.
    const optimizer = await import('@dnb/eufemia/src/style/optimizer.ts')
    const { generateStyleManifest } = await import('eufemia-css-optimizer')
    const eufemiaSourceRoot = path.resolve(
      projectRoot,
      '../dnb-eufemia/src'
    )

    return {
      createSafelist: optimizer.createSafelist,
      protectWhereSelectors: optimizer.protectWhereSelectors,
      manifest: generateStyleManifest({ sourceRoot: eufemiaSourceRoot }),
    }
  }
}
