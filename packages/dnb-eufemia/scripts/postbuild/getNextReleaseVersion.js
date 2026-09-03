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
      `Could not determine the next release version: ${error.message}`
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

  try {
    const result = await semanticRelease(
      {
        branches,
        plugins: [commitAnalyzer],
        repositoryUrl: mirror.path,
        dryRun: true,
        // Report the version for a pull request build too, which
        // semantic-release skips when it runs as a release
        ci: false,
      },
      {
        cwd,
        env: process.env,
        stdout: createSink(),
        stderr: createSink(),
      }
    )

    return result ? result.nextRelease.version : null
  } finally {
    mirror.remove()
  }
}

/**
 * semantic-release verifies that it is allowed to push before it reports a
 * version, and it discovers the configured branches through the repository URL.
 * A throwaway bare clone covers both without credentials: `--shared` references
 * the existing object store instead of copying it, and every known branch head
 * is added so the branch configuration resolves the same way it would against
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
      if (name !== 'HEAD') {
        heads.set(name, hash)
      }
    }
  }

  collect('refs/remotes/origin', 3)

  // The checked-out branches win, so the mirror agrees with what is built here
  collect('refs/heads', 2)

  return heads
}

function git(cwd, args, options = {}) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    ...options,
  }).trim()
}

function createSink() {
  return new Writable({
    write(chunk, encoding, callback) {
      callback()
    },
  })
}

exports.releaseBranches = releaseBranches
exports.getNextReleaseVersion = getNextReleaseVersion
