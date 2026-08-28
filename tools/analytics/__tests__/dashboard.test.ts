import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send, retrieveRecords } = vi.hoisted(() => ({
  send: vi.fn(),
  retrieveRecords: vi.fn(),
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

vi.mock('../src/lambda/retrieve.js', () => ({ retrieveRecords }))

import { handleDashboardData } from '../src/lambda/dashboard.js'

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

function fresh(records: unknown[]): Snapshot {
  return { generatedAt: new Date().toISOString(), records }
}

function stale(records: unknown[]): Snapshot {
  return {
    generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    records,
  }
}

function putCalls() {
  return send.mock.calls.filter(
    (call) => (call[0] as Command).kind === 'put'
  )
}

// Default: no snapshot exists (cold start) and writes succeed. Tests override
// the get behaviour as needed.
let onGet: () => Promise<unknown>

beforeEach(() => {
  send.mockReset()
  retrieveRecords.mockReset()
  process.env.DATA_BUCKET = 'my-bucket'

  onGet = () => Promise.reject(new NoSuchKey('missing'))
  send.mockImplementation((cmd: Command) =>
    cmd.kind === 'get' ? onGet() : Promise.resolve({})
  )
})

afterEach(() => {
  delete process.env.DATA_BUCKET
})

describe('handleDashboardData', () => {
  it('serves a fresh snapshot without querying Athena or writing', async () => {
    const snapshot = fresh([{ id: 'a' }])
    onGet = () => Promise.resolve(getResult(snapshot))

    const res = (await handleDashboardData()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual(snapshot)
    expect(retrieveRecords).not.toHaveBeenCalled()
    expect(putCalls()).toHaveLength(0)
  })

  it('recomputes, writes, and returns when the snapshot is stale', async () => {
    onGet = () => Promise.resolve(getResult(stale([{ old: true }])))
    retrieveRecords.mockResolvedValue([{ fresh: true }])

    const res = (await handleDashboardData()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body).records).toEqual([{ fresh: true }])
    expect(retrieveRecords).toHaveBeenCalledWith({ limit: 1000 })
    expect(putCalls()).toHaveLength(1)
  })

  it('recomputes and writes when no snapshot exists', async () => {
    retrieveRecords.mockResolvedValue([{ fresh: true }])

    const res = (await handleDashboardData()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body).records).toEqual([{ fresh: true }])
    expect(putCalls()).toHaveLength(1)
  })

  it('falls back to a stale snapshot when the query fails', async () => {
    const cached = stale([{ old: true }])
    onGet = () => Promise.resolve(getResult(cached))
    retrieveRecords.mockRejectedValue(new Error('athena boom'))

    const res = (await handleDashboardData()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual(cached)
    expect(putCalls()).toHaveLength(0)
  })

  it('throws when the query fails and there is no snapshot', async () => {
    retrieveRecords.mockRejectedValue(new Error('athena boom'))

    await expect(handleDashboardData()).rejects.toThrow('athena boom')
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(handleDashboardData()).rejects.toThrow('DATA_BUCKET')
    expect(send).not.toHaveBeenCalled()
  })
})
