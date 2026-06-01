import { existsSync } from 'node:fs'
import path from 'node:path'
import globby from 'globby'

export type RenewScreenshotMatch = {
  filter: string
  snapshotDirs: string[]
  testFiles: string[]
}

function isDirectScreenshotTestPath(filter: string): boolean {
  return /\.screenshot\.test\.(ts|tsx)$/.test(filter)
}

function getSnapshotDirFromTestPath(testPath: string): string | null {
  const dir = path.dirname(testPath)

  if (dir.endsWith('__tests__')) {
    const snapshotDir = path.join(dir, '__image_snapshots__')
    return existsSync(snapshotDir) ? snapshotDir : null
  }

  return null
}

export function collectRenewScreenshotMatches(filters: string[]) {
  return filters.map<RenewScreenshotMatch>((filter) => {
    // Handle direct file paths (e.g., from conditional screenshot runner)
    if (isDirectScreenshotTestPath(filter)) {
      const testFiles = existsSync(filter) ? [filter] : []
      const snapshotDir = getSnapshotDirFromTestPath(filter)

      return {
        filter,
        snapshotDirs: snapshotDir ? [snapshotDir] : [],
        testFiles,
      }
    }

    // Handle filter patterns (e.g., component names like "pagination")
    return {
      filter,
      snapshotDirs: globby.sync(
        `src/**/*${filter}*/__tests__/__image_snapshots__`,
        {
          onlyDirectories: true,
          caseSensitiveMatch: false,
        }
      ),
      testFiles: globby.sync(
        [
          `src/**/*${filter}*/**/*.screenshot.test.{ts,tsx}`,
          `src/**/*${filter}*.screenshot.test.{ts,tsx}`,
        ],
        {
          caseSensitiveMatch: false,
        }
      ),
    }
  })
}
