// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { PNG } from 'pngjs'
import { createSizeMismatchDiff } from '../sizeMismatchDiff'

const white = [255, 255, 255, 255]
const red = [255, 0, 0, 255]

const createImage = (width: number, height: number) => {
  const image = new PNG({ width, height })
  image.data.fill(255)
  return image
}

const getPixel = (image: PNG, x: number, y: number) => {
  const offset = (y * image.width + x) * 4
  return Array.from(image.data.subarray(offset, offset + 4))
}

describe('createSizeMismatchDiff', () => {
  it('marks pixels that only exist in the taller image', () => {
    const reference = createImage(2, 1)
    const actual = createImage(2, 2)

    const diff = createSizeMismatchDiff(reference, actual)

    expect([diff.width, diff.height]).toEqual([2, 2])
    expect(getPixel(diff, 0, 0)).toEqual(white)
    expect(getPixel(diff, 0, 1)).toEqual(red)
    expect(getPixel(diff, 1, 1)).toEqual(red)
  })

  it('does not mark canvas space missing from both images', () => {
    const reference = createImage(2, 1)
    const actual = createImage(1, 2)

    const diff = createSizeMismatchDiff(reference, actual)

    expect(getPixel(diff, 1, 0)).toEqual(red)
    expect(getPixel(diff, 0, 1)).toEqual(red)
    expect(getPixel(diff, 1, 1)).toEqual(white)
  })

  it('keeps the normal pixel diff inside the shared area', () => {
    const reference = createImage(1, 1)
    const actual = createImage(1, 2)
    actual.data.set([0, 0, 0, 255], 0)

    const diff = createSizeMismatchDiff(reference, actual)

    expect(getPixel(diff, 0, 0)).toEqual(red)
    expect(getPixel(diff, 0, 1)).toEqual(red)
  })
})
