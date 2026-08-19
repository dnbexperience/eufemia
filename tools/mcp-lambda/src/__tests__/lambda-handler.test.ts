import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  WebStandardStreamableHTTPServerTransport,
  type McpServer,
} from '@modelcontextprotocol/server'
import { createDocsServer } from '@dnb/eufemia/src/mcp/mcp-docs-server.js'

async function createTempDocs(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-handler-test-'))
  await fs.writeFile(
    path.join(dir, 'llm.md'),
    '# Eufemia LLM Guide\nUse these tools to explore docs.'
  )
  return dir
}

// Mirror the legacy per-invocation lifecycle used by the Lambda handler:
// create a fresh server and transport, handle one request, then close.
async function invoke(
  createServer: () => Promise<McpServer>,
  body: unknown
): Promise<{ status: number; json: unknown }> {
  const server = await createServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  await server.connect(transport)

  try {
    const request = new Request('https://example.test/mcp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify(body),
    })

    const response = await transport.handleRequest(request)
    const text = await response.text()

    return { status: response.status, json: JSON.parse(text) }
  } finally {
    await transport.close()
  }
}

const toolsListRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {},
}

describe('lambda-handler stateless transport lifecycle', () => {
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs()
  })

  afterAll(async () => {
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  const createServer = async () =>
    (await createDocsServer({ docsRoot })).server

  it('handles two sequential invocations with fresh server instances', async () => {
    const first = await invoke(createServer, toolsListRequest)
    const second = await invoke(createServer, {
      ...toolsListRequest,
      id: 2,
    })

    expect(first.status).toBe(200)
    expect(second.status).toBe(200)

    const firstTools = (
      first.json as { result: { tools: Array<{ name: string }> } }
    ).result.tools.map((tool) => tool.name)
    const secondTools = (
      second.json as { result: { tools: Array<{ name: string }> } }
    ).result.tools.map((tool) => tool.name)

    // The full tool set is served identically with no state shared between
    // invocations.
    expect(firstTools).toContain('docs_entry')
    expect(firstTools).toContain('theme_capabilities')
    expect(firstTools).toContain('component_props')
    expect(secondTools).toEqual(firstTools)
  })

  it('echoes the request id per invocation', async () => {
    const first = await invoke(createServer, {
      ...toolsListRequest,
      id: 41,
    })
    const second = await invoke(createServer, {
      ...toolsListRequest,
      id: 42,
    })

    expect((first.json as { id: number }).id).toBe(41)
    expect((second.json as { id: number }).id).toBe(42)
  })
})

describe('lambda-handler health check', () => {
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs()
    // server.js (imported transitively by the handler) resolves the docs root
    // at module load; point it at the temp docs so the import succeeds.
    process.env.EUFEMIA_DOCS_ROOT = docsRoot
    delete process.env.EDGE_AUTH_SECRET
  })

  afterAll(async () => {
    delete process.env.EUFEMIA_DOCS_ROOT
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  it('answers GET /healthz with 200 without using the MCP transport', async () => {
    const { handler } = await import('../transports/lambda-handler.js')

    const event = {
      rawPath: '/healthz',
      requestContext: { http: { method: 'GET' } },
      headers: {},
    } as unknown as Parameters<typeof handler>[0]

    const result = await handler(event)

    expect(typeof result).toBe('object')
    const response = result as {
      statusCode: number
      body: string
    }
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({ status: 'ok' })
  })
})

describe('lambda-handler protocol versions', () => {
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs()
    process.env.EUFEMIA_DOCS_ROOT = docsRoot
  })

  afterAll(async () => {
    delete process.env.EUFEMIA_DOCS_ROOT
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  async function postMcp(
    body: unknown,
    headers: Record<string, string> = {}
  ) {
    const { handler } = await import('../transports/lambda-handler.js')

    return (await handler({
      rawPath: '/mcp',
      requestContext: {
        domainName: 'example.test',
        http: { method: 'POST' },
      },
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
        ...headers,
      },
      body: JSON.stringify(body),
    } as unknown as Parameters<typeof handler>[0])) as {
      statusCode: number
      body: string
    }
  }

  it('serves MCP 2025 and 2026 from /mcp', async () => {
    const legacy = await postMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-11-25',
        capabilities: {},
        clientInfo: { name: 'legacy-test', version: '1.0.0' },
      },
    })

    expect(legacy.statusCode).toBe(200)
    expect(JSON.parse(legacy.body).result.protocolVersion).toBe(
      '2025-11-25'
    )

    const requestMeta = {
      'io.modelcontextprotocol/protocolVersion': '2026-07-28',
      'io.modelcontextprotocol/clientInfo': {
        name: 'modern-test',
        version: '1.0.0',
      },
      'io.modelcontextprotocol/clientCapabilities': {},
    }
    const modern = await postMcp(
      {
        jsonrpc: '2.0',
        id: 2,
        method: 'server/discover',
        params: { _meta: requestMeta },
      },
      {
        'mcp-protocol-version': '2026-07-28',
        'mcp-method': 'server/discover',
      }
    )

    expect(modern.statusCode).toBe(200)
    expect(JSON.parse(modern.body).result.supportedVersions).toContain(
      '2026-07-28'
    )

    const tools = await postMcp(
      {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/list',
        params: { _meta: requestMeta },
      },
      {
        'mcp-protocol-version': '2026-07-28',
        'mcp-method': 'tools/list',
      }
    )

    expect(tools.statusCode).toBe(200)
    expect(
      JSON.parse(tools.body).result.tools.map(
        (tool: { name: string }) => tool.name
      )
    ).toContain('docs_entry')
  })
})

describe('lambda-handler error handling', () => {
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs()
    process.env.EUFEMIA_DOCS_ROOT = docsRoot
  })

  afterAll(async () => {
    delete process.env.EUFEMIA_DOCS_ROOT
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  it('returns a 500 JSON-RPC error when request processing throws', async () => {
    const { handler } = await import('../transports/lambda-handler.js')

    // A POST event without `headers` makes toWebRequest throw inside the
    // handler's try/catch, exercising the 500 fallback.
    const event = {
      rawPath: '/mcp',
      requestContext: {
        domainName: 'example.test',
        http: { method: 'POST' },
      },
    } as unknown as Parameters<typeof handler>[0]

    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    try {
      const result = await handler(event)
      const response = result as {
        statusCode: number
        body: string
      }

      expect(response.statusCode).toBe(500)
      expect(JSON.parse(response.body).error.code).toBe(-32603)
      expect(errorSpy).toHaveBeenCalled()
    } finally {
      errorSpy.mockRestore()
    }
  })
})

describe('lambda-handler origin auth (X-Edge-Auth)', () => {
  const secret = 'edge-shared-secret'
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs()
    process.env.EUFEMIA_DOCS_ROOT = docsRoot
  })

  afterAll(async () => {
    delete process.env.EUFEMIA_DOCS_ROOT
    delete process.env.EDGE_AUTH_SECRET
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  function mcpEvent(headers: Record<string, string>): unknown {
    return {
      rawPath: '/mcp',
      requestContext: {
        domainName: 'example.test',
        http: { method: 'POST' },
      },
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
        ...headers,
      },
      body: JSON.stringify(toolsListRequest),
    }
  }

  it('rejects with 403 when the secret is set but the header is missing', async () => {
    process.env.EDGE_AUTH_SECRET = secret
    const { handler } = await import('../transports/lambda-handler.js')

    const result = (await handler(
      mcpEvent({}) as Parameters<typeof handler>[0]
    )) as { statusCode: number; body: string }

    expect(result.statusCode).toBe(403)
    expect(JSON.parse(result.body).error.message).toBe('Forbidden')
  })

  it('rejects with 403 when the header does not match', async () => {
    process.env.EDGE_AUTH_SECRET = secret
    const { handler } = await import('../transports/lambda-handler.js')

    const result = (await handler(
      mcpEvent({ 'x-edge-auth': 'wrong-secret' }) as Parameters<
        typeof handler
      >[0]
    )) as { statusCode: number }

    expect(result.statusCode).toBe(403)
  })

  it('lets the request through when the header matches', async () => {
    process.env.EDGE_AUTH_SECRET = secret
    const { handler } = await import('../transports/lambda-handler.js')

    const result = (await handler(
      mcpEvent({ 'x-edge-auth': secret }) as Parameters<typeof handler>[0]
    )) as { statusCode: number }

    expect(result.statusCode).not.toBe(403)
  })

  it('is a no-op when the secret is unset', async () => {
    delete process.env.EDGE_AUTH_SECRET
    const { handler } = await import('../transports/lambda-handler.js')

    const result = (await handler(
      mcpEvent({}) as Parameters<typeof handler>[0]
    )) as { statusCode: number }

    expect(result.statusCode).not.toBe(403)
  })

  it('requires the edge header for /healthz when the secret is set', async () => {
    process.env.EDGE_AUTH_SECRET = secret
    const { handler } = await import('../transports/lambda-handler.js')

    const missing = (await handler({
      rawPath: '/healthz',
      requestContext: { http: { method: 'GET' } },
      headers: {},
    } as unknown as Parameters<typeof handler>[0])) as {
      statusCode: number
    }
    expect(missing.statusCode).toBe(403)

    const withHeader = (await handler({
      rawPath: '/healthz',
      requestContext: { http: { method: 'GET' } },
      headers: { 'x-edge-auth': secret },
    } as unknown as Parameters<typeof handler>[0])) as {
      statusCode: number
    }
    expect(withHeader.statusCode).toBe(200)
  })
})
