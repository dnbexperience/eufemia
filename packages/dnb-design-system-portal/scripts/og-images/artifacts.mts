import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, mkdtemp, cp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { realpathSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const exec = promisify(execFile)
const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
const portal = path.resolve(scriptRoot, '../..')

type Run = {
  id: number
  path: string
  head_branch: string
  head_sha: string
  status: string
  conclusion: string | null
  event: string
}
type Artifact = {
  name: string
  expired: boolean
  workflow_run?: { id: number }
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

async function download(
  repository: string,
  artifactId: number,
  destination: string
) {
  const temporary = await mkdtemp(
    path.join(tmpdir(), 'eufemia-og-artifact-')
  )
  try {
    const archive = path.join(temporary, 'snapshot.zip')
    const files = path.join(temporary, 'files')
    const { stdout } = await exec(
      'gh',
      ['api', `repos/${repository}/actions/artifacts/${artifactId}/zip`],
      { encoding: 'buffer', maxBuffer: 512 * 1024 * 1024 }
    )
    await writeFile(archive, stdout)
    await exec('unzip', ['-q', archive, '-d', files])
    await mkdir(destination, { recursive: true })
    await cp(files, destination, { recursive: true })
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
}

function isId(value: unknown): value is number {
  return (
    typeof value === 'number' && Number.isSafeInteger(value) && value > 0
  )
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
  const reference = (await marker.json()) as {
    runId: unknown
    artifactId?: unknown
  }
  if (!isId(reference.runId)) {
    throw new Error('Invalid Portal snapshot reference')
  }
  if (reference.artifactId === undefined) {
    throw new Error(
      'The deployed Portal does not name its snapshot artifact. Deploy the Portal before publishing OG updates.'
    )
  }
  if (!isId(reference.artifactId)) {
    throw new Error('Invalid Portal snapshot reference')
  }
  const { runId, artifactId } = reference
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
  // The marker shows that this run deployed the site, so a later failure in
  // the release run, such as the link check, does not affect the snapshot.
  if (
    !(publishedRelease && run.status === 'completed') &&
    !isCatalogueRun(run, branch)
  ) {
    throw new Error('Portal snapshot workflow is not complete')
  }
  const artifact = await api<Artifact>(
    'repos/' + repository + '/actions/artifacts/' + artifactId
  )
  if (
    artifact.name !== 'portal-og-site' ||
    artifact.workflow_run?.id !== runId
  ) {
    throw new Error(
      'The Portal snapshot artifact does not match the deployed run'
    )
  }
  if (artifact.expired) {
    throw new Error(
      'The deployed Portal snapshot has expired. Deploy the Portal before publishing OG updates.'
    )
  }
  await download(repository, artifactId, destination)
  return runId
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
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
