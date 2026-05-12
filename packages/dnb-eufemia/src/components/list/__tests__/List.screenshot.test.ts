import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`List for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/list/demos',
    })

    test('have to match slots list', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-slots"]',
      })
    })

    test('have to match action list', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action"]',
      })
    })

    test('have to match action list in hover state', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action"]',
        simulate: 'hover',
      })
    })

    test('have to match action list with href', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action-href"]',
      })
    })

    test('have to match action list with href in hover state', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-action-href"]',
        simulateSelector:
          '[data-visual-test="list-action-href"] li:last-of-type',
        simulate: 'hover',
      })
    })

    test('have to match accordion list', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-accordion"]',
      })
    })

    test('have to match pending list', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-pending"]',
      })
    })

    test('have to match footer list with buttons', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-footer"]',
      })
    })

    test('have to match list overline', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-overline"]',
      })
    })

    test('have to match list subline', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-subline"]',
      })
    })

    test('have to match list inside card', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-card"]',
      })
    })

    test('have to match list inside card without scroll view', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="list-card-no-scroll-view"]',
      })
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
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-separated"]',
      })
    })

    test('have to match avatar list', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-avatar"]',
      })
    })

    test('have to match form elements list', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-form-elements"]',
      })
    })

    test('have to match list overline', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-overline"]',
      })
    })

    test('have to match list subline', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="list-subline"]',
      })
    })
  })
}
