import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  mkdtemp,
  mkdir,
  readFile,
  realpath,
  symlink,
  writeFile,
  rm,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(execFile)

test('checks the deployed snapshot in the publish job without workspace dependencies', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-deployment-'))
  try {
    const workflow = await readFile(
      new URL(
        '../../../../.github/workflows/portal-og-images.yml',
        import.meta.url
      ),
      'utf8'
    )
    const script = /run: node (\S+) check/.exec(
      workflow.split('\n  publish:')[1]
    )?.[1]
    assert.ok(script)
    const source = await readFile(
      new URL('../../../../' + script, import.meta.url),
      'utf8'
    )
    const isolated = path.join(root, 'deployment.mts')
    await writeFile(isolated, source)
    const loader = path.join(root, 'fetch.mjs')
    await writeFile(
      loader,
      'globalThis.fetch = async () => new Response(process.env.OG_TEST_MARKER, { status: Number(process.env.OG_TEST_STATUS || 200) })'
    )
    const env = {
      ...process.env,
      OG_EXPECTED_RUN_ID: '42',
      OG_TEST_MARKER: JSON.stringify({ runId: 42 }),
    }
    await exec(process.execPath, [isolated, 'stamp'], {
      env: { ...process.env, OG_SITE_OUTPUT: root, GITHUB_RUN_ID: '42' },
    })
    assert.deepEqual(
      JSON.parse(
        await readFile(path.join(root, 'og-deployment.json'), 'utf8')
      ),
      { runId: 42 }
    )
    await exec(process.execPath, ['--import', loader, isolated, 'check'], {
      env,
    })
    for (const change of [
      { OG_EXPECTED_RUN_ID: '43' },
      { OG_TEST_MARKER: JSON.stringify({ runId: '42' }) },
      { OG_TEST_STATUS: '404' },
    ]) {
      await assert.rejects(
        exec(process.execPath, ['--import', loader, isolated, 'check'], {
          env: { ...env, ...change },
        }),
        /The Portal deployment changed/
      )
    }
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('runs the scripts when they are started through a symlinked path', async () => {
  const root = await realpath(
    await mkdtemp(path.join(tmpdir(), 'og-symlink-'))
  )
  try {
    const scripts = path.join(root, 'scripts')
    await mkdir(scripts)
    await writeFile(
      path.join(scripts, 'deployment.mts'),
      await readFile(new URL('./deployment.mts', import.meta.url), 'utf8')
    )
    await symlink(scripts, path.join(root, 'linked'))
    const site = path.join(root, 'site')
    await mkdir(site)
    await exec(
      process.execPath,
      [path.join(root, 'linked', 'deployment.mts'), 'stamp'],
      { env: { ...process.env, OG_SITE_OUTPUT: site, GITHUB_RUN_ID: '7' } }
    )
    assert.deepEqual(
      JSON.parse(
        await readFile(path.join(site, 'og-deployment.json'), 'utf8')
      ),
      { runId: 7 }
    )
    // The other entry scripts need network or gh, so they share the checked guard.
    for (const name of ['artifacts', 'cdn', 'deployment', 'site']) {
      const source = await readFile(
        new URL('./' + name + '.mts', import.meta.url),
        'utf8'
      )
      assert.ok(source.includes('realpathSync(process.argv[1])'), name)
    }
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('holds the Pages deployment queue only while publishing', async () => {
  const workflow = await readFile(
    new URL(
      '../../../../.github/workflows/portal-og-images.yml',
      import.meta.url
    ),
    'utf8'
  )
  const [header, jobs] = workflow.split('\njobs:\n')
  const [generate, publish] = jobs.split('\n  publish:\n')
  assert.match(header, /concurrency:\n {2}group: portal-og-images\n/)
  assert.doesNotMatch(header + generate, /group: pages/)
  assert.match(
    publish,
    /\n {4}concurrency:\n {6}group: pages\n {6}cancel-in-progress: false\n/
  )
  assert.ok(
    publish.indexOf('group: pages') <
      publish.indexOf('Check that the source Portal is still deployed')
  )
})
