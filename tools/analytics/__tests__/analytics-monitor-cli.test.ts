import { execFile } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'

it('reports a failed deploy, exits nonzero and overwrites a stale report', async () => {
  const root = await mkdtemp(
    path.join(os.tmpdir(), 'analytics-monitor-cli-')
  )
  try {
    const preload = path.join(root, 'fixture.mjs')
    await writeFile(
      preload,
      `
      const originalTimeout = setTimeout
      globalThis.setTimeout = (callback, delay, ...args) => originalTimeout(callback, 0, ...args)
      const sha = '4c80f17a312a194efdb67e146c6a8b0a5f0ca045'
      globalThis.fetch = async (input, options) => {
        const url = new URL(input)
        const auth = new Headers(options.headers).get('Authorization')
        if (url.hostname === 'api.dnb.ghe.com') {
          if (auth !== 'Bearer ghe-fixture') throw new Error('Wrong GHE token')
          return Response.json({ workflow_runs: [{
            status: 'completed',
            conclusion: 'failure',
            created_at: new Date().toISOString(),
            display_title: 'Deploy from main (4c80f17)',
          }] })
        }
        if (url.hostname === 'api.github.com') {
          if (auth !== 'Bearer github-fixture') throw new Error('Wrong GitHub token')
          if (url.pathname.includes('/actions/workflows/')) {
            return Response.json({ workflow_runs: [{
              event: 'push',
              status: 'completed',
              conclusion: 'success',
              head_repository: { full_name: 'dnbexperience/eufemia' },
              head_sha: sha,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }] })
          }
          if (options.method === 'GET') return Response.json([])
          const body = JSON.parse(options.body)
          if (options.method === 'POST') {
            if (body.title !== 'Eufemia Analytics incident') throw new Error('Missing incident')
            process.stdout.write('INCIDENT_CREATED')
            return Response.json({ number: 42, html_url: 'https://github.com/example/repo/issues/42' })
          }
          return Response.json({})
        }
        if (auth) throw new Error('Token sent to a public endpoint')
        if (url.pathname === '/analytics/healthz') return Response.json({ status: 'ok' })
        if (url.pathname === '/') {
          return new Response('<title>Eufemia Analytics</title><script src="/assets/index.js"></script>', { headers: { 'Content-Type': 'text/html' } })
        }
        if (url.pathname === '/assets/index.js') {
          return new Response('export {}', { headers: { 'Content-Type': 'text/javascript' } })
        }
        throw new Error('Unexpected request')
      }
    `
    )
    await writeFile(
      path.join(root, 'analytics-health-report.json'),
      JSON.stringify({ status: 'healthy', checks: [] })
    )
    const run = promisify(execFile)
    const result = await run(
      process.execPath,
      [
        '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
        '--import',
        preload,
        path.resolve(
          import.meta.dirname,
          '../src/monitor/alert-analytics.ts'
        ),
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          GH_TOKEN: 'github-fixture',
          GHE_TOKEN: 'ghe-fixture',
          GHE_REPO: 'owner/deploy-repo',
          GITHUB_REPOSITORY: 'example/repo',
          GITHUB_SERVER_URL: 'https://github.com',
          GITHUB_RUN_ID: '1',
          GITHUB_STEP_SUMMARY: '',
          ANALYTICS_ALERT_WEBHOOK: '',
        },
      }
    ).then(
      () => {
        throw new Error('Expected failure exit')
      },
      (error) => error as { code: number; stdout: string }
    )

    expect(result.code).toBe(1)
    expect(result.stdout).toContain('INCIDENT_CREATED')
    const report = JSON.parse(
      await readFile(
        path.join(root, 'analytics-health-report.json'),
        'utf8'
      )
    )
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks
        .filter((check: { ok: boolean }) => !check.ok)
        .map((check: { name: string }) => check.name)
    ).toEqual(['GHE deploy run'])
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
