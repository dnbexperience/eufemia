import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui']) {
  test.describe(`VippsWalletButton for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/vipps-wallet-button/',
    })

    test('have to match default state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
      })
    })

    test('have to match hover state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
        simulate: 'hover',
      })
    })

    test('have to match active state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
        simulate: 'active',
      })
    })

    test('have to match focus state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
        simulate: 'focus',
      })
    })

    test('have to match pending state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button-pending"]',
      })
    })
  })
}
