/**
 * One-time migration: rewrite raw mcp-usage/ rows from the legacy
 * `eufemiaVersion` / `createdat` keys to `eufemia_version` / `created_at`, so
 * rows written before the snake_case rename stay readable through the renamed
 * Glue columns. Objects are overwritten in place (same key); bucket versioning
 * keeps the previous version for the noncurrent-expiry window. Overwriting also
 * restarts each object's raw-prefix expiry, and makes these keys briefly not
 * write-once (see the lifecycle rules in infra/main.tf).
 *
 * Run once after the analytics deploy (local rows) and again after the MCP
 * Lambda release (web rows), since that stack deploys only on release.
 * Idempotent: rows already using the new keys are left as-is, so a re-run only
 * touches stragglers.
 *
 *   AWS_REGION=eu-north-1 node tools/analytics/src/scripts/rewrite-mcp-usage-keys.ts \
 *     --bucket <data-bucket> [--prefix mcp-usage/dt=2026-09-20/] [--dry-run]
 */

import { pathToFileURL } from 'node:url'
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

const RENAMED_KEYS: ReadonlyMap<string, string> = new Map([
  ['eufemiaversion', 'eufemia_version'],
  ['createdat', 'created_at'],
])

const CONCURRENCY = 16

/** Rename the legacy keys in one NDJSON row; returns null when nothing changed. */
export function rewriteRow(line: string): string | null {
  let row: unknown
  try {
    row = JSON.parse(line)
  } catch {
    return null
  }

  if (typeof row !== 'object' || row === null || Array.isArray(row)) {
    return null
  }

  const entries = Object.entries(row)
  const existing = new Set(entries.map(([key]) => key))
  let changed = false

  const rewritten = entries.flatMap(
    ([key, value]): [string, unknown][] => {
      // The Glue SerDe matched the legacy keys case-insensitively, so do the same.
      const target = RENAMED_KEYS.get(key.toLowerCase())

      if (!target) {
        return [[key, value]]
      }

      changed = true

      return existing.has(target) ? [] : [[target, value]]
    }
  )

  return changed ? JSON.stringify(Object.fromEntries(rewritten)) : null
}

/** Rewrite every row of an NDJSON object body; returns null when nothing changed. */
export function rewriteBody(body: string): string | null {
  let changed = false

  const lines = body.split('\n').map((line) => {
    const rewritten = line.trim() === '' ? null : rewriteRow(line)

    if (rewritten === null) {
      return line
    }

    changed = true
    return rewritten
  })

  return changed ? lines.join('\n') : null
}

function argValue(args: string[], name: string): string | undefined {
  const index = args.indexOf(name)

  if (index < 0) {
    return undefined
  }

  const value = args[index + 1]

  if (!value || value.startsWith('--')) {
    throw new Error(`${name} needs a value`)
  }

  return value
}

async function main(args: string[]): Promise<void> {
  const bucket = argValue(args, '--bucket')
  const prefix = argValue(args, '--prefix') ?? 'mcp-usage/'
  const dryRun = args.includes('--dry-run')

  if (!bucket || !prefix.startsWith('mcp-usage/')) {
    throw new Error(
      'Usage: --bucket <data-bucket> [--prefix mcp-usage/...] [--dry-run]'
    )
  }

  const s3 = new S3Client({})
  const keys: string[] = []
  let token: string | undefined

  do {
    const page = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: token,
      })
    )

    for (const object of page.Contents ?? []) {
      if (object.Key) {
        keys.push(object.Key)
      }
    }

    token = page.NextContinuationToken
  } while (token)

  let rewritten = 0
  let next = 0

  async function worker(): Promise<void> {
    while (next < keys.length) {
      const key = keys[next++]

      try {
        await rewriteObject(key)
      } catch (error) {
        throw new Error(
          `Failed on ${key} after rewriting ${rewritten} objects (safe to re-run): ${error}`,
          { cause: error }
        )
      }
    }
  }

  async function rewriteObject(key: string): Promise<void> {
    const object = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    )
    const body = rewriteBody(
      (await object.Body?.transformToString()) ?? ''
    )

    if (body === null) {
      return
    }

    if (!dryRun) {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: 'application/x-ndjson',
        })
      )
    }

    rewritten++
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  process.stdout.write(
    `${dryRun ? 'Would rewrite' : 'Rewrote'} ${rewritten} of ${keys.length} objects under s3://${bucket}/${prefix}\n`
  )
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main(process.argv.slice(2)).catch((error) => {
    process.stderr.write(`${error}\n`)
    process.exit(1)
  })
}
