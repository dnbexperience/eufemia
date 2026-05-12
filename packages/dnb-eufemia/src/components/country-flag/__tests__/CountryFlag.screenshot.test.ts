import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('CountryFlag', () => {
  setupPageScreenshot({
    url: '/uilib/components/country-flag/demos/',
  })

  test('have to match sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="country-flag-sizes"]',
    })
  })

  test('have to match shape', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="country-flag-shape"]',
    })
  })
  test('have to match in various components', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="country-flag-in-components"]',
    })
  })
})
