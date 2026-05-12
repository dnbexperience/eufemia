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
import type { Reporter, TestModule, TestRunEndReason } from 'vitest/node'
import { drainFailures, type ScreenshotFailureRecord } from './failures'

// eslint-disable-next-line no-control-regex
const ANSI_ESCAPE_SEQUENCE = /\u001B\[[0-?]*[ -/]*[@-~]/g

type ResolvedFailure = {
  relativeTestFilePath: string
  expectedImagePath: string | null
  dataVisualTestId: string | null
  lineNumber: number | null
} & ScreenshotFailureRecord

const formatMessage = (message: string) =>
  message.replace(ANSI_ESCAPE_SEQUENCE, '').replace(/\n/g, '<br />')

const extractTestMetadata = (
  testFilePath: string,
  title: string
): { dataVisualTestId: string | null; lineNumber: number | null } => {
  try {
    const content = fs.readFileSync(testFilePath, 'utf-8')
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const idx = content.search(new RegExp(escaped))
    if (idx === -1) {
      return { dataVisualTestId: null, lineNumber: null }
    }
    const lineNumber = content.substring(0, idx).split('\n').length
    const window = content.substring(idx, idx + 2000)
    const m = window.match(/data-visual-test="([^"]+)"/)
    return {
      dataVisualTestId: m ? m[1] : null,
      lineNumber,
    }
  } catch {
    return { dataVisualTestId: null, lineNumber: null }
  }
}

const lastSegmentOf = (fullName: string) =>
  (fullName.split(' > ').pop() ?? '').trim()

const resolveFailures = (
  records: ScreenshotFailureRecord[]
): ResolvedFailure[] => {
  const cwd = process.cwd()
  return records.map((record) => {
    const relativeTestFilePath = path.relative(cwd, record.testFilePath)
    const meta = extractTestMetadata(
      record.testFilePath,
      lastSegmentOf(record.fullName)
    )
    return {
      ...record,
      relativeTestFilePath,
      expectedImagePath: fs.existsSync(record.snapshotPath)
        ? record.snapshotPath
        : null,
      dataVisualTestId: meta.dataVisualTestId,
      lineNumber: meta.lineNumber,
    }
  })
}

const renderHtml = (failures: ResolvedFailure[], reportDir: string) => {
  const items = failures
    .map((f, i) => {
      const figures: string[] = []

      if (f.expectedImagePath && fs.existsSync(f.expectedImagePath)) {
        const rel = path.relative(reportDir, f.expectedImagePath)
        figures.push(`
            <figure class="screenshot-figure">
              <figcaption>Expected</figcaption>
              <a class="diff" target="_blank" href="${rel}">
                <img src="${rel}" alt="Expected screenshot" />
              </a>
            </figure>`)
      }

      if (f.actualPath && fs.existsSync(f.actualPath)) {
        const rel = path.relative(reportDir, f.actualPath)
        figures.push(`
            <figure class="screenshot-figure">
              <figcaption>Actual</figcaption>
              <a class="diff" target="_blank" href="${rel}">
                <img src="${rel}" alt="Actual screenshot" />
              </a>
            </figure>`)
      }

      if (f.diffPath && fs.existsSync(f.diffPath)) {
        const rel = path.relative(reportDir, f.diffPath)
        figures.push(`
            <figure class="screenshot-figure">
              <figcaption>Diff</figcaption>
              <a class="diff" target="_blank" href="${rel}">
                <img src="${rel}" alt="Shows the visual difference" />
              </a>
            </figure>`)
      }

      void i

      const image = figures.length
        ? `<div class="screenshot-row">${figures.join('\n')}</div>`
        : ''

      const visualTestIdHtml = f.dataVisualTestId
        ? `<p><b><code class="copy-id" onclick="navigator.clipboard.writeText('${f.dataVisualTestId}').then(() => { this.classList.add('copied'); setTimeout(() => this.classList.remove('copied'), 1000) })">data-visual-test="${f.dataVisualTestId}"</code></b></p>`
        : ''

      return `
            <li>
              <dl>
                <dt>${f.fullName}</dt>
                <dd>
                  <p><a href="vscode://file${f.testFilePath}${f.lineNumber ? ':' + f.lineNumber : ''}"><code>${f.relativeTestFilePath}${f.lineNumber ? ':' + f.lineNumber : ''}</code></a></p>
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
        <li>Failed Tests: <b>${failures.length}</b></li>
        ${items}
      </ol>

    </body>

    </html>
    `
}

export default class ScreenshotReporter implements Reporter {
  // We don't read TestModule data here; the engine already has the
  // failure records it needs. This callback exists just to fire at the
  // right moment in the Vitest lifecycle.
  onTestRunEnd(
    _modules: ReadonlyArray<TestModule>,
    _unhandledErrors: ReadonlyArray<unknown>,
    _reason: TestRunEndReason
  ) {
    const records = drainFailures()
    if (records.length === 0) {
      return
    }

    const failures = resolveFailures(records)

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
      `\n\n${cli.bold}${cli.yellow}The report file and diffs images (${failures.length}): \n\n${cli.reset}`
    )
    console.log(`🔖 ${cli.dim}file://${htmlFilePath}\n${cli.reset}`)

    failures.forEach((f, i) => {
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
    fs.writeFileSync(htmlFilePath, renderHtml(failures, reportDir))
  }
}

// Vitest accepts both `default` and named export for path-style reporter
// references in config, so re-export to be friendly.
export { ScreenshotReporter }
