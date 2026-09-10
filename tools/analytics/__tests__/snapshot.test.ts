import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const {
  send,
  retrievePortalViews,
  aggregateMcpUsageRaw,
  retrieveMcpUsageDaily,
} = vi.hoisted(() => ({
  send: vi.fn(),
  retrievePortalViews: vi.fn(),
  aggregateMcpUsageRaw: vi.fn(),
  retrieveMcpUsageDaily: vi.fn(),
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

vi.mock('../src/lambda/retrieve.js', () => ({
  retrievePortalViews,
  aggregateMcpUsageRaw,
  retrieveMcpUsageDaily,
}))

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
  retrievePortalViews.mockReset()
  aggregateMcpUsageRaw.mockReset()
  retrieveMcpUsageDaily.mockReset()
  send.mockResolvedValue({})
  aggregateMcpUsageRaw.mockResolvedValue([])
  retrieveMcpUsageDaily.mockResolvedValue([])
  process.env.DATA_BUCKET = 'my-bucket'
  logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
})

afterEach(() => {
  delete process.env.DATA_BUCKET
  logSpy.mockRestore()
})

describe('snapshot generator handler', () => {
  it('queries portal views and writes the snapshot to the expected key', async () => {
    const records = [{ path: '/', env: 'prod', timestamp: 't' }]
    retrievePortalViews.mockResolvedValue(records)

    const result = await handler()

    expect(retrievePortalViews).toHaveBeenCalledWith({ limit: 1000 })
    expect(putCalls()).toHaveLength(1)

    const put = putCalls()[0][0] as Command
    expect(put.input.Key).toBe('snapshots/dashboard.json')
    expect(JSON.parse(put.input.Body as string).portalViews).toEqual(
      records
    )
    expect(result.count).toBe(1)
    expect(result.generatedAt).toEqual(expect.any(String))
  })

  it('propagates a query failure so the schedule surfaces the error', async () => {
    retrievePortalViews.mockRejectedValue(new Error('athena boom'))

    await expect(handler()).rejects.toThrow('athena boom')
    expect(putCalls()).toHaveLength(0)
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(handler()).rejects.toThrow('DATA_BUCKET')
    expect(retrievePortalViews).not.toHaveBeenCalled()
  })
})

describe('mcp usage section', () => {
  it('recomputes the recent rollup and builds the section from the daily table', async () => {
    retrievePortalViews.mockResolvedValue([])
    aggregateMcpUsageRaw.mockResolvedValue([
      {
        dt: '2026-09-10',
        tool: 'docs_search',
        component: '',
        path: '',
        count: 3,
      },
    ])
    retrieveMcpUsageDaily.mockResolvedValue([
      {
        dt: '2026-09-09',
        tool: 'component_props',
        component: 'Button',
        path: '',
        count: 5,
      },
      {
        dt: '2026-09-10',
        tool: 'docs_search',
        component: '',
        path: '',
        count: 3,
      },
      {
        dt: '2026-09-10',
        tool: 'docs_read',
        component: '',
        path: '/uilib/components/button.md',
        count: 2,
      },
    ])

    await handler()

    expect(aggregateMcpUsageRaw).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    )

    const snapshotPut = putCalls().find(
      (call) =>
        (call[0] as Command).input.Key === 'snapshots/dashboard.json'
    )
    const mcp = JSON.parse(
      (snapshotPut![0] as Command).input.Body as string
    ).mcpUsage

    expect(mcp.total).toBe(10)
    expect(mcp.perTool).toContainEqual({
      name: 'component_props',
      count: 5,
    })
    expect(mcp.perComponent).toEqual([{ name: 'Button', count: 5 }])
    expect(mcp.perPath).toEqual([
      { name: '/uilib/components/button.md', count: 2 },
    ])
    expect(mcp.daily).toEqual([
      { date: '2026-09-09', count: 5 },
      { date: '2026-09-10', count: 5 },
    ])
  })

  it('writes the recomputed aggregates to the durable daily rollup prefix', async () => {
    retrievePortalViews.mockResolvedValue([])
    aggregateMcpUsageRaw.mockResolvedValue([
      {
        dt: '2026-09-10',
        tool: 'docs_search',
        component: '',
        path: '',
        count: 3,
      },
    ])
    retrieveMcpUsageDaily.mockResolvedValue([])

    await handler()

    const dailyPut = putCalls().find((call) =>
      String((call[0] as Command).input.Key).startsWith('mcp-usage-daily/')
    )
    expect(dailyPut).toBeDefined()
    expect((dailyPut![0] as Command).input.Key).toBe(
      'mcp-usage-daily/dt=2026-09-10/agg.json'
    )
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
    retrievePortalViews.mockResolvedValue([
      { path: '/', env: 'prod', timestamp: 't' },
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
    retrievePortalViews.mockResolvedValue([])

    const result = await handler()

    expect(result.count).toBe(0)
    const emf = findEmfMetric()
    expect(emf).not.toBeNull()
    expect(emf.SnapshotRecordCount).toBe(0)
  })
})
