import { spawnSync } from 'child_process'
import { globbySync } from 'globby'
import {
  matchFiltersToFiles,
  prepareVitestRun,
  splitVitestArgs,
} from 'repo-utils'

const includeGlobs = [
  'vite/__tests__/**/*.test.{ts,tsx}',
  'src/**/__tests__/**/*.test.{ts,tsx}',
]
const config = 'vite/vitest.config.ts'

const rawArgs = process.argv.slice(2)
const watch = rawArgs.includes('--watch')
const args = rawArgs.filter((a) => a !== '--watch')
const { filters } = splitVitestArgs(args)

const candidateFiles = Array.from(
  new Set(
    includeGlobs.flatMap((pattern) =>
      globbySync(pattern, { caseSensitiveMatch: false })
    )
  )
).sort()

const { missingFilters, testFiles, vitestArgs } = prepareVitestRun(
  args,
  matchFiltersToFiles(filters, candidateFiles)
)

if (missingFilters.length > 0) {
  console.log(`No test files found for: ${missingFilters.join(', ')}`)
  process.exit(1)
}

const result = spawnSync(
  'yarn',
  [
    'vitest',
    ...(watch ? [] : ['run']),
    '--config',
    config,
    ...vitestArgs,
    ...testFiles,
  ],
  {
    stdio: 'inherit',
    env: process.env,
  }
)

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
