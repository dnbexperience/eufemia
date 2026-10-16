import {
  aggregateComponentUsageRaw,
  aggregateLocalMcpUsageByVersion,
  aggregateMcpUsageRaw,
  aggregatePortalViewsRaw,
  retrieveComponentUsageTotals,
  retrieveMcpUsageDaily,
  retrievePortalViews,
} from './retrieve.js'
import {
  EMPTY_COMPONENT_USAGE,
  EMPTY_MCP_USAGE,
  requireEnv,
  storeDailyRollup,
  writeSnapshot,
  type ComponentUsageAggregate,
  type ComponentUsageCount,
  type ComponentUsageSection,
  type McpTransportUsage,
  type McpUsageCount,
  type McpUsageDaily,
  type McpUsageSection,
  type Snapshot,
} from './snapshot-store.js'

const SNAPSHOT_LIMIT = 1000

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
 * The namespace, metric name, and FunctionName dimension must stay in sync with
 * the matching alarm in infra/main.tf; a mismatch silently leaves the alarm at
 * INSUFFICIENT_DATA. Metrics and their alarms:
 * - SnapshotPortalViewCount (`snapshot_empty`): a sustained 0 catches a run
 *   that succeeds but writes a snapshot with no page views, which the
 *   Errors/Invocations alarms cannot see.
 * - McpUsageBuildFailure (`snapshot_mcp_build_failed`): emitted when the
 *   durable rollup refresh fails or buildMcpUsage cannot build the section;
 *   neither increments Lambda Errors.
 * - ComponentUsageBuildFailure (`snapshot_component_usage_build_failed`): emitted
 *   when the durable rollup cannot be refreshed or the section cannot be built.
 * - PortalViewsRollupFailure (`snapshot_portal_views_rollup_failed`): the
 *   best-effort rollup refresh is swallowed, so its failure is otherwise silent.
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

// The number of recent days recomputed into the durable daily rollup on each
// run. Wider than the hourly cadence so a short generator outage cannot leave a
// day permanently un-aggregated (raw rows live far longer, so re-runs backfill).
const MCP_ROLLUP_DAYS = 7
const MCP_TOP_LIMIT = 20

// Recent window for the local-by-version breakdown. Unlike the daily-rollup
// reads above, this scans the raw per-request mcp_usage table directly (it has
// no durable rollup for the version dimension), so it needs its own
// bound to stay cheap as the table's 13-month retention fills; it also keeps
// the metric focused on currently-relevant versions rather than all-time history.
const MCP_VERSION_WINDOW_DAYS = 90

// Recent-tail window for the retention rollup refresh (mirrors MCP_ROLLUP_DAYS).
const PORTAL_VIEWS_ROLLUP_DAYS = 7

// First day (YYYY-MM-DD, UTC) of the `days`-long window that ends today.
function windowStart(days: number): string {
  const since = new Date()
  since.setUTCDate(since.getUTCDate() - (days - 1))

  return since.toISOString().slice(0, 10)
}

// Recompute raw page views into the durable portal_views_daily rollup. This is
// retention only — it preserves the anonymous view-dimension history (queryable
// via Athena) beyond the raw rows' 13-month expiry; the dashboard does not read
// it yet. Best-effort at the call site: a failure emits a metric but does not
// fail the snapshot run.
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
  const from = sinceDt || windowStart(PORTAL_VIEWS_ROLLUP_DAYS)

  await storeDailyRollup(
    bucket,
    'portal-views-daily/',
    await aggregatePortalViewsRaw(from),
    ({
      path,
      env,
      status,
      locale,
      theme,
      color_scheme,
      referrer,
      via_search,
      count,
    }) => ({
      path,
      env,
      status,
      locale,
      theme,
      color_scheme,
      referrer,
      via_search,
      count,
    })
  )
}

function sumBy(
  rows: McpUsageDaily[],
  key: 'tool' | 'component' | 'path'
): McpUsageCount[] {
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

function buildTransportUsage(
  daily: McpUsageDaily[],
  transport: 'web' | 'local'
): McpTransportUsage {
  const rows = daily.filter((row) => row.transport === transport)
  const dayTotals = new Map<string, number>()
  let total = 0

  for (const row of rows) {
    total += row.count
    dayTotals.set(row.dt, (dayTotals.get(row.dt) ?? 0) + row.count)
  }

  return {
    total,
    perTool: sumBy(rows, 'tool').slice(0, MCP_TOP_LIMIT),
    perComponent: sumBy(rows, 'component').slice(0, MCP_TOP_LIMIT),
    perPath: sumBy(rows, 'path').slice(0, MCP_TOP_LIMIT),
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
  const from = sinceDt || windowStart(MCP_ROLLUP_DAYS)

  try {
    await storeDailyRollup(
      bucket,
      'mcp-usage-daily/',
      await aggregateMcpUsageRaw(from),
      ({ transport, tool, component, path, count }) => ({
        transport,
        tool,
        component,
        path,
        count,
      })
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

// Like MCP_ROLLUP_DAYS: recompute a recent tail wider than the hourly cadence so
// a short generator outage cannot leave a day permanently un-aggregated (raw
// rows live far longer, so re-runs backfill).
const COMPONENT_ROLLUP_DAYS = 7

function sumComponentUsageBy(
  rows: ComponentUsageAggregate[],
  key: 'component' | 'app' | 'version'
): ComponentUsageCount[] {
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

/**
 * Build the component-usage dashboard section. First recomputes the recent tail
 * of raw usage into the durable daily rollup, then reads the full daily table.
 * The rollup outlives the raw rows' expiry, so long-range adoption history stays
 * available without holding raw events forever.
 *
 * NOT currently called by the generator — the section ships empty until a
 * producer (the Nucleus bundler plugin) exists, to avoid querying empty tables.
 * Exported and tested so re-wiring means restoring the try/catch snippet in the
 * handler (it must catch, since this throws on a durable-read failure — falling
 * back to the empty section so one section can't blank the whole snapshot).
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
      await aggregateComponentUsageRaw(windowStart(COMPONENT_ROLLUP_DAYS)),
      ({ app, component, version, count }) => ({
        app,
        component,
        version,
        count,
      })
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
    perComponent: sumComponentUsageBy(usageTotals, 'component').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
    perApp: sumComponentUsageBy(usageTotals, 'app').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
    perVersion: sumComponentUsageBy(usageTotals, 'version').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
  }
}

/**
 * Scheduled dashboard snapshot generator (EventBridge, off the request path).
 *
 * Queries Athena for the latest anonymous page views and the MCP usage section,
 * refreshes the durable daily rollups, and writes the snapshot to S3. Runs
 * under the analytics execution role (Athena + S3 write); keeping it separate
 * from the read endpoint lets that endpoint run with a read-only role.
 *
 * An optional `sinceDt` on the invocation event backfills the page-view and MCP
 * usage rollups from that date instead of the recent tail — used for one-time
 * historical backfills (see the analytics README). Scheduled invocations pass none.
 */
export async function handler(event?: { sinceDt?: string }): Promise<{
  generatedAt: string
  count: number
}> {
  const bucket = requireEnv('DATA_BUCKET')

  // Fetch the dashboard's portal-view rows (load-bearing) and refresh the durable
  // page-view rollup concurrently. The rollup refresh is retention only and must
  // not fail the run, so its failure is caught and surfaced via a metric; keeping
  // it concurrent with the read keeps the added Athena query within the timeout.
  const [portalViews] = await Promise.all([
    retrievePortalViews({ limit: SNAPSHOT_LIMIT }),
    refreshPortalViewsRollup(bucket, event?.sinceDt).catch((error) => {
      // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
      console.error(
        'Failed to refresh the portal-view daily rollup',
        error
      )
      emitMetric('PortalViewsRollupFailure', 1)
    }),
  ])

  // The MCP section is additive; a failure here (e.g. a missing Glue grant or a
  // slow query) must not discard the portal views that were just fetched. Fall
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

  // The component-usage section is deliberately NOT wired to Athena yet: there
  // is no producer (the Nucleus bundler plugin) writing to component-usage/, so
  // querying the empty tables every run would only add Athena cost and an empty
  // section. Ship the empty section until a producer exists.
  //
  // To re-enable once a producer lands, build it inside a try/catch so a failure
  // here can't discard the portal views / MCP section already built (additive
  // sections must fail independently):
  //   let componentUsage: ComponentUsageSection
  //   try {
  //     componentUsage = await buildComponentUsage(bucket)
  //   } catch (error) {
  //     console.error('Failed to build component usage section', error)
  //     emitMetric('ComponentUsageBuildFailure', 1)
  //     componentUsage = EMPTY_COMPONENT_USAGE
  //   }
  // Also build it CONCURRENTLY with the other sections (Promise.all) — wiring it
  // in adds two Athena queries, and run sequentially the total (portal read +
  // rollup refresh + 2 MCP + 2 here) can exceed the Lambda timeout, killing the
  // run before writeSnapshot. The infra "gives the snapshot generator enough
  // timeout for its Athena queries" test assumes this is unwired; update it when
  // re-enabling.
  const componentUsage: ComponentUsageSection = EMPTY_COMPONENT_USAGE

  const snapshot: Snapshot = {
    generatedAt: new Date().toISOString(),
    portalViews,
    mcpUsage,
    componentUsage,
  }

  await writeSnapshot(bucket, snapshot)

  emitMetric('SnapshotPortalViewCount', snapshot.portalViews.length)

  return {
    generatedAt: snapshot.generatedAt,
    count: snapshot.portalViews.length,
  }
}
