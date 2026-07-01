import { afterEach, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {
  balanceShardsByWeight,
  computeFallbackWeight,
  loadScreenshotTimings,
  resolveShardIncludeFiles,
} from '../screenshotShardingLib'

const tempFiles: string[] = []

function writeTempTimings(content: string): string {
  const filePath = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), 'ss-timings-')),
    'screenshotTimings.json'
  )
  fs.writeFileSync(filePath, content)
  tempFiles.push(filePath)
  return filePath
}

afterEach(() => {
  while (tempFiles.length > 0) {
    const filePath = tempFiles.pop()
    if (filePath) {
      fs.rmSync(path.dirname(filePath), { recursive: true, force: true })
    }
  }
})

describe('computeFallbackWeight', () => {
  it('defaults to 1 for an empty manifest', () => {
    expect(computeFallbackWeight({})).toBe(1)
  })

  it('returns the median for an odd number of entries', () => {
    expect(computeFallbackWeight({ a: 2, b: 10, c: 4 })).toBe(4)
  })

  it('averages the two middle values for an even number of entries', () => {
    expect(computeFallbackWeight({ a: 2, b: 4, c: 6, d: 100 })).toBe(5)
  })
})

describe('balanceShardsByWeight', () => {
  it('splits files greedily so shard loads stay balanced', () => {
    const shards = balanceShardsByWeight(
      ['a', 'b', 'c', 'd', 'e'],
      2,
      { a: 10, b: 6, c: 5, d: 4, e: 3 },
      1
    )

    expect(shards).toEqual([
      ['a', 'd'],
      ['b', 'c', 'e'],
    ])
  })

  it('uses the fallback weight for files missing from the manifest', () => {
    const shards = balanceShardsByWeight(['a', 'b', 'c'], 2, { a: 10 }, 10)

    expect(shards).toEqual([['a', 'c'], ['b']])
  })

  it('is deterministic regardless of input order', () => {
    const weights = { a: 10, b: 6, c: 5, d: 4, e: 3 }
    const forward = balanceShardsByWeight(
      ['a', 'b', 'c', 'd', 'e'],
      3,
      weights,
      1
    )
    const shuffled = balanceShardsByWeight(
      ['e', 'c', 'a', 'd', 'b'],
      3,
      weights,
      1
    )

    expect(shuffled).toEqual(forward)
  })

  it('returns the requested number of shards, allowing empty ones', () => {
    const shards = balanceShardsByWeight(['a', 'b'], 4, { a: 2, b: 1 }, 1)

    expect(shards).toHaveLength(4)
    expect(shards.flat().sort()).toEqual(['a', 'b'])
    expect(shards.filter((shard) => shard.length === 0)).toHaveLength(2)
  })
})

describe('resolveShardIncludeFiles', () => {
  const candidates = ['a', 'b', 'c', 'd', 'e']

  it('returns null when sharding should not apply', () => {
    expect(resolveShardIncludeFiles(undefined, candidates)).toBeNull()
    expect(resolveShardIncludeFiles('', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('   ', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('abc', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('2', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('2/', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('/4', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('1/1', candidates)).toBeNull()
    expect(
      resolveShardIncludeFiles('2/4', candidates, { watch: true })
    ).toBeNull()
  })

  it('returns null for an out-of-range shard index', () => {
    expect(resolveShardIncludeFiles('0/3', candidates)).toBeNull()
    expect(resolveShardIncludeFiles('4/3', candidates)).toBeNull()
  })

  it('partitions candidates across shards without overlap or loss', () => {
    const timingsPath = writeTempTimings(
      JSON.stringify({
        durations: { a: 10, b: 6, c: 5, d: 4, e: 3 },
      })
    )

    const first = resolveShardIncludeFiles('1/2', candidates, {
      timingsPath,
    })
    const second = resolveShardIncludeFiles('2/2', candidates, {
      timingsPath,
    })

    expect(first).toEqual(['a', 'd'])
    expect(second).toEqual(['b', 'c', 'e'])
    expect([...(first ?? []), ...(second ?? [])].sort()).toEqual(candidates)
  })

  it('falls back to a neutral weight when the manifest is missing', () => {
    const shard = resolveShardIncludeFiles('1/5', candidates, {
      timingsPath: '/tmp/does-not-exist-screenshot-timings.json',
    })

    // With equal fallback weights the split is by count; every candidate
    // still lands in exactly one shard.
    expect(shard).not.toBeNull()
    expect(candidates).toEqual(expect.arrayContaining(shard ?? []))
  })
})

describe('loadScreenshotTimings', () => {
  it('reads the { durations } wrapper form', () => {
    const timingsPath = writeTempTimings(
      JSON.stringify({ $comment: 'x', durations: { a: 12, b: 34 } })
    )
    expect(loadScreenshotTimings(timingsPath)).toEqual({ a: 12, b: 34 })
  })

  it('reads a flat map form', () => {
    const timingsPath = writeTempTimings(JSON.stringify({ a: 1, b: 2 }))
    expect(loadScreenshotTimings(timingsPath)).toEqual({ a: 1, b: 2 })
  })

  it('drops non-positive and non-numeric values', () => {
    const timingsPath = writeTempTimings(
      JSON.stringify({ durations: { a: 5, b: 0, c: -3, d: 'x' } })
    )
    expect(loadScreenshotTimings(timingsPath)).toEqual({ a: 5 })
  })

  it('returns an empty map when the file is missing', () => {
    expect(
      loadScreenshotTimings('/tmp/definitely-missing-timings.json')
    ).toEqual({})
  })
})
