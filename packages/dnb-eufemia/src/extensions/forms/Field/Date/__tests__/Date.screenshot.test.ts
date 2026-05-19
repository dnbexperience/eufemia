import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/feature-fields/Date/demos/'

describe.each(['ui'])(`Date for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match with a label', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-label"]',
    })
  })

  it('have to match with a horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-horizontal-layout"]',
    })
  })

  it('have to match with an error', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-error"]',
    })
  })

  it('have to match width', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="date-width"]',
    })
  })
})
