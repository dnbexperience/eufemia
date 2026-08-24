// @vitest-environment node

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import ScreenshotReporter, {
  buildReportManifest,
  escapeHtml,
  renderHtml,
  reportImageName,
  type ResolvedFailure,
} from '../screenshotReporter'
import { drainFailures, recordFailure } from '../failures'

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
    const manifest = buildReportManifest([failure], existsAll)

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
    const { images } = buildReportManifest([failure], existsAll)
      .failures[0]

    expect(images).toEqual({
      expected: 'images/0-table-active.snap.expected.png',
      actual: 'images/0-table-active.actual.actual.png',
      diff: 'images/0-table-active.diff.diff.png',
    })
  })

  it('indexes images by position in the failure list', () => {
    const first = makeFailure()
    const second = makeFailure({
      snapshotPath: '/snapshots/other.snap.png',
      diffPath: '/tmp/other.diff.png',
    })

    const manifest = buildReportManifest([first, second], existsAll)

    expect(manifest.failures[0].images.diff).toBe(
      'images/0-table-active.diff.diff.png'
    )
    expect(manifest.failures[1].images.diff).toBe(
      'images/1-other.diff.diff.png'
    )
  })

  it('emits null for images whose source file is missing', () => {
    const failure = makeFailure()
    const { images } = buildReportManifest([failure], () => false)
      .failures[0]

    expect(images).toEqual({ expected: null, actual: null, diff: null })
  })

  it('emits null for image kinds the record does not carry', () => {
    const failure = makeFailure({ diffPath: null, actualPath: null })
    const { images } = buildReportManifest([failure], existsAll)
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
    const { message } = buildReportManifest([failure], existsAll)
      .failures[0]

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

describe('ScreenshotReporter.onTestRunEnd', () => {
  let tmpDir: string

  beforeEach(() => {
    drainFailures()
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vr-report-'))
    // process.chdir is unsupported in vitest workers, so point the
    // reporter at the temp dir by stubbing the cwd it reads.
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    fs.rmSync(tmpDir, { recursive: true, force: true })
    drainFailures()
  })

  it('reports only genuinely-failed tests, excluding flaky retries', () => {
    recordFailure({
      testFilePath: '/tmp/fake.test.ts',
      fullName: 'Flaky > recovers on retry',
      snapshotPath: '/tmp/missing-flaky.snap.png',
      diffPath: null,
      actualPath: null,
      message: 'Screenshot mismatch: 10 px differ (0.1%).',
    })
    recordFailure({
      testFilePath: '/tmp/fake.test.ts',
      fullName: 'Genuine > stays broken',
      snapshotPath: '/tmp/missing-genuine.snap.png',
      diffPath: null,
      actualPath: null,
      message: 'Screenshot mismatch: 999 px differ (9%).',
    })

    // The flaky test passed on retry; only the genuine one is still failed.
    const modules = [
      {
        children: [
          {
            type: 'test',
            fullName: 'Flaky > recovers on retry',
            result: () => ({ state: 'passed' }),
          },
          {
            type: 'test',
            fullName: 'Genuine > stays broken',
            result: () => ({ state: 'failed' }),
          },
        ],
      },
    ] as never

    new ScreenshotReporter().onTestRunEnd(modules, [], 'failed' as never)

    const reportDir = path.join(tmpDir, 'visual-diff-report')
    const html = fs.readFileSync(
      path.join(reportDir, 'index.html'),
      'utf-8'
    )
    const manifest = JSON.parse(
      fs.readFileSync(path.join(reportDir, 'report.json'), 'utf-8')
    )

    expect(html).toContain('Genuine &gt; stays broken')
    expect(html).toContain('Failed Tests: <b>1</b>')
    expect(html).not.toContain('Flaky')

    expect(manifest.failureCount).toBe(1)
    expect(
      manifest.failures.map((failure: { title: string }) => failure.title)
    ).toEqual(['Genuine > stays broken'])
  })
})
