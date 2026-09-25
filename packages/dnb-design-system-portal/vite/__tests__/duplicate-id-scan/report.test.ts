import { describe, it, expect } from 'vitest'
import {
  diffDuplicates,
  hasChangesToReport,
  parseBaselineFromIssue,
  embedBaseline,
  renderIssueBody,
} from '../../../scripts/duplicate-id-scan/report.mts'
import { type Duplicate } from '../../../scripts/duplicate-id-scan/detect.mts'

const meta = {
  generatedAt: '2026-09-25T06:00:00.000Z',
  routeCount: 3,
  commit: 'be389c23068',
}

describe('diffDuplicates', () => {
  it('classifies added, changed, and resolved', () => {
    const previous: Duplicate[] = [
      { url: 'a', id: 'x', count: 2 },
      { url: 'b', id: 'y', count: 2 },
    ]
    const current: Duplicate[] = [
      { url: 'a', id: 'x', count: 3 }, // changed
      { url: 'c', id: 'z', count: 2 }, // added
    ]

    const diff = diffDuplicates(previous, current)

    expect(diff.added).toEqual([{ url: 'c', id: 'z', count: 2 }])
    expect(diff.changed).toEqual([
      { url: 'a', id: 'x', count: 3, previousCount: 2 },
    ])
    expect(diff.resolved).toEqual([{ url: 'b', id: 'y', count: 2 }])
  })

  it('reports no changes when the scan is identical', () => {
    const items: Duplicate[] = [{ url: 'a', id: 'x', count: 2 }]
    const diff = diffDuplicates(items, items)

    expect(diff.added).toEqual([])
    expect(diff.changed).toEqual([])
    expect(diff.resolved).toEqual([])
    expect(hasChangesToReport(diff)).toBe(false)
  })
})

describe('baseline round-trip', () => {
  it('parses what it embeds, sorted', () => {
    const current: Duplicate[] = [
      { url: 'b', id: 'y', count: 2 },
      { url: 'a', id: 'x', count: 3 },
    ]
    const body = `some text\n${embedBaseline(current)}\nmore`

    expect(parseBaselineFromIssue(body)).toEqual([
      { url: 'a', id: 'x', count: 3 },
      { url: 'b', id: 'y', count: 2 },
    ])
  })

  it('returns empty for missing or malformed baselines', () => {
    expect(parseBaselineFromIssue(undefined)).toEqual([])
    expect(parseBaselineFromIssue('no baseline here')).toEqual([])
    expect(
      parseBaselineFromIssue('<!-- duplicate-ids-baseline: {bad json -->')
    ).toEqual([])
  })
})

describe('renderIssueBody', () => {
  const current: Duplicate[] = [
    { url: 'uilib/components/button', id: 'example', count: 5 },
  ]

  it('renders the current list, the diff, and an embedded baseline', () => {
    const diff = diffDuplicates([], current)
    const body = renderIssueBody(current, diff, meta)

    expect(body).toContain('1 duplicate found')
    expect(body).toContain('`#example`')
    expect(body).toContain('new or changed since last run')
    expect(parseBaselineFromIssue(body)).toEqual(current)
  })

  it('shows a clean state and an empty baseline when there are no duplicates', () => {
    const diff = diffDuplicates(current, [])
    const body = renderIssueBody([], diff, meta)

    expect(body).toContain('No duplicate element ids found')
    expect(body).toContain('no longer found since last run')
    expect(parseBaselineFromIssue(body)).toEqual([])
  })
})
