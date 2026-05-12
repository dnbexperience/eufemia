import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Card for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/card/demos/',
    })

    test('have to match border', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-border"]',
      })
    })

    test('have to match stack', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-stack"]',
      })
    })

    test('have to match grid', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-grid"]',
      })
    })

    test('have to match table', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-table"]',
      })
    })

    test('have to match table with outline', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-table-outline"]',
      })
    })

    test('have to match nested section', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-nested-section"]',
      })
    })

    test('have to match in colored section', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-in-colored-section"]',
      })
    })

    test('have to match flex', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
    })

    test('have to match nested cards', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-nested"]',
      })
    })

    test('have to match drop shadow', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-drop-shadow"]',
      })
    })

    test('have to match outset', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-outset"]',
        wrapperStyle: {
          padding: '2rem',
        },
      })
    })

    test('have to match background color', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="layout-card-background-color-outline"]',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Card small screen for ${themeName}`, () => {
    const params = {
      themeName,
      pageViewport: {
        width: 400,
      },
      url: '/uilib/components/card/demos/',
    }

    test('have to match border', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-border"]',
      })
    })

    test('have to match grid', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-grid"]',
      })
    })

    test('have to match nested section', async () => {
      await makeScreenshot({
        ...params,
        withWrapper: false,
        selector: '[data-visual-test="card-nested-section"]',
      })
    })

    test('have to match flex', async () => {
      await makeScreenshot({
        ...params,
        withWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
    })

    test('have to match nested cards', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-nested"]',
      })
    })

    test('have to match outset', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-outset"]',
      })
    })
  })
}
