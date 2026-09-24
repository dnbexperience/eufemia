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
  aggregatePortalViewsRaw,
  retrievePortalViews,
} from '../src/lambda/retrieve.js'

type Command = { kind: 'start' | 'status' | 'results'; input: unknown }

beforeEach(() => {
  send.mockReset()
  process.env.GLUE_DATABASE = 'db'
  process.env.GLUE_TABLE = 'portal_views'
  process.env.GLUE_TABLE_MCP_USAGE = 'mcp_usage'
  process.env.ATHENA_WORKGROUP = 'wg'
})

afterEach(() => {
  delete process.env.GLUE_DATABASE
  delete process.env.GLUE_TABLE
  delete process.env.GLUE_TABLE_MCP_USAGE
  delete process.env.ATHENA_WORKGROUP
})

describe('retrievePortalViews', () => {
  it('queries and returns the portal-view fields used by the dashboard', async () => {
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
          Rows: [
            {
              Data: [
                { VarCharValue: 'path' },
                { VarCharValue: 'env' },
                { VarCharValue: 'timestamp' },
              ],
            },
            {
              Data: [
                { VarCharValue: '/uilib/components/button' },
                { VarCharValue: 'prod' },
                { VarCharValue: '2026-08-28T09:59:00.000Z' },
              ],
            },
          ],
        },
      })
    })

    await expect(retrievePortalViews({ limit: 1000 })).resolves.toEqual([
      {
        path: '/uilib/components/button',
        env: 'prod',
        timestamp: '2026-08-28T09:59:00.000Z',
      },
    ])

    const start = send.mock.calls[0][0] as Command & {
      input: { QueryString: string }
    }
    expect(start.input.QueryString).toBe(
      `SELECT path, env, "timestamp" FROM "db"."portal_views" ORDER BY "timestamp" DESC LIMIT 1000`
    )
  })
})

describe('aggregatePortalViewsRaw', () => {
  it('groups raw rows by day, path, env and the anonymous view dimensions', async () => {
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
          Rows: [
            {
              Data: [
                { VarCharValue: 'dt' },
                { VarCharValue: 'path' },
                { VarCharValue: 'env' },
                { VarCharValue: 'status' },
                { VarCharValue: 'locale' },
                { VarCharValue: 'theme' },
                { VarCharValue: 'color_scheme' },
                { VarCharValue: 'referrer' },
                { VarCharValue: 'via_search' },
                { VarCharValue: 'cnt' },
              ],
            },
            {
              Data: [
                { VarCharValue: '2026-09-20' },
                { VarCharValue: '/uilib/components/button' },
                { VarCharValue: 'prod' },
                { VarCharValue: 'ok' },
                { VarCharValue: 'en-GB' },
                { VarCharValue: 'ui' },
                { VarCharValue: 'dark' },
                { VarCharValue: 'search' },
                { VarCharValue: 'yes' },
                { VarCharValue: '7' },
              ],
            },
          ],
        },
      })
    })

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

    const start = send.mock.calls[0][0] as Command & {
      input: { QueryString: string }
    }
    expect(start.input.QueryString).toBe(
      `SELECT dt, path, env, status, locale, theme, color_scheme, referrer, via_search, count(*) AS cnt FROM "db"."portal_views" WHERE dt >= '2026-09-14' GROUP BY dt, path, env, status, locale, theme, color_scheme, referrer, via_search`
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
          Rows: [
            {
              Data: [
                { VarCharValue: 'eufemiaversion' },
                { VarCharValue: 'cnt' },
              ],
            },
            {
              Data: [{ VarCharValue: '10.79.0' }, { VarCharValue: '9' }],
            },
          ],
        },
      })
    })

    await expect(
      aggregateLocalMcpUsageByVersion('2026-06-27')
    ).resolves.toEqual([{ name: '10.79.0', count: 9 }])

    const start = send.mock.calls[0][0] as Command & {
      input: { QueryString: string }
    }
    expect(start.input.QueryString).toBe(
      `SELECT eufemiaversion, count(*) AS cnt FROM "db"."mcp_usage" WHERE dt >= '2026-06-27' AND transport = 'local' AND eufemiaversion IS NOT NULL AND eufemiaversion <> '' GROUP BY eufemiaversion ORDER BY cnt DESC`
    )
    expect(start.input.QueryString).toContain("transport = 'local'")
  })
})
