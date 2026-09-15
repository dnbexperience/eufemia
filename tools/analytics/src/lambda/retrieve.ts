import {
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  StartQueryExecutionCommand,
} from '@aws-sdk/client-athena'
import type { McpUsageDaily } from './snapshot-store.js'

const athena = new AthenaClient({})

const DEFAULT_LIMIT = 100
const MAX_LIMIT = 1000

const POLL_INTERVAL_MS = 500
// Keep the total poll window (MAX_POLLS * POLL_INTERVAL_MS = 25s) below the
// Lambda timeout (30s) so this loop surfaces a clear "timed out" error before
// the platform kills the invocation.
const MAX_POLLS = 50

export type RetrieveOptions = {
  limit?: number
}

/** A portal page view as read back for the dashboard. */
export type PortalView = {
  path: string
  env: string
  timestamp: string
}

function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} environment variable is not set`)
  }

  return value
}

function clampLimit(limit: number | undefined): number {
  if (limit === undefined || !Number.isFinite(limit)) {
    return DEFAULT_LIMIT
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT)
}

export { clampLimit }

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function startQuery(
  query: string,
  workgroup: string
): Promise<string> {
  const response = await athena.send(
    new StartQueryExecutionCommand({
      QueryString: query,
      WorkGroup: workgroup,
    })
  )

  if (!response.QueryExecutionId) {
    throw new Error('Athena did not return a QueryExecutionId')
  }

  return response.QueryExecutionId
}

async function waitForQuery(queryExecutionId: string): Promise<void> {
  for (let attempt = 0; attempt < MAX_POLLS; attempt++) {
    const { QueryExecution } = await athena.send(
      new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId })
    )

    const state = QueryExecution?.Status?.State

    if (state === 'SUCCEEDED') {
      return
    }

    if (state === 'FAILED' || state === 'CANCELLED') {
      const reason =
        QueryExecution?.Status?.StateChangeReason ?? 'unknown reason'
      throw new Error(`Athena query ${state}: ${reason}`)
    }

    await delay(POLL_INTERVAL_MS)
  }

  throw new Error('Athena query timed out')
}

async function readResults<Record>(
  queryExecutionId: string,
  toRecord: (values: Array<string | undefined>) => Record
): Promise<Record[]> {
  const records: Record[] = []

  let nextToken: string | undefined
  let isFirstPage = true

  // GetQueryResults returns at most 1000 rows per page, so page through all of
  // them. Only the very first page includes the column header row.
  do {
    const { ResultSet, NextToken } = await athena.send(
      new GetQueryResultsCommand({
        QueryExecutionId: queryExecutionId,
        NextToken: nextToken,
      })
    )

    const rows = ResultSet?.Rows ?? []
    const dataRows = isFirstPage ? rows.slice(1) : rows
    isFirstPage = false

    for (const row of dataRows) {
      records.push(
        toRecord((row.Data ?? []).map((cell) => cell.VarCharValue))
      )
    }

    nextToken = NextToken
  } while (nextToken)

  return records
}

/**
 * Retrieve the most recent portal page views for the dashboard, newest first.
 *
 * The database, table and workgroup come from the environment (trusted). The
 * portal_views table holds only portal views, so no type filter is needed.
 */
export async function retrievePortalViews(
  options: RetrieveOptions = {}
): Promise<PortalView[]> {
  const database = requireEnv('GLUE_DATABASE')
  const table = requireEnv('GLUE_TABLE')
  const workgroup = requireEnv('ATHENA_WORKGROUP')
  const limit = clampLimit(options.limit)

  const query = `SELECT path, env, "timestamp" FROM "${database}"."${table}" ORDER BY "timestamp" DESC LIMIT ${limit}`
  const queryExecutionId = await startQuery(query, workgroup)
  await waitForQuery(queryExecutionId)

  return readResults(queryExecutionId, ([path, env, timestamp]) => ({
    path: path ?? '',
    env: env ?? '',
    timestamp: timestamp ?? '',
  }))
}

// A YYYY-MM-DD partition token is derived from the server clock, never user
// input, so interpolating it into the query carries no injection risk.
const DT_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function toDailyRow([dt, tool, component, path, count]: Array<
  string | undefined
>): McpUsageDaily {
  return {
    dt: dt ?? '',
    tool: tool ?? '',
    component: component ?? '',
    path: path ?? '',
    count: Number(count ?? 0),
  }
}

/**
 * Aggregate raw MCP usage rows on or after `sinceDt` into per-day counts, grouped
 * by tool/component/path. Used to recompute the recent tail of the durable daily
 * rollup on each generator run.
 */
export async function aggregateMcpUsageRaw(
  sinceDt: string
): Promise<McpUsageDaily[]> {
  if (!DT_PATTERN.test(sinceDt)) {
    throw new Error(`sinceDt must be a YYYY-MM-DD date, got: ${sinceDt}`)
  }

  const database = requireEnv('GLUE_DATABASE')
  const table = requireEnv('GLUE_TABLE_MCP_USAGE')
  const workgroup = requireEnv('ATHENA_WORKGROUP')

  const query = `SELECT dt, tool, component, path, count(*) AS cnt FROM "${database}"."${table}" WHERE dt >= '${sinceDt}' GROUP BY dt, tool, component, path`
  const queryExecutionId = await startQuery(query, workgroup)
  await waitForQuery(queryExecutionId)

  return readResults(queryExecutionId, toDailyRow)
}

/** Read the full durable daily MCP usage rollup for the dashboard section. */
export async function retrieveMcpUsageDaily(): Promise<McpUsageDaily[]> {
  const database = requireEnv('GLUE_DATABASE')
  const table = requireEnv('GLUE_TABLE_MCP_USAGE_DAILY')
  const workgroup = requireEnv('ATHENA_WORKGROUP')

  const query = `SELECT dt, tool, component, path, count FROM "${database}"."${table}"`
  const queryExecutionId = await startQuery(query, workgroup)
  await waitForQuery(queryExecutionId)

  return readResults(queryExecutionId, toDailyRow)
}
