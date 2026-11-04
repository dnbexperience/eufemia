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
