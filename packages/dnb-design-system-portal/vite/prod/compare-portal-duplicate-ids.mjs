import fs from 'node:fs/promises'
import {
  comparePortalDuplicateIdReports,
  formatPortalDuplicateIdComparison,
  hasPortalDuplicateIdRegression,
} from './portal-duplicate-id-comparison.mjs'

await main()

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const current = JSON.parse(await fs.readFile(args.current, 'utf8'))
  const baseline = await readBaseline(args.baseline)

  if (!baseline) {
    process.stdout.write(
      '# Portal duplicate IDs\n\n' +
        'No deployed duplicate ID report exists yet. This run establishes the first baseline.\n'
    )
    return
  }

  const comparison = comparePortalDuplicateIdReports(baseline, current)
  process.stdout.write(
    formatPortalDuplicateIdComparison(comparison, current)
  )

  if (hasPortalDuplicateIdRegression(comparison)) {
    process.exitCode = 1
  }
}

async function readBaseline(location) {
  if (
    !location.startsWith('http://') &&
    !location.startsWith('https://')
  ) {
    return JSON.parse(await fs.readFile(location, 'utf8'))
  }

  const response = await fetch(location)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(
      `Could not read baseline report: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}

function parseArgs(values) {
  const args = {}

  for (let index = 0; index < values.length; index += 2) {
    args[values[index]?.replace(/^--/, '')] = values[index + 1]
  }

  if (!args.baseline || !args.current) {
    throw new Error(
      'Usage: compare-portal-duplicate-ids.mjs --baseline <file-or-url> --current <file>'
    )
  }

  return args
}
