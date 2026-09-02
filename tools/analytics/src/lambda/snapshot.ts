import { retrievePageViews } from './retrieve.js'
import {
  requireEnv,
  writeSnapshot,
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
    records: await retrievePageViews({ limit: SNAPSHOT_LIMIT }),
  }

  await writeSnapshot(bucket, snapshot)

  emitRecordCountMetric(snapshot.records.length)

  return {
    generatedAt: snapshot.generatedAt,
    count: snapshot.records.length,
  }
}
