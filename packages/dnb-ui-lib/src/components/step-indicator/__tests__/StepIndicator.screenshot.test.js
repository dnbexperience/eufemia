/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  setupPageScreenshot,
  testPageScreenshot
} from '../../../core/jest/jestSetup'

describe('StepIndicator screenshot', () => {
  setupPageScreenshot()
  it('have to match the screenshot snapshot', async () => {
    const element = await testPageScreenshot({
      url: '/uilib/components/step-indicator?fullscreen',
      selector: '.dnb-step-indicator:nth-child(1)'
    })
    expect(element).toMatchImageSnapshot()
  })
})
