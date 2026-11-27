import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import {
  type HeldBackToken,
  makePropertiesLockFile,
  loadTokenModes,
  reviewTokenChanges,
} from './tokenReview.ts'

const [base = 'origin/main', output] = process.argv.slice(2)
const repositoryRoot = execFileSync(
  'git',
  ['rev-parse', '--show-toplevel'],
  { encoding: 'utf8' }
).trim()
const mergeBase = execFileSync('git', ['merge-base', 'HEAD', base], {
  cwd: repositoryRoot,
  encoding: 'utf8',
}).trim()
const lockPath = path.join(repositoryRoot, makePropertiesLockFile)
const heldBackTokens: HeldBackToken[] = existsSync(lockPath)
  ? JSON.parse(readFileSync(lockPath, 'utf8'))
  : []
const result = reviewTokenChanges(
  loadTokenModes(repositoryRoot, mergeBase),
  loadTokenModes(repositoryRoot),
  heldBackTokens
)

if (output) {
  writeFileSync(output, result.markdown)
} else {
  process.stdout.write(result.markdown)
}
if (result.regressions.length) {
  process.stderr.write(
    'Design token changes reduce contrast below a configured target. Review the token report.\n'
  )
  process.exitCode = 1
}
