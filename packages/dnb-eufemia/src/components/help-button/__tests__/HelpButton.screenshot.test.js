/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('HelpButton ', () => {
  setupPageScreenshot({
    url: '/uilib/components/help-button/demos',
  })

  it('have to match default help button', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="help-button-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button sizes', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="help-button-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button suffix', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="help-button-suffix"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button used inside text', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="help-button-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
