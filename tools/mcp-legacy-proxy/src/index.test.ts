import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import worker, { type Env } from './index'

const TARGET = 'https://server.eufemia.dnb.no/mcp/web'

const initializeRequest = () =>
  new Request('https://eufemia-mcp.eufemia.workers.dev/mcp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      authorization: 'Bearer secret-should-not-be-forwarded',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { clientInfo: { name: 'test-client', version: '1.0' } },
    }),
  })

const initializeResult = (instructions?: string) =>
  new Response(
    JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: '2025-06-18',
        serverInfo: { name: 'eufemia', version: '0.0.0' },
        ...(instructions ? { instructions } : {}),
      },
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  )

const proxyEnv: Env = { MODE: 'proxy', TARGET_URL: TARGET }

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  // The worker logs one structured line per request; silence it in tests.
  vi.spyOn(console, 'log').mockImplementation(() => undefined)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('proxy mode', () => {
  it('forwards POST to the new endpoint and adds deprecation headers', async () => {
    fetchMock.mockResolvedValue(initializeResult())

    const res = await worker.fetch(initializeRequest(), proxyEnv)

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(TARGET)
    expect(init.method).toBe('POST')

    expect(res.status).toBe(200)
    expect(res.headers.get('Deprecation')).toBeTruthy()
    expect(res.headers.get('Sunset')).toBeTruthy()
    expect(res.headers.get('Link')).toContain(
      `<${TARGET}>; rel="successor-version"`
    )
  })

  it('injects the migration notice into the initialize instructions', async () => {
    fetchMock.mockResolvedValue(initializeResult())

    const res = await worker.fetch(initializeRequest(), proxyEnv)
    const body = (await res.json()) as any

    expect(body.result.instructions).toContain(TARGET)
    expect(body.result.instructions).toContain('deprecated')
  })

  it('appends to existing instructions instead of overwriting them', async () => {
    fetchMock.mockResolvedValue(initializeResult('Existing guidance.'))

    const res = await worker.fetch(initializeRequest(), proxyEnv)
    const body = (await res.json()) as any

    expect(body.result.instructions).toContain('Existing guidance.')
    expect(body.result.instructions).toContain(TARGET)
  })

  it('drops the upstream Content-Length when the body is rewritten', async () => {
    const upstreamBody = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: '2025-06-18',
        serverInfo: { name: 'eufemia', version: '0.0.0' },
      },
    })
    fetchMock.mockResolvedValue(
      new Response(upstreamBody, {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'content-length': String(upstreamBody.length),
        },
      })
    )

    const res = await worker.fetch(initializeRequest(), proxyEnv)

    // A stale Content-Length would truncate the injected notice.
    expect(res.headers.get('content-length')).toBeNull()
    const body = (await res.json()) as any
    expect(body.result.instructions).toContain(TARGET)
  })

  it('passes non-initialize responses through unchanged', async () => {
    const toolResult = {
      jsonrpc: '2.0',
      id: 2,
      result: { content: [{ type: 'text', text: 'hello' }] },
    }
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(toolResult), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    )

    const req = new Request(
      'https://eufemia-mcp.eufemia.workers.dev/mcp',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/call',
        }),
      }
    )
    const res = await worker.fetch(req, proxyEnv)
    const body = (await res.json()) as any

    expect(body).toEqual(toolResult)
  })

  it('does not forward sensitive headers upstream', async () => {
    fetchMock.mockResolvedValue(initializeResult())

    await worker.fetch(initializeRequest(), proxyEnv)

    const forwarded = fetchMock.mock.calls[0][1].headers as Headers
    expect(forwarded.get('authorization')).toBeNull()
    expect(forwarded.get('content-type')).toBe('application/json')
  })

  it('streams SSE responses through without buffering', async () => {
    const sse = new Response('event: message\ndata: {}\n\n', {
      status: 200,
      headers: { 'content-type': 'text/event-stream' },
    })
    fetchMock.mockResolvedValue(sse)

    const res = await worker.fetch(initializeRequest(), proxyEnv)

    expect(res.headers.get('content-type')).toContain('text/event-stream')
    expect(res.headers.get('Deprecation')).toBeTruthy()
    expect(await res.text()).toContain('data: {}')
  })

  it('returns 405 with Allow for non-POST methods', async () => {
    const req = new Request(
      'https://eufemia-mcp.eufemia.workers.dev/mcp',
      {
        method: 'GET',
      }
    )
    const res = await worker.fetch(req, proxyEnv)

    expect(res.status).toBe(405)
    expect(res.headers.get('Allow')).toBe('POST, OPTIONS')
    expect(fetchMock).not.toHaveBeenCalled()
    const body = (await res.json()) as any
    expect(body.error.message).toContain(TARGET)
  })

  it('returns a JSON-RPC error when the upstream is unreachable', async () => {
    fetchMock.mockRejectedValue(new Error('network down'))

    const res = await worker.fetch(initializeRequest(), proxyEnv)

    expect(res.status).toBe(502)
    const body = (await res.json()) as any
    expect(body.error.message).toContain(TARGET)
  })

  it('logs only method, client name, and status', async () => {
    const logSpy = vi.mocked(console.log)
    fetchMock.mockResolvedValue(initializeResult())

    await worker.fetch(initializeRequest(), proxyEnv)

    const logged = JSON.parse(logSpy.mock.calls[0][0] as string)
    expect(logged).toEqual({
      event: 'legacy_mcp_request',
      method: 'POST',
      client: 'test-client',
      status: 200,
    })
    // The raw request body / credentials must never be logged.
    const all = logSpy.mock.calls.map((c) => String(c[0])).join('\n')
    expect(all).not.toContain('secret-should-not-be-forwarded')
  })
})

describe('redirect mode', () => {
  // Clients that follow redirects use Location; clients that do not read the body.
  it('returns 308 with Location and a JSON-RPC error body naming the new URL', async () => {
    const res = await worker.fetch(initializeRequest(), {
      MODE: 'redirect',
      TARGET_URL: TARGET,
    })

    expect(res.status).toBe(308)
    expect(res.headers.get('Location')).toBe(TARGET)
    expect(res.headers.get('Deprecation')).toBeTruthy()
    const body = (await res.json()) as any
    expect(body.error.message).toContain(TARGET)
  })
})

describe('gone mode', () => {
  it('returns 410 with a JSON-RPC error naming the new URL', async () => {
    const res = await worker.fetch(initializeRequest(), {
      MODE: 'gone',
      TARGET_URL: TARGET,
    })

    expect(res.status).toBe(410)
    const body = (await res.json()) as any
    expect(body.error.message).toContain(TARGET)
  })
})

describe('OPTIONS preflight', () => {
  it('responds 204 with CORS and deprecation headers', async () => {
    const req = new Request(
      'https://eufemia-mcp.eufemia.workers.dev/mcp',
      {
        method: 'OPTIONS',
      }
    )
    const res = await worker.fetch(req, proxyEnv)

    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain(
      'POST'
    )
    expect(res.headers.get('Deprecation')).toBeTruthy()
  })
})
