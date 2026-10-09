import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  beginAuthRetry,
  clearAuthRetry,
  clearSession,
  ensureSignedIn,
  readSession,
} from '../auth'

const SESSION_KEY = 'eufemia-analytics-session'

describe('ensureSignedIn', () => {
  const signIn = { clientId: 'client-id', tenantId: 'tenant-id' }

  function serveConfig(config: Record<string, string>) {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(config)))
    )
  }

  beforeEach(() => sessionStorage.clear())
  afterEach(() => {
    sessionStorage.clear()
    vi.unstubAllGlobals()
  })

  it('returns null when sign-in is not configured', async () => {
    serveConfig({})

    await expect(ensureSignedIn()).resolves.toBe(null)
  })

  it('refuses to sign in without an API scope', async () => {
    serveConfig(signIn)

    await expect(ensureSignedIn()).rejects.toThrow(
      'No API scope is configured.'
    )
  })

  it('returns the stored session when an API scope is configured', async () => {
    serveConfig({ ...signIn, apiScope: 'api://app-id/Dashboard.Read' })
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        accessToken: 'token-abc',
        expiresAt: Date.now() + 60000,
      })
    )

    await expect(ensureSignedIn()).resolves.toMatchObject({
      accessToken: 'token-abc',
    })
  })
})

describe('auth retry guard', () => {
  beforeEach(() => sessionStorage.clear())
  afterEach(() => sessionStorage.clear())

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
  beforeEach(() => sessionStorage.clear())
  afterEach(() => sessionStorage.clear())

  it('removes the stored session', () => {
    sessionStorage.setItem(SESSION_KEY, '{"accessToken":"token-abc"}')
    clearSession()
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(null)
  })
})

describe('readSession', () => {
  const future = Date.now() + 60000

  beforeEach(() => sessionStorage.clear())
  afterEach(() => sessionStorage.clear())

  it('returns a non-expired session that carries an access token', () => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
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
      JSON.stringify({ expiresAt: future })
    )

    expect(readSession()).toBe(null)
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(null)
  })

  it('rejects an expired session even with an access token', () => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        accessToken: 'token-abc',
        expiresAt: Date.now() - 1000,
      })
    )

    expect(readSession()).toBe(null)
  })
})
