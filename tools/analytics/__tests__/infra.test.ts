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
    expect(rawUsageRule).toContain('noncurrent_version_expiration {')
  })
})
