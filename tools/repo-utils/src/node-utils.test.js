const assert = require('assert')
const fs = require('fs')
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
const firefoxApp = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-utils-'))
const firefoxResources = path.join(firefoxApp, 'Contents/Resources')
const firefoxExecutable = path.join(firefoxApp, 'Contents/MacOS/firefox')
const browserAppIni = path.join(
  firefoxResources,
  'browser/application.ini'
)
const platform = Object.getOwnPropertyDescriptor(process, 'platform')
const setPlatform = (value) =>
  Object.defineProperty(process, 'platform', { value })

fs.mkdirSync(path.join(firefoxResources, 'browser'), { recursive: true })
fs.writeFileSync(
  path.join(firefoxResources, 'application.ini'),
  '[App]\nName=Firefox\n'
)
delete process.env.XUL_APP_FILE

setPlatform('linux')
isolateFirefoxAppData(firefoxExecutable)
assert.strictEqual(process.env.XUL_APP_FILE, undefined)

// does nothing when Firefox is not installed
setPlatform('darwin')
isolateFirefoxAppData(path.join(firefoxApp, 'missing/MacOS/firefox'))
assert.strictEqual(process.env.XUL_APP_FILE, undefined)

isolateFirefoxAppData(firefoxExecutable)
assert.strictEqual(process.env.XUL_APP_FILE, browserAppIni)
assert.strictEqual(
  fs.readFileSync(browserAppIni, 'utf-8'),
  '[App]\nProfile=PlaywrightFirefox\nName=Firefox\n'
)

// refreshes an outdated copy
fs.writeFileSync(browserAppIni, '[App]\nName=Outdated\n')
delete process.env.XUL_APP_FILE
isolateFirefoxAppData(firefoxExecutable)
assert.strictEqual(
  fs.readFileSync(browserAppIni, 'utf-8'),
  '[App]\nProfile=PlaywrightFirefox\nName=Firefox\n'
)

// keeps an XUL_APP_FILE that is already set
process.env.XUL_APP_FILE = '/custom/application.ini'
isolateFirefoxAppData(firefoxExecutable)
assert.strictEqual(process.env.XUL_APP_FILE, '/custom/application.ini')

Object.defineProperty(process, 'platform', platform)
fs.rmSync(firefoxApp, { recursive: true })
