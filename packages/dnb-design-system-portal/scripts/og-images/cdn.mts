import { realpathSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const imageOrigin = 'https://assets.eufemia.dnb.no'
export function validateCatalogue(value: unknown) {
  const catalogue = value as {
    version: number
    entries: Record<
      string,
      {
        file: string
        digest: string
        kind: string
        alt?: string
        crop?: string
      }
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
        (typeof entry.alt !== 'string' || entry.alt.length > 500)) ||
      (entry.crop !== undefined &&
        !/^crops\/[a-f0-9]{64}\.png$/.test(String(entry.crop)))
    ) {
      throw new Error('Invalid CDN image entry')
    }
  }
  return catalogue
}

async function fetchWithRetry(url: string, retryDelay: number) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20000),
        redirect: 'error',
      })
      if (response.status < 500 || attempt === 3) {
        return response
      }
    } catch (error) {
      if (attempt === 3) {
        throw error
      }
    }
    await new Promise((resolve) =>
      setTimeout(resolve, retryDelay * attempt)
    )
  }
}

export async function restoreCatalogue(
  destination?: string,
  { optional = false, retryDelay = 2000 } = {}
) {
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
  let catalogue: ReturnType<typeof validateCatalogue>
  try {
    const response = await fetchWithRetry(
      imageOrigin + cataloguePath,
      retryDelay
    )
    // The asset origin answers 403 for a key that does not exist yet.
    if (!publication && [403, 404].includes(response.status)) {
      if (optional) {
        console.warn(
          '::warning::No social image catalogue is published, so pages use text previews.'
        )
      } else {
        console.log('No CDN catalogue published yet.')
      }
      return false
    }
    if (!response.ok) {
      throw new Error('Could not restore the CDN catalogue')
    }
    catalogue = validateCatalogue(await response.json())
  } catch (error) {
    if (!optional || publication) {
      throw error
    }
    console.warn(
      '::warning::Could not restore the social image catalogue, so pages use text previews: ' +
        String(error)
    )
    return false
  }
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
  import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
) {
  await restoreCatalogue(undefined, {
    optional: process.argv.includes('--optional'),
  })
}
