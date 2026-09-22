import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import {
  buildPortalViewRecord,
  type PortalViewInput,
} from '../records/portal-view.js'
import {
  buildMcpUsageRecord,
  type McpUsageInput,
  type McpUsageTransport,
} from '../records/mcp-usage.js'

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

/**
 * Persist a batch of anonymous MCP usage events as newline-delimited JSON under
 * the mcp-usage/ prefix — the same prefix and Glue table the web MCP producer
 * writes to, discriminated by the `transport` field. The transport is stamped
 * here (not taken from the client), so the local ingest route can only ever
 * write `local` rows.
 *
 * A unique key per batch (timestamp + UUID) prevents events from overwriting
 * each other within the same day.
 */
export async function storeMcpUsage(
  events: McpUsageInput[],
  transport: McpUsageTransport
): Promise<number> {
  const createdAt = new Date().toISOString()
  const dt = createdAt.slice(0, 10)
  const key = `mcp-usage/dt=${dt}/${Date.now()}-${randomUUID()}.json`

  const body = events
    .map((event) =>
      JSON.stringify(buildMcpUsageRecord(event, createdAt, transport))
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
