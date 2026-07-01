import { prepareVitestRun, splitVitestArgs } from 'repo-utils'
import {
  collectRenewScreenshotMatches,
  type RenewScreenshotMatch,
} from './renewScreenshotsLib.ts'

type PreparedScreenshotVitestRun = {
  filters: string[]
  vitestArgs: string[]
  testFiles: string[]
  missingFilters: string[]
  screenshotInclude?: string
}

export function prepareScreenshotVitestRun(
  args: string[],
  matches: RenewScreenshotMatch[]
): PreparedScreenshotVitestRun {
  const matchingFilesByFilter = new Map(
    matches.map(({ filter, testFiles }) => [filter, testFiles])
  )
  const { filters, vitestArgs, testFiles, missingFilters } =
    prepareVitestRun(args, matchingFilesByFilter)

  return {
    filters,
    vitestArgs,
    testFiles,
    missingFilters,
    screenshotInclude:
      testFiles.length > 0 ? testFiles.join(',') : undefined,
  }
}

export function resolveScreenshotVitestRun(args: string[]) {
  const { filters } = splitVitestArgs(args)

  return prepareScreenshotVitestRun(
    args,
    filters.length > 0 ? collectRenewScreenshotMatches(filters) : []
  )
}

/**
 * CI splits the full screenshot suite across several runners. The shard is
 * provided as "<index>/<total>" (e.g. "2/4") and forwarded to Vitest as
 * `--shard`. A total of 1, an already-present `--shard`, or watch mode leaves
 * the args untouched so non-sharded runs stay identical. `--passWithNoTests`
 * is added because a shard can legitimately receive no files when a small
 * conditional subset is split across shards.
 */
export function resolveShardArgs(
  shardValue: string | undefined,
  vitestArgs: string[],
  options: { watch?: boolean } = {}
): string[] {
  if (options.watch) {
    return []
  }

  const value = shardValue?.trim()
  if (!value || !/^\d+\/\d+$/.test(value)) {
    return []
  }

  const hasExplicitShard = vitestArgs.some(
    (arg) => arg === '--shard' || arg.startsWith('--shard=')
  )
  if (hasExplicitShard) {
    return []
  }

  const total = Number(value.split('/')[1])
  if (total <= 1) {
    return []
  }

  return [`--shard=${value}`, '--passWithNoTests']
}
