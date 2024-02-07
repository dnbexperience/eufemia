/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/create-component/FieldBlock/demos/'

describe.each(['ui', 'sbanken'])('FieldBlock for %s', (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label description', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match combined statuses', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-combined-errors"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match composition', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-composition"]',
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
