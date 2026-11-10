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
    for (const timestamp of ['nope', '2026', 'March 5', '2026-08-20', 0]) {
      const result = validatePortalViews({ path: '/a', timestamp })

      expect(result.ok).toBe(false)
    }
  })

  it('rejects the whole batch when any event is invalid', () => {
    const result = validatePortalViews([{ path: '/a' }, { path: 'nope' }])

    expect(result.ok).toBe(false)
  })

  const dimensions: Array<{
    field: string
    valid: unknown[]
    unrecognised: unknown[]
  }> = [
    {
      field: 'env',
      valid: ['prod'],
      unrecognised: ['Prod', 'a'.repeat(33), '1prod', 'pr od', 42],
    },
    {
      field: 'locale',
      valid: ['nb-NO', 'en-GB', 'sv-SE', 'da-DK', 'en-US'],
      unrecognised: ['nb', 'NB-no', 'en_GB', 'english', 'de-DE', 42],
    },
    {
      field: 'theme',
      valid: ['ui', 'sbanken', 'eiendom', 'carnegie'],
      unrecognised: [
        'UI',
        'the brand',
        'customer-123',
        'a'.repeat(33),
        42,
      ],
    },
    {
      field: 'color_scheme',
      valid: ['light', 'dark'],
      unrecognised: ['auto', 'Light', 'dark mode', 42],
    },
    {
      field: 'referrer',
      valid: ['search', 'internal', 'direct', 'external'],
      unrecognised: ['https://example.com', 'Search', 'social', 42],
    },
    {
      field: 'via_search',
      valid: ['yes', 'no'],
      unrecognised: ['Yes', 'true', true, 1],
    },
  ]

  it.each(
    dimensions.flatMap(({ field, valid }) =>
      valid.map((value) => [field, value] as const)
    )
  )('accepts the %s %s', (field, value) => {
    expect(validatePortalViews({ path: '/a', [field]: value })).toEqual({
      ok: true,
      value: [{ path: '/a', [field]: value }],
    })
  })

  it.each(
    dimensions.flatMap(({ field, unrecognised }) =>
      unrecognised.map((value) => [field, value] as const)
    )
  )(
    'drops the unrecognised %s %s instead of rejecting',
    (field, value) => {
      expect(validatePortalViews({ path: '/a', [field]: value })).toEqual({
        ok: true,
        value: [{ path: '/a' }],
      })
    }
  )

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

  it('drops any field that is not an allow-listed key', () => {
    const result = validatePortalViews({
      path: '/a',
      id: 'nope',
      sessionId: 'also-nope',
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

  it('defaults every dimension and the timestamp, and adds no other field', () => {
    const record = buildPortalViewRecord({ path: '/a' }, createdAt)

    expect(record).toEqual({
      path: '/a',
      env: 'unknown',
      timestamp: createdAt,
      status: 'ok',
      locale: 'unknown',
      theme: 'unknown',
      color_scheme: 'unknown',
      referrer: 'unknown',
      via_search: 'unknown',
      created_at: createdAt,
    })
  })

  it('keeps every supplied value', () => {
    const supplied = {
      path: '/missing',
      env: 'prod',
      timestamp: '2026-08-20T10:00:00.000Z',
      status: 'not_found',
      locale: 'sv-SE',
      theme: 'sbanken',
      color_scheme: 'dark',
      referrer: 'search',
      via_search: 'yes',
    } as const

    expect(buildPortalViewRecord(supplied, createdAt)).toEqual({
      ...supplied,
      created_at: createdAt,
    })
  })

  it('coerces unrecognised dimensions to "unknown" in the stored record', () => {
    const result = validatePortalViews({
      path: '/a',
      env: 'Prod',
      locale: 'de-DE',
      theme: 'customer-123',
      color_scheme: 'auto',
      referrer: 'social',
      via_search: 'maybe',
    })

    expect(result.ok).toBe(true)
    if (result.ok) {
      const record = buildPortalViewRecord(result.value[0], createdAt)
      expect(record).toMatchObject({
        path: '/a',
        env: 'unknown',
        locale: 'unknown',
        theme: 'unknown',
        color_scheme: 'unknown',
        referrer: 'unknown',
        via_search: 'unknown',
      })
    }
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
