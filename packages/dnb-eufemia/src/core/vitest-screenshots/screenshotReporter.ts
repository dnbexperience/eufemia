/**
 * Vitest reporter for screenshot tests.
 *
 * Produces an HTML report from failure records the server-side
 * screenshot engine drops into the in-process bus (`./failures.ts`).
 *
 * Drives off `onTestRunEnd` so it sees every failure regardless of
 * retry order. The HTML, CSS, vscode:// links and copy-to-clipboard
 * gimmick are kept identical to the legacy reporter so contributors
 * keep the same DX.
 */

import fs from 'node:fs'
import path from 'node:path'
import type {
  Reporter,
  TestCase,
  TestModule,
  TestRunEndReason,
  TestSuite,
} from 'vitest/node'
import { drainFailures, type ScreenshotFailureRecord } from './failures'

// eslint-disable-next-line no-control-regex
const ANSI_ESCAPE_SEQUENCE = /\u001B\[[0-?]*[ -/]*[@-~]/g

export type ResolvedFailure = {
  relativeTestFilePath: string
  expectedImagePath: string | null
  dataVisualTestId: string | null
  lineNumber: number | null
} & ScreenshotFailureRecord

// Escape a value for safe use in HTML text or double/single-quoted
// attributes. The report is published to a public URL, so every
// test-derived value must be escaped before it is interpolated.
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatMessage = (message: string) =>
  escapeHtml(message.replace(ANSI_ESCAPE_SEQUENCE, '')).replace(
    /\n/g,
    '<br />'
  )

const resolveFailures = (
  records: ScreenshotFailureRecord[],
  lineByFullName: Map<string, number>
): ResolvedFailure[] => {
  const cwd = process.cwd()
  return records.map((record) => ({
    ...record,
    relativeTestFilePath: path.relative(cwd, record.testFilePath),
    expectedImagePath: fs.existsSync(record.snapshotPath)
      ? record.snapshotPath
      : null,
    dataVisualTestId: record.dataVisualTestId ?? null,
    lineNumber: lineByFullName.get(record.fullName) ?? null,
  }))
}

/**
 * Build the deterministic file name for a copied report image.
 * Shared by the HTML writer and the JSON manifest so the two never
 * drift: the manifest can reference the exact files the HTML copied.
 */
export const reportImageName = (
  index: number,
  srcPath: string,
  suffix: string
) => `${index}-${path.basename(srcPath, '.png')}.${suffix}.png`

/**
 * Copy a source image into the report's `images/` subfolder,
 * returning the local relative path for use inside the HTML.
 * The filename is prefixed with an index to keep the listing
 * order predictable even when different tests share a base name.
 */
const copyImageToReport = (
  srcPath: string,
  reportDir: string,
  index: number,
  suffix: string
): string => {
  const imagesDir = path.join(reportDir, 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }
  const destName = reportImageName(index, srcPath, suffix)
  const destPath = path.join(imagesDir, destName)
  fs.copyFileSync(srcPath, destPath)
  return `images/${destName}`
}

export const renderHtml = (
  failures: ResolvedFailure[],
  reportDir: string
) => {
  // Count distinct tests for the summary. A single test can emit
  // several snapshots (one per data-visual-test), so the same name
  // may legitimately appear on more than one row.
  const uniqueTests = new Set<string>()

  const items = failures
    .map((f, i) => {
      uniqueTests.add(f.fullName)

      const figures: string[] = []

      if (f.expectedImagePath && fs.existsSync(f.expectedImagePath)) {
        const rel = copyImageToReport(
          f.expectedImagePath,
          reportDir,
          i,
          'expected'
        )
        figures.push(`
            <figure class="screenshot-figure">
              <figcaption>Expected</figcaption>
              <a class="diff" target="_blank" href="${escapeHtml(rel)}">
                <img src="${escapeHtml(rel)}" alt="Expected screenshot" />
              </a>
            </figure>`)
      }

      if (f.actualPath && fs.existsSync(f.actualPath)) {
        const rel = copyImageToReport(f.actualPath, reportDir, i, 'actual')
        figures.push(`
            <figure class="screenshot-figure">
              <figcaption>Actual</figcaption>
              <a class="diff" target="_blank" href="${escapeHtml(rel)}">
                <img src="${escapeHtml(rel)}" alt="Actual screenshot" />
              </a>
            </figure>`)
      }

      if (f.diffPath && fs.existsSync(f.diffPath)) {
        const rel = copyImageToReport(f.diffPath, reportDir, i, 'diff')
        figures.push(`
            <figure class="screenshot-figure">
              <figcaption>Diff</figcaption>
              <a class="diff" target="_blank" href="${escapeHtml(rel)}">
                <img src="${escapeHtml(rel)}" alt="Shows the visual difference" />
              </a>
            </figure>`)
      }

      const image = figures.length
        ? `<div class="screenshot-row">${figures.join('\n')}</div>`
        : ''

      const visualTestIdHtml = f.dataVisualTestId
        ? `<p><b><code class="copy-id" data-clipboard-text="${escapeHtml(f.dataVisualTestId)}">data-visual-test="${escapeHtml(f.dataVisualTestId)}"</code></b></p>`
        : ''

      return `
            <li>
              <dl>
                <dt>${escapeHtml(f.fullName)}</dt>
                <dd>
                  <p><a href="vscode://file${escapeHtml(f.testFilePath)}${f.lineNumber ? ':' + f.lineNumber : ''}"><code>${escapeHtml(f.relativeTestFilePath)}${f.lineNumber ? ':' + f.lineNumber : ''}</code></a></p>
                  ${visualTestIdHtml}
                  <p>${formatMessage(f.message)}</p>
                  ${image}
                </dd>
              </dl>
            </li>
        `
    })
    .join('\n')

  return `
    <html>

    <head>
      <meta charset="utf-8" />
      <title>Visual Screenshot Report</title>

      <style>
        :root {
          --color-text: #14143c;
          --color-bg: #f4f4f4;
          --color-muted: #777789;
          --color-border: #d2d2d8;
          --color-accent: #007272;
          --color-accent-hover: #66ad9c;
        }
        body {
          margin: 0;
          padding: 2rem;
          font: 1rem/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif;
          color: var(--color-text);
          background: var(--color-bg);
        }
        h1, h2, h3 { font-weight: 600; }
        a { color: var(--color-accent); }
        a:hover { color: var(--color-accent-hover); }
        code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 0.9em;
        }
        ol { max-width: 80ch; list-style: square; padding-left: 1.5rem; }
        ol li { padding: 2rem 0; border-bottom: 1px solid var(--color-border); }
        ol li:last-child { border-bottom: none; }
        ol li p { font-size: 1rem; margin: 0.25rem 0; }
        dl { margin: 0; }
        dt { font-weight: 600; font-size: 1.125rem; margin-bottom: 0.5rem; }
        dd { margin: 0; }
        a.diff { display: inline-flex; border: 0.125rem solid var(--color-border); }
        a.diff:hover { border-color: var(--color-accent); }
        a.diff:focus-visible {
          outline: none;
          box-shadow: none;
          transform: scale(2) translate3d(25%, 25%, 0);
          position: relative;
          z-index: 1;
        }
        .screenshot-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        .screenshot-figure { margin: 0; }
        .screenshot-figure figcaption {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .copy-id {
          cursor: pointer;
          user-select: all;
          position: relative;
        }
        .copy-id:hover { background-color: rgba(0, 114, 114, 0.1); }
        .copy-id.copied::after {
          content: 'Copied!';
          margin-left: 0.5rem;
          color: var(--color-accent);
          white-space: nowrap;
        }
      </style>
    </head>

    <body>
      <ol>
        <li>Failed Tests: <b>${uniqueTests.size}</b></li>
        ${items}
      </ol>

      <script>
        document.addEventListener('click', function (event) {
          var el = event.target.closest('.copy-id')
          if (!el) {
            return
          }
          navigator.clipboard
            .writeText(el.getAttribute('data-clipboard-text'))
            .then(function () {
              el.classList.add('copied')
              setTimeout(function () {
                el.classList.remove('copied')
              }, 1000)
            })
        })
      </script>

    </body>

    </html>
    `
}

export type ReportManifestImages = {
  expected: string | null
  actual: string | null
  diff: string | null
}

export type ReportManifestFailure = {
  title: string
  testFilePath: string
  lineNumber: number | null
  dataVisualTestId: string | null
  message: string
  images: ReportManifestImages
}

export type ReportManifest = {
  failureCount: number
  failures: ReportManifestFailure[]
}

const toPlainMessage = (message: string) =>
  message
    .replace(ANSI_ESCAPE_SEQUENCE, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim()

/**
 * Structured, machine-readable sibling of the HTML report. CI reads
 * this to build a job-summary table and to turn the relative image
 * paths into absolute URLs once the report is hosted. It renders the
 * same failures as the HTML report, in the same order, so the image
 * index (and thus each `reportImageName`) matches the files the HTML
 * writer copied.
 */
export const buildReportManifest = (
  failures: ResolvedFailure[],
  exists: (filePath: string) => boolean = fs.existsSync
): ReportManifest => {
  const relImage = (
    index: number,
    srcPath: string | null,
    suffix: string
  ): string | null =>
    srcPath && exists(srcPath)
      ? `images/${reportImageName(index, srcPath, suffix)}`
      : null

  return {
    failureCount: failures.length,
    failures: failures.map((failure, index) => ({
      title: failure.fullName,
      testFilePath: failure.relativeTestFilePath,
      lineNumber: failure.lineNumber,
      dataVisualTestId: failure.dataVisualTestId,
      message: toPlainMessage(failure.message),
      images: {
        expected: relImage(index, failure.expectedImagePath, 'expected'),
        actual: relImage(index, failure.actualPath, 'actual'),
        diff: relImage(index, failure.diffPath, 'diff'),
      },
    })),
  }
}

/**
 * Collect the fullNames of tests whose final result is 'failed'.
 * Tests that failed on an early attempt but passed on retry are
 * excluded.
 */
const collectFinallyFailedNames = (
  modules: ReadonlyArray<TestModule>
): Set<string> => {
  const names = new Set<string>()

  const visit = (node: TestSuite | TestCase) => {
    if (node.type === 'test') {
      if (node.result().state === 'failed') {
        names.add(node.fullName)
      }
    } else if (node.type === 'suite') {
      for (const child of Array.from(node.children)) {
        visit(child)
      }
    }
  }

  for (const mod of modules) {
    for (const child of Array.from(mod.children)) {
      visit(child)
    }
  }

  return names
}

/**
 * Map each test's fullName to the line where it is declared, taken
 * from Vitest's task location (requires `includeTaskLocation`). Tests
 * that share a title across describe blocks have distinct fullNames,
 * so each resolves to its own line.
 */
export const collectTestLocations = (
  modules: ReadonlyArray<TestModule>
): Map<string, number> => {
  const lines = new Map<string, number>()

  const visit = (node: TestSuite | TestCase) => {
    if (node.type === 'test') {
      const line = node.location?.line
      if (typeof line === 'number') {
        lines.set(node.fullName, line)
      }
    } else if (node.type === 'suite') {
      for (const child of Array.from(node.children)) {
        visit(child)
      }
    }
  }

  for (const mod of modules) {
    for (const child of Array.from(mod.children)) {
      visit(child)
    }
  }

  return lines
}

export default class ScreenshotReporter implements Reporter {
  // We don't read TestModule data here; the engine already has the
  // failure records it needs. This callback exists just to fire at the
  // right moment in the Vitest lifecycle.
  onTestRunEnd(
    modules: ReadonlyArray<TestModule>,
    _unhandledErrors: ReadonlyArray<unknown>,
    _reason: TestRunEndReason
  ) {
    const records = drainFailures()
    if (records.length === 0) {
      return
    }

    // Only include failures for tests that are still failed after
    // retries. Tests that passed on a later attempt should not
    // appear in the report.
    const finallyFailed = collectFinallyFailedNames(modules)
    const filteredRecords = records.filter((r) =>
      finallyFailed.has(r.fullName)
    )

    // Retries produce duplicate failure records for the same snapshot.
    // Keep only the last record per snapshot path so the report shows
    // each diff exactly once.
    const deduped = Array.from(
      new Map(filteredRecords.map((r) => [r.snapshotPath, r])).values()
    )

    // Report only genuinely-failed tests. A test that passed on a
    // retry has its diff/actual images deleted by the passing attempt,
    // so including its stale record would render a misleading
    // "expected only" entry. Deduping also collapses retry duplicates.
    const genuineFailures = resolveFailures(
      deduped,
      collectTestLocations(modules)
    )

    if (genuineFailures.length === 0) {
      return
    }

    const cwd = process.cwd()
    const reportDir = path.join(cwd, 'visual-diff-report')
    const htmlFilePath = path.join(reportDir, 'index.html')

    const cli = {
      reset: '\x1b[0m',
      bold: '\x1b[1m',
      dim: '\x1b[2m',
      yellow: '\x1b[33m',
    }

    console.log(
      `\n\n${cli.bold}${cli.yellow}The report file and diffs images (${genuineFailures.length}): \n\n${cli.reset}`
    )
    console.log(`🔖 ${cli.dim}file://${htmlFilePath}\n${cli.reset}`)

    genuineFailures.forEach((f, i) => {
      if (f.diffPath && fs.existsSync(f.diffPath)) {
        console.log(
          `🔍 ${cli.dim}${i + 1}. file://${f.diffPath}${cli.reset}\n`
        )
      }
    })

    console.log('\n\n')

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true })
    }
    fs.writeFileSync(htmlFilePath, renderHtml(genuineFailures, reportDir))

    fs.writeFileSync(
      path.join(reportDir, 'report.json'),
      JSON.stringify(buildReportManifest(genuineFailures), null, 2)
    )
  }
}

// Vitest accepts both `default` and named export for path-style reporter
// references in config, so re-export to be friendly.
export { ScreenshotReporter }
