import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { isEdgeAuthorized, json } from './http.js'
import { storePortalViews, storeMcpUsage } from './store.js'
import { validatePortalViews } from '../records/portal-view.js'
import { validateMcpUsage } from '../records/mcp-usage.js'

function parseBody(event: APIGatewayProxyEventV2): unknown {
  if (!event.body) {
    return undefined
  }

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body

  return JSON.parse(raw)
}

async function handlePortalViews(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let payload: unknown
  try {
    payload = parseBody(event)
  } catch {
    return json(400, { error: 'Body must be valid JSON' })
  }

  const validation = validatePortalViews(payload)
  if (!validation.ok) {
    return json(400, {
      error: 'Validation failed',
      details: validation.errors,
    })
  }

  const accepted = await storePortalViews(validation.value)

  return json(202, { accepted })
}

async function handleLocalMcpUsage(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let payload: unknown
  try {
    payload = parseBody(event)
  } catch {
    return json(400, { error: 'Body must be valid JSON' })
  }

  const validation = validateMcpUsage(payload)
  if (!validation.ok) {
    return json(400, {
      error: 'Validation failed',
      details: validation.errors,
    })
  }

  // Stamp the transport server-side; the local ingest route can only ever
  // write 'local' rows, regardless of what the client sends.
  const accepted = await storeMcpUsage(validation.value, 'local')

  return json(202, { accepted })
}

/**
 * HTTP API entry point (edge-locked ingest).
 *
 * Routes:
 * - `GET  /healthz`                  liveness probe
 * - `POST /collect-portal-views`     store anonymous portal page views in S3
 * - `POST /collect-local-mcp-usage`  store anonymous local (stdio) MCP usage in S3
 *
 * Every route is gated by the Akamai X-Edge-Auth origin lock; there is no
 * bearer token. The web MCP Lambda writes its own S3 prefix directly via IAM
 * rather than through an HTTP route; the local (stdio) MCP server cannot hold
 * a secret or IAM role, so it uses this route instead.
 */
export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const method = event.requestContext.http.method
  const path = event.rawPath

  if (!isEdgeAuthorized(event.headers)) {
    return json(403, { error: 'Forbidden' })
  }

  if (method === 'GET' && path === '/healthz') {
    return json(200, { status: 'ok' })
  }

  // Public ingest: relies on the edge lock above, so the browser never holds a
  // secret.
  if (method === 'POST' && path === '/collect-portal-views') {
    return handlePortalViews(event)
  }

  if (method === 'POST' && path === '/collect-local-mcp-usage') {
    return handleLocalMcpUsage(event)
  }

  return json(404, { error: 'Not found' })
}

// The dashboard-read and snapshot-generator functions reuse this build
// artifact; they are wired to `index.dashboardRead` / `index.snapshot` in
// infra/main.tf. Re-exported here so esbuild bundles them into index.mjs.
export { handler as dashboardRead } from './dashboard-read.js'
export { handler as snapshot } from './snapshot.js'
