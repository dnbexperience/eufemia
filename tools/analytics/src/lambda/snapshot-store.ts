import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

const s3 = new S3Client({})

// Key of the pre-generated dashboard snapshot in the data bucket. Must match the
// s3:GetObject resource in the dashboard-read execution role's policy.
export const SNAPSHOT_KEY = 'records/dashboard-snapshot.json'

export type Snapshot = {
  generatedAt: string
  records: unknown[]
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
