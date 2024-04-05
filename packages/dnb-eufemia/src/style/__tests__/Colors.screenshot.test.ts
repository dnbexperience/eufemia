/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken', 'eiendom'])('Colors %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/quickguide-designer/colors/',
  })

  it('have to all colors', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="color-table"]',
      addWrapper: false,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
