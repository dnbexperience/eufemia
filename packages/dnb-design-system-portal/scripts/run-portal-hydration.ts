import fs from 'node:fs/promises'
import { parseArgs } from 'node:util'
import { readSitemap, hydrationIssues } from './portal-hydration.ts'
import {
  scanPortalHydration,
  writeHydrationReport,
} from './scan-portal-hydration.ts'

main()

async function main() {
  const { values } = parseArgs({
    options: {
      sitemap: { type: 'string', default: 'public/sitemap.json' },
      output: { type: 'string', default: 'portal-hydration-report.json' },
    },
  })
  const pages = readSitemap(
    JSON.parse(await fs.readFile(values.sitemap, 'utf8'))
  )
  await writeHydrationReport(
    {
      schemaVersion: 1,
      baseUrl: 'https://eufemia.dnb.no',
      scannedAt: new Date().toISOString(),
      expectedVisits: pages.length * 2,
      complete: false,
      visits: [],
    },
    values.output
  )
  const report = await scanPortalHydration({
    baseUrl: 'https://eufemia.dnb.no',
    pages,
    onProgress: (report) => writeHydrationReport(report, values.output),
  })
  await writeHydrationReport(report, values.output)
  const issues = hydrationIssues(report)
  await fs.writeFile(
    'portal-hydration-issues.json',
    JSON.stringify(issues, null, 2) + '\n'
  )
  const summary = [
    '## Portal hydration scan',
    '',
    'Pages: ' +
      pages.length +
      '. Browser visits: ' +
      report.visits.length +
      '/' +
      report.expectedVisits +
      '.',
    'Complete: ' +
      report.complete +
      '. Affected pages: ' +
      issues.length +
      '.',
    '',
    ...issues.map(
      (issue) =>
        '- [' + issue.page + '](https://eufemia.dnb.no' + issue.page + ')'
    ),
    '',
    ...(report.error ? ['Scan error: ' + report.error] : []),
    ...report.visits
      .filter((visit) => visit.error)
      .map(
        (visit) =>
          '- Scan error: ' +
          visit.page +
          ' (' +
          visit.colorScheme +
          '): ' +
          visit.error
      ),
    '',
    'See workflow artifacts for error messages, component stacks, and issue previews.',
  ].join('\n')
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
  }
  console.log(summary)
  if (!report.complete) {
    process.exitCode = 1
  }
}
