import path from 'node:path'
import * as sass from 'sass'
import { expect, test } from '@playwright/test'

const sourceRoot = path.resolve(__dirname, '../../..')
const compile = (file: string) =>
  sass.compile(path.join(sourceRoot, file)).css

test('navigates visible items with arrow keys while preserving Tab and section selection', async ({
  page,
}) => {
  await page.goto(
    '/uilib/extensions/sidebar-menu/demos/#declarative-composition'
  )
  const menu = page.getByRole('navigation', {
    name: 'Personal and business navigation',
  })
  const overview = menu.getByRole('button', {
    name: 'Overview',
    exact: true,
  })
  const products = menu.getByRole('button', { name: /^Products/ })
  const cards = menu.getByRole('button', { name: 'Cards', exact: true })
  const debit = menu.getByRole('button', {
    name: 'Debit card',
    exact: true,
  })
  const controls = menu.getByRole('button', { name: /^Controls/ })

  await overview.press('ArrowDown')
  await expect(products).toBeFocused()
  await products.press('ArrowDown')
  await expect(
    menu.getByRole('button', { name: 'Accounts', exact: true })
  ).toBeFocused()
  await menu
    .getByRole('button', { name: 'Accounts', exact: true })
    .press('ArrowDown')
  await expect(cards).toBeFocused()
  await expect(debit).toBeHidden()
  await cards.press('ArrowRight')
  await expect(debit).toBeVisible()
  await expect(debit).toBeFocused()
  await debit.press('ArrowLeft')
  await expect(cards).toBeFocused()
  await expect(cards).toHaveAttribute('aria-expanded', 'false')
  await cards.press('ArrowDown')
  await expect(controls).toBeFocused()

  await controls.press('End')
  await controls.press('ArrowDown')
  await expect(controls).toBeFocused()
  await controls.press('Home')
  await expect(overview).toBeFocused()
  await overview.press('ArrowUp')
  await expect(overview).toBeFocused()
  await overview.press('Tab')
  await expect(products).toBeFocused()
  await products.press('c')
  await expect(cards).toBeFocused()
  await cards.press('PageDown')
  await expect(controls).toBeFocused()
  await controls.press('PageUp')
  await expect(overview).toBeFocused()

  const sections = menu.getByRole('combobox')
  await sections.press('ArrowDown')
  await expect(
    page.getByRole('option', { name: /Personal/ })
  ).toBeFocused()
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await sections.getAttribute('id')
  )
  await page.keyboard.press('ArrowDown')
  await expect(
    page.getByRole('option', { name: /Business/ })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(sections).toContainText('Business')
  await expect(page.locator('html')).not.toHaveAttribute(
    'data-dnb-drawer-list-active'
  )
  await sections.press('Tab')
  await expect(overview).toBeFocused()
  await overview.press('ArrowDown')
  await expect(
    menu.getByRole('button', { name: 'Payments', exact: true })
  ).toBeFocused()
})

for (const [brand, colorScheme] of [
  ['ui', 'light'],
  ['ui', 'dark'],
  ['sbanken', 'light'],
  ['sbanken', 'dark'],
  ['eiendom', 'light'],
  ['eiendom', 'dark'],
  ['carnegie', 'light'],
]) {
  const themeCss = () =>
    [
      compile(`style/themes/${brand}/foundation.scss`),
      compile(`style/themes/${brand}/tokens.scss`),
      ...(colorScheme === 'dark'
        ? [compile(`style/themes/${brand}/tokens-dark.scss`)]
        : []),
      compile('extensions/sidebar-menu/style/dnb-sidebar-menu.scss'),
    ].join('\n')

  test(`distinguishes selected and hovered sections in ${brand} ${colorScheme}`, async ({
    page,
  }) => {
    const css = themeCss()

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

  test(`draws the section trigger border in ${brand} ${colorScheme}`, async ({
    page,
  }) => {
    await page.setContent(`<style>${themeCss()}</style>
      <div class="eufemia-theme__color-scheme--${colorScheme}">
        <span class="dnb-sidebar-menu__sections dnb-dropdown">
          <button class="dnb-dropdown__trigger dnb-button--secondary" id="trigger">Personal</button>
        </span>
      </div>`)

    const [border, background] = await page
      .locator('#trigger')
      .evaluate((element) => {
        const style = getComputedStyle(element)
        return [
          style.getPropertyValue('--button-color-border--default'),
          style.getPropertyValue('--button-color-bg--default'),
        ]
      })

    expect(border).not.toBe('')
    expect(border).not.toBe(background)
  })
}
