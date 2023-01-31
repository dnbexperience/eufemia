/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/jest/jestSetupScreenshots'

describe('List', () => {
  setupPageScreenshot({
    url: '/uilib/elements/lists',
  })

  it('have to match ul list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match ol list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match outside ol list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match ol list with custom types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match dl list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match dl horizontal list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="lists-dl-horizontal"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match lists reset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-reset"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Lists with skeleton', () => {
  setupPageScreenshot({ url: '/uilib/elements/lists?skeleton' })

  it('have to match ul list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ul"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match ol list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match outside ol list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="lists-ol-style-position"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match ol list with custom types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-ol-types"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match dl list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="lists-dl"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
