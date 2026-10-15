import { afterEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'

let fixtureDirectory: string | undefined
afterEach(() => {
  if (fixtureDirectory) {
    fs.rmSync(fixtureDirectory, { recursive: true, force: true })
    fixtureDirectory = undefined
  }
})

const workflow = fs.readFileSync(
  path.resolve(
    __dirname,
    '../../../../../.github/workflows/portal-accessibility-and-duplicate-ids.yml'
  ),
  'utf8'
)
const sitemapStep = workflow.split(
  '      - name: Download production sitemap'
)[1]
const script = sitemapStep
  .split('          script: |\n')[1]
  .split('\n      - name:')[0]
  .split('\n')
  .map((line) => line.slice(12))
  .join('\n')
const AsyncFunction = Object.getPrototypeOf(
  async function () {}
).constructor
const sitemap = {
  schemaVersion: 1,
  pages: ['/', '/uilib/components/button/'],
}

describe('Portal accessibility sitemap preparation', () => {
  it('uses the deployed sitemap without rebuilding the Portal', async () => {
    const { core, files } = await prepareSitemap(200, sitemap)

    expect(files.writeFileSync).toHaveBeenCalledWith(
      'packages/dnb-design-system-portal/public/sitemap.json',
      expect.any(String)
    )
    expect(core.setOutput).not.toHaveBeenCalledWith(
      'deployment',
      expect.anything()
    )
  })

  it('selects the last successful deployment when no sitemap is published', async () => {
    const { core, files } = await prepareSitemap(404)

    expect(core.setOutput).toHaveBeenCalledWith(
      'deployment',
      'deployed-sha'
    )
    expect(files.writeFileSync).not.toHaveBeenCalled()
  })

  it('does not hide production errors behind a local build', async () => {
    await expect(prepareSitemap(503)).rejects.toThrow('503')
  })

  it('rejects an empty sitemap instead of reporting a clean scan', async () => {
    await expect(
      prepareSitemap(200, { schemaVersion: 1, pages: [] })
    ).rejects.toThrow('non-empty pages array')
  })

  it('wires the conditional build and scanner to the prepared sitemap', () => {
    expect(workflow).toContain(
      "if: steps.sitemap.outputs.deployment != ''"
    )
    expect(workflow).toContain('--sitemap public/sitemap.json')
  })

  it('requires a successful deployment when no sitemap is published', async () => {
    await expect(prepareSitemap(404, undefined, false)).rejects.toThrow(
      'No successful production deployment'
    )
  })

  it('generates paths from deployed docs using existing route rules', () => {
    fixtureDirectory = fs.mkdtempSync(
      path.join(os.tmpdir(), 'portal-deployed-sitemap-')
    )
    const docs = path.join(fixtureDirectory, 'docs')
    fs.mkdirSync(path.join(docs, 'button'), { recursive: true })
    fs.writeFileSync(
      path.join(docs, 'button.mdx'),
      '---\ntitle: Button\n---\n'
    )
    fs.writeFileSync(
      path.join(docs, 'button/info.mdx'),
      '---\nshowTabs: true\n---\n'
    )
    fs.writeFileSync(
      path.join(docs, 'button/demos.mdx'),
      '---\nshowTabs: true\n---\n'
    )
    fs.writeFileSync(
      path.join(docs, 'draft.mdx'),
      '---\ndraft: true\n---\n'
    )
    fs.writeFileSync(
      path.join(docs, 'Helper.tsx'),
      'export default () => null'
    )
    const output = path.join(fixtureDirectory, 'sitemap.json')

    execFileSync(
      process.execPath,
      [
        path.resolve(
          __dirname,
          '../../prod/generate-accessibility-sitemap.mts'
        ),
        docs,
        output,
      ],
      { cwd: path.resolve(__dirname, '../../..'), timeout: 20000 }
    )

    expect(JSON.parse(fs.readFileSync(output, 'utf8')).pages).toEqual([
      '/',
      '/500/',
      '/button/',
      '/button/demos/',
    ])
  }, 20000)
})

async function prepareSitemap(
  status: number,
  body: unknown = undefined,
  successful = true
) {
  const files = { mkdirSync: vi.fn(), writeFileSync: vi.fn() }
  const core = { setOutput: vi.fn(), notice: vi.fn() }
  const fetch = vi.fn(async () => ({
    status,
    statusText: 'Response',
    ok: status >= 200 && status < 300,
    json: async () => body,
  }))

  const github = {
    paginate: vi.fn(async () => [
      { id: 2, sha: 'failed-sha' },
      { id: 1, sha: 'deployed-sha' },
    ]),
    rest: {
      repos: {
        listDeployments: vi.fn(),
        listDeploymentStatuses: vi.fn(async ({ deployment_id }) => ({
          data: [
            {
              state:
                successful && deployment_id === 1 ? 'success' : 'failure',
            },
          ],
        })),
      },
    },
  }

  await new AsyncFunction(
    'fetch',
    'require',
    'core',
    'github',
    'context',
    script
  )(fetch, () => files, core, github, {
    repo: { owner: 'owner', repo: 'repo' },
  })

  return { core, files }
}
