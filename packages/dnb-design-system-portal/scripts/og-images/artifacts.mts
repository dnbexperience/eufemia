import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, mkdtemp, cp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const exec = promisify(execFile)
const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
const portal = path.resolve(scriptRoot, '../..')

type Run = {
  id: number
  path: string
  head_branch: string
  head_sha: string
  conclusion: string
  event: string
}
export function isCatalogueRun(run: Run, branch: string) {
  return (
    run.path === '.github/workflows/portal-og-images.yml' &&
    run.head_branch === branch &&
    run.conclusion === 'success' &&
    ['schedule', 'workflow_dispatch'].includes(run.event)
  )
}

async function api<T>(endpoint: string): Promise<T> {
  const { stdout } = await exec('gh', ['api', endpoint], {
    maxBuffer: 8 * 1024 * 1024,
  })
  return JSON.parse(stdout)
}

async function download(runId: number, name: string, destination: string) {
  const temporary = await mkdtemp(
    path.join(tmpdir(), 'eufemia-og-artifact-')
  )
  try {
    await exec('gh', [
      'run',
      'download',
      String(runId),
      '--repo',
      process.env.GITHUB_REPOSITORY || 'dnbexperience/eufemia',
      '--name',
      name,
      '--dir',
      temporary,
    ])
    await mkdir(destination, { recursive: true })
    await cp(temporary, destination, { recursive: true })
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
}

export async function restoreSite(destination: string) {
  const repository =
    process.env.GITHUB_REPOSITORY || 'dnbexperience/eufemia'
  const marker = await fetch('https://eufemia.dnb.no/og-deployment.json', {
    signal: AbortSignal.timeout(20000),
  })
  if (!marker.ok) {
    throw new Error(
      'The deployed Portal has no refresh snapshot. Deploy the Portal before publishing OG updates.'
    )
  }
  const reference = (await marker.json()) as { runId: unknown }
  if (
    typeof reference.runId !== 'number' ||
    !Number.isSafeInteger(reference.runId) ||
    reference.runId <= 0
  ) {
    throw new Error('Invalid Portal snapshot reference')
  }
  const runId = Number(reference.runId)
  const run = await api<Run>(
    'repos/' + repository + '/actions/runs/' + runId
  )
  const { default_branch: branch } = await api<{ default_branch: string }>(
    'repos/' + repository
  )
  const publishedRelease =
    run.path === '.github/workflows/release.yml' &&
    run.head_branch === 'release' &&
    run.event === 'push'
  if (
    !(publishedRelease && run.conclusion === 'success') &&
    !isCatalogueRun(run, branch)
  ) {
    throw new Error('Portal snapshot workflow is not complete')
  }
  await download(runId, 'portal-og-site', destination)
  return runId
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const command = process.argv[2]
  if (command === 'site') {
    const runId = await restoreSite(
      path.resolve(
        process.env.OG_SITE_OUTPUT || path.join(portal, 'public')
      )
    )
    if (process.env.GITHUB_OUTPUT) {
      await writeFile(
        process.env.GITHUB_OUTPUT,
        'source-run-id=' + runId + '\n',
        { flag: 'a' }
      )
    }
  } else {
    throw new Error('Expected site')
  }
}
