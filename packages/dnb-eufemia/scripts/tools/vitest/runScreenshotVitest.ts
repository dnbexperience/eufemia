import { spawnSync } from 'child_process'

import {
  resolveScreenshotVitestRun,
  resolveShardArgs,
} from './runScreenshotVitestLib.ts'

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

// Increase the V8 heap limit for the vitest process and its forked
// workers. Long screenshot runs (1000+ tests) accumulate Playwright
// CDP state and decoded PNG pixel buffers faster than GC can reclaim,
// hitting the default ~4 GB limit.
const nodeOptions = [process.env.NODE_OPTIONS, '--max-old-space-size=8192']
  .filter(Boolean)
  .join(' ')

const env: Record<string, string> = {
  ...process.env,
  NODE_OPTIONS: nodeOptions,
} as Record<string, string>

if (screenshotInclude) {
  env.SCREENSHOT_INCLUDE = screenshotInclude
}

const shardArgs = resolveShardArgs(
  process.env.SCREENSHOT_SHARD,
  vitestArgs,
  {
    watch,
  }
)

const result = spawnSync(
  'yarn',
  [
    'vitest',
    ...(watch ? [] : ['run']),
    '--config',
    'vitest.config.screenshots.ts',
    ...vitestArgs,
    ...shardArgs,
  ],
  {
    stdio: 'inherit',
    env,
  }
)

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
