import { execFileSync } from 'node:child_process'
import { appendFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { getChangedFiles, planE2eTests } from './planner'

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  encoding: 'utf8',
}).trim()
const baseRef = process.env.E2E_TEST_BASE_REF || 'origin/main'
const args = process.argv.slice(2)
const explicitChanges = args
  .filter((arg) => arg.startsWith('--changed='))
  .map((arg) => arg.slice('--changed='.length))

try {
  const changedFiles =
    explicitChanges.length > 0
      ? explicitChanges
      : getChangedFiles(root, baseRef)
  const commit = execFileSync('git', ['log', '-1', '--pretty=%B'], {
    cwd: root,
    encoding: 'utf8',
  })
  const plan = planE2eTests({
    root,
    changedFiles,
    branch: process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME,
    forceAll:
      process.env.E2E_TEST_RUN_ALL === 'true' ||
      commit.includes('--run-all'),
  })
  console.log(JSON.stringify({ baseRef, changedFiles, ...plan }, null, 2))
  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = [
      '## E2E selection preview',
      '',
      plan.reason,
      '',
      'Selected ' +
        plan.tests.length +
        ' test files. The full suite still runs while selection is evaluated.',
      '',
      ...plan.tests.map(
        (file) =>
          '- ' +
          file +
          ': ' +
          (plan.causes[file] || ['Full coverage.']).join(' ')
      ),
      '',
    ]
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n'))
  }
  const output = args
    .find((arg) => arg.startsWith('--output='))
    ?.slice('--output='.length)
  if (output) {
    writeFileSync(
      path.resolve(output),
      JSON.stringify(plan, null, 2) + '\n'
    )
  }
} catch (error) {
  console.warn(
    'E2E selection preview unavailable. The full suite will run.',
    error
  )
}
