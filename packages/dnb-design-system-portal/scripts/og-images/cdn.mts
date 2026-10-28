import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const imageOrigin = 'https://assets.eufemia.dnb.no'
export function validateCatalogue(value: unknown) {
  const catalogue = value as {
    version: number
    entries: Record<
      string,
      { file: string; digest: string; kind: string; alt?: string }
    >
  }
  if (
    catalogue?.version !== 1 ||
    !catalogue.entries ||
    typeof catalogue.entries !== 'object' ||
    Array.isArray(catalogue.entries)
  ) {
    throw new Error('Invalid CDN catalogue')
  }
  for (const [route, entry] of Object.entries(catalogue.entries)) {
    if (
      !/^\/[a-zA-Z0-9._/-]*$/.test(route) ||
      !route.endsWith('/') ||
      route.includes('//') ||
      route.split('/').some((part) => part === '.' || part === '..') ||
      !entry ||
      !/^images\/[a-f0-9]{64}\.png$/.test(entry.file) ||
      entry.digest !== entry.file.slice(7, -4) ||
      entry.kind !== 'screenshot' ||
      (entry.alt !== undefined &&
        (typeof entry.alt !== 'string' || entry.alt.length > 500))
    ) {
      throw new Error('Invalid CDN image entry')
    }
  }
  return catalogue
}

export async function restoreCatalogue(destination?: string) {
  const portal = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../..'
  )
  const target = path.resolve(
    destination ||
      process.env.OG_OUTPUT ||
      path.join(portal, '.og-catalogue')
  )
  const publication = process.env.OG_PUBLICATION_ID
  if (publication && !/^[a-zA-Z0-9-]+$/.test(publication)) {
    throw new Error('Invalid OG publication identifier')
  }
  const cataloguePath = publication
    ? '/og/catalogues/' + publication + '.json'
    : '/og/manifest.json'
  const response = await fetch(imageOrigin + cataloguePath, {
    signal: AbortSignal.timeout(20000),
    redirect: 'error',
  })
  if (response.status === 404) {
    console.log('No CDN catalogue published yet.')
    return false
  }
  if (!response.ok) {
    throw new Error('Could not restore the CDN catalogue')
  }
  const catalogue = validateCatalogue(await response.json())
  const entries = Object.fromEntries(
    Object.entries(catalogue.entries).map(([route, entry]) => [
      route,
      {
        file: entry.file,
        digest: entry.digest,
        kind: 'screenshot',
        alt: entry.alt,
      },
    ])
  )
  await mkdir(target, { recursive: true })
  await writeFile(
    path.join(target, 'manifest.json'),
    JSON.stringify(
      { version: 1, entries, sources: {}, imageOrigin },
      null,
      2
    ) + '\n'
  )
  return true
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await restoreCatalogue()
}
