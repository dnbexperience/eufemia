import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send, retrievePageViews } = vi.hoisted(() => ({
  send: vi.fn(),
  retrievePageViews: vi.fn(),
}))

vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: class {
    send = send
  },
  GetObjectCommand: class {
    readonly kind = 'get'
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
  PutObjectCommand: class {
    readonly kind = 'put'
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
}))

vi.mock('../src/lambda/retrieve.js', () => ({ retrievePageViews }))

import { handler } from '../src/lambda/snapshot.js'

type Command = { kind: 'get' | 'put'; input: Record<string, unknown> }

function putCalls() {
  return send.mock.calls.filter(
    (call) => (call[0] as Command).kind === 'put'
  )
}

beforeEach(() => {
  send.mockReset()
  retrievePageViews.mockReset()
  send.mockResolvedValue({})
  process.env.DATA_BUCKET = 'my-bucket'
})

afterEach(() => {
  delete process.env.DATA_BUCKET
})

describe('snapshot generator handler', () => {
  it('queries page views and writes the snapshot to the expected key', async () => {
    const records = [
      { type: 'pageview', path: '/', env: 'prod', timestamp: 't' },
    ]
    retrievePageViews.mockResolvedValue(records)

    const result = await handler()

    expect(retrievePageViews).toHaveBeenCalledWith({ limit: 1000 })
    expect(putCalls()).toHaveLength(1)

    const put = putCalls()[0][0] as Command
    expect(put.input.Key).toBe('records/dashboard-snapshot.json')
    expect(JSON.parse(put.input.Body as string).records).toEqual(records)
    expect(result.count).toBe(1)
    expect(result.generatedAt).toEqual(expect.any(String))
  })

  it('propagates a query failure so the schedule surfaces the error', async () => {
    retrievePageViews.mockRejectedValue(new Error('athena boom'))

    await expect(handler()).rejects.toThrow('athena boom')
    expect(putCalls()).toHaveLength(0)
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(handler()).rejects.toThrow('DATA_BUCKET')
    expect(retrievePageViews).not.toHaveBeenCalled()
  })
})
