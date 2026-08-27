import { describe, it, expect } from 'vitest'
import {
  validatePageViewBatch,
  validateRecordInput,
} from '../src/types.js'

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

describe('validatePageViewBatch', () => {
  it('accepts a single event object', () => {
    const result = validatePageViewBatch({
      path: '/uilib/components/button',
    })

    expect(result).toEqual({
      ok: true,
      value: [{ path: '/uilib/components/button' }],
    })
  })

  it('accepts an array of events with optional timestamps', () => {
    const result = validatePageViewBatch([
      { path: '/a', timestamp: '2026-08-20T10:00:00.000Z' },
      { path: '/b' },
    ])

    expect(result).toEqual({
      ok: true,
      value: [
        { path: '/a', timestamp: '2026-08-20T10:00:00.000Z' },
        { path: '/b' },
      ],
    })
  })

  it('rejects an empty batch', () => {
    const result = validatePageViewBatch([])

    expect(result.ok).toBe(false)
  })

  it('rejects a batch larger than the limit', () => {
    const events = Array.from({ length: 51 }, () => ({ path: '/a' }))
    const result = validatePageViewBatch(events)

    expect(result.ok).toBe(false)
  })

  it('requires a path that starts with "/"', () => {
    for (const path of ['', 'no-slash', 42, null, undefined]) {
      const result = validatePageViewBatch({ path })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects a path longer than 2048 characters', () => {
    const result = validatePageViewBatch({ path: '/' + 'a'.repeat(2048) })

    expect(result.ok).toBe(false)
  })

  it('rejects an invalid timestamp', () => {
    for (const timestamp of ['nope', '2026', 'March 5', '2026-08-20']) {
      const result = validatePageViewBatch({ path: '/a', timestamp })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects the whole batch when any event is invalid', () => {
    const result = validatePageViewBatch([
      { path: '/a' },
      { path: 'nope' },
    ])

    expect(result.ok).toBe(false)
  })

  it('accepts a valid env label', () => {
    const result = validatePageViewBatch({ path: '/a', env: 'prod' })

    expect(result).toEqual({
      ok: true,
      value: [{ path: '/a', env: 'prod' }],
    })
  })

  it('rejects an invalid env label', () => {
    for (const env of ['Prod', 'a'.repeat(33), '1prod', 'pr od', 42]) {
      const result = validatePageViewBatch({ path: '/a', env })

      expect(result.ok).toBe(false)
    }
  })

  it('does not require identifiers or personal data', () => {
    const result = validatePageViewBatch({ path: '/a' })

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value[0]).not.toHaveProperty('id')
    }
  })
})
