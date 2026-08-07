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
 * Simple bearer-token check.
 *
 * The expected token is read from the `API_TOKEN` environment variable. When
 * `API_TOKEN` is not set, auth is disabled (useful for local testing only).
 * Returns `true` when the request is authorized.
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
