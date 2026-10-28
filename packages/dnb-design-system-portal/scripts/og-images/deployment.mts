import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { realpathSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

export async function stampSite(site: string, runId: number) {
  if (!Number.isSafeInteger(runId) || runId <= 0) {
    throw new Error('Invalid Portal deployment reference')
  }
  await writeFile(
    path.join(site, 'og-deployment.json'),
    JSON.stringify({ runId }) + '\n'
  )
}

export async function checkDeployment(runId: number) {
  if (!Number.isSafeInteger(runId) || runId <= 0) {
    throw new Error('Invalid Portal deployment reference')
  }
  const response = await fetch(
    'https://eufemia.dnb.no/og-deployment.json',
    { signal: AbortSignal.timeout(20000) }
  )
  if (!response.ok || (await response.json()).runId !== runId) {
    throw new Error(
      'The Portal deployment changed. Run the social image workflow again.'
    )
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
) {
  if (process.argv[2] === 'check') {
    await checkDeployment(Number(process.env.OG_EXPECTED_RUN_ID))
  } else if (process.argv[2] === 'stamp') {
    const portal = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../..'
    )
    await stampSite(
      path.resolve(
        process.env.OG_SITE_OUTPUT || path.join(portal, 'public')
      ),
      Number(process.env.GITHUB_RUN_ID)
    )
  } else {
    throw new Error('Expected stamp or check')
  }
}
