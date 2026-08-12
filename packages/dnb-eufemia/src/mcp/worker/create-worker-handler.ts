import {
  createMcpHandler,
  isLegacyRequest,
  McpServer,
  WebStandardStreamableHTTPServerTransport,
} from '@modelcontextprotocol/server'

import {
  createServerInfo,
  createDocsTools,
  registerDocsTools,
  validateDocsSource,
} from '../mcp-docs-server'
import { createBundledDocsSource } from '../docs-source'

export type WorkerEnv = {
  MCP_AUTH_TOKEN?: string
}

export type WorkerHandler = {
  fetch(request: Request, env: WorkerEnv): Promise<Response>
}

export function createWorkerHandler(
  docsBundle: Record<string, string>
): WorkerHandler {
  const docsSource = createBundledDocsSource(docsBundle, {
    label: 'worker:docs.bundle.json',
  })
  const bundleMeta = readBundleMeta(docsBundle)
  const serverInfo = createServerInfo(bundleMeta.eufemiaVersion)

  function createServer() {
    const tools = createDocsTools({ source: docsSource })
    const server = new McpServer(serverInfo)
    registerDocsTools(server, tools)
    return server
  }

  const modernMcpHandler = createMcpHandler(createServer, {
    legacy: 'reject',
  })

  let validatedOnce = false

  async function ensureValidated() {
    if (!validatedOnce) {
      await validateDocsSource(docsSource)
      validatedOnce = true
    }
  }

  async function handleMcp(
    request: Request,
    env: WorkerEnv
  ): Promise<Response> {
    const unauthorized = await checkAuth(request, env)
    if (unauthorized) {
      return unauthorized
    }

    if (!(await isLegacyRequest(request))) {
      return modernMcpHandler.fetch(request)
    }

    const server = createServer()
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    })

    try {
      await server.connect(transport)
      return await transport.handleRequest(request)
    } finally {
      await transport.close()
    }
  }

  return {
    async fetch(request: Request, env: WorkerEnv): Promise<Response> {
      const url = new URL(request.url)

      if (url.pathname === '/healthz' && request.method === 'GET') {
        return healthResponse(serverInfo)
      }

      if (url.pathname !== '/mcp') {
        return new Response('Not Found', { status: 404 })
      }

      if (
        request.method !== 'POST' &&
        request.method !== 'GET' &&
        request.method !== 'DELETE'
      ) {
        return new Response('Method Not Allowed', { status: 405 })
      }

      try {
        await ensureValidated()
      } catch (error) {
        return new Response(
          `Eufemia MCP misconfigured: ${(error as Error).message}`,
          { status: 500 }
        )
      }

      return handleMcp(request, env)
    },
  }
}

function readBundleMeta(docsBundle: Record<string, string>) {
  const raw = docsBundle['_meta.json']
  if (raw) {
    try {
      return JSON.parse(raw) as { eufemiaVersion?: string }
    } catch {
      // Use the fallback server version.
    }
  }

  return {}
}

function authResponse(): Response {
  return Response.json(
    {
      jsonrpc: '2.0',
      error: { code: -32001, message: 'Unauthorized' },
      id: null,
    },
    {
      status: 401,
      headers: {
        'www-authenticate': 'Bearer realm="eufemia-mcp"',
      },
    }
  )
}

async function safeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(a)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(a)
  )
  return crypto.subtle.verify('HMAC', key, signature, encoder.encode(b))
}

async function checkAuth(
  request: Request,
  env: WorkerEnv
): Promise<Response | null> {
  const token = env.MCP_AUTH_TOKEN
  if (!token) {
    return null
  }

  const header = request.headers.get('authorization') ?? ''
  const expected = `Bearer ${token}`
  if (
    header.length === expected.length &&
    (await safeEqual(header, expected))
  ) {
    return null
  }

  return authResponse()
}

function healthResponse(serverInfo: { name: string; version: string }) {
  return Response.json({
    ok: true,
    name: serverInfo.name,
    version: serverInfo.version,
    transports: ['streamable-http'],
    runtime: 'cloudflare-worker',
  })
}
