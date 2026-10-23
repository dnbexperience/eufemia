import { afterEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { splitIssueBody } from '../../../scripts/portal-accessibility-report.mjs'

const workflow = fs.readFileSync(
  path.resolve(
    __dirname,
    '../../../../../.github/workflows/portal-accessibility-and-duplicate-ids.yml'
  ),
  'utf8'
)
const issueStep = workflow.split('      - name: Update rolling issue')[1]
const script = issueStep
  .split('          script: |\n')[1]
  .split('\n      - name:')[0]
  .split('\n')
  .map((line) => line.slice(12))
  .join('\n')
const AsyncFunction = Object.getPrototypeOf(
  async function () {}
).constructor

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('Portal accessibility issue lifecycle', () => {
  it('creates a new issue instead of reopening a closed one', async () => {
    const issues = await runIssueStep('closed', 2)

    expect(issues.create).toHaveBeenCalledOnce()
    expect(issues.update).not.toHaveBeenCalled()
    expect(issues.listComments).toHaveBeenCalledWith(
      expect.objectContaining({ issue_number: 2 })
    )
  })

  it('updates the current open issue while findings remain', async () => {
    const issues = await runIssueStep('open', 2)

    expect(issues.create).not.toHaveBeenCalled()
    expect(issues.update).toHaveBeenCalledWith(
      expect.objectContaining({
        issue_number: 1,
        body: 'Report\n\n[Full workflow report](https://github.com/owner/repo/actions/runs/3)',
      })
    )
  })

  it('leaves a closed issue untouched when the scan is clean', async () => {
    const issues = await runIssueStep('closed', 0)

    expect(issues.create).not.toHaveBeenCalled()
    expect(issues.update).not.toHaveBeenCalled()
    expect(issues.listComments).not.toHaveBeenCalled()
  })

  it('closes the current open issue when the scan becomes clean', async () => {
    const issues = await runIssueStep('open', 0)

    expect(issues.create).not.toHaveBeenCalled()
    expect(issues.update).toHaveBeenCalledWith(
      expect.objectContaining({ issue_number: 1, state: 'closed' })
    )
  })

  it('publishes a large change report in bounded comments', async () => {
    const changes = 'A resolved finding on a documentation page\n'.repeat(
      2000
    )
    const issues = await runIssueStep('open', 2, changes)
    const bodies = issues.createComment.mock.calls.map(
      ([comment]) => comment.body
    )

    expect(bodies.length).toBeGreaterThan(1)
    expect(bodies.every((body) => body.length <= 65536)).toBe(true)
    expect(bodies.join('')).toContain('A resolved finding')
  })
})

async function runIssueStep(
  state: 'open' | 'closed',
  findings: number,
  changes = ''
) {
  vi.stubEnv('REPORT_PATH', 'report.json')
  vi.stubEnv('ISSUE_PATH', 'issue.json')

  const issues = {
    listForRepo: vi.fn(async ({ state: requestedState }) =>
      requestedState === 'all' || requestedState === state
        ? [
            {
              number: 1,
              state,
              title: 'Portal accessibility and duplicate IDs',
            },
          ]
        : []
    ),
    listComments: vi.fn(async () => []),
    create: vi.fn(async () => ({ data: { number: 2 } })),
    update: vi.fn(async () => ({})),
    createComment: vi.fn(async ({ body }) => {
      if (body.length > 65536) {
        throw new Error('GitHub comment exceeds the length limit')
      }
    }),
    updateComment: vi.fn(),
    deleteComment: vi.fn(),
  }
  const github = {
    rest: { issues },
    paginate: async (method, options) => method(options),
  }
  const context = {
    repo: { owner: 'owner', repo: 'repo' },
    serverUrl: 'https://github.com',
    runId: 3,
  }
  const require = () => ({
    readFileSync: (file: string) =>
      JSON.stringify(
        file === 'report.json'
          ? { summary: { findings } }
          : {
              chunks: ['Report'],
              changeChunks: changes ? splitIssueBody(changes) : [],
            }
      ),
  })

  await new AsyncFunction('github', 'context', 'core', 'require', script)(
    github,
    context,
    { notice: vi.fn() },
    require
  )

  return issues
}
