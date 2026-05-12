import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('DateFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/date-format/demos',
  })

  it('have to match date styles', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-format-date-styles"]',
    })
  })

  it('have to match date when inline', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-format-date-inline"]',
    })
  })
})
