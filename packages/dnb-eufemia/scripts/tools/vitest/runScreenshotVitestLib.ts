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

const THEME_ARG_PATTERN = /^theme=(.+)$/i

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
 * pattern, matching every test name that contains none of the themes.
 */
export function buildThemeTestNamePattern(
  themes: string[],
  exclude = false
): string {
  const corePattern = `for (?:${themes.map(escapeRegExp).join('|')})(?=$| )`
  return exclude ? `^(?!.*${corePattern}).*$` : corePattern
}

/**
 * Pulls a `theme=<name>[,<name>…]` (or excluding
 * `theme=-<name>[,-<name>…]`) token out of the raw CLI args so it can
 * be turned into a vitest `--testNamePattern`, instead of being treated
 * as a (non-matching) screenshot file-name filter.
 */
export function extractThemeArg(args: string[]): {
  themes: string[]
  exclude: boolean
  rest: string[]
} {
  let themes: string[] = []
  let exclude = false
  const rest: string[] = []

  for (const arg of args) {
    const match = arg.match(THEME_ARG_PATTERN)
    if (!match) {
      rest.push(arg)
      continue
    }

    const names = match[1]
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
    const excluded = names.filter((name) => name.startsWith('-'))

    if (excluded.length > 0 && excluded.length < names.length) {
      throw new Error(
        `Cannot mix included and excluded themes in "${arg}". Use either theme=a,b or theme=-a,-b.`
      )
    }

    exclude = excluded.length > 0
    themes = names.map((name) => name.replace(/^-/, ''))
  }

  return { themes, exclude, rest }
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
  const { themes, exclude, rest } = extractThemeArg(args)
  const { filters } = splitVitestArgs(rest)

  const result = prepareScreenshotVitestRun(
    rest,
    filters.length > 0 ? collectRenewScreenshotMatches(filters) : []
  )

  if (themes.length > 0) {
    return {
      ...result,
      vitestArgs: [
        ...result.vitestArgs,
        '--testNamePattern',
        buildThemeTestNamePattern(themes, exclude),
      ],
    }
  }

  return result
}
