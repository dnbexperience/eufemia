import {
  test,
  makeScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Flex.Item', () => {
  const selector =
    '[data-visual-test="flex-item-custom-size"] .dnb-flex-container'

  test('have to match responsive size on large viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 1000,
      },
      selector,
    })
  })

  test('have to match responsive size on medium viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 800,
      },
      selector,
    })
  })

  test('have to match responsive size on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 600,
      },
      selector,
    })
  })

  test('have to match responsive size on x-small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 400,
      },
      selector,
    })
  })
})
