import { buildReport } from '../../../monitoring/report.ts'
import type {
  Check,
  CheckOptions,
  Report,
} from '../../../monitoring/report.ts'
import { createProbe } from '../../../monitoring/probe.ts'
import { runDiagnosticCli } from '../../../monitoring/diagnostic-cli.ts'

const healthz = 'https://server.eufemia.dnb.no/analytics/healthz'
const dashboard = 'https://dashboard.eufemia.dnb.no/'
const deployments =
  'https://api.github.com/repos/dnbexperience/eufemia/actions/workflows/analytics-lambda.yml/runs?per_page=20'
const graceMs = 60 * 60_000

type Options = CheckOptions & {
  githubToken?: string
  gheRepository?: string
  gheToken?: string
}

type Run = {
  event?: string
  status: string
  conclusion: string | null
  created_at: string
  run_started_at?: string
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
  const checks: Check[] = []
  const probe = createProbe(checks, options.sleep)

  // Errors never include the URL: GHE URLs would put the internal repository name in alerts and logs.
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
      throw new Error(
        response.status === 401 && token
          ? 'Token expired or revoked (HTTP 401)'
          : `HTTP ${response.status}`
      )
    }
    if (response.headers.get('content-type')?.split(';')[0] !== type) {
      await response.body?.cancel()
      throw new Error(`Expected ${type}`)
    }
    return response
  }

  // A re-run keeps created_at, so age the current attempt from its start.
  function startedAt(run: Run) {
    return Date.parse(run.run_started_at ?? run.created_at)
  }

  function runInProgress(run: Run, label: string) {
    if (run.status === 'completed' && run.conclusion !== 'success') {
      throw new Error(`Latest ${label} concluded ${run.conclusion}`)
    }
    const inProgress = run.status !== 'completed'
    if (inProgress && now - startedAt(run) >= graceMs) {
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
      !Number.isFinite(startedAt(run))
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
          : startedAt(run),
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
    if (!run || !Number.isFinite(startedAt(run))) {
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
  return buildReport(checks, now, published?.sha)
}

await runDiagnosticCli(import.meta.url, 'Analytics', () =>
  checkAnalytics({
    githubToken: process.env.GH_TOKEN,
    gheRepository: process.env.ANALYTICS_DEPLOY_REPOSITORY,
    gheToken: process.env.GHE_TOKEN,
  })
)
