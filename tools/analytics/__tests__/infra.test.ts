import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = path.dirname(fileURLToPath(import.meta.url))
const terraform = readFileSync(
  path.resolve(dir, '../infra/main.tf'),
  'utf8'
)

describe('analytics infrastructure', () => {
  it('expires raw MCP usage objects and cleans noncurrent versions bucket-wide', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-mcp-usage-raw"[\s\S]*?^  \}/m
    )?.[0]

    // Raw usage keys are unique (write-once), so this rule only expires current
    // versions; noncurrent cleanup is handled by the bucket-wide rule below.
    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).not.toContain('noncurrent_version_expiration')

    const noncurrentRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-noncurrent-versions"[\s\S]*?^  \}/m
    )?.[0]

    expect(noncurrentRule).toMatch(
      /filter \{\}\s+noncurrent_version_expiration \{\s+noncurrent_days = \d+\s+\}/
    )
  })

  it('allows the snapshot generator to complete three Athena queries', () => {
    const snapshotLambda = terraform.match(
      /resource \"aws_lambda_function\" \"snapshot\" \{[\s\S]*?^\}/m
    )?.[0]
    const timeout = Number(
      snapshotLambda?.match(/timeout\s+=\s+(\d+)/)?.[1]
    )

    expect(timeout).toBeGreaterThanOrEqual(90)
  })

  it('locks the dashboard origin to the Akamai edge via a viewer-request function', () => {
    // The function validates the shared X-Edge-Auth secret Akamai injects.
    const originLock = terraform.match(
      /resource \"aws_cloudfront_function\" \"dashboard_edge_auth\" \{[\s\S]*?^\}/m
    )?.[0]

    expect(originLock).toContain('functions/dashboard-edge-auth.js.tftpl')
    expect(originLock).toContain(
      'edge_auth_secret = jsonencode(var.edge_auth_secret)'
    )

    // It must run on every viewer request to the dashboard distribution.
    const distribution = terraform.match(
      /resource \"aws_cloudfront_distribution\" \"dashboard\" \{[\s\S]*?^\}/m
    )?.[0]
    const association = distribution?.match(
      /function_association \{[\s\S]*?\}/
    )?.[0]

    expect(association).toContain('event_type   = "viewer-request"')
    expect(association).toContain(
      'aws_cloudfront_function.dashboard_edge_auth.arn'
    )
  })
})
