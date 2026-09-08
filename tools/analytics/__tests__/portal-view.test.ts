import { describe, it, expect } from 'vitest'
import {
  validatePortalViews,
  buildPortalViewRecord,
} from '../src/records/portal-view.js'

describe('validatePortalViews', () => {
  it('accepts a single event object', () => {
    const result = validatePortalViews({
      path: '/uilib/components/button',
    })

    expect(result).toEqual({
      ok: true,
      value: [{ path: '/uilib/components/button' }],
    })
  })

  it('accepts an array of events with optional timestamps', () => {
    const result = validatePortalViews([
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
    const result = validatePortalViews([])

    expect(result.ok).toBe(false)
  })

  it('rejects a batch larger than the limit', () => {
    const events = Array.from({ length: 51 }, () => ({ path: '/a' }))
    const result = validatePortalViews(events)

    expect(result.ok).toBe(false)
  })

  it('requires a path that starts with "/"', () => {
    for (const path of ['', 'no-slash', 42, null, undefined]) {
      const result = validatePortalViews({ path })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects a path longer than 2048 characters', () => {
    const result = validatePortalViews({ path: '/' + 'a'.repeat(2048) })

    expect(result.ok).toBe(false)
  })

  it('rejects an invalid timestamp', () => {
    for (const timestamp of ['nope', '2026', 'March 5', '2026-08-20']) {
      const result = validatePortalViews({ path: '/a', timestamp })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects the whole batch when any event is invalid', () => {
    const result = validatePortalViews([{ path: '/a' }, { path: 'nope' }])

    expect(result.ok).toBe(false)
  })

  it('accepts a valid env label', () => {
    const result = validatePortalViews({ path: '/a', env: 'prod' })

    expect(result).toEqual({
      ok: true,
      value: [{ path: '/a', env: 'prod' }],
    })
  })

  it('rejects an invalid env label', () => {
    for (const env of ['Prod', 'a'.repeat(33), '1prod', 'pr od', 42]) {
      const result = validatePortalViews({ path: '/a', env })

      expect(result.ok).toBe(false)
    }
  })

  it('drops any field that is not an allow-listed key', () => {
    const result = validatePortalViews({
      path: '/a',
      id: 'nope',
      referrer: 'https://example.com',
    })

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value[0]).toEqual({ path: '/a' })
    }
  })
})

describe('buildPortalViewRecord', () => {
  const createdAt = '2026-09-07T12:00:00.000Z'

  it('strips the query string and fragment from the path', () => {
    const record = buildPortalViewRecord(
      { path: '/a?q=secret#frag' },
      createdAt
    )

    expect(record.path).toBe('/a')
  })

  it('defaults env to "unknown" and timestamp to the receive time', () => {
    const record = buildPortalViewRecord({ path: '/a' }, createdAt)

    expect(record).toEqual({
      path: '/a',
      env: 'unknown',
      timestamp: createdAt,
      createdat: createdAt,
    })
  })

  it('keeps the supplied env and timestamp', () => {
    const record = buildPortalViewRecord(
      { path: '/a', env: 'prod', timestamp: '2026-08-20T10:00:00.000Z' },
      createdAt
    )

    expect(record).toEqual({
      path: '/a',
      env: 'prod',
      timestamp: '2026-08-20T10:00:00.000Z',
      createdat: createdAt,
    })
  })

  it('never carries identifiers or personal data', () => {
    const record = buildPortalViewRecord({ path: '/a' }, createdAt)

    expect(Object.keys(record).sort()).toEqual([
      'createdat',
      'env',
      'path',
      'timestamp',
    ])
  })
})
