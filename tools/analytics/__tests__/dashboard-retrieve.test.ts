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

import { retrievePageViews } from '../src/lambda/retrieve.js'

type Command = { kind: 'start' | 'status' | 'results'; input: unknown }

beforeEach(() => {
  send.mockReset()
  process.env.GLUE_DATABASE = 'db'
  process.env.GLUE_TABLE = 'records'
  process.env.ATHENA_WORKGROUP = 'wg'
})

afterEach(() => {
  delete process.env.GLUE_DATABASE
  delete process.env.GLUE_TABLE
  delete process.env.ATHENA_WORKGROUP
})

describe('retrievePageViews', () => {
  it('queries and returns the page-view fields used by the dashboard', async () => {
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

    await expect(retrievePageViews({ limit: 1000 })).resolves.toEqual([
      {
        type: 'pageview',
        path: '/uilib/components/button',
        env: 'prod',
        timestamp: '2026-08-28T09:59:00.000Z',
      },
    ])

    const start = send.mock.calls[0][0] as Command & {
      input: { QueryString: string }
    }
    expect(start.input.QueryString).toBe(
      `SELECT path, env, "timestamp" FROM "db"."records" WHERE "type" = 'pageview' ORDER BY "timestamp" DESC LIMIT 1000`
    )
  })
})
