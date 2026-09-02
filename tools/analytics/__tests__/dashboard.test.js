import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  scopes,
  beginAuthRetry,
  clearAuthRetry,
  clearSession,
  readSession,
} from '../dashboard/auth.js'
import { loadDashboardData, snapshotMeta } from '../dashboard/app.js'

class MemoryStorage {
  store = new Map()

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null
  }

  setItem(key, value) {
    this.store.set(key, String(value))
  }

  removeItem(key) {
    this.store.delete(key)
  }
}

describe('scopes', () => {
  it('returns the base scope when no API scope is configured', () => {
    expect(scopes({})).toBe('openid profile email')
  })

  it('appends the API scope when configured', () => {
    expect(scopes({ apiScope: 'api://app-id/Dashboard.Read' })).toBe(
      'openid profile email api://app-id/Dashboard.Read'
    )
  })
})

describe('auth retry guard', () => {
  beforeEach(() => {
    globalThis.sessionStorage = new MemoryStorage()
  })

  afterEach(() => {
    delete globalThis.sessionStorage
  })

  it('allows a single retry, then blocks further attempts', () => {
    expect(beginAuthRetry()).toBe(true)
    expect(beginAuthRetry()).toBe(false)
    expect(beginAuthRetry()).toBe(false)
  })

  it('allows a retry again after the marker is cleared', () => {
    expect(beginAuthRetry()).toBe(true)
    clearAuthRetry()
    expect(beginAuthRetry()).toBe(true)
  })

  it('keeps the retry marker when only the session is cleared', () => {
    expect(beginAuthRetry()).toBe(true)
    clearSession()
    expect(beginAuthRetry()).toBe(false)
  })
})

describe('clearSession', () => {
  beforeEach(() => {
    globalThis.sessionStorage = new MemoryStorage()
  })

  afterEach(() => {
    delete globalThis.sessionStorage
  })

  it('removes the stored session', () => {
    sessionStorage.setItem(
      'eufemia-analytics-session',
      '{"name":"Signed in"}'
    )
    clearSession()
    expect(sessionStorage.getItem('eufemia-analytics-session')).toBe(null)
  })
})

describe('readSession', () => {
  const SESSION_KEY = 'eufemia-analytics-session'
  const future = Date.now() + 60000

  beforeEach(() => {
    globalThis.sessionStorage = new MemoryStorage()
  })

  afterEach(() => {
    delete globalThis.sessionStorage
  })

  it('returns a non-expired session that carries an access token', () => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        name: 'Signed in',
        accessToken: 'token-abc',
        expiresAt: future,
      })
    )

    expect(readSession()).toMatchObject({ accessToken: 'token-abc' })
  })

  it('rejects and clears a session without an access token', () => {
    // A session shape persisted by an older build: no accessToken.
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name: 'Signed in', expiresAt: future })
    )

    expect(readSession()).toBe(null)
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(null)
  })

  it('rejects an expired session even with an access token', () => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        name: 'Signed in',
        accessToken: 'token-abc',
        expiresAt: Date.now() - 1000,
      })
    )

    expect(readSession()).toBe(null)
  })
})

describe('loadDashboardData', () => {
  const session = { accessToken: 'token-abc' }

  beforeEach(() => {
    globalThis.sessionStorage = new MemoryStorage()
  })

  afterEach(() => {
    delete globalThis.sessionStorage
    delete globalThis.fetch
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
    let captured
    globalThis.fetch = async (url, options) => {
      captured = { url, options }

      return {
        status: 200,
        ok: true,
        json: async () => ({ records: [{ id: 1 }] }),
      }
    }

    const result = await loadDashboardData(session, 'https://api.example')

    expect(captured.url).toBe('https://api.example/data')
    expect(captured.options.headers.Authorization).toBe('Bearer token-abc')
    expect(result).toEqual({
      kind: 'data',
      payload: { records: [{ id: 1 }] },
    })
  })

  it('strips a trailing slash from the API base URL', async () => {
    let captured
    globalThis.fetch = async (url) => {
      captured = url

      return { status: 200, ok: true, json: async () => ({}) }
    }

    await loadDashboardData(session, 'https://api.example/')

    expect(captured).toBe('https://api.example/data')
  })

  it('clears the retry marker after a successful fetch', async () => {
    beginAuthRetry()
    globalThis.fetch = async () => ({
      status: 200,
      ok: true,
      json: async () => ({}),
    })

    await loadDashboardData(session, 'https://api.example')

    // Marker cleared, so a later rejection is allowed to retry again.
    expect(beginAuthRetry()).toBe(true)
  })

  it('allows one retry on 401, then reports rejection', async () => {
    globalThis.fetch = async () => ({ status: 401, ok: false })

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
    globalThis.fetch = async () => ({ status: 403, ok: false })

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'error',
      status: 403,
    })
  })

  it('returns the empty state when the body is malformed', async () => {
    globalThis.fetch = async () => ({
      status: 200,
      ok: true,
      json: async () => {
        throw new Error('invalid json')
      },
    })

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'empty',
    })
  })

  it('returns the empty state when the request throws', async () => {
    globalThis.fetch = async () => {
      throw new Error('network down')
    }

    expect(
      await loadDashboardData(session, 'https://api.example')
    ).toEqual({
      kind: 'empty',
    })
  })
})

describe('snapshotMeta', () => {
  const generatedAt = '2026-09-02T10:00:00.000Z'

  it('reports the snapshot time when there are records', () => {
    const text = snapshotMeta({ generatedAt }, 3)

    expect(text.startsWith('Snapshot generated ')).toBe(true)
    expect(text).toContain(new Date(generatedAt).toLocaleString())
  })

  it('surfaces the snapshot time in the empty state', () => {
    const text = snapshotMeta({ generatedAt, records: [] }, 0)

    expect(text.startsWith('No data yet (snapshot generated ')).toBe(true)
    expect(text).toContain(new Date(generatedAt).toLocaleString())
  })

  it('falls back to a plain empty message without a snapshot time', () => {
    expect(snapshotMeta({}, 0)).toBe('No data yet.')
    expect(snapshotMeta(null, 0)).toBe('No data yet.')
  })

  it('returns nothing when records exist but no snapshot time is present', () => {
    expect(snapshotMeta({}, 5)).toBe('')
  })
})
