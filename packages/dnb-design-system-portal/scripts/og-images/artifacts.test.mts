import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isCatalogueRun, restoreSite } from './artifacts.mts'

test('restores only successful scheduled or manual catalogues from the default branch workflow', () => {
  const run = {
    id: 42,
    path: '.github/workflows/portal-og-images.yml',
    head_branch: 'main',
    head_sha: 'abc',
    status: 'completed',
    conclusion: 'success',
    event: 'schedule',
  }
  assert.equal(isCatalogueRun(run, 'main'), true)
  assert.equal(
    isCatalogueRun({ ...run, event: 'workflow_dispatch' }, 'main'),
    true
  )
  for (const change of [
    { head_branch: 'feature' },
    { conclusion: 'failure' },
    { event: 'pull_request' },
    { path: '.github/workflows/preview.yml' },
  ]) {
    assert.equal(isCatalogueRun({ ...run, ...change }, 'main'), false)
  }
})

import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(execFile)

const releaseRun = {
  id: 42,
  path: '.github/workflows/release.yml',
  head_branch: 'release',
  head_sha: 'abc',
  status: 'completed',
  conclusion: 'success',
  event: 'push',
}
const snapshotArtifact = {
  id: 7,
  name: 'portal-og-site',
  expired: false,
  workflow_run: { id: 42 },
}

async function restoreWith({
  marker = { runId: 42, artifactId: 7 } as unknown,
  markerStatus = 200,
  run = releaseRun as object,
  artifact = snapshotArtifact as object,
} = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'og-artifacts-'))
  const names = ['PATH', 'OG_TEST_RUN', 'OG_TEST_ARTIFACT', 'OG_TEST_ZIP']
  const originalEnv = names.map((name) => process.env[name])
  const originalFetch = globalThis.fetch
  try {
    const snapshot = path.join(root, 'snapshot')
    await mkdir(snapshot)
    await writeFile(path.join(snapshot, 'manifest.json'), '{}')
    await exec('zip', ['-q', '-r', path.join(root, 'snapshot.zip'), '.'], {
      cwd: snapshot,
    })
    await mkdir(path.join(root, 'bin'))
    await writeFile(
      path.join(root, 'bin/gh'),
      [
        '#!/usr/bin/env node',
        "const fs=require('node:fs'),args=process.argv.slice(2)",
        "fs.appendFileSync(process.env.OG_TEST_ZIP+'.calls',args.join(' ')+'\\n')",
        "if(args[0]!=='api')process.exit(1)",
        'const endpoint=args[1]',
        "if(endpoint.endsWith('/actions/runs/42'))console.log(process.env.OG_TEST_RUN)",
        "else if(endpoint.endsWith('/actions/artifacts/7/zip'))process.stdout.write(fs.readFileSync(process.env.OG_TEST_ZIP))",
        "else if(endpoint.endsWith('/actions/artifacts/7'))console.log(process.env.OG_TEST_ARTIFACT)",
        "else if(/^repos\\/[^/]+\\/[^/]+$/.test(endpoint))console.log(JSON.stringify({default_branch:'main'}))",
        'else process.exit(1)',
      ].join('\n'),
      { mode: 0o755 }
    )
    process.env.PATH =
      path.join(root, 'bin') + path.delimiter + originalEnv[0]
    process.env.OG_TEST_RUN = JSON.stringify(run)
    process.env.OG_TEST_ARTIFACT = JSON.stringify(artifact)
    process.env.OG_TEST_ZIP = path.join(root, 'snapshot.zip')
    globalThis.fetch = async () =>
      new Response(JSON.stringify(marker), { status: markerStatus })
    const site = path.join(root, 'site')
    const runId = await restoreSite(site)
    return {
      runId,
      manifest: await readFile(path.join(site, 'manifest.json'), 'utf8'),
      calls: await readFile(path.join(root, 'snapshot.zip.calls'), 'utf8'),
    }
  } finally {
    names.forEach((name, index) => {
      if (originalEnv[index] === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = originalEnv[index]
      }
    })
    globalThis.fetch = originalFetch
    await rm(root, { recursive: true, force: true })
  }
}

test('restores the snapshot artifact that the deployed Portal names', async () => {
  const { runId, manifest, calls } = await restoreWith()
  assert.equal(runId, 42)
  assert.equal(manifest, '{}')
  assert.match(calls, /\/actions\/artifacts\/7\/zip\n/)
  assert.doesNotMatch(calls, /run download/)
})

test('restores a release snapshot after a later job in the release run failed', async () => {
  assert.equal(
    (await restoreWith({ run: { ...releaseRun, conclusion: 'failure' } }))
      .runId,
    42
  )
  await assert.rejects(
    restoreWith({
      run: { ...releaseRun, status: 'in_progress', conclusion: null },
    }),
    /Portal snapshot workflow is not complete/
  )
})

test('restores a snapshot from a successful catalogue run', async () => {
  const run = {
    ...releaseRun,
    path: '.github/workflows/portal-og-images.yml',
    head_branch: 'main',
    event: 'schedule',
  }
  assert.equal((await restoreWith({ run })).runId, 42)
  await assert.rejects(
    restoreWith({ run: { ...run, conclusion: 'failure' } }),
    /Portal snapshot workflow is not complete/
  )
})

test('rejects a deployed Portal snapshot it cannot trust', async () => {
  await assert.rejects(
    restoreWith({ markerStatus: 404 }),
    /no refresh snapshot/
  )
  await assert.rejects(
    restoreWith({ marker: { runId: 'other', artifactId: 7 } }),
    /Invalid Portal snapshot reference/
  )
  await assert.rejects(
    restoreWith({ marker: { runId: 42, artifactId: '7' } }),
    /Invalid Portal snapshot reference/
  )
  await assert.rejects(
    restoreWith({ marker: { runId: 42 } }),
    /does not name its snapshot artifact/
  )
  for (const change of [
    { name: 'github-pages' },
    { workflow_run: { id: 43 } },
  ]) {
    await assert.rejects(
      restoreWith({ artifact: { ...snapshotArtifact, ...change } }),
      /does not match the deployed run/
    )
  }
  await assert.rejects(
    restoreWith({ artifact: { ...snapshotArtifact, expired: true } }),
    /snapshot has expired/
  )
})
