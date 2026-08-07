import {
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  StartQueryExecutionCommand,
} from '@aws-sdk/client-athena'
import type { AnalyticsRecord } from '../types.js'

const athena = new AthenaClient({})

// Same shape allowed when a record is stored, so the id filter can never
// contain characters that would break out of the SQL string literal.
const ID_PATTERN = /^[A-Za-z0-9._-]{1,128}$/

const DEFAULT_LIMIT = 100
const MAX_LIMIT = 1000

const POLL_INTERVAL_MS = 500
// Keep the total poll window (MAX_POLLS * POLL_INTERVAL_MS = 25s) below the
// Lambda timeout (30s) so this loop surfaces a clear "timed out" error before
// the platform kills the invocation.
const MAX_POLLS = 50

/** Thrown when the caller supplies an invalid query parameter (maps to 400). */
export class InvalidQueryError extends Error {}

export type RetrieveOptions = {
  id?: string
  limit?: number
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

async function readResults(
  queryExecutionId: string
): Promise<AnalyticsRecord[]> {
  const records: AnalyticsRecord[] = []

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
      const [id, name, value, createdat] = (row.Data ?? []).map(
        (cell) => cell.VarCharValue
      )

      records.push({
        id: id ?? '',
        name: name ?? '',
        value: value === undefined ? NaN : Number(value),
        createdAt: createdat ?? '',
      })
    }

    nextToken = NextToken
  } while (nextToken)

  return records
}

/**
 * Retrieve records via Athena, most recent first.
 *
 * Database, table and workgroup come from the environment (trusted). The
 * optional `id` filter is validated against {@link ID_PATTERN} before being
 * interpolated, so the query is not vulnerable to injection.
 */
export async function retrieveRecords(
  options: RetrieveOptions = {}
): Promise<AnalyticsRecord[]> {
  const database = requireEnv('GLUE_DATABASE')
  const table = requireEnv('GLUE_TABLE')
  const workgroup = requireEnv('ATHENA_WORKGROUP')

  const limit = clampLimit(options.limit)

  let where = ''
  if (options.id !== undefined) {
    if (!ID_PATTERN.test(options.id)) {
      throw new InvalidQueryError(
        '"id" query parameter has an invalid format'
      )
    }

    where = `WHERE id = '${options.id}' `
  }

  const query = `SELECT id, name, value, createdat FROM "${database}"."${table}" ${where}ORDER BY createdat DESC LIMIT ${limit}`

  const queryExecutionId = await startQuery(query, workgroup)
  await waitForQuery(queryExecutionId)

  return readResults(queryExecutionId)
}
