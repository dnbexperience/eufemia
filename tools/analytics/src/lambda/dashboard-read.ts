import type { APIGatewayProxyResultV2 } from 'aws-lambda'
import { requireEnv } from './env.js'
import { json } from './http.js'
import { readSnapshot } from './snapshot-store.js'

/**
 * Browser-facing dashboard read endpoint (`GET /data`). Access is gated by the
 * JWT authorizer on the dashboard API.
 *
 * Intentionally read-only: it serves the snapshot produced by the scheduled
 * generator and never queries Athena or writes to S3, so its execution role
 * needs only `s3:GetObject` on the snapshot object. Any read failure, including
 * a snapshot the generator has not written yet, returns 503.
 */
export async function handler(): Promise<APIGatewayProxyResultV2> {
  const bucket = requireEnv('DATA_BUCKET')

  try {
    return json(200, await readSnapshot(bucket))
  } catch {
    return json(503, { error: 'Snapshot unavailable' })
  }
}
