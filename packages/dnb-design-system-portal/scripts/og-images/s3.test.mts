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

async function fakeAws(root: string, manifest?: unknown) {
  await mkdir(path.join(root, 'bin'), { recursive: true })
  await writeFile(
    path.join(root, 'bin/aws'),
    [
      '#!/usr/bin/env node',
      "const fs=require('node:fs'),args=process.argv.slice(2)",
      "fs.appendFileSync(process.env.OG_REQUEST_LOG,JSON.stringify(args)+'\\n')",
      "if(args[1]==='list-objects-v2')console.log(JSON.stringify(process.env.OG_TEST_MANIFEST?{Contents:[{Key:'og/manifest.json'}]}:{}))",
      "if(args[0]==='s3'&&args[1]==='cp'&&args[2].startsWith('s3://'))fs.writeFileSync(args[3],process.env.OG_TEST_MANIFEST)",
    ].join('\n'),
    { mode: 0o755 }
  )
  const log = path.join(root, 'requests.jsonl')
  await writeFile(log, '')
  return {
    log,
    env: {
      ...process.env,
      PATH: path.join(root, 'bin') + path.delimiter + process.env.PATH,
      OG_OUTPUT: path.join(root, 'catalogue'),
      ASSETS_BUCKET_NAME: 'test-bucket',
      OG_REQUEST_LOG: log,
      ...(manifest ? { OG_TEST_MANIFEST: JSON.stringify(manifest) } : {}),
    },
    requests: async () =>
      (await readFile(log, 'utf8'))
        .trim()
        .split('\n')
        .filter(Boolean)
        .map((line) => JSON.parse(line)) as string[][],
  }
}

test('restores only the images and crops referenced by the catalogue', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-s3-restore-'))
  try {
    const image = 'a'.repeat(64),
      crop = 'b'.repeat(64),
      other = 'c'.repeat(64)
    const aws = await fakeAws(root, {
      version: 1,
      entries: {
        '/button/': {
          file: 'images/' + image + '.png',
          digest: image,
          kind: 'screenshot',
          alt: 'Button',
          crop: 'crops/' + crop + '.png',
        },
        '/checkbox/': {
          file: 'images/' + other + '.png',
          digest: other,
          kind: 'screenshot',
          alt: 'Checkbox',
        },
      },
      sources: {},
    })
    await exec(process.execPath, [script, 'restore'], { env: aws.env })
    const syncs = (await aws.requests()).filter(
      (args) => args[0] === 's3' && args[1] === 'sync'
    )
    assert.deepEqual(syncs, [
      [
        's3',
        'sync',
        's3://test-bucket/og/',
        path.join(root, 'catalogue'),
        '--exclude',
        '*',
        '--include',
        'crops/' + crop + '.png',
        '--include',
        'images/' + image + '.png',
        '--include',
        'images/' + other + '.png',
      ],
    ])
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('restores and publishes with Node built-ins only', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'og-s3-isolated-'))
  try {
    const scripts = path.join(root, 'scripts')
    await mkdir(scripts)
    for (const name of ['s3.mts', 'cdn.mts']) {
      await writeFile(
        path.join(scripts, name),
        await readFile(new URL('./' + name, import.meta.url), 'utf8')
      )
    }
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
    const aws = await fakeAws(root)
    const isolated = path.join(scripts, 's3.mts')
    await exec(process.execPath, [isolated, 'restore'], { env: aws.env })
    const catalogue = path.join(root, 'catalogue')
    await mkdir(path.join(catalogue, 'images'), { recursive: true })
    await writeFile(path.join(catalogue, 'images', digest + '.png'), png)
    await writeFile(
      path.join(catalogue, 'manifest.json'),
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
        unexpected: 'not published',
      })
    )
    await exec(process.execPath, [isolated, 'publish'], { env: aws.env })
    const published = JSON.parse(
      await readFile(path.join(catalogue, 'published.json'), 'utf8')
    )
    assert.deepEqual(Object.keys(published).sort(), [
      'entries',
      'imageOrigin',
      'publication',
      'sources',
      'version',
    ])

    const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    const invalid: Array<[string, Buffer]> = [
      [
        'images',
        await sharp({
          create: {
            width: 1200,
            height: 100,
            channels: 3,
            background: '#fff',
          },
        })
          .png()
          .toBuffer(),
      ],
      [
        'images',
        await sharp({
          create: {
            width: 100,
            height: 630,
            channels: 3,
            background: '#fff',
          },
        })
          .png()
          .toBuffer(),
      ],
      ['crops', Buffer.concat([header, Buffer.alloc(24)])],
    ]
    for (const [directory, bytes] of invalid) {
      const file = path.join(
        catalogue,
        directory,
        createHash('sha256').update(bytes).digest('hex') + '.png'
      )
      await mkdir(path.dirname(file), { recursive: true })
      await writeFile(file, bytes)
      await writeFile(aws.log, '')
      await assert.rejects(
        exec(process.execPath, [isolated, 'publish'], { env: aws.env }),
        /Invalid catalogue PNG/
      )
      assert.equal(await readFile(aws.log, 'utf8'), '')
      await rm(file)
    }
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
