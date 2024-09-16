/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('ChildrenWithAge for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/blocks/ChildrenWithAge',
  })

  it('have to match when answering yes to all options', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
