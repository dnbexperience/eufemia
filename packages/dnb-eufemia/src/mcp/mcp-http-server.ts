#!/usr/bin/env node

/**
 * Eufemia Docs MCP HTTP Server
 *
 * Exposes the Eufemia documentation MCP tools over HTTP with two transports:
 *
 * - Streamable HTTP (modern, default at `/mcp`) — recommended.
 * - Legacy SSE (`GET /sse` for the stream and `POST /messages` for client → server)
 *   for compatibility with clients like Claude Desktop's "SSE" server type.
 *
 * Designed to be deployable behind any Node.js host (Fly.io, Render, Railway,
 * a Claude flair / proxy server, etc.) by listening on `process.env.PORT`.
 *
 * Environment variables:
 * - `PORT`               HTTP port (default: 8787)
 * - `HOST`               Bind host (default: 0.0.0.0)
 * - `EUFEMIA_DOCS_ROOT`  Path to the Eufemia docs root (default: ./docs).
 * - `MCP_ALLOWED_HOSTS`  Comma-separated allowlist for the `Host` header
 *                        (DNS-rebinding protection). Defaults to off.
 * - `MCP_AUTH_TOKEN`     If set, every request must send
 *                        `Authorization: Bearer <token>`.
 */

import type http from 'node:http'
import { randomUUID, timingSafeEqual } from 'node:crypto'
import path from 'node:path'
import process from 'node:process'

import express from 'express'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js'

import {
  SERVER_INFO,
  createDocsTools,
  registerDocsTools,
  validateDocsRoot,
} from './mcp-docs-server'

// Light local typings so this file compiles without @types/express.
// Express runtime objects are compatible with these shapes.
type ExpressRequest = http.IncomingMessage & {
  query?: Record<string, unknown>
  body?: unknown
  header?: (name: string) => string | undefined
}

type ExpressResponse = http.ServerResponse & {
  status(code: number): ExpressResponse
  json(body: unknown): ExpressResponse
  set(name: string, value: string): ExpressResponse
}

type NextFn = (err?: unknown) => void
type Middleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFn
) => void

type DocsToolsOptions = { docsRoot?: string }

function createLogger(silent: boolean) {
  return (...args: unknown[]) => {
    if (!silent) {
      console.error(...args)
    }
  }
}

function parseAllowedHosts(): string[] | undefined {
  const raw = process.env.MCP_ALLOWED_HOSTS
  if (!raw || raw.trim() === '' || raw.trim() === '*') {
    return undefined
  }
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function buildMcpServer(options: DocsToolsOptions = {}): {
  server: McpServer
  docsRoot: string
} {
  const tools = createDocsTools(options)
  const server = new McpServer(SERVER_INFO)
  registerDocsTools(server, tools)
  return { server, docsRoot: tools.docsRoot }
}

function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder()
  const bufA = encoder.encode(a)
  const bufB = encoder.encode(b)
  if (bufA.length !== bufB.length) {
    return false
  }
  return timingSafeEqual(bufA, bufB)
}

function authMiddleware(token: string | undefined): Middleware {
  if (!token) {
    return (_req, _res, next) => next()
  }
  const expected = `Bearer ${token}`
  return (req, res, next) => {
    const header = String(req.headers['authorization'] ?? '')
    if (safeEqual(header, expected)) {
      next()
      return
    }
    res
      .status(401)
      .set('WWW-Authenticate', 'Bearer realm="eufemia-mcp"')
      .json({
        jsonrpc: '2.0',
        error: { code: -32001, message: 'Unauthorized' },
        id: null,
      })
  }
}

function hostAllowlistMiddleware(
  allowed: string[] | undefined,
  logErr: (...args: unknown[]) => void
): Middleware {
  if (!allowed || allowed.length === 0) {
    return (_req, _res, next) => next()
  }
  const set = new Set(allowed.map((h) => h.toLowerCase()))
  return (req, res, next) => {
    const host = String(req.headers['host'] ?? '')
      .split(':')[0]
      .toLowerCase()
    if (set.has(host)) {
      next()
      return
    }
    logErr(`[eufemia] rejected Host header: ${host}`)
    res.status(403).json({
      jsonrpc: '2.0',
      error: { code: -32002, message: 'Host not allowed' },
      id: null,
    })
  }
}

export type HttpServerOptions = DocsToolsOptions & {
  port?: number
  host?: string
  allowedHosts?: string[]
  authToken?: string
  /** Suppress console output (useful for tests). */
  silent?: boolean
}

export type RunningHttpServer = {
  url: string
  port: number
  host: string
  docsRoot: string
  close: () => Promise<void>
}

export async function startHttpServer(
  options: HttpServerOptions = {}
): Promise<RunningHttpServer> {
  const port = options.port ?? Number(process.env.PORT ?? 8787)
  const host = options.host ?? process.env.HOST ?? '0.0.0.0'
  const allowedHosts = options.allowedHosts ?? parseAllowedHosts()
  const authToken = options.authToken ?? process.env.MCP_AUTH_TOKEN
  const logErr = createLogger(options.silent ?? false)

  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '4mb' }))
  app.use(hostAllowlistMiddleware(allowedHosts, logErr))

  app.get('/healthz', (_req: ExpressRequest, res: ExpressResponse) => {
    res.json({
      ok: true,
      name: SERVER_INFO.name,
      version: SERVER_INFO.version,
      transports: ['streamable-http', 'sse'],
    })
  })

  // ---------- Streamable HTTP (modern transport) ----------
  // Stateful: we keep one transport per `mcp-session-id`.
  const streamableTransports = new Map<
    string,
    StreamableHTTPServerTransport
  >()

  const handleStreamable = async (
    req: ExpressRequest,
    res: ExpressResponse
  ) => {
    try {
      const sessionId =
        (typeof req.header === 'function'
          ? req.header('mcp-session-id')
          : (req.headers['mcp-session-id'] as string | undefined)) ??
        undefined
      const body = req.body

      let transport = sessionId
        ? streamableTransports.get(sessionId)
        : undefined

      if (!transport) {
        const isInit =
          req.method === 'POST' && body && isInitializeRequest(body)

        if (req.method !== 'POST' || !isInit) {
          res.status(400).json({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message:
                'Bad Request: no valid session id and not an initialize request.',
            },
            id: null,
          })
          return
        }

        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
        })

        const localTransport = transport
        transport.onclose = () => {
          const sid = localTransport.sessionId
          if (sid) {
            streamableTransports.delete(sid)
          }
        }

        const { server } = buildMcpServer({ docsRoot: options.docsRoot })
        await server.connect(transport)
      }

      await transport.handleRequest(req, res, body)

      const sid = transport.sessionId
      if (sid && !streamableTransports.has(sid)) {
        streamableTransports.set(sid, transport)
      }
    } catch (e) {
      logErr('[eufemia] streamable error:', e)
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: { code: -32603, message: 'Internal server error' },
          id: null,
        })
      }
    }
  }

  app.post('/mcp', authMiddleware(authToken), handleStreamable)
  app.get('/mcp', authMiddleware(authToken), handleStreamable)
  app.delete('/mcp', authMiddleware(authToken), handleStreamable)

  // ---------- Legacy SSE transport ----------
  // GET /sse opens an SSE stream that delivers an `endpoint` event with the
  // POST URL, including the session id. The client then POSTs JSON-RPC
  // messages to /messages?sessionId=<id>.
  const sseTransports = new Map<string, SSEServerTransport>()

  app.get(
    '/sse',
    authMiddleware(authToken),
    async (req: ExpressRequest, res: ExpressResponse) => {
      try {
        const transport = new SSEServerTransport('/messages', res)
        sseTransports.set(transport.sessionId, transport)

        transport.onclose = () => {
          sseTransports.delete(transport.sessionId)
        }

        const { server } = buildMcpServer({ docsRoot: options.docsRoot })
        await server.connect(transport)

        logErr(`[eufemia] sse connected: ${transport.sessionId}`)

        req.on('close', () => {
          sseTransports.delete(transport.sessionId)
        })
      } catch (e) {
        logErr('[eufemia] sse start error:', e)
        if (!res.headersSent) {
          res.status(500).end('Failed to start SSE')
        }
      }
    }
  )

  app.post(
    '/messages',
    authMiddleware(authToken),
    async (req: ExpressRequest, res: ExpressResponse) => {
      const sessionId = String(
        (req.query as { sessionId?: string } | undefined)?.sessionId ?? ''
      )
      const transport = sessionId
        ? sseTransports.get(sessionId)
        : undefined

      if (!transport) {
        res.status(404).json({
          jsonrpc: '2.0',
          error: { code: -32004, message: 'Unknown sessionId' },
          id: null,
        })
        return
      }

      await transport.handlePostMessage(req, res, req.body)
    }
  )

  // ---------- Boot ----------
  const docsRootAbs = path.resolve(
    options.docsRoot ?? process.env.EUFEMIA_DOCS_ROOT ?? './docs'
  )

  // Validate the docs root before we ever bind the HTTP port. A misconfigured
  // docs root (relative path resolved from the wrong cwd, missing build, etc.)
  // used to silently return empty results for every tool call. Failing fast
  // here makes the misconfiguration impossible to miss.
  await validateDocsRoot(docsRootAbs)

  const httpServer: http.Server = await new Promise((resolve, reject) => {
    const s = app.listen(port, host, () => resolve(s))
    s.on('error', reject)
  })

  const addr = httpServer.address()
  const boundPort =
    typeof addr === 'object' && addr ? addr.port : Number(port)
  const url = `http://${host}:${boundPort}`

  logErr(
    `[eufemia] http listening on ${url} (streamable: /mcp, sse: /sse, post: /messages)`
  )
  logErr(`[eufemia] docsRoot: ${docsRootAbs}`)

  return {
    url,
    port: boundPort,
    host,
    docsRoot: docsRootAbs,
    close: () =>
      new Promise<void>((resolve, reject) => {
        streamableTransports.forEach((t) => {
          void t.close().catch(() => undefined)
        })
        sseTransports.forEach((t) => {
          void t.close().catch(() => undefined)
        })
        streamableTransports.clear()
        sseTransports.clear()
        httpServer.close((err) => (err ? reject(err) : resolve()))
      }),
  }
}

const shouldRun = (() => {
  const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
  const entryName = entryPath ? path.basename(entryPath) : ''
  const allowed = new Set([
    'mcp-http-server.js',
    'mcp-http-server.mjs',
    'mcp-http-server.cjs',
    'mcp-http-server.ts',
    'mcp-http-server.mts',
  ])
  return entryName ? allowed.has(entryName) : false
})()

if (shouldRun) {
  startHttpServer().catch((e) => {
    console.error('[eufemia] fatal:', e)
    process.exit(1)
  })
}
