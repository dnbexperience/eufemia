/**
 * Renders the GitHub Actions job-summary Markdown for a failed visual
 * regression run.
 *
 * Pure and dependency-free so it can be unit-tested and run standalone
 * in CI (see `summaryCli.ts`). The manifest shape mirrors the
 * `report.json` written by `screenshotReporter.ts`.
 */

export type VisualReportImages = {
  expected: string | null
  actual: string | null
  diff: string | null
}

export type VisualReportFailure = {
  title: string
  testFilePath: string
  lineNumber: number | null
  dataVisualTestId: string | null
  message: string
  images: VisualReportImages
}

export type VisualReportManifest = {
  failures: VisualReportFailure[]
}

// Escape text placed into Markdown table cells / inline HTML text.
const escapeText = (value: unknown): string =>
  String(value ?? '')
    // Escape backslashes first so the `\|` escape added below cannot be
    // corrupted by a pre-existing backslash (which would leave a bare `|`
    // that breaks the table).
    .replace(/\\/g, '\\\\')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim()

// Escape a value placed inside a double-quoted HTML attribute so a crafted
// test name (which can flow into an image file name) cannot break out of the
// attribute.
const escapeAttr = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const thumbnail = (
  reportUrl: string,
  relativePath: string | null,
  altText: string
): string => {
  if (!reportUrl || !relativePath) {
    return ''
  }
  const url = escapeAttr(`${reportUrl}/${relativePath}`)
  return `<a href="${url}"><img src="${url}" width="220" alt="${escapeAttr(altText)}" /></a>`
}

// Cap table rows so the summary stays well under GitHub's 1 MiB per-step
// limit when a broad change fails hundreds of screenshots. The full set is
// always available in the hosted report / artifact.
const DEFAULT_MAX_SUMMARY_ROWS = 100

export const renderVisualReportSummary = (
  manifest: VisualReportManifest,
  reportUrl = '',
  maxRows = DEFAULT_MAX_SUMMARY_ROWS
): string => {
  const failures = Array.isArray(manifest?.failures)
    ? manifest.failures
    : []
  const normalizedUrl = reportUrl.replace(/\/+$/, '')
  const lines: string[] = []

  lines.push('## Visual regression report', '')
  lines.push(
    `**${failures.length}** screenshot${failures.length === 1 ? '' : 's'} ` +
      `differ${failures.length === 1 ? 's' : ''} from the committed baseline.`,
    ''
  )

  if (normalizedUrl) {
    lines.push(
      `🔗 **[Open the full interactive report](${normalizedUrl})** — before / after / diff for every failure.`,
      ''
    )
  } else {
    lines.push(
      '_Images are in the **visual-test-artifact** below (report hosting was unavailable for this run)._',
      ''
    )
  }

  if (failures.length) {
    const shown = failures.slice(0, Math.max(0, maxRows))

    lines.push('| Test | Location | Diff |', '| --- | --- | --- |')

    for (const failure of shown) {
      const id = failure.dataVisualTestId
        ? `<br><code>data-visual-test="${escapeText(failure.dataVisualTestId)}"</code>`
        : ''
      const testCell = `<strong>${escapeText(failure.title)}</strong>${id}<br>${escapeText(failure.message)}`
      const location = `<code>${escapeText(failure.testFilePath)}${failure.lineNumber ? ':' + failure.lineNumber : ''}</code>`
      const images = failure.images || {
        expected: null,
        actual: null,
        diff: null,
      }
      const diffCell =
        thumbnail(normalizedUrl, images.diff, `${failure.title} diff`) ||
        thumbnail(
          normalizedUrl,
          images.actual,
          `${failure.title} actual`
        ) ||
        '—'

      lines.push(`| ${testCell} | ${location} | ${diffCell} |`)
    }

    lines.push('')

    if (failures.length > shown.length) {
      const remaining = failures.length - shown.length
      const where = normalizedUrl
        ? 'the full report'
        : 'the **visual-test-artifact**'
      lines.push(
        `_Showing the first ${shown.length} of ${failures.length} failures — see ${where} for the remaining ${remaining}._`,
        ''
      )
    }
  }

  return lines.join('\n')
}
