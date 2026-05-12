import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ChildrenWithAge for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos/',
    })

    test('have to match when answering yes to all options', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="children-with-age-prefilled"]',
      })
    })

    test('have to match field and value when multiple children', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-multiple-children"]',
      })
    })

    test('have to match field and value when no children', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-no-children"]',
      })
    })

    test('have to match field and value when previously filled out data', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-previously-filled-out-data"]',
      })
    })

    test('have to match field and value when multiple no answers', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-multiple-no-answers"]',
      })
    })
  })
}

test.describe('ChildrenWithAge', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos/',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  test('have to match small screens', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
  })
})
