import { spawnSync } from 'child_process'

import { resolveScreenshotVitestRun } from './runScreenshotVitestLib.ts'
import {
  EMPTY_SHARD_SENTINEL,
  collectAllScreenshotTestFiles,
  resolveShardIncludeFiles,
} from './screenshotShardingLib.ts'

const rawArgs = process.argv.slice(2)
const watch = rawArgs.includes('--watch')
const args = rawArgs.filter((a) => a !== '--watch')

const { missingFilters, testFiles, vitestArgs } =
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

// Candidate files for this run: the resolved filter matches, or — when
// no filters were supplied (the CI full-suite run) — every screenshot
// test file. This set is what gets balanced across shards.
const candidateFiles =
  testFiles.length > 0 ? testFiles : collectAllScreenshotTestFiles()

const shardFiles = resolveShardIncludeFiles(
  process.env.SCREENSHOT_SHARD,
  candidateFiles,
  { watch }
)

if (shardFiles) {
  // Duration-balanced shard: run only this shard's slice of the suite.
  env.SCREENSHOT_INCLUDE =
    shardFiles.length > 0 ? shardFiles.join(',') : EMPTY_SHARD_SENTINEL
  if (!vitestArgs.includes('--passWithNoTests')) {
    vitestArgs.push('--passWithNoTests')
  }
} else if (testFiles.length > 0) {
  // Unsharded subset run (explicit filters) — restrict to those files.
  env.SCREENSHOT_INCLUDE = testFiles.join(',')
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
    env,
  }
)

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
