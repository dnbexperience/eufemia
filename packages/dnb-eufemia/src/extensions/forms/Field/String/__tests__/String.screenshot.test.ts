/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('String field for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/base-fields/String',
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="string-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match multiple errors', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multiple-errors"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="string-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches status messages', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="string-status"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches with label description', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="string-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
