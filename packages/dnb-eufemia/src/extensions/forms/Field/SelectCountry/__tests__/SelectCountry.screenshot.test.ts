import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Field.SelectCountry', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCountry/demos/',
  })

  test('matches vertical layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-country-vertical-layout"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('matches horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-country-horizontal-layout"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('matches when opened', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-country-opened"]',
      simulateSelector:
        '[data-visual-test="select-country-opened"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      waitAfterSimulateSelector:
        '[data-visual-test="select-country-opened"] .dnb-autocomplete--open',
      style: {
        height: '30rem',
      },
    })
    expect(screenshot).toMatchSnapshot()
  })
})
