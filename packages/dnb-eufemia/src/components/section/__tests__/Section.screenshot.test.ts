import {
  test,
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

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Section for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/section/demos/',
    })

    for (const sectionName of sections[themeName]) {
      test(`have to match ${sectionName} section`, async () => {
        await makeScreenshot({
          selector: `[data-visual-test="section-${sectionName}"]`,
        })
      })
    }
  })
}

test.describe('Responsive', () => {
  test('have to match section on "small" size', async () => {
    await makeScreenshot({
      url: '/uilib/components/section/demos/',
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
  })

  test('have to match section on "medium" size', async () => {
    await makeScreenshot({
      url: '/uilib/components/section/demos/',
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
  })

  test('have to match section on "large" size', async () => {
    await makeScreenshot({
      url: '/uilib/components/section/demos/',
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="section-responsive-appearance"]',
    })
  })
})
