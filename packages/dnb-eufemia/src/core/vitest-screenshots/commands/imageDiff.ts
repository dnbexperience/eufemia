/**
 * Shared image-diff helper used by the screenshot engine and the
 * `matchImageSnapshot` command.
 *
 * blazediff can only compare two buffers of identical dimensions. When
 * a screenshot changes size, both images are padded onto a common union
 * canvas (max width × max height) so the comparison still runs and the
 * added/removed region is highlighted in the diff — instead of
 * producing no diff image at all.
 */

import blazediff from '@blazediff/core'
import { PNG } from 'pngjs'

// 1% per-pixel color difference tolerance.
const DEFAULT_THRESHOLD = 0.01

export type ImageDiffResult = {
  diff: PNG
  diffPixels: number
  totalPixels: number
  width: number
  height: number
  sizeMismatch: boolean
}

/**
 * Copy the top-left `targetWidth × targetHeight` region of an RGBA image
 * into a fresh, contiguous buffer. Pixels outside the source image are
 * left transparent (zero-filled); blazediff reports those as a
 * difference against the opaque screenshot content, so padded areas show
 * up in the diff. Handles the differing row stride between the source
 * and the target.
 */
export const copyImageRegion = (
  sourceData: Buffer,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number
): Buffer => {
  const dest = Buffer.alloc(targetWidth * targetHeight * 4)
  const copyWidth = Math.min(sourceWidth, targetWidth)
  const copyHeight = Math.min(sourceHeight, targetHeight)
  const sourceStride = sourceWidth * 4
  const targetStride = targetWidth * 4
  const rowBytes = copyWidth * 4

  for (let y = 0; y < copyHeight; y++) {
    sourceData.copy(
      dest,
      y * targetStride,
      y * sourceStride,
      y * sourceStride + rowBytes
    )
  }

  return dest
}

/**
 * Compare two decoded PNGs and produce a diff image. When the images
 * differ in size, both are padded onto a union canvas first so the diff
 * always renders (the size delta shows as a highlighted band).
 */
export const diffImages = (
  reference: PNG,
  actual: PNG,
  options: { threshold?: number } = {}
): ImageDiffResult => {
  const sizeMismatch =
    reference.width !== actual.width || reference.height !== actual.height
  const width = Math.max(reference.width, actual.width)
  const height = Math.max(reference.height, actual.height)

  const referenceData = sizeMismatch
    ? copyImageRegion(
        reference.data,
        reference.width,
        reference.height,
        width,
        height
      )
    : reference.data
  const actualData = sizeMismatch
    ? copyImageRegion(
        actual.data,
        actual.width,
        actual.height,
        width,
        height
      )
    : actual.data

  const diff = new PNG({ width, height })
  const diffPixels = blazediff(
    referenceData,
    actualData,
    diff.data,
    width,
    height,
    { threshold: options.threshold ?? DEFAULT_THRESHOLD }
  )
  const totalPixels = width * height

  return { diff, diffPixels, totalPixels, width, height, sizeMismatch }
}
