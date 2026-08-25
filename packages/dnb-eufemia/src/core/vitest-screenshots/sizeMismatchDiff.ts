import blazediff from '@blazediff/core'
import { PNG } from 'pngjs'

const diffColor = [255, 0, 0, 255] as const

export const createSizeMismatchDiff = (
  reference: PNG,
  actual: PNG
): PNG => {
  const width = Math.max(reference.width, actual.width)
  const height = Math.max(reference.height, actual.height)
  const normalizedReference = normalizeImage(reference, width, height)
  const normalizedActual = normalizeImage(actual, width, height)
  const diff = new PNG({ width, height })

  blazediff(
    normalizedReference.data,
    normalizedActual.data,
    diff.data,
    width,
    height,
    { threshold: 0.01 }
  )

  markExclusivePixels(diff, reference, actual)

  return diff
}

const normalizeImage = (source: PNG, width: number, height: number) => {
  if (source.width === width && source.height === height) {
    return source
  }

  const target = new PNG({ width, height })
  const rowLength = source.width * 4

  for (let y = 0; y < source.height; y += 1) {
    const sourceStart = y * rowLength
    const targetStart = y * target.width * 4
    target.data.set(
      source.data.subarray(sourceStart, sourceStart + rowLength),
      targetStart
    )
  }

  return target
}

const markExclusivePixels = (diff: PNG, reference: PNG, actual: PNG) => {
  const commonWidth = Math.min(reference.width, actual.width)
  const commonHeight = Math.min(reference.height, actual.height)

  for (let y = 0; y < commonHeight; y += 1) {
    markRow(diff, y, commonWidth, diff.width)
  }

  const tallerImage = reference.height > actual.height ? reference : actual
  for (let y = commonHeight; y < tallerImage.height; y += 1) {
    markRow(diff, y, 0, tallerImage.width)
  }
}

const markRow = (diff: PNG, y: number, start: number, end: number) => {
  for (let x = start; x < end; x += 1) {
    const offset = (y * diff.width + x) * 4
    diff.data.set(diffColor, offset)
  }
}
