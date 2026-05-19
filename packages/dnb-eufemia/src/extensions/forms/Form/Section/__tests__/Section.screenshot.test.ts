import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Form.Section', () => {
  const url = '/uilib/extensions/forms/Form/Section/demos/'

  it('have to match view container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
    })
  })

  it('have to match edit container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })
  })

  it('have to match basic view container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
    })
  })

  it('have to match basic edit container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="basic-view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })
  })
})
