import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`List for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/list/demos',
    })

    test('have to match slots list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-slots"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match action list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match action list in hover state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action"]',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match action list with href', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action-href"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match action list with href in hover state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action-href"]',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match accordion list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-accordion"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pending list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-pending"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match footer list with buttons', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-footer"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match list overline', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-overline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match list subline', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-subline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match list inside card', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-card"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match list inside card without scroll view', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-card-no-scroll-view"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui']) {
  test.describe(`List for ${themeName} on small viewport`, () => {
    const smallViewport = { width: 400, height: 600 }

    setupPageScreenshot({
      themeName,
      pageViewport: smallViewport,
      url: '/uilib/components/list/demos',
    })

    test('have to match separated list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-separated"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match avatar list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-avatar"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match form elements list', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-form-elements"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match list overline', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-overline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match list subline', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-subline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
