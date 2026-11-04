import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { loadTokenModes, reviewTokenChanges } from './tokenReview.ts'

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
const result = reviewTokenChanges(
  loadTokenModes(repositoryRoot, mergeBase),
  loadTokenModes(repositoryRoot)
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
