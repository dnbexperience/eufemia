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
  it('expires current and noncurrent raw MCP usage objects', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+= \"expire-mcp-usage-raw\"[\s\S]*?^  \}/m
    )?.[0]

    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).toMatch(
      /noncurrent_version_expiration \{\s+noncurrent_days = 1\s+\}/
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
})
