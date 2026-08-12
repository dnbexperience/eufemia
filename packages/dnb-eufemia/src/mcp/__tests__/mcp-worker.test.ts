// @vitest-environment node

import { createWorkerHandler } from '../worker/create-worker-handler'

const docsBundle = {
  'llm.md': '# Eufemia Docs\n\nWelcome.',
}
const handler = createWorkerHandler(docsBundle)

function postMcp(body: unknown, headers: Record<string, string> = {}) {
  return handler.fetch(
    new Request('https://example.test/mcp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
        ...headers,
      },
      body: JSON.stringify(body),
    }),
    {}
  )
}

describe('MCP Worker protocol versions', () => {
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

    expect(legacy.status).toBe(200)
    expect((await legacy.json()).result.protocolVersion).toBe('2025-11-25')

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
        method: 'tools/list',
        params: { _meta: requestMeta },
      },
      {
        'mcp-protocol-version': '2026-07-28',
        'mcp-method': 'tools/list',
      }
    )

    expect(modern.status).toBe(200)
    expect(
      (await modern.json()).result.tools.map(
        (tool: { name: string }) => tool.name
      )
    ).toContain('docs_entry')
  })
})
