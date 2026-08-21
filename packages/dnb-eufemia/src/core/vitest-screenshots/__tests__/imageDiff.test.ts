// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { PNG } from 'pngjs'

import { copyImageRegion, diffImages } from '../commands/imageDiff'

// blazediff paints differing pixels with its default diff color (red).
const RED: [number, number, number, number] = [255, 0, 0, 255]
const WHITE: [number, number, number, number] = [255, 255, 255, 255]

const solid = (
  width: number,
  height: number,
  [r, g, b, a]: [number, number, number, number] = WHITE
): PNG => {
  const png = new PNG({ width, height })
  for (let i = 0; i < width * height; i++) {
    png.data[i * 4] = r
    png.data[i * 4 + 1] = g
    png.data[i * 4 + 2] = b
    png.data[i * 4 + 3] = a
  }
  return png
}

const fillRect = (
  png: PNG,
  x0: number,
  y0: number,
  w: number,
  h: number,
  [r, g, b, a]: [number, number, number, number]
) => {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      const i = (y * png.width + x) * 4
      png.data[i] = r
      png.data[i + 1] = g
      png.data[i + 2] = b
      png.data[i + 3] = a
    }
  }
}

const pixelAt = (
  png: PNG,
  x: number,
  y: number
): [number, number, number, number] => {
  const i = (y * png.width + x) * 4
  return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]]
}

describe('copyImageRegion', () => {
  it('pads a smaller image into the top-left and leaves the rest transparent', () => {
    const source = solid(2, 2, [10, 20, 30, 40])
    const padded = copyImageRegion(source.data, 2, 2, 4, 4)

    expect(padded.length).toBe(4 * 4 * 4)
    // Top-left pixel copied from the source.
    expect([padded[0], padded[1], padded[2], padded[3]]).toEqual([
      10, 20, 30, 40,
    ])
    // Second source row lands on the padded row stride, not the source one.
    const secondRow = (1 * 4 + 0) * 4
    expect([
      padded[secondRow],
      padded[secondRow + 1],
      padded[secondRow + 2],
      padded[secondRow + 3],
    ]).toEqual([10, 20, 30, 40])
    // A pixel outside the source stays transparent.
    const outside = (0 * 4 + 2) * 4
    expect([
      padded[outside],
      padded[outside + 1],
      padded[outside + 2],
      padded[outside + 3],
    ]).toEqual([0, 0, 0, 0])
  })

  it('crops a larger image down to the target region', () => {
    const source = solid(4, 4, [1, 2, 3, 255])
    const cropped = copyImageRegion(source.data, 4, 4, 2, 2)

    expect(cropped.length).toBe(2 * 2 * 4)
    const last = (1 * 2 + 1) * 4
    expect([
      cropped[last],
      cropped[last + 1],
      cropped[last + 2],
      cropped[last + 3],
    ]).toEqual([1, 2, 3, 255])
  })
})

describe('diffImages', () => {
  it('reports no difference for identical equal-size images', () => {
    const { diff, diffPixels, sizeMismatch, width, height } = diffImages(
      solid(8, 8),
      solid(8, 8)
    )

    expect(sizeMismatch).toBe(false)
    expect(diffPixels).toBe(0)
    expect(width).toBe(8)
    expect(height).toBe(8)
    expect(diff.width).toBe(8)
    expect(diff.height).toBe(8)
  })

  it('detects content differences for equal-size images', () => {
    const actual = solid(8, 8)
    fillRect(actual, 0, 0, 4, 4, RED)

    const { diffPixels, sizeMismatch } = diffImages(solid(8, 8), actual)

    expect(sizeMismatch).toBe(false)
    expect(diffPixels).toBe(16)
  })

  // The reported real-world scenario: a Field help/info-message expands
  // the component so the actual screenshot is taller than the baseline.
  it('produces a union-sized diff and highlights the added band when the actual is taller', () => {
    const { diff, diffPixels, sizeMismatch, width, height } = diffImages(
      solid(8, 8),
      solid(8, 16)
    )

    expect(sizeMismatch).toBe(true)
    expect(width).toBe(8)
    expect(height).toBe(16)
    expect(diff.width).toBe(8)
    expect(diff.height).toBe(16)
    // The extra band (present only in the taller actual) is highlighted.
    expect(diffPixels).toBe(64)
    expect(pixelAt(diff, 4, 12)).toEqual(RED)
    // The overlapping region is unchanged, so it is not highlighted.
    expect(pixelAt(diff, 4, 4)).not.toEqual(RED)
  })

  it('produces a union-sized diff and highlights the added band when the actual is wider', () => {
    const { diff, diffPixels, sizeMismatch, width, height } = diffImages(
      solid(8, 8),
      solid(16, 8)
    )

    expect(sizeMismatch).toBe(true)
    expect(width).toBe(16)
    expect(height).toBe(8)
    expect(diffPixels).toBe(64)
    expect(pixelAt(diff, 12, 4)).toEqual(RED)
    expect(pixelAt(diff, 4, 4)).not.toEqual(RED)
  })

  it('highlights both the size delta and content changes in the overlap', () => {
    const actual = solid(8, 16)
    fillRect(actual, 0, 0, 4, 4, RED)

    const { diff, diffPixels, sizeMismatch } = diffImages(
      solid(8, 8),
      actual
    )

    expect(sizeMismatch).toBe(true)
    // 16 changed pixels in the overlap + 64 for the added band.
    expect(diffPixels).toBe(80)
    expect(pixelAt(diff, 2, 2)).toEqual(RED) // content change
    expect(pixelAt(diff, 4, 12)).toEqual(RED) // added band
    expect(pixelAt(diff, 6, 6)).not.toEqual(RED) // unchanged overlap
  })

  it('handles a reference larger than the actual (removed region)', () => {
    const { diff, diffPixels, sizeMismatch, width, height } = diffImages(
      solid(8, 16),
      solid(8, 8)
    )

    expect(sizeMismatch).toBe(true)
    expect(width).toBe(8)
    expect(height).toBe(16)
    expect(diffPixels).toBe(64)
    // The region present only in the reference is highlighted.
    expect(pixelAt(diff, 4, 12)).toEqual(RED)
  })
})
