import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
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
