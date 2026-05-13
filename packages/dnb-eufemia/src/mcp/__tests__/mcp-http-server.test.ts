/**
 * Tests for the Eufemia MCP HTTP server (SSE + Streamable HTTP transports).
 *
 * The server is started on an ephemeral port so it does not interfere with
 * any locally-running MCP server.
 */

import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  startHttpServer,
  type RunningHttpServer,
} from '../mcp-http-server'

type DocsFixture = {
  docsRoot: string
  cleanup: () => void
}

function createDocsFixture(): DocsFixture {
  const docsRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), 'eufemia-mcp-http-')
  )

  fs.writeFileSync(
    path.join(docsRoot, 'llm.md'),
    '# Eufemia Docs\n\nWelcome.\n'
  )

  return {
    docsRoot,
    cleanup: () => {
      fs.rmSync(docsRoot, { recursive: true, force: true })
    },
  }
}

async function postJson(
  url: string,
  body: unknown,
  extraHeaders: Record<string, string> = {}
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  })
  return res
}

async function readSseEvent(res: Response): Promise<{
  event?: string
  data?: string
}> {
  if (!res.body) {
    return {}
  }
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }
    buffer += decoder.decode(value, { stream: true })

    const idx = buffer.indexOf('\n\n')
    if (idx >= 0) {
      const block = buffer.slice(0, idx)
      reader.releaseLock()
      try {
        await res.body.cancel()
      } catch {
        // ignore
      }

      const out: { event?: string; data?: string } = {}
      for (const line of block.split('\n')) {
        if (line.startsWith('event:')) {
          out.event = line.slice('event:'.length).trim()
        } else if (line.startsWith('data:')) {
          out.data = (out.data ?? '') + line.slice('data:'.length).trim()
        }
      }
      return out
    }
  }
  return {}
}

describe('mcp-http-server', () => {
  let docsRoot: string
  let cleanup: () => void
  let server: RunningHttpServer

  beforeAll(async () => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup

    server = await startHttpServer({
      docsRoot,
      port: 0,
      host: '127.0.0.1',
    })
  }, 15000)

  afterAll(async () => {
    await server.close()
    cleanup()
  })

  it('serves /healthz', async () => {
    const res = await fetch(`${server.url}/healthz`)
    expect(res.status).toBe(200)
    const json = (await res.json()) as Record<string, unknown>
    expect(json.ok).toBe(true)
    expect(json.name).toBe('eufemia')
    expect(json.transports).toEqual(['streamable-http', 'sse'])
  })

  describe('streamable HTTP transport', () => {
    it('rejects non-initialize requests without a session id', async () => {
      const res = await postJson(`${server.url}/mcp`, {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
      })
      expect(res.status).toBe(400)
      const json = (await res.json()) as { error?: { code?: number } }
      expect(json.error?.code).toBe(-32000)
    })

    it('returns serverInfo on initialize and exposes tools', async () => {
      const initRes = await postJson(`${server.url}/mcp`, {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'eufemia-test', version: '0.0.0' },
        },
      })
      expect(initRes.status).toBe(200)
      const sessionId = initRes.headers.get('mcp-session-id')
      expect(sessionId).toBeTruthy()

      const initEvent = await readSseEvent(initRes)
      expect(initEvent.event).toBe('message')
      const initJson = JSON.parse(initEvent.data ?? '{}') as {
        result?: { serverInfo?: { name?: string } }
      }
      expect(initJson.result?.serverInfo?.name).toBe('eufemia')

      const listRes = await postJson(
        `${server.url}/mcp`,
        {
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/list',
        },
        { 'mcp-session-id': sessionId as string }
      )
      expect(listRes.status).toBe(200)

      const listEvent = await readSseEvent(listRes)
      const listJson = JSON.parse(listEvent.data ?? '{}') as {
        result?: { tools?: Array<{ name: string }> }
      }
      const toolNames = (listJson.result?.tools ?? []).map((t) => t.name)
      expect(toolNames).toEqual(
        expect.arrayContaining([
          'docs_entry',
          'docs_index',
          'docs_list',
          'docs_read',
          'docs_search',
          'component_find',
          'component_doc',
          'component_api',
          'component_props',
        ])
      )
    })
  })

  describe('legacy SSE transport', () => {
    it('emits an endpoint event with the POST URL', async () => {
      const res = await fetch(`${server.url}/sse`, {
        headers: { Accept: 'text/event-stream' },
      })
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain(
        'text/event-stream'
      )

      const event = await readSseEvent(res)
      expect(event.event).toBe('endpoint')
      expect(event.data).toMatch(/^\/messages\?sessionId=/)
    })

    it('returns 404 when posting to /messages with an unknown sessionId', async () => {
      const res = await postJson(
        `${server.url}/messages?sessionId=does-not-exist`,
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/list',
        }
      )
      expect(res.status).toBe(404)
      const json = (await res.json()) as { error?: { code?: number } }
      expect(json.error?.code).toBe(-32004)
    })
  })
})

describe('mcp-http-server docs root validation', () => {
  it('refuses to start when the docs root does not exist', async () => {
    const missing = path.join(
      os.tmpdir(),
      `eufemia-mcp-missing-${Date.now()}-${Math.random().toString(36).slice(2)}`
    )

    await expect(
      startHttpServer({
        docsRoot: missing,
        port: 0,
        host: '127.0.0.1',
      })
    ).rejects.toThrow(/does not exist/)
  })

  it('refuses to start when the docs root is empty (no llm.md, no markdown)', async () => {
    const emptyDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'eufemia-mcp-empty-')
    )

    try {
      await expect(
        startHttpServer({
          docsRoot: emptyDir,
          port: 0,
          host: '127.0.0.1',
        })
      ).rejects.toThrow(/empty or unbuilt/)
    } finally {
      fs.rmSync(emptyDir, { recursive: true, force: true })
    }
  })
})

describe('mcp-http-server with auth token', () => {
  let docsRoot: string
  let cleanup: () => void
  let server: RunningHttpServer

  beforeAll(async () => {
    const fixture = createDocsFixture()
    docsRoot = fixture.docsRoot
    cleanup = fixture.cleanup

    server = await startHttpServer({
      docsRoot,
      port: 0,
      host: '127.0.0.1',
      authToken: 'secret-token',
    })
  }, 15000)

  afterAll(async () => {
    await server.close()
    cleanup()
    delete process.env.MCP_AUTH_TOKEN
  })

  it('rejects unauthenticated requests to /mcp', async () => {
    const res = await postJson(`${server.url}/mcp`, {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'test', version: '0.0.0' },
      },
    })
    expect(res.status).toBe(401)
  })

  it('accepts requests with the correct bearer token', async () => {
    const res = await postJson(
      `${server.url}/mcp`,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'test', version: '0.0.0' },
        },
      },
      { Authorization: 'Bearer secret-token' }
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('mcp-session-id')).toBeTruthy()
  })
})
