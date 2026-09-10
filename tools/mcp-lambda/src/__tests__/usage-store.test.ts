import { describe, it, expect, vi, beforeEach } from 'vitest'

const { send } = vi.hoisted(() => ({ send: vi.fn() }))

vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: class {
    send = send
  },
  PutObjectCommand: class {
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
}))

import { storeMcpUsage } from '../usage-store.js'
import type { McpUsageRecord } from '../records/mcp-usage.js'

type PutInput = {
  Bucket: string
  Key: string
  Body: string
  ContentType: string
}

function record(overrides: Partial<McpUsageRecord> = {}): McpUsageRecord {
  return {
    tool: 'component_props',
    component: 'Button',
    path: '',
    env: 'dev',
    timestamp: '2026-09-10T12:00:00.000Z',
    createdat: '2026-09-10T12:00:00.000Z',
    ...overrides,
  }
}

describe('storeMcpUsage', () => {
  beforeEach(() => {
    send.mockReset()
    send.mockResolvedValue({})
  })

  it('writes records as newline-delimited JSON under a dated mcp-usage key', async () => {
    await storeMcpUsage('my-bucket', [
      record(),
      record({ tool: 'docs_search', component: '' }),
    ])

    expect(send).toHaveBeenCalledTimes(1)

    const cmd = send.mock.calls[0]?.[0] as { input: PutInput } | undefined
    if (!cmd) {
      throw new Error('expected a PutObjectCommand')
    }
    const input = cmd.input
    expect(input.Bucket).toBe('my-bucket')
    expect(input.Key).toMatch(
      /^mcp-usage\/dt=2026-09-10\/\d+-[0-9a-f-]{36}\.json$/
    )
    expect(input.ContentType).toBe('application/x-ndjson')

    const lines = input.Body.split('\n').map((line) => JSON.parse(line))
    expect(lines).toHaveLength(2)
    expect(lines[0].tool).toBe('component_props')
    expect(lines[1].tool).toBe('docs_search')
  })

  it('does nothing for an empty batch', async () => {
    await storeMcpUsage('my-bucket', [])
    expect(send).not.toHaveBeenCalled()
  })
})
