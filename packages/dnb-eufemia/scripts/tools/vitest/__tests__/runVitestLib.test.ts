import { describe, expect, it } from 'vitest'

import { prepareVitestRun, splitVitestArgs } from '../runVitestLib'

describe('runVitestLib', () => {
  it('separates Vitest args from positional file filters', () => {
    expect(
      splitVitestArgs(['--update=true', 'phone', '--runInBand'])
    ).toEqual({
      filters: ['phone'],
      vitestArgs: ['--update=true', '--runInBand'],
    })
  })

  it('reports unmatched filters while preserving matched files', () => {
    const matchingFilesByFilter = new Map([
      ['phone', ['src/components/phone/__tests__/Phone.test.tsx']],
      ['radixxx', []],
    ])

    expect(
      prepareVitestRun(
        ['--update=true', 'phone', 'radixxx'],
        matchingFilesByFilter
      )
    ).toEqual({
      filters: ['phone', 'radixxx'],
      vitestArgs: ['--update=true'],
      testFiles: ['src/components/phone/__tests__/Phone.test.tsx'],
      missingFilters: ['radixxx'],
    })
  })

  it('deduplicates overlapping matched files', () => {
    const matchingFilesByFilter = new Map([
      ['phone', ['src/components/phone/__tests__/Phone.test.tsx']],
      ['pho', ['src/components/phone/__tests__/Phone.test.tsx']],
    ])

    expect(
      prepareVitestRun(['phone', 'pho'], matchingFilesByFilter)
    ).toEqual({
      filters: ['phone', 'pho'],
      vitestArgs: [],
      testFiles: ['src/components/phone/__tests__/Phone.test.tsx'],
      missingFilters: [],
    })
  })
})
