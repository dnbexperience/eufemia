/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/Form/Card/demos/'

describe('Form.Card', () => {
  it('have to match when used in wizard', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="forms-card-in-wizard"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
