import { describe, it, expect } from 'vitest'
import {
  validatePortalViews,
  buildPortalViewRecord,
  normalizeTrackedPath,
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

  it('accepts a valid status', () => {
    for (const status of ['ok', 'not_found', 'error']) {
      const result = validatePortalViews({ path: '/a', status })

      expect(result).toEqual({
        ok: true,
        value: [{ path: '/a', status }],
      })
    }
  })

  it('rejects an invalid status', () => {
    for (const status of ['OK', '404', 'notfound', 'redirect', 42]) {
      const result = validatePortalViews({ path: '/a', status })

      expect(result.ok).toBe(false)
    }
  })

  it('accepts a valid locale', () => {
    for (const locale of ['nb-NO', 'en-GB', 'sv-SE', 'da-DK', 'en-US']) {
      const result = validatePortalViews({ path: '/a', locale })

      expect(result).toEqual({
        ok: true,
        value: [{ path: '/a', locale }],
      })
    }
  })

  it('rejects an invalid locale', () => {
    for (const locale of ['nb', 'NB-no', 'en_GB', 'english', 42]) {
      const result = validatePortalViews({ path: '/a', locale })

      expect(result.ok).toBe(false)
    }
  })

  it('accepts a valid theme', () => {
    for (const theme of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
      const result = validatePortalViews({ path: '/a', theme })

      expect(result).toEqual({
        ok: true,
        value: [{ path: '/a', theme }],
      })
    }
  })

  it('rejects an invalid theme', () => {
    for (const theme of ['UI', 'the brand', 'a'.repeat(33), 42]) {
      const result = validatePortalViews({ path: '/a', theme })

      expect(result.ok).toBe(false)
    }
  })

  it('accepts a valid colorScheme', () => {
    for (const colorScheme of ['light', 'dark']) {
      const result = validatePortalViews({ path: '/a', colorScheme })

      expect(result).toEqual({
        ok: true,
        value: [{ path: '/a', colorScheme }],
      })
    }
  })

  it('rejects an invalid colorScheme', () => {
    for (const colorScheme of ['auto', 'Light', 'dark mode', 42]) {
      const result = validatePortalViews({ path: '/a', colorScheme })

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

  it('minimises the path when building the record', () => {
    const record = buildPortalViewRecord(
      { path: '/a?q=secret&fullscreen#example' },
      createdAt
    )

    expect(record.path).toBe('/a?fullscreen#example')
  })

  it('defaults env to "unknown" and timestamp to the receive time', () => {
    const record = buildPortalViewRecord({ path: '/a' }, createdAt)

    expect(record).toEqual({
      path: '/a',
      env: 'unknown',
      timestamp: createdAt,
      status: 'ok',
      locale: 'unknown',
      theme: 'unknown',
      colorScheme: 'unknown',
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
      status: 'ok',
      locale: 'unknown',
      theme: 'unknown',
      colorScheme: 'unknown',
      createdat: createdAt,
    })
  })

  it('defaults status to "ok" and keeps a supplied status', () => {
    expect(buildPortalViewRecord({ path: '/a' }, createdAt).status).toBe(
      'ok'
    )

    expect(
      buildPortalViewRecord(
        { path: '/missing', status: 'not_found' },
        createdAt
      ).status
    ).toBe('not_found')
  })

  it('defaults locale and theme to "unknown" and keeps supplied values', () => {
    expect(buildPortalViewRecord({ path: '/a' }, createdAt)).toMatchObject(
      { locale: 'unknown', theme: 'unknown' }
    )

    expect(
      buildPortalViewRecord(
        { path: '/a', locale: 'sv-SE', theme: 'sbanken' },
        createdAt
      )
    ).toMatchObject({ locale: 'sv-SE', theme: 'sbanken' })
  })

  it('defaults colorScheme to "unknown" and keeps a supplied value', () => {
    expect(
      buildPortalViewRecord({ path: '/a' }, createdAt).colorScheme
    ).toBe('unknown')

    expect(
      buildPortalViewRecord({ path: '/a', colorScheme: 'dark' }, createdAt)
        .colorScheme
    ).toBe('dark')
  })

  it('never carries identifiers or personal data', () => {
    const record = buildPortalViewRecord({ path: '/a' }, createdAt)

    expect(Object.keys(record).sort()).toEqual([
      'colorScheme',
      'createdat',
      'env',
      'locale',
      'path',
      'status',
      'theme',
      'timestamp',
    ])
  })
})

describe('normalizeTrackedPath', () => {
  it('keeps the pathname and an anchor fragment', () => {
    expect(normalizeTrackedPath('/uilib/components/button#events')).toBe(
      '/uilib/components/button#events'
    )
  })

  it('keeps allow-listed render params', () => {
    expect(normalizeTrackedPath('/a?fullscreen')).toBe('/a?fullscreen')
    expect(normalizeTrackedPath('/?eufemia-theme=sbanken')).toBe(
      '/?eufemia-theme=sbanken'
    )
  })

  it('drops query params that are not allow-listed', () => {
    expect(normalizeTrackedPath('/uilib?q=some+search+term')).toBe(
      '/uilib'
    )
  })

  it('reduces a flag to its key, dropping any crafted value', () => {
    expect(normalizeTrackedPath('/a?fullscreen=personal+data')).toBe(
      '/a?fullscreen'
    )
    expect(normalizeTrackedPath('/a?focusmode=my-block')).toBe(
      '/a?focusmode'
    )
  })

  it('drops a value param whose value is not a safe token', () => {
    expect(normalizeTrackedPath('/?eufemia-theme=personal+data')).toBe('/')
  })

  it('does not match a param that merely ends with an allow-listed key', () => {
    expect(normalizeTrackedPath('/?x-eufemia-theme=sbanken')).toBe('/')
  })

  it('emits allow-listed params in canonical order', () => {
    expect(normalizeTrackedPath('/a?fullscreen&eufemia-theme=ui')).toBe(
      '/a?eufemia-theme=ui&fullscreen'
    )
    expect(normalizeTrackedPath('/a?eufemia-theme=ui&fullscreen')).toBe(
      '/a?eufemia-theme=ui&fullscreen'
    )
  })

  it('drops a fragment that is not anchor-shaped', () => {
    expect(normalizeTrackedPath('/a#not a slug')).toBe('/a')
  })
})
