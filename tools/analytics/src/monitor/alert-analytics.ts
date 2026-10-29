import { appendFileSync, writeFileSync } from 'node:fs'
import {
  reportIncident,
  summarize,
} from '../../../monitoring/report-incident.ts'
import type { Report } from '../../../monitoring/report-incident.ts'
import { checkAnalytics } from './check-analytics.ts'

let report: Report
try {
  report = await checkAnalytics({
    githubToken: process.env.GH_TOKEN,
    gheRepository: process.env.GHE_REPO,
    gheToken: process.env.GHE_TOKEN,
  })
} catch {
  report = {
    status: 'unhealthy',
    checkedAt: new Date().toISOString(),
    checks: [
      {
        name: 'monitor',
        ok: false,
        detail:
          'The analytics monitor could not complete its checks. See the workflow logs.',
      },
    ],
  }
}
writeFileSync(
  'analytics-health-report.json',
  JSON.stringify(report, null, 2) + '\n'
)
const summary = summarize(report, 'Analytics')
process.stdout.write(summary + '\n')
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
}
process.exitCode = report.status === 'unhealthy' ? 1 : 0

await reportIncident({
  service: 'Analytics',
  report,
  repository: process.env.GITHUB_REPOSITORY ?? '',
  token: process.env.GH_TOKEN ?? '',
  runUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
  webhook: process.env.ANALYTICS_ALERT_WEBHOOK,
})
