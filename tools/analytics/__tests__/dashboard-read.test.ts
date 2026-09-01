import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send } = vi.hoisted(() => ({ send: vi.fn() }))

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

import { handler } from '../src/lambda/dashboard-read.js'

type Command = { kind: 'get' | 'put'; input: Record<string, unknown> }
type Snapshot = { generatedAt: string; records: unknown[] }
type Result = { statusCode: number; body: string }

class NoSuchKey extends Error {
  override name = 'NoSuchKey'
}

function getResult(snapshot: Snapshot) {
  return {
    Body: { transformToString: async () => JSON.stringify(snapshot) },
  }
}

function putCalls() {
  return send.mock.calls.filter(
    (call) => (call[0] as Command).kind === 'put'
  )
}

beforeEach(() => {
  send.mockReset()
  process.env.DATA_BUCKET = 'my-bucket'
})

afterEach(() => {
  delete process.env.DATA_BUCKET
})

describe('dashboard-read handler', () => {
  it('serves the stored snapshot without ever writing', async () => {
    const snapshot: Snapshot = {
      generatedAt: new Date().toISOString(),
      records: [
        { type: 'pageview', path: '/', env: 'prod', timestamp: 't' },
      ],
    }
    send.mockResolvedValue(getResult(snapshot))

    const res = (await handler()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual(snapshot)
    expect(putCalls()).toHaveLength(0)
  })

  it('reads the snapshot from the expected key', async () => {
    send.mockResolvedValue(getResult({ generatedAt: 't', records: [] }))

    await handler()

    expect((send.mock.calls[0][0] as Command).input.Key).toBe(
      'records/dashboard-snapshot.json'
    )
  })

  it('returns an empty payload when no snapshot exists yet', async () => {
    send.mockRejectedValue(new NoSuchKey('missing'))

    const res = (await handler()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ generatedAt: '', records: [] })
    expect(putCalls()).toHaveLength(0)
  })

  it('returns an empty payload when the read fails', async () => {
    send.mockRejectedValue(new Error('access denied'))

    const res = (await handler()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual({ generatedAt: '', records: [] })
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(handler()).rejects.toThrow('DATA_BUCKET')
    expect(send).not.toHaveBeenCalled()
  })
})
