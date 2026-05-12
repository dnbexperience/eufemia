import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`DrawerList for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/fragments/drawer-list/demos/',
    })

    test('have to match the default drawer-list', async () => {
      await makeScreenshot({
        style: {
          width: '14rem',
        },
        selector:
          '[data-visual-test="drawer-list"] .dnb-drawer-list__list',
      })
    })

    test('have to match the disabled option', async () => {
      await makeScreenshot({
        style: {
          width: '14rem',
        },
        selector: '[data-visual-test="drawer-list-disabled"]',
      })
    })

    test('have to match the inline style example', async () => {
      await makeScreenshot({
        style: {
          width: '14rem',
          'padding-top': '3rem',
        },
        selector: '[data-visual-test="drawer-list-inline-style"]',
      })
    })

    test('have to match the groups example', async () => {
      await makeScreenshot({
        style: {
          width: '14rem',
          'padding-top': '3rem',
        },
        selector: '[data-visual-test="drawer-list-groups"]',
      })
    })
  })
}
