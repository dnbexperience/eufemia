import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Field.SelectCountry', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCountry/demos/',
  })

  test('matches vertical layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-country-vertical-layout"]',
    })
  })

  test('matches horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-country-horizontal-layout"]',
    })
  })

  test('matches when opened', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-country-opened"]',
      simulateSelector:
        '[data-visual-test="select-country-opened"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '30rem',
      },
    })
  })
})
