import { describe, expect, it } from 'vitest'
import { createRequire } from 'node:module'
import {
  comparePortalAccessibilityReports,
  createPortalAccessibilityReport,
  findDuplicateIds,
  formatPortalAccessibilityChanges,
  formatPortalAccessibilityReport,
  getAxeOptions,
  splitIssueBody,
} from '../../../scripts/portal-accessibility-report.mjs'

// Use the axe-core version that the scan runs with @axe-core/playwright
const require = createRequire(import.meta.url)
const axeCore = createRequire(require.resolve('@axe-core/playwright'))(
  'axe-core'
)

describe('Portal accessibility report', () => {
  it('accepts open tooltips outside landmarks, but not other content', async () => {
    document.body.innerHTML = `
      <div id="tooltip-portal"><span role="tooltip">Tooltip text</span></div>
      <main><h1>Page</h1></main>
      <div id="other-portal"><p>Portal content</p></div>
    `

    const { violations } = await axeCore.run(document, {
      ...getAxeOptions(),
      runOnly: ['region'],
    })

    expect(
      violations.flatMap(({ nodes }) =>
        nodes.map(({ target }) => target.join(' '))
      )
    ).toEqual(['#other-portal'])
  })

  it('combines hydrated duplicate IDs and axe findings', () => {
    const report = createPortalAccessibilityReport({
      duplicateIdFindings: [duplicateId('/button/', 'examples', 2)],
      axeFindings: [axe('/anchor/', 'landmark-one-main', 1)],
      scannedPages: 2,
    })

    expect(report.summary).toEqual({
      pages: 2,
      colorSchemes: ['light'],
      duplicateIdGroups: 1,
      axeGroups: 1,
      axeReviewGroups: 0,
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

  it('keeps dark mode findings apart from the same rule in light mode', () => {
    const previous = report([axe('/code/', 'color-contrast', 2)])
    const current = createPortalAccessibilityReport({
      duplicateIdFindings: [],
      axeFindings: [
        axe('/code/', 'color-contrast', 2),
        { ...axe('/code/', 'color-contrast', 3), colorScheme: 'dark' },
      ],
      scannedPages: 1,
      colorSchemes: ['light', 'dark'],
    })

    const changes = comparePortalAccessibilityReports(previous, current)
    const markdown = formatPortalAccessibilityReport(current)

    expect(changes.new).toEqual([
      expect.objectContaining({ colorScheme: 'dark', occurrences: 3 }),
    ])
    expect(changes.resolved).toEqual([])
    expect(markdown).toContain(
      'Scanned 1 canonical pages in light and dark mode.'
    )
    expect(markdown).toContain(
      '3 nodes on [/code/](https://eufemia.dnb.no/code/) in dark mode'
    )
    expect(formatPortalAccessibilityChanges(changes)).toContain(
      '3 occurrences on /code/ in dark mode'
    )
  })

  it('names only dark mode when only dark mode was scanned', () => {
    const markdown = formatPortalAccessibilityReport(
      createPortalAccessibilityReport({
        duplicateIdFindings: [],
        axeFindings: [],
        scannedPages: 1,
        colorSchemes: ['dark'],
      })
    )

    expect(markdown).toContain('Scanned 1 canonical pages in dark mode.')
  })

  it('reports axe findings that need review apart from violations', () => {
    const previous = report([axe('/stat/', 'aria-prohibited-attr', 1)])
    const current = createPortalAccessibilityReport({
      duplicateIdFindings: [],
      axeFindings: [axe('/stat/', 'aria-prohibited-attr', 1)],
      axeReviewFindings: [
        {
          ...axe('/stat/', 'aria-prohibited-attr', 2, '.dnb-stat__text'),
          check: 'axe-review',
        },
      ],
      scannedPages: 1,
    })

    const changes = comparePortalAccessibilityReports(previous, current)
    const markdown = formatPortalAccessibilityReport(current)

    expect(current.summary).toEqual(
      expect.objectContaining({ axeGroups: 1, axeReviewGroups: 1 })
    )
    expect(changes.new).toEqual([
      expect.objectContaining({ check: 'axe-review', occurrences: 2 }),
    ])
    expect(changes.resolved).toEqual([])
    expect(markdown).toContain('- 1 axe findings that need review')
    expect(markdown).toContain('## Axe findings that need review (1)')
    expect(markdown.slice(markdown.indexOf('need review (1)'))).toContain(
      '`.dnb-stat__text`'
    )
    expect(formatPortalAccessibilityChanges(changes)).toContain(
      'axe `aria-prohibited-attr` (needs review) – 2 occurrences on /stat/'
    )
  })

  it('leaves out the review section when nothing needs review', () => {
    const markdown = formatPortalAccessibilityReport(
      report([axe('/stat/', 'aria-prohibited-attr', 1)]) as never
    )

    expect(markdown).not.toContain('need review')
  })

  it('groups generated duplicate IDs by the part that shows the cause', () => {
    const markdown = formatPortalAccessibilityReport(
      createPortalAccessibilityReport({
        duplicateIdFindings: [
          duplicateId('/boolean/', 'id-R1inaqdb5-label', 2),
          duplicateId('/boolean/', 'id-R6avaqdb5-label', 2),
          duplicateId('/toggle/', 'id-r3c-label', 2),
          duplicateId('/help/', 'id-R1kraqdb5-help', 2),
          duplicateId('/radio/', 'id-radio-label', 2),
          duplicateId('/button/', 'examples', 2),
        ],
        axeFindings: [],
        scannedPages: 4,
      })
    )

    expect(markdown).toContain('- `#id-…-label` – 3 ids on 2 pages')
    // One id of a pattern is not a group, and hand-written ids are not generated
    expect(markdown).not.toContain('`#id-…-help`')
    expect(markdown).not.toContain('`#id-…adio-label`')
    expect(markdown).toContain(
      '`#id-radio-label` – 2 occurrences on [/radio/]'
    )
    expect(markdown).toContain('`#examples` – 2 occurrences on [/button/]')
  })

  it('rejects comparisons across schema versions', () => {
    expect(() =>
      comparePortalAccessibilityReports(
        { ...report([]), schemaVersion: 1 },
        { ...report([]), schemaVersion: 2 }
      )
    ).toThrow('Cannot compare Portal accessibility report schema 1 with 2')
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
