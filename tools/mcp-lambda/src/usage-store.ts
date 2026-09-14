import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import type { McpUsageRecord } from './records/mcp-usage.js'

const s3 = new S3Client({})

/**
 * Write anonymous MCP usage records to S3 as newline-delimited JSON under the
 * mcp-usage/ prefix, partitioned by date. A unique key per batch prevents events
 * from overwriting each other within the same day. The SQS consumer retries a
 * failed write without coupling storage availability to the MCP response.
 */
export async function storeMcpUsage(
  bucket: string,
  records: McpUsageRecord[]
): Promise<void> {
  if (records.length === 0) {
    return
  }

  const byDate = new Map<string, McpUsageRecord[]>()
  for (const record of records) {
    const date = record.createdat.slice(0, 10)
    const dateRecords = byDate.get(date) ?? []
    dateRecords.push(record)
    byDate.set(date, dateRecords)
  }

  await Promise.all(
    [...byDate].map(([date, dateRecords]) =>
      s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: `mcp-usage/dt=${date}/${Date.now()}-${randomUUID()}.json`,
          Body: dateRecords
            .map((record) => JSON.stringify(record))
            .join('\n'),
          ContentType: 'application/x-ndjson',
        })
      )
    )
  )
}
