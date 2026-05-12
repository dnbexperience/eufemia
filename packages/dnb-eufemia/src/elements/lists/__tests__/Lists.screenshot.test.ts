import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('List', () => {
  setupPageScreenshot({
    url: '/uilib/elements/lists/demos/',
  })

  test('have to match ul list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
      style: { width: '20rem', height: '18rem' },
    })
  })

  test('have to match ol list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
  })

  test('have to match outside ol list', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
  })

  test('have to match ol list with custom types', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
  })

  test('have to match dl list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
  })

  test('have to match dl horizontal list', async () => {
    await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-horizontal"]',
    })
  })

  test('have to match dl grid list', async () => {
    await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-grid"]',
    })
  })

  test('have to match lists reset', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-reset"]',
    })
  })

  test('have to match ul inside ol', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="ul-inside-ol"]',
    })
  })
})

test.describe('Lists with skeleton', () => {
  setupPageScreenshot({ url: '/uilib/elements/lists/demos/?skeleton' })

  test('have to match ul list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
    })
  })

  test('have to match ol list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
  })

  test('have to match outside ol list', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
  })

  test('have to match ol list with custom types', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
  })

  test('have to match dl list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
  })
})
