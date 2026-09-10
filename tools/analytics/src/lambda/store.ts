import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import {
  buildPortalViewRecord,
  type PortalViewInput,
} from '../records/portal-view.js'

const s3 = new S3Client({})

function dataBucket(): string {
  const bucket = process.env.DATA_BUCKET

  if (!bucket) {
    throw new Error('DATA_BUCKET environment variable is not set')
  }

  return bucket
}

/**
 * Persist a batch of anonymous portal views as newline-delimited JSON (one
 * event per line) under the portal-views/ prefix, so the Glue table reads each
 * line as a row and high-frequency events do not each create a tiny S3 object.
 *
 * A unique key per batch (timestamp + UUID) prevents events from overwriting
 * each other within the same day.
 */
export async function storePortalViews(
  events: PortalViewInput[]
): Promise<number> {
  const createdAt = new Date().toISOString()
  const dt = createdAt.slice(0, 10)
  const key = `portal-views/dt=${dt}/${Date.now()}-${randomUUID()}.json`

  const body = events
    .map((event) =>
      JSON.stringify(buildPortalViewRecord(event, createdAt))
    )
    .join('\n')

  await s3.send(
    new PutObjectCommand({
      Bucket: dataBucket(),
      Key: key,
      Body: body,
      ContentType: 'application/x-ndjson',
    })
  )

  return events.length
}
