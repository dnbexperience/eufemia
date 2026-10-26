import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  dataErrorMessage,
  loadDashboardData,
  portalViewTrendsView,
  rank,
  snapshotMeta,
  type DashboardPayload,
} from '../data'
import { beginAuthRetry } from '../auth'
import type { Session } from '../auth'

describe('snapshotMeta', () => {
  const payload: DashboardPayload = { generatedAt: '2026-09-16T10:00:00Z' }

  it('reports no data with the snapshot time when count is 0', () => {
    expect(snapshotMeta(payload, 0)).toContain(
      'No data yet (snapshot generated'
    )
    expect(snapshotMeta(null, 0)).toBe('No data yet.')
  })

  it('reports the snapshot time when there is data', () => {
    expect(snapshotMeta(payload, 5)).toContain('Snapshot generated')
    expect(snapshotMeta(null, 5)).toBe('')
  })
})

describe('dataErrorMessage', () => {
  it('gives softer copy for a 503', () => {
    expect(dataErrorMessage(503)).toContain('being prepared')
  })

  it('includes the status for other errors', () => {
    expect(dataErrorMessage(500)).toContain('(500)')
  })
})

describe('rank', () => {
  const counts = new Map([
    ['2026-09-16', 2],
    ['2026-09-15', 1],
  ])

  it('ranks by count descending', () => {
    expect(rank(counts, { sort: 'desc' })).toEqual([
      { name: '2026-09-16', count: 2 },
      { name: '2026-09-15', count: 1 },
    ])
  })

  it('sorts by key and respects a limit', () => {
    expect(rank(counts, { sort: 'key', limit: 1 })).toEqual([
      { name: '2026-09-15', count: 1 },
    ])
  })
})

describe('portalViewTrendsView', () => {
  const payload: DashboardPayload = {
    generatedAt: '2026-10-06T08:00:00Z',
    portalViewTrends: {
      perDay: [
        { dt: '2026-09-29', env: 'prod', count: 10 },
        { dt: '2026-09-29', env: 'test', count: 1 },
        { dt: '2026-10-01', env: 'prod', count: 20 },
        { dt: '2026-10-05', env: 'prod', count: 5 },
      ],
      topPathsPerMonth: [
        { month: '2026-09', env: '', path: '/a', count: 11 },
        { month: '2026-09', env: 'prod', path: '/a', count: 10 },
        { month: '2026-10', env: '', path: '/a', count: 10 },
        { month: '2026-10', env: '', path: '/b', count: 15 },
        { month: '2026-10', env: 'prod', path: '/b', count: 15 },
      ],
      perLocaleAndTheme: [
        { env: 'prod', locale: 'nb-NO', theme: 'ui', count: 30 },
        { env: 'prod', locale: 'en-GB', theme: 'sbanken', count: 5 },
        { env: 'test', locale: 'en-GB', theme: 'ui', count: 1 },
      ],
    },
  }

  it('returns an empty view for no payload', () => {
    const view = portalViewTrendsView(null, '')

    expect(view.total).toBe(0)
    expect(view.envs).toEqual([])
    expect(view.last30Days).toEqual([])
    expect(view.topPathsPerMonth).toEqual([])
  })

  it('fills days without views with 0 up to the snapshot day', () => {
    const view = portalViewTrendsView(payload, '')

    expect(view.firstDay).toBe('2026-09-29')
    expect(view.lastDay).toBe('2026-10-06')
    expect(view.last30Days).toEqual([
      { name: '2026-09-29', count: 11 },
      { name: '2026-09-30', count: 0 },
      { name: '2026-10-01', count: 20 },
      { name: '2026-10-02', count: 0 },
      { name: '2026-10-03', count: 0 },
      { name: '2026-10-04', count: 0 },
      { name: '2026-10-05', count: 5 },
      { name: '2026-10-06', count: 0 },
    ])
    expect(view.kpis).toEqual([
      { value: 36, label: 'Views, last 30 days' },
      { value: 36, label: 'Views in total' },
    ])
  })

  it('groups days into weeks starting on Monday and into calendar months', () => {
    const view = portalViewTrendsView(payload, '')

    expect(view.perWeek).toEqual([
      { name: '2026-09-28', count: 31 },
      { name: '2026-10-05', count: 5 },
    ])
    expect(view.perMonth).toEqual([
      { name: '2026-09', count: 11 },
      { name: '2026-10', count: 25 },
    ])
  })

  it('keeps only the last 30 days in the daily list', () => {
    const view = portalViewTrendsView(
      { ...payload, generatedAt: '2026-11-30T00:00:00Z' },
      ''
    )

    expect(view.last30Days).toHaveLength(30)
    expect(view.last30Days[0].name).toBe('2026-11-01')
    expect(view.total).toBe(36)
  })

  it('ranks top URLs per month, newest month first, using the all-environments ranking for All', () => {
    const view = portalViewTrendsView(payload, '')

    expect(view.topPathsPerMonth).toEqual([
      {
        month: '2026-10',
        paths: [
          { name: '/b', count: 15 },
          { name: '/a', count: 10 },
        ],
      },
      { month: '2026-09', paths: [{ name: '/a', count: 11 }] },
    ])
  })

  it('sums locales and themes across the whole range', () => {
    const view = portalViewTrendsView(payload, '')

    expect(view.perLocale).toEqual([
      { name: 'nb-NO', count: 30 },
      { name: 'en-GB', count: 6 },
    ])
    expect(view.perTheme).toEqual([
      { name: 'ui', count: 31 },
      { name: 'sbanken', count: 5 },
    ])
  })

  it('scopes every list to the selected environment but keeps the full env list', () => {
    const view = portalViewTrendsView(payload, 'test')

    expect(view.envs).toEqual(['prod', 'test'])
    expect(view.total).toBe(1)
    expect(view.firstDay).toBe('2026-09-29')
    expect(view.topPathsPerMonth).toEqual([])
    expect(view.perLocale).toEqual([{ name: 'en-GB', count: 1 }])
  })
})

describe('loadDashboardData', () => {
  const session = {
    accessToken: 'token-abc',
    expiresAt: Date.now() + 60000,
  } satisfies Session

  beforeEach(() => sessionStorage.clear())
  afterEach(() => {
    sessionStorage.clear()
    vi.unstubAllGlobals()
  })

  it('returns the empty state when there is no session', async () => {
    expect(await loadDashboardData(null, 'https://api.example')).toEqual({
      kind: 'empty',
    })
  })

  it('reports an error when sign-in works but no API base URL is configured', async () => {
    expect(await loadDashboardData(session, '')).toEqual({
      kind: 'error',
      message: expect.stringContaining('no data API address'),
    })
  })

  it('sends the access token and returns fetched records', async () => {
    let captured: { url: string; options: RequestInit } | undefined
    vi.stubGlobal('fetch', async (url: string, options: RequestInit) => {
      captured = { url, options }

      return {
        status: 200,
        ok: true,
        json: async () => ({ generatedAt: 't' }),
      }
    })

    const result = await loadDashboardData(session, 'https://api.example')

    expect(captured?.url).toBe('https://api.example/data')
    expect(
      (captured?.options.headers as Record<string, string>).Authorization
    ).toBe('Bearer token-abc')
    expect(result).toEqual({
      kind: 'data',
      payload: { generatedAt: 't' },
    })
  })

  it('strips a trailing slash from the API base URL', async () => {
    let captured: string | undefined
    vi.stubGlobal('fetch', async (url: string) => {
      captured = url

      return { status: 200, ok: true, json: async () => ({}) }
    })

    await loadDashboardData(session, 'https://api.example/')

    expect(captured).toBe('https://api.example/data')
  })

  it('clears the retry marker after a successful fetch', async () => {
    beginAuthRetry()
    vi.stubGlobal('fetch', async () => ({
      status: 200,
      ok: true,
      json: async () => ({}),
    }))

    await loadDashboardData(session, 'https://api.example')

    // Marker cleared, so a later rejection is allowed to retry again.
    expect(beginAuthRetry()).toBe(true)
  })

  it('allows one retry on 401, then reports an error', async () => {
    vi.stubGlobal('fetch', async () => ({ status: 401, ok: false }))

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'retry',
    })
    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'error',
      message: expect.stringContaining('rejected your access'),
    })
  })

  it('reports an error for a non-ok, non-401 status', async () => {
    vi.stubGlobal('fetch', async () => ({ status: 403, ok: false }))

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'error',
      message: dataErrorMessage(403),
    })
  })

  it('reports an error when the body is malformed', async () => {
    vi.stubGlobal('fetch', async () => ({
      status: 200,
      ok: true,
      json: async () => {
        throw new Error('invalid json')
      },
    }))

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'error',
      message: expect.stringContaining('could not read'),
    })
  })

  it('reports an error when the request throws', async () => {
    vi.stubGlobal('fetch', async () => {
      throw new Error('network down')
    })

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'error',
      message: expect.stringContaining('Could not reach the data API'),
    })
  })
})
