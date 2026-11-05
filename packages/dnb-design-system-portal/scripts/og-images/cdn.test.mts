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
test('treats a missing CDN key as an unpublished catalogue', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-cdn-missing-')),
    original = globalThis.fetch
  try {
    // The asset origin answers 403, not 404, for a key that does not exist.
    globalThis.fetch = async () => new Response('', { status: 403 })
    assert.equal(await restoreCatalogue(root), false)
    await assert.rejects(readFile(path.join(root, 'manifest.json')))
  } finally {
    globalThis.fetch = original
    await rm(root, { recursive: true, force: true })
  }
})
test('reports a missing catalogue as a warning in optional restores', async () => {
  const root = await mkdtemp(
      path.join(tmpdir(), 'og-cdn-missing-warning-')
    ),
    original = globalThis.fetch,
    { log, warn } = console
  const messages: Array<[string, string]> = []
  try {
    console.log = (message: string) => messages.push(['log', message])
    console.warn = (message: string) => messages.push(['warn', message])
    globalThis.fetch = async () => new Response('', { status: 403 })
    await restoreCatalogue(root)
    await restoreCatalogue(root, { optional: true })
    assert.deepEqual(
      messages.map(([kind, message]) => [
        kind,
        message.startsWith('::warning::'),
      ]),
      [
        ['log', false],
        ['warn', true],
      ]
    )
  } finally {
    globalThis.fetch = original
    Object.assign(console, { log, warn })
    await rm(root, { recursive: true, force: true })
  }
})
test('requires a verified publication to be present', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-cdn-publication-')),
    original = globalThis.fetch,
    previous = process.env.OG_PUBLICATION_ID
  try {
    process.env.OG_PUBLICATION_ID = '42-1'
    for (const status of [403, 404]) {
      globalThis.fetch = async () => new Response('', { status })
      await assert.rejects(
        restoreCatalogue(root, { optional: true, retryDelay: 0 }),
        /Could not restore the CDN catalogue/
      )
    }
  } finally {
    globalThis.fetch = original
    if (previous === undefined) {
      delete process.env.OG_PUBLICATION_ID
    } else {
      process.env.OG_PUBLICATION_ID = previous
    }
    await rm(root, { recursive: true, force: true })
  }
})
test('retries temporary CDN failures', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-cdn-retry-')),
    original = globalThis.fetch
  try {
    const responses = [
      () => Promise.reject(new TypeError('fetch failed')),
      () => Promise.resolve(new Response('', { status: 503 })),
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ version: 1, entries: { '/button/': entry } })
          )
        ),
    ]
    let calls = 0
    globalThis.fetch = () => responses[calls++]()
    assert.equal(await restoreCatalogue(root, { retryDelay: 0 }), true)
    assert.equal(calls, 3)
  } finally {
    globalThis.fetch = original
    await rm(root, { recursive: true, force: true })
  }
})
test('fails strict restores but lets optional restores use the default image', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-cdn-optional-')),
    original = globalThis.fetch,
    warn = console.warn
  const failures: Array<() => Promise<Response>> = [
    () => Promise.reject(new TypeError('fetch failed')),
    () => Promise.resolve(new Response('', { status: 503 })),
    () => Promise.resolve(new Response('not json')),
    () =>
      Promise.resolve(
        new Response(JSON.stringify({ version: 1, entries: [] }))
      ),
  ]
  const warnings: string[] = []
  try {
    console.warn = (message: string) => warnings.push(message)
    for (const failure of failures) {
      globalThis.fetch = failure
      await assert.rejects(restoreCatalogue(root, { retryDelay: 0 }))
      assert.equal(
        await restoreCatalogue(root, { optional: true, retryDelay: 0 }),
        false
      )
      await assert.rejects(readFile(path.join(root, 'manifest.json')))
    }
    assert.equal(warnings.length, failures.length)
    assert.ok(
      warnings.every((message) => message.startsWith('::warning::'))
    )
  } finally {
    globalThis.fetch = original
    console.warn = warn
    await rm(root, { recursive: true, force: true })
  }
})
test('does not let the catalogue download block release or preview builds', async () => {
  for (const workflow of ['release.yml', 'preview.yml']) {
    const source = await readFile(
      new URL(
        '../../../../.github/workflows/' + workflow,
        import.meta.url
      ),
      'utf8'
    )
    const restores = source.match(/node \S+\/og-images\/cdn\.mts.*/g)
    assert.deepEqual(restores, [
      'node packages/dnb-design-system-portal/scripts/og-images/cdn.mts --optional',
    ])
  }
})
test('rejects crop references outside the crop cache', () => {
  const crop = 'crops/' + 'b'.repeat(64) + '.png'
  assert.equal(
    validateCatalogue({
      version: 1,
      entries: { '/button/': { ...entry, crop } },
    }).entries['/button/'].crop,
    crop
  )
  for (const value of [
    '../crops/' + 'b'.repeat(64) + '.png',
    'images/' + 'b'.repeat(64) + '.png',
    1,
  ]) {
    assert.throws(() =>
      validateCatalogue({
        version: 1,
        entries: { '/button/': { ...entry, crop: value } },
      })
    )
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
