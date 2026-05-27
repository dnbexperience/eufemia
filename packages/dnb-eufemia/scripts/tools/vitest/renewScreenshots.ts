/**
 * Regenerate screenshot snapshots by deleting existing PNGs first,
 * then running vitest to recreate them.
 *
 * Usage:
 *   yarn test:screenshots:renew phone radio
 */

import { execSync } from 'child_process'
import { rmSync } from 'fs'
import globby from 'globby'
import { collectRenewScreenshotMatches } from './renewScreenshotsLib.ts'

const filters = process.argv.slice(2)

if (filters.length === 0) {
  console.log(
    'Usage: yarn test:screenshots:renew <component> [component...]'
  )
  console.log('Example: yarn test:screenshots:renew phone radio')
  process.exit(1)
}

const matches = collectRenewScreenshotMatches(filters)

for (const { snapshotDirs: dirs } of matches) {
  for (const dir of dirs) {
    const pngs = globby.sync(`${dir}/*.png`)

    if (pngs.length > 0) {
      console.log(`Deleting ${pngs.length} snapshot(s) in ${dir}`)

      for (const png of pngs) {
        rmSync(png)
      }
    }
  }
}

const missingFilters = matches
  .filter(
    ({ snapshotDirs, testFiles }) =>
      snapshotDirs.length === 0 && testFiles.length === 0
  )
  .map(({ filter }) => filter)
if (missingFilters.length > 0) {
  console.log(
    `No screenshot test files found for: ${missingFilters.join(', ')}`
  )
}

// Find matching screenshot test files
const testFiles = Array.from(
  new Set(matches.flatMap(({ testFiles }) => testFiles))
)

if (testFiles.length === 0) {
  console.log('No screenshot test files found matching the filters.')
  process.exit(1)
}

console.log(
  `\nRegenerating snapshots for ${testFiles.length} test file(s)...`
)

execSync(
  'yarn vitest run --config vitest.config.screenshots.ts --update',
  {
    stdio: 'inherit',
    env: { ...process.env, SCREENSHOT_INCLUDE: testFiles.join(',') },
  }
)
