import { execFile, execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { promisify } from 'node:util'
import {
  extractUrls,
  isGeneratedDependencyPullRequest,
  isReleaseTag,
  parsePreviousTag,
  parsePullNumber,
  parseReleaseVersion,
} from './release-utils.mjs'

const [runPath, outputPath] = process.argv.slice(2)
const repository = process.env.GITHUB_REPOSITORY
const run = JSON.parse(readFileSync(runPath, 'utf8'))

if (
  !repository ||
  run.conclusion !== 'success' ||
  run.head_branch !== 'release'
) {
  throw new Error(
    'Release context requires a successful release-branch run'
  )
}

const execute = (command, args) =>
  execFileSync(command, args, { encoding: 'utf8' }).trim()
const ghJson = (args) => JSON.parse(execute('gh', args))
const executeAsync = promisify(execFile)
const ghJsonAsync = async (args) => {
  const { stdout } = await executeAsync('gh', args, {
    encoding: 'utf8',
    maxBuffer: 5 * 1024 * 1024,
  })
  return JSON.parse(stdout)
}
const mapConcurrent = async (values, concurrency, callback) => {
  const results = new Array(values.length)
  let nextIndex = 0

  const worker = async () => {
    while (nextIndex < values.length) {
      const index = nextIndex++
      results[index] = await callback(values[index], index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () =>
      worker()
    )
  )
  return results
}
const version = parseReleaseVersion(run.display_title)

if (!version) {
  throw new Error(
    `Cannot determine release version from: ${run.display_title}`
  )
}

const release = ghJson([
  'release',
  'view',
  version,
  '--repo',
  repository,
  '--json',
  'tagName,url,name,publishedAt,body,targetCommitish',
])

if (release.tagName !== version) {
  throw new Error(`Published release tag does not match ${version}`)
}

execute('git', [
  'merge-base',
  '--is-ancestor',
  run.head_sha,
  release.tagName,
])

let previousTag = parsePreviousTag(release.body, release.tagName)

if (!previousTag) {
  const releases = ghJson([
    'release',
    'list',
    '--repo',
    repository,
    '--limit',
    '100',
    '--json',
    'tagName,publishedAt,isDraft',
  ]).filter((entry) => !entry.isDraft)
  const currentIndex = releases.findIndex(
    (entry) => entry.tagName === release.tagName
  )
  previousTag = releases[currentIndex + 1]?.tagName ?? null
}

if (!previousTag || !isReleaseTag(previousTag)) {
  throw new Error(`Cannot determine the release before ${release.tagName}`)
}

execute('git', [
  'merge-base',
  '--is-ancestor',
  previousTag,
  release.tagName,
])

let releasePullRequests = []
try {
  releasePullRequests = ghJson([
    'api',
    '-H',
    'Accept: application/vnd.github+json',
    `repos/${repository}/commits/${run.head_sha}/pulls`,
  ])
} catch {
  releasePullRequests = []
}

let releasePullRequest = releasePullRequests.find(
  (pullRequest) =>
    pullRequest.base?.ref === 'release' && pullRequest.merged_at
)

if (!releasePullRequest) {
  const pullNumber = parsePullNumber(run.display_title)
  if (pullNumber) {
    releasePullRequest = ghJson([
      'api',
      `repos/${repository}/pulls/${pullNumber}`,
    ])
  }
}

if (
  !releasePullRequest ||
  releasePullRequest.base?.ref !== 'release' ||
  !releasePullRequest.merged_at ||
  releasePullRequest.merge_commit_sha !== run.head_sha
) {
  throw new Error('Cannot resolve the merged release pull request')
}

const commitShas = execute('git', [
  'rev-list',
  '--reverse',
  '--no-merges',
  `${previousTag}..${release.tagName}`,
])
  .split('\n')
  .filter(Boolean)
const sourcePullRequests = new Map()
const directCommits = []
const commits = commitShas
  .map((sha) => {
    const message = execute('git', ['show', '-s', '--format=%B', sha])
    return {
      sha,
      message,
      subject: message.split('\n')[0],
    }
  })
  .filter(
    ({ subject }) => !/^(release of |chore\(release\):)/i.test(subject)
  )
const pullNumbers = [
  ...new Set(
    commits.map(({ subject }) => parsePullNumber(subject)).filter(Boolean)
  ),
]
const pullRequests = await mapConcurrent(
  pullNumbers,
  8,
  async (pullNumber) => {
    try {
      return await ghJsonAsync([
        'api',
        `repos/${repository}/pulls/${pullNumber}`,
      ])
    } catch {
      return null
    }
  }
)
const pullRequestsByNumber = new Map(
  pullRequests
    .filter(Boolean)
    .map((pullRequest) => [pullRequest.number, pullRequest])
)
const unmatchedCommits = commits.filter(
  ({ subject }) => !pullRequestsByNumber.has(parsePullNumber(subject))
)
const associatedPullRequests = await mapConcurrent(
  unmatchedCommits,
  8,
  async ({ sha }) => {
    try {
      const candidates = await ghJsonAsync([
        'api',
        '-H',
        'Accept: application/vnd.github+json',
        `repos/${repository}/commits/${sha}/pulls`,
      ])
      return candidates.find(
        (pullRequest) =>
          pullRequest.merged_at &&
          pullRequest.base?.ref === releasePullRequest.head?.ref
      )
    } catch {
      return null
    }
  }
)
const associatedPullRequestsBySha = new Map(
  unmatchedCommits.map(({ sha }, index) => [
    sha,
    associatedPullRequests[index],
  ])
)

for (const [order, { message, sha, subject }] of commits.entries()) {
  const pullNumber = parsePullNumber(subject)
  const pullRequest =
    pullRequestsByNumber.get(pullNumber) ??
    associatedPullRequestsBySha.get(sha)

  if (
    pullRequest?.merged_at &&
    pullRequest.merge_commit_sha === sha &&
    pullRequest.base?.ref !== 'release'
  ) {
    if (isGeneratedDependencyPullRequest(pullRequest)) {
      continue
    }
    if (!sourcePullRequests.has(pullRequest.number)) {
      const sourcePullRequest = {
        number: pullRequest.number,
        title: pullRequest.title,
        url: pullRequest.html_url,
        body: pullRequest.body ?? '',
        mergeCommitSha: sha,
        links: extractUrls(pullRequest.body),
        order,
      }
      sourcePullRequests.set(pullRequest.number, sourcePullRequest)
    }
    continue
  }

  directCommits.push({
    sha,
    subject,
    message,
    url: `https://github.com/${repository}/commit/${sha}`,
    links: extractUrls(message),
    order,
  })
}

const context = {
  version,
  tag: release.tagName,
  previousTag,
  release,
  releasePullRequest: {
    number: releasePullRequest.number,
    title: releasePullRequest.title,
    url: releasePullRequest.html_url,
    mergeCommitSha: releasePullRequest.merge_commit_sha,
    headRef: releasePullRequest.head.ref,
  },
  sourcePullRequests: [...sourcePullRequests.values()],
  directCommits,
}

writeFileSync(outputPath, `${JSON.stringify(context, null, 2)}\n`)
