import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Card for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/card/demos/',
    })

    test('have to match border', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-border"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match stack', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-stack"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match grid', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-grid"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match table', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-table"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match table with outline', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-table-outline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match nested section', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="card-nested-section"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in colored section', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="card-in-colored-section"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match flex', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match nested cards', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-nested"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match drop shadow', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-drop-shadow"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match outset', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-outset"]',
        wrapperStyle: {
          padding: '2rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match background color', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="layout-card-background-color-outline"]',
      })
      expect(screenshot).toMatchSnapshot()
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
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-border"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match grid', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-grid"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match nested section', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        addWrapper: false,
        selector: '[data-visual-test="card-nested-section"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match flex', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        addWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match nested cards', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-nested"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match outset', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-outset"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
