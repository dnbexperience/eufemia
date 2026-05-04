import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('List', () => {
  setupPageScreenshot({
    url: '/uilib/elements/lists/demos/',
  })

  test('have to match ul list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
      style: { width: '20rem', height: '18rem' },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match ol list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match outside ol list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match ol list with custom types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match dl list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match dl horizontal list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-horizontal"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match dl grid list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-grid"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match lists reset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-reset"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match ul inside ol', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="ul-inside-ol"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('Lists with skeleton', () => {
  setupPageScreenshot({ url: '/uilib/elements/lists/demos/?skeleton' })

  test('have to match ul list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match ol list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match outside ol list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match ol list with custom types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match dl list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
