/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('InputMasked', () => {
  setupPageScreenshot({ url: '/uilib/components/input-masked/demos' })
  const style = {
    width: '200px', // make sure our input gets an explicit width, because of mac/linux rendering differences
  }

  it('have to match masked input', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector:
        '[data-visual-test="input-masked-phone"] .dnb-input__shell',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match currency_mask', async () => {
    const screenshot = await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-currency_mask"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match number_mask', async () => {
    const screenshot = await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-number_mask"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match locale number', async () => {
    const screenshot = await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-number"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match locale currency', async () => {
    const screenshot = await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-currency"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
