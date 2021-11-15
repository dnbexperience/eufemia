/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Heading screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/heading/demos',
  })

  it('have to match default headings', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match headings with context usage', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="heading-context"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match headings with manual mixin', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="heading-mixin"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
