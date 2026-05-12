import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Image', () => {
  setupPageScreenshot({
    url: '/uilib/elements/image/demos/',
  })

  test('have to match default image element', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-plain"]',
    })
  })

  test('have to match image element with no source', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-no-source"]',
    })
  })

  test('have to match image element with caption', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-caption"]',
    })
  })

  test('have to match image element with skeleton', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-skeleton"]',
    })
  })
})
