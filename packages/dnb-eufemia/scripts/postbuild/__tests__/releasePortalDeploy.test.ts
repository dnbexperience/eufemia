import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { load } from 'js-yaml'

type Step = {
  id?: string
  name?: string
  uses?: string
  run?: string
  env?: Record<string, string>
  with?: Record<string, string | number>
}
type Job = {
  needs?: string | string[]
  outputs?: Record<string, string>
  permissions?: Record<string, string>
  steps: Step[]
}

const packageRoot = path.resolve(__dirname, '../../..')
const { jobs } = load(
  readFileSync(
    path.resolve(packageRoot, '../../.github/workflows/release.yml'),
    'utf8'
  )
) as { jobs: Record<string, Job> }

const build = jobs.build
const deploy = jobs['deploy-portal']
const upload = build.steps.find((step) =>
  step.uses?.startsWith('actions/upload-pages-artifact@')
)
const deployStep = deploy.steps.find((step) =>
  step.uses?.startsWith('actions/deploy-pages@')
)
const check = deploy.steps.find(
  (step) => step.name === 'Check the portal artifact'
)

describe('portal deploy in release.yml', () => {
  it('names the Pages artifact per run attempt', () => {
    expect(upload?.with?.name).toBe(
      'github-pages-${{ github.run_attempt }}'
    )
    expect(build.outputs?.['pages-artifact']).toBe(
      'github-pages-${{ github.run_attempt }}'
    )
  })

  it('deploys the artifact the build job uploaded', () => {
    const linkCheckDownload = jobs['validate-portal-links'].steps.find(
      (step) => step.uses?.startsWith('actions/download-artifact@')
    )

    expect([deploy.needs].flat()).toContain('build')
    expect(deployStep?.with?.artifact_name).toBe(
      '${{ needs.build.outputs.pages-artifact }}'
    )
    expect(linkCheckDownload?.with?.name).toBe(
      '${{ needs.build.outputs.pages-artifact }}'
    )
  })

  it('checks the artifact ID before deploying', () => {
    expect(build.outputs?.['pages-artifact-id']).toBe(
      `\${{ steps.${upload?.id}.outputs.artifact_id }}`
    )
    expect(deploy.permissions?.actions).toBe('read')
    expect(check?.env).toMatchObject({
      ARTIFACT_NAME: '${{ needs.build.outputs.pages-artifact }}',
      ARTIFACT_ID: '${{ needs.build.outputs.pages-artifact-id }}',
    })
    expect(deploy.steps.indexOf(check)).toBeGreaterThanOrEqual(0)
    expect(deploy.steps.indexOf(check)).toBeLessThan(
      deploy.steps.indexOf(deployStep)
    )
  })

  it.each([
    { found: '456', recorded: '456', status: 0 },
    { found: '789', recorded: '456', status: 1 },
    { found: '456,789', recorded: '456', status: 1 },
    { found: '', recorded: '456', status: 1 },
    { found: '', recorded: '', status: 1 },
  ])(
    'exits $status when the run lists $found and the build recorded $recorded',
    ({ found, recorded, status }) => {
      const bin = mkdtempSync(path.join(tmpdir(), 'eufemia-pages-check-'))
      try {
        // Stands in for `gh api ... --jq`, which prints the joined IDs.
        writeFileSync(
          path.join(bin, 'gh'),
          '#!/bin/sh\nprintf "%s\\n" "$*" > "$GH_ARGS"\nprintf "%s\\n" "$FOUND"\n',
          { mode: 0o755 }
        )
        const result = spawnSync(
          'bash',
          [
            '--noprofile',
            '--norc',
            '-eo',
            'pipefail',
            '-c',
            check?.run ?? '',
          ],
          {
            encoding: 'utf8',
            env: {
              PATH: `${bin}:${process.env.PATH}`,
              GH_ARGS: path.join(bin, 'args'),
              FOUND: found,
              GITHUB_REPOSITORY: 'dnbexperience/eufemia',
              GITHUB_RUN_ID: '123',
              ARTIFACT_NAME: 'github-pages-2',
              ARTIFACT_ID: recorded,
            },
          }
        )

        expect(result.status).toBe(status)
        expect(readFileSync(path.join(bin, 'args'), 'utf8')).toContain(
          'api repos/dnbexperience/eufemia/actions/runs/123/artifacts?name=github-pages-2'
        )
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    }
  )
})
