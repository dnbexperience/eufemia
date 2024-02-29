/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('HelpButton for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/help-button/demos',
  })

  it('have to match default help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button suffix', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-suffix"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button used inside text', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match inline help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-inline-content"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
