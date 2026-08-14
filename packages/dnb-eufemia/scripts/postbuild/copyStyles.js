/**
 * Copy .css files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import globby from 'globby'

const BUILD_DIR = path.resolve('./build')

if (require.main === module) {
  copyCSSFiles(process.env.OUT_DIR)
}

async function copyCSSFiles(dist) {
  const files = await globby([
    './build/**/*.css',
    '!./build/es/',
    '!./build/esm/',
    '!./build/cjs/',
    '!./build/umd/',
  ])

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/build/', '/'))

    // Copying nests each stylesheet under a module-format dir (cjs/es/esm),
    // deeper than its build/ source, which would break the relative
    // url(../assets/…) references. Rebase them to the destination's own depth
    // so they keep resolving to build/assets instead of pointing outside the package.
    const content = await fs.readFile(src, 'utf-8')
    await fs.outputFile(dest, rebaseAssetUrls(content, dest))
  }
}

export function rebaseAssetUrls(css, destPath) {
  const relativeDir = path.relative(BUILD_DIR, path.dirname(destPath))
  const depth = relativeDir ? relativeDir.split(path.sep).length : 0
  const prefix = '../'.repeat(depth)

  return css.replace(
    /url\(\s*(['"]?)(?:\.\.\/)+assets\//g,
    (_match, quote) => `url(${quote}${prefix}assets/`
  )
}
