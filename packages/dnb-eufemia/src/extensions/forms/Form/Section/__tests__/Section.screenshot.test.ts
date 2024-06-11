/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.Section', () => {
  const url = '/uilib/extensions/forms/Form/Section/demos'

  it('have to match view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match basic view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match basic edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="basic-view-and-edit-container"]',
      simulateSelector:
        '[data-visual-test="basic-view-and-edit-container"] .dnb-forms-section-view-block .dnb-button--tertiary',
      simulate: 'click',
    })

    expect(screenshot).toMatchImageSnapshot()
  })
})
