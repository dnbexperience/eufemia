import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('HelpButton', () => {
  setupPageScreenshot({
    url: '/uilib/components/help-button/demos/',
  })

  it('have to match default help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-default"]',
    })
  })

  it('have to match help button sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-sizes"]',
    })
  })

  it('have to match help button suffix', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-suffix"]',
    })
  })

  it('have to match help button used inside text', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-inline"]',
    })
  })
})
