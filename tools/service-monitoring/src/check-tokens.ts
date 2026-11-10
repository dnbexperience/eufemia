import type { Check, Report } from '../../monitoring/report-incident.ts'

const latestScheduledRun =
  'https://api.github.com/repos/dnbexperience/eufemia/actions/workflows/ghe-token-expiry.yml/runs?event=schedule&status=completed&per_page=1'
// The daily schedule has started up to ten hours late.
const maxAgeHours = 48
const maxAgeMs = maxAgeHours * 3_600_000
const impact = ', so PAT expiry warnings may not reach Slack'

type Options = {
  fetch: typeof fetch
  sleep: (ms: number) => Promise<void>
  now?: number
}

type Run = { conclusion: string | null; run_started_at?: string }

async function readLatestRun(request: typeof fetch) {
  const response = await request(latestScheduledRun, {
    headers: { Accept: 'application/vnd.github+json' },
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

async function withRetries<T>(
  read: () => Promise<T>,
  sleep: Options['sleep']
) {
  for (let attempt = 1; attempt < 3; attempt++) {
    try {
      return await read()
    } catch {
      await sleep(2000 * attempt)
    }
  }
  return read().catch((error: unknown) =>
    error instanceof Error ? error : new Error('Request failed')
  )
}

async function checkLatestRun(
  options: Options,
  now: number
): Promise<Check> {
  const name = 'PAT expiry workflow'
  const run = await withRetries(
    () => readLatestRun(options.fetch),
    options.sleep
  )
  if (run instanceof Error) {
    return { name, ok: false, detail: run.message }
  }

  const startedAt = Date.parse(run?.run_started_at ?? '')
  if (!run || !Number.isFinite(startedAt) || now - startedAt > maxAgeMs) {
    return {
      name,
      ok: false,
      detail:
        `No scheduled run has finished in ${maxAgeHours} hours` + impact,
    }
  }
  if (run.conclusion !== 'success') {
    return {
      name,
      ok: false,
      detail: `Latest scheduled run concluded ${run.conclusion}` + impact,
    }
  }
  return { name, ok: true, detail: 'OK' }
}

export async function checkTokens(options: Options): Promise<Report> {
  const now = options.now ?? Date.now()
  const checks = [await checkLatestRun(options, now)]
  return {
    status: checks.every((check) => check.ok) ? 'healthy' : 'unhealthy',
    checkedAt: new Date(now).toISOString(),
    checks,
  }
}
