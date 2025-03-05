/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/base-fields/Composition/demos/'

describe.each(['ui', 'sbanken'])('Composition for %s', (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('have to match composition', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-composition"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match composition with label', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-with-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match composition alignment', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-alignment"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match composition medium screen', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-statuses"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match composition small screen', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-composition-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
