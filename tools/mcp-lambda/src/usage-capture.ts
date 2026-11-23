import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import {
  usageRecordsFromToolCalls,
  type UsageResolver,
} from './records/mcp-usage.js'
import type { ToolCall } from './tool-calls.js'

const sqs = new SQSClient({})
const ENQUEUE_TIMEOUT_MS = 1_000

/**
 * Queue anonymous MCP usage (which tool, plus a component or doc path that
 * exists in the docs) for the tools that ran, stamped with the Eufemia version
 * of the served docs. Best-effort and bounded: any failure is logged and
 * swallowed so usage capture cannot consume the Lambda's full timeout.
 */
export async function captureUsage(
  toolCalls: ToolCall[],
  {
    resolver,
    eufemiaVersion,
  }: { resolver: UsageResolver; eufemiaVersion: string }
): Promise<void> {
  const queueUrl = process.env.USAGE_QUEUE_URL
  if (!queueUrl) {
    return
  }

  try {
    const records = await usageRecordsFromToolCalls(toolCalls, {
      env: process.env.USAGE_ENV ?? 'unknown',
      resolver,
    })
    if (records.length === 0) {
      return
    }

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(
          records.map((record) => ({
            ...record,
            eufemia_version: eufemiaVersion,
          }))
        ),
      }),
      { abortSignal: AbortSignal.timeout(ENQUEUE_TIMEOUT_MS) }
    )
  } catch (error) {
    // eslint-disable-next-line no-console -- server-side logging to CloudWatch
    console.error('[eufemia] MCP usage enqueue failed:', error)
  }
}
