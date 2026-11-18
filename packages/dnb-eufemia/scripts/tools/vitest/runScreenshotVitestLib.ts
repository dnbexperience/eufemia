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

const THEME_ARG_PATTERN = /^theme=(-)?(.+)$/i

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Every `describe.each([...themes])` screenshot suite titles its block
 * `<Component> for %s`, so the theme name is always preceded by
 * "for " and followed by either the end of the title or a space
 * (e.g. "for sbanken", "for sbanken dark", "for sbanken in light mode").
 * The lookahead keeps "sbanken" from matching inside a longer theme
 * name such as a future "sbanken-new".
 *
 * Passing `exclude: true` (for a `theme=-<name>` selector) negates the
 * pattern, matching every test name that does *not* contain the theme.
 */
export function buildThemeTestNamePattern(
  theme: string,
  exclude = false
): string {
  const corePattern = `for ${escapeRegExp(theme)}(?=$| )`
  return exclude ? `^(?!.*${corePattern}).*$` : corePattern
}

/**
 * Pulls a `theme=<name>` (or excluding `theme=-<name>`) token out of
 * the raw CLI args so it can be turned into a vitest
 * `--testNamePattern`, instead of being treated as a (non-matching)
 * screenshot file-name filter.
 */
export function extractThemeArg(args: string[]): {
  theme?: string
  exclude: boolean
  rest: string[]
} {
  let theme: string | undefined
  let exclude = false
  const rest: string[] = []

  for (const arg of args) {
    const match = arg.match(THEME_ARG_PATTERN)
    if (match) {
      exclude = Boolean(match[1])
      theme = match[2]
      continue
    }
    rest.push(arg)
  }

  return { theme, exclude, rest }
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
  const { theme, exclude, rest } = extractThemeArg(args)
  const { filters } = splitVitestArgs(rest)

  const result = prepareScreenshotVitestRun(
    rest,
    filters.length > 0 ? collectRenewScreenshotMatches(filters) : []
  )

  if (theme) {
    return {
      ...result,
      vitestArgs: [
        ...result.vitestArgs,
        '--testNamePattern',
        buildThemeTestNamePattern(theme, exclude),
      ],
    }
  }

  return result
}
