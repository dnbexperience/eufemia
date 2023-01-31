/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('NumberFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos',
  })

  it('have to match default numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match percent numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-percent"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match compact numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-compact"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match numbers in different locales', async () => {
    const screenshot = await makeScreenshot({
      style: { height: '30rem' },
      selector: '[data-visual-test="number-format-locales"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match currency', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match phone', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match ban', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-ban"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match nin', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-nin"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match org', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-org"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match spacing system usage', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('NumberFormat with skeleton', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos?skeleton',
  })

  it('have to match default numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match currency', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match phone', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
