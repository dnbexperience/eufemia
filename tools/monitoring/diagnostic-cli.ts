import { appendFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { summarize } from './report.ts'
import type { Report } from './report.ts'

// Runs the check only when moduleUrl is the script started with node.
export async function runDiagnosticCli(
  moduleUrl: string,
  service: string,
  check: () => Promise<Report>
) {
  if (
    !process.argv[1] ||
    moduleUrl !== pathToFileURL(process.argv[1]).href
  ) {
    return
  }

  let report: Report
  try {
    report = await check()
  } catch {
    report = {
      status: 'unhealthy',
      checkedAt: new Date().toISOString(),
      checks: [
        {
          name: 'monitor',
          ok: false,
          detail: `The ${service} diagnostic could not complete its checks. No exception details were recorded.`,
        },
      ],
    }
  }

  writeFileSync(
    `${service.toLowerCase()}-health-report.json`,
    JSON.stringify(report, null, 2) + '\n'
  )
  const summary = summarize(report, service)
  process.stdout.write(summary + '\n')
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
  }
  process.exitCode = report.status === 'unhealthy' ? 1 : 0
}
