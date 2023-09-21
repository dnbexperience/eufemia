/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Layout.SubHeading', () => {
  setupPageScreenshot({
    url: '/uilib/components/layout/SubHeading/demos',
  })

  it('have to match over card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-over-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inside card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-inside-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match below main heading', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-below-main"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
