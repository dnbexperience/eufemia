/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Flex.Item', () => {
  const selector =
    '[data-visual-test="flex-item-custom-size"] .dnb-flex-container'

  it('have to match responsive size on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/flex/item/demos',
      pageViewport: {
        width: 1000,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on medium viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/flex/item/demos',
      pageViewport: {
        width: 800,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/flex/item/demos',
      pageViewport: {
        width: 600,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on x-small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/flex/item/demos',
      pageViewport: {
        width: 400,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
