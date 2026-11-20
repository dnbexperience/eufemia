/**
 * Check the GitHub Actions workflows and composite actions against the
 * repository's Actions settings:
 *
 * - Every action is pinned to a full-length commit SHA. Reusable workflows
 *   from other repositories are held to the same rule.
 * - Every job sets its `permissions`, or its workflow does, because the
 *   default `GITHUB_TOKEN` is read-only.
 * - A job that reads a GHE deploy token runs in the `ghe-deploy` environment,
 *   which holds the token. The token is not a repository secret, so a job
 *   outside the environment reads an empty string instead of failing.
 * - Every action that GitHub did not create is on ALLOWED_THIRD_PARTY_ACTIONS.
 * - No file reads the retired personal access token secrets. A deleted secret
 *   resolves to an empty string instead of failing.
 *
 * The settings stop such a workflow only when it runs. The release, deploy
 * and scheduled workflows do not run on a pull request, so without this check
 * they would first fail after the merge.
 *
 * Prettier formats these files, so this reads them line by line instead of
 * parsing YAML. It reports what it cannot read, such as a job line it does
 * not understand, instead of passing it.
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

/**
 * Secrets that a job may read only in the named environment. The environment
 * limits them to the branches and tags that deploy.
 */
const ENVIRONMENT_SECRETS = {
  GHE_DEPLOY_PAT: 'ghe-deploy',
  GHE_MONITORING_DEPLOY_PAT: 'ghe-deploy',
}

const SECRET_NAMES = Object.keys(ENVIRONMENT_SECRETS).join('|')

// `secrets.NAME` or `secrets['NAME']`, in any letter case
const ENVIRONMENT_SECRET_READS = new RegExp(
  String.raw`\bsecrets\s*(?:\.\s*(${SECRET_NAMES})\b|\[\s*["'](${SECRET_NAMES})["']\s*\])`,
  'gi'
)

// GitHub creates the actions of these owners
const GITHUB_OWNERS = ['actions', 'github']

// `uses:` that starts a line, or that is a key of a flow mapping such as
// `- { uses: … }`. The key may be quoted.
const USES =
  /(?:^[ \t]*(?:- )?|[{,][ \t]*)["']?uses["']?[ \t]*:[ \t]*["']?([^"'\s,}#]+)/gm

// `secrets.NAME` or `secrets['NAME']`, in any letter case
const RETIRED_SECRETS =
  /\bsecrets\s*(?:\.\s*(GH_TOKEN|GH_NAME|GH_EMAIL)\b|\[\s*["'](GH_TOKEN|GH_NAME|GH_EMAIL)["']\s*\])/gi

export function checkWorkflowFile({
  file,
  text,
  allowed = ALLOWED_THIRD_PARTY_ACTIONS,
}) {
  const content = text.replace(/^\uFEFF/, '')
  const problems = []

  for (const [, value] of content.matchAll(USES)) {
    const problem = checkUses(value, allowed)
    if (problem) {
      problems.push(`${file}: ${problem}`)
    }
  }

  if (file.startsWith('.github/workflows/')) {
    const lines = content.split('\n')
    const workflow = readJobs(lines)
    for (const problem of [
      ...workflow.problems,
      ...checkPermissions(lines, workflow),
      ...checkEnvironmentSecrets(workflow),
    ]) {
      problems.push(`${file}: ${problem}`)
    }
  }

  for (const [, dotted, bracketed] of content.matchAll(RETIRED_SECRETS)) {
    problems.push(
      `${file}: \`secrets.${dotted ?? bracketed}\` is a retired personal access token secret; use a GitHub App token instead`
    )
  }

  return problems
}

function checkUses(value, allowed) {
  if (value.startsWith('./')) {
    return value.startsWith('./.github/')
      ? null
      : `\`${value}\` is a local action outside \`.github\`, which this check does not read`
  }

  if (value.startsWith('docker://')) {
    return /@sha256:[0-9a-f]{64}$/.test(value)
      ? null
      : `\`${value}\` must be pinned to an image digest (\`@sha256:…\`)`
  }

  const [target, ref, ...rest] = value.split('@')
  const [owner, repo] = target.split('/')
  if (!owner || !repo || !ref || rest.length > 0) {
    return `\`${value}\` is not an \`owner/repo@ref\` reference`
  }

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

function checkPermissions(lines, { jobs, problems }) {
  if (lines.some((line) => line.startsWith('permissions:'))) {
    return []
  }

  if (jobs.length === 0 && problems.length === 0) {
    return [
      'found no jobs at two-space indentation; format it with Prettier',
    ]
  }

  return jobs
    .filter(
      (job) => !job.lines.some((line) => /^ {4}permissions:/.test(line))
    )
    .map(
      (job) =>
        `job \`${job.id}\` sets no \`permissions\`, and neither does its workflow`
    )
}

// The jobs of a workflow with the lines of each job, and the lines outside
// every job
function readJobs(lines) {
  const jobs = []
  const outside = []
  const problems = []
  let inJobs = false
  for (const [index, line] of lines.entries()) {
    if (/^[^\s#]/.test(line)) {
      inJobs = line.startsWith('jobs:')
      outside.push(line)
    } else if (inJobs && /^ {2}[^\s#]/.test(line)) {
      const job = /^ {2}["']?([\w-]+)["']?:/.exec(line)
      if (job) {
        jobs.push({ id: job[1], lines: [] })
      } else {
        problems.push(`cannot read the job on line ${index + 1}`)
      }
      outside.push(line)
    } else if (inJobs && jobs.length > 0) {
      jobs[jobs.length - 1].lines.push(line)
    } else {
      outside.push(line)
    }
  }

  return { jobs, outside, problems }
}

function checkEnvironmentSecrets({ jobs, outside }) {
  const problems = readSecrets(outside).map(
    (name) =>
      `\`secrets.${name}\` is read outside a job, so no environment applies; read it in a job that uses the \`${ENVIRONMENT_SECRETS[name]}\` environment`
  )

  for (const job of jobs) {
    const environment = readEnvironment(job.lines)
    for (const name of readSecrets(job.lines)) {
      if (environment !== ENVIRONMENT_SECRETS[name]) {
        problems.push(
          `job \`${job.id}\` reads \`secrets.${name}\` and must run in the \`${ENVIRONMENT_SECRETS[name]}\` environment`
        )
      }
    }
  }

  return problems
}

// The names from ENVIRONMENT_SECRETS that the lines read, except in comments
function readSecrets(lines) {
  const names = new Set()
  for (const line of lines) {
    if (line.trimStart().startsWith('#')) {
      continue
    }

    for (const [, dotted, bracketed] of line.matchAll(
      ENVIRONMENT_SECRET_READS
    )) {
      names.add((dotted ?? bracketed).toUpperCase())
    }
  }

  return [...names]
}

// The environment of a job: `environment: name`, or `name:` below `environment:`
function readEnvironment(lines) {
  const index = lines.findIndex((line) => /^ {4}environment:/.test(line))
  if (index === -1) {
    return null
  }

  const inline =
    /^ {4}environment:[ \t]*(["']?)([\w.-]+)\1(?:[ \t]+#.*|[ \t]*)$/.exec(
      lines[index]
    )
  if (inline) {
    return inline[2]
  }

  for (const line of lines.slice(index + 1)) {
    if (/^ {0,4}[^\s#]/.test(line)) {
      break
    }

    const name =
      /^ {6}name:[ \t]*(["']?)([\w.-]+)\1(?:[ \t]+#.*|[ \t]*)$/.exec(line)
    if (name) {
      return name[2]
    }
  }

  return null
}

// Composite actions anywhere in `.github`, except the workflows folder
function findActionFiles(dir) {
  return readdirSync(path.join(REPO_ROOT, dir), {
    withFileTypes: true,
  }).flatMap((entry) => {
    const file = `${dir}/${entry.name}`
    if (entry.isDirectory()) {
      return file === '.github/workflows' ? [] : findActionFiles(file)
    }
    return /^action\.ya?ml$/.test(entry.name) ? [file] : []
  })
}

function listFiles() {
  const workflows = readdirSync(path.join(REPO_ROOT, '.github/workflows'))
    .filter((name) => /\.ya?ml$/.test(name))
    .map((name) => `.github/workflows/${name}`)

  const actions = existsSync(path.join(REPO_ROOT, '.github'))
    ? findActionFiles('.github')
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
    `All ${files.length} workflow and action files pin their actions, set their permissions, use allowed actions only and read no retired secrets.`
  )
}

const invokedPath = process.argv[1]
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
