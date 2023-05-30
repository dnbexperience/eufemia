/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Paragraph for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/paragraph',
  })

  it('have to match the paragraph example', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with small text', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with additional elements', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-additional"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})


describe.each(['ui', 'sbanken'])('Paragraph regression tests for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/paragraph',
  })
  
  it('have to match style for size default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-default-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  
  it('have to match style for size default medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-default-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  
  it('have to match style for size default bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-default-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size xx-large', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-xx-large-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size xx-large medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-xx-large-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size xx-large bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-xx-large-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-large', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-large-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-large medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-large-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-large bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-large-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size large', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-large-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size large medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-large-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size large bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-large-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-medium-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size medium medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-medium-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size medium bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-medium-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size basis', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-basis-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size basis medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-basis-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size basis bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-basis-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size small', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-small-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size small medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-small-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size small bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-small-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-small', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-small-regular"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-small medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-small-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-small bold', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-small-bold"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
