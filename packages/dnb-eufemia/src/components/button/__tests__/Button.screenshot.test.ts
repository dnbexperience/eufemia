import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Button for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/button/demos/',
    })

    test.describe('primary', () => {
      test('have to match default state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
        })
      })

      test('have to match focus state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'focus',
        })
      })

      test('have to match hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'hover',
        })
      })

      test('have to match active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'active',
        })
      })
    })

    test.describe('secondary', () => {
      test('have to match default styles', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
        })
      })

      test('have to match focus state', async () => {
        await makeScreenshot({
          style: {
            'padding-right': '2rem',
          },
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'focus',
        })
      })

      test('have to match hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'hover',
        })
      })

      test('have to match active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'active',
        })
      })
    })

    test.describe('tertiary', () => {
      test('have to match all tertiary buttons', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-all"]',
        })
      })

      test('have to match "dnb-button--tertiary"', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
        })
      })

      test('have to match focus state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'focus',
        })
      })

      test('have to match hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'hover',
        })
      })

      test('have to match active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'active',
        })
      })

      test('have to match tertiary with top icon', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-top"]',
        })
      })

      test('have to match disabled buttons', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-disabled"]',
        })
      })

      test('have to match button with custom content', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-custom-content"]',
        })
      })

      test('have to match tertiary button with text wrap', async () => {
        await makeScreenshot({
          style: {
            width: '20rem',
            height: '6rem',
          },
          selector: '[data-visual-test="button-tertiary-wrap"]',
        })
      })
    })

    test.describe('error', () => {
      test('have to match', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-error"]',
        })
      })

      test.describe('primary', () => {
        test('have to match focus state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'focus',
          })
        })

        test('have to match hover state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'hover',
          })
        })

        test('have to match active state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'active',
          })
        })
      })

      test.describe('secondary', () => {
        test('have to match focus state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'focus',
          })
        })

        test('have to match hover state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'hover',
          })
        })

        test('have to match active state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'active',
          })
        })
      })

      test.describe('tertiary', () => {
        test('have to match focus state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'focus',
          })
        })

        test('have to match hover state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'hover',
          })
        })

        test('have to match active state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'active',
          })
        })
      })
    })

    test.describe('icon', () => {
      test('have to match icon buttons', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icons"]',
        })
      })

      test('have to match icon button', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
        })
      })

      test('have to match icon button with focus state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'focus',
        })
      })

      test('have to match icon button with hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'hover',
        })
      })

      test('have to match icon button with active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'active',
        })
      })

      test('tertiary have to match icon button', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
        })
      })

      test('tertiary have to match icon button hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
          simulate: 'hover',
        })
      })

      test('tertiary have to match icon button focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
          simulate: 'focus',
        })
      })
    })

    test.describe('with href', () => {
      test('have to match default styles', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-anchor"]',
        })
      })

      test('have to match hover state', async () => {
        await makeScreenshot({
          style: {
            'padding-top': '2rem',
          },
          selector: '[data-visual-test="button-anchor"]',
          simulateSelector:
            '[data-visual-test="button-anchor"] a[target="_blank"]',
          simulate: 'hover',
        })
      })
    })
  })
}

for (const themeName of ['dnb', 'sbanken']) {
  test.describe(`Button for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/button/demos/',
    })

    for (const variant of ['primary', 'secondary', 'tertiary']) {
      test.describe(`on dark background ${variant}`, () => {
        test('default', async () => {
          await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
          })
        })

        test('hover', async () => {
          await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
            simulate: 'hover',
          })
        })

        test('active', async () => {
          await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
            simulate: 'active',
          })
        })

        test('focus', async () => {
          await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
            simulate: 'focus',
          })
        })
      })
    }
  })
}

for (const themeName of ['ui']) {
  test.describe(`Button for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/button/visual-tests/',
    })

    test.describe('primary', () => {
      test('have to match a stretched button', async () => {
        await makeScreenshot({
          style: {
            'min-width': '20rem',
          },
          selector: '[data-visual-test="button-stretch"]',
        })
      })
    })

    test.describe('tertiary', () => {
      test('have to match icon', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-no-icon"]',
        })
      })

      test('have to match tertiary icon alignment', async () => {
        await makeScreenshot({
          style: {
            width: '20rem',
          },
          selector: '[data-visual-test="button-tertiary-alignment"]',
        })
      })
    })

    test.describe('unstyled', () => {
      test('have to match with icon', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-unstyled"]',
        })
      })
    })
  })
}
