import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  clampLimit,
  retrieveRecords,
  InvalidQueryError,
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

describe('retrieveRecords id guard', () => {
  beforeEach(() => {
    process.env.GLUE_DATABASE = 'db'
    process.env.GLUE_TABLE = 'records'
    process.env.ATHENA_WORKGROUP = 'wg'
  })

  afterEach(() => {
    delete process.env.GLUE_DATABASE
    delete process.env.GLUE_TABLE
    delete process.env.ATHENA_WORKGROUP
  })

  it('rejects an injection attempt before any query runs', async () => {
    await expect(
      retrieveRecords({ id: "a'; DROP TABLE records;--" })
    ).rejects.toBeInstanceOf(InvalidQueryError)
  })
})
