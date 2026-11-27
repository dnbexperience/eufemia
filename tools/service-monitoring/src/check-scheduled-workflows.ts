import { buildReport } from '../../monitoring/report.ts'
import type {
  Check,
  CheckOptions,
  Report,
} from '../../monitoring/report.ts'
import { createProbe } from '../../monitoring/probe.ts'

// GitHub's daily schedules have started up to ten hours late. Allow one
// additional day for delayed daily, weekly and monthly schedules.
export const scheduledWorkflows = [
  {
    file: 'dependency-audit.yml',
    name: 'Dependency audit',
    maxAgeHours: 48,
    recoverOnPush: true,
  },
  {
    file: 'ghe-token-expiry.yml',
    name: 'GHE token expiry',
    maxAgeHours: 48,
  },
  {
    file: 'release-sbom-check.yml',
    name: 'Release SBOM check',
    maxAgeHours: 48,
  },
  {
    file: 'codeql-analysis.yml',
    name: 'CodeQL',
    maxAgeHours: 8 * 24,
    recoverOnPush: true,
  },
  {
    file: 'portal-accessibility-and-duplicate-ids.yml',
    name: 'Portal accessibility and duplicate IDs',
    maxAgeHours: 8 * 24,
  },
  {
    file: 'portal-og-images.yml',
    name: 'Portal social images',
    maxAgeHours: 8 * 24,
  },
  {
    file: 'portal-hydration.yml',
    name: 'Portal hydration',
    maxAgeHours: 8 * 24,
  },
  {
    file: 'country-flags-sync.yml',
    name: 'Country Flags',
    maxAgeHours: 32 * 24,
  },
]
const actionsUrl = 'https://github.com/dnbexperience/eufemia/actions'
type Options = CheckOptions & { githubToken?: string }
type Run = {
  id: number
  status: string
  conclusion: string | null
  created_at?: string
  run_started_at?: string
}

async function readLatestRun(
  file: string,
  event: 'schedule' | 'push',
  request: typeof fetch,
  token?: string
) {
  const url =
    'https://api.github.com/repos/dnbexperience/eufemia/actions/workflows/' +
    file +
    '/runs?event=' +
    event +
    (event === 'push' ? '&branch=main&status=completed' : '') +
    '&per_page=1'
  const response = await request(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  })
  if (response.status !== 200) {
    await response.body?.cancel()
    throw new Error('HTTP ' + response.status + ' from GitHub')
  }
  const data = await response.json()
  return data.workflow_runs?.[0] as Run | undefined
}

export async function checkScheduledWorkflows(
  options: Options = {}
): Promise<Report> {
  const now = options.now ?? Date.now()
  const checks = await Promise.all(
    scheduledWorkflows.map(async (workflow) => {
      const { file, name, maxAgeHours, recoverOnPush } = workflow
      const url = actionsUrl + '/workflows/' + file
      const checks: Check[] = []
      const run = await createProbe(checks, options.sleep)(
        name,
        () =>
          readLatestRun(
            file,
            'schedule',
            options.fetch ?? fetch,
            options.githubToken
          ),
        url
      )
      const check = checks[0]
      if (!check.ok) {
        return check
      }
      const startedAt = Date.parse(run?.run_started_at ?? '')
      if (
        !run ||
        !Number.isFinite(startedAt) ||
        now - startedAt > maxAgeHours * 3_600_000
      ) {
        return {
          name,
          ok: false,
          detail:
            url +
            ': No recent scheduled run within ' +
            maxAgeHours +
            ' hours',
        }
      }
      const runUrl =
        Number.isSafeInteger(run.id) && run.id > 0
          ? actionsUrl + '/runs/' + run.id
          : url
      if (run.status !== 'completed') {
        return {
          name,
          ok: false,
          pending: true,
          detail: 'Latest scheduled run is ' + run.status + ': ' + runUrl,
        }
      }
      if (run.conclusion !== 'success') {
        // These workflows run the same checks on pushes to main. Keep cron
        // freshness above independent from recovery on newer code.
        if (recoverOnPush) {
          const recovery = await createProbe(checks, options.sleep)(
            name,
            () =>
              readLatestRun(
                file,
                'push',
                options.fetch ?? fetch,
                options.githubToken
              ),
            url
          )
          if (!checks[1].ok) {
            return checks[1]
          }
          if (
            recovery?.status === 'completed' &&
            recovery.conclusion === 'success' &&
            Date.parse(recovery.created_at ?? '') > startedAt
          ) {
            return check
          }
        }
        return {
          name,
          ok: false,
          detail:
            'Latest scheduled run concluded ' +
            run.conclusion +
            ': ' +
            runUrl,
        }
      }
      return check
    })
  )
  return buildReport(checks, now)
}
