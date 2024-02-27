/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken', 'eiendom'])(
  'Button for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/button/demos',
    })

    describe('primary', () => {
      it('have to match default state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('secondary', () => {
      it('have to match default styles', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match focus state', async () => {
        const screenshot = await makeScreenshot({
          style: {
            'padding-right': '2rem',
          },
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('tertiary', () => {
      it('have to match all tertiary buttons', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-all"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match "dnb-button--tertiary"', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match tertiary with top icon', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-top"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match disabled buttons', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-disabled"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match button with custom content', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-custom-content"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match tertiary button with text wrap', async () => {
        const screenshot = await makeScreenshot({
          style: {
            width: '20rem',
            height: '6rem',
          },
          selector: '[data-visual-test="button-tertiary-wrap"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('error', () => {
      it('have to match', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-error"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      describe('primary', () => {
        it('have to match focus state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'focus',
          })
          expect(screenshot).toMatchImageSnapshot()
        })

        it('have to match hover state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'hover',
          })
          expect(screenshot).toMatchImageSnapshot()
        })

        it('have to match active state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'active',
          })
          expect(screenshot).toMatchImageSnapshot()
        })
      })

      describe('secondary', () => {
        it('have to match focus state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'focus',
          })
          expect(screenshot).toMatchImageSnapshot()
        })

        it('have to match hover state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'hover',
          })
          expect(screenshot).toMatchImageSnapshot()
        })

        it('have to match active state', async () => {
          const screenshot = await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'active',
          })
          expect(screenshot).toMatchImageSnapshot()
        })
      })
    })

    describe('icon', () => {
      it('have to match icon buttons', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icons"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match icon button', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match icon button with focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match icon button with hover state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match icon button with active state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('with href', () => {
      it('have to match default styles', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="button-anchor"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('have to match hover state', async () => {
        const screenshot = await makeScreenshot({
          style: {
            'padding-top': '2rem',
          },
          selector: '[data-visual-test="button-anchor"]',
          simulateSelector:
            '[data-visual-test="button-anchor"] a[target="_blank"]',
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })
  }
)

describe.each(['sbanken'])('Button for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/demos',
  })

  it('have to match tertiary icon button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-icon-tertiary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tertiary icon button hover', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-icon-tertiary"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tertiary icon button focus', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-icon-tertiary"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe.each(['primary', 'secondary', 'tertiary'])(
    'on dark background %s',
    (variant) => {
      it('default', async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('hover', async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('active', async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('focus', async () => {
        const screenshot = await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    }
  )
})

describe.each(['ui'])('Button for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/visual-tests',
  })

  describe('primary', () => {
    it('have to match a stretched button', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'min-width': '20rem',
        },
        selector: '[data-visual-test="button-stretch"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('tertiary', () => {
    it('have to match icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="button-tertiary-no-icon"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match tertiary icon alignment', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector: '[data-visual-test="button-tertiary-alignment"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('unstyled', () => {
    it('have to match with icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="button-unstyled"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})

describe.each(['ui'])('Button for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/demos',
  })

  describe('signal', () => {
    it('have to match default style', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="button-signal"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match focus state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="button-signal"]',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="button-signal"]',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match active state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="button-signal"]',
        simulate: 'active',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
