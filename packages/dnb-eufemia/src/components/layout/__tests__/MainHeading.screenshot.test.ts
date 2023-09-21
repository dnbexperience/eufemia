/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Layout.MainHeading', () => {
  setupPageScreenshot({
    url: '/uilib/components/layout/MainHeading/demos',
  })

  it('have to match over stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-over-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match over card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-over-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
