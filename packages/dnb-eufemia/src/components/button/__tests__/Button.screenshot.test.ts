import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Button for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/button/demos/',
    })

    test.describe('primary', () => {
      test('have to match default state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('secondary', () => {
      test('have to match default styles', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match focus state', async () => {
        const screenshot = await makeScreenshot({
          style: {
            'padding-right': '2rem',
          },
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('tertiary', () => {
      test('have to match all tertiary buttons', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-all"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match "dnb-button--tertiary"', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match tertiary with top icon', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-top"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match disabled buttons', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-disabled"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match button with custom content', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-custom-content"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match tertiary button with text wrap', async () => {
        const screenshot = await makeScreenshot({
          style: {
            width: '20rem',
            height: '6rem',
          },
          selector: '[data-visual-test="button-tertiary-wrap"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('error', () => {
      test('have to match', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-error"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test.describe('primary', () => {
        test('have to match focus state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'focus',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('have to match hover state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'hover',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('have to match active state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'active',
          })
          expect(screenshot).toMatchSnapshot()
        })
      })

      test.describe('secondary', () => {
        test('have to match focus state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'focus',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('have to match hover state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'hover',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('have to match active state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'active',
          })
          expect(screenshot).toMatchSnapshot()
        })
      })

      test.describe('tertiary', () => {
        test('have to match focus state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'focus',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('have to match hover state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'hover',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('have to match active state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'active',
          })
          expect(screenshot).toMatchSnapshot()
        })
      })
    })

    test.describe('icon', () => {
      test('have to match icon buttons', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icons"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match icon button', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match icon button with focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match icon button with hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match icon button with active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('tertiary have to match icon button', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('tertiary have to match icon button hover', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('tertiary have to match icon button focus', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('with href', () => {
      test('have to match default styles', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-anchor"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          style: {
            'padding-top': '2rem',
          },
          selector: '[data-visual-test="button-anchor"]',
          simulateSelector:
            '[data-visual-test="button-anchor"] a[target="_blank"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
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
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('hover', async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
            simulate: 'hover',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('active', async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
            simulate: 'active',
          })
          expect(screenshot).toMatchSnapshot()
        })

        test('focus', async () => {
          const screenshot = await makeScreenshot({
            selector: `[data-visual-test="button-${variant}-on-dark"]`,
            simulate: 'focus',
          })
          expect(screenshot).toMatchSnapshot()
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
        const screenshot = await makeScreenshot({
          style: {
            'min-width': '20rem',
          },
          selector: '[data-visual-test="button-stretch"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('tertiary', () => {
      test('have to match icon', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-no-icon"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match tertiary icon alignment', async () => {
        const screenshot = await makeScreenshot({
          style: {
            width: '20rem',
          },
          selector: '[data-visual-test="button-tertiary-alignment"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('unstyled', () => {
      test('have to match with icon', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-unstyled"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}
