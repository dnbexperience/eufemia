/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const sections = {
  ui: [
    'default',
    'white',
    'divider',
    'z-index',
    'no-breakout',
    'info',
    'error',
    'warning',
    'success',
  ],
  sbanken: ['default', 'white', 'info', 'error', 'warning', 'success'],
}

describe.each(['ui', 'sbanken'])('Section for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/section/demos',
  })

  test.each(sections[themeName])(
    'have to match %p section',
    async (sectionName) => {
      const screenshot = await makeScreenshot({
        selector: `[data-visual-test="section-${sectionName}"]`,
      })
      expect(screenshot).toMatchImageSnapshot()
    }
  )
})

// Should be removed in v11
const deprecatedStyles = [
  'mint-green',
  'black-3',
  'sea-green',
  'emerald-green',
  'lavender',
  'sand-yellow',
  'pistachio',
  'fire-red',
]

describe.each(['ui'])('Section for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/section/deprecated',
  })

  test.each(deprecatedStyles)(
    'have to match %p section',
    async (sectionName) => {
      const screenshot = await makeScreenshot({
        selector: `[data-visual-test="section-${sectionName}"]`,
      })
      expect(screenshot).toMatchImageSnapshot()
    }
  )
})

describe('Responsive', () => {
  it('have to match section on "small" size', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/section/demos',
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match section on "medium" size', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/section/demos',
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match section on "large" size', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/section/demos',
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
