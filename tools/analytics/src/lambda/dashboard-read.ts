import type { APIGatewayProxyResultV2 } from 'aws-lambda'
import { json } from './http.js'
import {
  readSnapshot,
  requireEnv,
  type Snapshot,
} from './snapshot-store.js'

const EMPTY: Snapshot = { generatedAt: '', records: [] }

/**
 * Browser-facing dashboard read endpoint (`GET /data`). Access is gated by the
 * JWT authorizer on the dashboard API.
 *
 * Intentionally read-only: it serves the snapshot produced by the scheduled
 * generator and never queries Athena or writes to S3, so its execution role
 * needs only `s3:GetObject` on the snapshot object. A missing snapshot (before
 * the generator has first run) yields an empty payload the frontend renders as
 * its empty state.
 */
export async function handler(): Promise<APIGatewayProxyResultV2> {
  const bucket = requireEnv('DATA_BUCKET')
  const snapshot = await readSnapshot(bucket)

  return json(200, snapshot ?? EMPTY)
}
