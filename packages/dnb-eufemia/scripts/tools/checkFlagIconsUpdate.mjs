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

// An exact version, such as "7.6.0", as `yarn up flag-icons --exact` writes it
const EXACT_VERSION = /^\d+\.\d+\.\d+$/

function isNewer(version, than) {
  const a = version.split('.').map(Number)
  const b = than.split('.').map(Number)
  const i = a.findIndex((part, index) => part !== b[index])
  return i !== -1 && a[i] > b[i]
}

function withoutFlagIcons(manifest) {
  const json = JSON.parse(manifest)
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

  // flag-icons stays an exact development dependency and only moves up
  const from = JSON.parse(beforeManifest).devDependencies?.['flag-icons']
  const to = JSON.parse(afterManifest).devDependencies?.['flag-icons']
  if (
    !EXACT_VERSION.test(from) ||
    !EXACT_VERSION.test(to) ||
    !isNewer(to, from)
  ) {
    problems.push(
      `${MANIFEST}: flag-icons in devDependencies changes from ${from} to ${to}, not to a newer exact version`
    )
  }
  if (
    withoutFlagIcons(beforeManifest) !== withoutFlagIcons(afterManifest)
  ) {
    problems.push(`${MANIFEST}: changes more than the flag-icons version`)
  }

  const before = readEntries(beforeLock)
  const after = readEntries(afterLock)
  const oldKey = `"flag-icons@npm:${from}":`
  const newKey = `"flag-icons@npm:${to}":`

  // The new entry is the old one with the new version, resolution and checksum
  const expected = (before.get(oldKey) ?? [])
    .filter((line) => !line.startsWith('  checksum: '))
    .map((line) =>
      line === `  version: ${from}`
        ? `  version: ${to}`
        : line === `  resolution: "flag-icons@npm:${from}"`
          ? `  resolution: "flag-icons@npm:${to}"`
          : line
    )
    .join('\n')

  for (const key of new Set([...before.keys(), ...after.keys()])) {
    const oldLines = before.get(key) ?? []
    const newLines = after.get(key) ?? []
    if (oldLines.join('\n') === newLines.join('\n')) {
      continue
    }
    if (key === oldKey && !after.has(key)) {
      continue
    }
    if (key === newKey && !before.has(key)) {
      const actual = newLines.filter(
        (line) => !line.startsWith('  checksum: ')
      )
      if (
        expected !== '' &&
        actual.length === newLines.length - 1 &&
        actual.join('\n') === expected
      ) {
        continue
      }
      problems.push(
        `yarn.lock: ${key.replace(/:$/, '')} is not the flag-icons package on npm at ${to}`
      )
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
      changed.join('\n') ===
        [
          `    flag-icons: "npm:${from}"`,
          `    flag-icons: "npm:${to}"`,
        ].join('\n')
    ) {
      continue
    }

    problems.push(`yarn.lock: ${key.replace(/:$/, '')} changed`)
  }

  if (!after.has(newKey)) {
    problems.push(`yarn.lock: has no entry for flag-icons@npm:${to}`)
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
