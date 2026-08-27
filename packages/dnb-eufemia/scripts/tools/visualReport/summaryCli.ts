/**
 * CLI wrapper around `renderVisualReportSummary`.
 *
 * Reads the `report.json` written by the screenshot reporter and prints
 * the job-summary Markdown to stdout, so CI can append it to
 * `$GITHUB_STEP_SUMMARY`. Diagnostics go to stderr to keep stdout clean.
 *
 * Usage: node summaryCli.ts [path/to/report.json]
 * Env:   REPORT_URL - base URL of the hosted report (optional)
 */

import fs from 'node:fs'
import path from 'node:path'

import { renderVisualReportSummary } from './renderSummary.ts'

const manifestPath = path.resolve(
  process.argv[2] || 'visual-diff-report/report.json'
)

if (!fs.existsSync(manifestPath)) {
  console.error(
    `No visual-diff report found at ${manifestPath}; nothing to summarise.`
  )
  process.exit(0)
}

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  process.stdout.write(
    renderVisualReportSummary(manifest, process.env.REPORT_URL ?? '') +
      '\n'
  )
} catch (error) {
  console.error(
    `Failed to build the visual report summary: ${(error as Error).message}`
  )
  process.exit(0)
}
