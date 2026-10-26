import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isCatalogueRun, restoreSite } from './artifacts.mts'

test('restores only successful scheduled or manual catalogues from the default branch workflow', () => {
  const run = {
    id: 42,
    path: '.github/workflows/portal-og-images.yml',
    head_branch: 'main',
    head_sha: 'abc',
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

import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

test('restores a trusted deployed Portal snapshot', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-artifacts-'))
  const originalPath = process.env.PATH
  const originalFetch = globalThis.fetch
  try {
    await mkdir(path.join(root, 'bin'))
    const cli = path.join(root, 'bin/gh')
    await writeFile(
      cli,
      [
        '#!/usr/bin/env node',
        "const fs=require('node:fs'),path=require('node:path'),args=process.argv.slice(2)",
        "if(args[0]==='api'){",
        ' const endpoint=args[1]',
        " if(endpoint.endsWith('/actions/runs/42'))console.log(JSON.stringify({id:42,path:'.github/workflows/portal-og-images.yml',head_branch:'main',head_sha:'abc',conclusion:'success',event:'schedule'}))",
        " else if(endpoint.includes('/actions/artifacts?'))console.log(JSON.stringify({artifacts:[{id:7,name:'portal-social-images',expired:false,workflow_run:{id:42,head_branch:'main',head_repository_id:1,repository_id:1}}]}))",
        " else console.log(JSON.stringify({default_branch:'main'}))",
        "}else if(args[0]==='run'&&args[1]==='download'){",
        " const dir=args[args.indexOf('--dir')+1];fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'manifest.json'),'{}')",
        '}else process.exit(1)',
      ].join('\n'),
      { mode: 0o755 }
    )
    process.env.PATH =
      path.join(root, 'bin') + path.delimiter + originalPath
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ runId: 42 }), { status: 200 })
    assert.equal(await restoreSite(path.join(root, 'site')), 42)
    globalThis.fetch = async () => new Response('{}', { status: 404 })
    await assert.rejects(
      restoreSite(path.join(root, 'missing')),
      /no refresh snapshot/
    )
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ runId: 'other' }), { status: 200 })
    await assert.rejects(
      restoreSite(path.join(root, 'invalid')),
      /Invalid Portal snapshot reference/
    )
  } finally {
    process.env.PATH = originalPath
    globalThis.fetch = originalFetch
    await rm(root, { recursive: true, force: true })
  }
})
