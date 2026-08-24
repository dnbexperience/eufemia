import { describe, expect, it } from 'vitest'

import {
  renderVisualReportSummary,
  type VisualReportFailure,
} from '../renderSummary'

const makeFailure = (
  overrides: Partial<VisualReportFailure> = {}
): VisualReportFailure => ({
  title: 'Table > has to match active state',
  testFilePath: 'src/components/table/Table.test.ts',
  lineNumber: 42,
  dataVisualTestId: 'table-active',
  message: 'Screenshot mismatch: 100 px differ (1.5%).',
  images: {
    expected: 'images/0-table-active.snap.expected.png',
    actual: 'images/0-table-active.actual.actual.png',
    diff: 'images/0-table-active.diff.diff.png',
  },
  ...overrides,
})

describe('renderVisualReportSummary', () => {
  it('renders a heading and the failure count', () => {
    const md = renderVisualReportSummary({ failures: [makeFailure()] })

    expect(md).toContain('## Visual regression report')
    expect(md).toContain(
      '**1** screenshot differs from the committed baseline.'
    )
  })

  it('pluralises the count and verb for several failures', () => {
    const md = renderVisualReportSummary({
      failures: [makeFailure(), makeFailure()],
    })

    expect(md).toContain(
      '**2** screenshots differ from the committed baseline.'
    )
  })

  it('links to the hosted report and embeds a diff thumbnail when a URL is given', () => {
    const md = renderVisualReportSummary(
      { failures: [makeFailure()] },
      'https://vr-branch.eufemia.pages.dev/'
    )

    // trailing slash is normalised away
    expect(md).toContain(
      '[Open the full interactive report](https://vr-branch.eufemia.pages.dev)'
    )
    expect(md).toContain(
      '<img src="https://vr-branch.eufemia.pages.dev/images/0-table-active.diff.diff.png" width="220"'
    )
    expect(md).toContain('| Test | Location | Diff |')
    expect(md).toContain('src/components/table/Table.test.ts:42')
  })

  it('falls back to the artifact note and no thumbnails without a URL', () => {
    const md = renderVisualReportSummary({ failures: [makeFailure()] })

    expect(md).toContain('**visual-test-artifact**')
    expect(md).not.toContain('<img')
    // diff column shows a dash placeholder
    expect(md).toMatch(/\|\s*—\s*\|/)
  })

  it('uses the actual image when no diff image exists', () => {
    const failure = makeFailure({
      images: {
        expected: 'images/0-x.expected.png',
        actual: 'images/0-x.actual.actual.png',
        diff: null,
      },
    })
    const md = renderVisualReportSummary(
      { failures: [failure] },
      'https://host'
    )

    expect(md).toContain('https://host/images/0-x.actual.actual.png')
  })

  it('omits the table when there are no failures', () => {
    const md = renderVisualReportSummary({ failures: [] })

    expect(md).toContain('**0** screenshots differ')
    expect(md).not.toContain('| Test | Location | Diff |')
  })

  it('escapes HTML-significant characters in text cells', () => {
    const failure = makeFailure({
      title: 'Field <script> & "friends"',
      message: 'a | b < c',
      dataVisualTestId: 'id-<x>',
    })
    const md = renderVisualReportSummary({ failures: [failure] })

    expect(md).toContain('Field &lt;script&gt; &amp; "friends"')
    expect(md).toContain('a \\| b &lt; c')
    expect(md).toContain('data-visual-test="id-&lt;x&gt;"')
    expect(md).not.toContain('<script>')
  })

  it('escapes backslashes before pipe-escaping so a cell cannot break the table', () => {
    const md = renderVisualReportSummary({
      failures: [makeFailure({ title: 'a\\|b', message: 'c\\d' })],
    })

    // A literal "\|" must become "\\" + "\|" so the pipe stays escaped and
    // does not introduce a new table column.
    expect(md).toContain('a' + '\\\\' + '\\|' + 'b')
    expect(md).toContain('c' + '\\\\' + 'd')
  })

  it('escapes double quotes in image URLs to prevent attribute breakout', () => {
    const failure = makeFailure({
      images: {
        expected: null,
        actual: null,
        diff: 'images/0-a"onerror=alert(1).diff.png',
      },
    })
    const md = renderVisualReportSummary(
      { failures: [failure] },
      'https://host'
    )

    expect(md).not.toContain('"onerror=alert(1)')
    expect(md).toContain('&quot;onerror=alert(1)')
  })

  it('caps the table and notes the overflow, pointing to the hosted report', () => {
    const failures = [makeFailure(), makeFailure(), makeFailure()]
    const md = renderVisualReportSummary({ failures }, 'https://host', 2)

    const rowCount = (md.match(/\| <strong>/g) || []).length
    expect(rowCount).toBe(2)
    expect(md).toContain('**3** screenshots differ')
    expect(md).toContain(
      'Showing the first 2 of 3 failures — see the full report for the remaining 1.'
    )
  })

  it('points the overflow note to the artifact when not hosted', () => {
    const failures = [makeFailure(), makeFailure(), makeFailure()]
    const md = renderVisualReportSummary({ failures }, '', 2)

    expect(md).toContain(
      'see the **visual-test-artifact** for the remaining 1.'
    )
  })
})
