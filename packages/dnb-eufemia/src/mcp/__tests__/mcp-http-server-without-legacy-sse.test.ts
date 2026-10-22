// @vitest-environment node

/**
 * Tests for the Eufemia MCP HTTP server when the optional
 * `@modelcontextprotocol/server-legacy` package is not installed.
 *
 * Kept in its own file because the loader mock applies to the whole module
 * graph of this file.
 */

import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  startHttpServer,
  type RunningHttpServer,
} from '../mcp-http-server'

vi.mock('../legacy-sse', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../legacy-sse')>()),
  loadLegacySse: async () => null,
}))

describe('MCP HTTP server without the legacy SSE package', () => {
  let server: RunningHttpServer
  let docsRoot: string
  const logs: string[] = []

  beforeAll(async () => {
    docsRoot = fs.mkdtempSync(
      path.join(os.tmpdir(), 'eufemia-mcp-no-sse-')
    )
    fs.writeFileSync(
      path.join(docsRoot, 'llm.md'),
      '# Eufemia Docs\n\nWelcome.\n'
    )

    vi.spyOn(console, 'error').mockImplementation((...args) => {
      logs.push(args.map(String).join(' '))
    })

    server = await startHttpServer({
      docsRoot,
      port: 0,
      host: '127.0.0.1',
    })
  }, 15000)

  afterAll(async () => {
    await server?.close()
    vi.restoreAllMocks()
    fs.rmSync(docsRoot, { recursive: true, force: true })
  })

  it('reports only Streamable HTTP in /healthz', async () => {
    const res = await fetch(`${server.url}/healthz`)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.transports).toEqual(['streamable-http'])
  })

  it('says at startup that legacy SSE is off', () => {
    expect(
      logs.some((line) =>
        line.includes(
          '(streamable: /mcp; legacy SSE is off, install @modelcontextprotocol/server-legacy to serve /sse)'
        )
      )
    ).toBe(true)
  })

  it('answers 501 on GET /sse', async () => {
    const res = await fetch(`${server.url}/sse`, {
      headers: { Accept: 'text/event-stream' },
    })

    expect(res.status).toBe(501)
    expect(await res.json()).toEqual({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message:
          'Legacy SSE transport is not available: install @modelcontextprotocol/server-legacy, or use Streamable HTTP at /mcp',
      },
      id: null,
    })
  })

  it('answers 501 on POST /messages', async () => {
    const res = await fetch(`${server.url}/messages?sessionId=any`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' }),
    })

    expect(res.status).toBe(501)
    expect((await res.json()).error.code).toBe(-32000)
  })

  it('still requires the auth token on the legacy routes', async () => {
    const authed = await startHttpServer({
      docsRoot,
      port: 0,
      host: '127.0.0.1',
      authToken: 'secret',
      silent: true,
    })

    try {
      const res = await fetch(`${authed.url}/sse`)
      expect(res.status).toBe(401)
    } finally {
      await authed.close()
    }
  })

  it('still serves Streamable HTTP on /mcp', async () => {
    const res = await fetch(`${server.url}/mcp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-06-18',
          capabilities: {},
          clientInfo: { name: 'test', version: '1.0.0' },
        },
      }),
    })

    expect(res.status).toBe(200)
    expect(await res.text()).toContain('"protocolVersion":"2025-06-18"')
  })
})
