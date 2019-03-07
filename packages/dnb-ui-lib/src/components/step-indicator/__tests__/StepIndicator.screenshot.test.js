/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('StepIndicator screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/step-indicator' })
  it('have to match', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="step-indicator"] .dnb-step-indicator'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
