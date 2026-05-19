import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/create-component/ValueBlock/demos/'

describe.each(['ui', 'sbanken'])(`ValueBlock for %s`, (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('have to match inline value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="value-block-inline"]',
    })
  })

  it('have to match help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="value-block-help-button"]',
    })
  })

  it('have to match help button with html', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="value-block-help-button-html"]',
    })
  })

  it('have to match widths', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-block-widths"]',
    })
  })

  it('have to match wrapping', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-block-wrapping"]',
    })
  })
})
