/**
 * Test the credential-free next release version resolution.
 *
 * The release build job runs without Git, npm or GitHub credentials, so these
 * fixtures deliberately have no reachable remote: a resolution that needs one
 * would fail here the same way it would fail a release.
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  getNextReleaseVersion,
  isReleaseBranch,
} from '../getNextReleaseVersion'

const fixtures: Array<string> = []

type ConfiguredBranch = string | { name: string; prerelease?: string }

function createRepository({
  branch = 'release',
  configuredBranches = [branch] as Array<ConfiguredBranch>,
} = {}) {
  const cwd = mkdtempSync(path.join(tmpdir(), 'eufemia-next-version-'))
  fixtures.push(cwd)

  const git = (...args: Array<string>) =>
    execFileSync('git', args, { cwd, stdio: ['pipe', 'pipe', 'pipe'] })

  git('init', '--quiet', `--initial-branch=${branch}`)
  git('config', 'user.email', 'test@dnb.no')
  git('config', 'user.name', 'Eufemia test')
  git('config', 'commit.gpgsign', 'false')

  // semantic-release fetches from `origin` before it reads the branches
  git('remote', 'add', 'origin', cwd)

  writeFileSync(
    path.join(cwd, 'package.json'),
    JSON.stringify({
      name: 'fixture',
      version: '1.0.0',
      release: {
        branches: configuredBranches,
        plugins: [
          [
            '@semantic-release/commit-analyzer',
            { preset: 'conventionalcommits' },
          ],
        ],
      },
    })
  )

  const commit = (message: string) => {
    git('add', '--all')
    git('commit', '--quiet', '--allow-empty', '--message', message)
  }

  commit('chore: initial commit')
  git('tag', 'v1.0.0')

  for (const name of configuredBranches) {
    if (typeof name === 'string' && name !== branch) {
      git('branch', name)
    }
  }

  return { cwd, commit, git }
}

afterAll(() => {
  for (const fixture of fixtures) {
    rmSync(fixture, { recursive: true, force: true })
  }
})

describe('isReleaseBranch', () => {
  // Asserted against the package's own `release.branches`, so this fails if the
  // two ever drift apart again
  it.each(['release', 'next', 'beta', 'alpha', '10.x', '11.2.x', '1.x'])(
    'matches %s',
    (branch) => {
      expect(isReleaseBranch(branch)).toBe(true)
    }
  )

  it.each([
    'main',
    'fix/something',
    'HEAD',
    '10.x-something',
    'v10.x',
    '',
  ])('does not match %s', (branch) => {
    expect(isReleaseBranch(branch)).toBe(false)
  })

  it('matches the branches a repository configures', () => {
    const { cwd } = createRepository({
      branch: 'release',
      configuredBranches: ['some-other-branch'],
    })

    expect(isReleaseBranch('some-other-branch', { cwd })).toBe(true)
    expect(isReleaseBranch('release', { cwd })).toBe(false)
  })
})

describe('getNextReleaseVersion', () => {
  it('resolves a minor version from a feature commit', async () => {
    const { cwd, commit } = createRepository()
    commit('feat: add a component')

    expect(await getNextReleaseVersion({ cwd })).toBe('1.1.0')
  })

  it('resolves a patch version from a fix commit', async () => {
    const { cwd, commit } = createRepository()
    commit('fix: correct a component')

    expect(await getNextReleaseVersion({ cwd })).toBe('1.0.1')
  })

  it('resolves a major version from a breaking change', async () => {
    const { cwd, commit } = createRepository()
    commit('feat: remove a component\n\nBREAKING CHANGE: it is gone')

    expect(await getNextReleaseVersion({ cwd })).toBe('2.0.0')
  })

  it('resolves from the checked-out branch, not from the CI ref', async () => {
    const { cwd, commit } = createRepository()
    commit('feat: add a component')

    vi.stubEnv('GITHUB_ACTIONS', 'true')
    vi.stubEnv('GITHUB_REF', 'refs/heads/some-other-branch')
    vi.stubEnv('GITHUB_REF_NAME', 'some-other-branch')

    try {
      expect(await getNextReleaseVersion({ cwd })).toBe('1.1.0')
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it('resolves without writing to the log', async () => {
    const { cwd, commit } = createRepository()
    commit('feat: add a component')

    const warn = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined)
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    const log = vi
      .spyOn(console, 'log')
      .mockImplementation(() => undefined)

    await getNextReleaseVersion({ cwd })

    expect(warn).not.toHaveBeenCalled()
    expect(error).not.toHaveBeenCalled()
    expect(log).not.toHaveBeenCalled()

    warn.mockRestore()
    error.mockRestore()
    log.mockRestore()
  })

  it('returns null when no commit warrants a release', async () => {
    const { cwd } = createRepository()
    const warn = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined)

    expect(await getNextReleaseVersion({ cwd })).toBeNull()
    expect(warn).not.toHaveBeenCalled()

    warn.mockRestore()
  })

  it('throws with the reason when the version cannot be resolved', async () => {
    const { cwd, commit } = createRepository({
      configuredBranches: [{ name: 'release', prerelease: '@@' }],
    })
    commit('feat: add a component')

    await expect(getNextReleaseVersion({ cwd })).rejects.toThrow(
      'semantic-release'
    )
  })

  it('resolves when a renamed branch left a colliding remote ref behind', async () => {
    const { cwd, commit, git } = createRepository()
    commit('feat: add a component')

    // Renaming a branch into a folder of branches leaves a remote ref that
    // cannot coexist with the ones that replaced it, and a clone only drops it
    // once it is pruned
    git('branch', 'portal/page-toc')
    git('update-ref', 'refs/remotes/origin/portal', 'HEAD')

    expect(await getNextReleaseVersion({ cwd })).toBe('1.1.0')
  })

  it('returns null when not on a release branch', async () => {
    const { cwd, commit } = createRepository({
      branch: 'feat/some-branch',
      configuredBranches: ['release'],
    })
    commit('feat: add a component')

    expect(await getNextReleaseVersion({ cwd })).toBeNull()
  })
})
