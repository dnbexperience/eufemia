import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isAuthorized, isEdgeAuthorized } from '../src/lambda/http.js'

describe('isAuthorized', () => {
  const original = process.env.API_TOKEN

  beforeEach(() => {
    delete process.env.API_TOKEN
  })

  afterEach(() => {
    if (original === undefined) {
      delete process.env.API_TOKEN
    } else {
      process.env.API_TOKEN = original
    }
  })

  it('allows any request when API_TOKEN is not set', () => {
    expect(isAuthorized(undefined)).toBe(true)
    expect(isAuthorized({})).toBe(true)
  })

  it('accepts a matching bearer token', () => {
    process.env.API_TOKEN = 'secret-token'

    expect(isAuthorized({ authorization: 'Bearer secret-token' })).toBe(
      true
    )
    expect(isAuthorized({ Authorization: 'Bearer secret-token' })).toBe(
      true
    )
  })

  it('rejects a wrong token', () => {
    process.env.API_TOKEN = 'secret-token'

    expect(isAuthorized({ authorization: 'Bearer nope' })).toBe(false)
  })

  it('rejects a missing or malformed header', () => {
    process.env.API_TOKEN = 'secret-token'

    expect(isAuthorized(undefined)).toBe(false)
    expect(isAuthorized({})).toBe(false)
    expect(isAuthorized({ authorization: 'secret-token' })).toBe(false)
    expect(isAuthorized({ authorization: 'Basic secret-token' })).toBe(
      false
    )
  })
})

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

  it('allows any request when EDGE_AUTH_SECRET is not set', () => {
    expect(isEdgeAuthorized(undefined)).toBe(true)
    expect(isEdgeAuthorized({})).toBe(true)
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
