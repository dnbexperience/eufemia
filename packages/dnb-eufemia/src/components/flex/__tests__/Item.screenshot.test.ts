import {
  test,
  expect,
  makeScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Flex.Item', () => {
  const selector =
    '[data-visual-test="flex-item-custom-size"] .dnb-flex-container'

  test('have to match responsive size on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 1000,
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive size on medium viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 800,
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive size on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 600,
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive size on x-small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 400,
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
