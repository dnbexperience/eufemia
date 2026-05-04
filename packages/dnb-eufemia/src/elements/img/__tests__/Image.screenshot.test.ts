import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Image', () => {
  setupPageScreenshot({
    url: '/uilib/elements/image/demos/',
  })

  test('have to match default image element', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="image-plain"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match image element with no source', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="image-no-source"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match image element with caption', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="image-caption"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match image element with skeleton', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="image-skeleton"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
