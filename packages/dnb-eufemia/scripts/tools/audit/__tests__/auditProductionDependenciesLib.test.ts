import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

import {
  AUDIT_ARGS,
  AUDITED_WORKSPACE_MANIFESTS,
  classifyAuditResult,
  countAdvisoryRecords,
  looksUnreachable,
} from '../auditProductionDependenciesLib'

const repoRoot = path.resolve(__dirname, '../../../../../..')

// Captured verbatim from a real failing CI run (verify.yml, 2026-09-04): the
// npm advisories endpoint answered 503 and Yarn wrote this to stdout.
const REGISTRY_503_OUTPUT = [
  '➤ YN0000: · Yarn 4.16.0',
  '➤ YN0035: Service Unavailable',
  '➤ YN0035:   Response Code: 503 (Service Unavailable)',
  '➤ YN0035:   Request Method: POST',
  '➤ YN0035:   Request URL: https://registry.yarnpkg.com/-/npm/v1/security/advisories/bulk',
  '➤ Errors happened when preparing the environment required to run this command.',
].join('\n')

// Captured verbatim from a real run behind a proxy that dropped the connection.
const SOCKET_TIMEOUT_OUTPUT = [
  "➤ YN0001: RequestError: Timeout awaiting 'socket' for 60000ms",
  '    at ClientRequest.<anonymous> (/repo/.yarn/releases/yarn-4.16.0.cjs:146:14230)',
  '    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)',
  '➤ Errors happened when preparing the environment required to run this command.',
].join('\n')

// Advisory records are the registry's own payload. The gate only ever counts
// them, so these fixtures deliberately do not pin the report's field names.
const ADVISORY_OUTPUT = [
  '{"value":"tar","children":{"ID":1234,"Severity":"high"}}',
  '{"value":"minimist","children":{"ID":5678,"Severity":"critical"}}',
].join('\n')

describe('auditProductionDependenciesLib', () => {
  describe('countAdvisoryRecords', () => {
    it('counts one record per NDJSON line', () => {
      expect(countAdvisoryRecords(ADVISORY_OUTPUT)).toBe(2)
    })

    it('skips blank lines and human-readable output', () => {
      expect(countAdvisoryRecords('')).toBe(0)
      expect(countAdvisoryRecords('\n\n  \n')).toBe(0)
      expect(countAdvisoryRecords(REGISTRY_503_OUTPUT)).toBe(0)
      expect(countAdvisoryRecords(SOCKET_TIMEOUT_OUTPUT)).toBe(0)
    })

    it('still counts records when Yarn interleaves progress lines', () => {
      const interleaved = [
        '➤ YN0000: · Yarn 4.16.0',
        '{"value":"tar","children":{"ID":1234}}',
        '➤ YN0000: · Done in 2s',
      ].join('\n')

      expect(countAdvisoryRecords(interleaved)).toBe(1)
    })
  })

  describe('classifyAuditResult', () => {
    it('treats a zero exit code as clean', () => {
      expect(classifyAuditResult(0, '')).toEqual({ kind: 'clean' })
    })

    it('fails when the registry returned a report', () => {
      expect(classifyAuditResult(1, ADVISORY_OUTPUT)).toEqual({
        kind: 'advisories',
        count: 2,
      })
    })

    it('reports a 503 from the advisories endpoint as unreachable', () => {
      expect(classifyAuditResult(1, REGISTRY_503_OUTPUT)).toEqual({
        kind: 'unreachable',
      })
    })

    it('reports a dropped connection as unreachable', () => {
      expect(classifyAuditResult(1, SOCKET_TIMEOUT_OUTPUT)).toEqual({
        kind: 'unreachable',
      })
    })

    it('reads stderr too, for a crash that never reached Yarn', () => {
      // Captured from a run pointed at a closed port: Node threw before Yarn
      // could report, so nothing useful lands on stdout.
      expect(
        classifyAuditResult(
          1,
          '',
          'ps [RequestError]: connect ECONNREFUSED'
        )
      ).toEqual({ kind: 'unreachable' })
    })

    it('prefers a finding when a report arrived alongside an error', () => {
      // Conservative on purpose: a partial report still names real
      // advisories, so it must fail rather than pass as unchecked.
      const partial = `${ADVISORY_OUTPUT}\n${REGISTRY_503_OUTPUT}`

      expect(classifyAuditResult(1, partial)).toEqual({
        kind: 'advisories',
        count: 2,
      })
    })

    it('does not assume an outage from an unexplained failure', () => {
      // The gate must not fail open. Were Yarn to stop emitting NDJSON, an
      // absence of records would otherwise read as an outage and wave a real
      // advisory through, so anything unrecognised fails instead.
      expect(classifyAuditResult(1, '')).toEqual({ kind: 'unrecognised' })
      expect(
        classifyAuditResult(1, 'Usage Error: Invalid option --severity')
      ).toEqual({ kind: 'unrecognised' })
      expect(
        classifyAuditResult(1, 'tar  1234  high  <2.0.0  no fix available')
      ).toEqual({ kind: 'unrecognised' })
    })
  })

  describe('looksUnreachable', () => {
    it('matches every failure captured from a real run', () => {
      expect(looksUnreachable(REGISTRY_503_OUTPUT)).toBe(true)
      expect(looksUnreachable(SOCKET_TIMEOUT_OUTPUT)).toBe(true)
    })

    it('does not match a report or an ordinary error', () => {
      expect(looksUnreachable(ADVISORY_OUTPUT)).toBe(false)
      expect(looksUnreachable('')).toBe(false)
      expect(looksUnreachable('➤ YN0000: Done in 3s')).toBe(false)
    })
  })

  describe('AUDIT_ARGS', () => {
    it('audits production dependencies recursively at high severity', () => {
      expect(AUDIT_ARGS).toEqual([
        'npm',
        'audit',
        '--recursive',
        '--environment',
        'production',
        '--severity',
        'high',
        '--json',
      ])
    })

    it('matches every audit:ci script, so the gate cannot drift', () => {
      for (const manifestPath of AUDITED_WORKSPACE_MANIFESTS) {
        const absolute = path.join(repoRoot, manifestPath)

        expect(
          fs.existsSync(absolute),
          `${manifestPath} is missing; update AUDITED_WORKSPACE_MANIFESTS`
        ).toBe(true)

        const manifest = JSON.parse(fs.readFileSync(absolute, 'utf8'))
        const auditCi = manifest.scripts?.['audit:ci']

        expect(
          auditCi,
          `${manifestPath} has no audit:ci script`
        ).toBeTruthy()

        // The runner derives the workspaces it audits from these manifests.
        expect(
          manifest.name,
          `${manifestPath} declares no workspace name`
        ).toBeTruthy()

        // `audit:ci` is what the publish pipelines run. The gate must audit
        // exactly the same scope, differing only by --json.
        expect(
          auditCi.split(/\s+/).filter(Boolean),
          `${manifestPath} audit:ci has diverged from AUDIT_ARGS`
        ).toEqual([
          'yarn',
          ...AUDIT_ARGS.filter((arg) => arg !== '--json'),
        ])
      }
    })
  })
})
