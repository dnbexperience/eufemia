import { appendFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { checkCdn, summarize } from './check-cdn.ts'
import { reportIncident } from '../monitoring/report-incident.ts'
import type { Report } from './check-cdn.ts'

export function alertCdn(
  options: Omit<Parameters<typeof reportIncident>[0], 'service'>
) {
  return reportIncident({ ...options, service: 'CDN' })
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  let report: Report
  try {
    report = await checkCdn()
  } catch {
    report = {
      status: 'unhealthy',
      checkedAt: new Date().toISOString(),
      checks: [
        {
          name: 'monitor',
          ok: false,
          detail:
            'The CDN monitor could not complete its checks. See the workflow logs.',
        },
      ],
    }
  }
  writeFileSync(
    'cdn-health-report.json',
    JSON.stringify(report, null, 2) + '\n'
  )
  const summary = summarize(report)
  process.stdout.write(summary + '\n')
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
  }
  process.exitCode = report.status === 'unhealthy' ? 1 : 0
  await alertCdn({
    report,
    repository: process.env.GITHUB_REPOSITORY ?? '',
    token: process.env.GH_TOKEN ?? '',
    runUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
    webhook: process.env.CDN_ALERT_WEBHOOK,
  })
}
