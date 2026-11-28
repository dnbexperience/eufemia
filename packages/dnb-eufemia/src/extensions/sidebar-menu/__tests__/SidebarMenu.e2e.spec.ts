import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const sourceRoot = path.resolve(__dirname, '../../..')
const compile = (file: string) =>
  sass.compile(path.join(sourceRoot, file)).css

test('wraps labels at spaces and explicit hyphens without automatic hyphenation', async ({
  page,
}) => {
  const css = compile(
    'extensions/sidebar-menu/style/dnb-sidebar-menu.scss'
  )

  await page.setContent(`<style>${css}</style>
    <div lang="en" style="width: 7rem; font: 16px serif">
      <div class="dnb-sidebar-menu__item__text" id="word">internationalization</div>
      <div class="dnb-sidebar-menu__item__text" id="spaces">Incoming payments</div>
      <div class="dnb-sidebar-menu__item__text" id="explicit">inter&shy;national&shy;ization</div>
    </div>`)

  const lineCount = (selector: string) =>
    page.locator(selector).evaluate((element) => {
      const range = document.createRange()
      range.selectNodeContents(element)
      return new Set(
        Array.from(range.getClientRects(), ({ top }) => Math.round(top))
      ).size
    })

  await test.step('keeps an unbroken word together', async () => {
    expect(await lineCount('#word')).toBe(1)
  })

  await test.step('wraps between words', async () => {
    expect(await lineCount('#spaces')).toBeGreaterThan(1)
  })

  await test.step('respects explicit soft hyphens', async () => {
    expect(await lineCount('#explicit')).toBeGreaterThan(1)
  })
})

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus outline must stay visible under the pointer (#11104).
test('keeps the keyboard focus outline when the mouse moves onto the focused item', async ({
  page,
}) => {
  const css = compile(
    'extensions/sidebar-menu/style/dnb-sidebar-menu.scss'
  )

  await page.setContent(`<style>
      :root {
        --token-color-stroke-action-focus: rgb(0, 114, 114);
        --focus-outline-width: 0.1875rem;
      }
      ${css}
    </style>
    <button class="dnb-sidebar-menu__item__action">Item</button>`)

  const setIntent = (whatinput: string, whatintent: string) =>
    page.locator('html').evaluate(
      (element, { whatinput, whatintent }) => {
        element.dataset.whatinput = whatinput
        element.dataset.whatintent = whatintent
      },
      { whatinput, whatintent }
    )
  const item = page.locator('.dnb-sidebar-menu__item__action')

  await page.keyboard.press('Tab')
  await setIntent('keyboard', 'keyboard')
  await expect(item).toBeFocused()
  await expect(item).toHaveCSS('outline-style', 'solid')

  await item.hover()
  await setIntent('keyboard', 'mouse')
  await expect(item).toHaveCSS('outline-style', 'solid')
})

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
  const business = page.getByRole('option', { name: /Business/ })
  await business.hover()
  await page.keyboard.press('ArrowDown')
  await expect(business).toBeFocused()
  expect(
    await business.evaluate((option) => option.matches(':hover'))
  ).toBe(true)
  await expect(business).toHaveCSS('outline-style', 'none')
  await expect(
    business.locator('.dnb-drawer-list__option__inner')
  ).toHaveCSS('outline-style', 'solid')
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

const setIntent = (page: Page, whatinput: string, whatintent: string) =>
  page.locator('html').evaluate(
    (element, { whatinput, whatintent }) => {
      element.dataset.whatinput = whatinput
      element.dataset.whatintent = whatintent
    },
    { whatinput, whatintent }
  )

test.describe('hover and focus after switching input', () => {
  const hoverBackground = 'rgb(248, 248, 248)'
  const handleColor = 'rgb(235, 235, 235)'
  const handleHoverColor = 'rgb(0, 114, 114)'

  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <style>
        :root {
          --token-color-background-neutral-subtle: ${hoverBackground};
          --token-color-stroke-neutral-subtle: ${handleColor};
          --token-color-stroke-action: ${handleHoverColor};
          --token-color-stroke-action-focus: rgb(39, 106, 206);
          --focus-outline-width: 0.1875rem;
        }
        ${compile('extensions/sidebar-menu/style/dnb-sidebar-menu.scss')}
        /* The handle color changes after a delay */
        .dnb-sidebar-menu-resize-handle {
          transition: none !important;
        }
      </style>
      <nav class="dnb-sidebar-menu">
        <ul>
          <li class="dnb-sidebar-menu__item">
            <button class="dnb-sidebar-menu__item__action">Overview</button>
          </li>
        </ul>
      </nav>
      <button class="dnb-sidebar-menu-resize-handle" style="position: relative; width: 1rem; height: 4rem">
        Resize
      </button>
    `)
  })

  // A key press while the mouse rests on an item must not hide where focus is.
  test('shows the focus outline on an item under the mouse', async ({
    page,
  }) => {
    const action = page.locator('.dnb-sidebar-menu__item__action')
    await action.hover()

    await test.step('mouse intent shows the hover background', async () => {
      await setIntent(page, 'mouse', 'mouse')
      await expect(action).toHaveCSS('background-color', hoverBackground)
    })

    await test.step('keyboard focus shows the outline', async () => {
      await action.focus()
      await setIntent(page, 'keyboard', 'keyboard')
      await expect(action).toHaveCSS('outline-style', 'solid')
      await expect(action).toHaveCSS(
        'background-color',
        'rgba(0, 0, 0, 0)'
      )
    })

    await test.step('touch intent shows no hover background', async () => {
      await action.blur()
      await setIntent(page, 'touch', 'touch')
      await expect(action).toHaveCSS(
        'background-color',
        'rgba(0, 0, 0, 0)'
      )
    })
  })

  // Touch browsers keep :hover on the last touched element.
  test('keeps the resize handle at rest after touch', async ({ page }) => {
    const handle = page.locator('.dnb-sidebar-menu-resize-handle')
    await handle.hover()

    await test.step('touch intent shows the resting color', async () => {
      await setIntent(page, 'touch', 'touch')
      await expect(handle).toHaveCSS('color', handleColor)
    })

    await test.step('mouse intent shows the hover color', async () => {
      await setIntent(page, 'mouse', 'mouse')
      await expect(handle).toHaveCSS('color', handleHoverColor)
    })
  })
})
