import { test, expect } from '@playwright/test'
import { compileString } from 'sass'
import path from 'node:path'

for (const theme of ['ui', 'sbanken', 'carnegie', 'eiendom']) {
  test.describe(`Scrollbar colors for ${theme}`, () => {
    let css: string

    test.beforeAll(() => {
      css = compileString(
        `
          @use 'style/themes/${theme}/${theme}-theme-basis.scss';
          ${['ui', 'sbanken'].includes(theme) ? `@use 'style/themes/${theme}/${theme}-theme-dark-mode.scss';` : ''}
          @use 'components/scroll-view/style/dnb-scroll-view.scss';
        `,
        {
          loadPaths: [path.resolve(__dirname, '../..')],
          logger: { warn() {}, debug() {} },
        }
      ).css
    })

    for (const colorScheme of ['ui', 'sbanken'].includes(theme)
      ? ['light', 'dark']
      : ['light']) {
      test(`uses neutral colors in ${colorScheme} mode and preserves overrides`, async ({
        page,
      }) => {
        await page.setContent(`
          <style>${css}</style>
          <main class="eufemia-theme eufemia-theme__${theme} eufemia-theme__color-scheme--${colorScheme}">
            <div class="dnb-scroll-view" style="height: 100px; width: 200px">
              <div style="height: 400px">Scrollable content</div>
            </div>
          </main>
        `)
        const scrollView = page.locator('.dnb-scroll-view')
        const colors = await scrollView.evaluate((element) => {
          const resolveColor = (property: string) => {
            const probe = document.createElement('span')
            probe.style.color = `var(${property})`
            element.appendChild(probe)
            const color = getComputedStyle(probe).color
            probe.remove()
            return color
          }

          return {
            thumb: resolveColor('--token-color-text-neutral-alternative'),
            hover: resolveColor('--scrollbar-thumb-hover-color'),
            neutral: resolveColor('--token-color-text-neutral'),
          }
        })

        await expect(scrollView).toHaveCSS(
          'scrollbar-color',
          `${colors.thumb} rgba(0, 0, 0, 0)`
        )
        expect(colors.hover).toBe(colors.neutral)

        await scrollView.evaluate((element: HTMLElement) => {
          element.style.setProperty('--scrollbar-thumb-color', '#123456')
          element.scrollTop = element.scrollHeight
        })
        await expect(scrollView).toHaveCSS(
          'scrollbar-color',
          'rgb(18, 52, 86) rgba(0, 0, 0, 0)'
        )
        await expect
          .poll(() => scrollView.evaluate((element) => element.scrollTop))
          .toBeGreaterThan(0)
      })
    }
  })
}
