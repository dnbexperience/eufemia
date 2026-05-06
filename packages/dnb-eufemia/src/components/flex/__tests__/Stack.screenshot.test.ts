import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Flex.Stack', () => {
  setupPageScreenshot({
    url: '/uilib/layout/flex/stack/demos/',
  })

  test('have to match flex-stack-form', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-form"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match flex-stack-paragraphs', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-paragraphs"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match flex-stack-card-stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-stack"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match flex-stack-card-heading', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-heading"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match flex-stack-card-two-headings', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-two-headings"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
