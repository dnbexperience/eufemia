import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
const exec = promisify(execFile),
  script = fileURLToPath(new URL('./s3.mts', import.meta.url))
test('publishes validated immutable PNGs before the manifest without deleting other prefixes', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-s3-'))
  try {
    await mkdir(path.join(root, 'bin'))
    await mkdir(path.join(root, 'images'))
    await mkdir(path.join(root, 'crops'))
    const log = path.join(root, 'requests.jsonl')
    await writeFile(
      path.join(root, 'bin/aws'),
      [
        '#!/usr/bin/env node',
        "require('node:fs').appendFileSync(process.env.OG_REQUEST_LOG, JSON.stringify(process.argv.slice(2))+'\\n')",
      ].join('\n'),
      { mode: 0o755 }
    )
    const png = await sharp({
        create: {
          width: 1200,
          height: 630,
          channels: 3,
          background: '#fff',
        },
      })
        .png()
        .toBuffer(),
      digest = createHash('sha256').update(png).digest('hex')
    await writeFile(path.join(root, 'images', digest + '.png'), png)
    await writeFile(
      path.join(root, 'manifest.json'),
      JSON.stringify({
        version: 1,
        entries: {
          '/button/': {
            file: 'images/' + digest + '.png',
            digest,
            kind: 'screenshot',
            alt: 'Button',
          },
        },
        sources: {},
      })
    )
    const env = {
      ...process.env,
      PATH: path.join(root, 'bin') + path.delimiter + process.env.PATH,
      OG_OUTPUT: root,
      ASSETS_BUCKET_NAME: 'test-bucket',
      ASSETS_DISTRIBUTION_ID: 'TEST',
      OG_REQUEST_LOG: log,
      OG_PUBLICATION_ID: 'publication-42',
    }
    await exec(process.execPath, [script, 'publish'], { env })
    const requests = (await readFile(log, 'utf8'))
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line))
    assert.equal(requests[0][3], 's3://test-bucket/og/images/')
    assert.equal(requests[1][3], 's3://test-bucket/og/crops/')
    assert.equal(
      requests[2][3],
      's3://test-bucket/og/catalogues/publication-42.json'
    )
    assert.equal(requests[3][3], 's3://test-bucket/og/manifest.json')
    assert.ok(requests.every((args) => !args.includes('--delete')))
    const published = JSON.parse(
      await readFile(path.join(root, 'published.json'), 'utf8')
    )
    assert.equal(published.publication, 'publication-42')
    assert.equal(published.imageOrigin, 'https://assets.eufemia.dnb.no')
    await writeFile(log, '')
    await writeFile(
      path.join(root, 'images', digest + '.png'),
      'invalid PNG'
    )
    await assert.rejects(
      exec(process.execPath, [script, 'publish'], { env })
    )
    assert.equal(await readFile(log, 'utf8'), '')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
