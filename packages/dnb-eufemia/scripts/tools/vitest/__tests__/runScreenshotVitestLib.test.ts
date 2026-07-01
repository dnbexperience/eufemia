import { describe, expect, it } from 'vitest'

import {
  prepareScreenshotVitestRun,
  resolveShardArgs,
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

describe('resolveShardArgs', () => {
  it('forwards a valid shard as --shard with --passWithNoTests', () => {
    expect(resolveShardArgs('2/4', [])).toEqual([
      '--shard=2/4',
      '--passWithNoTests',
    ])
  })

  it('trims surrounding whitespace', () => {
    expect(resolveShardArgs('  1/3  ', [])).toEqual([
      '--shard=1/3',
      '--passWithNoTests',
    ])
  })

  it('returns nothing when the total is 1 (single, unsharded run)', () => {
    expect(resolveShardArgs('1/1', [])).toEqual([])
  })

  it('returns nothing when unset or empty', () => {
    expect(resolveShardArgs(undefined, [])).toEqual([])
    expect(resolveShardArgs('', [])).toEqual([])
    expect(resolveShardArgs('   ', [])).toEqual([])
  })

  it('returns nothing for malformed values', () => {
    expect(resolveShardArgs('abc', [])).toEqual([])
    expect(resolveShardArgs('2', [])).toEqual([])
    expect(resolveShardArgs('2/', [])).toEqual([])
    expect(resolveShardArgs('/4', [])).toEqual([])
  })

  it('does not override an explicit --shard already in the args', () => {
    expect(resolveShardArgs('2/4', ['--shard=1/2'])).toEqual([])
    expect(resolveShardArgs('2/4', ['--shard', '1/2'])).toEqual([])
  })

  it('is skipped in watch mode', () => {
    expect(resolveShardArgs('2/4', [], { watch: true })).toEqual([])
  })
})
