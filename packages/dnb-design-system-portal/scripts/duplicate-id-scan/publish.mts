/**
 * Publish the duplicate-id scan result to a single rolling GitHub Issue.
 *
 * The issue body carries the machine-readable baseline of the previous run, so
 * this step reads it back, diffs against the current scan, rewrites the body,
 * and opens/updates/closes the issue accordingly. No repository writes.
 *
 * Requires the `gh` CLI authenticated via `GH_TOKEN` (as on GitHub runners).
 * Env overrides: SCAN_OUT (input JSON), DRY_RUN=1 (print instead of calling gh).
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { type Duplicate } from './detect.mts'
import { routeToSlug } from './routes.mts'
import {
  ISSUE_LABEL,
  ISSUE_TITLE,
  diffDuplicates,
  hasChangesToReport,
  mergeBaseline,
  parseBaselineFromIssue,
  renderIssueBody,
  type DuplicateDiff,
  type ScanMeta,
} from './report.mts'

const dryRun = process.env.DRY_RUN === '1'
const inputFile =
  process.env.SCAN_OUT ?? path.resolve(process.cwd(), 'duplicate-ids.json')

type ScanFile = {
  generatedAt: string
  routeCount: number
  failedCount?: number
  failed?: string[]
  duplicates: Duplicate[]
}

type ExistingIssue = {
  number: number
  body: string
  state: string
}

function gh(args: string[]): string {
  if (dryRun) {
    console.log(`[dry-run] gh ${args.join(' ')}`)
    return ''
  }
  return execFileSync('gh', args, { encoding: 'utf8' })
}

function writeTempBody(body: string): string {
  const file = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), 'dupid-')),
    'body.md'
  )
  fs.writeFileSync(file, body)
  return file
}

function findExistingIssue(): ExistingIssue | null {
  let raw: string
  try {
    raw = gh([
      'issue',
      'list',
      '--label',
      ISSUE_LABEL,
      '--state',
      'all',
      '--limit',
      '1',
      '--json',
      'number,body,state',
    ])
  } catch {
    // The label may not exist yet on the first run.
    return null
  }
  if (!raw) {
    return null
  }
  const parsed = JSON.parse(raw) as ExistingIssue[]
  return parsed.length > 0 ? parsed[0] : null
}

function changeComment(diff: DuplicateDiff): string {
  const lines = [
    'A duplicate-id scan found changes since the last run:',
    '',
  ]
  for (const entry of diff.added) {
    lines.push(
      `- \`#${entry.id}\` on \`${entry.url || '/'}\` (x${entry.count}, new)`
    )
  }
  for (const entry of diff.changed) {
    lines.push(
      `- \`#${entry.id}\` on \`${entry.url || '/'}\` (x${entry.count}, was x${entry.previousCount})`
    )
  }
  return lines.join('\n') + '\n'
}

function main() {
  const scan = JSON.parse(fs.readFileSync(inputFile, 'utf8')) as ScanFile
  const current = scan.duplicates ?? []
  const meta: ScanMeta = {
    generatedAt: scan.generatedAt,
    routeCount: scan.routeCount,
    commit: process.env.GITHUB_SHA,
    failedCount: scan.failedCount,
  }

  const existing = findExistingIssue()
  const previous = parseBaselineFromIssue(existing?.body)
  const diff = diffDuplicates(previous, current)
  const failedUrls = new Set((scan.failed ?? []).map(routeToSlug))
  const baseline = mergeBaseline(current, previous, failedUrls)
  const body = renderIssueBody(current, diff, meta, baseline)

  if (!existing) {
    if (current.length === 0) {
      console.log(
        'No duplicate ids and no existing issue — nothing to do.'
      )
      return
    }
    gh(['label', 'create', ISSUE_LABEL, '--force', '--color', 'B60205'])
    const bodyFile = writeTempBody(body)
    gh([
      'issue',
      'create',
      '--title',
      ISSUE_TITLE,
      '--label',
      ISSUE_LABEL,
      '--body-file',
      bodyFile,
    ])
    console.log(`Created issue with ${current.length} duplicate(s).`)
    return
  }

  const bodyFile = writeTempBody(body)
  gh(['issue', 'edit', String(existing.number), '--body-file', bodyFile])

  const isOpen = existing.state.toUpperCase() === 'OPEN'

  // Only close as clean when every page actually loaded — a run with load
  // failures must not report a false all-clear.
  if (current.length === 0 && isOpen && (scan.failedCount ?? 0) === 0) {
    gh([
      'issue',
      'close',
      String(existing.number),
      '--comment',
      'No duplicate element ids found in the latest scan.',
    ])
    console.log(`Closed issue #${existing.number} (now clean).`)
    return
  }

  if (current.length > 0 && !isOpen) {
    gh(['issue', 'reopen', String(existing.number)])
  }

  if (hasChangesToReport(diff)) {
    const commentFile = writeTempBody(changeComment(diff))
    gh([
      'issue',
      'comment',
      String(existing.number),
      '--body-file',
      commentFile,
    ])
    console.log(
      `Updated issue #${existing.number} and commented on changes.`
    )
  } else {
    console.log(`Updated issue #${existing.number} (no new changes).`)
  }
}

main()
