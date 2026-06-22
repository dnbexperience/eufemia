import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui'])(`VippsWalletButton for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/vipps-wallet-button/',
  })

  it('have to match default state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
    })
  })

  it('have to match hover state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
      simulate: 'hover',
    })
  })

  it('have to match active state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
      simulate: 'active',
    })
  })

  it('have to match focus state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button"]',
      simulate: 'focus',
    })
  })

  it('have to match pending state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="vipps-wallet-button-pending"]',
    })
  })
})
