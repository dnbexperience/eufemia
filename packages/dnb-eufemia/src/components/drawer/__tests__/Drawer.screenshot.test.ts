import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Drawer', () => {
  describe('large', () => {
    setupPageScreenshot({
      url: '/web/components/drawer/demos/',
    })

    it('have to match default drawer trigger with title', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
      })
    })

    it('have to match default drawer trigger', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
      })
    })

    it('have to match customized drawer trigger', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="drawer-custom-trigger"]',
      })
    })
  })

  describe('open', () => {
    const pageViewport = {
      width: 700,
      height: 600,
    }

    setupPageScreenshot({
      url: '/web/components/drawer/demos/',
      pageViewport,
    })

    it('have to match simple drawer window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="simple-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match fullscreen drawer', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="fullscreen-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="fullscreen-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match left placement drawer', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="left-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="left-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match full drawer window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="full-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match callback drawer window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="callback-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="callback-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match no-animation drawer window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="drawer-no-animation"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-no-animation"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match correct scroll view setup', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="drawer-scroll-view"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-scroll-view"] button:first-of-type',
        screenshotSelector: '.drawer-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('have to match large content drawer scrolled', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="large-content-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="large-content-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: ['hide-page-content'],
      })
    })

    it('have to apply sticky header when header content changes', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="update-navigation-header-example"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="update-navigation-header-example"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: ['hide-page-content'],
      })
    })
  })

  describe('small', () => {
    setupPageScreenshot({
      url: '/web/components/drawer/demos/',
      pageViewport: {
        width: 640,
        height: 800,
      },
    })

    it('have to match top placement drawer', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="top-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="top-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: 'hide-page-content',
      })
    })

    it('have to match bottom placement drawer', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="bottom-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="bottom-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: 'hide-page-content',
      })
    })
  })

  describe('reveal', () => {
    setupPageScreenshot({
      url: '/web/components/drawer/demos/',
      pageViewport: { width: 640, height: 800 },
    })

    it('shows the page shadow over the revealed menu', async () => {
      await makeScreenshot({
        selector: '#drawer-reveal-page',
        withWrapper: false,
        simulate: 'click',
        simulateSelector: '#drawer-reveal-page button',
        screenshotSelector: '.dnb-drawer__reveal',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it('shows the page edge with the Hr color in dark mode', async () => {
      await makeScreenshot({
        selector: '#drawer-reveal-page',
        withWrapper: false,
        colorScheme: 'dark',
        simulate: 'click',
        simulateSelector: '#drawer-reveal-page button',
        screenshotSelector: '.dnb-drawer__reveal',
        simulateAfter: { keypress: 'Escape' },
      })
    })

    it.each(['light', 'dark'] as const)(
      'extends the page edge beyond the viewport in %s mode',
      async (colorScheme) => {
        await makeScreenshot({
          selector: '#drawer-reveal-page',
          withWrapper: false,
          colorScheme,
          executeBeforeSimulate: async () => {
            const target = document.querySelector('#drawer-reveal-page')
            target.parentElement.setAttribute(
              'data-reveal-edge-preview',
              ''
            )
            target.querySelector<HTMLButtonElement>('button').click()

            await new Promise<void>((resolve) => {
              function exposeBrowserBars() {
                const dialog = document.querySelector<HTMLElement>(
                  '.dnb-drawer__reveal'
                )
                if (!dialog?.style.height) {
                  requestAnimationFrame(exposeBrowserBars)
                  return
                }

                // Expose the area above and below the modal's layout viewport.
                const style = document.createElement('style')
                style.textContent = `.dnb-drawer__reveal {
                  margin-top: 3rem;
                  height: calc(100% - 6rem) !important;
                }`
                dialog.appendChild(style)
                resolve()
              }
              requestAnimationFrame(exposeBrowserBars)
            })
          },
          screenshotSelector: '[data-reveal-edge-preview]',
          simulateAfter: { keypress: 'Escape' },
        })
      }
    )
  })

  describe('reveal header', () => {
    setupPageScreenshot({
      url: '/web/components/drawer/demos/',
      pageViewport: { width: 640, height: 800 },
    })

    it.each(['light', 'dark'] as const)(
      'fades the scrolled menu beneath the header in %s mode',
      async (colorScheme) => {
        await makeScreenshot({
          selector: '#drawer-reveal-page',
          withWrapper: false,
          colorScheme,
          executeBeforeSimulate: async () => {
            document
              .querySelector<HTMLButtonElement>(
                '#drawer-reveal-page button'
              )
              .click()

            await new Promise<void>((resolve) => {
              function scrollMenu() {
                const scroll = document.querySelector<HTMLElement>(
                  '.dnb-drawer__reveal-scroll'
                )
                if (!scroll) {
                  requestAnimationFrame(scrollMenu)
                  return
                }

                scroll.parentElement.style.height = '12rem'
                requestAnimationFrame(() => {
                  // Scroll text behind the header, including the top of the menu.
                  scroll.scrollTo({
                    top: scroll.scrollHeight,
                    behavior: 'instant',
                  })
                  resolve()
                })
              }
              requestAnimationFrame(scrollMenu)
            })
          },
          screenshotSelector: '.dnb-drawer__reveal .dnb-drawer',
          simulateAfter: { keypress: 'Escape' },
        })
      }
    )
  })
})
