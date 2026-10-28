import { test } from 'node:test'
import assert from 'node:assert/strict'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { renderScreenshot } from './image.mts'

test('keeps the default wordmark complete in square and landscape center crops', async () => {
  const { data, info } = await sharp(
    fileURLToPath(
      new URL('../../static/dnb/og-image.png', import.meta.url)
    )
  )
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  assert.equal(info.width, 1200)
  assert.equal(info.height, 630)
  let left = info.width,
    right = 0,
    top = info.height,
    bottom = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const offset = (y * info.width + x) * info.channels
      if (data[offset] < 200) {
        left = Math.min(left, x)
        right = Math.max(right, x)
        top = Math.min(top, y)
        bottom = Math.max(bottom, y)
      }
    }
  }
  assert.ok(right > left && bottom > top)
  assert.ok(right - left <= 480)
  assert.ok(Math.abs((left + right) / 2 - 600) <= 1)
  assert.ok(Math.abs((top + bottom) / 2 - 315) <= 1)
  assert.ok(left >= 285 && right <= 915)
  assert.ok(top >= 15 && bottom <= 615)
})

async function inspect(width: number, height: number) {
  const crop = await sharp({
    create: { width, height, channels: 3, background: '#a5e1d2' },
  })
    .png()
    .toBuffer()
  const image = await renderScreenshot(crop)
  const metadata = await sharp(image).metadata()
  assert.equal(metadata.width, 1200)
  assert.equal(metadata.height, 630)
  const { data, info: pixels } = await sharp(image)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let x = pixels.width
  let y = pixels.height
  let right = -1
  let bottom = -1
  for (let row = 0; row < pixels.height; row++) {
    for (let column = 0; column < pixels.width; column++) {
      const offset = (row * pixels.width + column) * pixels.channels
      if (
        data[offset] === 165 &&
        data[offset + 1] === 225 &&
        data[offset + 2] === 210
      ) {
        x = Math.min(x, column)
        y = Math.min(y, row)
        right = Math.max(right, column)
        bottom = Math.max(bottom, row)
      }
    }
  }
  assert.ok(right >= x && bottom >= y)
  const info = { width: right - x + 1, height: bottom - y + 1 }
  assert.ok(Math.abs(x + info.width / 2 - 600) <= 0.5)
  assert.ok(Math.abs(y + info.height / 2 - 315) <= 0.5)
  for (const ratio of [1, 4 / 3, 16 / 9, 1200 / 630, 2]) {
    const cropWidth = Math.min(1200, 630 * ratio)
    const cropHeight = Math.min(630, 1200 / ratio)
    assert.ok(x >= (1200 - cropWidth) / 2, 'left edge at ' + ratio)
    assert.ok(y >= (630 - cropHeight) / 2, 'top edge at ' + ratio)
    assert.ok(
      x + info.width <= (1200 + cropWidth) / 2,
      'right edge at ' + ratio
    )
    assert.ok(
      y + info.height <= (630 + cropHeight) / 2,
      'bottom edge at ' + ratio
    )
  }
  return info
}

test('enlarges a small specimen to twice its native size in a landscape preview', async () => {
  const info = await inspect(176, 112)
  assert.equal(info.width, 176)
  assert.equal(info.height, 112)
})

test('keeps a wide specimen complete in square and landscape center crops', async () => {
  const info = await inspect(2400, 400)
  assert.equal(info.width, 534)
  assert.equal(info.height, 89)
})

test('keeps a tall specimen complete in square and landscape center crops', async () => {
  const info = await inspect(400, 2400)
  assert.equal(info.width, 89)
  assert.equal(info.height, 534)
})

test('removes unused wrapper space before sizing the visible specimen', async () => {
  const crop = await sharp({
    create: { width: 1600, height: 400, channels: 4, background: '#0000' },
  })
    .composite([
      {
        input: await sharp({
          create: {
            width: 400,
            height: 160,
            channels: 3,
            background: '#a5e1d2',
          },
        })
          .png()
          .toBuffer(),
        left: 40,
        top: 40,
      },
    ])
    .png()
    .toBuffer()
  const image = await renderScreenshot(crop)
  const { data, info } = await sharp(image)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const pixel = (x: number, y: number) => [
    ...data.subarray(
      (y * info.width + x) * info.channels,
      (y * info.width + x) * info.channels + 3
    ),
  ]
  assert.deepEqual(pixel(400, 235), [165, 225, 210])
  assert.deepEqual(pixel(799, 394), [165, 225, 210])
  assert.notDeepEqual(pixel(399, 235), [165, 225, 210])
  assert.notDeepEqual(pixel(800, 394), [165, 225, 210])
})

test('uses the demo grid behind transparent content and preserves opaque white surfaces', async () => {
  const crop = await sharp({
    create: { width: 176, height: 112, channels: 4, background: '#fff' },
  })
    .png()
    .toBuffer()
  const image = await renderScreenshot(crop)
  const { data, info } = await sharp(image)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const pixel = (x: number, y: number) => [
    ...data.subarray(
      (y * info.width + x) * info.channels,
      (y * info.width + x) * info.channels + 3
    ),
  ]
  assert.deepEqual(pixel(10, 10), [255, 255, 255])
  assert.ok(pixel(0, 10)[0] < 255)
  assert.ok(pixel(64, 10)[0] < pixel(16, 10)[0])
  assert.deepEqual(pixel(592, 310), [255, 255, 255])
})
