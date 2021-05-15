/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('InputMasked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/input-masked/demos' })
  const style = {
    width: '200px', // make sure our input gets an explicit width, because of mac/linux rendering differences
  }
  it('have to match masked input', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector:
        '[data-visual-test="input-masked-phone"] .dnb-input__shell',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match currency_mask', async () => {
    const screenshot = await testPageScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-currency_mask"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match number_mask', async () => {
    const screenshot = await testPageScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-number_mask"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
