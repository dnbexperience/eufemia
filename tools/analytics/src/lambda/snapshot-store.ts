import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

const s3 = new S3Client({})

// Key of the pre-generated dashboard snapshot in the data bucket. Must match the
// s3:GetObject resource in the dashboard-read execution role's policy.
export const SNAPSHOT_KEY = 'snapshots/dashboard.json'

// One combined snapshot with a named section per data source. New sources add a
// top-level key (e.g. mcpUsage) without reshaping the envelope or existing charts.
export type Snapshot = {
  generatedAt: string
  portalViews: unknown[]
  mcpUsage: McpUsageSection
}

// A daily MCP usage aggregate row (one per tool+component+path per day), read
// from and written to the durable mcp_usage_daily rollup.
export type McpUsageDaily = {
  dt: string
  tool: string
  component: string
  path: string
  count: number
}

export type McpUsageCount = { name: string; count: number }
export type McpUsageDay = { date: string; count: number }

// The MCP usage dashboard section: overall total plus ranked breakdowns and a
// daily series for trend/year-over-year views.
export type McpUsageSection = {
  total: number
  perTool: McpUsageCount[]
  perComponent: McpUsageCount[]
  perPath: McpUsageCount[]
  daily: McpUsageDay[]
}

export const EMPTY_MCP_USAGE: McpUsageSection = {
  total: 0,
  perTool: [],
  perComponent: [],
  perPath: [],
  daily: [],
}

export function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} environment variable is not set`)
  }

  return value
}

// Logs a message at most once per process, so a persistent misconfiguration
// (e.g. a missing s3:GetObject permission) surfaces in CloudWatch without
// repeating on every request.
const warned = new Set<string>()

function warnOnce(message: string): void {
  if (warned.has(message)) {
    return
  }

  warned.add(message)
  // eslint-disable-next-line no-console -- server-side logging to CloudWatch
  console.error(message)
}

export async function readSnapshot(
  bucket: string
): Promise<Snapshot | null> {
  try {
    const result = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: SNAPSHOT_KEY })
    )
    const body = await result.Body?.transformToString()

    return body ? (JSON.parse(body) as Snapshot) : null
  } catch (error) {
    // A missing snapshot is the expected cold-start case -> null (empty state).
    if (error instanceof Error && error.name === 'NoSuchKey') {
      return null
    }

    // Denied permissions, throttling, corrupt JSON: surface it rather than
    // masking a real failure as "no data yet".
    warnOnce(`[eufemia] failed to read dashboard snapshot: ${error}`)
    throw error
  }
}

export async function writeSnapshot(
  bucket: string,
  snapshot: Snapshot
): Promise<void> {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: SNAPSHOT_KEY,
      Body: JSON.stringify(snapshot),
      ContentType: 'application/json',
    })
  )
}

// Persist recomputed daily MCP usage aggregates, one object per day (overwrite).
// The mcp-usage-daily/ prefix has no lifecycle rule, so these survive the raw
// rows' expiry and keep long-range (year-over-year) comparison available.
export async function storeMcpUsageDaily(
  bucket: string,
  rows: McpUsageDaily[]
): Promise<void> {
  const byDt = new Map<string, McpUsageDaily[]>()

  for (const row of rows) {
    const list = byDt.get(row.dt) ?? []
    list.push(row)
    byDt.set(row.dt, list)
  }

  for (const [dt, dtRows] of byDt) {
    const body = dtRows
      .map((r) =>
        JSON.stringify({
          tool: r.tool,
          component: r.component,
          path: r.path,
          count: r.count,
        })
      )
      .join('\n')

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `mcp-usage-daily/dt=${dt}/agg.json`,
        Body: body,
        ContentType: 'application/x-ndjson',
      })
    )
  }
}
