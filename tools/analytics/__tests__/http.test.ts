import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isAuthorized } from '../src/lambda/http.js'

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
