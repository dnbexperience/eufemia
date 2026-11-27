import { readFileSync, readdirSync } from 'node:fs'
import { expect, it, vi } from 'vitest'
import {
  checkScheduledWorkflows,
  scheduledWorkflows,
} from '../src/check-scheduled-workflows.ts'

const now = Date.parse('2026-11-27T08:00:00Z')
const success = {
  id: 123,
  status: 'completed',
  conclusion: 'success',
  run_started_at: '2026-11-27T06:30:00Z',
}
const socialImages = 'portal-og-images.yml'
const workflowUrl =
  'https://github.com/dnbexperience/eufemia/actions/workflows/'

function respond(overrides: Record<string, object[] | number> = {}) {
  return vi.fn<typeof fetch>(async (input) => {
    const file = String(input).split('/workflows/')[1].split('/')[0]
    const value = overrides[file] ?? [success]
    return typeof value === 'number'
      ? new Response('', { status: value })
      : Response.json({ workflow_runs: value })
  })
}

function check(request: typeof fetch, githubToken?: string) {
  return checkScheduledWorkflows({
    fetch: request,
    now,
    githubToken,
    sleep: async () => {},
  })
}

it('covers every scheduled workflow in the repository', () => {
  const directory = new URL('../../../.github/workflows/', import.meta.url)
  const files = readdirSync(directory).filter(
    (file) =>
      /\.ya?ml$/.test(file) &&
      /^ {2}schedule:/m.test(
        readFileSync(new URL(file, directory), 'utf8')
      )
  )
  expect(scheduledWorkflows.map(({ file }) => file).sort()).toEqual(
    files.sort()
  )
})

it('checks scheduled runs without letting manual or pull request runs mask their results', async () => {
  const request = respond()
  const report = await check(request)
  expect(report.status).toBe('healthy')
  expect(report.checks).toHaveLength(8)
  for (const [url, init] of request.mock.calls) {
    expect(new URL(String(url)).searchParams.toString()).toBe(
      'event=schedule&per_page=1'
    )
    expect(new Headers(init?.headers).has('Authorization')).toBe(false)
    expect(init?.redirect).toBe('error')
  }
})

it('sends the optional read-only GitHub token', async () => {
  const request = respond()
  await check(request, 'github-token')
  expect(
    new Headers(request.mock.calls[0][1]?.headers).get('Authorization')
  ).toBe('Bearer github-token')
})

it.each([
  'failure',
  'timed_out',
  'cancelled',
  'action_required',
  'skipped',
  null,
])(
  'reports a %s scheduled run with its run link while checking the other workflows',
  async (conclusion) => {
    const report = await check(
      respond({ [socialImages]: [{ ...success, conclusion }] })
    )
    expect(report.status).toBe('unhealthy')
    expect(report.checks.filter(({ ok }) => !ok)).toEqual([
      {
        name: 'Portal social images',
        ok: false,
        detail: expect.stringContaining(
          'Latest scheduled run concluded ' +
            conclusion +
            ': https://github.com/dnbexperience/eufemia/actions/runs/123'
        ),
      },
    ])
  }
)

it.each([
  ['dependency-audit.yml', 48],
  [socialImages, 8 * 24],
  ['country-flags-sync.yml', 32 * 24],
])('uses the freshness window for %s', async (file, hours) => {
  const run = (age: number) => ({
    ...success,
    run_started_at: new Date(now - age * 3_600_000).toISOString(),
  })
  expect((await check(respond({ [file]: [run(hours)] }))).status).toBe(
    'healthy'
  )
  const report = await check(respond({ [file]: [run(hours + 1)] }))
  expect(report.status).toBe('unhealthy')
  expect(report.checks.find(({ ok }) => !ok)?.detail).toContain(
    'No recent scheduled run within ' + hours + ' hours'
  )
})

it.each([
  { runs: [] },
  { runs: [{ ...success, run_started_at: 'invalid' }] },
])('reports missing or invalid runs', async ({ runs }) => {
  const report = await check(respond({ [socialImages]: runs }))
  expect(report.status).toBe('unhealthy')
  expect(report.checks.find(({ ok }) => !ok)?.detail).toContain(
    workflowUrl + socialImages
  )
})

it('retries GitHub API failures without losing results for other workflows', async () => {
  const request = respond({ [socialImages]: 503 })
  const report = await check(request)
  expect(
    request.mock.calls.filter(([url]) =>
      String(url).includes(socialImages)
    )
  ).toHaveLength(3)
  expect(report.checks.filter(({ ok }) => ok)).toHaveLength(7)
  expect(report.checks.find(({ ok }) => !ok)?.detail).toContain(
    'HTTP 503 from GitHub'
  )
})

it('recovers when a retry succeeds', async () => {
  const request = respond()
  request.mockRejectedValueOnce(new TypeError('fetch failed'))
  expect((await check(request)).status).toBe('healthy')
})

it.each(['queued', 'in_progress'])(
  'keeps a %s scheduled run pending until it completes',
  async (status) => {
    const report = await check(
      respond({
        [socialImages]: [{ ...success, status, conclusion: null }],
      })
    )
    expect(report.status).toBe('pending')
    expect(report.checks.find(({ ok }) => !ok)).toEqual({
      name: 'Portal social images',
      ok: false,
      pending: true,
      detail:
        'Latest scheduled run is ' +
        status +
        ': https://github.com/dnbexperience/eufemia/actions/runs/123',
    })
  }
)

it('reports a stuck run once its freshness window expires', async () => {
  const report = await check(
    respond({
      [socialImages]: [
        {
          ...success,
          status: 'in_progress',
          conclusion: null,
          run_started_at: '2026-11-18T06:30:00Z',
        },
      ],
    })
  )
  expect(report.status).toBe('unhealthy')
  expect(report.checks.find(({ ok }) => !ok)?.pending).not.toBe(true)
})
