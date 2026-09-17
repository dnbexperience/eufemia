import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = path.dirname(fileURLToPath(import.meta.url))
const template = readFileSync(
  path.resolve(dir, '../infra/functions/dashboard-edge-auth.js.tftpl'),
  'utf8'
)

// Render the Terraform template the way main.tf does (jsonencode → a safe JS
// string literal) and return the CloudFront handler for direct testing.
function loadHandler(secret) {
  const rendered = template.replace(
    '${edge_auth_secret}',
    JSON.stringify(secret)
  )

  return new Function(`${rendered}; return handler;`)()
}

const requestWith = (headers) => ({ request: { headers } })

describe('dashboard edge-auth CloudFront function', () => {
  const handler = loadHandler('s3cr3t')

  it('returns 403 when the X-Edge-Auth header is missing', () => {
    expect(handler(requestWith({})).statusCode).toBe(403)
  })

  it('returns 403 when the secret does not match', () => {
    const response = handler(
      requestWith({ 'x-edge-auth': { value: 'wrong' } })
    )

    expect(response.statusCode).toBe(403)
  })

  it('passes the request through when the secret matches', () => {
    const request = { headers: { 'x-edge-auth': { value: 's3cr3t' } } }

    expect(handler({ request })).toBe(request)
  })
})
