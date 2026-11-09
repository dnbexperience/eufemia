import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/components/search/demos/?fullscreen')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await expect(
    page.locator('[data-visual-test="search-compact"] input')
  ).toBeVisible()
})

for (const fixture of [
  'search-compact',
  'search-autocomplete-compact',
  'search-panel',
]) {
  test(`${fixture} expands with the shortcut and collapses after clearing`, async ({
    page,
  }) => {
    const search = page.locator(
      `[data-visual-test="${fixture}"] .dnb-search`
    )
    const input = search.locator('input')
    const collapsed = (await search.boundingBox()).width
    await page
      .locator(
        `[data-visual-test]:not([data-visual-test="${fixture}"]) .dnb-search--shortcut`
      )
      .evaluateAll((elements) => {
        elements.forEach((element) => element.setAttribute('hidden', ''))
      })
    await page.keyboard.press('Control+k')
    await expect(input).toBeFocused()
    await expect
      .poll(async () => (await search.boundingBox()).width)
      .toBeGreaterThan(collapsed)
    await input.fill('Button')
    await expect(search.locator('kbd')).toBeHidden()
    await page.locator('h1').click()
    await expect(input).toHaveValue('Button')
    await expect
      .poll(async () => (await search.boundingBox()).width)
      .toBeGreaterThan(collapsed)
    await search.locator('.dnb-input__clear-button').click()
    await expect(input).toHaveValue('')
    await page.locator('h1').click()
    await expect
      .poll(async () => (await search.boundingBox()).width)
      .toBeCloseTo(collapsed, 0)
  })
}

test('supports native keyboard result selection and Escape', async ({
  page,
}) => {
  const input = page.locator(
    '[data-visual-test="search-autocomplete"] input'
  )
  await input.fill('But')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  await input.press('Enter')
  await expect(input).toHaveValue('But')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await input.fill('Inp')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await input.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
})

test('keeps both input types within a narrow container', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 })
  for (const fixture of [
    'search-hero',
    'search-compact',
    'search-autocomplete-hero',
    'search-autocomplete-compact',
  ]) {
    const search = page.locator(
      `[data-visual-test="${fixture}"] .dnb-search`
    )
    const input = search.locator('input')
    await input.focus()
    await input.fill('A long search query')
    const box = await search.boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(320)
    await expect(search.locator('kbd')).toBeHidden()
    await search.locator('.dnb-input__clear-button').click()
    await expect(input).toHaveValue('')
  }
})

test('panel keeps the keyboard focus outline inside the results viewport', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  await input.focus()
  await expect(results).toBeVisible()
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  const focusRing = await results
    .locator('.dnb-drawer-list__option--focus')
    .evaluate((option) => {
      const bounds = option.getBoundingClientRect()
      const clip = option.parentElement.getBoundingClientRect()
      const shadow = getComputedStyle(option).boxShadow
      const spread = Number.parseFloat(shadow.match(/[\d.]+px/g)[3])
      return {
        spread,
        left: bounds.left - clip.left,
        right: clip.right - bounds.right,
      }
    })
  expect(focusRing.spread).toBeGreaterThan(0)
  expect(focusRing.left).toBeGreaterThanOrEqual(focusRing.spread)
  expect(focusRing.right).toBeGreaterThanOrEqual(focusRing.spread)
})

test('panel restores results and keyboard navigation after clearing the query', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const options = page
    .getByRole('listbox', { name: 'Search with filters' })
    .getByRole('option')

  await input.fill('But')
  await expect(options).toHaveCount(2)
  await expect(options.first()).toHaveText('Button')
  await fixture.locator('.dnb-input__clear-button').click()

  await expect(input).toHaveValue('')
  await expect(input).toBeFocused()
  await expect(options).toHaveText([
    'Input',
    'Button',
    'Table',
    'Accessibility',
    'Getting started',
  ])
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    await options.first().getAttribute('id')
  )
  await input.press('Enter')
  await expect(fixture).toContainText('Selected: Input')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
})

test('panel supports results, toggle filters, sorting, and natural keyboard focus', async ({
  page,
  browserName,
}) => {
  // Safari uses Option+Tab to include native buttons in keyboard navigation.
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
  const reverseTab =
    browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'
  const fixture = page.locator('[data-visual-test="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const results = page.getByRole('listbox', {
    name: 'Search with filters',
  })
  await input.focus()
  await expect(results).toBeVisible()
  await expect(fixture.locator('input')).toHaveCount(1)
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  await input.press('Enter')
  await expect(
    fixture.getByText('Selected: Input', { exact: true })
  ).toBeVisible()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await input.click()
  await expect(results).toBeVisible()
  const sort = page.getByRole('button', { name: /^Sort results:/ })
  await input.press(tab)
  await expect(sort).toBeFocused()
  await page.keyboard.press(reverseTab)
  await expect(input).toBeFocused()
  await page.keyboard.press(tab)
  await page.keyboard.press(tab)
  await expect(
    page.getByRole('button', { name: 'All', exact: true })
  ).toBeFocused()
  await page.keyboard.press(tab)
  await page.keyboard.press('Space')
  await expect(
    page.getByRole('button', { name: 'Components', exact: true })
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(results.getByRole('option')).toHaveCount(3)
  await sort.click()
  await expect(sort).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.getByRole('menu', { name: 'Sort results' })
  ).toBeFocused()
  await expect(
    page.getByRole('menuitem', { name: 'Alphabetical', exact: true })
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(sort).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(sort).toBeFocused()
  await expect(
    page.getByRole('menuitem', { name: 'Alphabetical', exact: true })
  ).toBeHidden()
  await sort.click()
  await expect(sort).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.getByRole('menu', { name: 'Sort results' })
  ).toBeFocused()
  await page.keyboard.press('End')
  await expect(
    page.getByRole('menuitem', { name: 'Alphabetical', exact: true })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(sort).toContainText('Alphabetical')
  await expect(sort).toBeFocused()
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(results.getByRole('option').first()).toHaveText('Button')
  await input.focus()
  await input.fill('zzzz')
  await expect(results).toContainText('Ingen alternativer')
  await input.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
  await input.fill('')
  await input.click()
  await page.getByRole('button', { name: 'Lukk', exact: true }).focus()
  await page.keyboard.press(tab)
  await expect(input).not.toBeFocused()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
})

test('panel sorting menu stays above results and supports pointer selection', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const fixture = page.locator('[data-visual-test="search-panel"]')
  await fixture
    .getByRole('combobox', { name: 'Search with filters' })
    .focus()
  const sort = page.getByRole('button', { name: /^Sort results:/ })
  await sort.click()
  const alphabetical = page.getByRole('menuitem', {
    name: 'Alphabetical',
    exact: true,
  })
  await expect
    .poll(() =>
      sort.evaluate((button) => {
        const icon = button
          .querySelector('.dnb-button__icon')
          .getBoundingClientRect()
        const arrow = document
          .getElementById(button.getAttribute('aria-controls'))
          .closest('.dnb-menu')
          .querySelector('.dnb-popover__arrow')
          .getBoundingClientRect()
        return Math.abs(
          icon.x + icon.width / 2 - (arrow.x + arrow.width / 2)
        )
      })
    )
    .toBeLessThan(1)
  await alphabetical.click()
  await expect(sort).toContainText('Alphabetical')
  await expect(
    page
      .getByRole('listbox', { name: 'Search with filters' })
      .getByRole('option')
      .first()
  ).toHaveText('Accessibility')
})

test('panel closes from controls and preserves outside interaction focus', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const close = page.getByRole('button', {
    name: 'Lukk',
    exact: true,
  })

  await input.focus()
  await close.focus()
  await close.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()

  await input.click()
  await close.click()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()

  await input.click()
  const outsideInput = page.locator(
    '[data-visual-test="search-default"] input'
  )
  await outsideInput.click()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(outsideInput).toBeFocused()
})

test('keeps the panel within the viewport near either edge', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="search-panel"]')
  const input = fixture.getByRole('combobox', {
    name: 'Search with filters',
  })
  const popover = page.locator('.dnb-search__panel')

  for (const width of [1000, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const side of ['left', 'right']) {
      await test.step(`${width}px, ${side} edge`, async () => {
        await fixture.evaluate((element, side) => {
          element.setAttribute(
            'style',
            `position: fixed; top: 100px; ${side}: 16px; width: 288px; z-index: 100;`
          )
        }, side)
        await input.focus()
        await expect(popover).toBeVisible()
        await expect
          .poll(async () => {
            const box = await popover.boundingBox()
            return box.x >= 15 && box.x + box.width <= width - 15
          })
          .toBe(true)
        await input.press('Escape')
        await expect(popover).toBeHidden()
        await input.blur()
      })
    }
  }
})

test('aligns the portaled surface with the input', async ({ page }) => {
  const fixture = page.locator(
    '[data-visual-test="search-panel-alignment"]'
  )
  const input = fixture.getByRole('combobox', {
    name: 'Search alignment example',
  })
  const popover = page.locator('.dnb-search__panel')
  await fixture.evaluate((element) => {
    element.style.cssText =
      'position: fixed; top: 100px; left: 400px; width: 400px;'
  })
  for (const align of ['Left', 'Center', 'Right']) {
    await fixture.getByRole('button', { name: align, exact: true }).click()
    await input.focus()
    await expect(popover).toBeVisible()
    await expect
      .poll(async () => {
        const target = await input.boundingBox()
        const surface = await popover.boundingBox()
        const factor = align === 'Left' ? 0 : align === 'Right' ? 1 : 0.5
        return Math.abs(
          surface.x +
            surface.width * factor -
            target.x -
            target.width * factor
        )
      })
      .toBeLessThan(1)
    await expect
      .poll(async () => {
        const target = await input.boundingBox()
        const surface = await popover.boundingBox()
        return Math.abs(surface.y - target.y - target.height - 24)
      })
      .toBeLessThan(1)
    await input.press('Escape')
  }
})

test('keeps search results above the Portal sidebar', async ({ page }) => {
  await page.goto('/web/components/search/demos/#results-alignment')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const fixture = page.locator(
    '[data-visual-test="search-panel-alignment"]'
  )
  const input = fixture.getByRole('combobox', {
    name: 'Search alignment example',
  })
  for (const width of [1280, 900]) {
    await test.step(width + 'px sidebar', async () => {
      await page.setViewportSize({ width, height: 900 })
      await fixture
        .getByRole('button', { name: 'Right', exact: true })
        .click()
      await input.focus()
      const results = page.getByRole('listbox', {
        name: 'Search alignment example',
      })
      await expect(results).toBeVisible()
      await expect
        .poll(() =>
          results.getByRole('option').evaluateAll((options) =>
            options.every((option) => {
              const box = option.getBoundingClientRect()
              return option.contains(
                document.elementFromPoint(
                  box.x + 5,
                  box.y + box.height / 2
                )
              )
            })
          )
        )
        .toBe(true)
      await input.press('Escape')
      await input.blur()
    })
  }
})
