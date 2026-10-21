import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { decodeEventBody } from 'eufemia-usage-ingest'
import { isEdgeAuthorized, json } from './http.js'
import { storePortalViews, storeMcpUsage } from './store.js'
import { validatePortalViews } from '../records/portal-view.js'
import { validateMcpUsage } from '../records/mcp-usage.js'
import type { ValidationResult } from '../records/shared.js'

function parseBody(event: APIGatewayProxyEventV2): unknown {
  if (!event.body) {
    return undefined
  }

  return JSON.parse(decodeEventBody(event.body, event.isBase64Encoded))
}

async function handleIngest<T>(
  event: APIGatewayProxyEventV2,
  validate: (payload: unknown) => ValidationResult<T>,
  store: (events: T[]) => Promise<number>
): Promise<APIGatewayProxyResultV2> {
  let payload: unknown
  try {
    payload = parseBody(event)
  } catch {
    return json(400, { error: 'Body must be valid JSON' })
  }

  const validation = validate(payload)
  if (!validation.ok) {
    return json(400, {
      error: 'Validation failed',
      details: validation.errors,
    })
  }

  const accepted = await store(validation.value)

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
    return handleIngest(event, validatePortalViews, storePortalViews)
  }

  if (method === 'POST' && path === '/collect-local-mcp-usage') {
    // Stamp the transport server-side; the local ingest route can only ever
    // write 'local' rows, regardless of what the client sends.
    return handleIngest(event, validateMcpUsage, (events) =>
      storeMcpUsage(events, 'local')
    )
  }

  return json(404, { error: 'Not found' })
}

// The dashboard-read and snapshot-generator functions reuse this build
// artifact; they are wired to `index.dashboardRead` / `index.snapshot` in
// infra/main.tf. Re-exported here so esbuild bundles them into index.mjs.
export { handler as dashboardRead } from './dashboard-read.js'
export { handler as snapshot } from './snapshot.js'
