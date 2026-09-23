import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const infra = fs.readFileSync(
  path.resolve(import.meta.dirname, '../infra/main.tf'),
  'utf8'
)
const edgeAuth = fs.readFileSync(
  path.resolve(
    import.meta.dirname,
    '../infra/functions/edge-auth.js.tftpl'
  ),
  'utf8'
)

describe('assets infrastructure', () => {
  it('keeps the bucket private behind a CloudFront OAC', () => {
    expect(infra).toContain('block_public_policy     = true')
    expect(infra).toContain(
      'origin_access_control_id = aws_cloudfront_origin_access_control.assets.id'
    )
    expect(infra).toContain('identifiers = ["cloudfront.amazonaws.com"]')
    expect(infra).toContain(
      'values   = [aws_cloudfront_distribution.assets.arn]'
    )
  })

  it('rejects requests that bypass the Akamai edge', () => {
    expect(infra).toContain('event_type   = "viewer-request"')
    expect(edgeAuth).toContain("request.headers['x-origin-verify']")
    expect(edgeAuth).toContain('statusCode: 403')
    expect(edgeAuth).toContain("delete request.headers['x-origin-verify']")
  })

  it('allows cross-origin asset use', () => {
    expect(infra).toContain('access_control_allow_origins')
    expect(infra).toContain('items = ["*"]')
  })
})
