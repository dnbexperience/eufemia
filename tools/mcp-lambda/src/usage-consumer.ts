import type { SQSEvent } from 'aws-lambda'
import type { McpUsageRecord } from './records/mcp-usage.js'
import { storeMcpUsage } from './usage-store.js'

function isUsageRecord(value: unknown): value is McpUsageRecord {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const record = value as Record<string, unknown>

  return (
    typeof record.tool === 'string' &&
    typeof record.component === 'string' &&
    // Optional: messages queued by the previous release lack these two.
    (record.component_missed === undefined ||
      typeof record.component_missed === 'boolean') &&
    (record.likely_component === undefined ||
      typeof record.likely_component === 'string') &&
    typeof record.path === 'string' &&
    typeof record.env === 'string' &&
    record.transport === 'web' &&
    typeof record.timestamp === 'string' &&
    typeof record.created_at === 'string'
  )
}

function recordsFromMessage(body: string): McpUsageRecord[] | null {
  try {
    const parsed: unknown = JSON.parse(body)

    return Array.isArray(parsed) && parsed.every(isUsageRecord)
      ? parsed
      : null
  } catch {
    return null
  }
}

export async function handler(event: SQSEvent): Promise<void> {
  const bucket = process.env.DATA_BUCKET
  if (!bucket) {
    throw new Error('DATA_BUCKET environment variable is not set')
  }

  const records: McpUsageRecord[] = []
  for (const message of event.Records) {
    const messageRecords = recordsFromMessage(message.body)
    if (messageRecords) {
      records.push(...messageRecords)
    } else {
      // eslint-disable-next-line no-console -- malformed messages are dropped
      console.error(
        `[eufemia] Dropping malformed MCP usage message ${message.messageId}`
      )
    }
  }

  await storeMcpUsage(bucket, records)
}
