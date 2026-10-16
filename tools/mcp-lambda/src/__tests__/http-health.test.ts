import { describe, expect, it, vi } from 'vitest'
import { checkHttpMcp } from '../check-http.ts'

const now = Date.parse('2026-10-16T12:00:00Z')
const sha = 'f5816a2f312a194efdb67e146c6a8b0a5f0ca045'
const meta = {
  eufemiaVersion: '0.0.0-development',
  generatedAt: new Date(now - 2 * 60 * 60_000).toISOString(),
  commit: sha.slice(0, 7),
}
const tools = [
  'docs_meta',
  'docs_search',
  'docs_read',
  'component_find',
  'component_props',
  'component_doc',
  'review_rules',
]
const sleep = async () => {}

type Rpc = {
  jsonrpc: string
  id: number
  method: string
  params: { name?: string; arguments?: unknown; _meta?: unknown }
}
type Change = (
  url: string,
  body?: Rpc,
  init?: RequestInit
) => Response | undefined

function fixture({
  age = 120,
  commit = meta.commit,
  change = (): Response | undefined => undefined,
}: { age?: number; commit?: string; change?: Change } = {}) {
  return vi.fn(
    async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input)
      const body: Rpc | undefined = init?.body
        ? JSON.parse(String(init.body))
        : undefined
      const response = change(url, body, init)
      if (response) {
        return response
      }
      if (url.includes('api.github.com')) {
        return Response.json({
          workflow_runs: [
            {
              event: 'push',
              status: 'completed',
              conclusion: 'success',
              head_repository: { full_name: 'dnbexperience/eufemia' },
              head_sha: sha,
              created_at: new Date(now - age * 60_000).toISOString(),
            },
          ],
        })
      }
      if (url.endsWith('/healthz')) {
        return Response.json({ status: 'ok' })
      }
      if (!body) {
        throw new Error('Expected MCP request')
      }
      const modern =
        (init?.headers as Record<string, string>)[
          'MCP-Protocol-Version'
        ] === '2026-07-28'
      const info = { name: 'eufemia', version: meta.eufemiaVersion }
      let result: Record<string, unknown> = {}
      if (body.method === 'initialize') {
        result = {
          protocolVersion: '2025-11-25',
          serverInfo: info,
          capabilities: { tools: {} },
        }
      } else if (body.method === 'server/discover') {
        result = {
          supportedVersions: ['2026-07-28'],
          capabilities: { tools: {} },
          _meta: { 'io.modelcontextprotocol/serverInfo': info },
        }
      } else if (body.method === 'tools/list') {
        result = { tools: tools.map((name) => ({ name })) }
      } else if (body.params.name === 'docs_meta') {
        result = {
          content: [
            { type: 'text', text: JSON.stringify({ ...meta, commit }) },
          ],
        }
      } else if (body.params.name === 'component_doc') {
        result = {
          content: [
            {
              type: 'text',
              text:
                '# Button\nimport { Button } from "@dnb/eufemia"\n' +
                'Useful documentation. '.repeat(20),
            },
          ],
        }
      }
      return Response.json({
        jsonrpc: '2.0',
        id: 1,
        result: {
          ...result,
          ...(modern ? { resultType: 'complete' } : {}),
        },
      })
    }
  ) as unknown as typeof fetch
}

describe('HTTP MCP production monitoring', () => {
  it('checks liveness, both protocols, required tools, real docs and deployed source', async () => {
    const request = fixture()
    const report = await checkHttpMcp({ fetch: request, now, sleep })
    expect(report.status).toBe('healthy')
    expect(report.checks).toHaveLength(12)
    expect(report.latest).toBe(sha)
    const calls = vi.mocked(request).mock.calls
    expect(calls).toHaveLength(10)
    expect(
      calls.every(([, init]) => init?.redirect === 'error' && init.signal)
    ).toBe(true)
    const toolCalls = calls.filter(([, init]) =>
      String(init?.body).includes('component_doc')
    )
    expect(toolCalls).toHaveLength(2)
    const modern = toolCalls.find(
      ([, init]) =>
        (init?.headers as Record<string, string>)[
          'MCP-Protocol-Version'
        ] === '2026-07-28'
    )
    expect(modern?.[1]?.headers).toMatchObject({
      'MCP-Method': 'tools/call',
      'MCP-Name': 'component_doc',
    })
    expect(modern?.[1]?.body).toContain(
      'io.modelcontextprotocol/clientInfo'
    )
  })

  it('allows rollout time for a source mismatch without hiding availability failures', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({ age: 10, commit: 'a'.repeat(7) }),
      now,
      sleep,
    })
    expect(report.status).toBe('pending')
    expect(report.checks.filter((check) => check.pending)).toHaveLength(2)
    const outage = await checkHttpMcp({
      fetch: fixture({
        age: 10,
        commit: 'a'.repeat(7),
        change: (url) =>
          url.endsWith('/healthz')
            ? new Response('', { status: 503 })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(outage.status).toBe('unhealthy')
  })

  it('fails for stale deployed docs after the rollout window', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({ commit: 'a'.repeat(7) }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks.filter((check) => !check.ok).map((check) => check.name)
    ).toEqual(['2025-11-25 deployed source', '2026-07-28 deployed source'])
  })

  it('detects protocol failures even when the health endpoint is healthy', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (_url, body) =>
          body?.method === 'initialize'
            ? new Response('', { status: 500 })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks.find((check) => check.name === 'HTTP health')?.ok
    ).toBe(true)
    expect(report.checks.find((check) => !check.ok)?.name).toBe(
      '2025-11-25 negotiation'
    )
  })

  it.each([
    { error: { code: -32603, message: 'Internal error' } },
    {
      result: {
        isError: true,
        content: [{ type: 'text', text: 'Read failed' }],
      },
    },
    { result: { content: [{ type: 'text', text: 'Not found' }] } },
    { result: { content: [{ type: 'text', text: '' }] } },
  ])(
    'rejects unsuccessful tool responses with HTTP 200',
    async (payload) => {
      const report = await checkHttpMcp({
        fetch: fixture({
          change: (_url, body) =>
            body?.params.name === 'component_doc'
              ? Response.json({ jsonrpc: '2.0', id: 1, ...payload })
              : undefined,
        }),
        now,
        sleep,
      })
      expect(report.status).toBe('unhealthy')
      expect(
        report.checks
          .filter((check) => !check.ok)
          .every((check) => check.name.endsWith('documentation'))
      ).toBe(true)
    }
  )

  it.each([
    {
      jsonrpc: '2.0',
      id: 99,
      result: { resultType: 'complete', tools: [] },
    },
    {
      jsonrpc: '2.0',
      id: 1,
      result: { resultType: 'partial', tools: [] },
    },
    { jsonrpc: '2.0', id: 1, result: null },
  ])('rejects malformed or incomplete MCP envelopes', async (payload) => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (_url, body) =>
          body?.method === 'tools/list'
            ? Response.json(payload)
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
  })

  it('rejects malformed documentation metadata', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (_url, body) =>
          body?.params.name === 'docs_meta'
            ? Response.json({
                jsonrpc: '2.0',
                id: 1,
                result: {
                  resultType: 'complete',
                  content: [
                    {
                      type: 'text',
                      text: JSON.stringify({
                        commit: '../invalid',
                        generatedAt: 'yesterday',
                      }),
                    },
                  ],
                },
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks
        .filter((check) => !check.ok)
        .every((check) => check.name.endsWith('metadata'))
    ).toBe(true)
  })

  it('rejects missing tools', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (_url, body) =>
          body?.method === 'tools/list'
            ? Response.json({
                jsonrpc: '2.0',
                id: 1,
                result: { tools: [], resultType: 'complete' },
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
  })

  it('checks MCP when GitHub is unavailable', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (url) =>
          url.includes('api.github.com')
            ? new Response('', { status: 503 })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks.filter((check) => !check.ok).map((check) => check.name)
    ).toEqual(['deployment source'])
    expect(
      report.checks.find(
        (check) => check.name === '2026-07-28 documentation'
      )?.ok
    ).toBe(true)
  })

  it('reports a failed deployment workflow', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (url) =>
          url.includes('api.github.com')
            ? Response.json({
                workflow_runs: [
                  {
                    event: 'push',
                    head_repository: {
                      full_name: 'dnbexperience/eufemia',
                    },
                    head_sha: sha,
                    created_at: new Date(now).toISOString(),
                    status: 'completed',
                    conclusion: 'failure',
                  },
                ],
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.find((check) => !check.ok)?.detail).toContain(
      'concluded failure'
    )
  })

  it('supports legacy event streams with CRLF and keepalive events', async () => {
    const baseline = fixture()
    const request: typeof fetch = async (input, init) => {
      const response = await baseline(input, init)
      if (
        String(input).endsWith('/mcp/web') &&
        (init?.headers as Record<string, string>)[
          'MCP-Protocol-Version'
        ] === '2025-11-25'
      ) {
        const data = await response.json()
        return new Response(
          ': heartbeat\r\n\r\nevent: message\r\ndata: ' +
            JSON.stringify(data) +
            '\r\n\r\n',
          { headers: { 'Content-Type': 'text/event-stream' } }
        )
      }
      return response
    }
    expect(
      (await checkHttpMcp({ fetch: request, now, sleep })).status
    ).toBe('healthy')
  })

  it('finishes after a complete MCP event without waiting for stream closure', async () => {
    const baseline = fixture()
    const request: typeof fetch = async (input, init) => {
      const response = await baseline(input, init)
      if (String(input).endsWith('/mcp/web')) {
        const data = await response.json()
        let timer: ReturnType<typeof setTimeout>
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                'data: ' + JSON.stringify(data) + '\n\n'
              )
            )
            timer = setTimeout(
              () =>
                controller.error(new Error('Event stream remained open')),
              20
            )
          },
          cancel() {
            clearTimeout(timer)
          },
        })
        return new Response(stream, {
          headers: { 'Content-Type': 'text/event-stream' },
        })
      }
      return response
    }
    expect(
      (await checkHttpMcp({ fetch: request, now, sleep })).status
    ).toBe('healthy')
  })

  it('retries a transient timeout', async () => {
    const request = vi
      .fn(fixture())
      .mockRejectedValueOnce(new DOMException('Timed out', 'TimeoutError'))
    const report = await checkHttpMcp({ fetch: request, now, sleep })
    expect(report.status).toBe('healthy')
    expect(request).toHaveBeenCalledTimes(11)
  })

  it('rejects oversized replies', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (url) =>
          url.endsWith('/healthz')
            ? new Response('x'.repeat(1024 * 1024 + 1), {
                headers: { 'Content-Type': 'application/json' },
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.find((check) => !check.ok)?.detail).toContain(
      'exceeds 1 MiB'
    )
  })
})

describe('deployment lifecycle and transport isolation', () => {
  it('keeps a running deployment pending even when the previous source matches', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (url) =>
          url.includes('api.github.com')
            ? Response.json({
                workflow_runs: [
                  {
                    event: 'push',
                    status: 'in_progress',
                    head_repository: {
                      full_name: 'dnbexperience/eufemia',
                    },
                    head_sha: sha,
                    created_at: new Date(now - 10 * 60_000).toISOString(),
                  },
                ],
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('pending')
  })

  it('fails a stalled deployment instead of staying pending indefinitely', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({
        change: (url) =>
          url.includes('api.github.com')
            ? Response.json({
                workflow_runs: [
                  {
                    event: 'push',
                    status: 'in_progress',
                    head_repository: {
                      full_name: 'dnbexperience/eufemia',
                    },
                    head_sha: sha,
                    created_at: new Date(
                      now - 2 * 60 * 60_000
                    ).toISOString(),
                  },
                ],
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.find((check) => !check.ok)?.detail).toContain(
      'not completed within one hour'
    )
  })

  it('sends the GitHub token only to the GitHub API', async () => {
    const request = fixture()
    await checkHttpMcp({
      fetch: request,
      githubToken: 'test-token',
      now,
      sleep,
    })
    for (const [url, init] of vi.mocked(request).mock.calls) {
      const authorization = (
        init?.headers as Record<string, string> | undefined
      )?.Authorization
      expect(authorization).toBe(
        String(url).includes('api.github.com')
          ? 'Bearer test-token'
          : undefined
      )
    }
  })

  it('accepts a full source commit without comparing development version strings to npm', async () => {
    const report = await checkHttpMcp({
      fetch: fixture({ commit: sha }),
      now,
      sleep,
    })
    expect(report.status).toBe('healthy')
  })
})

describe('real Lambda transport integration', () => {
  it('runs the monitor through both real MCP transports and detects missing docs', async () => {
    const fs = await import('node:fs/promises')
    const os = await import('node:os')
    const path = await import('node:path')
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-health-'))
    const previous = {
      docs: process.env.EUFEMIA_DOCS_ROOT,
      edge: process.env.EDGE_AUTH_SECRET,
      queue: process.env.USAGE_QUEUE_URL,
    }
    try {
      await fs.mkdir(path.join(root, 'uilib/components'), {
        recursive: true,
      })
      await fs.writeFile(
        path.join(root, 'llm.md'),
        '# Eufemia documentation'
      )
      await fs.writeFile(
        path.join(root, '_meta.json'),
        JSON.stringify(meta)
      )
      await fs.writeFile(
        path.join(root, 'uilib/components/button.md'),
        '# Button\nimport { Button } from "@dnb/eufemia"\n' +
          'Button documentation. '.repeat(20)
      )
      process.env.EUFEMIA_DOCS_ROOT = root
      process.env.EDGE_AUTH_SECRET = 'health-test-secret'
      delete process.env.USAGE_QUEUE_URL
      const { handler } = await import('../transports/lambda-handler.js')
      const baseline = fixture()
      const request: typeof fetch = async (input, init) => {
        const url = new URL(String(input))
        if (url.hostname === 'api.github.com') {
          return baseline(input, init)
        }
        const headers: Record<string, string> = {
          'x-edge-auth': 'health-test-secret',
        }
        new Headers(init?.headers).forEach((value, key) => {
          headers[key] = value
        })
        const result = (await handler({
          rawPath: url.pathname,
          requestContext: {
            domainName: url.hostname,
            http: { method: init?.method ?? 'GET' },
          },
          headers,
          body: init?.body,
        } as unknown as Parameters<typeof handler>[0])) as {
          statusCode: number
          body: string
          headers: Record<string, string>
        }
        return new Response(result.body, {
          status: result.statusCode,
          headers: result.headers,
        })
      }
      const healthy = await checkHttpMcp({ fetch: request, now, sleep })
      expect(healthy.status).toBe('healthy')
      await fs.rm(path.join(root, 'uilib/components/button.md'))
      const broken = await checkHttpMcp({ fetch: request, now, sleep })
      expect(broken.status).toBe('unhealthy')
      expect(
        broken.checks.find((check) => check.name === 'HTTP health')?.ok
      ).toBe(true)
      expect(
        broken.checks
          .filter((check) => !check.ok)
          .map((check) => check.name)
      ).toEqual(['2025-11-25 documentation', '2026-07-28 documentation'])
    } finally {
      for (const [key, value] of Object.entries({
        EUFEMIA_DOCS_ROOT: previous.docs,
        EDGE_AUTH_SECRET: previous.edge,
        USAGE_QUEUE_URL: previous.queue,
      })) {
        if (value === undefined) {
          delete process.env[key]
        } else {
          process.env[key] = value
        }
      }
      await fs.rm(root, { recursive: true, force: true })
    }
  })
})
