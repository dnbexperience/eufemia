import { describe, expect, it } from 'vitest'
import {
  comparePortalDuplicateIdReports,
  formatPortalDuplicateIdComparison,
  hasPortalDuplicateIdRegression,
} from '../../prod/portal-duplicate-id-comparison.mjs'

const summary = {
  pages: 3,
  duplicateIdGroups: 3,
  duplicateIdOccurrences: 4,
}

describe('Portal duplicate ID comparison', () => {
  it('classifies new, worsened, improved and resolved findings', () => {
    const baseline = report([
      finding('/removed/', 'font-weight', 2),
      finding('/worse/', 'icon-filter', 2),
      finding('/better/', 'examples', 4),
    ])
    const current = report([
      finding('/new/', 'basic-usage', 2),
      finding('/worse/', 'icon-filter', 3),
      finding('/better/', 'examples', 2),
    ])

    expect(comparePortalDuplicateIdReports(baseline, current)).toEqual({
      new: [finding('/new/', 'basic-usage', 2)],
      worsened: [
        {
          ...finding('/worse/', 'icon-filter', 3),
          previousOccurrences: 2,
        },
      ],
      improved: [
        {
          ...finding('/better/', 'examples', 2),
          previousOccurrences: 4,
        },
      ],
      resolved: [finding('/removed/', 'font-weight', 2)],
    })
  })

  it('only considers new and worsened findings regressions', () => {
    expect(
      hasPortalDuplicateIdRegression({
        new: [],
        worsened: [],
        improved: [finding('/better/', 'examples', 2)],
        resolved: [finding('/removed/', 'font-weight', 2)],
      })
    ).toBe(false)

    expect(
      hasPortalDuplicateIdRegression({
        new: [finding('/new/', 'basic-usage', 2)],
        worsened: [],
        improved: [],
        resolved: [],
      })
    ).toBe(true)
  })

  it('rejects comparisons across schema versions', () => {
    expect(() =>
      comparePortalDuplicateIdReports(
        { ...report([]), schemaVersion: 1 },
        { ...report([]), schemaVersion: 2 }
      )
    ).toThrow('Cannot compare Portal duplicate ID report schema 1 with 2')
  })

  it('formats a readable change report', () => {
    const current = report([finding('/new/', 'basic-usage', 2)])
    const comparison = comparePortalDuplicateIdReports(report([]), current)

    expect(
      formatPortalDuplicateIdComparison(comparison, current)
    ).toContain('`#basic-usage` – 2 occurrences on [/new/]')
  })
})

function report(findings: ReturnType<typeof finding>[]) {
  return { schemaVersion: 1, summary, findings }
}

function finding(page: string, id: string, occurrences: number) {
  return { check: 'duplicate-id', page, id, occurrences }
}
