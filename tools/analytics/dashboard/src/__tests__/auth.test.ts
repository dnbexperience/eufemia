import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  beginAuthRetry,
  clearAuthRetry,
  clearSession,
  readSession,
  scopes,
} from '../auth'

const SESSION_KEY = 'eufemia-analytics-session'

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
    sessionStorage.setItem(SESSION_KEY, '{"name":"Signed in"}')
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
