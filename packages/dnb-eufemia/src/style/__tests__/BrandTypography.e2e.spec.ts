import { test, expect } from '@playwright/test'
import { compileString } from 'sass'
import path from 'node:path'

const brands = ['ui', 'sbanken', 'carnegie', 'eiendom']

for (const reversed of [false, true]) {
  test.describe(`Brand typography with reversed styles=${reversed}`, () => {
    let css: string

    test.beforeAll(() => {
      const order = reversed ? [...brands].reverse() : brands
      css = compileString(
        `
          @use 'style/dnb-ui-core.scss';
          ${order
            .map(
              (brand) =>
                `@use 'style/themes/${brand}/${brand}-theme-basis.scss';`
            )
            .join('\n')}
        `,
        {
          loadPaths: [path.resolve(__dirname, '../..')],
          logger: { warn() {}, debug() {} },
        }
      ).css
    })

    test.beforeEach(async ({ page }) => {
      await page.setContent(`
        <style>${css}</style>
        <main class="dnb-core-style eufemia-theme eufemia-theme__ui">
          ${brands
            .map(
              (brand) => `
                <section class="eufemia-theme eufemia-theme__${brand}">
                  <h1 class="dnb-h--xx-large">${brand} heading</h1>
                  <p class="dnb-p">${brand} body</p>
                </section>
              `
            )
            .join('')}
        </main>
        <aside class="eufemia-theme eufemia-theme__carnegie">
          <h1 class="dnb-h--xx-large">Portal heading</h1>
        </aside>
      `)
    })

    test('keeps the released heading scale across brands and portals', async ({
      page,
    }) => {
      for (const heading of await page.locator('h1').all()) {
        await expect(heading).toHaveCSS('font-size', '48px')
        await expect(heading).toHaveCSS('line-height', '56px')
      }
      for (const paragraph of await page.locator('p').all()) {
        await expect(paragraph).toHaveCSS('font-size', '18px')
        await expect(paragraph).toHaveCSS('line-height', '24px')
      }
    })

    test('keeps root overrides in nested brands and portals', async ({
      page,
    }) => {
      await page.addStyleTag({
        content: `:root {
          --font-size-xx-large: 2.5rem;
          --line-height-xx-large: 3rem;
          --font-size-basis: 1rem;
          --line-height-basis: 1.25rem;
        }`,
      })
      for (const heading of await page.locator('h1').all()) {
        await expect(heading).toHaveCSS('font-size', '40px')
        await expect(heading).toHaveCSS('line-height', '48px')
      }
      for (const paragraph of await page.locator('p').all()) {
        await expect(paragraph).toHaveCSS('font-size', '16px')
        await expect(paragraph).toHaveCSS('line-height', '20px')
      }
    })
  })
}
