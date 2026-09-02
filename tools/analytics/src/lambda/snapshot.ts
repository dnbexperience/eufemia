import { retrievePageViews } from './retrieve.js'
import {
  requireEnv,
  writeSnapshot,
  type Snapshot,
} from './snapshot-store.js'

const SNAPSHOT_LIMIT = 1000

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

  return {
    generatedAt: snapshot.generatedAt,
    count: snapshot.records.length,
  }
}
