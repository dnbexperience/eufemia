import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/base-fields/Composition/demos/'

describe.each(['ui', 'sbanken'])(`Composition for %s`, (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('have to match composition', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-composition"]',
    })
  })

  it('have to match composition with label', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-with-label"]',
    })
  })

  it('have to match composition with help button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-with-help-button"]',
    })
  })

  it('have to match composition alignment', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-alignment"]',
    })
  })

  it('have to match composition wrapping', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-wrapping"]',
    })
  })

  it('have to match composition medium screen', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-field-block-composition-statuses"]',
    })
  })

  it('have to match composition small screen', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-composition-error"]',
    })
  })
})
