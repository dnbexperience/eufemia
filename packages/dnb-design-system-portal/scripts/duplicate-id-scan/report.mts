/**
 * Pure reporting helpers: diff a scan against the previous run, render the
 * rolling issue body, and embed/parse the machine-readable baseline that lives
 * inside that issue body (so the issue is both the report and the state store).
 */

import { type Duplicate } from './detect.mts'

/** Label used to find the single rolling issue. */
export const ISSUE_LABEL = 'duplicate-ids'
/** Title of the rolling issue. */
export const ISSUE_TITLE = 'Duplicate element ids in the portal'

const BASELINE_PREFIX = '<!-- duplicate-ids-baseline:'
const BASELINE_SUFFIX = '-->'

export type DuplicateDiff = {
  added: Duplicate[]
  changed: Array<Duplicate & { previousCount: number }>
  resolved: Duplicate[]
}

export type ScanMeta = {
  generatedAt: string
  routeCount: number
  commit?: string
}

function keyOf(entry: { url: string; id: string }): string {
  return `${entry.url}#${entry.id}`
}

function sortDuplicates<T extends Duplicate>(items: readonly T[]): T[] {
  return [...items].sort(
    (a, b) => a.url.localeCompare(b.url) || a.id.localeCompare(b.id)
  )
}

/** Compare the previous baseline against the current scan. */
export function diffDuplicates(
  previous: readonly Duplicate[],
  current: readonly Duplicate[]
): DuplicateDiff {
  const previousByKey = new Map(
    previous.map((entry) => [keyOf(entry), entry])
  )
  const currentByKey = new Map(
    current.map((entry) => [keyOf(entry), entry])
  )

  const added: Duplicate[] = []
  const changed: Array<Duplicate & { previousCount: number }> = []
  for (const entry of current) {
    const before = previousByKey.get(keyOf(entry))
    if (!before) {
      added.push(entry)
    } else if (before.count !== entry.count) {
      changed.push({ ...entry, previousCount: before.count })
    }
  }

  const resolved: Duplicate[] = []
  for (const entry of previous) {
    if (!currentByKey.has(keyOf(entry))) {
      resolved.push(entry)
    }
  }

  return {
    added: sortDuplicates(added),
    changed: sortDuplicates(changed),
    resolved: sortDuplicates(resolved),
  }
}

/** Whether a run introduced anything worth pinging subscribers about. */
export function hasChangesToReport(diff: DuplicateDiff): boolean {
  return diff.added.length > 0 || diff.changed.length > 0
}

function plural(count: number, singular: string): string {
  return `${count} ${count === 1 ? singular : `${singular}s`}`
}

function page(url: string): string {
  return `\`${url === '' ? '/' : url}\``
}

function mdTable(headers: string[], rows: string[]): string {
  const divider = headers.map(() => '---')
  return [
    `| ${headers.join(' | ')} |`,
    `| ${divider.join(' | ')} |`,
    ...rows,
  ].join('\n')
}

function duplicateRow(entry: Duplicate): string {
  return `| \`#${entry.id}\` | ${entry.count} | ${page(entry.url)} |`
}

/** Serialise the current scan as the baseline block embedded in the issue. */
export function embedBaseline(current: readonly Duplicate[]): string {
  const payload = JSON.stringify(sortDuplicates(current))
  return `${BASELINE_PREFIX} ${payload} ${BASELINE_SUFFIX}`
}

/**
 * Read the baseline that a previous run embedded in the issue body. Returns an
 * empty list when the issue is missing, has no baseline, or the block is
 * malformed.
 */
export function parseBaselineFromIssue(
  body: string | null | undefined
): Duplicate[] {
  if (!body) {
    return []
  }

  const start = body.indexOf(BASELINE_PREFIX)
  if (start === -1) {
    return []
  }

  const from = start + BASELINE_PREFIX.length
  const end = body.indexOf(BASELINE_SUFFIX, from)
  if (end === -1) {
    return []
  }

  try {
    const parsed = JSON.parse(body.slice(from, end).trim())
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter(
      (entry): entry is Duplicate =>
        Boolean(entry) &&
        typeof entry.url === 'string' &&
        typeof entry.id === 'string' &&
        typeof entry.count === 'number'
    )
  } catch {
    return []
  }
}

/** Render the full issue body, including the embedded baseline block. */
export function renderIssueBody(
  current: readonly Duplicate[],
  diff: DuplicateDiff,
  meta: ScanMeta
): string {
  const metaParts = [
    `Last scan: ${meta.generatedAt}`,
    `${plural(meta.routeCount, 'page')} scanned`,
  ]
  if (meta.commit) {
    metaParts.push(`commit \`${meta.commit.slice(0, 7)}\``)
  }

  const sections: string[] = [`_${metaParts.join(' · ')}_`]

  if (current.length === 0) {
    sections.push('✅ No duplicate element ids found.')
  } else {
    sections.push(`**${plural(current.length, 'duplicate')} found**`)
    sections.push(
      mdTable(
        ['id', 'count', 'page'],
        sortDuplicates(current).map(duplicateRow)
      )
    )
  }

  if (diff.added.length > 0 || diff.changed.length > 0) {
    const count = diff.added.length + diff.changed.length
    const rows = [
      ...diff.added.map((entry) => `${duplicateRow(entry)} new |`),
      ...diff.changed.map(
        (entry) => `${duplicateRow(entry)} was ${entry.previousCount} |`
      ),
    ]
    sections.push(`**${count} new or changed since last run**`)
    sections.push(mdTable(['id', 'count', 'page', 'change'], rows))
  }

  if (diff.resolved.length > 0) {
    sections.push(
      `**${plural(diff.resolved.length, 'duplicate')} no longer found since last run**`
    )
    sections.push(
      mdTable(
        ['id', 'count', 'page'],
        sortDuplicates(diff.resolved).map(duplicateRow)
      )
    )
  }

  sections.push(embedBaseline(current))

  return sections.join('\n\n') + '\n'
}
