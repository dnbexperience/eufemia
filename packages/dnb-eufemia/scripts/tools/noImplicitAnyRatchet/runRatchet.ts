import { spawnSync } from 'child_process'

import {
  findImplicitAnyRegressions,
  noImplicitAnyAllowlist,
} from './ratchetLib.ts'

/**
 * Runs the TypeScript compiler with `--noImplicitAny` and fails only if a file
 * on the ratchet allowlist has regressed. See `ratchetLib.ts` for details.
 *
 * `--pretty false` keeps the diagnostics in the plain
 * `file(line,col): error TSxxxx: ...` format that `findImplicitAnyRegressions`
 * parses, regardless of whether the process is attached to a TTY.
 */
const result = spawnSync(
  'yarn',
  [
    'tsc',
    '--noEmit',
    '--noImplicitAny',
    '--pretty',
    'false',
    '-p',
    'tsconfig.json',
  ],
  { encoding: 'utf8', env: process.env }
)

// Guard against a spawn failure (e.g. tsc could not be started). Without this,
// stdout/stderr would be empty, which looks like "no regressions" and would let
// the ratchet pass silently even though nothing was actually type-checked.
if (result.error) {
  console.error(
    `noImplicitAny ratchet could not run tsc: ${result.error.message}`
  )
  process.exit(1)
}

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
