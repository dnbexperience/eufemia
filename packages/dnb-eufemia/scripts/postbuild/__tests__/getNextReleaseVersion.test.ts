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
import { getNextReleaseVersion } from '../getNextReleaseVersion'

const fixtures: Array<string> = []

function createRepository(branch = 'release') {
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
        branches: [branch],
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

  return { cwd, commit }
}

afterAll(() => {
  for (const fixture of fixtures) {
    rmSync(fixture, { recursive: true, force: true })
  }
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

    expect(await getNextReleaseVersion({ cwd })).toBeNull()
  })

  it('returns null when not on a release branch', async () => {
    const { cwd, commit } = createRepository('feat/some-branch')
    commit('feat: add a component')

    expect(await getNextReleaseVersion({ cwd })).toBeNull()
  })
})
