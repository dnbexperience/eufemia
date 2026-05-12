import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Horizontal rule', () => {
  setupPageScreenshot({
    url: '/uilib/elements/horizontal-rule/demos/',
  })

  test('have to match default horizontal rule', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="hr-default"]',
    })
  })

  test('have to match breakout horizontal rule', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="hr-breakout"]',
    })
  })

  test('have to match dashed horizontal rule', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="hr-dashed"]',
    })
  })
})
