// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { PNG } from 'pngjs'

// defineBrowserCommand isn't available outside browser mode; make it a
// passthrough so the engine module can be imported in a node test.
vi.mock('@vitest/browser-playwright', () => ({
  defineBrowserCommand: vi.fn(
    <T extends unknown[]>(fn: (...args: T) => unknown) => fn
  ),
}))

// Capture failure records so we can assert a diff path is reported.
vi.mock('../failures', () => ({
  recordFailure: vi.fn(),
  recordNavigation: vi.fn(),
}))

import {
  _testing,
  type MakeScreenshotPayload,
} from '../commands/screenshotEngine'
import { recordFailure } from '../failures'

const { diffAndPersist } = _testing

const solidPngBytes = (
  width: number,
  height: number,
  [r, g, b, a]: [number, number, number, number] = [255, 255, 255, 255]
): Buffer => {
  const png = new PNG({ width, height })
  for (let i = 0; i < width * height; i++) {
    png.data[i * 4] = r
    png.data[i * 4 + 1] = g
    png.data[i * 4 + 2] = b
    png.data[i * 4 + 3] = a
  }
  return PNG.sync.write(png)
}

let tmpDir: string

const makePayload = (): MakeScreenshotPayload =>
  ({
    testFilePath: '/repo/src/Example.screenshot.test.tsx',
    fullName: 'Example > renders',
    snapshotPath: path.join(tmpDir, 'snapshot.snap.png'),
    diffPath: path.join(tmpDir, 'snapshot.diff.png'),
    actualPath: path.join(tmpDir, 'snapshot.actual.png'),
    htmlDumpPath: path.join(tmpDir, 'snapshot.html'),
    allowedMismatchedPixelRatio: 0,
    update: false,
  }) as unknown as MakeScreenshotPayload

beforeEach(() => {
  vi.clearAllMocks()
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-diff-'))
})

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('diffAndPersist', () => {
  // The reported real-world scenario: a Field help/info-message expands
  // the component so the actual screenshot is taller than the baseline.
  it('writes a diff image and reports its path when dimensions differ', async () => {
    const payload = makePayload()
    fs.writeFileSync(payload.snapshotPath, solidPngBytes(8, 8))
    const actualBytes = solidPngBytes(8, 16)

    const result = await diffAndPersist(payload, actualBytes)

    expect(result.status).toBe('size-mismatch')
    if (result.status !== 'size-mismatch') {
      throw new Error('expected a size-mismatch result')
    }
    expect(result.reference).toEqual({ width: 8, height: 8 })
    expect(result.actual).toEqual({ width: 8, height: 16 })
    expect(result.diffPath).toBe(payload.diffPath)

    // The diff image is actually written to disk (previously it was not).
    expect(fs.existsSync(payload.diffPath)).toBe(true)
    expect(fs.existsSync(payload.actualPath)).toBe(true)

    const diffPng = PNG.sync.read(fs.readFileSync(payload.diffPath))
    expect(diffPng.width).toBe(8)
    expect(diffPng.height).toBe(16)
    // A pixel in the added band is highlighted.
    const i = (12 * diffPng.width + 4) * 4
    expect([
      diffPng.data[i],
      diffPng.data[i + 1],
      diffPng.data[i + 2],
      diffPng.data[i + 3],
    ]).toEqual([255, 0, 0, 255])

    expect(recordFailure).toHaveBeenCalledTimes(1)
    const record = vi.mocked(recordFailure).mock.calls[0][0]
    expect(record.diffPath).toBe(payload.diffPath)
    expect(record.message).toContain('dimensions differ')
  })

  it('does not write a diff for an identical equal-size screenshot', async () => {
    const payload = makePayload()
    const bytes = solidPngBytes(8, 8)
    fs.writeFileSync(payload.snapshotPath, bytes)

    const result = await diffAndPersist(payload, bytes)

    expect(result.status).toBe('match')
    expect(fs.existsSync(payload.diffPath)).toBe(false)
    expect(fs.existsSync(payload.actualPath)).toBe(false)
    expect(recordFailure).not.toHaveBeenCalled()
  })
})
