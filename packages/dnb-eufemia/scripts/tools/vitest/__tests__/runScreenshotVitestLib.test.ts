import { describe, expect, it } from 'vitest'

import {
  buildThemeTestNamePattern,
  extractThemeArg,
  prepareScreenshotVitestRun,
} from '../runScreenshotVitestLib'

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

describe('extractThemeArg', () => {
  it('pulls a theme=<name> token out of the args', () => {
    expect(
      extractThemeArg(['anchor', 'theme=sbanken', '--update=true'])
    ).toEqual({
      theme: 'sbanken',
      exclude: false,
      rest: ['anchor', '--update=true'],
    })
  })

  it('returns an undefined theme when none is provided', () => {
    expect(extractThemeArg(['anchor', '--update=true'])).toEqual({
      theme: undefined,
      exclude: false,
      rest: ['anchor', '--update=true'],
    })
  })

  it('pulls a theme=-<name> token out of the args as an exclusion', () => {
    expect(extractThemeArg(['theme=-coconut'])).toEqual({
      theme: 'coconut',
      exclude: true,
      rest: [],
    })
  })
})

describe('buildThemeTestNamePattern', () => {
  it('matches the theme at the end of the test name', () => {
    const pattern = new RegExp(buildThemeTestNamePattern('sbanken'))

    expect(pattern.test('Anchor for sbanken')).toBe(true)
  })

  it('matches the theme followed by more words', () => {
    const pattern = new RegExp(buildThemeTestNamePattern('sbanken'))

    expect(pattern.test('FocusOutline for sbanken in dark mode')).toBe(
      true
    )
  })

  it('does not match a longer theme name sharing the same prefix', () => {
    const pattern = new RegExp(buildThemeTestNamePattern('sbanken'))

    expect(pattern.test('Anchor for sbanken-new')).toBe(false)
  })

  it('excludes tests for the given theme when exclude is true', () => {
    const pattern = new RegExp(buildThemeTestNamePattern('coconut', true))

    expect(pattern.test('Anchor for coconut')).toBe(false)
    expect(pattern.test('Anchor for sbanken')).toBe(true)
  })

  it('does not exclude a theme sharing the same prefix', () => {
    const pattern = new RegExp(buildThemeTestNamePattern('coconut', true))

    expect(pattern.test('Anchor for coconut-new')).toBe(true)
  })
})
