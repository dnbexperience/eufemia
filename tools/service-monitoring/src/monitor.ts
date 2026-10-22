import { createHash } from 'node:crypto'
import type { Report } from '../../monitoring/report-incident.ts'

export type Service = 'CDN' | 'MCP'
type Notice = { fingerprint: string; text: string }
export type State = {
  notified?: string
  pending?: Notice
  report?: Report
}
type Dependencies = {
  check: () => Promise<Report>
  load: () => Promise<State>
  save: (state: State) => Promise<void>
  notify: (text: string) => Promise<void>
  completed: (report: Report) => void
}

export async function runMonitor(
  service: Service,
  notifications: boolean,
  dependencies: Dependencies
) {
  const state = await dependencies.load()
  const report = await dependencies.check()

  async function deliverPending() {
    if (state.pending) {
      await dependencies.notify(state.pending.text)
      state.notified = state.pending.fingerprint
      delete state.pending
      await dependencies.save(state)
    }
  }

  // Persist before sending so failed delivery is retried even after recovery.
  if (notifications) {
    await deliverPending()
  }
  state.report = report
  if (notifications && report.status !== 'pending') {
    const failures = report.checks
      .filter((check) => !check.ok && !check.pending)
      .map((check) => check.name)
      .sort()
    const fingerprint =
      report.status === 'healthy'
        ? 'healthy'
        : createHash('sha256')
            .update(JSON.stringify(failures))
            .digest('hex')
    if (
      fingerprint !== state.notified &&
      (report.status === 'unhealthy' || state.notified)
    ) {
      const result =
        report.status === 'healthy'
          ? 'recovered'
          : 'checks failed: ' + failures.join(', ')
      state.pending = {
        fingerprint,
        text: [
          'Eufemia ' + service + ' ' + result + '.',
          'Checked: ' + report.checkedAt,
          'Latest: ' + (report.latest ?? 'unknown'),
          'Details: AWS CloudWatch logs for the Eufemia service monitor.',
        ].join('\n'),
      }
    }
  }
  await dependencies.save(state)
  if (notifications) {
    await deliverPending()
  }
  dependencies.completed(report)
  return report
}
