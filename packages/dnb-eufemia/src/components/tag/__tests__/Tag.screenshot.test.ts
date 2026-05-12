import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Tag for ${themeName}`, () => {
    setupPageScreenshot({ themeName, url: '/uilib/components/tag/demos/' })

    test('have to match Tag default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tag-default"] .dnb-tag',
      })
    })

    test('have to match Tag with icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tag-icon"] .dnb-tag',
      })
    })

    test('have to match a removable Tag list', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tag-removable-list"]',
      })
    })

    test('have to match a inline Tag', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tag-inline"]',
      })
    })

    test('have to match a skeleton Tag', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tag-skeleton"]',
      })
    })

    for (const name of ['clickable', 'addable', 'removable']) {
      test.describe(`have to match`, () => {
        test(`a ${name} Tag`, async () => {
          await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
          })
        })
        test(`a ${name} Tag hover`, async () => {
          await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
            simulate: 'hover',
          })
        })
        test(`a ${name} Tag active`, async () => {
          await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
            simulate: 'active',
          })
        })
        test(`a ${name} Tag focus`, async () => {
          await makeScreenshot({
            selector: `[data-visual-test="tag-${name}"]`,
            simulate: 'focus',
          })
        })
      })
    }
  })
}
