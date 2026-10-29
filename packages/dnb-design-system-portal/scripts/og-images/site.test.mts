import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { prepareSite, updateImageTags } from './site.mts'

const file =
  'images/' +
  createHash('sha256').update('new image').digest('hex') +
  '.png'
const manifest = {
  '/button/': { kind: 'screenshot', file, alt: 'Button' },
}
test('updates only image metadata and preserves body content and script bytes', () => {
  const html =
    '<html><head><title>Button</title><meta property="og:image" content="old"><meta name="twitter:card" content="summary"><meta name="description" content="Use a button"><script>const text="unchanged"</script></head><body><meta name="twitter:card" content="body example"><h1>Button</h1></body></html>'
  const updated = updateImageTags(html, '/button/demos/', manifest)
  assert.ok(updated.includes('https://assets.eufemia.dnb.no/og/' + file))
  assert.ok(
    updated.includes('<meta name="description" content="Use a button">')
  )
  assert.ok(updated.includes('<script>const text="unchanged"</script>'))
  assert.equal(updated.split('<body>')[1], html.split('<body>')[1])
  assert.ok(!updated.includes('content="old"'))
  assert.equal(
    updateImageTags(updated, '/button/demos/', manifest),
    updated
  )
  const missing = updateImageTags(html, '/guide/', manifest)
  assert.ok(
    missing.includes('https://eufemia.dnb.no/dnb/og-image.png?v=2')
  )
  assert.ok(missing.split('</head>')[0].includes('summary_large_image'))
  assert.equal(updateImageTags(missing, '/guide/', manifest), missing)
})
test('prepares an existing snapshot without rebuilding application assets and retains old image URLs', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-site-'))
  try {
    const site = path.join(root, 'site'),
      images = path.join(root, 'images')
    await mkdir(path.join(site, 'button'), { recursive: true })
    await mkdir(path.join(site, 'assets'))
    await mkdir(path.join(site, 'og/images'), { recursive: true })
    await mkdir(path.join(images, 'images'), { recursive: true })
    await writeFile(
      path.join(site, 'button/index.html'),
      '<head><meta property="og:image" content="old"></head><body>Button</body>'
    )
    await writeFile(path.join(site, 'assets/app.js'), 'application bytes')
    await writeFile(path.join(site, 'og/images/old.png'), 'old image')
    await writeFile(
      path.join(images, 'manifest.json'),
      JSON.stringify(manifest)
    )
    await writeFile(path.join(images, file), 'new image')
    assert.equal(await prepareSite(site, images, 123), 1)
    assert.equal(
      await readFile(path.join(site, 'assets/app.js'), 'utf8'),
      'application bytes'
    )
    assert.equal(
      await readFile(path.join(site, 'og/images/old.png'), 'utf8'),
      'old image'
    )
    assert.equal(
      JSON.parse(
        await readFile(path.join(site, 'og-deployment.json'), 'utf8')
      ).runId,
      123
    )
    await assert.rejects(
      prepareSite(site, images, NaN),
      /Invalid Portal deployment reference/
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('does not rewrite metadata examples inside scripts', () => {
  const html =
    '<head><script>const example = ' +
    JSON.stringify('<meta name="twitter:card" content="example">') +
    '</script><meta property="og:image" content="old"></head><body>Unchanged</body>'
  const updated = updateImageTags(html, '/button/', manifest)
  assert.ok(
    updated.includes(
      '<script>const example = ' +
        JSON.stringify('<meta name="twitter:card" content="example">') +
        '</script>'
    )
  )
  assert.ok(updated.includes('/og/' + file))
})

test('preserves script contents with HTML-like strings and spaced closing tags', () => {
  const script =
    '<script>const example = ' +
    JSON.stringify('</head><meta property="og:image" content="example">') +
    '</script >'
  const html =
    '<head>' +
    script +
    '<meta property="og:image" content="old"></head><body>Unchanged</body>'
  const updated = updateImageTags(html, '/button/', manifest)
  assert.ok(updated.includes(script))
  assert.ok(!updated.includes('content="old"'))
  assert.equal(updateImageTags(updated, '/button/', manifest), updated)
})
