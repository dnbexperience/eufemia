import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  countBy,
  dataErrorMessage,
  loadDashboardData,
  normalise,
  rank,
  snapshotMeta,
  toRecords,
  type DashboardPayload,
} from '../data'
import { beginAuthRetry } from '../auth'
import type { Session } from '../auth'

describe('normalise', () => {
  it('prefers name, then path, then type, then id', () => {
    expect(normalise({ name: 'A', path: '/b' }).label).toBe('A')
    expect(normalise({ path: '/b' }).label).toBe('/b')
    expect(normalise({ type: 'pageview' }).label).toBe('pageview')
    expect(normalise({ id: '7' }).label).toBe('7')
    expect(normalise({}).label).toBe('—')
  })

  it('derives the day from created_at or timestamp', () => {
    expect(normalise({ created_at: '2026-09-16T10:00:00Z' }).day).toBe(
      '2026-09-16'
    )
    expect(normalise({ timestamp: '2026-01-02T00:00:00Z' }).day).toBe(
      '2026-01-02'
    )
    expect(normalise({}).day).toBe('')
  })
})

describe('toRecords', () => {
  it('accepts an array or a payload with portalViews', () => {
    expect(toRecords([{ path: '/a' }])).toHaveLength(1)
    expect(toRecords({ portalViews: [{ path: '/a' }] })).toHaveLength(1)
    expect(toRecords(null)).toEqual([])
    expect(toRecords({})).toEqual([])
  })
})

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

describe('countBy + rank', () => {
  const rows = [
    normalise({
      path: '/a',
      env: 'prod',
      created_at: '2026-09-16T00:00:00Z',
    }),
    normalise({
      path: '/a',
      env: 'prod',
      created_at: '2026-09-16T01:00:00Z',
    }),
    normalise({
      path: '/b',
      env: 'prod',
      created_at: '2026-09-15T00:00:00Z',
    }),
  ]

  it('counts occurrences and ranks by count descending', () => {
    const ranked = rank(countBy(rows, 'label'), { sort: 'desc' })
    expect(ranked).toEqual([
      { name: '/a', count: 2 },
      { name: '/b', count: 1 },
    ])
  })

  it('sorts by key and respects a limit', () => {
    const ranked = rank(countBy(rows, 'day'), { sort: 'key', limit: 1 })
    expect(ranked).toEqual([{ name: '2026-09-15', count: 1 }])
  })
})

describe('loadDashboardData', () => {
  const session = {
    name: 'Test',
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

  it('returns the empty state when no API base URL is configured', async () => {
    expect(await loadDashboardData(session, '')).toEqual({ kind: 'empty' })
  })

  it('sends the access token and returns fetched records', async () => {
    let captured: { url: string; options: RequestInit } | undefined
    vi.stubGlobal('fetch', async (url: string, options: RequestInit) => {
      captured = { url, options }

      return {
        status: 200,
        ok: true,
        json: async () => ({ portalViews: [{ id: '1' }] }),
      }
    })

    const result = await loadDashboardData(session, 'https://api.example')

    expect(captured?.url).toBe('https://api.example/data')
    expect(
      (captured?.options.headers as Record<string, string>).Authorization
    ).toBe('Bearer token-abc')
    expect(result).toEqual({
      kind: 'data',
      payload: { portalViews: [{ id: '1' }] },
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

  it('allows one retry on 401, then reports rejection', async () => {
    vi.stubGlobal('fetch', async () => ({ status: 401, ok: false }))

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'retry',
    })
    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'rejected',
    })
  })

  it('reports an error for a non-ok, non-401 status', async () => {
    vi.stubGlobal('fetch', async () => ({ status: 403, ok: false }))

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'error',
      status: 403,
    })
  })

  it('returns the empty state when the body is malformed', async () => {
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
      kind: 'empty',
    })
  })

  it('returns the empty state when the request throws', async () => {
    vi.stubGlobal('fetch', async () => {
      throw new Error('network down')
    })

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'empty',
    })
  })
})
