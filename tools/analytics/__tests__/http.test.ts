import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isEdgeAuthorized } from '../src/lambda/http.js'

describe('isEdgeAuthorized', () => {
  const original = process.env.EDGE_AUTH_SECRET

  beforeEach(() => {
    delete process.env.EDGE_AUTH_SECRET
  })

  afterEach(() => {
    if (original === undefined) {
      delete process.env.EDGE_AUTH_SECRET
    } else {
      process.env.EDGE_AUTH_SECRET = original
    }
  })

  it('rejects any request when EDGE_AUTH_SECRET is not set (fail-closed)', () => {
    expect(isEdgeAuthorized(undefined)).toBe(false)
    expect(isEdgeAuthorized({})).toBe(false)
  })

  it('accepts a matching X-Edge-Auth header', () => {
    process.env.EDGE_AUTH_SECRET = 'edge-secret'

    expect(isEdgeAuthorized({ 'x-edge-auth': 'edge-secret' })).toBe(true)
    expect(isEdgeAuthorized({ 'X-Edge-Auth': 'edge-secret' })).toBe(true)
  })

  it('rejects a wrong or missing header when the secret is set', () => {
    process.env.EDGE_AUTH_SECRET = 'edge-secret'

    expect(isEdgeAuthorized(undefined)).toBe(false)
    expect(isEdgeAuthorized({})).toBe(false)
    expect(isEdgeAuthorized({ 'x-edge-auth': 'wrong' })).toBe(false)
  })
})
