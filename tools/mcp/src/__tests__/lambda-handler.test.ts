import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createDocsServer } from '../docs-server.js'

async function createTempDocs(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-handler-test-'))
  await fs.writeFile(
    path.join(dir, 'llm.md'),
    '# Eufemia LLM Guide\nUse these tools to explore docs.'
  )
  return dir
}

// Mirror the per-invocation lifecycle the Lambda handler runs against the
// shared `server` singleton: create a fresh transport, connect, handle one
// request, then close. This locks the contract that one McpServer instance
// can be reused across sequential connect/close cycles (warm-container reuse)
// without state bleeding between invocations.
async function invoke(
  server: McpServer,
  body: unknown
): Promise<{ status: number; json: unknown }> {
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

describe('lambda-handler transport reuse', () => {
  let server: McpServer
  let docsRoot: string

  beforeAll(async () => {
    docsRoot = await createTempDocs()
    server = (await createDocsServer({ docsRoot })).server
  })

  afterAll(async () => {
    await fs.rm(docsRoot, { recursive: true, force: true })
  })

  it('handles two sequential invocations on the same server instance', async () => {
    const first = await invoke(server, toolsListRequest)
    const second = await invoke(server, { ...toolsListRequest, id: 2 })

    expect(first.status).toBe(200)
    expect(second.status).toBe(200)

    const firstTools = (
      first.json as { result: { tools: Array<{ name: string }> } }
    ).result.tools.map((tool) => tool.name)
    const secondTools = (
      second.json as { result: { tools: Array<{ name: string }> } }
    ).result.tools.map((tool) => tool.name)

    // The full tool set is served on both invocations, identically — proof
    // that close() resets the transport binding and no state leaks across
    // the shared singleton.
    expect(firstTools).toContain('docs_entry')
    expect(firstTools).toContain('component_props')
    expect(secondTools).toEqual(firstTools)
  })

  it('echoes the request id per invocation', async () => {
    const first = await invoke(server, { ...toolsListRequest, id: 41 })
    const second = await invoke(server, { ...toolsListRequest, id: 42 })

    expect((first.json as { id: number }).id).toBe(41)
    expect((second.json as { id: number }).id).toBe(42)
  })
})
