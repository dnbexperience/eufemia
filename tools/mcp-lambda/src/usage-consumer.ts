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
    typeof record.path === 'string' &&
    typeof record.env === 'string' &&
    typeof record.timestamp === 'string' &&
    typeof record.created_at === 'string'
  )
}

// Messages queued before the snake_case rename; remove with the rewrite script.
function withCreatedAt(value: unknown): unknown {
  if (
    typeof value !== 'object' ||
    value === null ||
    'created_at' in value ||
    !('createdat' in value)
  ) {
    return value
  }

  const { createdat, ...rest } = value as Record<string, unknown>

  return { ...rest, created_at: createdat }
}

function recordsFromMessage(body: string): McpUsageRecord[] | null {
  try {
    const parsed: unknown = JSON.parse(body)

    if (!Array.isArray(parsed)) {
      return null
    }

    const records = parsed.map(withCreatedAt)

    return records.every(isUsageRecord) ? records : null
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
