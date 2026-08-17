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
    return true
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
    return true
  }

  const provided = headers?.['x-edge-auth'] ?? headers?.['X-Edge-Auth']

  return provided !== undefined && safeEqual(provided, expected)
}
