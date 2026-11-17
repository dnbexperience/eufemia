import { readFileSync } from 'node:fs'
import path from 'node:path'
import { runInNewContext } from 'node:vm'
import { load } from 'js-yaml'

const workflow = load(
  readFileSync(
    path.resolve(
      __dirname,
      '../../../../../.github/workflows/preview.yml'
    ),
    'utf8'
  )
) as { jobs: Record<string, { if?: string }> }

// GitHub's startsWith/endsWith ignore case; any other identifier throws.
function deploysFor(headRef: string) {
  const condition = workflow.jobs['deploy-preview'].if
  if (!condition) {
    return true
  }

  const expression = condition.replace(
    /(startsWith|endsWith)\(github\.head_ref, '([^']*)'\)/g,
    (_, fn, value) =>
      `${JSON.stringify(headRef.toLowerCase())}.${fn}(${JSON.stringify(value.toLowerCase())})`
  )

  return runInNewContext(expression) as boolean
}

describe('portal preview workflow', () => {
  it.each([
    'wip/draft',
    'feat/button--skip-ci',
    'chore/report--visual-reports',
    'experiments/idea',
  ])('skips pull requests from %s', (headRef) => {
    expect(deploysFor(headRef)).toBe(false)
  })

  it.each(['fix/button', 'feat/wip-mode', 'docs/skip-ci-guide'])(
    'deploys pull requests from %s',
    (headRef) => {
      expect(deploysFor(headRef)).toBe(true)
    }
  )
})
