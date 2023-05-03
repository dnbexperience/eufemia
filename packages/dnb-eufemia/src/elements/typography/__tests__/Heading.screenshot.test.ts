/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

const themes = [
  ['ui', '/uilib/elements/heading'],
  ['sbanken', '/uilib/elements/heading'],
  ['eiendom', '/uilib/elements/heading'],
]

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(themes)('Heading for %s', (themeName, url) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match the default heading examples', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the additional heading examples', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-additional"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
