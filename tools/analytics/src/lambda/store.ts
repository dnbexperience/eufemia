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
 * Write a batch as newline-delimited JSON (one record per line) under the
 * given prefix, so the Glue table reads each line as a row and high-frequency
 * events do not each create a tiny S3 object.
 *
 * A unique key per batch (timestamp + UUID) prevents events from overwriting
 * each other within the same day.
 */
async function putBatch<T>(
  prefix: string,
  events: T[],
  buildRecord: (event: T, createdAt: string) => object
): Promise<number> {
  const createdAt = new Date().toISOString()
  const dt = createdAt.slice(0, 10)
  const key = `${prefix}/dt=${dt}/${Date.now()}-${randomUUID()}.json`

  const body = events
    .map((event) => JSON.stringify(buildRecord(event, createdAt)))
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

export function storePortalViews(
  events: PortalViewInput[]
): Promise<number> {
  return putBatch('portal-views', events, buildPortalViewRecord)
}

/**
 * Persist a batch of anonymous MCP usage events under the mcp-usage/ prefix,
 * shared with the web MCP producer (tools/mcp-lambda) and told apart by
 * `transport`. The transport is stamped here (not taken from the client), so
 * the local ingest route can only ever write `local` rows.
 */
export function storeMcpUsage(
  events: McpUsageInput[],
  transport: McpUsageTransport
): Promise<number> {
  return putBatch('mcp-usage', events, (event, createdAt) =>
    buildMcpUsageRecord(event, createdAt, transport)
  )
}
