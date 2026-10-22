import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const {
  send,
  aggregatePortalViewsRaw,
  retrievePortalViewsPerDay,
  retrieveTopPortalPathsPerMonth,
  retrievePortalViewsPerLocaleAndTheme,
  aggregateMcpUsageRaw,
  retrieveMcpUsageDaily,
  aggregateLocalMcpUsageByVersion,
  aggregateComponentUsageRaw,
  retrieveComponentUsageTotals,
} = vi.hoisted(() => ({
  send: vi.fn(),
  aggregatePortalViewsRaw: vi.fn(),
  retrievePortalViewsPerDay: vi.fn(),
  retrieveTopPortalPathsPerMonth: vi.fn(),
  retrievePortalViewsPerLocaleAndTheme: vi.fn(),
  aggregateMcpUsageRaw: vi.fn(),
  retrieveMcpUsageDaily: vi.fn(),
  aggregateLocalMcpUsageByVersion: vi.fn(),
  aggregateComponentUsageRaw: vi.fn(),
  retrieveComponentUsageTotals: vi.fn(),
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
  aggregatePortalViewsRaw,
  retrievePortalViewsPerDay,
  retrieveTopPortalPathsPerMonth,
  retrievePortalViewsPerLocaleAndTheme,
  aggregateMcpUsageRaw,
  retrieveMcpUsageDaily,
  aggregateLocalMcpUsageByVersion,
  aggregateComponentUsageRaw,
  retrieveComponentUsageTotals,
}))

import { buildComponentUsage, handler } from '../src/lambda/snapshot.js'

type Command = {
  kind: 'get' | 'put'
  input: Record<string, unknown>
}

function putCalls() {
  return send.mock.calls.filter(
    (call) => (call[0] as Command).kind === 'put'
  )
}

function findDailyRollupPut(prefix: string): Command | undefined {
  return putCalls()
    .map((call) => call[0] as Command)
    .find((put) => String(put.input.Key).startsWith(prefix))
}

function snapshotBody() {
  const put = putCalls()
    .map((call) => call[0] as Command)
    .find((command) => command.input.Key === 'snapshots/dashboard.json')

  return JSON.parse(put?.input.Body as string)
}

function utcDate(daysAgo: number): string {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - daysAgo)

  return date.toISOString().slice(0, 10)
}

// Silence and capture the EMF metric line the handler logs, so it neither spams
// test output nor needs a per-suite spy; assertions read logSpy.mock.calls.
let logSpy: ReturnType<typeof vi.spyOn>
let errorSpy: ReturnType<typeof vi.spyOn>
let warnSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  send.mockReset()
  aggregatePortalViewsRaw.mockReset()
  retrievePortalViewsPerDay.mockReset()
  retrieveTopPortalPathsPerMonth.mockReset()
  retrievePortalViewsPerLocaleAndTheme.mockReset()
  aggregateMcpUsageRaw.mockReset()
  retrieveMcpUsageDaily.mockReset()
  aggregateLocalMcpUsageByVersion.mockReset()
  aggregateComponentUsageRaw.mockReset()
  retrieveComponentUsageTotals.mockReset()
  send.mockResolvedValue({})
  aggregatePortalViewsRaw.mockResolvedValue([])
  retrievePortalViewsPerDay.mockResolvedValue([])
  retrieveTopPortalPathsPerMonth.mockResolvedValue([])
  retrievePortalViewsPerLocaleAndTheme.mockResolvedValue([])
  aggregateMcpUsageRaw.mockResolvedValue([])
  retrieveMcpUsageDaily.mockResolvedValue([])
  aggregateLocalMcpUsageByVersion.mockResolvedValue([])
  aggregateComponentUsageRaw.mockResolvedValue([])
  retrieveComponentUsageTotals.mockResolvedValue([])
  process.env.DATA_BUCKET = 'my-bucket'
  logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
})

afterEach(() => {
  delete process.env.DATA_BUCKET
  logSpy.mockRestore()
  errorSpy.mockRestore()
  warnSpy.mockRestore()
})

describe('snapshot generator handler', () => {
  it('builds the page-view trends from the rollup and writes the snapshot to the expected key', async () => {
    const perDay = [{ dt: '2026-09-20', env: 'prod', count: 5 }]
    const topPathsPerMonth = [
      { month: '2026-09', env: '', path: '/', count: 5 },
    ]
    const perLocaleAndTheme = [
      { env: 'prod', locale: 'en-GB', theme: 'ui', count: 5 },
    ]
    retrievePortalViewsPerDay.mockResolvedValue(perDay)
    retrieveTopPortalPathsPerMonth.mockResolvedValue(topPathsPerMonth)
    retrievePortalViewsPerLocaleAndTheme.mockResolvedValue(
      perLocaleAndTheme
    )

    const result = await handler()

    expect(putCalls()).toHaveLength(1)
    expect((putCalls()[0][0] as Command).input.Key).toBe(
      'snapshots/dashboard.json'
    )
    expect(snapshotBody().portalViewTrends).toEqual({
      perDay,
      topPathsPerMonth,
      perLocaleAndTheme,
    })
    expect(snapshotBody()).not.toHaveProperty('portalViews')
    expect(result.generatedAt).toEqual(expect.any(String))
  })

  it('reads 13 whole calendar months, ranking the top 20 paths per month', async () => {
    const now = new Date()
    const expectedSince = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 12, 1)
    )
      .toISOString()
      .slice(0, 10)

    await handler()

    expect(retrievePortalViewsPerDay).toHaveBeenCalledWith(expectedSince)
    expect(retrieveTopPortalPathsPerMonth).toHaveBeenCalledWith(
      expectedSince,
      20
    )
    expect(retrievePortalViewsPerLocaleAndTheme).toHaveBeenCalledWith(
      expectedSince
    )
  })

  it('refreshes the rollup before reading the trends, so they include today', async () => {
    aggregatePortalViewsRaw.mockResolvedValue([
      { dt: utcDate(0), path: '/', env: 'prod', count: 1 },
    ])

    await handler()

    const rollupPutOrder = send.mock.invocationCallOrder[0]
    expect(findDailyRollupPut('portal-views-daily/')).toBeDefined()
    expect(rollupPutOrder).toBeLessThan(
      retrievePortalViewsPerDay.mock.invocationCallOrder[0]
    )
  })

  it('writes the recomputed page-view aggregates to the durable daily rollup prefix', async () => {
    aggregatePortalViewsRaw.mockResolvedValue([
      {
        dt: '2026-09-20',
        path: '/',
        env: 'prod',
        status: 'ok',
        locale: 'en-GB',
        theme: 'ui',
        color_scheme: 'dark',
        referrer: 'search',
        via_search: 'yes',
        count: 3,
      },
    ])

    await handler()

    expect(aggregatePortalViewsRaw).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    )

    expect(findDailyRollupPut('portal-views-daily/')).toMatchObject({
      input: {
        Key: 'portal-views-daily/dt=2026-09-20/agg.json',
        Body: JSON.stringify({
          path: '/',
          env: 'prod',
          status: 'ok',
          locale: 'en-GB',
          theme: 'ui',
          color_scheme: 'dark',
          referrer: 'search',
          via_search: 'yes',
          count: 3,
        }),
      },
    })
  })

  it('backfills from an explicit sinceDt on the invocation event', async () => {
    await handler({ sinceDt: '2024-01-01' })

    expect(aggregatePortalViewsRaw).toHaveBeenCalledWith('2024-01-01')
    expect(aggregateMcpUsageRaw).toHaveBeenCalledWith('2024-01-01')
  })

  it('recomputes only the recent tail on a scheduled run (no sinceDt)', async () => {
    const expectedTail = new Date()
    expectedTail.setUTCDate(expectedTail.getUTCDate() - 6)
    const expectedSince = expectedTail.toISOString().slice(0, 10)

    await handler()

    expect(aggregatePortalViewsRaw).toHaveBeenCalledWith(expectedSince)
    expect(aggregatePortalViewsRaw).not.toHaveBeenCalledWith('2024-01-01')
    expect(aggregateMcpUsageRaw).toHaveBeenCalledWith(expectedSince)
  })

  it('still writes the snapshot from the existing history when the rollup refresh fails', async () => {
    const perDay = [{ dt: '2026-09-20', env: 'prod', count: 5 }]
    retrievePortalViewsPerDay.mockResolvedValue(perDay)
    aggregatePortalViewsRaw.mockRejectedValue(new Error('athena boom'))

    await handler()

    expect(snapshotBody().portalViewTrends.perDay).toEqual(perDay)
    expect(errorSpy).toHaveBeenCalled()

    const failureMetric = logSpy.mock.calls
      .map((call: unknown[]) => call[0])
      .map((line: unknown) => {
        try {
          return JSON.parse(line as string) as Record<string, unknown>
        } catch {
          return null
        }
      })
      .find(
        (entry: Record<string, unknown> | null) =>
          entry?.PortalViewsRollupFailure === 1
      )
    expect(failureMetric).toBeDefined()
  })

  it('propagates a trend read failure so the previous snapshot stays and the schedule surfaces the error', async () => {
    retrieveTopPortalPathsPerMonth.mockRejectedValue(
      new Error('athena boom')
    )

    await expect(handler()).rejects.toThrow('athena boom')
    expect(
      putCalls().find(
        (call) =>
          (call[0] as Command).input.Key === 'snapshots/dashboard.json'
      )
    ).toBeUndefined()
  })

  it('throws when DATA_BUCKET is not set', async () => {
    delete process.env.DATA_BUCKET

    await expect(handler()).rejects.toThrow('DATA_BUCKET')
    expect(retrievePortalViewsPerDay).not.toHaveBeenCalled()
  })
})

describe('mcp usage section', () => {
  it('recomputes the recent rollup and builds one section per transport from the daily table', async () => {
    aggregateMcpUsageRaw.mockResolvedValue([
      {
        dt: '2026-09-10',
        transport: 'web',
        tool: 'docs_search',
        component: '',
        path: '',
        count: 3,
      },
    ])
    retrieveMcpUsageDaily.mockResolvedValue([
      {
        dt: '2026-09-09',
        transport: 'web',
        tool: 'component_props',
        component: 'Button',
        path: '',
        count: 5,
      },
      {
        dt: '2026-09-10',
        transport: 'web',
        tool: 'docs_search',
        component: '',
        path: '',
        count: 3,
      },
      {
        dt: '2026-09-10',
        transport: 'local',
        tool: 'docs_read',
        component: '',
        path: '/uilib/components/',
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

    expect(mcp.web).toEqual({
      total: 8,
      perTool: [
        { name: 'component_props', count: 5 },
        { name: 'docs_search', count: 3 },
      ],
      perComponent: [{ name: 'Button', count: 5 }],
      perPath: [],
      missedLookups: 0,
      perLikelyComponent: [],
      daily: [
        { date: '2026-09-09', count: 5 },
        { date: '2026-09-10', count: 3 },
      ],
    })
    expect(mcp.local).toEqual({
      total: 2,
      perTool: [{ name: 'docs_read', count: 2 }],
      perComponent: [],
      perPath: [{ name: '/uilib/components/', count: 2 }],
      missedLookups: 0,
      perLikelyComponent: [],
      daily: [{ date: '2026-09-10', count: 2 }],
      perVersion: [],
    })
  })

  it('counts missed component lookups and ranks the components they matched', async () => {
    retrieveMcpUsageDaily.mockResolvedValue([
      {
        dt: '2026-10-14',
        transport: 'web',
        tool: 'component_doc',
        component: '',
        path: '',
        component_missed: true,
        likely_component: 'date-picker',
        count: 4,
      },
      {
        dt: '2026-10-14',
        transport: 'web',
        tool: 'component_doc',
        component: '',
        path: '',
        component_missed: true,
        likely_component: '',
        count: 2,
      },
      {
        dt: '2026-10-14',
        transport: 'web',
        tool: 'component_doc',
        component: 'button',
        path: '',
        component_missed: false,
        likely_component: '',
        count: 5,
      },
    ])

    await handler()

    const snapshotPut = putCalls().find(
      (call) =>
        (call[0] as Command).input.Key === 'snapshots/dashboard.json'
    )
    const mcp = JSON.parse(
      (snapshotPut?.[0] as Command).input.Body as string
    ).mcpUsage

    expect(mcp.web.total).toBe(11)
    expect(mcp.web.missedLookups).toBe(6)
    expect(mcp.web.perLikelyComponent).toEqual([
      { name: 'date-picker', count: 4 },
    ])
    expect(mcp.local.missedLookups).toBe(0)
  })

  it('leaves rollup rows without a transport out of both sections and warns', async () => {
    retrieveMcpUsageDaily.mockResolvedValue([
      {
        dt: '2026-09-01',
        transport: '',
        tool: 'docs_read',
        component: '',
        path: '',
        count: 7,
      },
      {
        dt: '2026-09-10',
        transport: 'web',
        tool: 'docs_read',
        component: '',
        path: '',
        count: 2,
      },
    ])

    await handler()

    const snapshotPut = putCalls().find(
      (call) =>
        (call[0] as Command).input.Key === 'snapshots/dashboard.json'
    )
    const mcp = JSON.parse(
      (snapshotPut?.[0] as Command).input.Body as string
    ).mcpUsage

    expect(mcp.web.total).toBe(2)
    expect(mcp.local.total).toBe(0)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('1 MCP usage rollup rows have no transport')
    )
  })

  it('writes the recomputed aggregates to the durable daily rollup prefix', async () => {
    aggregateMcpUsageRaw.mockResolvedValue([
      {
        dt: '2026-09-10',
        transport: 'local',
        tool: 'docs_search',
        component: '',
        path: '',
        component_missed: false,
        likely_component: '',
        count: 3,
      },
    ])
    retrieveMcpUsageDaily.mockResolvedValue([])

    await handler()

    expect(findDailyRollupPut('mcp-usage-daily/')).toMatchObject({
      input: {
        Key: 'mcp-usage-daily/dt=2026-09-10/agg.json',
        Body: JSON.stringify({
          transport: 'local',
          tool: 'docs_search',
          component: '',
          path: '',
          component_missed: false,
          likely_component: '',
          count: 3,
        }),
      },
    })
  })

  it('still writes the snapshot with an empty MCP section when the MCP query fails', async () => {
    const perDay = [{ dt: '2026-09-20', env: 'prod', count: 5 }]
    retrievePortalViewsPerDay.mockResolvedValue(perDay)
    retrieveMcpUsageDaily.mockRejectedValue(new Error('glue denied'))

    await handler()

    const body = snapshotBody()
    expect(body.portalViewTrends.perDay).toEqual(perDay)
    expect(body.mcpUsage).toEqual({
      web: {
        total: 0,
        perTool: [],
        perComponent: [],
        perPath: [],
        missedLookups: 0,
        perLikelyComponent: [],
        daily: [],
      },
      local: {
        total: 0,
        perTool: [],
        perComponent: [],
        perPath: [],
        missedLookups: 0,
        perLikelyComponent: [],
        daily: [],
        perVersion: [],
      },
    })
    expect(errorSpy).toHaveBeenCalled()

    const failureMetric = logSpy.mock.calls
      .map((call: unknown[]) => call[0])
      .map((line: unknown) => {
        try {
          return JSON.parse(line as string) as Record<string, unknown>
        } catch {
          return null
        }
      })
      .find(
        (entry: Record<string, unknown> | null) =>
          entry?.McpUsageBuildFailure === 1
      )
    expect(failureMetric).toBeDefined()
  })

  it('serves existing daily history when the tail recompute fails', async () => {
    aggregateMcpUsageRaw.mockRejectedValue(new Error('athena blip'))
    retrieveMcpUsageDaily.mockResolvedValue([
      {
        dt: '2026-09-09',
        transport: 'web',
        tool: 'component_props',
        component: 'Button',
        path: '',
        count: 5,
      },
    ])

    await handler()

    const snapshotPut = putCalls().find(
      (call) =>
        (call[0] as Command).input.Key === 'snapshots/dashboard.json'
    )
    const mcp = JSON.parse(
      (snapshotPut![0] as Command).input.Body as string
    ).mcpUsage

    // A transient recompute failure must NOT blank the section: the durable
    // history is still read and shown.
    expect(mcp.web.total).toBe(5)
    expect(mcp.web.perComponent).toEqual([{ name: 'Button', count: 5 }])
    expect(errorSpy).toHaveBeenCalled()

    const failureMetric = logSpy.mock.calls
      .map((call: unknown[]) => call[0])
      .map((line: unknown) => {
        try {
          return JSON.parse(line as string) as Record<string, unknown>
        } catch {
          return null
        }
      })
      .find(
        (entry: Record<string, unknown> | null) =>
          entry?.McpUsageBuildFailure === 1
      )
    expect(failureMetric).toBeDefined()
  })

  it('builds perVersion from local-only usage, ordered by count', async () => {
    aggregateLocalMcpUsageByVersion.mockResolvedValue([
      { name: '10.79.0', count: 9 },
      { name: '10.78.1', count: 3 },
    ])

    await handler()

    expect(aggregateLocalMcpUsageByVersion).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    )

    const snapshotPut = putCalls().find(
      (call) =>
        (call[0] as Command).input.Key === 'snapshots/dashboard.json'
    )
    const mcp = JSON.parse(
      (snapshotPut![0] as Command).input.Body as string
    ).mcpUsage

    expect(mcp.local.perVersion).toEqual([
      { name: '10.79.0', count: 9 },
      { name: '10.78.1', count: 3 },
    ])
  })
})

describe('buildComponentUsage', () => {
  it('recomputes the recent tail and builds the section from the daily rollup', async () => {
    aggregateComponentUsageRaw.mockResolvedValue([
      {
        dt: '2026-09-16',
        app: 'app-a',
        component: 'button',
        version: '10.72.0',
        count: 4,
      },
    ])
    retrieveComponentUsageTotals.mockResolvedValue([
      {
        app: 'app-a',
        component: 'button',
        version: '10.72.0',
        count: 6,
      },
      {
        app: 'app-b',
        component: 'input',
        version: '10.71.0',
        count: 3,
      },
    ])

    const componentUsage = await buildComponentUsage('my-bucket')

    expect(aggregateComponentUsageRaw).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    )
    expect(componentUsage.total).toBe(9)
    expect(componentUsage.perComponent).toEqual([
      { name: 'button', count: 6 },
      { name: 'input', count: 3 },
    ])
    expect(componentUsage.perApp).toEqual([
      { name: 'app-a', count: 6 },
      { name: 'app-b', count: 3 },
    ])
    expect(componentUsage.perVersion).toEqual([
      { name: '10.72.0', count: 6 },
      { name: '10.71.0', count: 3 },
    ])
  })

  it('writes the recomputed aggregates to the durable daily rollup prefix', async () => {
    aggregateComponentUsageRaw.mockResolvedValue([
      {
        dt: '2026-09-16',
        app: 'app-a',
        component: 'button',
        version: '10.72.0',
        count: 4,
      },
    ])
    retrieveComponentUsageTotals.mockResolvedValue([])

    await buildComponentUsage('my-bucket')

    expect(findDailyRollupPut('component-usage-daily/')).toMatchObject({
      input: {
        Key: 'component-usage-daily/dt=2026-09-16/agg.json',
        Body: JSON.stringify({
          app: 'app-a',
          component: 'button',
          version: '10.72.0',
          count: 4,
        }),
      },
    })
  })

  it('serves existing daily history when the tail recompute fails', async () => {
    aggregateComponentUsageRaw.mockRejectedValue(new Error('athena blip'))
    retrieveComponentUsageTotals.mockResolvedValue([
      {
        app: 'app-a',
        component: 'button',
        version: '10.72.0',
        count: 2,
      },
    ])

    const componentUsage = await buildComponentUsage('my-bucket')

    // A transient recompute failure must NOT blank the section: the durable
    // history is still read and shown.
    expect(componentUsage.total).toBe(2)
    expect(componentUsage.perComponent).toEqual([
      { name: 'button', count: 2 },
    ])
    expect(errorSpy).toHaveBeenCalled()

    const failureMetric = logSpy.mock.calls
      .map((call: unknown[]) => call[0])
      .map((line: unknown) => {
        try {
          return JSON.parse(line as string) as Record<string, unknown>
        } catch {
          return null
        }
      })
      .find(
        (entry: Record<string, unknown> | null) =>
          entry?.ComponentUsageBuildFailure === 1
      )
    expect(failureMetric).toBeDefined()
  })

  it('propagates a durable-read failure so the caller can fall back to empty', async () => {
    retrieveComponentUsageTotals.mockRejectedValue(
      new Error('glue denied')
    )

    await expect(buildComponentUsage('my-bucket')).rejects.toThrow(
      'glue denied'
    )
  })
})

describe('component usage section (currently unwired)', () => {
  it('ships an empty section without querying component usage', async () => {
    await handler()

    const snapshotPut = putCalls().find(
      (call) =>
        (call[0] as Command).input.Key === 'snapshots/dashboard.json'
    )
    const body = JSON.parse(
      (snapshotPut![0] as Command).input.Body as string
    )

    expect(body.componentUsage).toEqual({
      total: 0,
      perComponent: [],
      perApp: [],
      perVersion: [],
    })

    // No producer yet: the generator must not query the empty component tables.
    expect(aggregateComponentUsageRaw).not.toHaveBeenCalled()
    expect(retrieveComponentUsageTotals).not.toHaveBeenCalled()

    expect(findDailyRollupPut('component-usage-daily/')).toBeUndefined()
  })
})

describe('snapshot page-view count metric', () => {
  function findEmfMetric() {
    const line = logSpy.mock.calls
      .map((call: unknown[]) => call[0])
      .find(
        (arg: unknown): arg is string =>
          typeof arg === 'string' &&
          arg.includes('SnapshotPortalViewCount')
      )

    return line ? JSON.parse(line) : null
  }

  afterEach(() => {
    delete process.env.AWS_LAMBDA_FUNCTION_NAME
  })

  it('emits the page views of the last two days as an EMF metric after a successful run', async () => {
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'eufemia-dev-analytics-snapshot'
    retrievePortalViewsPerDay.mockResolvedValue([
      { dt: utcDate(2), env: 'prod', count: 100 },
      { dt: utcDate(1), env: 'prod', count: 3 },
      { dt: utcDate(0), env: 'test', count: 2 },
    ])

    const result = await handler()

    expect(result.recentViews).toBe(5)
    const emf = findEmfMetric()
    expect(emf).not.toBeNull()
    expect(emf.SnapshotPortalViewCount).toBe(5)
    expect(emf.FunctionName).toBe('eufemia-dev-analytics-snapshot')
    expect(emf._aws.CloudWatchMetrics[0].Namespace).toBe(
      'Eufemia/Analytics'
    )
    expect(emf._aws.CloudWatchMetrics[0].Metrics[0]).toEqual({
      Name: 'SnapshotPortalViewCount',
      Unit: 'Count',
    })
  })

  it('emits a zero count when no page views arrived in the last two days', async () => {
    retrievePortalViewsPerDay.mockResolvedValue([
      { dt: utcDate(2), env: 'prod', count: 100 },
    ])

    const result = await handler()

    expect(result.recentViews).toBe(0)
    const emf = findEmfMetric()
    expect(emf).not.toBeNull()
    expect(emf.SnapshotPortalViewCount).toBe(0)
  })
})
