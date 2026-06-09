import { spawnSync } from 'child_process'

import { resolveVitestRun } from './runVitestLib.ts'

type Preset = {
  config?: string
  includeGlobs: string[]
  ignoreGlobs: string[]
}

const presets: Record<string, Preset> = {
  unit: {
    includeGlobs: [
      'src/**/__tests__/**/*.test.{ts,tsx,js,jsx}',
      'src/**/*.test.{ts,tsx,js,jsx}',
    ],
    ignoreGlobs: [
      '**/not_in_use/**',
      '**/*.screenshot.test.{ts,tsx,js,jsx}',
      '**/postTypeGeneration/**',
      '**/scripts/postbuild/**',
      '**/build/**',
      '**/assets/**',
      '**/node_modules/**',
    ],
  },
  scripts: {
    config: 'vitest.config.scripts.ts',
    includeGlobs: ['scripts/**/__tests__/**/*.test.{ts,tsx,js,jsx}'],
    ignoreGlobs: ['**/scripts/postbuild/**', '**/node_modules/**'],
  },
}

const rawArgs = process.argv.slice(2)
const watch = rawArgs.includes('--watch')
const presetFlag = rawArgs.find((a) => a.startsWith('--preset='))
const presetName = presetFlag?.split('=')[1] || 'unit'
const args = rawArgs.filter(
  (a) => a !== '--watch' && !a.startsWith('--preset=')
)

const preset = presets[presetName]
if (!preset) {
  console.log(`Unknown preset: ${presetName}`)
  process.exit(1)
}

const { missingFilters, testFiles, vitestArgs } = resolveVitestRun(
  args,
  preset
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
    ...(preset.config ? ['--config', preset.config] : []),
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
