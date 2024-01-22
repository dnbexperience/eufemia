/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('TextCounter for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/fragments/text-counter/demos',
  })

  it('have to character counter downwards', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="text-counter-down"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to character counter upwards', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="text-counter-up"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to character counter exceeded', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="text-counter-exceeded"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
