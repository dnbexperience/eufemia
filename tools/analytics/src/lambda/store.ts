import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import type {
  AnalyticsRecord,
  AnalyticsRecordInput,
  PageViewInput,
} from '../types.js'

const s3 = new S3Client({})

function dataBucket(): string {
  const bucket = process.env.DATA_BUCKET

  if (!bucket) {
    throw new Error('DATA_BUCKET environment variable is not set')
  }

  return bucket
}

/**
 * Persist a record to S3 as a single JSON object.
 *
 * Objects are partitioned by date (`records/dt=YYYY-MM-DD/<id>.json`) so the
 * Glue table can use partition projection and Athena only scans the relevant
 * days. Keys are written lowercase to match the Glue column names.
 */
export async function storeRecord(
  input: AnalyticsRecordInput
): Promise<AnalyticsRecord> {
  const record: AnalyticsRecord = {
    ...input,
    createdAt: new Date().toISOString(),
  }

  const dt = record.createdAt.slice(0, 10)
  const key = `records/dt=${dt}/${record.id}.json`

  const body = JSON.stringify({
    id: record.id,
    name: record.name,
    value: record.value,
    createdat: record.createdAt,
  })

  await s3.send(
    new PutObjectCommand({
      Bucket: dataBucket(),
      Key: key,
      Body: body,
      ContentType: 'application/json',
    })
  )

  return record
}

/** Drop the query string and fragment so no incidental data is stored. */
function normalizePath(path: string): string {
  return path.split(/[?#]/)[0]
}

/**
 * Persist a batch of anonymous page views as a single newline-delimited JSON
 * object (one event per line), so the Glue table reads each line as a row and
 * high-frequency events do not produce one tiny S3 object each.
 *
 * A unique key per batch (timestamp + UUID) prevents events from overwriting
 * each other within the same day.
 */
export async function storePageViews(
  events: PageViewInput[]
): Promise<number> {
  const createdAt = new Date().toISOString()
  const dt = createdAt.slice(0, 10)
  const key = `records/dt=${dt}/${Date.now()}-${randomUUID()}.json`

  const body = events
    .map((event) =>
      JSON.stringify({
        type: 'pageview',
        path: normalizePath(event.path),
        timestamp: event.timestamp ?? createdAt,
        createdat: createdAt,
      })
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
