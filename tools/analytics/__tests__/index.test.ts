import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'

const { storeRecord, storePageViews, retrieveRecords } = vi.hoisted(
  () => ({
    storeRecord: vi.fn(),
    storePageViews: vi.fn(),
    retrieveRecords: vi.fn(),
  })
)

vi.mock('../src/lambda/store.js', () => ({ storeRecord, storePageViews }))
vi.mock('../src/lambda/retrieve.js', () => ({
  retrieveRecords,
  InvalidQueryError: class InvalidQueryError extends Error {},
}))

import { handler } from '../src/lambda/index.js'
import { InvalidQueryError } from '../src/lambda/retrieve.js'

type Response = { statusCode: number; body: string }

function event(
  method: string,
  path: string,
  opts: {
    body?: string
    isBase64Encoded?: boolean
    headers?: Record<string, string | undefined>
    query?: Record<string, string | undefined>
    // Injected by default so requests pass the edge lock; pass null to omit it.
    edgeAuth?: string | null
  } = {}
): APIGatewayProxyEventV2 {
  const edgeHeader =
    opts.edgeAuth === null
      ? {}
      : { 'x-edge-auth': opts.edgeAuth ?? 'edge-secret' }

  return {
    rawPath: path,
    headers: { ...edgeHeader, ...(opts.headers ?? {}) },
    queryStringParameters: opts.query,
    requestContext: { http: { method } },
    body: opts.body,
    isBase64Encoded: opts.isBase64Encoded ?? false,
  } as unknown as APIGatewayProxyEventV2
}

const auth = { authorization: 'Bearer secret' }

async function invoke(event: APIGatewayProxyEventV2): Promise<Response> {
  return (await handler(event)) as Response
}

describe('handler', () => {
  beforeEach(() => {
    storeRecord.mockReset()
    storePageViews.mockReset()
    retrieveRecords.mockReset()
    process.env.API_TOKEN = 'secret'
    process.env.EDGE_AUTH_SECRET = 'edge-secret'
  })

  afterEach(() => {
    delete process.env.API_TOKEN
    delete process.env.EDGE_AUTH_SECRET
  })

  it('serves /healthz without auth', async () => {
    const res = await invoke(event('GET', '/healthz'))

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' })
  })

  it('rejects unauthenticated requests to /records', async () => {
    const res = await invoke(event('POST', '/records', { body: '{}' }))

    expect(res.statusCode).toBe(401)
    expect(storeRecord).not.toHaveBeenCalled()
  })

  it('stores a valid record and returns 201', async () => {
    const stored = {
      id: 'abc',
      name: 'W',
      value: 1,
      createdAt: '2026-08-07T00:00:00.000Z',
    }
    storeRecord.mockResolvedValue(stored)

    const res = await invoke(
      event('POST', '/records', {
        headers: auth,
        body: JSON.stringify({ id: 'abc', name: 'W', value: 1 }),
      })
    )

    expect(res.statusCode).toBe(201)
    expect(JSON.parse(res.body)).toEqual(stored)
    expect(storeRecord).toHaveBeenCalledWith({
      id: 'abc',
      name: 'W',
      value: 1,
    })
  })

  it('decodes a base64-encoded body', async () => {
    storeRecord.mockResolvedValue({})

    await invoke(
      event('POST', '/records', {
        headers: auth,
        body: Buffer.from(
          JSON.stringify({ id: 'abc', name: 'W', value: 1 })
        ).toString('base64'),
        isBase64Encoded: true,
      })
    )

    expect(storeRecord).toHaveBeenCalledWith({
      id: 'abc',
      name: 'W',
      value: 1,
    })
  })

  it('returns 400 for an invalid JSON body', async () => {
    const res = await invoke(
      event('POST', '/records', { headers: auth, body: 'not json' })
    )

    expect(res.statusCode).toBe(400)
    expect(storeRecord).not.toHaveBeenCalled()
  })

  it('returns 400 with details when validation fails', async () => {
    const res = await invoke(
      event('POST', '/records', {
        headers: auth,
        body: JSON.stringify({ id: '', name: '', value: 'nope' }),
      })
    )

    expect(res.statusCode).toBe(400)
    expect(JSON.parse(res.body).error).toBe('Validation failed')
    expect(storeRecord).not.toHaveBeenCalled()
  })

  it('retrieves records with the id and limit filters', async () => {
    retrieveRecords.mockResolvedValue([{ id: 'abc' }])

    const res = await invoke(
      event('GET', '/records', {
        headers: auth,
        query: { id: 'abc', limit: '5' },
      })
    )

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ records: [{ id: 'abc' }] })
    expect(retrieveRecords).toHaveBeenCalledWith({ id: 'abc', limit: 5 })
  })

  it('returns 400 for a non-numeric limit', async () => {
    const res = await invoke(
      event('GET', '/records', {
        headers: auth,
        query: { limit: 'abc' },
      })
    )

    expect(res.statusCode).toBe(400)
    expect(retrieveRecords).not.toHaveBeenCalled()
  })

  it('maps InvalidQueryError to 400', async () => {
    retrieveRecords.mockRejectedValue(new InvalidQueryError('bad id'))

    const res = await invoke(
      event('GET', '/records', { headers: auth, query: { id: '!' } })
    )

    expect(res.statusCode).toBe(400)
    expect(JSON.parse(res.body).error).toBe('bad id')
  })

  it('returns 404 for an unknown route', async () => {
    const res = await invoke(event('GET', '/nope', { headers: auth }))

    expect(res.statusCode).toBe(404)
  })
})

describe('handler /collect (public ingest)', () => {
  beforeEach(() => {
    storeRecord.mockReset()
    storePageViews.mockReset()
    retrieveRecords.mockReset()
    process.env.API_TOKEN = 'secret'
    process.env.EDGE_AUTH_SECRET = 'edge-secret'
  })

  afterEach(() => {
    delete process.env.API_TOKEN
    delete process.env.EDGE_AUTH_SECRET
  })

  it('accepts page views without a bearer token', async () => {
    storePageViews.mockResolvedValue(1)

    const res = await invoke(
      event('POST', '/collect', {
        body: JSON.stringify([{ path: '/uilib/components/button' }]),
      })
    )

    expect(res.statusCode).toBe(202)
    expect(JSON.parse(res.body)).toEqual({ accepted: 1 })
    expect(storePageViews).toHaveBeenCalledWith([
      { path: '/uilib/components/button' },
    ])
  })

  it('returns 400 for an invalid JSON body', async () => {
    const res = await invoke(
      event('POST', '/collect', { body: 'not json' })
    )

    expect(res.statusCode).toBe(400)
    expect(storePageViews).not.toHaveBeenCalled()
  })

  it('returns 400 when validation fails', async () => {
    const res = await invoke(
      event('POST', '/collect', {
        body: JSON.stringify([{ path: 'nope' }]),
      })
    )

    expect(res.statusCode).toBe(400)
    expect(JSON.parse(res.body).error).toBe('Validation failed')
    expect(storePageViews).not.toHaveBeenCalled()
  })
})

describe('handler origin auth (X-Edge-Auth)', () => {
  beforeEach(() => {
    storeRecord.mockReset()
    storePageViews.mockReset()
    retrieveRecords.mockReset()
    process.env.API_TOKEN = 'secret'
    process.env.EDGE_AUTH_SECRET = 'edge-secret'
  })

  afterEach(() => {
    delete process.env.API_TOKEN
    delete process.env.EDGE_AUTH_SECRET
  })

  it('requires the edge header for /healthz when the edge secret is set', async () => {
    const missing = await invoke(
      event('GET', '/healthz', { edgeAuth: null })
    )
    expect(missing.statusCode).toBe(403)

    const withHeader = await invoke(
      event('GET', '/healthz', {
        headers: { 'x-edge-auth': 'edge-secret' },
      })
    )
    expect(withHeader.statusCode).toBe(200)
  })

  it('rejects with 403 when the edge header is missing', async () => {
    const res = await invoke(
      event('POST', '/records', {
        body: '{}',
        headers: auth,
        edgeAuth: null,
      })
    )

    expect(res.statusCode).toBe(403)
    expect(storeRecord).not.toHaveBeenCalled()
  })

  it('requires the edge header for /collect too', async () => {
    const res = await invoke(
      event('POST', '/collect', {
        body: JSON.stringify([{ path: '/a' }]),
        edgeAuth: null,
      })
    )

    expect(res.statusCode).toBe(403)
    expect(storePageViews).not.toHaveBeenCalled()
  })

  it('lets the request through when the edge header matches', async () => {
    const res = await invoke(
      event('GET', '/records', {
        headers: { ...auth, 'x-edge-auth': 'edge-secret' },
        query: { id: 'abc' },
      })
    )

    expect(res.statusCode).toBe(200)
  })
})
