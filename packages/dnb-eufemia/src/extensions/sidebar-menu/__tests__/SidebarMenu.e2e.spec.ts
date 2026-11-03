import path from 'node:path'
import * as sass from 'sass'
import { expect, test } from '@playwright/test'

const sourceRoot = path.resolve(__dirname, '../../..')
const compile = (file: string) =>
  sass.compile(path.join(sourceRoot, file)).css

for (const [brand, colorScheme] of [
  ['ui', 'light'],
  ['ui', 'dark'],
  ['sbanken', 'light'],
  ['sbanken', 'dark'],
  ['eiendom', 'light'],
  ['eiendom', 'dark'],
  ['carnegie', 'light'],
]) {
  test(`distinguishes selected and hovered sections in ${brand} ${colorScheme}`, async ({
    page,
  }) => {
    const css = [
      compile(`style/themes/${brand}/foundation.scss`),
      compile(`style/themes/${brand}/tokens.scss`),
      ...(colorScheme === 'dark'
        ? [compile(`style/themes/${brand}/tokens-dark.scss`)]
        : []),
      compile('extensions/sidebar-menu/style/dnb-sidebar-menu.scss'),
    ].join('\n')

    await page.setContent(`<style>${css}</style>
      <div class="eufemia-theme__color-scheme--${colorScheme}">
        <div class="dnb-sidebar-menu__sections-portal">
          <div class="dnb-drawer-list__option dnb-drawer-list__option--selected">
            <div class="dnb-drawer-list__option__inner" id="selected">Personal</div>
          </div>
          <div class="dnb-drawer-list__option">
            <div class="dnb-drawer-list__option__inner" id="hovered">Business</div>
          </div>
        </div>
      </div>`)

    await page.locator('#hovered').hover()
    const background = (selector: string) =>
      page.locator(selector).evaluate((element) => {
        return getComputedStyle(element).backgroundColor
      })

    expect(await background('#selected')).not.toBe(
      await background('#hovered')
    )
  })
}
