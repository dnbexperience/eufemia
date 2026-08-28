import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import type { APIGatewayProxyResultV2 } from 'aws-lambda'
import { json } from './http.js'
import { retrieveRecords } from './retrieve.js'

const s3 = new S3Client({})

const SNAPSHOT_KEY = 'dashboard/records.json'
const MAX_AGE_MS = 60 * 60 * 1000
const SNAPSHOT_LIMIT = 1000

type Snapshot = {
  generatedAt: string
  records: unknown[]
}

function requireEnv(name: string): string {
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

async function readSnapshot(bucket: string): Promise<Snapshot | null> {
  try {
    const result = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: SNAPSHOT_KEY })
    )
    const body = await result.Body?.transformToString()

    return body ? (JSON.parse(body) as Snapshot) : null
  } catch (error) {
    // A missing snapshot is the expected cold-start case; anything else (denied
    // permissions, throttling, corrupt JSON) is a real problem worth surfacing.
    if (!(error instanceof Error) || error.name !== 'NoSuchKey') {
      warnOnce(`[eufemia] failed to read dashboard snapshot: ${error}`)
    }

    return null
  }
}

async function writeSnapshot(
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

function isFresh(snapshot: Snapshot): boolean {
  const generated = Date.parse(snapshot.generatedAt)

  return Number.isFinite(generated) && Date.now() - generated < MAX_AGE_MS
}

// Coalesce concurrent recomputes within a warm container so a burst of requests
// shares one Athena query and S3 write instead of each firing its own. This
// does not span containers, but absorbs the common warm-start burst.
let inFlight: Promise<Snapshot> | null = null

function recomputeSnapshot(bucket: string): Promise<Snapshot> {
  if (!inFlight) {
    inFlight = (async () => {
      const snapshot: Snapshot = {
        generatedAt: new Date().toISOString(),
        records: await retrieveRecords({ limit: SNAPSHOT_LIMIT }),
      }
      await writeSnapshot(bucket, snapshot)

      return snapshot
    })().finally(() => {
      inFlight = null
    })
  }

  return inFlight
}

/**
 * Return the dashboard snapshot. Access is gated by the JWT authorizer on the
 * dashboard API, so no origin/bearer check is repeated here.
 *
 * Write-through cache: serve a fresh snapshot from S3, otherwise recompute it
 * from Athena, store it, and return it. On a query failure a stale snapshot is
 * preferred over an error.
 */
export async function handleDashboardData(): Promise<APIGatewayProxyResultV2> {
  const bucket = requireEnv('DATA_BUCKET')

  const cached = await readSnapshot(bucket)
  if (cached && isFresh(cached)) {
    return json(200, cached)
  }

  try {
    return json(200, await recomputeSnapshot(bucket))
  } catch (error) {
    if (cached) {
      return json(200, cached)
    }

    throw error
  }
}
