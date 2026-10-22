import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send } = vi.hoisted(() => ({ send: vi.fn() }))

vi.mock('@aws-sdk/client-athena', () => ({
  AthenaClient: class {
    send = send
  },
  StartQueryExecutionCommand: class {
    readonly kind = 'start'
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
  GetQueryExecutionCommand: class {
    readonly kind = 'status'
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
  GetQueryResultsCommand: class {
    readonly kind = 'results'
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
}))

import {
  aggregateLocalMcpUsageByVersion,
  aggregateMcpUsageRaw,
  aggregatePortalViewsRaw,
  retrieveMcpUsageDaily,
  retrievePortalViews,
} from '../src/lambda/retrieve.js'

type Command = { kind: 'start' | 'status' | 'results'; input: unknown }

// The first row is the header, which readResults skips. undefined is a NULL cell.
function mockAthenaRows(rows: Array<Array<string | undefined>>): void {
  send.mockImplementation((command: Command) => {
    if (command.kind === 'start') {
      return Promise.resolve({ QueryExecutionId: 'query-id' })
    }
    if (command.kind === 'status') {
      return Promise.resolve({
        QueryExecution: { Status: { State: 'SUCCEEDED' } },
      })
    }

    return Promise.resolve({
      ResultSet: {
        Rows: rows.map((row) => ({
          Data: row.map((value) =>
            value === undefined ? {} : { VarCharValue: value }
          ),
        })),
      },
    })
  })
}

function startedQueryString(): string {
  const start = send.mock.calls[0][0] as Command & {
    input: { QueryString: string }
  }

  return start.input.QueryString
}

beforeEach(() => {
  send.mockReset()
  process.env.GLUE_DATABASE = 'db'
  process.env.GLUE_TABLE = 'portal_views'
  process.env.GLUE_TABLE_MCP_USAGE = 'mcp_usage'
  process.env.GLUE_TABLE_MCP_USAGE_DAILY = 'mcp_usage_daily'
  process.env.ATHENA_WORKGROUP = 'wg'
})

afterEach(() => {
  delete process.env.GLUE_DATABASE
  delete process.env.GLUE_TABLE
  delete process.env.GLUE_TABLE_MCP_USAGE
  delete process.env.GLUE_TABLE_MCP_USAGE_DAILY
  delete process.env.ATHENA_WORKGROUP
})

describe('retrievePortalViews', () => {
  it('queries and returns the portal-view fields used by the dashboard', async () => {
    mockAthenaRows([
      ['path', 'env', 'timestamp'],
      ['/uilib/components/button', 'prod', '2026-08-28T09:59:00.000Z'],
    ])

    await expect(retrievePortalViews({ limit: 1000 })).resolves.toEqual([
      {
        path: '/uilib/components/button',
        env: 'prod',
        timestamp: '2026-08-28T09:59:00.000Z',
      },
    ])

    expect(startedQueryString()).toBe(
      `SELECT path, env, "timestamp" FROM "db"."portal_views" ORDER BY "timestamp" DESC LIMIT 1000`
    )
  })

  it.each([
    [undefined, 100],
    [NaN, 100],
    [Infinity, 100],
    [0, 1],
    [-5, 1],
    [5000, 1000],
    [3.9, 3],
    [42, 42],
  ])('turns limit %s into LIMIT %s', async (limit, expectedLimit) => {
    mockAthenaRows([])

    await retrievePortalViews({ limit })

    expect(startedQueryString()).toMatch(
      new RegExp(` LIMIT ${expectedLimit}$`)
    )
  })
})

describe('aggregatePortalViewsRaw', () => {
  it('groups raw rows by day, path, env and the anonymous view dimensions', async () => {
    mockAthenaRows([
      [
        'dt',
        'path',
        'env',
        'status',
        'locale',
        'theme',
        'color_scheme',
        'referrer',
        'via_search',
        'cnt',
      ],
      [
        '2026-09-20',
        '/uilib/components/button',
        'prod',
        'ok',
        'en-GB',
        'ui',
        'dark',
        'search',
        'yes',
        '7',
      ],
    ])

    await expect(aggregatePortalViewsRaw('2026-09-14')).resolves.toEqual([
      {
        dt: '2026-09-20',
        path: '/uilib/components/button',
        env: 'prod',
        status: 'ok',
        locale: 'en-GB',
        theme: 'ui',
        color_scheme: 'dark',
        referrer: 'search',
        via_search: 'yes',
        count: 7,
      },
    ])

    expect(startedQueryString()).toBe(
      `SELECT dt, path, env, status, locale, theme, color_scheme, referrer, via_search, count(*) AS cnt FROM "db"."portal_views" WHERE dt >= '2026-09-14' GROUP BY dt, path, env, status, locale, theme, color_scheme, referrer, via_search`
    )
  })
})

describe('retrieveMcpUsageDaily', () => {
  it('reads a daily row written before misses were recorded as no miss', async () => {
    mockAthenaRows([
      [
        'dt',
        'transport',
        'tool',
        'component',
        'path',
        'component_missed',
        'likely_component',
        'count',
      ],
      [
        '2026-09-20',
        'web',
        'component_doc',
        'button',
        '',
        undefined,
        undefined,
        '5',
      ],
    ])

    await expect(retrieveMcpUsageDaily()).resolves.toEqual([
      {
        dt: '2026-09-20',
        transport: 'web',
        tool: 'component_doc',
        component: 'button',
        path: '',
        component_missed: false,
        likely_component: '',
        count: 5,
      },
    ])

    expect(startedQueryString()).toBe(
      `SELECT dt, transport, tool, component, path, component_missed, likely_component, count FROM "db"."mcp_usage_daily"`
    )
  })
})

describe('aggregateMcpUsageRaw', () => {
  it('groups raw rows by component miss and maps each column in order', async () => {
    mockAthenaRows([
      [
        'dt',
        'transport',
        'tool',
        'component',
        'path',
        'component_missed',
        'likely_component',
        'cnt',
      ],
      [
        '2026-10-14',
        'web',
        'component_doc',
        '',
        '',
        'true',
        'date-picker',
        '4',
      ],
    ])

    await expect(aggregateMcpUsageRaw('2026-10-08')).resolves.toEqual([
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
    ])

    expect(startedQueryString()).toBe(
      `SELECT dt, coalesce(transport, 'web') AS transport, tool, component, path, coalesce(component_missed, false) AS component_missed, coalesce(likely_component, '') AS likely_component, count(*) AS cnt FROM "db"."mcp_usage" WHERE dt >= '2026-10-08' GROUP BY dt, coalesce(transport, 'web'), tool, component, path, coalesce(component_missed, false), coalesce(likely_component, '')`
    )
  })
})

describe('aggregateLocalMcpUsageByVersion', () => {
  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(
      aggregateLocalMcpUsageByVersion("2026'; DROP")
    ).rejects.toThrow('YYYY-MM-DD')
  })

  it('groups local-transport rows in the window by version, filtering out web/null rows in the query', async () => {
    mockAthenaRows([
      ['eufemia_version', 'cnt'],
      ['10.79.0', '9'],
    ])

    await expect(
      aggregateLocalMcpUsageByVersion('2026-06-27')
    ).resolves.toEqual([{ name: '10.79.0', count: 9 }])

    expect(startedQueryString()).toBe(
      `SELECT eufemia_version, count(*) AS cnt FROM "db"."mcp_usage" WHERE dt >= '2026-06-27' AND transport = 'local' AND eufemia_version IS NOT NULL AND eufemia_version <> '' GROUP BY eufemia_version ORDER BY cnt DESC`
    )
    expect(startedQueryString()).toContain("transport = 'local'")
  })
})
