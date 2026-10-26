import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const exec = promisify(execFile)
const scriptRoot = path.dirname(fileURLToPath(import.meta.url))

test('plans without Chromium, renders, reuses unchanged images, repairs missing images and preserves the catalogue on HTTP failure', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'eufemia-og-'))
  let origin = ''
  let version = 1
  let failed = false
  let captureFailed = false
  let compact = true
  let duplicate = false
  let notModified = 0
  const receivedHeaders: Array<Record<string, unknown>> = []
  const server = createServer((request, response) => {
    if (request.url === '/llms.txt') {
      response.end(
        '- [Guide](' +
          origin +
          '/guide.md)\n- [Button](' +
          origin +
          '/uilib/components/button.md)'
      )
      return
    }
    if (request.url === '/robots.txt') {
      response.end('User-agent: *\nDisallow:')
      return
    }
    if (failed) {
      response.writeHead(503)
      response.end()
      return
    }
    if (request.url?.startsWith('/assets/')) {
      response.setHeader('content-type', 'text/css')
      response.end('button{font:16px Arial}')
      return
    }
    receivedHeaders.push(request.headers)
    const modified = new Date(Date.UTC(2026, 0, version)).toUTCString()
    response.setHeader('last-modified', modified)
    const etag = '"' + version + '"'
    if (
      request.headers['if-modified-since'] === modified ||
      request.headers['if-none-match'] === etag
    ) {
      notModified++
      response.writeHead(304)
      response.end()
      return
    }
    response.setHeader('etag', etag)
    response.setHeader('content-type', 'text/html')
    if (request.url === '/uilib/components/button/') {
      response.end(
        '<title>Button</title><main><h1>Button</h1><a href="/uilib/components/button/demos/">Demos</a></main>'
      )
      return
    }
    if (request.url === '/uilib/components/button/demos/') {
      if (
        captureFailed &&
        request.headers['user-agent'] !== 'Eufemia-OG-Catalogue/1.0'
      ) {
        response.writeHead(503)
        response.end()
        return
      }
      response.end(
        '<title>Button</title><link rel="stylesheet" href="/assets/v' +
          version +
          '.css"><main><h1>Button</h1><div class="dnb-live-preview"><button style="width:140px;height:' +
          (compact ? 40 : 1600) +
          'px">Continue</button></div>' +
          (duplicate
            ? '<div class="dnb-live-preview" data-social-preview="true"><button>Second</button></div><div class="dnb-live-preview" data-social-preview="true"><button>Third</button></div>'
            : '') +
          '</main>'
      )
      return
    }
    response.end(
      '<title>Guide | Eufemia</title><meta name="description" content="A useful summary ' +
        version +
        '."><main><h1>Guide</h1><h2>First steps</h2><h2>Using components</h2></main>'
    )
  })
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', resolve)
  )
  const address = server.address()
  assert.ok(address && typeof address !== 'string')
  origin = 'http://127.0.0.1:' + address.port
  const run = async (command: string, extra = {}) => {
    const result = await exec(
      process.execPath,
      [path.join(scriptRoot, 'generate.mts'), command],
      {
        env: {
          ...process.env,
          OG_OUTPUT: root,
          OG_ORIGIN: origin,
          ...extra,
        },
      }
    )
    return JSON.parse(result.stdout)
  }
  try {
    await writeFile(
      path.join(root, 'manifest.json'),
      JSON.stringify({
        version: 1,
        entries: {
          '/guide/': { file: 'images/old.png', alt: 'Old artwork' },
        },
        sources: {},
      })
    )
    assert.equal((await run('plan')).images, 1)
    assert.equal((await run('render')).images, 1)
    assert.equal((await run('plan')).images, 0)
    assert.ok(notModified >= 2)
    const original = await readFile(path.join(root, 'manifest.json'))
    const manifest = JSON.parse(original.toString())
    const cached = JSON.parse(original.toString())
    cached.sources['/uilib/components/button/'].card.captureRoute =
      'https://example.com/private'
    cached.sources['/uilib/components/button/'].etag =
      'private-file-content'
    await writeFile(
      path.join(root, 'manifest.json'),
      JSON.stringify(cached)
    )
    receivedHeaders.length = 0
    assert.equal((await run('plan')).images, 0)
    assert.ok(
      receivedHeaders.every(
        (headers) => headers['if-none-match'] === undefined
      )
    )
    const repaired = JSON.parse(
      await readFile(path.join(root, 'manifest.json'), 'utf8')
    )
    assert.equal(
      repaired.sources['/uilib/components/button/'].card.captureRoute,
      '/uilib/components/button/demos/'
    )
    repaired.sources['/uilib/components/button/'].modified =
      '2026-01-01T00:00:00.000Z'
    await writeFile(
      path.join(root, 'manifest.json'),
      JSON.stringify(repaired)
    )
    receivedHeaders.length = 0
    assert.equal((await run('plan')).images, 0)
    assert.ok(
      receivedHeaders.some(
        (headers) =>
          headers['if-modified-since'] === 'Thu, 01 Jan 2026 00:00:00 GMT'
      )
    )
    for (const source of Object.values(repaired.sources) as Array<{
      modified: string
    }>) {
      source.modified = 'invalid-date'
    }
    await writeFile(
      path.join(root, 'manifest.json'),
      JSON.stringify(repaired)
    )
    receivedHeaders.length = 0
    assert.equal((await run('plan')).images, 0)
    assert.ok(
      receivedHeaders.every(
        (headers) => headers['if-modified-since'] === undefined
      )
    )
    const png = await readFile(
      path.join(root, manifest.entries['/uilib/components/button/'].file)
    )
    assert.equal(png.readUInt32BE(16), 1200)
    assert.equal(png.readUInt32BE(20), 630)
    assert.equal(manifest.entries['/guide/'], undefined)
    assert.equal(manifest.entries['/'], undefined)
    assert.equal(
      manifest.entries['/uilib/components/button/'].kind,
      'screenshot'
    )
    await rm(
      path.join(root, manifest.entries['/uilib/components/button/'].file)
    )
    assert.equal((await run('plan', { OG_MODE: 'missing' })).images, 1)
    await run('render')
    version++
    assert.equal((await run('plan', { OG_MODE: 'missing' })).images, 0)
    assert.equal((await run('plan')).images, 1)
    await run('render')
    const installed = path.join(root, 'installed')
    await exec(process.execPath, [path.join(scriptRoot, 'install.mts')], {
      env: {
        ...process.env,
        OG_OUTPUT: root,
        OG_STATIC_OUTPUT: installed,
      },
    })
    const installedManifest = JSON.parse(
      await readFile(path.join(installed, 'manifest.json'), 'utf8')
    )
    assert.equal(
      installedManifest['/uilib/components/button/'].kind,
      'screenshot'
    )
    assert.ok(
      (
        await readFile(
          path.join(
            installed,
            manifest.entries['/uilib/components/button/'].file
          )
        )
      ).length > 24
    )
    await exec(process.execPath, [path.join(scriptRoot, 'install.mts')], {
      env: {
        ...process.env,
        OG_OUTPUT: path.join(root, 'unpublished'),
        OG_STATIC_OUTPUT: installed,
      },
    })
    assert.deepEqual(
      JSON.parse(
        await readFile(path.join(installed, 'manifest.json'), 'utf8')
      ),
      installedManifest
    )
    version++
    captureFailed = true
    await run('plan')
    await run('render')
    const retained = JSON.parse(
      await readFile(path.join(root, 'manifest.json'), 'utf8')
    )
    assert.equal(
      retained.entries['/uilib/components/button/'].file,
      installedManifest['/uilib/components/button/'].file
    )
    assert.equal(
      retained.entries['/uilib/components/button/'].retryCapture,
      true
    )
    captureFailed = false
    duplicate = true
    version++
    await run('plan')
    const beforeDuplicate = await readFile(
      path.join(root, 'manifest.json')
    )
    await assert.rejects(run('render'), /Only one socialPreview demo/)
    assert.deepEqual(
      await readFile(path.join(root, 'manifest.json')),
      beforeDuplicate
    )
    duplicate = false
    compact = false
    await run('plan')
    await run('render')
    assert.equal((await run('plan')).images, 0)
    const withoutScreenshot = JSON.parse(
      await readFile(path.join(root, 'manifest.json'), 'utf8')
    )
    assert.deepEqual(withoutScreenshot.entries, {})
    const beforeFailure = await readFile(path.join(root, 'manifest.json'))
    failed = true
    await assert.rejects(run('plan'))
    const failedPlan = JSON.parse(
      await readFile(path.join(root, 'plan.json'), 'utf8')
    )
    assert.ok(failedPlan.failures.length > 0)
    assert.ok(
      failedPlan.failures.every((failure: string) =>
        failure.endsWith(': page inspection failed')
      )
    )
    assert.deepEqual(
      await readFile(path.join(root, 'manifest.json')),
      beforeFailure
    )
    await assert.rejects(run('render'))
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    )
    await rm(root, { recursive: true, force: true })
  }
})
