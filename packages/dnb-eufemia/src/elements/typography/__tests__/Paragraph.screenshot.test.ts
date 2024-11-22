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

  it('have to match the paragraph with weight modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-weight"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with size modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with align modifiers', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="paragraph-modifiers-align"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with family modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-family"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with line modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-line"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with other modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-modifiers-other"]',
    })
    expect(screenshot).toMatchImageSnapshot()
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

  it('have to match the paragraph with additional elements', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-additional"]',
      matchConfig: {
        failureThreshold: 0.0099, // the underlines gets blurry in the build version
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Paragraph for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/paragraph',
  })

  it('matches all sizes and weights', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
