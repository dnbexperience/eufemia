import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  scopes,
  beginAuthRetry,
  clearAuthRetry,
  clearSession,
} from '../dashboard/auth.js'
import { loadDashboardData } from '../dashboard/app.js'

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
