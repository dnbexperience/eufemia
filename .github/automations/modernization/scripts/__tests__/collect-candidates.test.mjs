import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const repositoryRoot = new URL('../../../../../', import.meta.url).pathname
const script = new URL('../../collect-candidates.mjs', import.meta.url)
  .pathname
const registry = new URL('../../candidates.json', import.meta.url).pathname
const temporaryDirectory = mkdtempSync(
  join(tmpdir(), 'modernization-candidates-')
)
const output = join(temporaryDirectory, 'candidates.json')

try {
  execFileSync(process.execPath, [script, registry, output], {
    cwd: repositoryRoot,
  })
  const result = JSON.parse(readFileSync(output, 'utf8'))

  if (result.summary.registered !== 4 || result.summary.present !== 4) {
    throw new Error('Expected every registered candidate to have evidence')
  }

  const structuredClone = result.candidates.find(
    ({ id }) => id === 'structured-clone-polyfill'
  )
  if (structuredClone.eligible) {
    throw new Error('structuredClone must remain blocked by Safari 14.1')
  }
  if (
    !structuredClone.browsers.some(
      ({ browser, supported }) => browser === 'Safari' && !supported
    )
  ) {
    throw new Error('Expected an explicit Safari blocker')
  }

  const whereFallback = result.candidates.find(
    ({ id }) => id === 'where-selector-fallback'
  )
  if (!whereFallback.eligible) {
    throw new Error(':where() fallback should be eligible for review')
  }

  const invalidRegistry = join(temporaryDirectory, 'invalid.json')
  writeFileSync(
    invalidRegistry,
    JSON.stringify({
      schemaVersion: 1,
      candidates: [
        {
          id: 'invalid',
          title: 'Invalid',
          compatKey: 'api.notARealApi',
          files: [],
          evidencePatterns: [],
          reason: 'Invalid fixture',
        },
      ],
    })
  )

  let rejected = false
  try {
    execFileSync(process.execPath, [script, invalidRegistry, output], {
      cwd: repositoryRoot,
      stdio: 'pipe',
    })
  } catch {
    rejected = true
  }
  if (!rejected) {
    throw new Error('Expected an unknown compatibility key to fail')
  }

  console.log('modernization candidate tests passed')
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}
