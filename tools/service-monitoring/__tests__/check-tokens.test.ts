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

function respond(github: () => Response) {
  return vi.fn<typeof fetch>(async () => github())
}

async function check(request: typeof fetch) {
  return checkTokens({ fetch: request, sleep: async () => {}, now })
}

it('reads only finished scheduled runs and is healthy after a successful run', async () => {
  const request = respond(
    runs({ conclusion: 'success', run_started_at: '2026-11-02T16:07:54Z' })
  )
  const report = await check(request)
  expect(report).toEqual({
    status: 'healthy',
    checkedAt: '2026-11-03T12:00:00.000Z',
    checks: [{ name: 'PAT expiry workflow', ok: true, detail: 'OK' }],
  })
  expect(request.mock.calls[0]?.[0]).toContain(
    '/workflows/ghe-token-expiry.yml/runs?event=schedule&status=completed'
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

it('retries GitHub errors three times before reporting the status', async () => {
  const request = respond(() => new Response('', { status: 503 }))
  const report = await check(request)
  expect(request).toHaveBeenCalledTimes(3)
  expect(report.checks).toEqual([
    {
      name: 'PAT expiry workflow',
      ok: false,
      detail: 'HTTP 503 from GitHub',
    },
  ])
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
