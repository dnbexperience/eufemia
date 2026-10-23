import {
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  StartQueryExecutionCommand,
} from '@aws-sdk/client-athena'
import { requireEnv } from './env.js'
import type {
  ComponentUsageAggregate,
  ComponentUsageDaily,
  McpUsageDaily,
  PortalViewDaily,
  PortalViewDayCount,
  PortalViewLocaleThemeCount,
  PortalViewMonthPathCount,
  RankedCount,
} from './snapshot-store.js'

const athena = new AthenaClient({})

const POLL_INTERVAL_MS = 500
// Sized for the full 13-month retention; the snapshot Lambda timeout covers
// its chain of waits.
const MAX_WAIT_MS = 2 * 60 * 1000
const MAX_POLLS = MAX_WAIT_MS / POLL_INTERVAL_MS

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

async function readResults<Row>(
  queryExecutionId: string,
  toRow: (values: Array<string | undefined>) => Row
): Promise<Row[]> {
  const rows: Row[] = []

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

    const pageRows = ResultSet?.Rows ?? []
    const dataRows = isFirstPage ? pageRows.slice(1) : pageRows
    isFirstPage = false

    for (const dataRow of dataRows) {
      rows.push(
        toRow((dataRow.Data ?? []).map((cell) => cell.VarCharValue))
      )
    }

    nextToken = NextToken
  } while (nextToken)

  return rows
}

// The database and table names come from the environment (trusted).
function glueTable(tableEnvName: string): string {
  return `"${requireEnv('GLUE_DATABASE')}"."${requireEnv(tableEnvName)}"`
}

async function runQuery<Row>(
  query: string,
  toRow: (values: Array<string | undefined>) => Row
): Promise<Row[]> {
  const queryExecutionId = await startQuery(
    query,
    requireEnv('ATHENA_WORKGROUP')
  )
  await waitForQuery(queryExecutionId)

  return readResults(queryExecutionId, toRow)
}

// A YYYY-MM-DD partition token is derived from the server clock, never user
// input, so interpolating it into the query carries no injection risk.
const DT_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function assertPartitionDate(sinceDt: string): void {
  if (!DT_PATTERN.test(sinceDt)) {
    throw new Error(`sinceDt must be a YYYY-MM-DD date, got: ${sinceDt}`)
  }
}

function toPortalViewDailyRow([
  dt,
  path,
  env,
  status,
  locale,
  theme,
  color_scheme,
  referrer,
  via_search,
  count,
]: Array<string | undefined>): PortalViewDaily {
  return {
    dt: dt ?? '',
    path: path ?? '',
    env: env ?? '',
    status: status ?? '',
    locale: locale ?? '',
    theme: theme ?? '',
    color_scheme: color_scheme ?? '',
    referrer: referrer ?? '',
    via_search: via_search ?? '',
    count: Number(count ?? 0),
  }
}

/**
 * Aggregate raw portal page-view rows on or after `sinceDt` into per-day counts,
 * grouped by path/env and the anonymous view dimensions (status/locale/theme/
 * color_scheme/referrer/via_search). Keeping the dimensions in the durable rollup
 * means their history survives the raw rows' expiry. Used to recompute the recent
 * tail of the rollup on each generator run.
 */
export async function aggregatePortalViewsRaw(
  sinceDt: string
): Promise<PortalViewDaily[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE')

  return runQuery(
    `SELECT dt, path, env, status, locale, theme, color_scheme, referrer, via_search, count(*) AS cnt FROM ${table} WHERE dt >= '${sinceDt}' GROUP BY dt, path, env, status, locale, theme, color_scheme, referrer, via_search`,
    toPortalViewDailyRow
  )
}

// Missing values read as 'unknown', like the record defaults, so an empty env
// stays reserved for the all-environments ranking.
const ENV_COLUMN = "coalesce(env, 'unknown')"
const LOCALE_COLUMN = "coalesce(locale, 'unknown')"
const THEME_COLUMN = "coalesce(theme, 'unknown')"

/** Read total portal views per day and environment from the durable rollup. */
export async function retrievePortalViewsPerDay(
  sinceDt: string
): Promise<PortalViewDayCount[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE_PORTAL_VIEWS_DAILY')

  return runQuery(
    `SELECT dt, ${ENV_COLUMN} AS env, sum(count) AS views FROM ${table} WHERE dt >= '${sinceDt}' GROUP BY dt, ${ENV_COLUMN} ORDER BY dt`,
    ([dt, env, views]) => ({
      dt: dt ?? '',
      env: env ?? '',
      count: Number(views ?? 0),
    })
  )
}

/**
 * Read the most viewed paths per month from the durable rollup, ranked per
 * environment and across all environments (empty env).
 */
export async function retrieveTopPortalPathsPerMonth(
  sinceDt: string,
  limit: number
): Promise<PortalViewMonthPathCount[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE_PORTAL_VIEWS_DAILY')

  return runQuery(
    `SELECT month, env, path, views FROM (SELECT month, env, path, views, row_number() OVER (PARTITION BY month, env ORDER BY views DESC, path) AS position FROM (SELECT month, CASE WHEN grouping(env) = 1 THEN '' ELSE env END AS env, path, sum(count) AS views FROM (SELECT substr(dt, 1, 7) AS month, ${ENV_COLUMN} AS env, path, count FROM ${table} WHERE dt >= '${sinceDt}') GROUP BY GROUPING SETS ((month, env, path), (month, path)))) WHERE position <= ${limit} ORDER BY month, env, views DESC`,
    ([month, env, path, views]) => ({
      month: month ?? '',
      env: env ?? '',
      path: path ?? '',
      count: Number(views ?? 0),
    })
  )
}

/** Read total portal views per environment, locale and theme from the durable rollup. */
export async function retrievePortalViewsPerLocaleAndTheme(
  sinceDt: string
): Promise<PortalViewLocaleThemeCount[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE_PORTAL_VIEWS_DAILY')

  return runQuery(
    `SELECT ${ENV_COLUMN} AS env, ${LOCALE_COLUMN} AS locale, ${THEME_COLUMN} AS theme, sum(count) AS views FROM ${table} WHERE dt >= '${sinceDt}' GROUP BY ${ENV_COLUMN}, ${LOCALE_COLUMN}, ${THEME_COLUMN}`,
    ([env, locale, theme, views]) => ({
      env: env ?? '',
      locale: locale ?? '',
      theme: theme ?? '',
      count: Number(views ?? 0),
    })
  )
}

function toDailyRow([
  dt,
  transport,
  tool,
  component,
  path,
  componentMissed,
  likelyComponent,
  count,
]: Array<string | undefined>): McpUsageDaily {
  return {
    dt: dt ?? '',
    transport: transport ?? '',
    tool: tool ?? '',
    component: component ?? '',
    path: path ?? '',
    component_missed: componentMissed === 'true',
    likely_component: likelyComponent ?? '',
    count: Number(count ?? 0),
  }
}

/**
 * Aggregate raw MCP usage rows on or after `sinceDt` into per-day counts, grouped
 * by transport/tool/component/path and component miss. Used to recompute the
 * recent tail of the durable daily rollup on each generator run. Web rows
 * written before the MCP Lambda stamped `transport` read NULL, so they are
 * counted as web; rows written before misses were recorded count as no miss.
 */
export async function aggregateMcpUsageRaw(
  sinceDt: string
): Promise<McpUsageDaily[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE_MCP_USAGE')

  return runQuery(
    `SELECT dt, coalesce(transport, 'web') AS transport, tool, component, path, coalesce(component_missed, false) AS component_missed, coalesce(likely_component, '') AS likely_component, count(*) AS cnt FROM ${table} WHERE dt >= '${sinceDt}' GROUP BY dt, coalesce(transport, 'web'), tool, component, path, coalesce(component_missed, false), coalesce(likely_component, '')`,
    toDailyRow
  )
}

/** Read the full durable daily MCP usage rollup for the dashboard section. */
export async function retrieveMcpUsageDaily(): Promise<McpUsageDaily[]> {
  const table = glueTable('GLUE_TABLE_MCP_USAGE_DAILY')

  return runQuery(
    `SELECT dt, transport, tool, component, path, component_missed, likely_component, count FROM ${table}`,
    toDailyRow
  )
}

/**
 * Aggregate local MCP usage on or after `sinceDt` into per-version counts for
 * the dashboard, highest request count first.
 *
 * Only transport='local' rows carry a meaningful Eufemia version: the web MCP
 * Lambda always runs latest and records no version, so those rows are excluded
 * here rather than surfaced as a null/empty bucket. Reads the raw mcp_usage
 * table directly (the durable daily rollup does not carry the version
 * dimension), scoped to a recent window so the scan stays bounded as the raw
 * table's 13-month retention fills, like its aggregateMcpUsageRaw sibling.
 */
export async function aggregateLocalMcpUsageByVersion(
  sinceDt: string
): Promise<RankedCount[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE_MCP_USAGE')

  return runQuery(
    `SELECT eufemia_version, count(*) AS cnt FROM ${table} WHERE dt >= '${sinceDt}' AND transport = 'local' AND eufemia_version IS NOT NULL AND eufemia_version <> '' GROUP BY eufemia_version ORDER BY cnt DESC`,
    ([version, count]) => ({
      name: version ?? '',
      count: Number(count ?? 0),
    })
  )
}

function toComponentUsageDailyRow([
  dt,
  app,
  component,
  version,
  count,
]: Array<string | undefined>): ComponentUsageDaily {
  return {
    dt: dt ?? '',
    app: app ?? '',
    component: component ?? '',
    version: version ?? '',
    count: Number(count ?? 0),
  }
}

function toComponentUsageAggregateRow([
  app,
  component,
  version,
  count,
]: Array<string | undefined>): ComponentUsageAggregate {
  return {
    app: app ?? '',
    component: component ?? '',
    version: version ?? '',
    count: Number(count ?? 0),
  }
}

/**
 * Aggregate raw component-usage rows on or after `sinceDt` into per-day counts,
 * grouped by app/component/version. Used to recompute the recent tail of the
 * durable daily rollup on each generator run.
 */
export async function aggregateComponentUsageRaw(
  sinceDt: string
): Promise<ComponentUsageDaily[]> {
  assertPartitionDate(sinceDt)

  const table = glueTable('GLUE_TABLE_COMPONENT_USAGE')

  return runQuery(
    `SELECT dt, app, component, version, count(*) AS cnt FROM ${table} WHERE dt >= '${sinceDt}' GROUP BY dt, app, component, version`,
    toComponentUsageDailyRow
  )
}

/**
 * Read the durable component-usage rollup for the dashboard section, summed by
 * app/component/version across all days. Athena does the aggregation so the
 * result stays bounded (~one row per distinct app+component+version) no matter
 * how many days of raw rollup have accrued, instead of paging every daily row
 * into the Lambda and summing in JS.
 */
export async function retrieveComponentUsageTotals(): Promise<
  ComponentUsageAggregate[]
> {
  const table = glueTable('GLUE_TABLE_COMPONENT_USAGE_DAILY')

  return runQuery(
    `SELECT app, component, version, sum(count) AS cnt FROM ${table} GROUP BY app, component, version`,
    toComponentUsageAggregateRow
  )
}
