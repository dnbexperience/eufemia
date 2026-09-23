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
    transport: 'web',
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

    const command = send.mock.calls[0]?.[0] as
      | { input: PutInput }
      | undefined
    expect(command?.input.Bucket).toBe('my-bucket')
    expect(command?.input.Key).toMatch(
      /^mcp-usage\/dt=2026-09-10\/\d+-[0-9a-f-]{36}\.json$/
    )
    expect(command?.input.ContentType).toBe('application/x-ndjson')

    const lines = command?.input.Body.split('\n').map((line) =>
      JSON.parse(line)
    )
    expect(lines).toHaveLength(2)
    expect(lines?.[0].tool).toBe('component_props')
    expect(lines?.[1].tool).toBe('docs_search')
  })

  it('does nothing for an empty batch', async () => {
    await storeMcpUsage('my-bucket', [])
    expect(send).not.toHaveBeenCalled()
  })

  it('keeps records from different dates in their matching partitions', async () => {
    await storeMcpUsage('my-bucket', [
      record(),
      record({ createdat: '2026-09-11T00:00:00.000Z' }),
    ])

    expect(send).toHaveBeenCalledTimes(2)
    const keys = send.mock.calls.map(
      ([command]) => (command as { input: PutInput }).input.Key
    )
    expect(keys).toEqual(
      expect.arrayContaining([
        expect.stringContaining('dt=2026-09-10/'),
        expect.stringContaining('dt=2026-09-11/'),
      ])
    )
  })
})
