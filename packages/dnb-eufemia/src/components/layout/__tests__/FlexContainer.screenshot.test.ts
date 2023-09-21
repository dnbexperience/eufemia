/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Layout.FlexContainer', () => {
  it('have to match divider', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexContainer/demos',
      selector:
        '[data-visual-test="layout-flex-container-divider"] .dnb-layout-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexContainer/demos',
      selector:
        '[data-visual-test="layout-flex-container-field"] .dnb-layout-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexContainer/demos',
      pageViewport: {
        width: 600,
      },
      selector:
        '[data-visual-test="layout-flex-container-field"] .dnb-layout-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field on x-small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/layout/FlexContainer/demos',
      pageViewport: {
        width: 300,
      },
      selector:
        '[data-visual-test="layout-flex-container-field"] .dnb-layout-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
