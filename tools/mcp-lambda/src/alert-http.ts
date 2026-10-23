import { appendFileSync, writeFileSync } from 'node:fs'
import {
  reportIncident,
  summarize,
} from '../../monitoring/report-incident.ts'
import type { Report } from '../../monitoring/report-incident.ts'
import { checkHttpMcp } from './check-http.ts'

let report: Report
try {
  report = await checkHttpMcp({ githubToken: process.env.GH_TOKEN })
} catch {
  report = {
    status: 'unhealthy',
    checkedAt: new Date().toISOString(),
    checks: [
      {
        name: 'monitor',
        ok: false,
        detail:
          'The MCP monitor could not complete its checks. See the workflow logs.',
      },
    ],
  }
}
writeFileSync(
  'mcp-health-report.json',
  JSON.stringify(report, null, 2) + '\n'
)
const summary = summarize(report, 'MCP')
process.stdout.write(summary + '\n')
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
}
process.exitCode = report.status === 'unhealthy' ? 1 : 0

await reportIncident({
  service: 'MCP',
  report,
  repository: process.env.GITHUB_REPOSITORY ?? '',
  token: process.env.GH_TOKEN ?? '',
  runUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
  webhook: process.env.MCP_ALERT_WEBHOOK,
})
