import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Field.Toggle', () => {
  const url = '/uilib/extensions/forms/base-fields/Toggle/demos/'

  it('have to match buttons variant with help', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-buttons-with-help"]',
    })
  })

  it('have to match buttons variant without label', async () => {
    await makeScreenshot({
      url,
      selector:
        '[data-visual-test="toggle-variant-buttons-without-label"]',
    })
  })

  it('have to match radio variant with help', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-with-help"]',
    })
  })

  it('have to match radio variant without label', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-without-label"]',
    })
  })
})
