import { describe, expect, it, vi } from 'vitest'
import { reportIncident } from '../../monitoring/report-incident.ts'
import type { Report } from '../../monitoring/report-incident.ts'

const now = Date.parse('2026-10-16T10:00:00Z')
const failed: Report = {
  status: 'unhealthy',
  checkedAt: new Date(now).toISOString(),
  latest: 'abc1234',
  checks: [{ name: 'API health', ok: false, detail: 'HTTP 503' }],
}
const recovered: Report = {
  ...failed,
  status: 'healthy',
  checks: [{ name: 'API health', ok: true, detail: 'HTTP 200' }],
}
const webhook = 'https://hooks.slack.com/services/test/only/fixture'

function incidentApi() {
  const issue = {
    number: 42,
    body: '',
    html_url: 'https://github.com/example/repo/issues/42',
    user: { login: 'github-actions[bot]' },
  }
  let open = false
  const request = vi.fn(
    async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input)
      const body = init?.body ? JSON.parse(String(init.body)) : {}
      if (url === webhook) {
        return new Response('ok')
      }
      if (!init?.method || init.method === 'GET') {
        return Response.json(open ? [issue] : [])
      }
      if (init.method === 'POST' && url.endsWith('/issues')) {
        open = true
        issue.body = body.body
      }
      if (init.method === 'PATCH') {
        issue.body = body.body ?? issue.body
        if (body.state === 'closed') {
          open = false
        }
      }
      return Response.json(issue)
    }
  )
  const options = {
    repository: 'example/repo',
    token: 'test-token',
    runUrl: 'https://github.com/example/repo/actions/runs/1',
    webhook,
    request: request as typeof fetch,
  }
  return { request, options, issue }
}

describe('Analytics incident lifecycle', () => {
  it('does not close an incident left by the retired CDN monitor', async () => {
    const request = vi.fn(async () =>
      Response.json([
        {
          number: 42,
          body: '<!-- eufemia-cdn-health:legacy -->',
          html_url: 'https://github.com/example/repo/issues/42',
          user: { login: 'github-actions[bot]' },
        },
      ])
    )
    await reportIncident({
      service: 'Analytics',
      report: recovered,
      repository: 'example/repo',
      token: 'test-token',
      runUrl: 'https://github.com/example/repo/actions/runs/1',
      request: request as typeof fetch,
    })
    expect(request).toHaveBeenCalledOnce()
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('/issues?state=open'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('creates one incident, stays quiet for the same failure, and sends recovery before closing', async () => {
    const { request, options } = incidentApi()
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: failed,
    })
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: failed,
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(1)
    expect(
      request.mock.calls.filter(
        ([url, init]) =>
          String(url).endsWith('/issues') && init?.method === 'POST'
      )
    ).toHaveLength(1)
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: { ...failed, status: 'pending' },
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(1)
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: recovered,
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(2)
    expect(request.mock.calls.at(-1)?.[1]?.body).toContain('closed')
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: recovered,
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(2)
  })

  it('notifies when an open incident changes', async () => {
    const { request, options } = incidentApi()
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: failed,
    })
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: {
        ...failed,
        checks: [
          ...failed.checks,
          { name: 'dashboard', ok: false, detail: 'HTTP 503' },
        ],
      },
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(2)
    expect(
      request.mock.calls.some(([url]) => String(url).endsWith('/comments'))
    ).toBe(true)
  })

  it('retries notification on the next run after a Slack failure without exposing the secret', async () => {
    const { request, options, issue } = incidentApi()
    const actual = options.request
    options.request = vi.fn(async (input, init) => {
      if (input === webhook) {
        throw new Error('Connection failed: ' + webhook)
      }
      return actual(input, init)
    }) as typeof fetch
    await expect(
      reportIncident({ service: 'Analytics', ...options, report: failed })
    ).rejects.toThrow('Slack incident notification could not be delivered')
    expect(issue.body).toContain('health:new')
    await reportIncident({
      service: 'Analytics',
      ...options,
      request: actual,
      report: failed,
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(1)
    expect(issue.body).not.toContain('health:new')
  })

  it('keeps an incident open when recovery notification fails', async () => {
    const { options, issue } = incidentApi()
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: failed,
    })
    const request = vi.fn(async (input, init) =>
      input === webhook
        ? new Response('', { status: 500 })
        : options.request(input, init)
    ) as typeof fetch
    await expect(
      reportIncident({
        service: 'Analytics',
        ...options,
        request,
        report: recovered,
      })
    ).rejects.toThrow('notification could not be delivered')
    expect(issue.body).toContain('unhealthy')
  })

  it('records an incident even when the configured webhook is invalid', async () => {
    const { options, issue } = incidentApi()
    await expect(
      reportIncident({
        service: 'Analytics',
        ...options,
        webhook: 'https://example.com/webhook',
        report: failed,
      })
    ).rejects.toThrow('Slack incoming webhook URL')
    expect(issue.body).toContain('unhealthy')
    expect(issue.body).toContain('health:new')
  })

  it('does not send the GitHub token to Slack', async () => {
    const { options, request } = incidentApi()
    await reportIncident({
      service: 'Analytics',
      ...options,
      report: failed,
    })
    const call = request.mock.calls.find(([url]) => url === webhook)
    expect(call?.[1]?.headers).toEqual({
      'Content-Type': 'application/json',
    })
    expect(call?.[1]?.body).not.toContain(options.token)
  })

  it('works with GitHub issues alone', async () => {
    const { options, request } = incidentApi()
    await reportIncident({
      service: 'Analytics',
      ...options,
      webhook: undefined,
      report: failed,
    })
    expect(request.mock.calls.some(([url]) => url === webhook)).toBe(false)
    expect(request.mock.calls.at(-1)?.[1]?.body).toContain('unhealthy')
  })
})
