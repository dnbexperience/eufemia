// @vitest-environment node

import { describe, expect, it } from 'vitest'

import {
  buildReportManifest,
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
