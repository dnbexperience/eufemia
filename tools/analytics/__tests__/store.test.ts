import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

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

import { storePortalViews, storeMcpUsage } from '../src/lambda/store.js'

type PutInput = {
  Bucket: string
  Key: string
  Body: string
  ContentType: string
}

beforeEach(() => {
  send.mockReset()
  send.mockResolvedValue({})
  process.env.DATA_BUCKET = 'my-bucket'
})

afterEach(() => {
  delete process.env.DATA_BUCKET
})

describe('storePortalViews', () => {
  it('writes a batch as newline-delimited JSON under a unique portal-views key', async () => {
    const count = await storePortalViews([
      { path: '/a', timestamp: '2026-08-20T10:00:00.000Z' },
      { path: '/b' },
    ])

    expect(count).toBe(2)
    expect(send).toHaveBeenCalledTimes(1)

    const input = send.mock.calls[0][0].input as PutInput

    expect(input.Bucket).toBe('my-bucket')
    expect(input.Key).toMatch(
      /^portal-views\/dt=\d{4}-\d{2}-\d{2}\/\d+-[0-9a-f-]{36}\.json$/
    )
    expect(input.ContentType).toBe('application/x-ndjson')

    const lines = input.Body.split('\n').map((line) => JSON.parse(line))
    expect(lines).toHaveLength(2)
    expect(lines[0]).toMatchObject({
      path: '/a',
      timestamp: '2026-08-20T10:00:00.000Z',
    })
    expect(lines[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(lines[1]).toMatchObject({
      path: '/b',
      env: 'unknown',
      timestamp: lines[1].created_at,
    })
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(storePortalViews([{ path: '/a' }])).rejects.toThrow(
      'DATA_BUCKET'
    )
    expect(send).not.toHaveBeenCalled()
  })
})

describe('storeMcpUsage', () => {
  it('writes a batch as newline-delimited JSON under a unique mcp-usage key', async () => {
    const count = await storeMcpUsage(
      [
        { tool: 'docs_entry' },
        { tool: 'component_doc', component: 'Button' },
      ],
      'local'
    )

    expect(count).toBe(2)
    expect(send).toHaveBeenCalledTimes(1)

    const input = send.mock.calls[0][0].input as PutInput

    expect(input.Bucket).toBe('my-bucket')
    expect(input.Key).toMatch(
      /^mcp-usage\/dt=\d{4}-\d{2}-\d{2}\/\d+-[0-9a-f-]{36}\.json$/
    )
    expect(input.ContentType).toBe('application/x-ndjson')

    const lines = input.Body.split('\n').map((line) => JSON.parse(line))
    expect(lines).toHaveLength(2)
    expect(lines[1]).toMatchObject({
      tool: 'component_doc',
      component: 'Button',
      transport: 'local',
    })
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(
      storeMcpUsage([{ tool: 'docs_entry' }], 'local')
    ).rejects.toThrow('DATA_BUCKET')
    expect(send).not.toHaveBeenCalled()
  })
})
