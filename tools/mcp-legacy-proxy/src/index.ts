/**
 * Deprecation compatibility proxy for the legacy Cloudflare-hosted Eufemia MCP
 * endpoint (`eufemia-mcp.eufemia.workers.dev/mcp`).
 *
 * The MCP server moved to `https://server.eufemia.dnb.no/mcp/web`. This Worker
 * keeps the old URL working during the migration window and surfaces the new
 * URL to both clients and agents. Behaviour is controlled by the `MODE` var so
 * the endpoint can be phased down without code changes:
 *
 *   - `proxy`    (default) — forward the request to the new endpoint, add
 *                deprecation headers, and inject a migration notice into the
 *                MCP `initialize` response `instructions`.
 *   - `redirect` — respond `308 Permanent Redirect` to the new endpoint.
 *   - `gone`     — respond `410 Gone` with a migration message.
 *
 * The new server is stateless, POST-only, and returns JSON (not SSE), so this
 * proxy stays intentionally small. It never forwards host-specific or sensitive
 * headers, and logs only method, client name, and status — never credentials or
 * request contents.
 */

export type Env = {
  /** `proxy` (default) | `redirect` | `gone` */
  MODE?: string
  /** Successor endpoint the legacy URL points at. */
  TARGET_URL?: string
  /** RFC 8594 Sunset date (IMF-fixdate). */
  SUNSET?: string
  /** RFC 9745 Deprecation date (structured-field sf-date, e.g. `@1786924800`). */
  DEPRECATION_DATE?: string
}

const DEFAULT_TARGET = 'https://server.eufemia.dnb.no/mcp/web'

// The endpoint moved on 2026-08-17; RFC 9745 sf-date (seconds since epoch).
const DEFAULT_DEPRECATION = '@1786924800'

// Provisional — replace once the sunset date is formally agreed.
const DEFAULT_SUNSET = 'Sun, 15 Nov 2026 00:00:00 GMT'

const MIGRATION_NOTICE =
  'This MCP server URL is deprecated. Update your configuration to https://server.eufemia.dnb.no/mcp/web.'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const mode = env.MODE ?? 'proxy'
    const target = env.TARGET_URL ?? DEFAULT_TARGET

    if (request.method === 'OPTIONS') {
      return decorate(new Response(null, { status: 204 }), env)
    }

    if (mode === 'gone') {
      log(request.method, undefined, 410)
      return decorate(
        jsonRpcResponse(410, movedMessage(target), target),
        env
      )
    }

    if (mode === 'redirect') {
      log(request.method, undefined, 308)
      const res = jsonRpcResponse(308, movedMessage(target), target)
      res.headers.set('Location', target)
      return decorate(res, env)
    }

    // proxy mode
    if (request.method !== 'POST') {
      log(request.method, undefined, 405)
      const res = jsonRpcResponse(405, movedMessage(target), target)
      res.headers.set('Allow', 'POST, OPTIONS')
      return decorate(res, env)
    }

    const bodyText = await request.text()
    const clientName = extractClientName(bodyText)

    let upstream: Response
    try {
      upstream = await fetch(target, {
        method: 'POST',
        headers: buildUpstreamHeaders(request.headers),
        body: bodyText,
      })
    } catch {
      log(request.method, clientName, 502)
      return decorate(
        jsonRpcResponse(
          502,
          `The new Eufemia MCP endpoint is temporarily unreachable. New endpoint: ${target}`,
          target
        ),
        env
      )
    }

    log(request.method, clientName, upstream.status)

    const contentType = upstream.headers.get('content-type') ?? ''

    // Stream SSE straight through without buffering.
    if (contentType.includes('text/event-stream')) {
      return decorate(upstream, env)
    }

    const text = await upstream.text()
    const body = injectMigrationNotice(text, contentType)
    return decorate(
      new Response(body, {
        status: upstream.status,
        headers: upstream.headers,
      }),
      env
    )
  },
}

/** Copy only the request headers the upstream server needs. */
function buildUpstreamHeaders(source: Headers): Headers {
  const headers = new Headers()
  for (const name of [
    'content-type',
    'accept',
    'mcp-session-id',
    'mcp-protocol-version',
  ]) {
    const value = source.get(name)
    if (value) {
      headers.set(name, value)
    }
  }
  return headers
}

/** Add deprecation signalling and CORS to any outgoing response. */
function decorate(response: Response, env: Env): Response {
  const headers = new Headers(response.headers)

  headers.set('Deprecation', env.DEPRECATION_DATE ?? DEFAULT_DEPRECATION)
  headers.set('Sunset', env.SUNSET ?? DEFAULT_SUNSET)
  headers.append(
    'Link',
    `<${env.TARGET_URL ?? DEFAULT_TARGET}>; rel="successor-version"`
  )

  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version'
  )
  headers.set(
    'Access-Control-Expose-Headers',
    'Deprecation, Sunset, Link, Mcp-Session-Id, Mcp-Protocol-Version'
  )

  return new Response(response.body, { status: response.status, headers })
}

/**
 * Add the migration notice to an MCP `initialize` response so clients that show
 * server `instructions` surface it. Any other response passes through untouched.
 */
function injectMigrationNotice(text: string, contentType: string): string {
  if (!contentType.includes('application/json')) {
    return text
  }

  try {
    const json = JSON.parse(text)
    if (json?.result?.serverInfo) {
      const existing =
        typeof json.result.instructions === 'string'
          ? json.result.instructions
          : ''
      json.result.instructions = existing
        ? `${existing}\n\n${MIGRATION_NOTICE}`
        : MIGRATION_NOTICE
      return JSON.stringify(json)
    }
  } catch {
    // Not JSON we can safely rewrite; pass through unchanged.
  }

  return text
}

/** Extract only `clientInfo.name` from an `initialize` request, for logging. */
function extractClientName(bodyText: string): string | undefined {
  try {
    const parsed = JSON.parse(bodyText)
    const messages = Array.isArray(parsed) ? parsed : [parsed]
    for (const message of messages) {
      if (message?.method === 'initialize') {
        const name = message?.params?.clientInfo?.name
        if (typeof name === 'string') {
          return name
        }
      }
    }
  } catch {
    // Non-JSON or unparsable body; nothing to extract.
  }
  return undefined
}

function log(
  method: string,
  client: string | undefined,
  status: number
): void {
  console.log(
    JSON.stringify({
      event: 'legacy_mcp_request',
      method,
      client: client ?? 'unknown',
      status,
    })
  )
}

function movedMessage(target: string): string {
  return `This MCP endpoint has moved. Use ${target} instead.`
}

function jsonRpcResponse(
  status: number,
  message: string,
  _target: string
): Response {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    id: null,
    error: { code: -32000, message },
  })
  return new Response(body, {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
