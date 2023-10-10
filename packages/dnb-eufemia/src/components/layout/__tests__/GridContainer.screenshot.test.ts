/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Layout.GridContainer', () => {
  const selector =
    '[data-visual-test="layout-grid-container-responsive"] .dnb-layout-grid-container'

  it('have to match responsive size on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/GridContainer/demos',
      pageViewport: {
        width: 1000,
      },
      style: {
        'white-space': 'nowrap',
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on medium viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/GridContainer/demos',
      pageViewport: {
        width: 800,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive size on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/GridContainer/demos',
      pageViewport: {
        width: 600,
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
