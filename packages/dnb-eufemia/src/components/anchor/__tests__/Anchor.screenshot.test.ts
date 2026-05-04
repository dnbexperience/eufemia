import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'carnegie', 'eiendom']) {
  test.describe(`Anchor for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/anchor/demos/',
    })

    test('have to match the preview states', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-states"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match breaking lines', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'white-space': 'nowrap',
        },
        selector: '[data-visual-test="anchor-newline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with skeleton', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-skeleton"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with icon-right', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-right"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with icon left', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-left"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with icon node', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-node"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with paragraph', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-paragraph"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor in heading', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-heading"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with no icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-no-icon-prop"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor with no launch icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-no-launch-icon-prop"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match disabled anchor', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match anchor on dark surface', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-surface-dark"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the "default" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the "focus" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the "hover" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the "active" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test.describe('contrast', () => {
      test('have to match the anchor-contrast no-underline "default" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-underline"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast no-underline no-hover "default" state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast no-underline no-hover "hover" state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"] .dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast no-underline no-radius "default" state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast no-underline no-radius "hover" state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"] .dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast no-hover "hover" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-hover"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-hover"] .dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast no-radius "hover" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-radius"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-radius"] .dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast "default" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast "focus" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast "hover" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the anchor-contrast "active" state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('modifiers', () => {
      test('have to match the dnb-anchor--no-icon', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-no-icon"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the dnb-anchor--no-underline', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-in-section"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test('have to match the "hover" state for modifier no-style', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-no-style"]',
        simulateSelector:
          '[data-visual-test="anchor-no-style"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the "hover" state for modifier no-hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-no-hover"]',
        simulateSelector:
          '[data-visual-test="anchor-no-hover"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    if (themeName === 'sbanken') {
      test('have to match the dnb-anchor--inline hover', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the dnb-anchor--inline active', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the dnb-anchor--inline focus', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match with icon hover', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match with icon active', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'active',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match with icon focus', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })
    }

    test('have to break word with icon', async () => {
      const widths = { sbanken: '16rem', ui: '17.5rem' }
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-break"]',
        style: { width: widths[themeName] },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Anchor target blank for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/anchor/demos/',
    })

    test('have to match blank target anchor in heading', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-heading-blank"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the target blank state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-blank"] a',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match blank target with icon left', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-blank-icon-left"] a',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the target blank with href protocol', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-protocol"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the target blank with tooltip', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-top': '2rem',
        },
        selector: '[data-visual-test="anchor-blank"]',
        simulateSelector: '[data-visual-test="anchor-blank"] a.dnb-anchor',
        simulate: 'hover',
        waitAfterSimulate: 200,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
