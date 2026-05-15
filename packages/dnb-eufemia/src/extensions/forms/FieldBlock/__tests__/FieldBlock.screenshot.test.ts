import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/create-component/FieldBlock/demos/'

describe.each(['ui', 'sbanken'])(`FieldBlock for %s`, (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('have to match widths', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-widths"]',
    })
  })

  it('have to match label size', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-size"]',
    })
  })

  it('have to match label description', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-description"]',
    })
  })

  it('have to match label description without label', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-label-description-no-label"]',
    })
  })

  it('have to match combined statuses', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-combined-errors"]',
    })
  })

  it('have to match status position above', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-status-position-above"]',
    })
  })

  it('have to match vertical help-button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-vertical-label"]',
    })
  })

  it('have to match horizontal help-button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-horizontal-label"]',
    })
  })

  it('have to match help-button in composition fields', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-composition-fields"]',
      style: { width: '30rem' },
    })
  })

  it('have to match label description help-button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-label-description"]',
    })
  })

  it('have to match label description help-button without label', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-label-description-no-label"]',
    })
  })

  it('have to match description help-button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-help-button-vertical-label-description"]',
    })
  })

  it('have to match help-button with HTML', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-help-button-html"]',
    })
  })

  it('have to match horizontal wrap', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-horizontal-wrap"]',
    })
  })

  it('have to match wrapping', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-wrapping"]',
    })
  })
  it('have to match wrapping label description', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-wrapping-label-description"]',
    })
  })
})
