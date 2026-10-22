import type { Check, Report } from '../../../monitoring/report-incident.ts'

const healthz = 'https://server.eufemia.dnb.no/analytics/healthz'
const dashboard = 'https://dashboard.eufemia.dnb.no/'
const deployments =
  'https://api.github.com/repos/dnbexperience/eufemia/actions/workflows/analytics-lambda.yml/runs?per_page=20'
const graceMs = 60 * 60_000

type Options = {
  fetch?: typeof fetch
  githubToken?: string
  gheRepository?: string
  gheToken?: string
  now?: number
  sleep?: (ms: number) => Promise<void>
}

type Run = {
  event?: string
  status: string
  conclusion: string | null
  created_at: string
  updated_at?: string
  head_sha?: string
  head_repository?: { full_name?: string }
  display_title?: string
}

export async function checkAnalytics(
  options: Options = {}
): Promise<Report> {
  const request = options.fetch ?? fetch
  const now = options.now ?? Date.now()
  const sleep =
    options.sleep ??
    ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)))
  const checks: Check[] = []

  async function probe<T>(
    name: string,
    run: () => Promise<T>
  ): Promise<T | undefined> {
    let detail = ''
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const value = await run()
        checks.push({ name, ok: true, detail: 'OK' })
        return value
      } catch (error) {
        detail = error instanceof Error ? error.message : 'Request failed'
        if (attempt < 2) {
          await sleep(2000 * (attempt + 1))
        }
      }
    }
    checks.push({ name, ok: false, detail })
    return undefined
  }

  // Errors name only the status: GHE URLs would put the internal repository name in a public issue.
  async function get(url: string, type: string, token?: string) {
    const response = await request(url, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          }
        : {},
      redirect: 'error',
      signal: AbortSignal.timeout(20_000),
    })
    if (response.status !== 200) {
      await response.body?.cancel()
      throw new Error(`HTTP ${response.status}`)
    }
    if (response.headers.get('content-type')?.split(';')[0] !== type) {
      await response.body?.cancel()
      throw new Error(`Expected ${type}`)
    }
    return response
  }

  function runInProgress(run: Run, label: string) {
    const created = Date.parse(run.created_at)
    if (run.status === 'completed' && run.conclusion !== 'success') {
      throw new Error(`Latest ${label} concluded ${run.conclusion}`)
    }
    const inProgress = run.status !== 'completed'
    if (inProgress && now - created >= graceMs) {
      throw new Error(`Latest ${label} has not completed within one hour`)
    }
    return inProgress
  }

  const source = probe('deployment source', async () => {
    const data = await (
      await get(deployments, 'application/json', options.githubToken)
    ).json()
    const run: Run | undefined = data.workflow_runs?.find(
      (run: Run) =>
        ['push', 'workflow_dispatch'].includes(run.event ?? '') &&
        run.head_repository?.full_name === 'dnbexperience/eufemia'
    )
    if (
      !run ||
      !/^[a-f0-9]{40}$/.test(run.head_sha ?? '') ||
      !Number.isFinite(Date.parse(run.created_at))
    ) {
      throw new Error('No valid analytics deployment run found')
    }
    const inProgress = runInProgress(run, 'analytics deployment workflow')
    const completed = Date.parse(run.updated_at ?? '')
    return {
      sha: run.head_sha as string,
      started:
        !inProgress && Number.isFinite(completed)
          ? completed
          : Date.parse(run.created_at),
      inProgress,
    }
  })
  const deploy = probe('GHE deploy run', async () => {
    if (
      !/^[\w.-]+\/[\w.-]+$/.test(options.gheRepository ?? '') ||
      !options.gheToken
    ) {
      throw new Error('GHE deploy repository or token is not configured')
    }
    const data = await (
      await get(
        `https://api.dnb.ghe.com/repos/${options.gheRepository}/actions/runs?branch=deploy&per_page=1`,
        'application/json',
        options.gheToken
      )
    ).json()
    const run: Run | undefined = data.workflow_runs?.[0]
    if (!run || !Number.isFinite(Date.parse(run.created_at))) {
      throw new Error('No analytics deploy run found')
    }
    return {
      commit: run.display_title?.match(/\(([a-f0-9]{7,40})\)$/)?.[1],
      inProgress: runInProgress(run, 'deploy run'),
    }
  })
  const health = probe('API health', async () => {
    const data = await (await get(healthz, 'application/json')).json()
    if (data.status !== 'ok') {
      throw new Error('Health endpoint did not report ok')
    }
  })
  const page = probe('dashboard', async () => {
    const html = await (await get(dashboard, 'text/html')).text()
    const script = html.match(
      /<script[^>]+src="(\/assets\/[^"]+\.js)"/
    )?.[1]
    if (!html.includes('<title>Eufemia Analytics</title>') || !script) {
      throw new Error('Dashboard page is missing or invalid')
    }
    const bundle = await get(
      new URL(script, dashboard).href,
      'text/javascript'
    )
    await bundle.body?.cancel()
  })

  const [published, deployed] = await Promise.all([source, deploy])
  await Promise.all([health, page])
  if (published?.inProgress || deployed?.inProgress) {
    checks.push({
      name: 'deployment rollout',
      ok: false,
      pending: true,
      detail: 'Analytics deployment is still running',
    })
  }
  if (published && deployed) {
    const matches = Boolean(
      deployed.commit && published.sha.startsWith(deployed.commit)
    )
    checks.push({
      name: 'deployed source',
      ok: matches,
      pending: !matches && now - published.started < graceMs,
      detail: `Deployed ${deployed.commit ?? 'unknown'}; expected ${published.sha}`,
    })
  }
  checks.sort((a, b) => a.name.localeCompare(b.name))
  return {
    status: checks.some((check) => !check.ok && !check.pending)
      ? 'unhealthy'
      : checks.some((check) => check.pending)
        ? 'pending'
        : 'healthy',
    checkedAt: new Date(now).toISOString(),
    latest: published?.sha,
    checks,
  }
}
