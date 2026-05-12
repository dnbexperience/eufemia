import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'carnegie', 'eiendom']) {
  test.describe(`Anchor for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/anchor/demos/',
    })

    test('have to match the preview states', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-states"]',
      })
    })

    test('have to match breaking lines', async () => {
      await makeScreenshot({
        style: {
          'white-space': 'nowrap',
        },
        selector: '[data-visual-test="anchor-newline"]',
      })
    })

    test('have to match anchor with skeleton', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-skeleton"]',
      })
    })

    test('have to match anchor with icon-right', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-right"]',
      })
    })

    test('have to match anchor with icon left', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-left"]',
      })
    })

    test('have to match anchor with icon node', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-node"]',
      })
    })

    test('have to match anchor with paragraph', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-paragraph"]',
      })
    })

    test('have to match anchor in heading', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-heading"]',
      })
    })

    test('have to match anchor with no icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-icon-prop"]',
      })
    })

    test('have to match anchor with no launch icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-launch-icon-prop"]',
      })
    })

    test('have to match disabled anchor', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-disabled"]',
      })
    })

    test('have to match anchor on dark surface', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-surface-dark"]',
      })
    })

    test('have to match the "default" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
      })
    })

    test('have to match the "focus" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'focus',
      })
    })

    test('have to match the "hover" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'hover',
      })
    })

    test('have to match the "active" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'active',
      })
    })

    test.describe('contrast', () => {
      test('have to match the anchor-contrast no-underline "default" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-underline"]',
        })
      })

      test('have to match the anchor-contrast no-underline no-hover "default" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
        })
      })

      test('have to match the anchor-contrast no-underline no-hover "hover" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match the anchor-contrast no-underline no-radius "default" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
        })
      })

      test('have to match the anchor-contrast no-underline no-radius "hover" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match the anchor-contrast no-hover "hover" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-hover"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-hover"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match the anchor-contrast no-radius "hover" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-radius"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-radius"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match the anchor-contrast "default" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
        })
      })

      test('have to match the anchor-contrast "focus" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'focus',
        })
      })

      test('have to match the anchor-contrast "hover" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match the anchor-contrast "active" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'active',
        })
      })
    })

    test.describe('modifiers', () => {
      test('have to match the dnb-anchor--no-icon', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-no-icon"]',
        })
      })

      test('have to match the dnb-anchor--no-underline', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-in-section"]',
        })
      })
    })

    test('have to match the "hover" state for modifier no-style', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-style"]',
        simulateSelector:
          '[data-visual-test="anchor-no-style"] .dnb-anchor',
        simulate: 'hover',
      })
    })

    test('have to match the "hover" state for modifier no-hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-hover"]',
        simulateSelector:
          '[data-visual-test="anchor-no-hover"] .dnb-anchor',
        simulate: 'hover',
      })
    })

    if (themeName === 'sbanken') {
      test('have to match the dnb-anchor--inline hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match the dnb-anchor--inline active', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'active',
        })
      })

      test('have to match the dnb-anchor--inline focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'focus',
        })
      })

      test('have to match with icon hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'hover',
        })
      })

      test('have to match with icon active', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'active',
        })
      })

      test('have to match with icon focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'focus',
        })
      })
    }

    test('have to break word with icon', async () => {
      const widths = { sbanken: '16rem', ui: '17.5rem' }
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-break"]',
        style: { width: widths[themeName] },
      })
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
      await makeScreenshot({
        selector: '[data-visual-test="anchor-heading-blank"]',
      })
    })

    test('have to match the target blank state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-blank"] a',
      })
    })

    test('have to match blank target with icon left', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-blank-icon-left"] a',
      })
    })

    test('have to match the target blank with href protocol', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-protocol"]',
      })
    })

    test('have to match the target blank with tooltip', async () => {
      await makeScreenshot({
        style: {
          'padding-top': '2rem',
        },
        selector: '[data-visual-test="anchor-blank"]',
        simulateSelector: '[data-visual-test="anchor-blank"] a.dnb-anchor',
        simulate: 'hover',
      })
    })
  })
}
