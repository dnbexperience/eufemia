import {
  aggregateMcpUsageRaw,
  retrieveMcpUsageDaily,
  retrievePortalViews,
} from './retrieve.js'
import {
  requireEnv,
  storeMcpUsageDaily,
  writeSnapshot,
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

// The number of recent days recomputed into the durable daily rollup on each
// run. Wider than the hourly cadence so a short generator outage cannot leave a
// day permanently un-aggregated (raw rows live far longer, so re-runs backfill).
const MCP_ROLLUP_DAYS = 7
const MCP_TOP_LIMIT = 20

function dayString(date: Date): string {
  return date.toISOString().slice(0, 10)
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

  const snapshot: Snapshot = {
    generatedAt: new Date().toISOString(),
    portalViews: await retrievePortalViews({ limit: SNAPSHOT_LIMIT }),
    mcpUsage: await buildMcpUsage(bucket),
  }

  await writeSnapshot(bucket, snapshot)

  emitRecordCountMetric(snapshot.portalViews.length)

  return {
    generatedAt: snapshot.generatedAt,
    count: snapshot.portalViews.length,
  }
}
