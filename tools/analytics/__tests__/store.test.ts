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

import { storePortalViews } from '../src/lambda/store.js'

type PutInput = {
  Bucket: string
  Key: string
  Body: string
  ContentType: string
}

describe('storePortalViews', () => {
  beforeEach(() => {
    send.mockReset()
    send.mockResolvedValue({})
    process.env.DATA_BUCKET = 'my-bucket'
  })

  afterEach(() => {
    delete process.env.DATA_BUCKET
  })

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
    expect(lines[0].createdat).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('falls back to the receive time when no timestamp is given', async () => {
    await storePortalViews([{ path: '/a' }])

    const input = send.mock.calls[0][0].input as PutInput
    const line = JSON.parse(input.Body)

    expect(line.timestamp).toBe(line.createdat)
  })

  it('minimises the stored path', async () => {
    await storePortalViews([{ path: '/a?q=secret&fullscreen#example' }])

    const input = send.mock.calls[0][0].input as PutInput
    const line = JSON.parse(input.Body)

    expect(line.path).toBe('/a?fullscreen#example')
  })

  it('stores the env label, defaulting to "unknown" when absent', async () => {
    await storePortalViews([{ path: '/a', env: 'prod' }, { path: '/b' }])

    const input = send.mock.calls[0][0].input as PutInput
    const lines = input.Body.split('\n').map((line) => JSON.parse(line))

    expect(lines[0].env).toBe('prod')
    expect(lines[1].env).toBe('unknown')
  })

  it('never stores identifiers or personal data', async () => {
    await storePortalViews([{ path: '/a' }])

    const input = send.mock.calls[0][0].input as PutInput
    const line = JSON.parse(input.Body)

    expect(line).not.toHaveProperty('id')
    expect(Object.keys(line).sort()).toEqual([
      'createdat',
      'env',
      'path',
      'status',
      'timestamp',
    ])
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(storePortalViews([{ path: '/a' }])).rejects.toThrow(
      'DATA_BUCKET'
    )
    expect(send).not.toHaveBeenCalled()
  })
})
