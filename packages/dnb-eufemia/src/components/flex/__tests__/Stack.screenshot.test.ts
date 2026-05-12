import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Flex.Stack', () => {
  setupPageScreenshot({
    url: '/uilib/layout/flex/stack/demos/',
  })

  test('have to match flex-stack-form', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-form"]',
    })
  })

  test('have to match flex-stack-paragraphs', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-paragraphs"]',
    })
  })

  test('have to match flex-stack-card-stack', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-stack"]',
    })
  })

  test('have to match flex-stack-card-heading', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-heading"]',
    })
  })

  test('have to match flex-stack-card-two-headings', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-two-headings"]',
    })
  })
})
