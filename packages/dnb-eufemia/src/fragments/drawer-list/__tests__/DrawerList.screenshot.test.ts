import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`DrawerList for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/fragments/drawer-list/demos/',
    })

    test('have to match the default drawer-list', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '14rem',
        },
        selector:
          '[data-visual-test="drawer-list"] .dnb-drawer-list__list',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the disabled option', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '14rem',
        },
        selector: '[data-visual-test="drawer-list-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the inline style example', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '14rem',
          'padding-top': '3rem',
        },
        selector: '[data-visual-test="drawer-list-inline-style"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the groups example', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '14rem',
          'padding-top': '3rem',
        },
        selector: '[data-visual-test="drawer-list-groups"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
