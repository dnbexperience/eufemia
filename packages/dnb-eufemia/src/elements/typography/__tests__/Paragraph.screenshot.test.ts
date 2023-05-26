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
  
  it('have to match style for size default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size xx-large', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-xx-large"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-large', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-large"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size large', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-large"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size medium', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size basis', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-basis"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size small', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match style for size x-small', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-size-x-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
