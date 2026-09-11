import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import type { McpUsageRecord } from './records/mcp-usage.js'

const s3 = new S3Client({})

/**
 * Write anonymous MCP usage records to S3 as newline-delimited JSON under the
 * mcp-usage/ prefix, partitioned by date. A unique key per batch prevents events
 * from overwriting each other within the same day. Best-effort: the caller must
 * not let a write failure affect the MCP response.
 */
export async function storeMcpUsage(
  bucket: string,
  records: McpUsageRecord[]
): Promise<void> {
  const first = records[0]
  if (!first) {
    return
  }

  const dt = first.createdat.slice(0, 10)
  const key = `mcp-usage/dt=${dt}/${Date.now()}-${randomUUID()}.json`
  const body = records.map((record) => JSON.stringify(record)).join('\n')

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: 'application/x-ndjson',
    })
  )
}
