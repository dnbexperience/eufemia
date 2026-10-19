import { describe, expect, it } from 'vitest'
import {
  comparePortalAccessibilityReports,
  createPortalAccessibilityReport,
  findDuplicateIds,
  formatPortalAccessibilityChanges,
  formatPortalAccessibilityReport,
  splitIssueBody,
} from '../../../scripts/portal-accessibility-report.mjs'
import { acceptedFindings } from '../../../scripts/portal-accessibility-accepted.mjs'

describe('Portal accessibility report', () => {
  it('combines hydrated duplicate IDs and axe findings', () => {
    const report = createPortalAccessibilityReport({
      duplicateIdFindings: [duplicateId('/button/', 'examples', 2)],
      axeFindings: [axe('/anchor/', 'landmark-one-main', 1)],
      scannedPages: 2,
    })

    expect(report.summary).toEqual({
      pages: 2,
      duplicateIdGroups: 1,
      axeGroups: 1,
      acceptedGroups: 0,
      findings: 2,
    })
    expect(formatPortalAccessibilityReport(report)).toContain(
      '`#examples` – 2 occurrences on [/button/]'
    )
  })

  it('reports new, worsened, improved and resolved findings', () => {
    const previous = report([
      duplicateId('/removed/', 'font-weight', 2),
      duplicateId('/changed/', 'icon-filter', 2),
      axe('/better/', 'color-contrast', 3),
      axe('/changed/', 'label', 1, '#before'),
    ])
    const current = report([
      duplicateId('/new/', 'basic-usage', 2),
      duplicateId('/changed/', 'icon-filter', 3),
      axe('/better/', 'color-contrast', 1),
      axe('/changed/', 'label', 1, '#after'),
    ])

    const changes = comparePortalAccessibilityReports(previous, current)

    expect(changes.new).toHaveLength(1)
    expect(changes.worsened[0].previousOccurrences).toBe(2)
    expect(changes.improved[0].previousOccurrences).toBe(3)
    expect(changes.changed).toHaveLength(1)
    expect(changes.resolved).toHaveLength(1)
    expect(formatPortalAccessibilityChanges(changes)).toContain(
      '2 → 3 occurrences'
    )
    expect(formatPortalAccessibilityChanges(changes)).toContain(
      'failing nodes changed on /changed/'
    )
  })

  it('splits oversized issue bodies without losing content', () => {
    expect(splitIssueBody('one\ntwo\nthree', 8)).toEqual([
      'one\ntwo\n',
      'three\n',
    ])
  })

  it('finds duplicate IDs in the hydrated DOM', () => {
    expect(
      findDuplicateIds(['content', 'example', '', 'example'], '/button/')
    ).toEqual([duplicateId('/button/', 'example', 2)])
  })

  it('rejects comparisons across schema versions', () => {
    expect(() =>
      comparePortalAccessibilityReports(
        { ...report([]), schemaVersion: 1 },
        { ...report([]), schemaVersion: 2 }
      )
    ).toThrow('Cannot compare Portal accessibility report schema 1 with 2')
  })

  it('lists accepted nodes separately from open findings', () => {
    const finding = axe('/typography/', 'link-in-text-block', 2)
    finding.nodes = [
      { target: ['.dnb-anchor--hover'], failureSummary: 'State example' },
      { target: ['.dnb-anchor'], failureSummary: 'Real link' },
    ]
    const current = createPortalAccessibilityReport({
      duplicateIdFindings: [],
      axeFindings: [finding],
      scannedPages: 1,
      acceptedFindings: [
        {
          rule: 'link-in-text-block',
          pages: ['/typography/'],
          target: '.dnb-anchor--',
          reason: 'Shows link states on purpose.',
        },
      ],
    })

    expect(current.summary).toMatchObject({
      axeGroups: 1,
      acceptedGroups: 1,
      findings: 1,
    })
    expect(current.findings[0]).toMatchObject({
      occurrences: 1,
      nodes: [{ target: ['.dnb-anchor'] }],
    })
    expect(current.accepted[0]).toMatchObject({
      occurrences: 1,
      reason: 'Shows link states on purpose.',
    })
    expect(formatPortalAccessibilityReport(current)).toContain(
      '- 1 accepted findings (not counted)\n'
    )
    expect(formatPortalAccessibilityReport(current)).toContain(
      '## Accepted findings (1)\n'
    )
  })

  it('does not report a finding as resolved when it becomes accepted', () => {
    const previous = report([axe('/heading/', 'heading-order', 1)])
    const current = createPortalAccessibilityReport({
      duplicateIdFindings: [],
      axeFindings: [axe('/heading/', 'heading-order', 1)],
      scannedPages: 1,
      acceptedFindings: [
        {
          rule: 'heading-order',
          pages: ['/heading/'],
          reason: 'Shows every heading level.',
        },
      ],
    })

    expect(current.summary.findings).toBe(0)
    expect(formatPortalAccessibilityReport(current)).toContain(
      'No findings. The Portal is clean.'
    )
    expect(
      comparePortalAccessibilityReports(previous, current).resolved
    ).toEqual([])
  })

  it('gives every accepted finding a rule, a scope and a reason', () => {
    for (const accepted of acceptedFindings) {
      expect(accepted.rule).toBeTruthy()
      expect(accepted.reason).toBeTruthy()
      expect(accepted.pages || accepted.target).toBeTruthy()
      for (const page of accepted.pages || []) {
        expect(page).toMatch(/^\/.*\/$/)
      }
    }
  })
})

function report(findings: unknown[]) {
  return { schemaVersion: 1, summary: {}, findings }
}

function duplicateId(page: string, id: string, occurrences: number) {
  return { check: 'duplicate-id', page, id, occurrences }
}

function axe(
  page: string,
  id: string,
  occurrences: number,
  target = '#target'
) {
  return {
    check: 'axe',
    page,
    id,
    occurrences,
    impact: 'serious',
    help: 'Fix this issue',
    helpUrl: 'https://example.com/rule',
    nodes: [{ target: [target], failureSummary: 'Fix the target' }],
  }
}
