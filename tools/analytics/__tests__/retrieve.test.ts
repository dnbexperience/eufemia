import { describe, it, expect } from 'vitest'
import { clampLimit } from '../src/lambda/retrieve.js'

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
