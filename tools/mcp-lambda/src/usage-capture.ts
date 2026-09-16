import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { usageRecordsFromRequestBody } from './records/mcp-usage.js'

const sqs = new SQSClient({})
const ENQUEUE_TIMEOUT_MS = 1_000

/**
 * Queue anonymous MCP usage (which tool, plus an allow-listed component or doc
 * path) from the request body. Best-effort and bounded: any failure is logged
 * and swallowed so usage capture cannot consume the Lambda's full timeout.
 */
export async function captureUsage(
  event: APIGatewayProxyEventV2
): Promise<void> {
  const queueUrl = process.env.USAGE_QUEUE_URL
  if (!queueUrl || event.body == null) {
    return
  }

  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body

    const records = usageRecordsFromRequestBody(body, {
      env: process.env.USAGE_ENV ?? 'unknown',
    })
    if (records.length === 0) {
      return
    }

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(records),
      }),
      { abortSignal: AbortSignal.timeout(ENQUEUE_TIMEOUT_MS) }
    )
  } catch (error) {
    // eslint-disable-next-line no-console -- server-side logging to CloudWatch
    console.error('[eufemia] MCP usage enqueue failed:', error)
  }
}
