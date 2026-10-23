import { execFile } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'

it('writes a fresh unhealthy diagnostic report without incident or Slack writes', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'mcp-monitor-cli-'))
  try {
    const preload = path.join(root, 'fixture.mjs')
    await writeFile(
      preload,
      `
      const originalTimeout = setTimeout
      globalThis.setTimeout = (callback, delay, ...args) => originalTimeout(callback, 0, ...args)
      globalThis.fetch = async (input, options) => {
        const url = new URL(input)
        if ((url.hostname === 'api.github.com' && (options?.method ?? 'GET') !== 'GET') || url.hostname === 'hooks.slack.com') {
          process.stdout.write('UNEXPECTED_WRITE')
          throw new Error('Diagnostics must not write incidents or Slack messages')
        }
        return new Response('', { status: 503 })
      }
    `
    )
    await writeFile(
      path.join(root, 'mcp-health-report.json'),
      JSON.stringify({ status: 'healthy', checks: [] })
    )
    const run = promisify(execFile)
    const result = await run(
      process.execPath,
      [
        '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
        '--import',
        preload,
        path.resolve(import.meta.dirname, '../check-http.ts'),
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
        },
      }
    ).then(
      () => {
        throw new Error('Expected failure exit')
      },
      (error) => error as { code: number; stdout: string }
    )
    expect(result.code).toBe(1)
    expect(result.stdout).not.toContain('UNEXPECTED_WRITE')
    const report = JSON.parse(
      await readFile(path.join(root, 'mcp-health-report.json'), 'utf8')
    )
    expect(report.status).toBe('unhealthy')
    expect(
      report.checks.some(
        (check: { name: string }) => check.name === 'HTTP health'
      )
    ).toBe(true)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
