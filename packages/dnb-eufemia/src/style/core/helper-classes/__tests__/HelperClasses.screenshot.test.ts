/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('HelperClasses', () => {
  setupPageScreenshot({
    url: '/uilib/helpers/classes/visual-tests',
  })

  it('have to match core-style', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-core-style"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tap-focus', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-tap-focus"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match unstyled-list', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-unstyled-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match sr-only', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-sr-only"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match selection', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-selection"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
