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

/**
 * Evidence that Yarn never reached the advisories endpoint, taken from real
 * failing runs. The first marker is Yarn's own "the command could not run"
 * message and covers both an HTTP error and a dropped connection; the rest
 * catch a transport failure that killed the process before Yarn reported.
 *
 * Requiring one of these is what keeps the gate from failing open: output that
 * matches nothing here is treated as a failure to be looked at, not as an
 * outage to be waved through.
 */
export const UNREACHABLE_REGISTRY_MARKERS = [
  'Errors happened when preparing the environment',
  'YN0035',
  'ECONNREFUSED',
  'ECONNRESET',
  'ETIMEDOUT',
  'ENOTFOUND',
  'EAI_AGAIN',
  'socket hang up',
  "Timeout awaiting 'socket'",
]

export type AuditOutcome =
  | { kind: 'clean' }
  | { kind: 'advisories'; count: number }
  | { kind: 'unreachable' }
  | { kind: 'unrecognised' }

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

/** Whether the output carries evidence the registry was never reached. */
export function looksUnreachable(output: string): boolean {
  return UNREACHABLE_REGISTRY_MARKERS.some((marker) =>
    output.includes(marker)
  )
}

/**
 * Tell a real finding apart from an audit that never reached the registry.
 *
 * `yarn npm audit` exits non-zero for both, which is why reading the exit code
 * alone cannot distinguish them. A report means the registry answered and
 * `--severity` selected at least one package. Nothing parseable, plus evidence
 * the request never completed, means these dependencies are unchecked on this
 * run — a third state that is neither a pass nor a finding.
 *
 * Anything else is `unrecognised` and must be treated as a failure: a non-zero
 * exit this function cannot explain is exactly the case where assuming an
 * outage would hide a real advisory.
 */
export function classifyAuditResult(
  exitCode: number,
  stdout: string,
  stderr = ''
): AuditOutcome {
  if (exitCode === 0) {
    return { kind: 'clean' }
  }

  const count = countAdvisoryRecords(stdout)

  // A report arrived, so the registry answered. Conservative on purpose: even
  // if a transport error followed, the records already name real advisories.
  if (count > 0) {
    return { kind: 'advisories', count }
  }

  if (looksUnreachable(`${stdout}\n${stderr}`)) {
    return { kind: 'unreachable' }
  }

  return { kind: 'unrecognised' }
}
