import { createHash } from 'node:crypto'

export type HydrationError = { message: string; componentStack?: string }
export type HydrationVisit = {
  page: string
  colorScheme: 'light' | 'dark'
  findings: HydrationError[]
  error?: string
}
export type HydrationReport = {
  schemaVersion: 1
  baseUrl: string
  scannedAt: string
  expectedVisits: number
  complete: boolean
  error?: string
  visits: HydrationVisit[]
}

export function isHydrationError(message: string) {
  return /hydration failed|error while hydrating|error during hydration|hydration mismatch|Prop .+ did not match|Text content did not match|does not match server-rendered|hydrated but some attributes|Minified React error #(418|419|421|422|423|424|425)(?=;| |$)/i.test(
    message
  )
}

export function readSitemap(value: unknown) {
  const pages = (value as { pages?: unknown })?.pages
  if (
    !Array.isArray(pages) ||
    pages.length === 0 ||
    pages.some(
      (page) =>
        typeof page !== 'string' ||
        !page.startsWith('/') ||
        page.startsWith('//') ||
        /[\\?#\s]/.test(page) ||
        new URL(page, 'https://eufemia.dnb.no').pathname !== page
    )
  ) {
    throw new Error('Expected a non-empty sitemap of canonical page paths')
  }

  return [...new Set<string>(pages)].sort()
}

export function assertCompleteReport(report: HydrationReport) {
  if (
    report.schemaVersion !== 1 ||
    !report.complete ||
    Boolean(report.error) ||
    report.expectedVisits <= 0 ||
    report.expectedVisits % 2 !== 0 ||
    report.visits.length !== report.expectedVisits ||
    report.visits.some((visit) => visit.error) ||
    new Set(
      report.visits.map((visit) => `${visit.page}:${visit.colorScheme}`)
    ).size !== report.expectedVisits ||
    new Set(report.visits.map((visit) => visit.page)).size * 2 !==
      report.expectedVisits ||
    report.visits.some(
      (visit) => !['light', 'dark'].includes(visit.colorScheme)
    )
  ) {
    throw new Error(
      'Hydration reporting requires a complete successful scan'
    )
  }
}

export function hydrationIssues(report: HydrationReport) {
  const pages = new Map<string, HydrationVisit[]>()
  for (const visit of report.visits) {
    if (visit.findings.length) {
      pages.set(visit.page, [...(pages.get(visit.page) || []), visit])
    }
  }

  return [...pages]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([page, visits]) => {
      const marker = hydrationIssueMarker(page)
      const errors = [
        ...new Map(
          visits
            .flatMap((visit) => visit.findings)
            .map((finding) => [
              finding.message.split('\n')[0] + finding.componentStack,
              finding,
            ])
        ).values(),
      ]
      const body = [
        marker,
        `React reports hydration errors on [${page}](${new URL(page, report.baseUrl).href}).`,
        `Reproduced on a direct page load in ${visits
          .map(({ colorScheme }) => colorScheme)
          .sort()
          .join(
            ' and '
          )} mode. The page returned HTTP 200 and reached Portal readiness.`,
        ...errors
          .slice(0, 5)
          .map(
            ({ message, componentStack }) =>
              `<details><summary>React hydration error</summary>\n\n<pre>${escapeHtml(message).slice(0, 3000)}${componentStack ? '\n\n' + escapeHtml(componentStack).slice(0, 6000) : ''}</pre>\n\n</details>`
          ),
        'The full scan, including repeated errors, is available in the workflow artifacts.',
      ]
        .join('\n\n')
        .slice(0, 55000)

      return {
        page,
        marker,
        title: `Portal hydration errors: ${page}`.slice(0, 250),
        body,
      }
    })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function hydrationIssueMarker(page: string) {
  return (
    '<!-- portal-hydration:' +
    createHash('sha256').update(page).digest('hex') +
    ' -->'
  )
}
