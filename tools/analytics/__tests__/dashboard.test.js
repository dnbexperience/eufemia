import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  scopes,
  beginAuthRetry,
  clearAuthRetry,
  clearSession,
} from '../dashboard/auth.js'

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
