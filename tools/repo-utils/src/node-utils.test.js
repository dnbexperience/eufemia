const assert = require('assert')
const os = require('os')
const path = require('path')
const {
  isCI,
  isolateFirefoxAppData,
  matchFiltersToFiles,
  prepareVitestRun,
  splitVitestArgs,
} = require('./node-utils')

assert.strictEqual(typeof isCI, 'boolean', 'isCI should be a boolean')

// matchFiltersToFiles
assert.deepStrictEqual(
  matchFiltersToFiles(
    ['button', 'missing'],
    [
      'src/components/button/__tests__/Button.test.tsx',
      'src/components/slider/__tests__/Slider.test.tsx',
    ]
  ),
  new Map([
    ['button', ['src/components/button/__tests__/Button.test.tsx']],
    ['missing', []],
  ])
)

// matchFiltersToFiles is case-insensitive
assert.deepStrictEqual(
  matchFiltersToFiles(
    ['Button'],
    ['src/components/button/__tests__/Button.test.tsx']
  ),
  new Map([
    ['Button', ['src/components/button/__tests__/Button.test.tsx']],
  ])
)

assert.deepStrictEqual(splitVitestArgs(['--update=true', 'button']), {
  filters: ['button'],
  vitestArgs: ['--update=true'],
})

// bare --update and -u are normalized to --update=true
assert.deepStrictEqual(splitVitestArgs(['--update', 'button']), {
  filters: ['button'],
  vitestArgs: ['--update=true'],
})

assert.deepStrictEqual(splitVitestArgs(['-u', 'button']), {
  filters: ['button'],
  vitestArgs: ['--update=true'],
})

assert.deepStrictEqual(
  prepareVitestRun(
    ['--update=true', 'button', 'missing'],
    new Map([
      ['button', ['src/components/button/__tests__/Button.test.tsx']],
      ['missing', []],
    ])
  ),
  {
    filters: ['button', 'missing'],
    vitestArgs: ['--update=true'],
    testFiles: ['src/components/button/__tests__/Button.test.tsx'],
    missingFilters: ['missing'],
  }
)

// isolateFirefoxAppData gives Playwright's Firefox its own app-data folder
const platform = Object.getOwnPropertyDescriptor(process, 'platform')
const setPlatform = (value) =>
  Object.defineProperty(process, 'platform', { value })

delete process.env.MOZ_APP_DATA

setPlatform('linux')
isolateFirefoxAppData()
assert.strictEqual(process.env.MOZ_APP_DATA, undefined)

setPlatform('darwin')
isolateFirefoxAppData()
assert.strictEqual(
  process.env.MOZ_APP_DATA,
  path.join(os.tmpdir(), `playwright-firefox-${process.pid}`)
)

// keeps an app-data folder that is already set
process.env.MOZ_APP_DATA = '/custom/firefox-app-data'
isolateFirefoxAppData()
assert.strictEqual(process.env.MOZ_APP_DATA, '/custom/firefox-app-data')

Object.defineProperty(process, 'platform', platform)
