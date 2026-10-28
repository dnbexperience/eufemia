import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { writeFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { imageOrigin, validateCatalogue } from './cdn.mts'
const repository = process.env.GHE_ASSETS_DEPLOY_REPO
const sha = process.env.GITHUB_SHA
const mode = process.env.OG_MODE || 'refresh'
const publication =
  process.env.GITHUB_RUN_ID + '-' + process.env.GITHUB_RUN_ATTEMPT
if (
  !repository ||
  !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repository) ||
  !sha ||
  !/^[a-f0-9]{40}$/.test(sha) ||
  !['refresh', 'missing'].includes(mode)
) {
  throw new Error('Invalid OG publishing request')
}
const temporary = await mkdtemp(path.join(tmpdir(), 'og-request-'))
try {
  const input = path.join(temporary, 'request.json')
  await writeFile(
    input,
    JSON.stringify({
      event_type: 'portal-og-images',
      client_payload: { source_ref: sha, publication, mode },
    })
  )
  await promisify(execFile)('gh', [
    'api',
    '--hostname',
    'dnb.ghe.com',
    '--method',
    'POST',
    'repos/' + repository + '/dispatches',
    '--input',
    input,
  ])
  const deadline = Date.now() + 35 * 60 * 1000
  let complete = false
  while (Date.now() < deadline) {
    const response = await fetch(
      imageOrigin +
        '/og/catalogues/' +
        encodeURIComponent(publication) +
        '.json',
      { signal: AbortSignal.timeout(20000), redirect: 'error' }
    )
    if (response.ok) {
      const data = await response.json()
      const catalogue = validateCatalogue(data)
      if (data.publication === publication) {
        const files = [
          ...new Set(
            Object.values(catalogue.entries).map(
              (entry: { file: string }) => entry.file
            )
          ),
        ] as string[]
        let cursor = 0
        await Promise.all(
          Array.from({ length: 4 }, async () => {
            while (cursor < files.length) {
              const file = files[cursor++]
              const image = await fetch(imageOrigin + '/og/' + file, {
                method: 'HEAD',
                signal: AbortSignal.timeout(20000),
                redirect: 'error',
              })
              if (
                !image.ok ||
                !image.headers.get('content-type')?.startsWith('image/png')
              ) {
                throw new Error(
                  'Published OG image is not available on the CDN'
                )
              }
            }
          })
        )
        console.log(
          'Verified OG publication through assets.eufemia.dnb.no'
        )
        complete = true
        break
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 15000))
  }
  if (!complete) {
    throw new Error(
      'Timed out waiting for the internal OG publisher. Check the internal assets workflow.'
    )
  }
} finally {
  await rm(temporary, { recursive: true, force: true })
}
