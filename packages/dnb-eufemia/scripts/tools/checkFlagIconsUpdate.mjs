/**
 * Check that a country flag sync changes only the flag-icons version in
 * yarn.lock and packages/dnb-eufemia/package.json. The push job of the
 * Country Flags workflow runs it on the commits from the sync job, which runs
 * third-party code, before it pushes them with the automation bot token.
 *
 * It uses Node.js built-ins only, because the push job installs nothing.
 *
 * Usage: node ./scripts/tools/checkFlagIconsUpdate.mjs <base> [head]
 * compares <base> with <head> (HEAD by default) in the current repository.
 */

import { execFileSync } from 'node:child_process'
import { realpathSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const MANIFEST = 'packages/dnb-eufemia/package.json'

// The lockfile entries, keyed by their first line, such as "react@npm:19.0.0":
function readEntries(lock) {
  const entries = new Map()
  for (const block of lock.split(/\n{2,}/)) {
    const [key, ...lines] = block.trim().split('\n')
    if (key && !key.startsWith('#')) {
      entries.set(key, lines)
    }
  }
  return entries
}

function withoutFlagIcons(manifest) {
  const json = JSON.parse(manifest)
  delete json.dependencies?.['flag-icons']
  delete json.devDependencies?.['flag-icons']
  return JSON.stringify(json)
}

export function checkFlagIconsUpdate({
  beforeLock,
  afterLock,
  beforeManifest,
  afterManifest,
}) {
  const problems = []
  const before = readEntries(beforeLock)
  const after = readEntries(afterLock)

  for (const key of new Set([...before.keys(), ...after.keys()])) {
    const oldLines = before.get(key) ?? []
    const newLines = after.get(key) ?? []
    if (oldLines.join('\n') === newLines.join('\n')) {
      continue
    }
    if (key.startsWith('"flag-icons@npm:')) {
      continue
    }

    const changed = [
      ...oldLines.filter((line) => !newLines.includes(line)),
      ...newLines.filter((line) => !oldLines.includes(line)),
    ]
    const isWorkspace = key.startsWith('"@dnb/eufemia@workspace:')
    if (
      isWorkspace &&
      before.has(key) &&
      after.has(key) &&
      changed.every((line) => /^\s+flag-icons: /.test(line))
    ) {
      continue
    }

    problems.push(`yarn.lock: ${key.replace(/:$/, '')} changed`)
  }

  if (
    withoutFlagIcons(beforeManifest) !== withoutFlagIcons(afterManifest)
  ) {
    problems.push(`${MANIFEST}: changes more than the flag-icons version`)
  }

  return problems
}

function main() {
  const [base, head = 'HEAD'] = process.argv.slice(2)
  if (!base) {
    console.error('Usage: checkFlagIconsUpdate.mjs <base> [head]')
    process.exit(2)
  }

  const show = (rev, file) =>
    execFileSync('git', ['show', `${rev}:${file}`], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    })

  const problems = checkFlagIconsUpdate({
    beforeLock: show(base, 'yarn.lock'),
    afterLock: show(head, 'yarn.lock'),
    beforeManifest: show(base, MANIFEST),
    afterManifest: show(head, MANIFEST),
  })

  if (problems.length > 0) {
    console.error('The flag update changes more than flag-icons:')
    for (const problem of problems) {
      console.error(`  - ${problem}`)
    }
    process.exit(1)
  }

  console.log('The flag update changes only the flag-icons version.')
}

const invokedPath = process.argv[1]
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
