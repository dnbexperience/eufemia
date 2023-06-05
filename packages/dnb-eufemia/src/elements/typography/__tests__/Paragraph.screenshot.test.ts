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

describe.each(['ui', 'sbanken'])(
  'Paragraph for %s',
  (themeName) => {
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
  }
)
