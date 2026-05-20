const assert = require('assert')
const {
  isCI,
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
