/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Input for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/input-masked/demos',
  })
  const style = {
    width: '200px', // make sure our input gets an explicit width, because of mac/linux rendering differences
  }

  it('have to match masked input', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector:
        '[data-visual-test="input-masked-custom-mask"] .dnb-input__shell',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match currencyMask', async () => {
    const screenshot = await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-currencyMask"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match numberMask', async () => {
    const screenshot = await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-numberMask"]',
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
