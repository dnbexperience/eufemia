import { buildReport } from '../../monitoring/report.ts'
import type {
  Check,
  CheckOptions,
  Report,
} from '../../monitoring/report.ts'
import { createProbe } from '../../monitoring/probe.ts'

const latestScheduledRun =
  'https://api.github.com/repos/dnbexperience/eufemia/actions/workflows/ghe-token-expiry.yml/runs?event=schedule&status=completed&per_page=1'
// The daily schedule has started up to ten hours late.
const maxAgeHours = 48
const maxAgeMs = maxAgeHours * 3_600_000
const impact = ', so PAT expiry warnings may not reach Slack'

type Options = CheckOptions & { githubToken?: string }

type Run = { conclusion: string | null; run_started_at?: string }

async function readLatestRun(request: typeof fetch, token?: string) {
  const response = await request(latestScheduledRun, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  })
  if (response.status !== 200) {
    await response.body?.cancel()
    throw new Error(`HTTP ${response.status} from GitHub`)
  }
  const data = await response.json()
  return data.workflow_runs?.[0] as Run | undefined
}

export async function checkTokens(options: Options = {}): Promise<Report> {
  const now = options.now ?? Date.now()
  const checks: Check[] = []
  const probe = createProbe(checks, options.sleep)
  await probe('PAT expiry workflow', async () => {
    const run = await readLatestRun(
      options.fetch ?? fetch,
      options.githubToken
    )
    const startedAt = Date.parse(run?.run_started_at ?? '')
    if (
      !run ||
      !Number.isFinite(startedAt) ||
      now - startedAt > maxAgeMs
    ) {
      throw new Error(
        `No scheduled run has finished in ${maxAgeHours} hours` + impact
      )
    }
    if (run.conclusion !== 'success') {
      throw new Error(
        `Latest scheduled run concluded ${run.conclusion}` + impact
      )
    }
  })
  return buildReport(checks, now)
}
