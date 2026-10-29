import {
  readFile,
  mkdir,
  copyFile,
  writeFile,
  readdir,
} from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const portal = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
)
const root = path.resolve(
  process.env.OG_OUTPUT || path.join(portal, '.og-catalogue')
)
const target = path.resolve(
  process.env.OG_STATIC_OUTPUT || path.join(portal, 'static/og')
)
let manifest
try {
  manifest = JSON.parse(
    await readFile(path.join(root, 'manifest.json'), 'utf8')
  )
} catch (error) {
  if ((error as { code?: string }).code !== 'ENOENT') {
    throw error
  }
  await mkdir(target, { recursive: true })
  try {
    await readFile(path.join(target, 'manifest.json'))
  } catch (missing) {
    if ((missing as { code?: string }).code !== 'ENOENT') {
      throw missing
    }
    await writeFile(path.join(target, 'manifest.json'), '{}\n')
  }
  console.log('No catalogue artifact; pages use the default image.')
  process.exit(0)
}
const entries: Record<
  string,
  { file: string; alt: string; kind: 'screenshot' }
> = {}
if (manifest.version !== 1 || !manifest.entries || !manifest.sources) {
  throw new Error('Invalid social image catalogue')
}
if (manifest.imageOrigin === 'https://assets.eufemia.dnb.no') {
  const { validateCatalogue } = await import('./cdn.mts')
  validateCatalogue(manifest)
  await mkdir(target, { recursive: true })
  for (const [route, value] of Object.entries(manifest.entries) as Array<
    [string, { file: string; alt: string }]
  >) {
    entries[route] = {
      file: value.file,
      alt: value.alt,
      kind: 'screenshot',
    }
  }
  await writeFile(
    path.join(target, 'manifest.json'),
    JSON.stringify(entries, null, 2) + '\n'
  )
  console.log(
    'Installed ' +
      Object.keys(entries).length +
      ' CDN image references; no PNG download.'
  )
  process.exit(0)
}
await mkdir(path.join(target, 'images'), { recursive: true })
for (const file of await readdir(path.join(root, 'images')).catch(
  (error) => {
    if (error.code !== 'ENOENT') {
      throw error
    }
    return [] as string[]
  }
)) {
  if (!/^[a-f0-9]{64}\.png$/.test(file)) {
    throw new Error('Invalid social image filename')
  }
  const bytes = await readFile(path.join(root, 'images', file))
  if (
    createHash('sha256').update(bytes).digest('hex') !== file.slice(0, -4)
  ) {
    throw new Error('Social image integrity check failed')
  }
  await copyFile(
    path.join(root, 'images', file),
    path.join(target, 'images', file)
  )
}
for (const [route, value] of Object.entries(manifest.entries) as Array<
  [string, { file: string; alt: string; digest: string; kind?: string }]
>) {
  if (value.kind !== 'screenshot') {
    continue
  }
  if (
    !/^images\/[a-f0-9]{64}\.png$/.test(value.file) ||
    !route.startsWith('/') ||
    route.startsWith('//')
  ) {
    throw new Error('Invalid social image entry')
  }
  const bytes = await readFile(path.join(root, value.file))
  if (createHash('sha256').update(bytes).digest('hex') !== value.digest) {
    throw new Error('Social image integrity check failed')
  }
  entries[route] = { file: value.file, alt: value.alt, kind: 'screenshot' }
}
await writeFile(
  path.join(target, 'manifest.json'),
  JSON.stringify(entries, null, 2) + '\n'
)
console.log(
  'Installed ' +
    Object.keys(entries).length +
    ' social image entries; no rendering.'
)
