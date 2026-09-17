import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

// Generate the Eufemia CSS build manifest so the eufemiaCssOptimizer() Vite
// plugin can tree-shake unused component CSS. When the monorepo source or the
// generator is not present (e.g. an isolated install), this no-ops and the
// build falls back to Eufemia's aggregate CSS.
const dashboardRoot = path.dirname(fileURLToPath(import.meta.url))
const eufemiaRoot = path.resolve(
  dashboardRoot,
  '../../../packages/dnb-eufemia'
)
const sourceRoot = path.join(eufemiaRoot, 'src')
const generator = path.resolve(
  dashboardRoot,
  '../../eufemia-css-optimizer/src/cli.ts'
)

if (existsSync(sourceRoot) && existsSync(generator)) {
  const result = spawnSync(
    process.execPath,
    [
      '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
      '--experimental-strip-types',
      generator,
      `--source=${sourceRoot}`,
      `--out=${path.join(eufemiaRoot, 'build/style/style-manifest.json')}`,
    ],
    { stdio: 'inherit' }
  )

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
