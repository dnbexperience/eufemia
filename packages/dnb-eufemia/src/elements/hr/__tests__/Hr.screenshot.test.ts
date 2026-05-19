import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Horizontal rule', () => {
  setupPageScreenshot({
    url: '/uilib/elements/horizontal-rule/demos/',
  })

  it('have to match default horizontal rule', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="hr-default"]',
    })
  })

  it('have to match breakout horizontal rule', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="hr-breakout"]',
    })
  })

  it('have to match dashed horizontal rule', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="hr-dashed"]',
    })
  })
})
