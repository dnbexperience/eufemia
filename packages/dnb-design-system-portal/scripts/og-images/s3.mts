import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { validateCatalogue } from './cdn.mts'
const exec = promisify(execFile)
const portal = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
)
const root = path.resolve(
  process.env.OG_OUTPUT || path.join(portal, '.og-catalogue')
)
const bucket = process.env.ASSETS_BUCKET_NAME
if (!bucket || !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) {
  throw new Error('Configure ASSETS_BUCKET_NAME')
}
const aws = async (args: string[]) =>
  exec('aws', args, { maxBuffer: 4 * 1024 * 1024 })
if (process.argv[2] === 'restore') {
  await mkdir(root, { recursive: true })
  const { stdout } = await aws([
    's3api',
    'list-objects-v2',
    '--bucket',
    bucket,
    '--prefix',
    'og/manifest.json',
    '--max-keys',
    '1',
    '--output',
    'json',
  ])
  const list = JSON.parse(stdout)
  if (
    list.Contents?.some(
      (entry: { Key: string }) => entry.Key === 'og/manifest.json'
    )
  ) {
    await aws([
      's3',
      'cp',
      's3://' + bucket + '/og/manifest.json',
      path.join(root, 'manifest.json'),
    ])
    const catalogue = validateCatalogue(
      JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'))
    )
    // Old images and crops stay published; only the current ones are reused.
    const files = [
      ...new Set(
        Object.values(catalogue.entries).flatMap((entry) =>
          entry.crop ? [entry.file, entry.crop] : [entry.file]
        )
      ),
    ].sort()
    if (files.length) {
      await aws([
        's3',
        'sync',
        's3://' + bucket + '/og/',
        root,
        '--exclude',
        '*',
        ...files.flatMap((file) => ['--include', file]),
      ])
    }
  } else {
    console.log('No S3 catalogue yet; generating the initial images.')
  }
} else if (process.argv[2] === 'publish') {
  const raw = JSON.parse(
    await readFile(path.join(root, 'manifest.json'), 'utf8')
  )
  const validated = validateCatalogue(raw)
  if (
    !raw.sources ||
    typeof raw.sources !== 'object' ||
    Array.isArray(raw.sources)
  ) {
    throw new Error('Invalid catalogue sources')
  }
  for (const entry of Object.values(validated.entries)) {
    await readFile(path.join(root, entry.file))
  }
  for (const directory of ['images', 'crops']) {
    await mkdir(path.join(root, directory), { recursive: true })
    for (const name of await readdir(path.join(root, directory))) {
      if (!/^[a-f0-9]{64}\.png$/.test(name)) {
        throw new Error('Invalid PNG filename')
      }
      const bytes = await readFile(path.join(root, directory, name))
      const png =
        bytes.length > 24 &&
        bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) &&
        bytes.toString('latin1', 12, 16) === 'IHDR'
      if (
        !png ||
        (directory === 'images' &&
          (createHash('sha256').update(bytes).digest('hex') !==
            name.slice(0, -4) ||
            bytes.readUInt32BE(16) !== 1200 ||
            bytes.readUInt32BE(20) !== 630))
      ) {
        throw new Error('Invalid catalogue PNG')
      }
    }
  }
  for (const directory of ['images', 'crops']) {
    await aws([
      's3',
      'sync',
      path.join(root, directory),
      's3://' + bucket + '/og/' + directory + '/',
      '--cache-control',
      'public,max-age=31536000,immutable',
      '--content-type',
      'image/png',
    ])
  }
  const catalogue = {
    version: validated.version,
    entries: validated.entries,
    sources: raw.sources,
    imageOrigin: 'https://assets.eufemia.dnb.no',
    publication: process.env.OG_PUBLICATION_ID || null,
  }
  await writeFile(
    path.join(root, 'published.json'),
    JSON.stringify(catalogue, null, 2) + '\n'
  )
  const publication = process.env.OG_PUBLICATION_ID
  if (publication) {
    if (!/^[a-zA-Z0-9-]+$/.test(publication)) {
      throw new Error('Invalid OG publication identifier')
    }
    await aws([
      's3',
      'cp',
      path.join(root, 'published.json'),
      's3://' + bucket + '/og/catalogues/' + publication + '.json',
      '--content-type',
      'application/json',
      '--cache-control',
      'public,max-age=31536000,immutable',
    ])
  }
  await aws([
    's3',
    'cp',
    path.join(root, 'published.json'),
    's3://' + bucket + '/og/manifest.json',
    '--content-type',
    'application/json',
    '--cache-control',
    'public,max-age=60,s-maxage=60,must-revalidate',
  ])
  const distribution = process.env.ASSETS_DISTRIBUTION_ID
  if (distribution) {
    await aws([
      'cloudfront',
      'create-invalidation',
      '--distribution-id',
      distribution,
      '--paths',
      '/og/manifest.json',
    ])
  }
  console.log('Published OG catalogue and immutable PNGs')
} else {
  throw new Error('Expected restore or publish')
}
