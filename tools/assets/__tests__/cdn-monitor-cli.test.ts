import { execFile } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'

it('reports a failed live check and exits nonzero without reading a stale report', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cdn-monitor-cli-'))
  try {
    const preload = path.join(root, 'fixture.mjs')
    await writeFile(
      preload,
      `
      const originalTimeout = setTimeout
      globalThis.setTimeout = (callback, delay, ...args) => originalTimeout(callback, 0, ...args)
      globalThis.fetch = async (input, options) => {
        const url = new URL(input)
        if (url.hostname === 'api.github.com') {
          if (options.method === 'GET') return Response.json([])
          const body = JSON.parse(options.body)
          if (options.method === 'POST') {
            if (body.title !== 'Eufemia CDN incident' || !body.body.includes('unhealthy')) throw new Error('Missing incident')
            process.stdout.write('INCIDENT_CREATED')
            return Response.json({ number: 42, html_url: 'https://github.com/example/repo/issues/42' })
          }
          return Response.json({})
        }
        return new Response('', { status: 503 })
      }
    `
    )
    await writeFile(
      path.join(root, 'cdn-health-report.json'),
      JSON.stringify({ status: 'healthy', checks: [] })
    )
    const run = promisify(execFile)
    const result = await run(
      process.execPath,
      [
        '--import',
        preload,
        path.resolve(import.meta.dirname, '../alert-cdn.ts'),
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          GH_TOKEN: 'fixture',
          GITHUB_REPOSITORY: 'example/repo',
          GITHUB_SERVER_URL: 'https://github.com',
          GITHUB_RUN_ID: '1',
          GITHUB_STEP_SUMMARY: '',
          CDN_ALERT_WEBHOOK: '',
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
      await readFile(path.join(root, 'cdn-health-report.json'), 'utf8')
    )
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks.some(
        (check: { name: string }) => check.name === 'npm latest'
      )
    ).toBe(true)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
