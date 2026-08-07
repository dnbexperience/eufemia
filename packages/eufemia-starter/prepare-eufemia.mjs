import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const starterRoot = path.dirname(fileURLToPath(import.meta.url))
const eufemiaRoot = path.resolve(starterRoot, '../dnb-eufemia')
const sourceRoot = path.join(eufemiaRoot, 'src')
const generator = path.resolve(
  starterRoot,
  '../../tools/eufemia-css-optimizer/src/cli.ts'
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
