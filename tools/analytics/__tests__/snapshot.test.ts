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

// Silence and capture the EMF metric line the handler logs, so it neither spams
// test output nor needs a per-suite spy; assertions read logSpy.mock.calls.
let logSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  send.mockReset()
  retrievePageViews.mockReset()
  send.mockResolvedValue({})
  process.env.DATA_BUCKET = 'my-bucket'
  logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
})

afterEach(() => {
  delete process.env.DATA_BUCKET
  logSpy.mockRestore()
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

describe('snapshot record-count metric', () => {
  function findEmfMetric() {
    const line = logSpy.mock.calls
      .map((call: unknown[]) => call[0])
      .find(
        (arg: unknown): arg is string =>
          typeof arg === 'string' && arg.includes('SnapshotRecordCount')
      )

    return line ? JSON.parse(line) : null
  }

  afterEach(() => {
    delete process.env.AWS_LAMBDA_FUNCTION_NAME
  })

  it('emits the record count as an EMF metric after a successful run', async () => {
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'eufemia-dev-analytics-snapshot'
    retrievePageViews.mockResolvedValue([
      { type: 'pageview', path: '/', env: 'prod', timestamp: 't' },
    ])

    await handler()

    const emf = findEmfMetric()
    expect(emf).not.toBeNull()
    expect(emf.SnapshotRecordCount).toBe(1)
    expect(emf.FunctionName).toBe('eufemia-dev-analytics-snapshot')
    expect(emf._aws.CloudWatchMetrics[0].Namespace).toBe(
      'Eufemia/Analytics'
    )
    expect(emf._aws.CloudWatchMetrics[0].Metrics[0]).toEqual({
      Name: 'SnapshotRecordCount',
      Unit: 'Count',
    })
  })

  it('emits a zero count when the snapshot is empty', async () => {
    retrievePageViews.mockResolvedValue([])

    const result = await handler()

    expect(result.count).toBe(0)
    const emf = findEmfMetric()
    expect(emf).not.toBeNull()
    expect(emf.SnapshotRecordCount).toBe(0)
  })
})
