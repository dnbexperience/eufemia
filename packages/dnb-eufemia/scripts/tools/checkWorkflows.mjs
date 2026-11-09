/**
 * Check the GitHub Actions workflows and composite actions against the
 * repository's Actions settings:
 *
 * - Every action is pinned to a full-length commit SHA. Reusable workflows
 *   from other repositories are held to the same rule.
 * - Every job sets its `permissions`, or its workflow does, because the
 *   default `GITHUB_TOKEN` is read-only.
 * - Every action that GitHub did not create is on ALLOWED_THIRD_PARTY_ACTIONS.
 *
 * The settings stop such a workflow only when it runs. The release, deploy
 * and scheduled workflows do not run on a pull request, so without this check
 * they would first fail after the merge.
 *
 * Prettier formats these files, so this reads them line by line instead of
 * parsing YAML. It reports a workflow whose jobs it cannot find.
 *
 * Usage: node ./scripts/tools/checkWorkflows.mjs
 */

import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const REPO_ROOT = path.resolve(import.meta.dirname, '../../../..')

/**
 * Third-party actions (`owner/repo`, in lowercase) that may run. An admin
 * allows the same actions in Settings → Actions → General.
 */
export const ALLOWED_THIRD_PARTY_ACTIONS = ['hashicorp/setup-terraform']

// GitHub creates the actions of these owners
const GITHUB_OWNERS = ['actions', 'github']

export function checkWorkflowFile({
  file,
  text,
  allowed = ALLOWED_THIRD_PARTY_ACTIONS,
}) {
  const problems = []

  for (const [, value] of text.matchAll(
    /^[ \t]*(?:- )?uses:[ \t]*['"]?([^'"\s#]+)/gm
  )) {
    const problem = checkUses(value, allowed)
    if (problem) {
      problems.push(`${file}: ${problem}`)
    }
  }

  if (file.startsWith('.github/workflows/')) {
    for (const problem of checkPermissions(text)) {
      problems.push(`${file}: ${problem}`)
    }
  }

  return problems
}

function checkUses(value, allowed) {
  if (value.startsWith('./')) {
    return null
  }

  if (value.startsWith('docker://')) {
    return /@sha256:[0-9a-f]{64}$/.test(value)
      ? null
      : `\`${value}\` must be pinned to an image digest (\`@sha256:…\`)`
  }

  const match = /^([^/@]+)\/([^/@]+)(?:\/[^@]*)?@(.+)$/.exec(value)
  if (!match) {
    return `\`${value}\` is not an \`owner/repo@ref\` reference`
  }

  const [, owner, repo, ref] = match
  if (!/^[0-9a-f]{40}$/.test(ref)) {
    return `\`${value}\` must be pinned to a full-length commit SHA`
  }

  const name = `${owner}/${repo}`.toLowerCase()
  if (
    !GITHUB_OWNERS.includes(owner.toLowerCase()) &&
    !allowed.includes(name)
  ) {
    return `\`${name}\` is not on ALLOWED_THIRD_PARTY_ACTIONS`
  }

  return null
}

function checkPermissions(text) {
  const lines = text.split('\n')
  if (lines.some((line) => line.startsWith('permissions:'))) {
    return []
  }

  const jobs = []
  let inJobs = false
  for (const line of lines) {
    if (/^[^\s#]/.test(line)) {
      inJobs = line.startsWith('jobs:')
      continue
    }
    if (!inJobs) {
      continue
    }

    const job = /^ {2}([\w-]+):/.exec(line)
    if (job) {
      jobs.push({ id: job[1], permissions: false })
    } else if (jobs.length > 0 && /^ {4}permissions:/.test(line)) {
      jobs[jobs.length - 1].permissions = true
    }
  }

  if (jobs.length === 0) {
    return [
      'found no jobs at two-space indentation; format it with Prettier',
    ]
  }

  return jobs
    .filter((job) => !job.permissions)
    .map(
      (job) =>
        `job \`${job.id}\` sets no \`permissions\`, and neither does its workflow`
    )
}

function listFiles() {
  const workflows = readdirSync(path.join(REPO_ROOT, '.github/workflows'))
    .filter((name) => /\.ya?ml$/.test(name))
    .map((name) => `.github/workflows/${name}`)

  const actionsDir = path.join(REPO_ROOT, '.github/actions')
  const actions = existsSync(actionsDir)
    ? readdirSync(actionsDir).flatMap((dir) =>
        ['action.yml', 'action.yaml']
          .map((name) => `.github/actions/${dir}/${name}`)
          .filter((file) => existsSync(path.join(REPO_ROOT, file)))
      )
    : []

  return [...workflows, ...actions].sort()
}

function main() {
  const files = listFiles()
  const problems = files.flatMap((file) =>
    checkWorkflowFile({
      file,
      text: readFileSync(path.join(REPO_ROOT, file), 'utf8'),
    })
  )

  if (problems.length > 0) {
    console.error(
      `\n${problems.length} problem(s) in the GitHub Actions files. The repository's Actions settings stop such a workflow when it runs:`
    )
    for (const problem of problems) {
      console.error(`  - ${problem}`)
    }
    process.exit(1)
  }

  console.log(
    `All ${files.length} workflow and action files pin their actions, set their permissions and use allowed actions only.`
  )
}

const invokedPath = process.argv[1]
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
