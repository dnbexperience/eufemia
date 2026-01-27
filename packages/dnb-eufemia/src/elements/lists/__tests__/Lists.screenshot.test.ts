/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('List', () => {
  setupPageScreenshot({
    url: '/uilib/elements/lists',
  })

  it('should match ul list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
      style: { width: '20rem', height: '18rem' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match ol list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match outside ol list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match ol list with custom types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match dl list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match dl horizontal list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-horizontal"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match dl grid list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match lists reset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-reset"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match ul inside ol', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="ul-inside-ol"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Lists with skeleton', () => {
  setupPageScreenshot({ url: '/uilib/elements/lists?skeleton' })

  it('should match ul list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match ol list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match outside ol list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match ol list with custom types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match dl list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
