/**
 * Regenerates the per-file screenshot timing manifest
 * (`screenshotTimings.json`) consumed by the duration-balanced sharding
 * in `screenshotShardingLib.ts`.
 *
 * It runs the full screenshot suite once with Vitest's JSON reporter,
 * reads the per-file wall time (`endTime - startTime`) for every test
 * file, and writes them back as a sorted, package-relative map.
 *
 * Usage (needs the portal served on http://localhost:8000):
 *   yarn workspace dnb-design-system-portal test:screenshots:timings
 *
 * The absolute numbers are runner-specific, but the balancer only needs
 * the *relative* weights, which transfer well across machines. Refresh
 * the manifest whenever the screenshot suite changes meaningfully.
 */

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { SCREENSHOT_TIMINGS_PATH } from './screenshotShardingLib.ts'

type VitestJsonReport = {
  testResults?: Array<{
    name?: string
    startTime?: number
    endTime?: number
  }>
}

const rawReportPath = path.resolve(
  process.cwd(),
  'scripts/tools/vitest/.screenshot-timings.raw.json'
)

const nodeOptions = [process.env.NODE_OPTIONS, '--max-old-space-size=8192']
  .filter(Boolean)
  .join(' ')

// Run the full suite (no include/shard filters) with the JSON reporter.
const env: Record<string, string> = {
  ...process.env,
  NODE_OPTIONS: nodeOptions,
}
delete env.SCREENSHOT_INCLUDE
delete env.SCREENSHOT_SHARD

const result = spawnSync(
  'yarn',
  [
    'vitest',
    'run',
    '--config',
    'vitest.config.screenshots.ts',
    '--reporter=json',
    `--outputFile=${rawReportPath}`,
  ],
  {
    stdio: 'inherit',
    env,
  }
)

if (result.error) {
  throw result.error
}

if (!fs.existsSync(rawReportPath)) {
  console.error(
    `No JSON report produced at ${rawReportPath}. Aborting manifest update.`
  )
  process.exit(result.status ?? 1)
}

const report = JSON.parse(
  fs.readFileSync(rawReportPath, 'utf-8')
) as VitestJsonReport

const durations: Record<string, number> = {}
for (const testFile of report.testResults ?? []) {
  if (!testFile.name) {
    continue
  }
  const relativePath = path.relative(process.cwd(), testFile.name)
  const duration = (testFile.endTime ?? 0) - (testFile.startTime ?? 0)
  if (relativePath && duration > 0) {
    durations[relativePath] = Math.round(duration)
  }
}

if (Object.keys(durations).length === 0) {
  console.error(
    'JSON report contained no per-file durations. Aborting manifest update.'
  )
  fs.rmSync(rawReportPath, { force: true })
  process.exit(result.status ?? 1)
}

const sorted = Object.fromEntries(
  Object.entries(durations).sort(([a], [b]) => a.localeCompare(b))
)

const manifest = {
  $comment:
    'Per-file screenshot wall time in ms. Used by screenshotShardingLib.ts to balance CI shards. Regenerate with: yarn workspace dnb-design-system-portal test:screenshots:timings',
  durations: sorted,
}

fs.writeFileSync(
  SCREENSHOT_TIMINGS_PATH,
  `${JSON.stringify(manifest, null, 2)}\n`
)
fs.rmSync(rawReportPath, { force: true })

console.log(
  `Wrote ${Object.keys(sorted).length} screenshot timings to ${path.relative(
    process.cwd(),
    SCREENSHOT_TIMINGS_PATH
  )}`
)
