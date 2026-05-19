/**
 * Shared bus between the screenshot engine (server-side BrowserCommand)
 * and the Vitest screenshot reporter. Both run in the same Node process,
 * so a module-level Map is enough to ferry failure metadata.
 *
 * The engine pushes a record whenever a snapshot mismatch occurs; the
 * reporter drains the records on `onTestRunEnd` and writes the HTML
 * report.
 *
 * The navigation log is intentionally bounded (`MAX_PENDING_NAVIGATIONS`)
 * because the live reporter only consumes it between test cases. Long
 * screenshot runs that fail to drain (or that briefly outpace the
 * reporter) must not accumulate forever — letting that array grow
 * unchecked is one of the ways a 1900+ test run pushes V8 past its
 * default heap.
 */

export type ScreenshotFailureRecord = {
  testFilePath: string
  fullName: string
  snapshotPath: string
  diffPath: string | null
  actualPath: string | null
  message: string
  // Optional path to a side-by-side dump of the DOM HTML (saved
  // alongside the actual/diff PNGs). Lets contributors tell at a
  // glance whether a screenshot diff is a real visual regression or
  // an interaction-state regression (focus ring missing, hover
  // didn't apply, etc.). The reporter renders a link when present.
  htmlDumpPath?: string | null
}

const MAX_PENDING_NAVIGATIONS = 64

const failures: ScreenshotFailureRecord[] = []

export const recordFailure = (record: ScreenshotFailureRecord) => {
  failures.push(record)
}

export const drainFailures = () => {
  const out = failures.slice()
  failures.length = 0
  return out
}

const navigations: string[] = []

export const recordNavigation = (url: string) => {
  navigations.push(url)
  if (navigations.length > MAX_PENDING_NAVIGATIONS) {
    navigations.splice(0, navigations.length - MAX_PENDING_NAVIGATIONS)
  }
}

export const drainNavigations = () => {
  if (navigations.length === 0) {
    return []
  }
  const out = navigations.slice()
  navigations.length = 0
  return out
}
