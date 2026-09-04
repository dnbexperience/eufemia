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

let advisoriesFound = false
const incomplete: string[] = []

for (const workspace of workspaces) {
  console.log(`\nAuditing production dependencies of ${workspace}`)

  const { status, stdout, stderr, error } = spawnSync(
    'yarn',
    ['workspace', workspace, ...AUDIT_ARGS],
    { cwd: repoRoot, encoding: 'utf8', env: process.env }
  )

  if (error) {
    throw error
  }

  // spawnSync reports a signal kill as a null status; treat it as a failure.
  const outcome = classifyAuditResult(status ?? 1, stdout ?? '')

  if (outcome.kind === 'clean') {
    console.log(`No advisories at or above "high" in ${workspace}.`)
    continue
  }

  if (outcome.kind === 'advisories') {
    advisoriesFound = true
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

  incomplete.push(workspace)
  console.log(
    `::warning title=Dependency audit incomplete::No audit report was ` +
      `returned for ${workspace}, so its production dependencies were ` +
      `not checked on this run.`
  )

  const diagnostics = [stdout, stderr].filter(Boolean).join('\n').trim()

  if (diagnostics) {
    console.log(diagnostics)
  }
}

if (advisoriesFound) {
  console.log('\nDependency audit failed: advisories found.')
  process.exit(1)
}

if (incomplete.length > 0) {
  console.log(
    `\nDependency audit incomplete for: ${incomplete.join(', ')}. ` +
      'No advisories were found in the workspaces that did report. ' +
      'A release requires a completed audit before it publishes.'
  )
  process.exit(0)
}

console.log('\nDependency audit passed for every workspace.')
