import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { validateCatalogue, restoreCatalogue } from './cdn.mts'
const digest = 'a'.repeat(64),
  entry = {
    file: 'images/' + digest + '.png',
    digest,
    kind: 'screenshot',
    alt: 'Button',
  }
test('validates CDN routes and content-addressed PNG references', () => {
  assert.equal(
    validateCatalogue({ version: 1, entries: { '/button/': entry } })
      .version,
    1
  )
  for (const value of [
    { version: 1, entries: { '//other/': entry } },
    { version: 1, entries: { '/button/': { ...entry, file: '../file' } } },
    { version: 1, entries: { '/button/': { ...entry, digest: 'wrong' } } },
    { version: 1, entries: [] },
    { version: 1, entries: { '/button/': { ...entry, alt: {} } } },
    {
      version: 1,
      entries: { '/button/': { ...entry, alt: 'x'.repeat(501) } },
    },
  ])
    assert.throws(() => validateCatalogue(value))
})
test('restores a CDN manifest without downloading image files', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-cdn-')),
    original = globalThis.fetch
  try {
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          version: 1,
          entries: { '/button/': { ...entry, extra: 'unexpected' } },
          extra: 'unexpected',
        })
      )
    assert.equal(await restoreCatalogue(root), true)
    const saved = JSON.parse(
      await readFile(path.join(root, 'manifest.json'), 'utf8')
    )
    assert.equal(saved.imageOrigin, 'https://assets.eufemia.dnb.no')
    assert.equal(saved.extra, undefined)
    assert.equal(saved.entries['/button/'].extra, undefined)
    globalThis.fetch = async () => new Response('', { status: 404 })
    assert.equal(await restoreCatalogue(root), false)
  } finally {
    globalThis.fetch = original
    await rm(root, { recursive: true, force: true })
  }
})

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
test('installs CDN references without PNG files in the code checkout', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-install-cdn-')),
    original = globalThis.fetch
  try {
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({ version: 1, entries: { '/button/': entry } })
      )
    await restoreCatalogue(root)
    const target = path.join(root, 'static')
    await promisify(execFile)(
      process.execPath,
      [fileURLToPath(new URL('./install.mts', import.meta.url))],
      {
        env: { ...process.env, OG_OUTPUT: root, OG_STATIC_OUTPUT: target },
      }
    )
    const manifest = JSON.parse(
      await readFile(path.join(target, 'manifest.json'), 'utf8')
    )
    assert.equal(manifest['/button/'].file, entry.file)
  } finally {
    globalThis.fetch = original
    await rm(root, { recursive: true, force: true })
  }
})
