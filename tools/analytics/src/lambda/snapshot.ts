import {
  aggregateComponentUsageRaw,
  aggregateLocalMcpUsageByVersion,
  aggregateMcpUsageRaw,
  aggregatePortalViewsRaw,
  retrieveComponentUsageTotals,
  retrieveMcpUsageDaily,
  retrievePortalViewsPerDay,
  retrievePortalViewsPerLocaleAndTheme,
  retrieveTopPortalPathsPerMonth,
} from './retrieve.js'
import { requireEnv } from './env.js'
import {
  EMPTY_COMPONENT_USAGE,
  EMPTY_MCP_USAGE,
  storeDailyRollup,
  writeSnapshot,
  type ComponentUsageSection,
  type McpTransportUsage,
  type McpUsageDaily,
  type McpUsageSection,
  type PortalViewTrendsSection,
  type RankedCount,
  type Snapshot,
} from './snapshot-store.js'

const METRIC_NAMESPACE = 'Eufemia/Analytics'

type MetricName =
  | 'SnapshotPortalViewCount'
  | 'McpUsageBuildFailure'
  | 'ComponentUsageBuildFailure'
  | 'PortalViewsRollupFailure'

/**
 * Emit a CloudWatch metric using the Embedded Metric Format (a structured log
 * line). EMF needs only the Lambda's existing log permissions, so the
 * pre-provisioned execution role stays as-is (it cannot be granted
 * cloudwatch:PutMetricData in Terraform, ADR 0004).
 *
 * Each metric has an alarm in infra/main.tf that describes what it catches.
 */
function emitMetric(name: MetricName, value: number): void {
  const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME ?? 'unknown'

  // eslint-disable-next-line no-console -- EMF metric emission to CloudWatch Logs
  console.log(
    JSON.stringify({
      _aws: {
        Timestamp: Date.now(),
        CloudWatchMetrics: [
          {
            Namespace: METRIC_NAMESPACE,
            Dimensions: [['FunctionName']],
            Metrics: [{ Name: name, Unit: 'Count' }],
          },
        ],
      },
      FunctionName: functionName,
      [name]: value,
    })
  )
}

// The number of recent days recomputed into each durable daily rollup on every
// run. Wider than the hourly cadence so a short generator outage cannot leave a
// day permanently un-aggregated (raw rows live far longer, so re-runs backfill).
const ROLLUP_RECOMPUTE_DAYS = 7
const MCP_TOP_LIMIT = 20

// Recent window for the local-by-version breakdown. Unlike the daily-rollup
// reads above, this scans the raw per-request mcp_usage table directly (it has
// no durable rollup for the version dimension), so it needs its own
// bound to stay cheap as the table's 13-month retention fills; it also keeps
// the metric focused on currently-relevant versions rather than all-time history.
const MCP_VERSION_WINDOW_DAYS = 90

// First day (YYYY-MM-DD, UTC) of the `days`-long window that ends today.
function windowStart(days: number): string {
  const since = new Date()
  since.setUTCDate(since.getUTCDate() - (days - 1))

  return since.toISOString().slice(0, 10)
}

// Recompute raw page views into the durable portal_views_daily rollup, which
// keeps the anonymous view-dimension history beyond the raw rows' 13-month
// expiry and feeds the dashboard's page-view trends. Best-effort at the call
// site: a failure emits a metric and the trends show the existing history.
//
// Scheduled runs pass no `sinceDt` and recompute only the recent tail. A one-time
// historical backfill (for page-views recorded before this rollup existed) is a
// manual invoke with an explicit `sinceDt`, e.g. the Glue projection start — see
// the analytics README. Writes are idempotent per-day overwrites, so re-running a
// window is safe.
async function refreshPortalViewsRollup(
  bucket: string,
  sinceDt?: string
): Promise<void> {
  const from = sinceDt || windowStart(ROLLUP_RECOMPUTE_DAYS)

  await storeDailyRollup(
    bucket,
    'portal-views-daily/',
    await aggregatePortalViewsRaw(from)
  )
}

const PORTAL_VIEW_TREND_MONTHS = 13
const PORTAL_VIEW_TOP_PATHS = 20
const RECENT_VIEW_DAYS = 2

// First day of the month `months - 1` months back, so the range holds whole
// calendar months, including the current one.
function monthsWindowStart(months: number): string {
  const now = new Date()

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1), 1)
  )
    .toISOString()
    .slice(0, 10)
}

// Refresh the rollup tail first so trends include today; a failed read keeps the previous snapshot.
async function buildPortalViewTrends(
  bucket: string,
  sinceDt?: string
): Promise<PortalViewTrendsSection> {
  try {
    await refreshPortalViewsRollup(bucket, sinceDt)
  } catch (error) {
    // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
    console.error('Failed to refresh the portal-view daily rollup', error)
    emitMetric('PortalViewsRollupFailure', 1)
  }

  const from = monthsWindowStart(PORTAL_VIEW_TREND_MONTHS)
  const [perDay, topPathsPerMonth, perLocaleAndTheme] = await Promise.all([
    retrievePortalViewsPerDay(from),
    retrieveTopPortalPathsPerMonth(from, PORTAL_VIEW_TOP_PATHS),
    retrievePortalViewsPerLocaleAndTheme(from),
  ])

  return { perDay, topPathsPerMonth, perLocaleAndTheme }
}

function sumBy<Key extends string>(
  rows: Array<Record<Key, string> & { count: number }>,
  key: Key
): RankedCount[] {
  const counts = new Map<string, number>()

  for (const row of rows) {
    const name = row[key]
    if (!name) {
      continue
    }

    counts.set(name, (counts.get(name) ?? 0) + row.count)
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

function sumCounts(rows: McpUsageDaily[]): number {
  return rows.reduce((sum, row) => sum + row.count, 0)
}

function buildTransportUsage(
  daily: McpUsageDaily[],
  transport: 'web' | 'local'
): McpTransportUsage {
  const rows = daily.filter((row) => row.transport === transport)
  const total = sumCounts(rows)
  const missedLookups = sumCounts(
    rows.filter((row) => row.component_missed)
  )

  const dayTotals = new Map<string, number>()
  for (const row of rows) {
    dayTotals.set(row.dt, (dayTotals.get(row.dt) ?? 0) + row.count)
  }

  return {
    total,
    perTool: sumBy(rows, 'tool').slice(0, MCP_TOP_LIMIT),
    perComponent: sumBy(rows, 'component').slice(0, MCP_TOP_LIMIT),
    perPath: sumBy(rows, 'path').slice(0, MCP_TOP_LIMIT),
    missedLookups,
    perLikelyComponent: sumBy(rows, 'likely_component').slice(
      0,
      MCP_TOP_LIMIT
    ),
    daily: [...dayTotals.entries()]
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  }
}

/**
 * Build the MCP usage dashboard section, split by transport. First recomputes
 * the recent tail of raw usage into the durable daily rollup (idempotent
 * overwrite), then reads the full daily table. The rollup outlives the raw rows'
 * 13-month expiry, so long-range comparisons stay available without holding raw
 * events forever. An explicit `sinceDt` recomputes from that date instead of the
 * recent tail (one-time backfill).
 *
 * The tail recompute is best-effort: a transient Athena/S3 failure there is
 * logged and flagged (the rollup misses the newest tail until the next run) but
 * does NOT blank the section — the durable history is still read and shown. Only
 * a failure of the durable read (or the version breakdown) propagates to the
 * handler, which falls back to the empty section.
 */
async function buildMcpUsage(
  bucket: string,
  sinceDt?: string
): Promise<McpUsageSection> {
  const from = sinceDt || windowStart(ROLLUP_RECOMPUTE_DAYS)

  try {
    await storeDailyRollup(
      bucket,
      'mcp-usage-daily/',
      await aggregateMcpUsageRaw(from)
    )
  } catch (error) {
    // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
    console.error(
      'Failed to refresh the MCP usage daily rollup; serving existing history',
      error
    )
    emitMetric('McpUsageBuildFailure', 1)
  }

  const daily = await retrieveMcpUsageDaily()

  // Rows written before the rollup kept `transport` mix both transports, so
  // neither section counts them until a sinceDt backfill rewrites those days.
  const untagged = daily.filter((row) => !row.transport).length
  if (untagged > 0) {
    // eslint-disable-next-line no-console -- surface the gap in CloudWatch Logs
    console.warn(
      `${untagged} MCP usage rollup rows have no transport and are left out of the dashboard; backfill with sinceDt`
    )
  }

  const perVersion = await aggregateLocalMcpUsageByVersion(
    windowStart(MCP_VERSION_WINDOW_DAYS)
  )

  return {
    web: buildTransportUsage(daily, 'web'),
    local: {
      ...buildTransportUsage(daily, 'local'),
      perVersion: perVersion.slice(0, MCP_TOP_LIMIT),
    },
  }
}

const COMPONENT_TOP_LIMIT = 50

/**
 * Build the component-usage dashboard section. First recomputes the recent tail
 * of raw usage into the durable daily rollup, then reads the full daily table.
 * The rollup outlives the raw rows' expiry, so long-range adoption history stays
 * available without holding raw events forever.
 *
 * The tail recompute is best-effort: a transient Athena/S3 failure there is
 * logged and flagged (the rollup misses the newest tail until the next run) but
 * does NOT blank the section — the durable history is still read and shown. Only
 * a failure of the durable read itself propagates to the caller.
 *
 * Counts are `count(*)` over raw build-event rows, so they are build-weighted: an
 * app that builds often contributes more than one that rarely builds. For a true
 * "how many apps use this component" figure, switch to COUNT(DISTINCT app) once
 * the record schema is settled (EDS-843).
 */
export async function buildComponentUsage(
  bucket: string
): Promise<ComponentUsageSection> {
  try {
    await storeDailyRollup(
      bucket,
      'component-usage-daily/',
      await aggregateComponentUsageRaw(windowStart(ROLLUP_RECOMPUTE_DAYS))
    )
  } catch (error) {
    // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
    console.error(
      'Failed to refresh the component usage daily rollup; serving existing history',
      error
    )
    emitMetric('ComponentUsageBuildFailure', 1)
  }

  const usageTotals = await retrieveComponentUsageTotals()

  const total = usageTotals.reduce((sum, row) => sum + row.count, 0)

  return {
    total,
    perComponent: sumBy(usageTotals, 'component').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
    perApp: sumBy(usageTotals, 'app').slice(0, COMPONENT_TOP_LIMIT),
    perVersion: sumBy(usageTotals, 'version').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
  }
}

/**
 * Scheduled dashboard snapshot generator (EventBridge, off the request path).
 *
 * Refreshes the durable daily rollups, reads the page-view trends, the MCP
 * usage section and (when enabled) the component usage section from Athena, and
 * writes the snapshot to S3. Runs under the analytics execution role (Athena +
 * S3 write); keeping it separate from the read endpoint lets that endpoint run
 * with a read-only role.
 *
 * An optional `sinceDt` on the invocation event backfills the page-view and MCP
 * usage rollups from that date instead of the recent tail — used for one-time
 * historical backfills (see the analytics README). Scheduled invocations pass none.
 */
export async function handler(event?: { sinceDt?: string }): Promise<{
  generatedAt: string
  recentViews: number
}> {
  const bucket = requireEnv('DATA_BUCKET')

  const portalViewTrends = await buildPortalViewTrends(
    bucket,
    event?.sinceDt
  )

  // The MCP section is additive; a failure here (e.g. a missing Glue grant or a
  // slow query) must not discard the page-view trends that were just built. Fall
  // back to the empty section so the rest of the dashboard keeps updating.
  let mcpUsage: McpUsageSection
  try {
    mcpUsage = await buildMcpUsage(bucket, event?.sinceDt)
  } catch (error) {
    // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
    console.error('Failed to build MCP usage section', error)
    emitMetric('McpUsageBuildFailure', 1)
    mcpUsage = EMPTY_MCP_USAGE
  }

  // Off until a producer (the Nucleus bundler plugin) writes component-usage/;
  // querying the empty tables would only add Athena cost.
  let componentUsage = EMPTY_COMPONENT_USAGE
  if (process.env.COMPONENT_USAGE_ENABLED === 'true') {
    try {
      componentUsage = await buildComponentUsage(bucket)
    } catch (error) {
      // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
      console.error('Failed to build component usage section', error)
      emitMetric('ComponentUsageBuildFailure', 1)
    }
  }

  const snapshot: Snapshot = {
    generatedAt: new Date().toISOString(),
    portalViewTrends,
    mcpUsage,
    componentUsage,
  }

  await writeSnapshot(bucket, snapshot)

  const recentSince = windowStart(RECENT_VIEW_DAYS)
  const recentViews = portalViewTrends.perDay
    .filter((day) => day.dt >= recentSince)
    .reduce((sum, day) => sum + day.count, 0)

  emitMetric('SnapshotPortalViewCount', recentViews)

  return {
    generatedAt: snapshot.generatedAt,
    recentViews,
  }
}
