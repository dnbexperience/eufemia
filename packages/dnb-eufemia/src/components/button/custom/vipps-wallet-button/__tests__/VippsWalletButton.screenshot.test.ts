/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui'])('VippsWalletButton for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/demos/',
  })

  it('have to match default state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-vipps-wallet"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-vipps-wallet"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match active state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-vipps-wallet"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-vipps-wallet"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
