import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// The browser integration fixtures run in Node without the Portal's jsdom setup.
// eslint-disable-next-line vitest/no-import-node-test
import test from 'node:test'
import { build } from 'vite'
import {
  assertCompleteReport,
  hydrationIssues,
  isHydrationError,
  readSitemap,
  type HydrationReport,
} from '../portal-hydration.ts'
import {
  reportPortalHydration,
  githubIssueApi,
  type IssueApi,
} from '../report-portal-hydration.ts'
import { scanPortalHydration } from '../scan-portal-hydration.ts'

function fixtureReport(): HydrationReport {
  return {
    schemaVersion: 1,
    baseUrl: 'https://eufemia.dnb.no',
    scannedAt: new Date().toISOString(),
    expectedVisits: 2,
    complete: true,
    visits: (['light', 'dark'] as const).map((colorScheme) => ({
      page: '/uilib/components/button/demos/',
      colorScheme,
      findings: [
        {
          message:
            'Minified React error #418; visit https://react.dev/errors/418',
          componentStack: 'at Example (<anonymous>)',
        },
      ],
    })),
  }
}

function mockIssues() {
  const issues: {
    number: number
    body: string
    title: string
    state: string
    user: { login: string }
  }[] = []
  const calls: string[] = []
  const api: IssueApi = {
    async list() {
      calls.push('list')
      return issues
    },
    async create(issue) {
      calls.push('create')
      issues.push({
        ...issue,
        number: issues.length + 1,
        state: 'open',
        user: { login: 'github-actions[bot]' },
      })
    },
    async update(number, changes) {
      calls.push('update')
      const issue = issues.find((issue) => issue.number === number)
      assert.ok(issue)
      Object.assign(issue, changes)
    },
  }
  return { issues, calls, api }
}

test('validates the deployed page list and rejects external or ambiguous paths', () => {
  assert.deepEqual(
    readSitemap({ pages: ['/components/', '/', '/components/'] }),
    ['/', '/components/']
  )
  for (const pages of [
    [],
    ['https://example.org/'],
    ['//example.org/'],
    ['/a?b'],
    ['/a#b'],
    ['/a b'],
    ['/a\\b'],
    ['/../a/'],
    [null],
  ]) {
    assert.throws(() => readSitemap({ pages }))
  }
})

test('classifies React errors without matching ordinary console messages', () => {
  for (const code of [418, 419, 421, 422, 423, 424, 425]) {
    assert.equal(
      isHydrationError('Minified React error #' + code + ';'),
      true
    )
  }
  assert.equal(
    isHydrationError('Failed to load resource: HTTP 404'),
    false
  )
  assert.equal(isHydrationError('Documentation about hydration'), false)
})

test('combines themes and repeated messages into one escaped issue per page', () => {
  const report = fixtureReport()
  report.visits[0].findings.push({
    message: 'Hydration failed <script>alert(1)</script>',
  })
  const issues = hydrationIssues(report)
  assert.equal(issues.length, 1)
  assert.match(issues[0].body, /dark and light/)
  assert.match(issues[0].body, /&lt;script&gt;/)
  assert.equal(
    (issues[0].body.match(/Minified React error/g) || []).length,
    1
  )
  assert.equal(
    issues[0].marker,
    hydrationIssues(fixtureReport())[0].marker
  )
})

test('creates, suppresses unchanged reports, updates changes, closes and reopens', async () => {
  const { api, issues, calls } = mockIssues()
  const report = fixtureReport()
  assert.deepEqual(
    await reportPortalHydration(report, api, 'https://github.com/run/1'),
    { created: 1, updated: 0, closed: 0 }
  )
  assert.deepEqual(
    await reportPortalHydration(report, api, 'https://github.com/run/2'),
    { created: 0, updated: 0, closed: 0 }
  )
  assert.equal(issues.length, 1)
  report.visits.forEach((visit) => {
    visit.findings[0].componentStack = 'at DifferentExample'
  })
  assert.equal(
    (await reportPortalHydration(report, api, 'https://github.com/run/3'))
      .updated,
    1
  )
  report.visits.forEach((visit) => {
    visit.findings = []
  })
  assert.equal(
    (await reportPortalHydration(report, api, 'https://github.com/run/4'))
      .closed,
    1
  )
  assert.equal(issues[0].state, 'closed')
  assert.equal(
    (
      await reportPortalHydration(
        fixtureReport(),
        api,
        'https://github.com/run/5'
      )
    ).updated,
    1
  )
  assert.equal(issues[0].state, 'open')
  assert.equal(calls.filter((call) => call === 'create').length, 1)
})

test('incomplete scans cannot read or change issues', async () => {
  for (const change of [
    (report: HydrationReport) => {
      report.complete = false
    },
    (report: HydrationReport) => {
      report.visits.pop()
    },
    (report: HydrationReport) => {
      report.visits[0].error = 'HTTP 429'
    },
    (report: HydrationReport) => {
      report.visits[1].colorScheme = 'light'
    },
    (report: HydrationReport) => {
      report.expectedVisits = 0
      report.visits = []
    },
  ]) {
    const { api, calls } = mockIssues()
    const report = fixtureReport()
    change(report)
    assert.throws(() => assertCompleteReport(report))
    await assert.rejects(
      reportPortalHydration(report, api, 'https://github.com/run/1')
    )
    assert.deepEqual(calls, [])
  }
})

test('leaves human-authored and unrelated issues untouched', async () => {
  const { api, issues } = mockIssues()
  const draft = hydrationIssues(fixtureReport())[0]
  issues.push({
    ...draft,
    number: 1,
    state: 'open',
    user: { login: 'maintainer' },
  })
  const clean = fixtureReport()
  clean.visits.forEach((visit) => {
    visit.findings = []
  })
  assert.equal(
    (await reportPortalHydration(clean, api, 'https://github.com/run/1'))
      .closed,
    0
  )
  assert.equal(issues[0].state, 'open')
})

test(
  'browser scanner detects real React errors, isolates visits, retries and rejects incomplete scans',
  { timeout: 120000 },
  async () => {
    const directory = await fs.mkdtemp(
      path.join(
        fileURLToPath(new URL('./', import.meta.url)),
        '.hydration-fixture-'
      )
    )
    const bundles: Record<string, string> = {}
    try {
      const entry = path.join(directory, 'entry.js')
      await fs.writeFile(
        entry,
        [
          "import {createElement} from 'react'",
          "import {hydrateRoot} from 'react-dom/client'",
          "const mismatch = location.pathname.includes('mismatch')",
          "hydrateRoot(document.getElementById('root'), createElement('p', null, mismatch ? 'client' : 'server'), {onRecoverableError(error, info) { console.group('React recoverable hydration error'); console.error(error); console.log(info.componentStack); console.groupEnd(); }})",
          "if (location.pathname.includes('runtime')) { setTimeout(() => { throw new Error('Demo crashed') }, 0) }",
          "if (!location.pathname.includes('not-ready')) { setTimeout(() => { document.documentElement.dataset.portalReady = 'true' }, 20) }",
        ].join('\n')
      )
      for (const mode of ['development', 'production']) {
        const result = await build({
          configFile: false,
          root: directory,
          logLevel: 'silent',
          define: { 'process.env.NODE_ENV': JSON.stringify(mode) },
          build: {
            write: false,
            minify: mode === 'production',
            lib: { entry, name: 'Fixture', formats: ['iife'] },
          },
        })
        const output = Array.isArray(result)
          ? result[0].output
          : 'output' in result
            ? result.output
            : []
        bundles[mode] = output
          .filter((item) => item.type === 'chunk')
          .map((item) => (item.type === 'chunk' ? item.code : ''))
          .join('\n')
      }
      const attempts = new Map<string, number>()
      const server = createServer((request, response) => {
        const url = new URL(request.url || '/', 'http://localhost')
        if (url.pathname === '/app.js') {
          response.setHeader('Content-Type', 'text/javascript')
          response.end(
            bundles[url.searchParams.get('mode') || 'production']
          )
          return
        }
        const count = (attempts.get(url.pathname) || 0) + 1
        attempts.set(url.pathname, count)
        if (url.pathname === '/rate-limit/' && count === 1) {
          response.writeHead(429, { 'Retry-After': '0' })
          response.end()
          return
        }
        if (url.pathname === '/http-error/') {
          response.writeHead(503)
          response.end()
          return
        }
        response.setHeader('Content-Type', 'text/html')
        const mode = url.pathname.includes('development')
          ? 'development'
          : 'production'
        response.end(
          '<!DOCTYPE html><html><body><div id="root"><p>server</p></div><script src="/app.js?mode=' +
            mode +
            '"></script></body></html>'
        )
      })
      await new Promise<void>((resolve) =>
        server.listen(0, '127.0.0.1', resolve)
      )
      const baseUrl =
        'http://127.0.0.1:' + (server.address() as { port: number }).port
      try {
        const report = await scanPortalHydration({
          baseUrl,
          pages: [
            '/clean/',
            '/development-mismatch/',
            '/production-mismatch/',
            '/rate-limit/',
          ],
          settleMs: 100,
          retryDelayMs: 1,
          timeoutMs: 2000,
          concurrency: 2,
        })
        assert.equal(report.complete, true)
        assert.equal(report.visits.length, 8)
        assert.equal(
          report.visits.filter((visit) => visit.findings.length).length,
          4
        )
        for (const visit of report.visits.filter(
          (visit) => visit.findings.length
        )) {
          assert.equal(visit.findings.length, 1)
          assert.match(visit.findings[0].componentStack || '', /at p/)
        }
        assert.ok((attempts.get('/rate-limit/') || 0) >= 3)
        const failed = await scanPortalHydration({
          baseUrl,
          pages: ['/http-error/', '/not-ready/', '/runtime/'],
          settleMs: 100,
          retryDelayMs: 1,
          timeoutMs: 200,
          concurrency: 2,
        })
        assert.equal(failed.complete, false)
        assert.equal(
          failed.visits.filter((visit) => visit.error).length,
          6
        )
        assert.throws(() => assertCompleteReport(failed))
      } finally {
        await new Promise<void>((resolve) => server.close(() => resolve()))
      }
    } finally {
      await fs.rm(directory, { recursive: true, force: true })
    }
  }
)

test('does not close an issue for a page absent from the current sitemap', async () => {
  const { api, issues } = mockIssues()
  await reportPortalHydration(
    fixtureReport(),
    api,
    'https://github.com/run/1'
  )
  const report = fixtureReport()
  report.visits.forEach((visit) => {
    visit.page = '/another-page/'
    visit.findings = []
  })
  assert.equal(
    (await reportPortalHydration(report, api, 'https://github.com/run/2'))
      .closed,
    0
  )
  assert.equal(issues[0].state, 'open')
})

test('asset hash changes do not repeatedly update issues', async () => {
  const { api } = mockIssues()
  const report = fixtureReport()
  report.visits.forEach((visit) => {
    visit.findings[0].componentStack =
      'at https://eufemia.dnb.no/assets/index-first.js:12:345'
  })
  await reportPortalHydration(report, api, 'https://github.com/run/1')
  report.visits.forEach((visit) => {
    visit.findings[0].componentStack =
      'at https://eufemia.dnb.no/assets/index-second.js:45:678'
  })
  assert.equal(
    (await reportPortalHydration(report, api, 'https://github.com/run/2'))
      .updated,
    0
  )
})

test('GitHub issue adapter paginates and uses bounded authenticated requests', async () => {
  const originalFetch = globalThis.fetch
  const requests: { url: string; init?: RequestInit }[] = []
  globalThis.fetch = (async (
    url: string | URL | Request,
    init?: RequestInit
  ) => {
    requests.push({ url: String(url), init })
    const payload =
      new URL(String(url)).searchParams.get('page') === '1'
        ? Array.from({ length: 100 }, (_, index) => ({
            number: index,
            body: '',
            state: 'open',
            pull_request: index === 0 ? {} : undefined,
          }))
        : new URL(String(url)).searchParams.get('page') === '2'
          ? [{ number: 101, body: '', state: 'open' }]
          : {}
    return new Response(JSON.stringify(payload), { status: 200 })
  }) as typeof fetch
  try {
    const api = githubIssueApi('dnbexperience/eufemia', 'test-token')
    assert.equal((await api.list()).length, 100)
    await api.create({ title: 'Finding', body: 'Details' })
    await api.update(42, { state: 'closed', state_reason: 'completed' })
    assert.equal(requests.length, 4)
    for (const request of requests) {
      assert.equal(new URL(request.url).origin, 'https://api.github.com')
      assert.equal(request.init?.redirect, 'error')
      assert.ok(request.init?.signal)
      assert.equal(
        (request.init?.headers as Record<string, string>).Authorization,
        'Bearer test-token'
      )
    }
    assert.equal(requests[2].init?.method, 'POST')
    assert.equal(requests[3].init?.method, 'PATCH')
    assert.equal(
      JSON.parse(requests[3].init?.body as string).state,
      'closed'
    )
    globalThis.fetch = (async () =>
      new Response('', { status: 403 })) as typeof fetch
    await assert.rejects(api.list(), /HTTP 403/)
    assert.throws(() =>
      githubIssueApi('https://example.com/', 'test-token')
    )
  } finally {
    globalThis.fetch = originalFetch
  }
})
