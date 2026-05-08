import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('CountryFlag', () => {
  setupPageScreenshot({
    url: '/uilib/components/country-flag/demos/',
  })

  test('have to match sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="country-flag-sizes"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match shape', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="country-flag-shape"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
  test('have to match in various components', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="country-flag-in-components"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
