/**
 * Side-effect-free classification of a `yarn npm audit` result, so it can be
 * unit tested. The runner that invokes Yarn lives in
 * `auditProductionDependencies.ts`.
 */

/**
 * Arguments the gate audits with. Identical to the `audit:ci` script the
 * publish and deploy pipelines call, plus `--json`.
 *
 * `--json` is what makes the outcomes below distinguishable, and it does not
 * move the gate: Yarn documents that the exit code is non-zero whenever a
 * report is found for the selected packages regardless of this flag, and
 * `--severity` still decides which packages are selected. The JSON stream is
 * the registry's own payload and is therefore not severity-filtered, so it is
 * only ever counted here — never used to decide what counts as a finding.
 *
 * A test asserts these stay in sync with every `audit:ci` script in the repo.
 */
export const AUDIT_ARGS = [
  'npm',
  'audit',
  '--recursive',
  '--environment',
  'production',
  '--severity',
  'high',
  '--json',
]

/** Workspaces whose `audit:ci` must match `AUDIT_ARGS`. */
export const AUDITED_WORKSPACE_MANIFESTS = [
  'packages/dnb-eufemia/package.json',
  'tools/mcp-lambda/package.json',
  'tools/analytics/package.json',
]

export type AuditOutcome =
  | { kind: 'clean' }
  | { kind: 'advisories'; count: number }
  | { kind: 'incomplete' }

/**
 * Count the NDJSON records Yarn emitted. Yarn interleaves human-readable
 * progress and error lines on the same stream, so unparseable lines are
 * skipped rather than treated as a failure to parse.
 */
export function countAdvisoryRecords(stdout: string): number {
  let records = 0

  for (const line of stdout.split('\n')) {
    const trimmed = line.trim()

    if (!trimmed) {
      continue
    }

    try {
      JSON.parse(trimmed)
      records++
    } catch {
      // Not an advisory record; ignore.
    }
  }

  return records
}

/**
 * Tell a real finding apart from an audit that never produced a report.
 *
 * `yarn npm audit` exits non-zero for both, which is why reading the exit code
 * alone cannot distinguish them. A report means the registry answered and
 * `--severity` selected at least one package. Nothing parseable means no
 * report was returned, so these dependencies are unchecked on this run — a
 * third state that is neither a pass nor a finding.
 */
export function classifyAuditResult(
  exitCode: number,
  stdout: string
): AuditOutcome {
  if (exitCode === 0) {
    return { kind: 'clean' }
  }

  const count = countAdvisoryRecords(stdout)

  if (count > 0) {
    return { kind: 'advisories', count }
  }

  return { kind: 'incomplete' }
}
