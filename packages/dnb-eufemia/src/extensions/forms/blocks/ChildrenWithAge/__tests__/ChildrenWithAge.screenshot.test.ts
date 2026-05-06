import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ChildrenWithAge for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos/',
    })

    test('have to match when answering yes to all options', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="children-with-age-prefilled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match field and value when multiple children', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-multiple-children"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match field and value when no children', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-no-children"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match field and value when previously filled out data', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-previously-filled-out-data"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match field and value when multiple no answers', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="children-with-age-summary-multiple-no-answers"]',
      })
      expect(screenshot).toMatchSnapshot()
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
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
