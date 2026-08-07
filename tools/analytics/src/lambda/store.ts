import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { AnalyticsRecord, AnalyticsRecordInput } from '../types.js'

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
