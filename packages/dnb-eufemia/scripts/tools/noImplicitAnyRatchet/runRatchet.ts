import { spawnSync } from 'child_process'

import {
  findImplicitAnyRegressions,
  noImplicitAnyAllowlist,
} from './ratchetLib.ts'

/**
 * Runs the TypeScript compiler with `--noImplicitAny` and fails only if a file
 * on the ratchet allowlist has regressed. See `ratchetLib.ts` for details.
 */
const result = spawnSync(
  'yarn',
  ['tsc', '--noEmit', '--noImplicitAny', '-p', 'tsconfig.json'],
  { encoding: 'utf8', env: process.env }
)

const output = `${result.stdout ?? ''}${result.stderr ?? ''}`
const regressions = findImplicitAnyRegressions(
  output,
  noImplicitAnyAllowlist
)

if (regressions.length > 0) {
  console.error(
    'noImplicitAny ratchet failed – these allowlisted files have implicit-any errors again:'
  )
  for (const file of regressions) {
    console.error(`  - ${file}`)
  }
  console.error(
    '\nFix the errors, or (if intentional) remove the file from the allowlist in scripts/tools/noImplicitAnyRatchet/ratchetLib.ts'
  )
  process.exit(1)
}

console.log(
  `noImplicitAny ratchet passed – ${noImplicitAnyAllowlist.length} file(s) enforced.`
)
