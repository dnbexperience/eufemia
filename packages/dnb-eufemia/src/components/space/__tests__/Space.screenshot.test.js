/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Space screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/space/demos',
  })

  it('have to match the spacing patterns', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="spacing-patterns"] .spacing-patterns',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing with elements', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="spacing-elements"] .spacing-elements',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the 2.5 spacing margins', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="spacing-margins"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing method 1', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="spacing-method-space"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing method 2', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="spacing-method-form-row"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing method 3', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="spacing-method-component"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
