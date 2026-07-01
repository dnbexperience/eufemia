import { describe, expect, it } from 'vitest'

import { prepareScreenshotVitestRun } from '../runScreenshotVitestLib'

describe('runScreenshotVitestLib', () => {
  it('separates vitest args from screenshot filters', () => {
    const matches = [
      {
        filter: 'phone',
        snapshotDirs: [],
        testFiles: [
          'src/components/phone/__tests__/Phone.screenshot.test.tsx',
        ],
      },
    ]

    expect(
      prepareScreenshotVitestRun(['--update=true', 'phone'], matches)
    ).toEqual({
      filters: ['phone'],
      vitestArgs: ['--update=true'],
      testFiles: [
        'src/components/phone/__tests__/Phone.screenshot.test.tsx',
      ],
      missingFilters: [],
      screenshotInclude:
        'src/components/phone/__tests__/Phone.screenshot.test.tsx',
    })
  })

  it('reports unmatched filters while preserving matched files', () => {
    const matches = [
      {
        filter: 'phone',
        snapshotDirs: [],
        testFiles: [
          'src/components/phone/__tests__/Phone.screenshot.test.tsx',
        ],
      },
      {
        filter: 'radixxx',
        snapshotDirs: [],
        testFiles: [],
      },
    ]

    expect(
      prepareScreenshotVitestRun(['phone', 'radixxx'], matches)
    ).toEqual({
      filters: ['phone', 'radixxx'],
      vitestArgs: [],
      testFiles: [
        'src/components/phone/__tests__/Phone.screenshot.test.tsx',
      ],
      missingFilters: ['radixxx'],
      screenshotInclude:
        'src/components/phone/__tests__/Phone.screenshot.test.tsx',
    })
  })

  it('does not set screenshot include when no filters are provided', () => {
    expect(prepareScreenshotVitestRun(['--update=true'], [])).toEqual({
      filters: [],
      vitestArgs: ['--update=true'],
      testFiles: [],
      missingFilters: [],
      screenshotInclude: undefined,
    })
  })
})
