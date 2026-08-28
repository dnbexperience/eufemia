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

import { storeRecord, storePageViews } from '../src/lambda/store.js'

type PutInput = {
  Bucket: string
  Key: string
  Body: string
  ContentType: string
}

describe('storeRecord', () => {
  beforeEach(() => {
    send.mockReset()
    send.mockResolvedValue({})
    process.env.DATA_BUCKET = 'my-bucket'
  })

  afterEach(() => {
    delete process.env.DATA_BUCKET
  })

  it('writes a date-partitioned key and stamps createdAt', async () => {
    const record = await storeRecord({
      id: 'abc-1',
      name: 'Widget',
      value: 42,
    })

    expect(record).toMatchObject({
      id: 'abc-1',
      name: 'Widget',
      value: 42,
    })
    expect(record.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)

    expect(send).toHaveBeenCalledTimes(1)

    const input = send.mock.calls[0][0].input as PutInput
    const dt = record.createdAt.slice(0, 10)

    expect(input).toMatchObject({
      Bucket: 'my-bucket',
      Key: `records/dt=${dt}/abc-1.json`,
      ContentType: 'application/json',
    })
  })

  it('persists lowercase keys matching the Glue columns', async () => {
    const record = await storeRecord({ id: 'abc', name: 'W', value: 1 })

    const input = send.mock.calls[0][0].input as PutInput

    expect(JSON.parse(input.Body)).toEqual({
      id: 'abc',
      name: 'W',
      value: 1,
      createdat: record.createdAt,
    })
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(
      storeRecord({ id: 'a', name: 'b', value: 1 })
    ).rejects.toThrow('DATA_BUCKET')
    expect(send).not.toHaveBeenCalled()
  })
})

describe('storePageViews', () => {
  beforeEach(() => {
    send.mockReset()
    send.mockResolvedValue({})
    process.env.DATA_BUCKET = 'my-bucket'
  })

  afterEach(() => {
    delete process.env.DATA_BUCKET
  })

  it('writes a batch as newline-delimited JSON under a unique key', async () => {
    const count = await storePageViews([
      { path: '/a', timestamp: '2026-08-20T10:00:00.000Z' },
      { path: '/b' },
    ])

    expect(count).toBe(2)
    expect(send).toHaveBeenCalledTimes(1)

    const input = send.mock.calls[0][0].input as PutInput

    expect(input.Bucket).toBe('my-bucket')
    expect(input.Key).toMatch(
      /^records\/dt=\d{4}-\d{2}-\d{2}\/\d+-[0-9a-f-]{36}\.json$/
    )
    expect(input.ContentType).toBe('application/x-ndjson')

    const lines = input.Body.split('\n').map((line) => JSON.parse(line))
    expect(lines).toHaveLength(2)
    expect(lines[0]).toMatchObject({
      type: 'pageview',
      path: '/a',
      timestamp: '2026-08-20T10:00:00.000Z',
    })
    expect(lines[0].createdat).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('falls back to the receive time when no timestamp is given', async () => {
    await storePageViews([{ path: '/a' }])

    const input = send.mock.calls[0][0].input as PutInput
    const line = JSON.parse(input.Body)

    expect(line.timestamp).toBe(line.createdat)
  })

  it('strips the query string and fragment from the path', async () => {
    await storePageViews([{ path: '/a?q=secret#frag' }])

    const input = send.mock.calls[0][0].input as PutInput
    const line = JSON.parse(input.Body)

    expect(line.path).toBe('/a')
  })

  it('stores the env label, defaulting to "unknown" when absent', async () => {
    await storePageViews([{ path: '/a', env: 'prod' }, { path: '/b' }])

    const input = send.mock.calls[0][0].input as PutInput
    const lines = input.Body.split('\n').map((line) => JSON.parse(line))

    expect(lines[0].env).toBe('prod')
    expect(lines[1].env).toBe('unknown')
  })

  it('never stores identifiers or personal data', async () => {
    await storePageViews([{ path: '/a' }])

    const input = send.mock.calls[0][0].input as PutInput
    const line = JSON.parse(input.Body)

    expect(line).not.toHaveProperty('id')
    expect(Object.keys(line).sort()).toEqual([
      'createdat',
      'env',
      'path',
      'timestamp',
      'type',
    ])
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(storePageViews([{ path: '/a' }])).rejects.toThrow(
      'DATA_BUCKET'
    )
    expect(send).not.toHaveBeenCalled()
  })
})
