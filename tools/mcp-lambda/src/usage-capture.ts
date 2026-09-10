import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { usageRecordsFromRequestBody } from './records/mcp-usage.js'
import { storeMcpUsage } from './usage-store.js'

/**
 * Record anonymous MCP usage (which tool, plus an allow-listed component or doc
 * path) from the request body. Best-effort and fully isolated: any failure is
 * logged and swallowed so usage capture never affects the MCP response. A no-op
 * when DATA_BUCKET is unset.
 */
export async function captureUsage(
  event: APIGatewayProxyEventV2
): Promise<void> {
  const bucket = process.env.DATA_BUCKET
  if (!bucket || event.body == null) {
    return
  }

  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body

    const records = usageRecordsFromRequestBody(body, {
      env: process.env.USAGE_ENV ?? 'unknown',
    })
    await storeMcpUsage(bucket, records)
  } catch (error) {
    // eslint-disable-next-line no-console -- server-side logging to CloudWatch
    console.error('[eufemia] MCP usage capture failed:', error)
  }
}
