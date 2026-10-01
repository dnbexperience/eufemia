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
  componentUsage: ComponentUsageSection
}

// A daily portal page-view aggregate row (one per path+env+dimension combo per
// day), written to the durable portal_views_daily rollup. The anonymous view
// dimensions are kept so their history survives the raw rows' expiry and stays
// queryable via Athena.
export type PortalViewDaily = {
  dt: string
  path: string
  env: string
  status: string
  locale: string
  theme: string
  color_scheme: string
  referrer: string
  via_search: string
  count: number
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
//
// `perVersion` is local-only: it counts transport='local' rows grouped by the
// reported Eufemia version. The web MCP Lambda always runs latest and records no
// version, so those rows are excluded rather than shown as a null bucket. The
// tool/component/path breakdowns above merge both transports.
export type McpUsageSection = {
  total: number
  perTool: McpUsageCount[]
  perComponent: McpUsageCount[]
  perPath: McpUsageCount[]
  perVersion: McpUsageCount[]
  daily: McpUsageDay[]
}

export const EMPTY_MCP_USAGE: McpUsageSection = {
  total: 0,
  perTool: [],
  perComponent: [],
  perPath: [],
  perVersion: [],
  daily: [],
}

// The component usage dashboard section: overall total plus ranked breakdowns by
// component, consuming app, and resolved Eufemia version. Populated once the
// Nucleus bundler plugin (the producer) lands; empty until then.
export type ComponentUsageCount = { name: string; count: number }

// A component-usage count keyed by app+component+version, summed across days.
// This is what the durable rollup returns for the dashboard section (Athena does
// the GROUP BY, so the read stays bounded regardless of how many days accrue).
export type ComponentUsageAggregate = {
  app: string
  component: string
  version: string
  count: number
}

// A daily component-usage aggregate row (one per app+component+version per day),
// written to the durable component_usage_daily rollup and recomputed from raw.
export type ComponentUsageDaily = ComponentUsageAggregate & { dt: string }

export type ComponentUsageSection = {
  total: number
  perComponent: ComponentUsageCount[]
  perApp: ComponentUsageCount[]
  perVersion: ComponentUsageCount[]
}

export const EMPTY_COMPONENT_USAGE: ComponentUsageSection = {
  total: 0,
  perComponent: [],
  perApp: [],
  perVersion: [],
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

// The *-daily/ prefixes have no lifecycle rule, so rollups outlive the raw rows'
// expiry. `projectRow` must emit exactly the Glue table's columns (minus `dt`).
export async function storeDailyRollup<T extends { dt: string }>(
  bucket: string,
  prefix: string,
  rows: T[],
  projectRow: (row: T) => Record<string, unknown>
): Promise<void> {
  const byDt = new Map<string, T[]>()

  for (const row of rows) {
    const list = byDt.get(row.dt) ?? []
    list.push(row)
    byDt.set(row.dt, list)
  }

  for (const [dt, dtRows] of byDt) {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `${prefix}dt=${dt}/agg.json`,
        Body: dtRows.map((r) => JSON.stringify(projectRow(r))).join('\n'),
        ContentType: 'application/x-ndjson',
      })
    )
  }
}
