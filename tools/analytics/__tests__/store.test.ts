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

import { storeRecord } from '../src/lambda/store.js'

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
