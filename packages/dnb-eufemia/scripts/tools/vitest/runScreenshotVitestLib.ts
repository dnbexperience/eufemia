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
