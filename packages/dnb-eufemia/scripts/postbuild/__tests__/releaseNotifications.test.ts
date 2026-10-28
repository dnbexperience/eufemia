import { execFileSync } from 'node:child_process'
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { load } from 'js-yaml'
import { success } from '../releaseNotification.ts'
import { notifyRelease } from '../notifyRelease.ts'
import type { ReleaseNotification } from '../releaseNotification.ts'

const packageRoot = path.resolve(__dirname, '../../..')
const release: ReleaseNotification = {
  version: '11.16.2',
  gitTag: 'v11.16.2',
  commits: [{ hash: 'included', message: 'fix: a change' }],
}

describe('published release details', () => {
  let directory: string

  beforeEach(() => {
    directory = mkdtempSync(path.join(tmpdir(), 'eufemia-notification-'))
  })

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true })
  })

  const record = (
    notificationFile: string,
    outputFile?: string,
    notification = release
  ) =>
    success(undefined, {
      nextRelease: notification,
      commits: notification.commits,
      env: {
        RELEASE_NOTIFICATION_FILE: notificationFile,
        GITHUB_OUTPUT: outputFile,
      },
      logger: { warn: vi.fn() },
    } as never)

  it('records the exact commits for releases and channel promotions', () => {
    const notificationFile = path.join(directory, 'release.json')
    const outputFile = path.join(directory, 'output')
    record(notificationFile, outputFile, { ...release, channel: 'beta' })
    record(notificationFile, outputFile)

    expect(JSON.parse(readFileSync(notificationFile, 'utf8'))).toEqual([
      { ...release, channel: 'beta' },
      release,
    ])
    expect(readFileSync(outputFile, 'utf8')).toBe(
      'notifications=true\nnotifications=true\n'
    )
  })

  it('does nothing outside the notification workflow', () => {
    expect(() => record(undefined)).not.toThrow()
    expect(existsSync(path.join(directory, 'release.json'))).toBe(false)
  })

  it('does not fail publishing if metadata cannot be saved', () => {
    const outputFile = path.join(directory, 'output')
    expect(() =>
      record(path.join(directory, 'missing', 'release.json'), outputFile)
    ).not.toThrow()
    expect(readFileSync(outputFile, 'utf8')).toBe('notifications=true\n')
  })

  it('runs the publish entry point against a local repository and exports the actual release', () => {
    const git = (...args: Array<string>) =>
      execFileSync('git', args, { cwd: directory, stdio: 'pipe' })
    git('init', '--quiet', '--initial-branch=release')
    git('config', 'user.email', 'test@dnb.no')
    git('config', 'user.name', 'Eufemia test')
    git('config', 'commit.gpgsign', 'false')
    git('remote', 'add', 'origin', directory)

    const plugin = path.join(directory, 'release.cjs')
    writeFileSync(
      plugin,
      `module.exports = {
      analyzeCommits: () => 'patch',
      publish: () => ({ name: 'Local fixture' }),
    }`
    )
    writeFileSync(
      path.join(directory, 'package.json'),
      JSON.stringify({
        name: 'release-fixture',
        version: '1.0.0',
        release: {
          repositoryUrl: directory,
          branches: ['release'],
          ci: false,
          plugins: [
            plugin,
            path.join(
              packageRoot,
              'scripts/postbuild/releaseNotification.ts'
            ),
          ],
        },
      })
    )
    git('add', '.')
    git('commit', '--quiet', '--message', 'chore: initial commit')
    git('tag', 'v1.0.0')
    git(
      'commit',
      '--quiet',
      '--allow-empty',
      '--message',
      'fix: regression'
    )
    const hash = git('rev-parse', 'HEAD').toString().trim()
    const notificationFile = path.join(directory, 'release.json')
    const outputFile = path.join(directory, 'output')

    execFileSync(
      process.execPath,
      [
        path.resolve(
          packageRoot,
          '../../node_modules/semantic-release/bin/semantic-release.js'
        ),
      ],
      {
        cwd: directory,
        stdio: 'pipe',
        env: {
          ...process.env,
          GITHUB_ACTIONS: '',
          GITHUB_REF: '',
          GITHUB_HEAD_REF: '',
          RELEASE_NOTIFICATION_FILE: notificationFile,
          GITHUB_OUTPUT: outputFile,
        },
      }
    )

    expect(JSON.parse(readFileSync(notificationFile, 'utf8'))).toEqual([
      {
        version: '1.0.1',
        gitTag: 'v1.0.1',
        channel: null,
        commits: [{ hash, message: 'fix: regression' }],
      },
    ])
    expect(readFileSync(outputFile, 'utf8')).toBe('notifications=true\n')
  })
})

function createGitHub() {
  const comments = new Map<number, Array<{ body: string }>>()
  const prs = new Map<string, Array<object>>()
  const request = vi.fn(async (route, parameters) => {
    if (route.endsWith('/comments')) {
      const previous = comments.get(parameters.issue_number) || []
      previous.push({ body: parameters.body })
      comments.set(parameters.issue_number, previous)
    }
  })
  const paginate = vi.fn(async (route, parameters) => {
    if (route.includes('/commits/{commit_sha}/pulls')) {
      return prs.get(parameters.commit_sha) || []
    }
    if (route.endsWith('/commits')) {
      return [{ sha: 'outside' }]
    }
    if (route.endsWith('/comments')) {
      return comments.get(parameters.issue_number) || []
    }
    throw new Error(`Unexpected route: ${route}`)
  })

  return { request, paginate, prs, comments }
}

const pr = (number: number, overrides = {}) => ({
  number,
  merged_at: '2026-10-28T12:00:00Z',
  merge_commit_sha: 'included',
  base: { repo: { full_name: 'dnbexperience/eufemia' } },
  body: '',
  ...overrides,
})

describe('release notifications', () => {
  const run = (github, notification = release) =>
    notifyRelease({
      github,
      owner: 'dnbexperience',
      repo: 'eufemia',
      release: notification,
      pause: async () => {},
    })

  it('handles large releases one commit at a time and deduplicates PRs', async () => {
    const github = createGitHub()
    const commits = Array.from({ length: 105 }, (_, index) => ({
      hash: `hash${index}`,
      message: 'fix: change',
    }))
    let active = 0
    let maxActive = 0
    const paginate = github.paginate.getMockImplementation()
    github.paginate.mockImplementation(async (route, parameters) => {
      active++
      maxActive = Math.max(active, maxActive)
      await Promise.resolve()
      active--
      return paginate(route, parameters)
    })
    for (const { hash } of commits) {
      github.prs.set(hash, [pr(123, { merge_commit_sha: 'hash0' })])
    }

    await run(github, { ...release, commits })

    expect(maxActive).toBe(1)
    expect(
      github.paginate.mock.calls.filter(([route]) =>
        route.includes('/commits/{commit_sha}/pulls')
      )
    ).toHaveLength(105)
    expect(
      github.request.mock.calls.filter(([route]) =>
        route.endsWith('/comments')
      )
    ).toHaveLength(1)
    expect(github.request).toHaveBeenCalledWith(
      expect.stringContaining('/comments'),
      expect.objectContaining({
        issue_number: 123,
        body: expect.stringContaining('in version 11.16.2'),
      })
    )
  })

  it('skips open PRs, foreign repositories and unrelated merged PRs', async () => {
    const github = createGitHub()
    github.prs.set('included', [
      pr(1, { merged_at: null }),
      pr(2, { base: { repo: { full_name: 'another/repo' } } }),
      pr(3, { merge_commit_sha: 'outside' }),
    ])

    await run(github)

    expect(github.request).not.toHaveBeenCalled()
  })

  it('recognizes merge and rebase commits in a released PR', async () => {
    const github = createGitHub()
    github.prs.set('included', [pr(123, { merge_commit_sha: 'other' })])
    const paginate = github.paginate.getMockImplementation()
    github.paginate.mockImplementation(async (route, parameters) => {
      return route.endsWith('/commits')
        ? [{ sha: 'included' }]
        : paginate(route, parameters)
    })

    await run(github)

    expect(github.request).toHaveBeenCalledWith(
      expect.stringContaining('/comments'),
      expect.objectContaining({ issue_number: 123 })
    )
  })

  it('retries labels without duplicating comments and distinguishes versions', async () => {
    const github = createGitHub()
    github.prs.set('included', [pr(123)])
    const request = github.request.getMockImplementation()
    github.request.mockImplementationOnce(request)
    github.request.mockRejectedValueOnce(new Error('label failed'))

    await expect(run(github)).rejects.toThrow(
      'Some release notifications failed'
    )
    await run(github)
    await run(github, {
      ...release,
      version: '11.17.0-beta.1',
      gitTag: 'v11.17.0-beta.1',
      channel: 'beta',
    })

    expect(github.comments.get(123)).toHaveLength(2)
    expect(github.request).toHaveBeenLastCalledWith(
      expect.stringContaining('/labels'),
      expect.objectContaining({ labels: ['released on @beta'] })
    )
  })

  it('continues notifying other PRs when one fails, then reports failure', async () => {
    const github = createGitHub()
    github.prs.set('included', [pr(1), pr(2)])
    github.request.mockRejectedValueOnce(new Error('comment failed'))

    await expect(run(github)).rejects.toThrow(
      'Some release notifications failed'
    )

    expect(github.comments.get(2)).toHaveLength(1)
  })

  it('confirms the same version when promoted to another channel', async () => {
    const github = createGitHub()
    github.prs.set('included', [pr(123)])

    await run(github, { ...release, channel: 'next' })
    await run(github)
    await run(github)

    expect(github.comments.get(123)).toHaveLength(2)
    expect(github.request).toHaveBeenLastCalledWith(
      expect.stringContaining('/labels'),
      expect.objectContaining({ labels: ['released'] })
    )
  })

  it('keeps confirmations on issues resolved in PR bodies and commits', async () => {
    const github = createGitHub()
    github.prs.set('included', [
      pr(123, { body: 'Fixes #20, fixes other/repo#30' }),
    ])

    await run(github, {
      ...release,
      commits: [
        { hash: 'included', message: 'fix: change\n\nCloses #21' },
      ],
    })

    expect([...github.comments.keys()]).toEqual([123, 21, 20])
    expect(github.comments.get(20)[0].body).toContain(
      'issue has been resolved'
    )
  })

  it('continues discovery after a failed commit lookup and reports it', async () => {
    const github = createGitHub()
    github.prs.set('included', [pr(123)])
    github.paginate.mockRejectedValueOnce(new Error('lookup failed'))

    await expect(
      run(github, {
        ...release,
        commits: [
          { hash: 'unavailable', message: 'fix: another change' },
          ...release.commits,
        ],
      })
    ).rejects.toThrow('Some release notifications failed')

    expect(github.comments.get(123)).toHaveLength(1)
  })

  it('recognizes comments left by the previous release plugin', async () => {
    const github = createGitHub()
    github.prs.set('included', [pr(123)])
    github.comments.set(123, [
      {
        body: ':tada: This PR is included in version 11.16.2 :tada:\n\nYour **[semantic-release](https://github.com/semantic-release/semantic-release)** bot',
      },
    ])

    await run(github)

    expect(github.comments.get(123)).toHaveLength(1)
    expect(github.request).toHaveBeenCalledWith(
      expect.stringContaining('/labels'),
      expect.objectContaining({ issue_number: 123 })
    )
  })
})

describe('release notification isolation', () => {
  it('disables the expensive notification lookup in the publish plugin', () => {
    const manifest = JSON.parse(
      readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
    )
    const [, options] = manifest.release.plugins.find(
      (plugin) =>
        Array.isArray(plugin) && plugin[0] === '@semantic-release/github'
    )

    expect(options.successCommentCondition).toBe(false)
    expect(options.assets).toBe('../dist/*.tgz')
  })

  it('runs notifications beside the SBOM and deployment jobs', () => {
    const workflow = load(
      readFileSync(
        path.resolve(packageRoot, '../../.github/workflows/release.yml'),
        'utf8'
      )
    ) as { jobs: Record<string, { needs: string; permissions: object }> }

    expect(workflow.jobs['notify-release']?.needs).toBe('action')
    expect(workflow.jobs.sbom.needs).toBe('action')
    expect(workflow.jobs['deploy-portal'].needs).toBe('action')
    expect(workflow.jobs['notify-release']?.permissions).toEqual({
      contents: 'read',
      'pull-requests': 'write',
      issues: 'write',
    })
  })
})
