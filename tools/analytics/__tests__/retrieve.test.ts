import { describe, it, expect } from 'vitest'
import {
  aggregateMcpUsageRaw,
  clampLimit,
} from '../src/lambda/retrieve.js'

describe('clampLimit', () => {
  it('defaults when no limit is given', () => {
    expect(clampLimit(undefined)).toBe(100)
  })

  it('defaults for non-finite values', () => {
    expect(clampLimit(NaN)).toBe(100)
    expect(clampLimit(Infinity)).toBe(100)
  })

  it('clamps to at least 1', () => {
    expect(clampLimit(0)).toBe(1)
    expect(clampLimit(-5)).toBe(1)
  })

  it('clamps to at most 1000', () => {
    expect(clampLimit(5000)).toBe(1000)
  })

  it('truncates fractional values', () => {
    expect(clampLimit(3.9)).toBe(3)
  })

  it('passes through an in-range value', () => {
    expect(clampLimit(42)).toBe(42)
  })
})

describe('aggregateMcpUsageRaw', () => {
  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(aggregateMcpUsageRaw("2026'; DROP")).rejects.toThrow(
      'YYYY-MM-DD'
    )
  })
})
