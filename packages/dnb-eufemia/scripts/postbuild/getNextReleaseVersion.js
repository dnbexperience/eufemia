/**
 * Get next package version number before release
 *
 */

// When on a "release" branch:
// run: yarn nodemon --exec 'babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/getNextReleaseVersion.js' --ext js --watch './scripts/**/*'

const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { Writable } = require('stream')
const simpleGit = require('simple-git')

const eufemiaRoot = path.resolve(__dirname, '..', '..')
const releaseBranches = ['release', 'beta', 'alpha']

// run this script if it is called from bash / command line
if (require.main === module) {
  getNextReleaseVersion()
}

async function getNextReleaseVersion({ cwd = eufemiaRoot } = {}) {
  const branchName = (await simpleGit(cwd).branch()).current

  if (!releaseBranches.includes(branchName)) {
    return null
  }

  try {
    return await resolveNextReleaseVersion(cwd)
  } catch (error) {
    console.warn(
      `Could not determine the next release version:\n${error.message}`
    )

    return null
  }
}

/**
 * semantic-release derives the version from the commits, but a regular run also
 * verifies the npm and GitHub credentials it would publish with – and the
 * release build job deliberately has none. Only the commit analyzer is needed
 * to get the version, and it needs no credentials, so run that plugin alone.
 */
async function resolveNextReleaseVersion(cwd) {
  const { default: semanticRelease } = await import('semantic-release')
  const { branches, plugins } = require(
    path.join(cwd, 'package.json')
  ).release
  const commitAnalyzer = plugins.find(
    (plugin) =>
      (Array.isArray(plugin) ? plugin[0] : plugin) ===
      '@semantic-release/commit-analyzer'
  )
  const mirror = createRepositoryMirror(cwd)
  const log = createLogCapture()

  // This hook only runs once the branch and the push check have passed, which
  // separates "nothing to release" from a run that never got that far
  let analysable = false

  try {
    const result = await semanticRelease(
      {
        branches,
        plugins: [
          commitAnalyzer,
          {
            verifyConditions: () => {
              analysable = true
            },
          },
        ],
        repositoryUrl: mirror.path,
        dryRun: true,
        // Report the version for a pull request build too, which
        // semantic-release skips when it runs as a release
        ci: false,
      },
      {
        cwd,
        env: withoutCiBranchDetection(process.env),
        stdout: log.stream,
        stderr: log.stream,
      }
    )

    if (result) {
      return result.nextRelease.version
    }

    if (analysable) {
      return null
    }

    throw new Error(log.read())
  } finally {
    mirror.remove()
  }
}

/**
 * semantic-release reads the branch from the CI environment, which is the
 * workflow's own ref – not necessarily the repository it is pointed at. Hiding
 * the GitHub Actions marker makes it fall back to reading the branch from that
 * repository, so the version always describes what is actually checked out.
 */
function withoutCiBranchDetection(processEnv) {
  const env = { ...processEnv }

  delete env.GITHUB_ACTIONS

  return env
}

/**
 * semantic-release verifies that it is allowed to push before it reports a
 * version, and it discovers the configured branches through the repository URL.
 * A throwaway bare clone covers both without credentials: `--shared` references
 * the existing object store instead of copying it, and the known branch heads
 * are added so the branch configuration resolves the same way it would against
 * the remote.
 */
function createRepositoryMirror(cwd) {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'eufemia-release-')
  )
  const mirrorPath = path.join(directory, 'repo.git')
  const repositoryRoot = git(cwd, ['rev-parse', '--show-toplevel'])

  git(cwd, [
    'clone',
    '--bare',
    '--shared',
    '--quiet',
    repositoryRoot,
    mirrorPath,
  ])

  const updates = Array.from(collectBranchHeads(cwd))
    .map(([name, hash]) => `update refs/heads/${name} ${hash}\n`)
    .join('')

  git(mirrorPath, ['update-ref', '--stdin'], { input: updates })

  return {
    path: mirrorPath,
    remove: () => fs.rmSync(directory, { recursive: true, force: true }),
  }
}

function collectBranchHeads(cwd) {
  const heads = new Map()

  const collect = (pattern, strip) => {
    const refs = git(cwd, [
      'for-each-ref',
      `--format=%(refname:lstrip=${strip}) %(objectname)`,
      pattern,
    ])

    for (const line of refs.split('\n').filter(Boolean)) {
      const [name, hash] = line.split(' ')

      // The remote HEAD is a symbolic ref, not a branch of its own
      if (name !== 'HEAD' && !heads.has(name)) {
        heads.set(name, hash)
      }
    }
  }

  // The checked-out branches are collected first and kept, so the mirror
  // agrees with what is built here wherever the two disagree
  collect('refs/heads', 2)
  collect('refs/remotes/origin', 3)

  return withoutRefPathCollisions(heads)
}

/**
 * A branch is stored as a path, so `portal` and `portal/page-toc` cannot both
 * exist – and `update-ref` applies its input as one transaction, where a single
 * name it cannot store abandons the whole mirror. Renaming a branch into a
 * folder of branches leaves exactly that pair behind in every clone that has
 * not pruned the stale remote ref yet, so drop the names that collide with a
 * branch already accounted for. The branch being released is never one of them:
 * it is checked out here, which rules out a local branch inside it.
 */
function withoutRefPathCollisions(heads) {
  const kept = new Map()
  const folders = new Set()

  for (const [name, hash] of heads) {
    const segments = name.split('/')
    const parents = segments
      .slice(0, -1)
      .map((_, index) => segments.slice(0, index + 1).join('/'))

    if (folders.has(name) || parents.some((parent) => kept.has(parent))) {
      continue
    }

    kept.set(name, hash)

    for (const parent of parents) {
      folders.add(parent)
    }
  }

  return kept
}

function git(cwd, args, options = {}) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    ...options,
  }).trim()
}

function createLogCapture() {
  const lines = []

  return {
    stream: new Writable({
      write(chunk, encoding, callback) {
        lines.push(String(chunk))
        callback()
      },
    }),
    read: () => lines.join('').trim(),
  }
}

exports.releaseBranches = releaseBranches
exports.getNextReleaseVersion = getNextReleaseVersion
