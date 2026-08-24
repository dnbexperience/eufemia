// @vitest-environment node

import { describe, expect, it } from 'vitest'

import {
  buildReportManifest,
  escapeHtml,
  renderHtml,
  reportImageName,
  type ResolvedFailure,
} from '../screenshotReporter'

const makeFailure = (
  overrides: Partial<ResolvedFailure> = {}
): ResolvedFailure => ({
  testFilePath:
    '/repo/packages/dnb-eufemia/src/components/table/Table.test.ts',
  relativeTestFilePath: 'src/components/table/Table.test.ts',
  fullName: 'Table > has to match active state',
  snapshotPath: '/snapshots/table-active.snap.png',
  diffPath: '/tmp/table-active.diff.png',
  actualPath: '/tmp/table-active.actual.png',
  expectedImagePath: '/snapshots/table-active.snap.png',
  dataVisualTestId: 'table-active',
  lineNumber: 42,
  message: 'Screenshot mismatch: 100 px differ (1.5%).',
  ...overrides,
})

describe('reportImageName', () => {
  it('prefixes the index and strips the .png extension and directory', () => {
    expect(reportImageName(3, '/a/b/table-active.snap.png', 'diff')).toBe(
      '3-table-active.snap.diff.png'
    )
  })
})

describe('buildReportManifest', () => {
  const existsAll = () => true

  it('maps each genuine failure to a summary row', () => {
    const failure = makeFailure()
    const manifest = buildReportManifest([failure], [failure], existsAll)

    expect(manifest.failureCount).toBe(1)
    expect(manifest.failures[0]).toMatchObject({
      title: 'Table > has to match active state',
      testFilePath: 'src/components/table/Table.test.ts',
      lineNumber: 42,
      dataVisualTestId: 'table-active',
      message: 'Screenshot mismatch: 100 px differ (1.5%).',
    })
  })

  it('references the images the HTML writer copied for that index', () => {
    const failure = makeFailure()
    const { images } = buildReportManifest([failure], [failure], existsAll)
      .failures[0]

    expect(images).toEqual({
      expected: 'images/0-table-active.snap.expected.png',
      actual: 'images/0-table-active.actual.actual.png',
      diff: 'images/0-table-active.diff.diff.png',
    })
  })

  it('uses the last index when a snapshot is retried', () => {
    const attempt1 = makeFailure()
    const attempt2 = makeFailure()

    // allFailures holds both attempts; the deduped genuine failure is the
    // last one, so its images must reference index 1 (the last copy).
    const { images } = buildReportManifest(
      [attempt1, attempt2],
      [attempt2],
      existsAll
    ).failures[0]

    expect(images.diff).toBe('images/1-table-active.diff.diff.png')
  })

  it('emits null for images whose source file is missing', () => {
    const failure = makeFailure()
    const { images } = buildReportManifest(
      [failure],
      [failure],
      () => false
    ).failures[0]

    expect(images).toEqual({ expected: null, actual: null, diff: null })
  })

  it('emits null for image kinds the record does not carry', () => {
    const failure = makeFailure({ diffPath: null, actualPath: null })
    const { images } = buildReportManifest([failure], [failure], existsAll)
      .failures[0]

    expect(images.diff).toBeNull()
    expect(images.actual).toBeNull()
    expect(images.expected).toBe('images/0-table-active.snap.expected.png')
  })

  it('strips ANSI codes and collapses newlines in the message', () => {
    const failure = makeFailure({
      message:
        '\u001B[33mScreenshot dimensions differ:\nreference 1x2\u001B[0m',
    })
    const { message } = buildReportManifest(
      [failure],
      [failure],
      existsAll
    ).failures[0]

    expect(message).toBe('Screenshot dimensions differ: reference 1x2')
  })
})

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)">&'`)).toBe(
      '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;&#39;'
    )
  })
})

describe('renderHtml', () => {
  // A failure with no on-disk images so renderHtml does no filesystem work.
  const imagelessFailure = (
    overrides: Partial<ResolvedFailure> = {}
  ): ResolvedFailure =>
    makeFailure({
      expectedImagePath: null,
      actualPath: null,
      diffPath: null,
      ...overrides,
    })

  const xss = '"><img src=x onerror=alert(1)>'

  it('escapes every untrusted value so it cannot become markup', () => {
    const html = renderHtml(
      [
        imagelessFailure({
          fullName: xss,
          testFilePath: xss,
          relativeTestFilePath: xss,
          dataVisualTestId: xss,
          message: xss,
        }),
      ],
      '/tmp/does-not-exist'
    )

    expect(html).not.toContain('<img src=x onerror=alert(1)>')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('data-clipboard-text="&quot;&gt;&lt;img')
  })

  it('does not emit an inline onclick handler', () => {
    const html = renderHtml(
      [imagelessFailure({ dataVisualTestId: 'table-active' })],
      '/tmp/does-not-exist'
    )

    expect(html).not.toContain('onclick=')
    expect(html).toContain('data-clipboard-text="table-active"')
  })

  it('escapes the failure message but keeps newlines as <br />', () => {
    const html = renderHtml(
      [imagelessFailure({ message: 'line<one>\nline&two' })],
      '/tmp/does-not-exist'
    )

    expect(html).toContain('line&lt;one&gt;<br />line&amp;two')
    expect(html).not.toContain('line<one>')
  })
})
