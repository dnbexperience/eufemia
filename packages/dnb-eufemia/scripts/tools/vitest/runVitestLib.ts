import globby from 'globby'
import {
  matchFiltersToFiles,
  prepareVitestRun,
  splitVitestArgs,
} from 'repo-utils'

type ResolveVitestRunOptions = {
  includeGlobs: string[]
  ignoreGlobs?: string[]
}

export { prepareVitestRun, splitVitestArgs } from 'repo-utils'

export function collectMatchingFilesByFilter(
  filters: string[],
  options: ResolveVitestRunOptions
) {
  const candidateFiles = globby
    .sync(options.includeGlobs, {
      ignore: options.ignoreGlobs,
      caseSensitiveMatch: false,
    })
    .sort()

  return matchFiltersToFiles(filters, candidateFiles)
}

export function resolveVitestRun(
  args: string[],
  options: ResolveVitestRunOptions
) {
  const { filters } = splitVitestArgs(args)

  return prepareVitestRun(
    args,
    collectMatchingFilesByFilter(filters, options)
  )
}
