import { createHash } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { checkCdn } from '../check-cdn.ts'
import { alertCdn } from '../alert-cdn.ts'
import { reportIncident } from '../../monitoring/report-incident.ts'
import type { Report } from '../check-cdn.ts'

const now = Date.parse('2026-10-16T10:00:00Z')
const font = Buffer.from('774f463200010203', 'hex')
const image = Buffer.from('89504e470d0a1a0a010203', 'hex')
const paths = [
  'fonts/dnb/DNB-Regular.woff2',
  'fonts/dnb/DNB-Bold.woff2',
  'images/dnb/dnb-logo.png',
]
const manifest = paths
  .map(
    (path) =>
      createHash('sha256')
        .update(path.endsWith('.png') ? image : font)
        .digest('hex') +
      '  assets/' +
      path
  )
  .join('\n')

function fixture({
  age = 120,
  change = (_url: string): Response | undefined => undefined,
} = {}) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = String(input)
    const changed = change(url)
    if (changed) {
      return changed
    }
    if (new URL(url).hostname === 'registry.npmjs.org') {
      return Response.json({
        'dist-tags': { latest: '11.15.2' },
        time: {
          '11.15.1': new Date(now - 24 * 60 * 60_000).toISOString(),
          '11.15.2': new Date(now - age * 60_000).toISOString(),
          '12.0.0-next.1': new Date(now).toISOString(),
        },
      })
    }
    if (url.endsWith('.manifest.sha256')) {
      return new Response(manifest)
    }
    return new Response(url.endsWith('.png') ? image : font, {
      headers: {
        'Content-Type': url.endsWith('.png') ? 'image/png' : 'font/woff2',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }) as unknown as typeof fetch
}

const sleep = async () => {}

describe('production CDN checks', () => {
  it('checks stable URLs and npm latest immutable assets against their manifest', async () => {
    const request = fixture()
    const report = await checkCdn({ fetch: request, now, sleep })
    expect(report.status).toBe('healthy')
    expect(report.latest).toBe('11.15.2')
    expect(report.checks).toHaveLength(8)
    expect(report.checks.every((check) => check.ok)).toBe(true)
    expect(
      vi
        .mocked(request)
        .mock.calls.every(
          ([, options]) => options?.redirect === 'error' && options.signal
        )
    ).toBe(true)
  })

  it('fails when the latest version has not deployed after one hour', async () => {
    const report = await checkCdn({
      fetch: fixture({
        change: (url) =>
          url.includes('/v11.15.2/')
            ? new Response('', { status: 403 })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.filter((check) => !check.ok)).toHaveLength(4)
  })

  it('allows a new deployment to settle and verifies the previous release', async () => {
    const report = await checkCdn({
      fetch: fixture({
        age: 10,
        change: (url) =>
          url.includes('/v11.15.2/')
            ? new Response('', { status: 404 })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('pending')
    expect(
      report.checks.some(
        (check) => check.name.startsWith('v11.15.1/') && check.ok
      )
    ).toBe(true)
  })

  it.each(['stable', 'previous'])(
    'does not hide a %s outage during a new deployment',
    async (target) => {
      const report = await checkCdn({
        fetch: fixture({
          age: 10,
          change: (url) =>
            url.includes('/v11.15.2/') ||
            (target === 'previous'
              ? url.includes('/v11.15.1/')
              : url.includes('/fonts/') && !url.includes('/v11.'))
              ? new Response('', { status: 503 })
              : undefined,
        }),
        now,
        sleep,
      })
      expect(report.status).toBe('unhealthy')
    }
  )

  it('still checks CDN availability when npm is unavailable', async () => {
    const report = await checkCdn({
      fetch: fixture({
        change: (url) =>
          new URL(url).hostname === 'registry.npmjs.org'
            ? new Response('', { status: 503 })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.filter((check) => check.ok)).toHaveLength(3)
    expect(report.checks.find((check) => !check.ok)?.name).toBe(
      'npm latest'
    )
  })

  it.each([
    [
      'HTML with status 200',
      () =>
        new Response('<html>Error</html>', {
          headers: { 'Content-Type': 'text/html' },
        }),
    ],
    [
      'missing CORS',
      () =>
        new Response(font, { headers: { 'Content-Type': 'font/woff2' } }),
    ],
    [
      'corrupt content',
      () =>
        new Response(Buffer.concat([font, Buffer.from('corrupt')]), {
          headers: {
            'Content-Type': 'font/woff2',
            'Access-Control-Allow-Origin': '*',
          },
        }),
    ],
  ])('rejects %s', async (_name, response) => {
    const report = await checkCdn({
      fetch: fixture({
        change: (url) =>
          url.endsWith('DNB-Regular.woff2') ? response() : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
  })

  it('rejects a manifest missing a monitored asset', async () => {
    const report = await checkCdn({
      fetch: fixture({
        change: (url) =>
          url.endsWith('.manifest.sha256')
            ? new Response(manifest.split('\n')[0])
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.find((check) => !check.ok)?.detail).toContain(
      'missing monitored assets'
    )
  })

  it('detects stale stable aliases after the cache window', async () => {
    const report = await checkCdn({
      fetch: fixture({
        age: 26 * 60,
        change: (url) =>
          url.endsWith('DNB-Regular.woff2') && !url.includes('/v11.')
            ? new Response(Buffer.concat([font, Buffer.from('old')]), {
                headers: {
                  'Content-Type': 'font/woff2',
                  'Access-Control-Allow-Origin': '*',
                },
              })
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.checks.find((check) => !check.ok)?.name).toBe(
      'stable-manifest/fonts/dnb/DNB-Regular.woff2'
    )
  })

  it('does not suppress corrupt assets during the deployment grace period', async () => {
    const report = await checkCdn({
      fetch: fixture({
        age: 10,
        change: (url) =>
          url.includes('/v11.15.2/') && url.endsWith('DNB-Regular.woff2')
            ? new Response('<html>Error</html>')
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks.find((check) => !check.ok)?.pending
    ).toBeUndefined()
  })

  it('does not hide timeouts during the deployment grace period', async () => {
    const request = fixture({ age: 10 })
    const report = await checkCdn({
      fetch: async (input, options) => {
        if (String(input).includes('/v11.15.2/')) {
          throw new DOMException('Request timed out', 'TimeoutError')
        }
        return request(input, options)
      },
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
  })

  it.each([
    { 'dist-tags': { latest: '12.0.0-next.1' } },
    { 'dist-tags': { latest: '11.15.2' }, time: { '11.15.2': 'invalid' } },
    {
      'dist-tags': { latest: '11.15.2' },
      time: { '11.15.2': new Date(now + 60 * 60_000).toISOString() },
    },
  ])('rejects invalid registry metadata', async (metadata) => {
    const report = await checkCdn({
      fetch: fixture({
        change: (url) =>
          new URL(url).hostname === 'registry.npmjs.org'
            ? Response.json(metadata)
            : undefined,
      }),
      now,
      sleep,
    })
    expect(report.status).toBe('unhealthy')
    expect(report.latest).toBeUndefined()
  })

  it('retries a transient network error', async () => {
    const request = vi
      .fn(fixture())
      .mockRejectedValueOnce(new Error('Network unavailable'))
    const report = await checkCdn({ fetch: request, now, sleep })
    expect(report.status).toBe('healthy')
    expect(request).toHaveBeenCalledTimes(9)
  })
})

const failed: Report = {
  status: 'unhealthy',
  checkedAt: new Date(now).toISOString(),
  latest: '11.15.2',
  checks: [{ name: 'stable/font', ok: false, detail: 'HTTP 503' }],
}
const recovered: Report = {
  ...failed,
  status: 'healthy',
  checks: [{ name: 'stable/font', ok: true, detail: 'HTTP 200' }],
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

describe('CDN incident lifecycle', () => {
  it('creates one incident, stays quiet for the same failure, and sends recovery before closing', async () => {
    const { request, options } = incidentApi()
    await alertCdn({ ...options, report: failed })
    await alertCdn({ ...options, report: failed })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(1)
    expect(
      request.mock.calls.filter(
        ([url, init]) =>
          String(url).endsWith('/issues') && init?.method === 'POST'
      )
    ).toHaveLength(1)
    await alertCdn({
      ...options,
      report: { ...failed, status: 'pending' },
    })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(1)
    await alertCdn({ ...options, report: recovered })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(2)
    expect(request.mock.calls.at(-1)?.[1]?.body).toContain('closed')
    await alertCdn({ ...options, report: recovered })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(2)
  })

  it('notifies when an open incident changes', async () => {
    const { request, options } = incidentApi()
    await alertCdn({ ...options, report: failed })
    await alertCdn({
      ...options,
      report: {
        ...failed,
        checks: [
          ...failed.checks,
          { name: 'npm latest', ok: false, detail: 'HTTP 503' },
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
    await expect(alertCdn({ ...options, report: failed })).rejects.toThrow(
      'Slack incident notification could not be delivered'
    )
    expect(issue.body).toContain('health:new')
    await alertCdn({ ...options, request: actual, report: failed })
    expect(
      request.mock.calls.filter(([url]) => url === webhook)
    ).toHaveLength(1)
    expect(issue.body).not.toContain('health:new')
  })

  it('keeps an incident open when recovery notification fails', async () => {
    const { options, issue } = incidentApi()
    await alertCdn({ ...options, report: failed })
    const request = vi.fn(async (input, init) =>
      input === webhook
        ? new Response('', { status: 500 })
        : options.request(input, init)
    ) as typeof fetch
    await expect(
      alertCdn({ ...options, request, report: recovered })
    ).rejects.toThrow('notification could not be delivered')
    expect(issue.body).toContain('unhealthy')
  })

  it('records an incident even when the configured webhook is invalid', async () => {
    const { options, issue } = incidentApi()
    await expect(
      alertCdn({
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
    await alertCdn({ ...options, report: failed })
    const call = request.mock.calls.find(([url]) => url === webhook)
    expect(call?.[1]?.headers).toEqual({
      'Content-Type': 'application/json',
    })
    expect(call?.[1]?.body).not.toContain(options.token)
  })

  it('works with GitHub issues alone', async () => {
    const { options, request } = incidentApi()
    await alertCdn({ ...options, webhook: undefined, report: failed })
    expect(request.mock.calls.some(([url]) => url === webhook)).toBe(false)
    expect(request.mock.calls.at(-1)?.[1]?.body).toContain('unhealthy')
  })
})

describe('independent service incidents', () => {
  it('keeps MCP recovery from closing a CDN incident', async () => {
    const { options, issue, request } = incidentApi()
    await alertCdn({ ...options, report: failed })
    request.mockClear()
    await reportIncident({ ...options, service: 'MCP', report: recovered })
    expect(request.mock.calls).toHaveLength(1)
    expect(issue.body).toContain('eufemia-cdn-health:')
  })

  it('reports MCP failures and recovery using the shared lifecycle', async () => {
    const { options, issue, request } = incidentApi()
    await reportIncident({ ...options, service: 'MCP', report: failed })
    expect(issue.body).toContain('eufemia-mcp-health:')
    expect(
      request.mock.calls.find(([url]) => url === webhook)?.[1]?.body
    ).toContain('Eufemia MCP checks failed')
    await reportIncident({ ...options, service: 'MCP', report: recovered })
    expect(request.mock.calls.at(-1)?.[1]?.body).toContain('closed')
  })
})
