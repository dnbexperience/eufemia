export type Check = {
  name: string
  ok: boolean
  detail: string
  pending?: boolean
}
export type Report = {
  status: 'healthy' | 'pending' | 'unhealthy'
  checkedAt: string
  latest?: string
  checks: Check[]
}
export type CheckOptions = {
  fetch?: typeof fetch
  now?: number
  sleep?: (ms: number) => Promise<void>
}

export function buildReport(
  checks: Check[],
  now: number,
  latest?: string
): Report {
  checks.sort((a, b) => a.name.localeCompare(b.name))
  return {
    status: checks.some((check) => !check.ok && !check.pending)
      ? 'unhealthy'
      : checks.some((check) => check.pending)
        ? 'pending'
        : 'healthy',
    checkedAt: new Date(now).toISOString(),
    latest,
    checks,
  }
}

export function summarize(report: Report, service: string) {
  return [
    service + ' status: ' + report.status,
    'Checked: ' + report.checkedAt,
    'Latest: ' + (report.latest ?? 'unknown'),
    '',
    ...report.checks.map(
      (check) =>
        (check.ok ? 'PASS' : check.pending ? 'WAIT' : 'FAIL') +
        ' ' +
        check.name +
        ': ' +
        check.detail
    ),
  ].join('\n')
}
