import { describe, expect, it, vi } from 'vitest'
import { checkAnalytics } from '../src/monitor/check-analytics.ts'
import { reportIncident } from '../../monitoring/report-incident.ts'

const now = Date.parse('2026-10-21T12:00:00Z')
const sha = '4c80f17a312a194efdb67e146c6a8b0a5f0ca045'
const gheRepository = 'owner/deploy-repo'
const gheToken = 'ghe-fixture-token'
const githubToken = 'github-fixture-token'
const sleep = async () => {}
const minutesAgo = (minutes: number) =>
  new Date(now - minutes * 60_000).toISOString()

type Change = (url: URL, init?: RequestInit) => Response | undefined

function fixture({
  age = 120,
  publicRun = {},
  deployRun = {},
  change = (): Response | undefined => undefined,
}: {
  age?: number
  publicRun?: Record<string, unknown>
  deployRun?: Record<string, unknown>
  change?: Change
} = {}) {
  return vi.fn(
    async (input: string | URL | Request, init?: RequestInit) => {
      const url = new URL(String(input))
      const response = change(url, init)
      if (response) {
        return response
      }
      if (url.hostname === 'api.github.com') {
        return Response.json({
          workflow_runs: [
            {
              event: 'push',
              status: 'completed',
              conclusion: 'success',
              head_repository: { full_name: 'dnbexperience/eufemia' },
              head_sha: sha,
              created_at: minutesAgo(age + 5),
              updated_at: minutesAgo(age),
              ...publicRun,
            },
          ],
        })
      }
      if (url.hostname === 'api.dnb.ghe.com') {
        return Response.json({
          workflow_runs: [
            {
              status: 'completed',
              conclusion: 'success',
              created_at: minutesAgo(age),
              display_title: `Deploy from main (${sha.slice(0, 7)})`,
              ...deployRun,
            },
          ],
        })
      }
      if (url.pathname === '/analytics/healthz') {
        return Response.json({ status: 'ok' })
      }
      if (url.href === 'https://dashboard.eufemia.dnb.no/') {
        return new Response(
          '<title>Eufemia Analytics</title><script type="module" src="/assets/index-abc.js"></script>',
          { headers: { 'Content-Type': 'text/html' } }
        )
      }
      if (url.pathname === '/assets/index-abc.js') {
        return new Response('export {}', {
          headers: { 'Content-Type': 'text/javascript' },
        })
      }
      return new Response('', { status: 404 })
    }
  )
}

function check(fetch: ReturnType<typeof fixture>, options = {}) {
  return checkAnalytics({
    fetch,
    githubToken,
    gheRepository,
    gheToken,
    now,
    sleep,
    ...options,
  })
}

function failed(report: Awaited<ReturnType<typeof checkAnalytics>>) {
  return report.checks
    .filter((check) => !check.ok && !check.pending)
    .map((check) => check.name)
}

describe('production analytics checks', () => {
  it('checks the public workflow, the GHE deploy, the deployed source, the API and the dashboard', async () => {
    const request = fixture()
    const report = await check(request)

    expect(report.status).toBe('healthy')
    expect(report.latest).toBe(sha)
    expect(report.checks.map((check) => check.name)).toEqual([
      'API health',
      'dashboard',
      'deployed source',
      'deployment source',
      'GHE deploy run',
    ])
    expect(
      request.mock.calls
        .map(([input]) => String(input))
        .find((url) => new URL(url).hostname === 'api.dnb.ghe.com')
    ).toBe(
      'https://api.dnb.ghe.com/repos/owner/deploy-repo/actions/runs?branch=deploy&per_page=1'
    )
  })

  it('sends each token only to its own GitHub host', async () => {
    const request = fixture()
    await check(request)

    for (const [input, init] of request.mock.calls) {
      const host = new URL(String(input)).hostname
      const auth = new Headers(init?.headers).get('Authorization')
      expect(auth).toBe(
        host === 'api.github.com'
          ? `Bearer ${githubToken}`
          : host === 'api.dnb.ghe.com'
            ? `Bearer ${gheToken}`
            : null
      )
    }
  })

  it('fails when the public deployment workflow or the GHE deploy run failed', async () => {
    const publicFailure = await check(
      fixture({ publicRun: { conclusion: 'failure' } })
    )
    const deployFailure = await check(
      fixture({ deployRun: { conclusion: 'failure' } })
    )

    expect(failed(publicFailure)).toEqual(['deployment source'])
    expect(failed(deployFailure)).toEqual(['GHE deploy run'])
    expect(
      deployFailure.checks.find((check) => check.name === 'GHE deploy run')
        ?.detail
    ).toBe('Latest deploy run concluded failure')
  })

  it('waits for a running deployment, then fails it after one hour', async () => {
    const running = { status: 'in_progress', conclusion: null }
    const fresh = await check(fixture({ age: 10, deployRun: running }))
    const stuck = await check(fixture({ age: 61, deployRun: running }))

    expect(fresh.status).toBe('pending')
    expect(stuck.status).toBe('unhealthy')
    expect(failed(stuck)).toEqual(['GHE deploy run'])
  })

  it('allows rollout time for a source mismatch, then fails a GHE deploy that never ran', async () => {
    const old = { display_title: 'Deploy from main (57c9b37)' }
    const settling = await check(fixture({ age: 10, deployRun: old }))
    const stale = await check(fixture({ age: 61, deployRun: old }))

    expect(settling.status).toBe('pending')
    expect(failed(stale)).toEqual(['deployed source'])
  })

  it('fails when the API or the dashboard is unavailable, after retries', async () => {
    const request = fixture({
      change: (url) =>
        url.pathname === '/analytics/healthz' ||
        url.pathname === '/assets/index-abc.js'
          ? new Response('', { status: 503 })
          : undefined,
    })
    const report = await check(request)

    expect(failed(report)).toEqual(['API health', 'dashboard'])
    expect(
      request.mock.calls.filter(([input]) =>
        String(input).endsWith('/analytics/healthz')
      )
    ).toHaveLength(3)
  })

  it('reports a rejected or unconfigured GHE request without exposing the token', async () => {
    const rejected = await check(
      fixture({
        change: (url) =>
          url.hostname === 'api.dnb.ghe.com'
            ? new Response('', { status: 403 })
            : undefined,
      })
    )
    const request = fixture()
    const unconfigured = await check(request, { gheRepository: '' })

    expect(failed(rejected)).toEqual(['GHE deploy run'])
    expect(JSON.stringify(rejected)).not.toContain(gheToken)
    expect(JSON.stringify(rejected)).not.toContain(gheRepository)
    expect(failed(unconfigured)).toEqual(['GHE deploy run'])
    expect(
      request.mock.calls.some(
        ([input]) => new URL(String(input)).hostname === 'api.dnb.ghe.com'
      )
    ).toBe(false)
  })

  it('opens its own incident, separate from CDN and MCP incidents', async () => {
    const request = vi.fn(async (_url: string, init?: RequestInit) =>
      init?.method === 'POST'
        ? Response.json({ number: 1, html_url: 'https://example.com/1' })
        : Response.json([])
    )
    await reportIncident({
      service: 'Analytics',
      report: await check(
        fixture({ deployRun: { conclusion: 'failure' } })
      ),
      repository: 'owner/repo',
      token: githubToken,
      runUrl: 'https://example.com/run',
      request: request as unknown as typeof fetch,
    })

    const created = request.mock.calls.find(
      ([, init]) => init?.method === 'POST'
    )
    const body = JSON.parse(String(created?.[1]?.body))
    expect(body.title).toBe('Eufemia Analytics incident')
    expect(body.body).toMatch(/^<!-- eufemia-analytics-health:/)
  })
})
