/**
 * Server-side BrowserCommands used by the `loadImage` /
 * `toMatchImageSnapshot` shim.
 *
 * `loadImage` reads a file from disk and ships it to the iframe as
 * base64. `matchImageSnapshot` runs the same diff pipeline as the
 * screenshot engine on a buffer that was loaded from disk by the
 * test (Logo's PNG asset comparison).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { defineBrowserCommand } from '@vitest/browser-playwright'
import blazediff from '@blazediff/core'
import { PNG } from 'pngjs'

import type { MakeScreenshotResult } from './screenshotEngine'
import { recordFailure } from '../failures'

export type LoadImagePayload = {
  imagePath: string
}

export const loadImage = defineBrowserCommand<[LoadImagePayload]>(
  async (_ctx, payload) => {
    const buf = await fs.readFile(path.resolve(payload.imagePath))
    return { base64: buf.toString('base64') }
  }
)

type MatchImageSnapshotPayload = {
  bytesBase64: string
  snapshotPath: string
  diffPath: string
  actualPath: string
  testFilePath: string
  fullName: string
  allowedMismatchedPixelRatio: number
  update: boolean
}

const writeFile = async (filePath: string, bytes: Uint8Array | Buffer) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, new Uint8Array(bytes))
}

const readIfExists = async (filePath: string) => {
  try {
    return await fs.readFile(filePath)
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }
    throw e
  }
}

const removeIfExists = async (filePath: string) => {
  try {
    await fs.rm(filePath)
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw e
    }
  }
}

export const matchImageSnapshot = defineBrowserCommand<
  [MatchImageSnapshotPayload]
>(async (_ctx, payload): Promise<MakeScreenshotResult> => {
  const actualBytes = Buffer.from(payload.bytesBase64, 'base64')
  const reference = await readIfExists(payload.snapshotPath)

  if (!reference || payload.update) {
    await writeFile(payload.snapshotPath, actualBytes)
    await removeIfExists(payload.diffPath)
    await removeIfExists(payload.actualPath)
    return {
      status: reference ? 'updated' : 'created',
      snapshotPath: payload.snapshotPath,
    }
  }

  const referencePng = PNG.sync.read(reference)
  const actualPng = PNG.sync.read(actualBytes)

  if (
    referencePng.width !== actualPng.width ||
    referencePng.height !== actualPng.height
  ) {
    await writeFile(payload.actualPath, actualBytes)
    recordFailure({
      testFilePath: payload.testFilePath,
      fullName: payload.fullName,
      snapshotPath: payload.snapshotPath,
      diffPath: null,
      actualPath: payload.actualPath,
      message: `Image dimensions differ: reference ${referencePng.width}x${referencePng.height}, actual ${actualPng.width}x${actualPng.height}.`,
    })
    return {
      status: 'size-mismatch',
      reference: {
        width: referencePng.width,
        height: referencePng.height,
      },
      actual: {
        width: actualPng.width,
        height: actualPng.height,
      },
      actualPath: payload.actualPath,
    }
  }

  const diff = new PNG({
    width: referencePng.width,
    height: referencePng.height,
  })
  const diffPixels = blazediff(
    referencePng.data,
    actualPng.data,
    diff.data,
    referencePng.width,
    referencePng.height,
    { threshold: 0.05 }
  )
  const total = referencePng.width * referencePng.height
  const ratio = total === 0 ? 0 : diffPixels / total

  if (ratio > payload.allowedMismatchedPixelRatio) {
    await writeFile(payload.actualPath, actualBytes)
    await writeFile(payload.diffPath, PNG.sync.write(diff))
    recordFailure({
      testFilePath: payload.testFilePath,
      fullName: payload.fullName,
      snapshotPath: payload.snapshotPath,
      diffPath: payload.diffPath,
      actualPath: payload.actualPath,
      message: `Image mismatch: ${diffPixels} px differ (${(ratio * 100).toFixed(3)}%).`,
    })
    return {
      status: 'mismatch',
      diffPixels,
      ratio,
      width: referencePng.width,
      height: referencePng.height,
      diffPath: payload.diffPath,
      actualPath: payload.actualPath,
    }
  }

  await removeIfExists(payload.diffPath)
  await removeIfExists(payload.actualPath)
  return { status: 'match' }
})
