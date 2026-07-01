/**
 * Duration-balanced sharding for the screenshot suite.
 *
 * Vitest's native `--shard` splits files by count, which produces badly
 * unbalanced shards because a handful of files (Table, Button, Anchor, …)
 * contain far more screenshots than the rest. The slowest shard then
 * dominates the CI wall-clock.
 *
 * Instead we read a committed per-file timing manifest
 * (`screenshotTimings.json`, regenerated with
 * `yarn workspace @dnb/eufemia test:screenshots:timings`) and assign files
 * to shards with the classic greedy "longest processing time first" (LPT)
 * bin-packing heuristic: sort files by duration descending, then drop each
 * file into the shard with the least accumulated time. Files missing from
 * the manifest fall back to the median known duration so new or renamed
 * tests still balance sensibly without a manifest refresh.
 *
 * The resulting per-shard file list is passed to Vitest via the existing
 * `SCREENSHOT_INCLUDE` mechanism, so no native `--shard` flag is used.
 */

import fs from 'node:fs'
import path from 'node:path'
import globby from 'globby'

// Matches the `include` glob in vitest.config.screenshots.ts.
export const SCREENSHOT_TEST_GLOB = 'src/**/*.screenshot.test.{ts,tsx}'

// Committed timing manifest consumed for balancing. Resolved from the
// package root (process.cwd()) rather than __dirname/import.meta so it
// works whether these scripts run as ESM (node --experimental-strip-types)
// or under Vitest — every invocation runs from packages/dnb-eufemia.
export const SCREENSHOT_TIMINGS_PATH = path.resolve(
  process.cwd(),
  'scripts/tools/vitest/screenshotTimings.json'
)

// A shard can legitimately end up empty (e.g. a tiny conditional subset
// split across shards). An empty `SCREENSHOT_INCLUDE` would fall back to
// the full glob in the config, so we point it at a path that matches
// nothing instead and rely on `--passWithNoTests`.
export const EMPTY_SHARD_SENTINEL =
  'src/__no_matching_screenshot_test__.screenshot.test.ts'

export type ScreenshotTimings = Record<string, number>

type TimingsFile =
  | ScreenshotTimings
  | { durations?: ScreenshotTimings; [key: string]: unknown }

/**
 * Read the committed timing manifest. Supports both a flat
 * `{ file: ms }` map and a `{ durations: { file: ms } }` wrapper so the
 * on-disk format can carry a human-readable comment. Returns an empty
 * map when the manifest is missing or unreadable — balancing then falls
 * back entirely to the neutral default weight.
 */
export function loadScreenshotTimings(
  timingsPath: string = SCREENSHOT_TIMINGS_PATH
): ScreenshotTimings {
  try {
    const parsed = JSON.parse(
      fs.readFileSync(timingsPath, 'utf-8')
    ) as TimingsFile

    const durations =
      parsed && typeof parsed === 'object' && 'durations' in parsed
        ? (parsed.durations ?? {})
        : (parsed as ScreenshotTimings)

    const result: ScreenshotTimings = {}
    for (const [file, value] of Object.entries(durations)) {
      if (
        typeof value === 'number' &&
        Number.isFinite(value) &&
        value > 0
      ) {
        result[file] = value
      }
    }
    return result
  } catch {
    return {}
  }
}

/**
 * Median of the known durations, used as the weight for files absent
 * from the manifest. Median (not mean) keeps a few very heavy files from
 * inflating the fallback. Defaults to 1 when the manifest is empty so
 * every file still carries an equal, non-zero weight.
 */
export function computeFallbackWeight(weights: ScreenshotTimings): number {
  const values = Object.values(weights).sort((a, b) => a - b)
  if (values.length === 0) {
    return 1
  }
  const mid = Math.floor(values.length / 2)
  if (values.length % 2 === 0) {
    return ((values[mid - 1] as number) + (values[mid] as number)) / 2
  }
  return values[mid] as number
}

/**
 * Greedy longest-first (LPT) bin-packing. Returns `total` shards, each a
 * list of files. Sorting is fully deterministic (weight desc, then path
 * asc) so the same input always yields the same assignment across
 * runners; ties for the lightest shard pick the lowest index.
 */
export function balanceShardsByWeight(
  files: string[],
  total: number,
  weights: ScreenshotTimings,
  fallbackWeight: number
): string[][] {
  if (total <= 0) {
    return []
  }

  const shards = Array.from({ length: total }, () => ({
    load: 0,
    files: [] as string[],
  }))

  const ordered = [...files]
    .map((file) => ({ file, weight: weights[file] ?? fallbackWeight }))
    .sort((a, b) => b.weight - a.weight || a.file.localeCompare(b.file))

  for (const { file, weight } of ordered) {
    const lightest = shards.reduce((min, shard) =>
      shard.load < min.load ? shard : min
    )
    lightest.load += weight
    lightest.files.push(file)
  }

  return shards.map((shard) =>
    shard.files.sort((a, b) => a.localeCompare(b))
  )
}

/**
 * Resolve the files for a single shard from `candidateFiles`.
 *
 * Returns `null` when no balanced sharding should be applied — watch
 * mode, a missing/malformed value, or a total of 1 — so the caller keeps
 * the unsharded behavior. Otherwise returns the (possibly empty) list of
 * files for the requested shard.
 */
export function resolveShardIncludeFiles(
  shardValue: string | undefined,
  candidateFiles: string[],
  options: { watch?: boolean; timingsPath?: string } = {}
): string[] | null {
  if (options.watch) {
    return null
  }

  const value = shardValue?.trim()
  if (!value || !/^\d+\/\d+$/.test(value)) {
    return null
  }

  const parts = value.split('/')
  const index = Number(parts[0])
  const total = Number(parts[1])
  if (total <= 1 || index < 1 || index > total) {
    return null
  }

  const weights = loadScreenshotTimings(options.timingsPath)
  const fallbackWeight = computeFallbackWeight(weights)
  const shards = balanceShardsByWeight(
    candidateFiles,
    total,
    weights,
    fallbackWeight
  )

  return shards[index - 1] ?? []
}

/**
 * Collect every screenshot test file (package-relative, sorted) — the
 * candidate set for a full, unfiltered run.
 */
export function collectAllScreenshotTestFiles(
  cwd: string = process.cwd()
): string[] {
  return globby
    .sync(SCREENSHOT_TEST_GLOB, { cwd })
    .sort((a, b) => a.localeCompare(b))
}
