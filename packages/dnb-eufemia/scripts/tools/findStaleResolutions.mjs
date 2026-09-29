/**
 * Find root `resolutions` entries that no longer affect the dependency tree.
 *
 * A resolution scoped to a range (`name@npm:^1.0.0`) is stale when no package
 * in yarn.lock requests that exact range any more; an unscoped one (`name`) is
 * stale when the package is not installed at all. Stale entries look like
 * security pins but protect nothing, and they hide that the ranges that are
 * actually requested may resolve to unpatched versions.
 *
 * Usage: node ./scripts/tools/findStaleResolutions.mjs
 */

import { readFileSync, realpathSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const REPO_ROOT = path.resolve(import.meta.dirname, '../../../..')

export function findStaleResolutions({ resolutions, lockfile }) {
  const requested = new Set()
  for (const [, name, range] of lockfile.matchAll(
    /^ {4}"?(@?[^":\s]+)"?: "npm:([^"]+)"$/gm
  )) {
    requested.add(`${name}@npm:${range}`)
  }

  const installed = new Set()
  for (const [, name] of lockfile.matchAll(
    /^ {2}resolution: "(@?[^@"]+)@npm:/gm
  )) {
    installed.add(name)
  }

  return Object.keys(resolutions).filter((key) => {
    const scoped = /^(@?[^@]+)@(?:npm:)?(.+)$/.exec(key)
    if (scoped) {
      return !requested.has(`${scoped[1]}@npm:${scoped[2]}`)
    }
    return !installed.has(key)
  })
}

function main() {
  const { resolutions = {} } = JSON.parse(
    readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')
  )
  const lockfile = readFileSync(path.join(REPO_ROOT, 'yarn.lock'), 'utf8')
  const stale = findStaleResolutions({ resolutions, lockfile })

  if (stale.length > 0) {
    console.error(
      `\n${stale.length} root resolution(s) no longer match anything in yarn.lock. Remove them, or re-target them at the ranges that are actually requested:`
    )
    for (const key of stale) {
      console.error(`  - ${key}`)
    }
    process.exit(1)
  }

  console.log(
    `All ${Object.keys(resolutions).length} root resolutions match the dependency tree.`
  )
}

const invokedPath = process.argv[1]
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
