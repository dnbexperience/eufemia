import globby from 'globby'

export type RenewScreenshotMatch = {
  filter: string
  snapshotDirs: string[]
  testFiles: string[]
}

export function collectRenewScreenshotMatches(filters: string[]) {
  return filters.map<RenewScreenshotMatch>((filter) => ({
    filter,
    snapshotDirs: globby.sync(
      `src/**/*${filter}*/__tests__/__image_snapshots__`,
      {
        onlyDirectories: true,
        caseSensitiveMatch: false,
      }
    ),
    testFiles: globby.sync(
      `src/**/*${filter}*/**/*.screenshot.test.{ts,tsx}`,
      {
        caseSensitiveMatch: false,
      }
    ),
  }))
}
