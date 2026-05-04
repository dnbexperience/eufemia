import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Tag for ${themeName}`, () => {
    setupPageScreenshot({ themeName, url: '/uilib/components/tag/demos/' })

    test('have to match Tag default', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tag-default"] .dnb-tag',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Tag with icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tag-icon"] .dnb-tag',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match a removable Tag list', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tag-removable-list"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match a inline Tag', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tag-inline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match a skeleton Tag', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tag-skeleton"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    for (const name of ['clickable', 'addable', 'removable']) {
      test.describe(`have to match`, () => {
        test(`a ${name} Tag`, async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
          })

          expect(screenshot).toMatchSnapshot()
        })
        test(`a ${name} Tag hover`, async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
            simulate: 'hover',
          })

          expect(screenshot).toMatchSnapshot()
        })
        test(`a ${name} Tag active`, async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
            simulate: 'active',
          })

          expect(screenshot).toMatchSnapshot()
        })
        test(`a ${name} Tag focus`, async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
            simulate: 'focus',
          })

          expect(screenshot).toMatchSnapshot()
        })
      })
    }
  })
}
