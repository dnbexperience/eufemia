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

  it('expires raw component-usage objects on the component-usage/ prefix', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-component-usage-raw"[\s\S]*?^  \}/m
    )?.[0]

    expect(rawUsageRule).toContain('prefix = "component-usage/"')
    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).not.toContain('noncurrent_version_expiration')
  })

  it('defines the component_usage Glue table and wires it into the generator', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "component_usage"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_COMPONENT_USAGE\s+= aws_glue_catalog_table\.component_usage\.name/
    )
  })

  it('defines a durable component_usage_daily rollup with no expiry rule', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "component_usage_daily"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_COMPONENT_USAGE_DAILY\s+= aws_glue_catalog_table\.component_usage_daily\.name/
    )

    // The durable rollup must NOT have its own expiration rule, or history would
    // be lost the same way the raw prefix is trimmed.
    expect(terraform).not.toContain('prefix = "component-usage-daily/"')
  })
})
