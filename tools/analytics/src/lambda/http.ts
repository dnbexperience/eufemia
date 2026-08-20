import { timingSafeEqual } from 'node:crypto'
import type { APIGatewayProxyResultV2 } from 'aws-lambda'

/** Constant-time compare for equal-length inputs; unequal lengths short-circuit. */
function safeEqual(a: string, b: string): boolean {
  const bufA = new TextEncoder().encode(a)
  const bufB = new TextEncoder().encode(b)

  if (bufA.length !== bufB.length) {
    return false
  }

  return timingSafeEqual(bufA, bufB)
}

// Logs a message at most once per process, so a misconfiguration surfaces in
// CloudWatch without repeating on every request.
const warned = new Set<string>()

function warnOnce(message: string): void {
  if (warned.has(message)) {
    return
  }

  warned.add(message)
  // eslint-disable-next-line no-console -- server-side logging to CloudWatch
  console.error(message)
}

/** Build a JSON HTTP response for API Gateway (HTTP API / payload v2). */
export function json(
  statusCode: number,
  body: unknown
): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  }
}

/**
 * Bearer-token check against the `API_TOKEN` environment variable.
 * Returns `true` when the request carries a matching bearer token.
 */
export function isAuthorized(
  headers: Record<string, string | undefined> | undefined
): boolean {
  const expected = process.env.API_TOKEN

  if (!expected) {
    // Fail closed: reject all requests when the token is not configured.
    warnOnce('[eufemia] API_TOKEN is not set — rejecting request')
    return false
  }

  const header = headers?.authorization ?? headers?.Authorization ?? ''
  const [scheme, token] = header.split(' ')

  return (
    scheme === 'Bearer' &&
    token !== undefined &&
    safeEqual(token, expected)
  )
}

/**
 * Origin lock: verifies the `X-Edge-Auth` header (injected by Akamai) against
 * `EDGE_AUTH_SECRET`, so only the edge can reach the origin directly.
 */
export function isEdgeAuthorized(
  headers: Record<string, string | undefined> | undefined
): boolean {
  const expected = process.env.EDGE_AUTH_SECRET

  if (!expected) {
    // Fail closed: reject all requests when the secret is not configured.
    warnOnce('[eufemia] EDGE_AUTH_SECRET is not set — rejecting request')
    return false
  }

  const provided = headers?.['x-edge-auth'] ?? headers?.['X-Edge-Auth']

  return provided !== undefined && safeEqual(provided, expected)
}
