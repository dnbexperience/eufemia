import { test, expect } from '@playwright/test'
import path from 'node:path'
import { compileString } from 'sass'
import postcss from 'postcss'
import isolatedStyleScope from '../../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin'

const scope = 'eufemia-scope--sticky-navigation-test'
let css: string

test.beforeAll(async () => {
  const compiled = compileString(
    `@use '../../section/style/dnb-section.scss';
     @use '../../drawer/style/dnb-drawer.scss';
     @use '../../dialog/style/dnb-dialog.scss';`,
    { loadPaths: [__dirname] }
  )
  const result = await postcss([
    isolatedStyleScope({ scopeHash: scope }),
  ]).process(compiled.css, {
    from: path.resolve(__dirname, 'sticky-navigation.scss'),
  })
  css = result.css
})

for (const component of ['drawer', 'dialog']) {
  for (const legacyOrder of ['before', 'after']) {
    test(`${component} keeps the sticky shadow at the toolbar edge with legacy CSS loaded ${legacyOrder}`, async ({
      page,
    }) => {
      const legacyCss = `
        .dnb-${component} .dnb-${component}__navigation--sticky::before {
          height: 300%;
        }
      `

      await page.setContent(`
        <style>${legacyOrder === 'before' ? legacyCss + css : css + legacyCss}</style>
        <div class="${scope}" style="--shadow-default: 0 8px 16px rgba(51, 51, 51, 0.08); --shadow-default-x: 0; --shadow-default-y: 8px; --shadow-default-color: rgba(51, 51, 51, 0.08)">
          <div class="dnb-${component} dnb-${component}--spacing"
            style="height: 200px; overflow: auto; animation: none; opacity: 1; transform: none">
            <section class="dnb-section dnb-${component}__navigation dnb-${component}__navigation--sticky"
              style="height: 40px; margin: 0">
              Close
            </section>
            <div style="height: 600px">Content</div>
          </div>
        </div>
      `)

      const navigation = page.locator(`.dnb-${component}__navigation`)

      for (const scrollTop of [0, 100]) {
        await page
          .locator(`.dnb-${component}`)
          .evaluate((element, top) => {
            element.scrollTop = top
          }, scrollTop)
        await expect(page.locator(`.dnb-${component}`)).toHaveJSProperty(
          'scrollTop',
          scrollTop
        )

        const geometry = await navigation.evaluate((element) => {
          const shadow = getComputedStyle(element, '::before')
          return {
            toolbarHeight: element.getBoundingClientRect().height,
            shadowHeight: parseFloat(shadow.height),
            shadowBottom: shadow.bottom,
            shadow: shadow.boxShadow,
          }
        })

        expect(geometry.shadowHeight).toBe(geometry.toolbarHeight)
        expect(geometry.shadowBottom).toBe('0px')
        expect(geometry.shadow).not.toBe('none')
      }
    })
  }
}
