import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'

const { storePortalViews } = vi.hoisted(() => ({
  storePortalViews: vi.fn(),
}))

vi.mock('../src/lambda/store.js', () => ({ storePortalViews }))

import { handler } from '../src/lambda/index.js'

type Response = { statusCode: number; body: string }

function event(
  method: string,
  path: string,
  opts: {
    body?: string
    isBase64Encoded?: boolean
    headers?: Record<string, string | undefined>
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
    requestContext: { http: { method } },
    body: opts.body,
    isBase64Encoded: opts.isBase64Encoded ?? false,
  } as unknown as APIGatewayProxyEventV2
}

async function invoke(event: APIGatewayProxyEventV2): Promise<Response> {
  return (await handler(event)) as Response
}

describe('handler', () => {
  beforeEach(() => {
    storePortalViews.mockReset()
    process.env.EDGE_AUTH_SECRET = 'edge-secret'
  })

  afterEach(() => {
    delete process.env.EDGE_AUTH_SECRET
  })

  it('serves /healthz behind the edge lock', async () => {
    const res = await invoke(event('GET', '/healthz'))

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' })
  })

  it('returns 404 for an unknown route', async () => {
    const res = await invoke(event('GET', '/nope'))

    expect(res.statusCode).toBe(404)
  })
})

describe('handler /collect-portal-views (public ingest)', () => {
  beforeEach(() => {
    storePortalViews.mockReset()
    process.env.EDGE_AUTH_SECRET = 'edge-secret'
  })

  afterEach(() => {
    delete process.env.EDGE_AUTH_SECRET
  })

  it('accepts portal views without a bearer token', async () => {
    storePortalViews.mockResolvedValue(1)

    const res = await invoke(
      event('POST', '/collect-portal-views', {
        body: JSON.stringify([{ path: '/uilib/components/button' }]),
      })
    )

    expect(res.statusCode).toBe(202)
    expect(JSON.parse(res.body)).toEqual({ accepted: 1 })
    expect(storePortalViews).toHaveBeenCalledWith([
      { path: '/uilib/components/button' },
    ])
  })

  it('decodes a base64-encoded body', async () => {
    storePortalViews.mockResolvedValue(1)

    await invoke(
      event('POST', '/collect-portal-views', {
        body: Buffer.from(JSON.stringify([{ path: '/a' }])).toString(
          'base64'
        ),
        isBase64Encoded: true,
      })
    )

    expect(storePortalViews).toHaveBeenCalledWith([{ path: '/a' }])
  })

  it('returns 400 for an invalid JSON body', async () => {
    const res = await invoke(
      event('POST', '/collect-portal-views', { body: 'not json' })
    )

    expect(res.statusCode).toBe(400)
    expect(storePortalViews).not.toHaveBeenCalled()
  })

  it('returns 400 with details when validation fails', async () => {
    const res = await invoke(
      event('POST', '/collect-portal-views', {
        body: JSON.stringify([{ path: 'nope' }]),
      })
    )

    expect(res.statusCode).toBe(400)
    expect(JSON.parse(res.body).error).toBe('Validation failed')
    expect(storePortalViews).not.toHaveBeenCalled()
  })
})

describe('handler origin auth (X-Edge-Auth)', () => {
  beforeEach(() => {
    storePortalViews.mockReset()
    process.env.EDGE_AUTH_SECRET = 'edge-secret'
  })

  afterEach(() => {
    delete process.env.EDGE_AUTH_SECRET
  })

  it('requires the edge header for /healthz', async () => {
    const missing = await invoke(
      event('GET', '/healthz', { edgeAuth: null })
    )
    expect(missing.statusCode).toBe(403)

    const withHeader = await invoke(event('GET', '/healthz'))
    expect(withHeader.statusCode).toBe(200)
  })

  it('rejects ingest with 403 when the edge header is missing', async () => {
    const res = await invoke(
      event('POST', '/collect-portal-views', {
        body: JSON.stringify([{ path: '/a' }]),
        edgeAuth: null,
      })
    )

    expect(res.statusCode).toBe(403)
    expect(storePortalViews).not.toHaveBeenCalled()
  })
})
