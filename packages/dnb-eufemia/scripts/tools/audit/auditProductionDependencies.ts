/**
 * Dependency-audit gate for branch and pull-request CI.
 *
 * `yarn npm audit` exits non-zero both when it finds advisories and when the
 * registry returned no report at all, so a gate that reads only the exit code
 * reports an upstream outage as loudly as a real vulnerability. This runner
 * separates the two: advisories fail the job, while an audit that produced no
 * report is reported as a warning naming the workspace, so unchecked
 * dependencies are never recorded as a clean result.
 *
 * The workspaces audited are derived from the manifests listed in the lib
 * rather than passed in, so a name can never be misspelled into a workspace
 * that silently audits nothing.
 *
 * The publish and deploy pipelines (release.yml, mcp-lambda.yml,
 * analytics-lambda.yml) call `audit:ci` directly and still require a completed
 * audit before anything ships.
 */

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import {
  AUDIT_ARGS,
  AUDITED_WORKSPACE_MANIFESTS,
  classifyAuditResult,
} from './auditProductionDependenciesLib.ts'

/**
 * Locate the repository root by walking up until the first audited manifest is
 * found. CI invokes this from the root, and this keeps a local run from a
 * workspace directory working too, while failing with a message that says what
 * went wrong instead of an ENOENT further down.
 *
 * Resolved this way rather than from `import.meta.url` because these scripts
 * are type-checked, and `import.meta` is not available under the package's
 * `module` setting.
 */
function findRepoRoot(startDir: string): string {
  const marker = AUDITED_WORKSPACE_MANIFESTS[0]
  let current = startDir
  let parent = path.dirname(current)

  while (!fs.existsSync(path.join(current, marker))) {
    if (parent === current) {
      throw new Error(
        `Could not locate ${marker} from ${startDir}. ` +
          'Run this from inside the repository.'
      )
    }

    current = parent
    parent = path.dirname(current)
  }

  return current
}

const repoRoot = findRepoRoot(process.cwd())

const workspaces = AUDITED_WORKSPACE_MANIFESTS.map((manifestPath) => {
  const absolute = path.join(repoRoot, manifestPath)
  const { name } = JSON.parse(fs.readFileSync(absolute, 'utf8'))

  if (!name) {
    throw new Error(`${manifestPath} declares no workspace name`)
  }

  return name as string
})

let failed = false
const unreachable: string[] = []

for (const workspace of workspaces) {
  console.log(`\nAuditing production dependencies of ${workspace}`)

  const { status, signal, stdout, stderr, error } = spawnSync(
    'yarn',
    ['workspace', workspace, ...AUDIT_ARGS],
    { cwd: repoRoot, encoding: 'utf8', env: process.env }
  )

  if (error) {
    throw error
  }

  // A signal kill is a local problem (a timeout or the runner reclaiming
  // memory), not something the registry did, so it is never waved through.
  if (signal) {
    failed = true
    console.log(
      `::error title=Dependency audit killed::The audit of ${workspace} ` +
        `was terminated by ${signal}.`
    )
    continue
  }

  const outcome = classifyAuditResult(
    status ?? 1,
    stdout ?? '',
    stderr ?? ''
  )

  if (outcome.kind === 'clean') {
    console.log(`No advisories at or above "high" in ${workspace}.`)
    continue
  }

  if (outcome.kind === 'advisories') {
    failed = true
    console.log(
      `::error title=Dependency advisories::${workspace} reported ` +
        `${outcome.count} advisory record(s) at or above "high".`
    )
    // Printed verbatim: this is the registry's own payload, whose shape the
    // gate deliberately does not depend on. Run
    // `yarn workspace <name> audit:ci` for the readable table.
    console.log(stdout.trim())
    continue
  }

  if (outcome.kind === 'unrecognised') {
    failed = true
    console.log(
      `::error title=Dependency audit failed::The audit of ${workspace} ` +
        'failed for a reason this gate does not recognise. Treating it as a ' +
        'finding rather than an outage; the output follows.'
    )
    console.log([stdout, stderr].filter(Boolean).join('\n').trim())
    continue
  }

  unreachable.push(workspace)
  console.log(
    `::warning title=Dependency audit incomplete::The advisories endpoint ` +
      `could not be reached for ${workspace}, so its production ` +
      `dependencies were not checked on this run.`
  )

  const diagnostics = [stdout, stderr].filter(Boolean).join('\n').trim()

  if (diagnostics) {
    console.log(diagnostics)
  }
}

if (failed) {
  console.log('\nDependency audit failed.')
  process.exit(1)
}

if (unreachable.length > 0) {
  const reported = workspaces.length - unreachable.length

  console.log(
    `\nAdvisories endpoint unreachable for: ${unreachable.join(', ')}.` +
      (reported > 0
        ? ` The other ${reported} reported no advisories.`
        : ' No workspace could be checked on this run.') +
      ' A release requires a completed audit before it publishes.'
  )
  process.exit(0)
}

console.log('\nDependency audit passed for every workspace.')
