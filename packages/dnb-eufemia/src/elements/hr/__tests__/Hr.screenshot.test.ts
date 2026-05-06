import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Horizontal rule', () => {
  setupPageScreenshot({
    url: '/uilib/elements/horizontal-rule/demos/',
  })

  test('have to match default horizontal rule', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hr-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match breakout horizontal rule', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hr-breakout"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match dashed horizontal rule', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hr-dashed"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
