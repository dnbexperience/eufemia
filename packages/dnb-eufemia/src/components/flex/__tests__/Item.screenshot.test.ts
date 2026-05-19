import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Flex.Item', () => {
  const selector =
    '[data-visual-test="flex-item-custom-size"] .dnb-flex-container'

  it('have to match responsive size on large viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 1000,
      },
      selector,
    })
  })

  it('have to match responsive size on medium viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 800,
      },
      selector,
    })
  })

  it('have to match responsive size on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 600,
      },
      selector,
    })
  })

  it('have to match responsive size on x-small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/item/demos/',
      pageViewport: {
        width: 400,
      },
      selector,
    })
  })
})
