import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`String field for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/base-fields/String/demos/',
  })

  it('have to match widths', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="string-widths"]',
    })
  })

  it('have to match multiple errors', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="multiple-errors"]',
    })
  })

  it('matches horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="string-horizontal-layout"]',
    })
  })

  it('matches status messages', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="string-status"]',
    })
  })

  it('matches with label description', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="string-label-description"]',
    })
  })
})
