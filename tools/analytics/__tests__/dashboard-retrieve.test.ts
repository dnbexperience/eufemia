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
  retrievePortalViewsPerDay,
  retrievePortalViewsPerLocaleAndTheme,
  retrieveTopPortalPathsPerMonth,
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
  process.env.GLUE_TABLE_PORTAL_VIEWS_DAILY = 'portal_views_daily'
  process.env.GLUE_TABLE_MCP_USAGE = 'mcp_usage'
  process.env.GLUE_TABLE_MCP_USAGE_DAILY = 'mcp_usage_daily'
  process.env.ATHENA_WORKGROUP = 'wg'
})

afterEach(() => {
  delete process.env.GLUE_DATABASE
  delete process.env.GLUE_TABLE
  delete process.env.GLUE_TABLE_PORTAL_VIEWS_DAILY
  delete process.env.GLUE_TABLE_MCP_USAGE
  delete process.env.GLUE_TABLE_MCP_USAGE_DAILY
  delete process.env.ATHENA_WORKGROUP
})

describe('retrievePortalViewsPerDay', () => {
  it('sums the rollup per day and environment from the window start', async () => {
    mockAthenaRows([
      ['dt', 'env', 'views'],
      ['2026-09-16', 'prod', '412'],
    ])

    await expect(retrievePortalViewsPerDay('2025-10-01')).resolves.toEqual(
      [{ dt: '2026-09-16', env: 'prod', count: 412 }]
    )

    expect(startedQueryString()).toBe(
      `SELECT dt, coalesce(env, 'unknown') AS env, sum(count) AS views FROM "db"."portal_views_daily" WHERE dt >= '2025-10-01' GROUP BY dt, coalesce(env, 'unknown') ORDER BY dt`
    )
  })

  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(retrievePortalViewsPerDay("2026'; DROP")).rejects.toThrow(
      'YYYY-MM-DD'
    )
    expect(send).not.toHaveBeenCalled()
  })
})

describe('retrieveTopPortalPathsPerMonth', () => {
  it('ranks paths per month and environment, plus across all environments as an empty env', async () => {
    mockAthenaRows([
      ['month', 'env', 'path', 'views'],
      ['2026-09', '', '/uilib/components/button', '30'],
      ['2026-09', 'prod', '/uilib/components/button', '28'],
    ])

    await expect(
      retrieveTopPortalPathsPerMonth('2025-10-01', 20)
    ).resolves.toEqual([
      {
        month: '2026-09',
        env: '',
        path: '/uilib/components/button',
        count: 30,
      },
      {
        month: '2026-09',
        env: 'prod',
        path: '/uilib/components/button',
        count: 28,
      },
    ])

    expect(startedQueryString()).toBe(
      `SELECT month, env, path, views FROM (SELECT month, env, path, views, row_number() OVER (PARTITION BY month, env ORDER BY views DESC, path) AS position FROM (SELECT month, CASE WHEN grouping(env) = 1 THEN '' ELSE env END AS env, path, sum(count) AS views FROM (SELECT substr(dt, 1, 7) AS month, coalesce(env, 'unknown') AS env, path, count FROM "db"."portal_views_daily" WHERE dt >= '2025-10-01') GROUP BY GROUPING SETS ((month, env, path), (month, path)))) WHERE position <= 20 ORDER BY month, env, views DESC`
    )
  })

  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(
      retrieveTopPortalPathsPerMonth("2026'; DROP", 20)
    ).rejects.toThrow('YYYY-MM-DD')
    expect(send).not.toHaveBeenCalled()
  })
})

describe('retrievePortalViewsPerLocaleAndTheme', () => {
  it('sums the rollup per environment, locale and theme, reading missing values as unknown', async () => {
    mockAthenaRows([
      ['env', 'locale', 'theme', 'views'],
      ['prod', 'en-GB', 'sbanken', '7'],
    ])

    await expect(
      retrievePortalViewsPerLocaleAndTheme('2025-10-01')
    ).resolves.toEqual([
      { env: 'prod', locale: 'en-GB', theme: 'sbanken', count: 7 },
    ])

    expect(startedQueryString()).toBe(
      `SELECT coalesce(env, 'unknown') AS env, coalesce(locale, 'unknown') AS locale, coalesce(theme, 'unknown') AS theme, sum(count) AS views FROM "db"."portal_views_daily" WHERE dt >= '2025-10-01' GROUP BY coalesce(env, 'unknown'), coalesce(locale, 'unknown'), coalesce(theme, 'unknown')`
    )
  })

  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(
      retrievePortalViewsPerLocaleAndTheme("2026'; DROP")
    ).rejects.toThrow('YYYY-MM-DD')
    expect(send).not.toHaveBeenCalled()
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
