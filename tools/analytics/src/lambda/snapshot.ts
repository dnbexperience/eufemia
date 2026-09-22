import {
  aggregateComponentUsageRaw,
  aggregateMcpUsageRaw,
  aggregatePortalViewsRaw,
  retrieveComponentUsageDaily,
  retrieveMcpUsageDaily,
  retrievePortalViews,
} from './retrieve.js'
import {
  EMPTY_COMPONENT_USAGE,
  EMPTY_MCP_USAGE,
  portalViewsDailyIsEmpty,
  requireEnv,
  storeComponentUsageDaily,
  storeMcpUsageDaily,
  storePortalViewsDaily,
  writeSnapshot,
  type ComponentUsageAggregate,
  type ComponentUsageCount,
  type ComponentUsageSection,
  type McpUsageCount,
  type McpUsageDaily,
  type McpUsageSection,
  type Snapshot,
} from './snapshot-store.js'

const SNAPSHOT_LIMIT = 1000

const METRIC_NAMESPACE = 'Eufemia/Analytics'

/**
 * Emit the snapshot record count as a CloudWatch metric using the Embedded
 * Metric Format (a structured log line). EMF needs only the Lambda's existing
 * log permissions, so the pre-provisioned execution role stays as-is (it cannot
 * be granted cloudwatch:PutMetricData in Terraform, ADR 0004). A sustained count
 * of 0 catches a run that succeeds but writes an empty snapshot — a state the
 * generator's Errors/Invocations alarms cannot see.
 *
 * The namespace, metric name, and FunctionName dimension below must stay in sync
 * with the `snapshot_empty` alarm in infra/main.tf; a mismatch silently leaves
 * the alarm at INSUFFICIENT_DATA.
 */
function emitRecordCountMetric(count: number): void {
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
            Metrics: [{ Name: 'SnapshotRecordCount', Unit: 'Count' }],
          },
        ],
      },
      FunctionName: functionName,
      SnapshotRecordCount: count,
    })
  )
}

/**
 * Emit an MCP-build failure as an EMF metric. A caught buildMcpUsage error does
 * not increment Lambda Errors and SnapshotRecordCount tracks portal views only,
 * so without this a broken MCP section would be invisible to monitoring. Kept in
 * sync with the `snapshot_mcp_build_failed` alarm in infra/main.tf.
 */
function emitMcpBuildFailureMetric(): void {
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
            Metrics: [{ Name: 'McpUsageBuildFailure', Unit: 'Count' }],
          },
        ],
      },
      FunctionName: functionName,
      McpUsageBuildFailure: 1,
    })
  )
}

/**
 * Emit a component-usage build failure as an EMF metric. Emitted both when the
 * durable rollup cannot be refreshed (history still served) and when the section
 * cannot be built at all (empty fallback); neither increments Lambda Errors, so
 * without this the degradation would be invisible. Kept in sync with the
 * `snapshot_component_usage_build_failed` alarm in infra/main.tf.
 */
function emitComponentUsageBuildFailureMetric(): void {
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
            Metrics: [
              { Name: 'ComponentUsageBuildFailure', Unit: 'Count' },
            ],
          },
        ],
      },
      FunctionName: functionName,
      ComponentUsageBuildFailure: 1,
    })
  )
}

/**
 * Emit a portal-view rollup-refresh failure as an EMF metric. The refresh is a
 * best-effort retention side-job (it does not feed the dashboard yet), so a
 * failure is swallowed rather than failing the run; without this metric that
 * degradation — the durable history quietly stops accruing — would be invisible.
 * Kept in sync with the `snapshot_portal_views_rollup_failed` alarm in
 * infra/main.tf.
 */
function emitPortalViewsRollupFailureMetric(): void {
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
            Metrics: [{ Name: 'PortalViewsRollupFailure', Unit: 'Count' }],
          },
        ],
      },
      FunctionName: functionName,
      PortalViewsRollupFailure: 1,
    })
  )
}

// The number of recent days recomputed into the durable daily rollup on each
// run. Wider than the hourly cadence so a short generator outage cannot leave a
// day permanently un-aggregated (raw rows live far longer, so re-runs backfill).
const MCP_ROLLUP_DAYS = 7
const MCP_TOP_LIMIT = 20

// Recent-tail window for the retention rollup refresh (mirrors MCP_ROLLUP_DAYS).
const PORTAL_VIEWS_ROLLUP_DAYS = 7

// One-time backfill start for the first rollup run. Matches the Glue partition
// projection range start, so it captures all retained raw history (raw rows only
// exist from when tracking shipped; earlier partitions are simply empty).
const PORTAL_VIEWS_BACKFILL_FROM = '2024-01-01'

function dayString(date: Date): string {
  return date.toISOString().slice(0, 10)
}

// Recompute raw page views into the durable portal_views_daily rollup. This is
// retention only — it preserves the anonymous view-dimension history (queryable
// via Athena) beyond the raw rows' 13-month expiry; the dashboard does not read
// it yet. Best-effort at the call site: a failure emits a metric but does not
// fail the snapshot run.
//
// On the first run the rollup is empty, so it backfills the full history in one
// pass — the raw rows predate this rollup and the retention rule now schedules
// them for expiry, so a recent-tail-only recompute would never capture them.
// Every later run only recomputes the recent tail (the wide scan runs once).
async function refreshPortalViewsRollup(bucket: string): Promise<void> {
  let sinceDt = PORTAL_VIEWS_BACKFILL_FROM

  if (!(await portalViewsDailyIsEmpty(bucket))) {
    const since = new Date()
    since.setUTCDate(since.getUTCDate() - (PORTAL_VIEWS_ROLLUP_DAYS - 1))
    sinceDt = dayString(since)
  }

  await storePortalViewsDaily(
    bucket,
    await aggregatePortalViewsRaw(sinceDt)
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

/**
 * Build the MCP usage dashboard section. First recomputes the recent tail of raw
 * usage into the durable daily rollup (idempotent overwrite), then reads the full
 * daily table. The rollup outlives the raw rows' 13-month expiry, so long-range
 * comparisons stay available without holding raw events forever.
 */
async function buildMcpUsage(bucket: string): Promise<McpUsageSection> {
  const since = new Date()
  since.setUTCDate(since.getUTCDate() - (MCP_ROLLUP_DAYS - 1))
  await storeMcpUsageDaily(
    bucket,
    await aggregateMcpUsageRaw(dayString(since))
  )

  const daily = await retrieveMcpUsageDaily()

  const dayTotals = new Map<string, number>()
  let total = 0

  for (const row of daily) {
    total += row.count
    dayTotals.set(row.dt, (dayTotals.get(row.dt) ?? 0) + row.count)
  }

  return {
    total,
    perTool: sumBy(daily, 'tool').slice(0, MCP_TOP_LIMIT),
    perComponent: sumBy(daily, 'component').slice(0, MCP_TOP_LIMIT),
    perPath: sumBy(daily, 'path').slice(0, MCP_TOP_LIMIT),
    daily: [...dayTotals.entries()]
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
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
  const since = new Date()
  since.setUTCDate(since.getUTCDate() - (COMPONENT_ROLLUP_DAYS - 1))

  try {
    await storeComponentUsageDaily(
      bucket,
      await aggregateComponentUsageRaw(dayString(since))
    )
  } catch (error) {
    // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
    console.error(
      'Failed to refresh the component usage daily rollup; serving existing history',
      error
    )
    emitComponentUsageBuildFailureMetric()
  }

  const daily = await retrieveComponentUsageDaily()

  const total = daily.reduce((sum, row) => sum + row.count, 0)

  return {
    total,
    perComponent: sumComponentUsageBy(daily, 'component').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
    perApp: sumComponentUsageBy(daily, 'app').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
    perVersion: sumComponentUsageBy(daily, 'version').slice(
      0,
      COMPONENT_TOP_LIMIT
    ),
  }
}

/**
 * Scheduled dashboard snapshot generator (EventBridge, off the request path).
 *
 * Queries Athena for the latest anonymous page views and writes the snapshot to
 * S3. Runs under the analytics execution role (Athena + S3 write); keeping it
 * separate from the read endpoint lets that endpoint run with a read-only role.
 */
export async function handler(): Promise<{
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
    refreshPortalViewsRollup(bucket).catch((error) => {
      // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
      console.error(
        'Failed to refresh the portal-view daily rollup',
        error
      )
      emitPortalViewsRollupFailureMetric()
    }),
  ])

  // The MCP section is additive; a failure here (e.g. a missing Glue grant or a
  // slow query) must not discard the portal views that were just fetched. Fall
  // back to the empty section so the rest of the dashboard keeps updating.
  let mcpUsage: McpUsageSection
  try {
    mcpUsage = await buildMcpUsage(bucket)
  } catch (error) {
    // eslint-disable-next-line no-console -- surface the failure in CloudWatch Logs
    console.error('Failed to build MCP usage section', error)
    emitMcpBuildFailureMetric()
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
  //     emitComponentUsageBuildFailureMetric()
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

  emitRecordCountMetric(snapshot.portalViews.length)

  return {
    generatedAt: snapshot.generatedAt,
    count: snapshot.portalViews.length,
  }
}
