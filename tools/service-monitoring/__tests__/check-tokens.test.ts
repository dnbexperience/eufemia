import { expect, it, vi } from 'vitest'
import { checkTokens } from '../src/check-tokens.ts'

const now = Date.parse('2026-11-03T12:00:00Z')
const success = {
  conclusion: 'success',
  run_started_at: '2026-11-03T06:30:00Z',
}

function runs(...workflowRuns: object[]) {
  return () => Response.json({ workflow_runs: workflowRuns })
}

function expiresOn(date: string) {
  return () =>
    new Response('{}', {
      headers: { 'GitHub-Authentication-Token-Expiration': date },
    })
}

function respond(
  github: () => Response,
  ghe = expiresOn('2027-01-01 00:00:00 UTC')
) {
  return vi.fn<typeof fetch>(async (input) =>
    String(input).startsWith('https://api.dnb.ghe.com/') ? ghe() : github()
  )
}

function callsTo(request: ReturnType<typeof respond>, host: string) {
  return request.mock.calls.filter(([url]) =>
    String(url).startsWith(`https://${host}/`)
  )
}

async function check(
  request: typeof fetch,
  tokens: { githubToken?: string; gheToken?: string } = {}
) {
  return checkTokens({
    fetch: request,
    sleep: async () => {},
    now,
    gheToken: 'ghe-token',
    ...tokens,
  })
}

it('reads only finished scheduled runs and is healthy after a successful run', async () => {
  const request = respond(
    runs({ conclusion: 'success', run_started_at: '2026-11-02T16:07:54Z' })
  )
  const report = await check(request)
  expect(report).toEqual({
    status: 'healthy',
    checkedAt: '2026-11-03T12:00:00.000Z',
    checks: [
      { name: 'PAT expiry workflow', ok: true, detail: 'OK' },
      {
        name: 'Analytics GHE token',
        ok: true,
        detail: 'expires in 59 days (2027-01-01)',
      },
    ],
  })
  const [[url, init]] = callsTo(request, 'api.github.com')
  expect(url).toContain(
    '/workflows/ghe-token-expiry.yml/runs?event=schedule&status=completed'
  )
  expect(new Headers(init?.headers).has('Authorization')).toBe(false)
})

it('sends the optional GitHub token', async () => {
  const request = respond(runs(success))
  await check(request, { githubToken: 'github-token' })
  const [[, init]] = callsTo(request, 'api.github.com')
  expect(new Headers(init?.headers).get('Authorization')).toBe(
    'Bearer github-token'
  )
})

it.each([
  [
    'a failed run',
    [{ conclusion: 'failure', run_started_at: '2026-11-03T06:30:00Z' }],
    'Latest scheduled run concluded failure, so PAT expiry warnings may not reach Slack',
  ],
  [
    'a run older than 48 hours',
    [{ conclusion: 'success', run_started_at: '2026-11-01T11:59:00Z' }],
    'No scheduled run has finished in 48 hours, so PAT expiry warnings may not reach Slack',
  ],
  [
    'no run',
    [],
    'No scheduled run has finished in 48 hours, so PAT expiry warnings may not reach Slack',
  ],
])('is unhealthy after %s', async (_label, workflowRuns, detail) => {
  const report = await check(respond(runs(...workflowRuns)))
  expect(report.status).toBe('unhealthy')
  expect(report.checks).toContainEqual({
    name: 'PAT expiry workflow',
    ok: false,
    detail,
  })
})

it('tries GitHub three times before reporting the status', async () => {
  const request = respond(() => new Response('', { status: 503 }))
  const report = await check(request)
  expect(callsTo(request, 'api.github.com')).toHaveLength(3)
  expect(report.checks).toContainEqual({
    name: 'PAT expiry workflow',
    ok: false,
    detail: 'HTTP 503 from GitHub',
  })
})

it('recovers when a retry succeeds', async () => {
  const github = vi
    .fn<() => Response>()
    .mockImplementationOnce(() => {
      throw new TypeError('fetch failed')
    })
    .mockImplementation(runs(success))
  expect((await check(respond(github))).status).toBe('healthy')
})

it('warns from 14 days before the analytics GHE token expires', async () => {
  const request = respond(
    runs(success),
    expiresOn('2026-11-17 06:30:00 UTC')
  )
  const report = await check(request)
  expect(report.status).toBe('unhealthy')
  expect(report.checks).toEqual([
    { name: 'PAT expiry workflow', ok: true, detail: 'OK' },
    {
      name: 'Analytics GHE token',
      ok: false,
      detail: 'expires in 14 days (2026-11-17)',
    },
  ])
  const [[url, init]] = callsTo(request, 'api.dnb.ghe.com')
  expect(url).toBe('https://api.dnb.ghe.com/rate_limit')
  expect(new Headers(init?.headers).get('Authorization')).toBe(
    'Bearer ghe-token'
  )
})

it('is healthy 15 days before the analytics GHE token expires', async () => {
  const report = await check(
    respond(runs(success), expiresOn('2026-11-18 06:30:00 UTC'))
  )
  expect(report.status).toBe('healthy')
})

it('reports an expired analytics GHE token without retrying', async () => {
  const request = respond(
    runs(success),
    () => new Response('{}', { status: 401 })
  )
  const report = await check(request)
  expect(callsTo(request, 'api.dnb.ghe.com')).toHaveLength(1)
  expect(report.checks).toContainEqual({
    name: 'Analytics GHE token',
    ok: false,
    detail: 'expired or revoked',
  })
})

it('tries GHE three times before reporting the status', async () => {
  const request = respond(
    runs(success),
    () => new Response('', { status: 503 })
  )
  const report = await check(request)
  expect(callsTo(request, 'api.dnb.ghe.com')).toHaveLength(3)
  expect(report.checks).toContainEqual({
    name: 'Analytics GHE token',
    ok: false,
    detail: 'HTTP 503 from GHE',
  })
})

it('fails the analytics GHE token check without a token', async () => {
  const request = respond(runs(success))
  const report = await check(request, { gheToken: undefined })
  expect(callsTo(request, 'api.dnb.ghe.com')).toHaveLength(0)
  expect(report.checks).toContainEqual({
    name: 'Analytics GHE token',
    ok: false,
    detail: 'No token to check',
  })
})
