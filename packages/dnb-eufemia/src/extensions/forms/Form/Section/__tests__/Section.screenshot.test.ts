import {
  test,
  makeScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Form.Section', () => {
  const url = '/uilib/extensions/forms/Form/Section/demos/'

  test('have to match view container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
    })
  })

  test('have to match edit container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })
  })

  test('have to match basic view container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
    })
  })

  test('have to match basic edit container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="basic-view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })
  })
})
