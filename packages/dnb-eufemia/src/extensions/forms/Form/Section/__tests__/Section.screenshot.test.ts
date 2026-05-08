import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Form.Section', () => {
  const url = '/uilib/extensions/forms/Form/Section/demos/'

  test('have to match view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })

    expect(screenshot).toMatchSnapshot()
  })

  test('have to match basic view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match basic edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="basic-view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })

    expect(screenshot).toMatchSnapshot()
  })
})
