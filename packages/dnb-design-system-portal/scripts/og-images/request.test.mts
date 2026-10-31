import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
const exec = promisify(execFile),
  script = fileURLToPath(new URL('./request.mts', import.meta.url))
test('dispatches the reviewed SHA and verifies its exact publication and public image before completing', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-request-'))
  try {
    await mkdir(path.join(root, 'bin'))
    const log = path.join(root, 'request.json'),
      fetchLog = path.join(root, 'fetch.jsonl')
    await writeFile(
      path.join(root, 'bin/gh'),
      [
        '#!/usr/bin/env node',
        "const fs=require('node:fs'),args=process.argv.slice(2)",
        "const input=JSON.parse(fs.readFileSync(args[args.indexOf('--input')+1],'utf8'))",
        'fs.writeFileSync(process.env.OG_REQUEST_LOG,JSON.stringify({args,input}))',
      ].join('\n'),
      { mode: 0o755 }
    )
    const loader = path.join(root, 'fetch.mjs'),
      digest = 'a'.repeat(64)
    await writeFile(
      loader,
      [
        "import {appendFileSync}from'node:fs'",
        "globalThis.fetch=async(url,options)=>{appendFileSync(process.env.OG_FETCH_LOG,JSON.stringify({url,method:options.method||'GET'})+'\\n');if(options.method==='HEAD')return new Response('',{headers:{'content-type':'image/png'}});return new Response(JSON.stringify({version:1,publication:'42-1',entries:{'/button/':{file:'images/'+ 'a'.repeat(64)+'.png',digest:'a'.repeat(64),kind:'screenshot'}}}))}",
      ].join('\n')
    )
    const sha = 'b'.repeat(40)
    await exec(process.execPath, ['--import', loader, script], {
      env: {
        ...process.env,
        PATH: path.join(root, 'bin') + path.delimiter + process.env.PATH,
        GHE_ASSETS_DEPLOY_REPO: 'eufemia/eufemia-assets',
        GITHUB_SHA: sha,
        GITHUB_RUN_ID: '42',
        GITHUB_RUN_ATTEMPT: '1',
        OG_MODE: 'refresh',
        OG_REQUEST_LOG: log,
        OG_FETCH_LOG: fetchLog,
      },
    })
    const request = JSON.parse(await readFile(log, 'utf8'))
    assert.ok(
      request.args.includes('repos/eufemia/eufemia-assets/dispatches')
    )
    assert.deepEqual(request.input, {
      event_type: 'portal-og-images',
      client_payload: {
        source_ref: sha,
        publication: '42-1',
        mode: 'refresh',
      },
    })
    const fetches = (await readFile(fetchLog, 'utf8'))
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l))
    assert.equal(
      fetches[0].url,
      'https://assets.eufemia.dnb.no/og/catalogues/42-1.json'
    )
    assert.equal(
      fetches[1].url,
      'https://assets.eufemia.dnb.no/og/images/' + digest + '.png'
    )
    assert.equal(fetches[1].method, 'HEAD')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('waits at least as long as the internal publisher may run', async () => {
  const minutes = (source: string) =>
    [...source.matchAll(/timeout-minutes: (\d+)/g)].map((match) =>
      Number(match[1])
    )
  const publisher = await readFile(
    new URL(
      '../../../../tools/assets/ghe-og-workflow.yml',
      import.meta.url
    ),
    'utf8'
  )
  const requester = await readFile(
    new URL(
      '../../../../.github/workflows/portal-og-images.yml',
      import.meta.url
    ),
    'utf8'
  )
  const deadline = Number(
    /const deadline = Date\.now\(\) \+ (\d+) \* 60 \* 1000/.exec(
      await readFile(script, 'utf8')
    )?.[1]
  )
  const internal = minutes(publisher).reduce(
    (sum, value) => sum + value,
    0
  )
  const generate = minutes(requester.split('\n  publish:\n')[0])
  assert.equal(minutes(publisher).length, 3)
  assert.equal(generate.length, 1)
  assert.ok(deadline >= internal, deadline + ' < ' + internal)
  // Leave room for the steps before and after the wait in the same job.
  assert.ok(
    generate[0] >= deadline + 10,
    generate[0] + ' < ' + (deadline + 10)
  )
})
