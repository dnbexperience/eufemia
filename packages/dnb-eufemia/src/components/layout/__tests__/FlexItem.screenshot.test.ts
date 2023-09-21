/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Layout.FlexItem', () => {
  const selector =
    '[data-visual-test="layout-flex-item-custom-size"] .dnb-layout-flex-container'

  it('have to match responsive size on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexItem/demos',
      pageViewport: {
        width: 1000,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on medium viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexItem/demos',
      pageViewport: {
        width: 800,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexItem/demos',
      pageViewport: {
        width: 600,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on x-small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexItem/demos',
      pageViewport: {
        width: 400,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
