import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('MultiSelection', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/MultiSelection/demos/',
  })

  test('should match trigger button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multi-selection-basic"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('should match variant inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('should match hover state of item', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
      screenshotSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
      simulate: 'hover',
      simulateSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('should match active state of item', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
      screenshotSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
      simulate: 'active',
      simulateSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('should match focus state of item', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
      screenshotSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2) input',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
