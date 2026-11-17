import { readFileSync } from 'node:fs'
import path from 'node:path'
import { runInNewContext } from 'node:vm'
import { load } from 'js-yaml'

type Step = {
  id?: string
  if?: string
  run?: string
  with?: { script: string }
}
const workflow = load(
  readFileSync(
    path.resolve(__dirname, '../../../../../.github/workflows/dev.yml'),
    'utf8'
  )
) as {
  on: { pull_request: { types: string[]; branches?: string[] } }
  permissions: Record<string, string>
  jobs: Record<
    string,
    {
      needs?: string
      if?: string
      permissions?: Record<string, string>
      outputs?: Record<string, string>
      steps: Step[]
    }
  >
}

const sha = 'a'.repeat(40)
const starterUrl =
  'https://pkg.pr.new/template/552cb919-f940-4145-981a-d83ecddc6cdf'
const openPr = {
  state: 'open',
  head: { sha, repo: { full_name: 'dnbexperience/eufemia' } },
}
const publishedCheck = {
  app: { slug: 'pkg-pr-new' },
  conclusion: 'success',
  output: { text: `- [eufemia-starter](${starterUrl})` },
}

function setup({
  pullRequests = [openPr],
  checks = [publishedCheck],
  payload = {},
}: {
  pullRequests?: (typeof openPr)[]
  checks?: {
    app?: { slug: string }
    conclusion: string
    output?: { text: string }
  }[]
  payload?: object
} = {}) {
  const summary = {
    addHeading: vi.fn().mockReturnThis(),
    addLink: vi.fn().mockReturnThis(),
    addCodeBlock: vi.fn().mockReturnThis(),
    write: vi.fn().mockResolvedValue(undefined),
  }
  const core = { summary, info: vi.fn() }
  const github = {
    paginate: vi
      .fn()
      .mockResolvedValueOnce(pullRequests)
      .mockResolvedValueOnce(checks),
    rest: {
      repos: {
        listPullRequestsAssociatedWithCommit: vi.fn(),
        createDeployment: vi.fn().mockResolvedValue({ data: { id: 123 } }),
        createDeploymentStatus: vi.fn().mockResolvedValue({}),
      },
      checks: { listForRef: vi.fn() },
    },
  }
  const context = {
    repo: { owner: 'dnbexperience', repo: 'eufemia' },
    sha,
    payload,
    serverUrl: 'https://github.com',
    runId: 456,
  }
  const script = workflow.jobs.deployment.steps[0].with.script
  const run = () =>
    runInNewContext(`(async () => {${script}})()`, {
      core,
      github,
      context,
    }) as Promise<void>

  return { run, summary, github, context }
}

describe('package preview deployment', () => {
  it('keeps publishing read-only and registers only published, trusted heads', () => {
    const publish = workflow.jobs.publish
    const step = publish.steps.find((step) => step.id === 'publish')
    expect(workflow.permissions).toEqual({ contents: 'read' })
    expect(publish.permissions).toBeUndefined()
    expect(step.run).toContain('--comment=off')
    expect(step.if).toBe(
      "steps.changes.outputs.packages-unaffected != 'true'"
    )
    expect(publish.outputs.sha).toBe('${{ steps.publish.outputs.sha }}')
    expect(workflow.on.pull_request.types).toContain('opened')
    expect(workflow.on.pull_request.branches).toBeUndefined()
    expect(workflow.jobs.deployment.needs).toBe('publish')
    expect(workflow.jobs.deployment.if).toContain(
      "needs.publish.outputs.sha != ''"
    )
    expect(workflow.jobs.deployment.if).toContain(
      "github.repository == 'dnbexperience/eufemia'"
    )
    expect(workflow.jobs.deployment.if).toContain(
      "github.actor != 'dependabot[bot]'"
    )
    expect(workflow.jobs.deployment.if).toContain(
      'github.event.pull_request.head.repo.full_name == github.repository'
    )
    expect(workflow.jobs.deployment.permissions).toEqual({
      contents: 'read',
      checks: 'read',
      'pull-requests': 'read',
      deployments: 'write',
    })
  })

  it('links one deployment to the summary with the starter and install command', async () => {
    const { run, summary, github } = setup()
    await run()

    expect(github.paginate).toHaveBeenNthCalledWith(
      2,
      github.rest.checks.listForRef,
      expect.objectContaining({
        ref: sha,
        check_name: 'Continuous Releases',
      })
    )
    expect(summary.addLink).toHaveBeenCalledWith(
      'Open eufemia-starter',
      starterUrl
    )
    expect(summary.addCodeBlock).toHaveBeenCalledWith(
      `yarn add @dnb/eufemia@https://pkg.pr.new/@dnb/eufemia@${sha}.tgz`,
      'sh'
    )
    expect(
      github.rest.repos.createDeployment
    ).toHaveBeenCalledExactlyOnceWith({
      owner: 'dnbexperience',
      repo: 'eufemia',
      ref: sha,
      environment: 'Package preview',
      transient_environment: true,
      production_environment: false,
      required_contexts: [],
      auto_merge: false,
    })
    expect(github.rest.repos.createDeploymentStatus).toHaveBeenCalledWith({
      owner: 'dnbexperience',
      repo: 'eufemia',
      deployment_id: 123,
      state: 'success',
      environment_url:
        'https://github.com/dnbexperience/eufemia/actions/runs/456',
      log_url: 'https://github.com/dnbexperience/eufemia/actions/runs/456',
      description:
        'Open the starter preview or copy the package install command',
      auto_inactive: false,
    })
  })

  it('uses the PR head instead of the synthetic merge commit on opening a PR', async () => {
    const { run, github, context } = setup({
      payload: { pull_request: { head: { sha } } },
    })
    context.sha = 'b'.repeat(40)
    await run()
    expect(github.rest.repos.createDeployment).toHaveBeenCalledWith(
      expect.objectContaining({ ref: sha })
    )
  })

  it.each([
    { pullRequests: [] },
    { pullRequests: [{ ...openPr, state: 'closed' }] },
    {
      pullRequests: [
        { ...openPr, head: { ...openPr.head, sha: 'b'.repeat(40) } },
      ],
    },
    {
      pullRequests: [
        {
          ...openPr,
          head: { sha, repo: { full_name: 'someone/eufemia' } },
        },
      ],
    },
  ])(
    'does not deploy without a current open PR head (%j)',
    async ({ pullRequests }) => {
      const { run, github, summary } = setup({ pullRequests })
      await run()
      expect(github.rest.repos.createDeployment).not.toHaveBeenCalled()
      expect(summary.write).not.toHaveBeenCalled()
    }
  )

  it.each([
    { checks: [] },
    { checks: [{ ...publishedCheck, app: { slug: 'another-app' } }] },
    { checks: [{ ...publishedCheck, conclusion: 'failure' }] },
    { checks: [{ ...publishedCheck, output: undefined }] },
    {
      checks: [
        {
          ...publishedCheck,
          output: { text: '- [eufemia-starter](https://example.com)' },
        },
      ],
    },
  ])(
    'does not register an unavailable or untrusted starter (%j)',
    async ({ checks }) => {
      const { run, github } = setup({ checks })
      await expect(run()).rejects.toThrow(
        'no eufemia-starter preview link'
      )
      expect(github.rest.repos.createDeployment).not.toHaveBeenCalled()
    }
  )

  it('keeps the summary when GitHub deployment registration fails', async () => {
    const { run, github, summary } = setup()
    github.rest.repos.createDeployment.mockRejectedValue(
      new Error('API unavailable')
    )
    await expect(run()).rejects.toThrow('API unavailable')
    expect(summary.write).toHaveBeenCalledOnce()
  })
})
