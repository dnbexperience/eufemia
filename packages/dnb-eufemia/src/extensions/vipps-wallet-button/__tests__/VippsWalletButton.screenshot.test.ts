/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui'])('VippsWalletButton for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/vipps-wallet-button/',
  })

  it('have to match default state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match active state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match pending state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button-pending"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
