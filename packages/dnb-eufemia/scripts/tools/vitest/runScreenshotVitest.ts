import { spawnSync } from 'child_process'

import { resolveScreenshotVitestRun } from './runScreenshotVitestLib.ts'

const rawArgs = process.argv.slice(2)
const watch = rawArgs.includes('--watch')
const args = rawArgs.filter((a) => a !== '--watch')

const { missingFilters, screenshotInclude, vitestArgs } =
  resolveScreenshotVitestRun(args)

if (missingFilters.length > 0) {
  console.log(
    `No screenshot test files found for: ${missingFilters.join(', ')}`
  )
  process.exit(1)
}

const result = spawnSync(
  'yarn',
  [
    'vitest',
    ...(watch ? [] : ['run']),
    '--config',
    'vitest.config.screenshots.ts',
    ...vitestArgs,
  ],
  {
    stdio: 'inherit',
    env: screenshotInclude
      ? { ...process.env, SCREENSHOT_INCLUDE: screenshotInclude }
      : process.env,
  }
)

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
