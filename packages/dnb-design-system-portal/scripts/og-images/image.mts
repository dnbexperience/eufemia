import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const grid = readFile(new URL('./grid.svg', import.meta.url))

export async function renderScreenshot(crop: Buffer) {
  const { data: trimmed, info } = await sharp(crop)
    .trim({ threshold: 2, lineArt: true })
    .toBuffer({ resolveWithObject: true })
  // Captures use 4x density; output represents a 2x social preview.
  const scale = Math.min(1, 534 / info.width, 534 / info.height)
  const image = await sharp(trimmed)
    .resize({
      width: Math.max(1, Math.round(info.width * scale)),
      height: Math.max(1, Math.round(info.height * scale)),
      fit: 'fill',
    })
    .toBuffer()
  const { width = 0, height = 0 } = await sharp(image).metadata()
  const left = Math.floor((1200 - width) / 2)
  const top = Math.floor((630 - height) / 2)
  return sharp(await grid)
    .composite([{ input: image, left, top }])
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer()
}
