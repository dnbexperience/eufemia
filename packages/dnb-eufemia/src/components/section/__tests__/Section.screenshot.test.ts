import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

const sections = {
  ui: [
    'default',
    'divider',
    'z-index',
    'no-breakout',
    'information',
    'error',
    'warning',
    'success',
  ],
  sbanken: ['default', 'information', 'error', 'warning', 'success'],
}

describe.each(['ui', 'sbanken'])(`Section for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/section/demos/',
  })

  it.each(sections[themeName])(
    `have to match %s section`,
    async (...[sectionName]) => {
      await makeScreenshot({
        selector: `[data-visual-test="section-${sectionName}"]`,
      })
    }
  )
})

describe('Responsive', () => {
  it('have to match section on "small" size', async () => {
    await makeScreenshot({
      url: '/uilib/components/section/demos/',
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
  })

  it('have to match section on "medium" size', async () => {
    await makeScreenshot({
      url: '/uilib/components/section/demos/',
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
  })

  it('have to match section on "large" size', async () => {
    await makeScreenshot({
      url: '/uilib/components/section/demos/',
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
  })
})
