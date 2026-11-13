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
type Snapshot = { generatedAt: string; portalViewTrends: unknown }
type Result = { statusCode: number; body: string }

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

// Capture the read-failure log, so it is asserted, not printed.
let errorSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  send.mockReset()
  process.env.DATA_BUCKET = 'my-bucket'
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

afterEach(() => {
  delete process.env.DATA_BUCKET
  errorSpy.mockRestore()
})

describe('dashboard-read handler', () => {
  it('serves the stored snapshot without ever writing', async () => {
    const snapshot: Snapshot = {
      generatedAt: new Date().toISOString(),
      portalViewTrends: {
        perDay: [{ dt: '2026-09-16', env: 'prod', count: 3 }],
        topPathsPerMonth: [],
        perLocaleAndTheme: [],
      },
    }
    send.mockResolvedValue(getResult(snapshot))

    const res = (await handler()) as Result

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body)).toEqual(snapshot)
    expect((send.mock.calls[0][0] as Command).input).toEqual({
      Bucket: 'my-bucket',
      Key: 'snapshots/dashboard.json',
    })
    expect(putCalls()).toHaveLength(0)
  })

  it('returns 503 when the snapshot is missing or unreadable', async () => {
    send.mockRejectedValue(
      Object.assign(new Error('Access Denied'), { name: 'AccessDenied' })
    )

    const res = (await handler()) as Result

    expect(res.statusCode).toBe(503)
    expect(putCalls()).toHaveLength(0)
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('failed to read dashboard snapshot')
    )
  })

  it('returns 503 when the snapshot body is empty', async () => {
    send.mockResolvedValue({ Body: { transformToString: async () => '' } })

    const res = (await handler()) as Result

    expect(res.statusCode).toBe(503)
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(handler()).rejects.toThrow('DATA_BUCKET')
    expect(send).not.toHaveBeenCalled()
  })
})
