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

const filters = process.argv.slice(2)

if (filters.length === 0) {
  console.log(
    'Usage: yarn test:screenshots:renew <component> [component...]'
  )
  console.log('Example: yarn test:screenshots:renew phone radio')
  process.exit(1)
}

for (const filter of filters) {
  const dirs = globby.sync(
    `src/**/*${filter}*/__tests__/__image_snapshots__`,
    {
      onlyDirectories: true,
      caseSensitiveMatch: false,
    }
  )

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

// Find matching screenshot test files
const testFiles = filters.flatMap((filter) =>
  globby.sync(`src/**/*${filter}*/**/*.screenshot.test.{ts,tsx}`, {
    caseSensitiveMatch: false,
  })
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
