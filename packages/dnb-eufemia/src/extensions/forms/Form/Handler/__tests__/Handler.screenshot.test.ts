/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.Handler', () => {
  const url = '/uilib/extensions/forms/Form/Handler/demos'

  it('have to match required and optional fields', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="required-and-optional-fields"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
