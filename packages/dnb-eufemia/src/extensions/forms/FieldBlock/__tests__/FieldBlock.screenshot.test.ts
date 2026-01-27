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

  it('should match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match label size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match label description', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match label description without label', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-label-description-no-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match combined statuses', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-combined-errors"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match vertical help-button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-vertical-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match horizontal help-button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-horizontal-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help-button in composition fields', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-composition-fields"]',
      style: { width: '30rem' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match label description help-button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match label description help-button without label', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-label-description-no-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match description help-button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-vertical-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help-button with HTML', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-help-button-html"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match horizontal wrap', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-horizontal-wrap"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match wrapping', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-wrapping"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('should match wrapping label description', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-wrapping-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
