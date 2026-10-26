import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { chromium, type Page } from '@playwright/test'
import sharp from 'sharp'
import { capturePreview as capture, captureSpecimen } from './capture.mts'

const capturePreview = (page: Page, url: string, assets: string[]) =>
  capture(page, url, assets, 'landscape')

test('preserves native demo layout and captures small controls at 2x resolution', async () => {
  const server = createServer((request, response) => {
    response.setHeader('content-type', 'text/html')
    if (request.url === '/outline/') {
      response.end(
        '<style>.specimen{width:60px;height:40px;background:white;box-shadow:0 0 0 1px #999}</style><div class="dnb-live-preview"><div class="specimen"></div></div>'
      )
      return
    }
    if (request.url === '/stack/') {
      response.end(
        '<style>.dnb-flex-container{display:flex;gap:24px}.dnb-flex-container>button{width:120px;height:40px;margin-right:24px}.dnb-flex-container>button:first-child{width:80px}.dnb-flex-container>button:last-child{width:100px}</style><div class="dnb-live-preview" data-social-preview="true" data-social-preview-layout="stack"><div class="dnb-flex-container"><button>Primary</button><button>Secondary</button><button>Tertiary</button></div></div>'
      )
      return
    }
    if (request.url === '/first-width/') {
      response.end(
        '<div class="dnb-live-preview"><section style="width:100%;height:60px"><span style="display:block;width:450px">First example</span></section></div><div class="dnb-live-preview"><button style="width:90px;height:30px">Later example</button></div>'
      )
      return
    }
    if (request.url === '/marked/') {
      response.end(
        '<div class="dnb-live-preview"><button style="width:90px;height:30px">First</button></div><div class="dnb-live-preview" data-social-preview="true"><section style="width:150px;height:60px">Chosen example</section></div>'
      )
      return
    }
    if (request.url === '/duplicate/') {
      response.end(
        '<div class="dnb-live-preview" data-social-preview="true"><button>First</button></div><div class="dnb-live-preview" data-social-preview="true"><button>Second</button></div>'
      )
      return
    }
    if (request.url === '/marked-unsuitable/') {
      response.end(
        '<div class="dnb-live-preview"><button>First</button></div><div class="dnb-live-preview" data-social-preview="true" style="height:1600px">Chosen example</div><div class="dnb-live-preview"><button>Later</button></div>'
      )
      return
    }
    if (request.url === '/transparent/') {
      response.end(
        '<style>body{background:#ff0000}.wrapper{background:#0000ff}.dnb-live-preview{width:50px;height:30px}.specimen{display:block;width:50px;height:30px;background:linear-gradient(to right,transparent 50%,white 50%)}</style><div class="wrapper"><div class="dnb-live-preview"><span class="specimen"></span></div></div>'
      )
      return
    }
    if (request.url === '/fade-in/') {
      response.end(
        '<style>@keyframes appear{to{opacity:1}}.specimen{display:block;width:40px;height:40px;background:#a5e1d2;opacity:0;animation:appear 20s forwards}</style><div class="dnb-live-preview"><span class="specimen"></span></div>'
      )
      return
    }
    if (request.url === '/value/') {
      response.end(
        '<h3>Empty</h3><div class="dnb-live-preview"><span style="display:inline-block;width:20px;height:24px">–</span></div><h3>Placeholder</h3><div class="dnb-live-preview"><span>No value</span></div><h3>Value</h3><div class="dnb-live-preview" data-social-preview="true"><span style="display:inline-block;width:90px;height:24px">150,00 kr</span></div>'
      )
      return
    }
    if (request.url === '/large-first/') {
      response.end(
        '<div class="dnb-live-preview" style="height:1600px;width:600px">Large form</div><div class="dnb-live-preview"><button style="width:90px;height:30px">Continue</button></div>'
      )
      return
    }
    if (request.url === '/group/') {
      response.end(
        '<div class="dnb-live-preview" style="height:1600px;width:600px"><section class="dnb-form-card" style="width:250px;height:150px"><label>Name<input></label></section></div>'
      )
      return
    }
    if (request.url === '/vertical-scroll/') {
      response.end(
        '<div class="dnb-live-preview"><div style="width:250px;height:100px;overflow-y:auto"><div style="height:500px">Scrollable content</div></div></div>'
      )
      return
    }
    if (request.url === '/scrolling/') {
      response.end(
        '<div class="dnb-live-preview"><section style="width:600px"><div style="width:100px;overflow-x:auto"><div style="width:300px;height:40px">Wide table</div></div></section></div><div class="dnb-live-preview"><button style="width:90px;height:30px">Continue</button></div>'
      )
      return
    }
    if (request.url === '/tall/') {
      response.end(
        '<div class="dnb-live-preview" style="width:600px;height:700px">A complete table demo<span class="dnb-sr-only" style="position:absolute;overflow:hidden;width:1px;height:1px">Accessible name</span></div>'
      )
      return
    }
    if (request.url === '/small/') {
      response.end(
        '<div class="dnb-live-preview"><span style="display:inline-block;width:28px;height:19px">OK</span></div>'
      )
      return
    }

    response.end(
      '<style>body{margin:0;font:16px/24px Arial}.dnb-live-preview{width:700px}p{margin:0}.badge{display:inline-block;width:44px;height:28px;background:#a5e1d2}</style><div class="dnb-live-preview">' +
        (request.url === '/badge/'
          ? '<span class="badge">New</span>'
          : '<p>This is a regular paragraph with a <a href="#">link to a website</a> in the middle of some text.</p>') +
        '</div>'
    )
  })
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', resolve)
  )
  const address = server.address()
  assert.ok(address && typeof address !== 'string')
  const origin = 'http://127.0.0.1:' + address.port
  const browser = await chromium.launch()
  try {
    const capture = await browser.newPage({
      viewport: { width: 1200, height: 900 },
      deviceScaleFactor: 2,
    })
    const outlined = await capturePreview(
      capture,
      origin + '/outline/',
      []
    )
    const { data: outlinePixels, info: outlineInfo } = await sharp(
      outlined
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const grayAt = (x: number, y: number) => {
      const offset = (y * outlineInfo.width + x) * 4
      return (
        outlinePixels[offset] === 153 && outlinePixels[offset + 3] === 255
      )
    }
    assert.ok(
      Array.from({ length: outlineInfo.width }, (_, x) =>
        grayAt(x, Math.floor(outlineInfo.height / 2))
      ).filter(Boolean).length >= 4,
      'retains both outside vertical outline edges'
    )
    assert.ok(
      Array.from({ length: outlineInfo.height }, (_, y) =>
        grayAt(Math.floor(outlineInfo.width / 2), y)
      ).filter(Boolean).length >= 4,
      'retains both outside horizontal outline edges'
    )
    const transparent = await capturePreview(
      capture,
      origin + '/transparent/',
      []
    )
    const { data: transparentPixels, info: transparentInfo } = await sharp(
      transparent
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    assert.equal(
      transparentPixels[(4 * transparentInfo.width + 4) * 4 + 3],
      0
    )
    assert.equal(
      transparentPixels[
        (4 * transparentInfo.width + transparentInfo.width - 5) * 4 + 3
      ],
      255
    )
    const badge = await capturePreview(capture, origin + '/badge/', [])
    const fade = await capturePreview(capture, origin + '/fade-in/', [])
    assert.deepEqual(
      [
        ...(await sharp(fade)
          .extract({ left: 4, top: 4, width: 1, height: 1 })
          .removeAlpha()
          .raw()
          .toBuffer()),
      ],
      [165, 225, 210]
    )
    const value = await capturePreview(capture, origin + '/value/', [])
    assert.equal(value.readUInt32BE(16), 188)
    const paragraph = await capturePreview(
      capture,
      origin + '/anchor/',
      []
    )
    assert.equal(badge.readUInt32BE(16), 92)
    assert.equal(badge.readUInt32BE(20), 60)
    assert.equal(paragraph.readUInt32BE(16), 1404)
    assert.equal(paragraph.readUInt32BE(20), 52)
    await capture.goto(origin + '/first-width/')
    const first = await captureSpecimen(capture)
    assert.equal(first.selection.index, 0)
    assert.equal(first.crop.readUInt32BE(16), 1140)
    await capture.goto(origin + '/stack/')
    const buttons = capture.locator('button')
    const before = await buttons.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().y)
    )
    assert.equal(before[0], before[1])
    const stacked = await captureSpecimen(capture)
    assert.equal(stacked.crop.readUInt32BE(16), 248)
    assert.equal(stacked.crop.readUInt32BE(20), 264)
    const after = await buttons.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().y)
    )
    assert.ok(after[0] < after[1] && after[1] < after[2])
    const centers = await buttons.evaluateAll((elements) =>
      elements.map((element) => {
        const box = element.getBoundingClientRect()
        return box.x + box.width / 2
      })
    )
    assert.equal(centers[0], centers[1])
    assert.equal(centers[1], centers[2])
    const marked = await capturePreview(capture, origin + '/marked/', [])
    assert.equal(marked.readUInt32BE(16), 308)
    await assert.rejects(
      capturePreview(capture, origin + '/duplicate/', []),
      /Only one socialPreview demo/
    )
    for (const route of [
      '/large-first/',
      '/group/',
      '/scrolling/',
      '/marked-unsuitable/',
    ]) {
      await assert.rejects(
        capturePreview(capture, origin + route, []),
        /No compact specimen/
      )
    }
    const small = await capturePreview(capture, origin + '/small/', [])
    assert.equal(small.readUInt32BE(16), 64)
    const tall = await capturePreview(capture, origin + '/tall/', [])
    assert.equal(tall.readUInt32BE(20), 1408)
    const vertical = await capturePreview(
      capture,
      origin + '/vertical-scroll/',
      []
    )
    assert.equal(vertical.readUInt32BE(20), 208)
  } finally {
    await browser.close()
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    )
  }
})
