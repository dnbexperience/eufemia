import { execFile } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'

it.each([
  ['CDN', '../../assets/check-cdn.ts', 'cdn-health-report.json'],
  ['MCP', '../../mcp-lambda/src/check-http.ts', 'mcp-health-report.json'],
])(
  'saves a fresh %s diagnostic report when checking throws',
  async (service, script, file) => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'diagnostic-cli-'))
    try {
      const preload = path.join(root, 'fixture.mjs')
      await writeFile(
        preload,
        "Date.now = () => { throw new Error('sensitive exception details') }"
      )
      await writeFile(
        path.join(root, file),
        JSON.stringify({ status: 'healthy' })
      )
      const result = await promisify(execFile)(
        process.execPath,
        [
          '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
          '--import',
          preload,
          path.resolve(import.meta.dirname, script),
        ],
        {
          cwd: root,
          env: {
            ...process.env,
            GITHUB_STEP_SUMMARY: path.join(root, 'summary.md'),
          },
        }
      ).then(
        () => {
          throw new Error('Expected an unhealthy exit')
        },
        (error) =>
          error as { code: number; stdout: string; stderr: string }
      )
      expect(result.code).toBe(1)
      const report = JSON.parse(
        await readFile(path.join(root, file), 'utf8')
      )
      expect(report.status).toBe('unhealthy')
      expect(report.checks).toEqual([
        expect.objectContaining({ name: 'monitor', ok: false }),
      ])
      expect(result.stdout).toContain(service + ' status: unhealthy')
      expect(
        await readFile(path.join(root, 'summary.md'), 'utf8')
      ).toContain('FAIL monitor')
      expect(
        result.stdout + result.stderr + JSON.stringify(report)
      ).not.toContain('sensitive exception details')
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  }
)
