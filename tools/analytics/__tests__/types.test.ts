import { describe, it, expect } from 'vitest'
import { validateRecordInput } from '../src/types.js'

describe('validateRecordInput', () => {
  it('accepts a well-formed record', () => {
    const result = validateRecordInput({
      id: 'abc-1',
      name: 'Widget',
      value: 42,
    })

    expect(result).toEqual({
      ok: true,
      value: { id: 'abc-1', name: 'Widget', value: 42 },
    })
  })

  it('rejects a non-object body', () => {
    for (const input of ['string', 42, null, [], true]) {
      const result = validateRecordInput(input)

      expect(result.ok).toBe(false)
    }
  })

  it('requires a non-empty id', () => {
    const result = validateRecordInput({
      id: '  ',
      name: 'Widget',
      value: 1,
    })

    expect(result).toMatchObject({ ok: false })
    if (!result.ok) {
      expect(result.errors).toContain('"id" must be a non-empty string')
    }
  })

  it('rejects an id with illegal characters', () => {
    const result = validateRecordInput({
      id: "a'; DROP TABLE records;--",
      name: 'Widget',
      value: 1,
    })

    expect(result.ok).toBe(false)
  })

  it('rejects an id without any letter or number', () => {
    for (const id of ['.', '..', '-', '_', '._-']) {
      const result = validateRecordInput({ id, name: 'Widget', value: 1 })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects an id longer than 128 characters', () => {
    const result = validateRecordInput({
      id: 'a'.repeat(129),
      name: 'Widget',
      value: 1,
    })

    expect(result.ok).toBe(false)
  })

  it('requires a non-empty name', () => {
    const result = validateRecordInput({ id: 'abc', name: '', value: 1 })

    expect(result.ok).toBe(false)
  })

  it('rejects a name longer than 256 characters', () => {
    const result = validateRecordInput({
      id: 'abc',
      name: 'x'.repeat(257),
      value: 1,
    })

    expect(result.ok).toBe(false)
  })

  it('requires value to be a finite number', () => {
    for (const value of ['1', NaN, Infinity, undefined, null]) {
      const result = validateRecordInput({
        id: 'abc',
        name: 'Widget',
        value,
      })

      expect(result.ok).toBe(false)
    }
  })

  it('collects multiple errors at once', () => {
    const result = validateRecordInput({ id: '', name: '', value: 'nope' })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThanOrEqual(3)
    }
  })
})
