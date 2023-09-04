/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken', 'eiendom'])(
  'Heading for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/heading/demos',
    })

    it('have to match default headings', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match headings with context usage', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-context"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match headings with manual mixin', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-mixin"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe.each(['sbanken'])('Heading mobile for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/heading/demos',
    pageViewport: {
      width: 400,
    },
  })

  it('have to match default headings', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match headings with context usage', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-context"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match headings with manual mixin', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-mixin"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
