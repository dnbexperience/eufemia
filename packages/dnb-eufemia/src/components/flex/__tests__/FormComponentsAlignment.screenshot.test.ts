import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Form Components Alignment for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/layout/visual-tests/',
    })

    test('have to match vertical direction', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: { width: '30rem' },
        selector:
          '[data-visual-test="form-components-alignment-vertical"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match vertical-labels direction', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: { width: '30rem' },
        selector:
          '[data-visual-test="form-components-alignment-vertical-labels"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match horizontal direction', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: {
          width: '60rem',
          overflow: 'visible',
          padding: '0', // Reset existing styles
          'white-space': 'initial', // Reset existing styles
        },
        selector:
          '[data-visual-test="form-components-alignment-horizontal"] .dnb-flex-container',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
