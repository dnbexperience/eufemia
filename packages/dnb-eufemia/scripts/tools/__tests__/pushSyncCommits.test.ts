/**
 * Runs the scripts of the bundle-sync-commits and push-sync-commits actions
 * the way the sync workflows run them: the build job bundles its commits,
 * and the push job checks them and pushes them to the branch.
 */

import { execFileSync, spawnSync } from 'node:child_process'
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { load } from 'js-yaml'

const actions = path.resolve(__dirname, '../../../../../.github/actions')

type Step = { id?: string; name?: string; run?: string }

function readScript(action: string, isStep: (step: Step) => boolean) {
  const { runs } = load(
    readFileSync(path.join(actions, action, 'action.yml'), 'utf8')
  ) as { runs: { steps: Step[] } }
  const script = runs.steps.find(isStep)?.run
  if (!script) {
    throw new Error(`No script found in ${action}`)
  }
  return script
}

const bundleScript = readScript(
  'bundle-sync-commits',
  (step) => step.name === 'Bundle the commits'
)
const pushScript = readScript(
  'push-sync-commits',
  (step) => step.id === 'push'
)

let root: string

// No user or system git config, no GIT_* variables from a git hook that runs
// the tests, and a `gh` that does nothing for `gh auth setup-git`
function env(extra: Record<string, string> = {}) {
  return {
    ...Object.fromEntries(
      Object.entries(process.env).filter(
        ([key]) => !key.startsWith('GIT_')
      )
    ),
    HOME: path.join(root, 'home'),
    GIT_CONFIG_NOSYSTEM: '1',
    PATH: `${path.join(root, 'bin')}${path.delimiter}${process.env.PATH}`,
    ...extra,
  }
}

function git(cwd: string, ...args: string[]) {
  return execFileSync('git', args, {
    cwd,
    env: env(),
    encoding: 'utf8',
    stdio: 'pipe',
  }).trim()
}

function commit(
  repo: string,
  file: string,
  content: string,
  message: string
) {
  mkdirSync(path.dirname(path.join(repo, file)), { recursive: true })
  writeFileSync(path.join(repo, file), content)
  git(repo, 'add', file)
  git(repo, 'commit', '-q', '-m', message)
}

// The remote has `main` and the `sync` branch, and the build job has
// checked out `sync`
function setUp() {
  const origin = path.join(root, 'origin.git')
  const seed = path.join(root, 'seed')
  const build = path.join(root, 'build')
  git(root, 'init', '-q', '--bare', origin)
  git(root, 'init', '-q', seed)
  commit(seed, 'allowed/a.txt', 'a', 'Add an allowed file')
  commit(seed, 'other/b.txt', 'b', 'Add another file')
  git(
    seed,
    'push',
    '-q',
    origin,
    'HEAD:refs/heads/main',
    'HEAD:refs/heads/sync'
  )
  git(root, 'clone', '-q', '--branch', 'sync', origin, build)
  return { origin, build, base: git(build, 'rev-parse', 'HEAD') }
}

function bundleAndPush({ origin, build, base }: ReturnType<typeof setUp>) {
  const buildTemp = path.join(root, 'build-temp')
  const pushTemp = path.join(root, 'push-temp')
  const push = path.join(root, 'push')
  mkdirSync(buildTemp)
  mkdirSync(pushTemp)

  execFileSync(
    'bash',
    ['--noprofile', '--norc', '-eo', 'pipefail', '-c', bundleScript],
    {
      cwd: build,
      env: env({ RUNNER_TEMP: buildTemp, BASE: base, FILES: '' }),
      stdio: 'pipe',
    }
  )

  // The artifact upload and download
  cpSync(
    path.join(buildTemp, 'sync-commits'),
    path.join(pushTemp, 'sync-commits'),
    { recursive: true }
  )

  git(root, 'clone', '-q', origin, push)
  return spawnSync(
    'bash',
    ['--noprofile', '--norc', '-eo', 'pipefail', '-c', pushScript],
    {
      cwd: push,
      env: env({
        RUNNER_TEMP: pushTemp,
        GITHUB_OUTPUT: path.join(root, 'github-output'),
        GH_TOKEN: 'token',
        BRANCH: 'sync',
        REMOTE_SHA: base,
        ALLOWED_PATHS: 'allowed',
        VERIFY: '',
        GIT_NAME: '',
        GIT_EMAIL: '',
      }),
      encoding: 'utf8',
    }
  )
}

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'push-sync-commits-'))
  mkdirSync(path.join(root, 'home'))
  mkdirSync(path.join(root, 'bin'))
  writeFileSync(
    path.join(root, 'home', '.gitconfig'),
    '[user]\n\tname = Tests\n\temail = tests@example.com\n[init]\n\tdefaultBranch = main\n'
  )
  writeFileSync(path.join(root, 'bin', 'gh'), '#!/bin/sh\nexit 0\n', {
    mode: 0o755,
  })
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

describe('push-sync-commits', () => {
  it('pushes commits that change only the allowed paths', () => {
    const repo = setUp()
    commit(
      repo.build,
      'allowed/a.txt',
      'updated',
      'Update the allowed file'
    )

    const result = bundleAndPush(repo)

    expect(result.stdout).not.toContain('::error::')
    expect(result.status).toBe(0)
    expect(git(repo.origin, 'show', 'sync:allowed/a.txt')).toBe('updated')
  }, 30_000)

  it('rejects commits that change a file outside the allowed paths', () => {
    const repo = setUp()
    commit(repo.build, 'other/b.txt', 'changed', 'Change another file')

    const result = bundleAndPush(repo)

    expect(result.stdout).toContain(
      '::error::The commits change files outside the allowed paths:'
    )
    expect(result.status).toBe(1)
    expect(git(repo.origin, 'rev-parse', 'sync')).toBe(repo.base)
  }, 30_000)

  // git log lists no files for a merge commit, so without this rule a merge
  // could change any file
  it('rejects a merge commit', () => {
    const repo = setUp()
    git(repo.build, 'switch', '-q', '-c', 'side')
    commit(repo.build, 'allowed/c.txt', 'c', 'Add a file on a side branch')
    git(repo.build, 'switch', '-q', 'sync')
    commit(
      repo.build,
      'allowed/a.txt',
      'updated',
      'Update the allowed file'
    )
    git(repo.build, 'merge', '-q', '--no-ff', '--no-commit', 'side')
    writeFileSync(
      path.join(repo.build, 'other/b.txt'),
      'changed in the merge'
    )
    git(repo.build, 'add', 'other/b.txt')
    git(repo.build, 'commit', '-q', '-m', 'Merge the side branch')

    const result = bundleAndPush(repo)

    expect(result.stdout).toContain(
      '::error::The commits include a merge commit'
    )
    expect(result.status).toBe(1)
    expect(git(repo.origin, 'rev-parse', 'sync')).toBe(repo.base)
  }, 30_000)
})
