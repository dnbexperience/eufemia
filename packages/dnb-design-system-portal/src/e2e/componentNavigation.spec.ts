import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [1440, 390]) {
  test(
    'lists components alphabetically with specialist groups at ' +
      width +
      'px',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/web/components/avatar')
      await waitForApp(page)
      await expect(
        page.getByRole('heading', { name: 'Avatar', exact: true })
      ).toBeVisible()
      if (width < 960) {
        await page.locator('#toggle-sidebar-menu').click()
      }
      const menu = page.getByRole('navigation', {
        name: 'Platform Content Menu',
      })
      await expect(
        menu.getByRole('link', { name: 'All components A–Z', exact: true })
      ).toHaveCount(0)
      await expect(
        menu.getByRole('link', {
          name: 'Components by category',
          exact: true,
        })
      ).toHaveAttribute('href', '/web/components/overview/')
      const entries = menu.locator('#web-components-content > li')
      const titles = await entries.evaluateAll((items) =>
        items
          .slice(1)
          .map((item) =>
            item
              .querySelector('a, button, .dnb-sidebar-menu__header')
              ?.textContent?.trim()
          )
      )
      const groups = [
        'Graphics',
        'Formatting and typography',
        'Accessibility',
        'Utilities',
        'Fragments',
      ]
      expect(titles.slice(-groups.length)).toEqual(groups)
      const general = titles.slice(0, -groups.length)
      expect(general).toEqual(
        [...general].sort((a, b) => a.localeCompare(b))
      )
      for (const name of [
        'Button',
        'Input',
        'Checkbox',
        'Chip',
        'Radio button',
        'Upload',
        'Date picker',
      ]) {
        await expect(
          menu.getByRole('link', { name, exact: true })
        ).toBeVisible()
      }
      await menu
        .getByRole('link', { name: 'Masked input', exact: true })
        .click()
      await expect(page).toHaveURL('/web/components/input-masked/')
      await expect(
        page.getByRole('heading', { name: 'Masked input', exact: true })
      ).toBeVisible()
      if (width < 960) {
        await expect(
          page.getByRole('dialog', { name: 'Menu', exact: true })
        ).toBeHidden()
        await page.locator('#toggle-sidebar-menu').click()
      }
      await expect(
        menu.getByRole('link', { name: 'Masked input', exact: true })
      ).toHaveAttribute('aria-current', 'page')
      await expect(
        menu.getByRole('button', { name: 'Graphics', exact: true })
      ).toHaveCount(0)
      await expect(
        menu.getByText('Graphics', { exact: true })
      ).toBeVisible()
      await menu
        .getByRole('link', { name: 'Country flags', exact: true })
        .click()
      await expect(page).toHaveURL('/web/components/country-flag/')
      await expect(
        page.getByRole('heading', { name: 'Country flags', exact: true })
      ).toBeVisible()
      await page
        .getByRole('tab', { name: 'Properties', exact: true })
        .click()
      await expect(page).toHaveURL(
        '/web/components/country-flag/properties/'
      )
      await expect(page.locator('.dnb-tab-bar > h1')).toHaveAccessibleName(
        'Country flags'
      )
    }
  )
}

for (const path of [
  '/web/components/?from=bookmark#formatting',
  '/uilib/components/?from=bookmark#formatting',
]) {
  test('redirects the old A–Z page at ' + path, async ({ page }) => {
    await page.goto(path)
    await waitForApp(page)
    await expect(page).toHaveURL(
      '/web/components/overview/?from=bookmark#formatting'
    )
    await expect(
      page.getByRole('heading', {
        name: 'Components by category',
        exact: true,
      })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Formatting and typography',
        exact: true,
      })
    ).toBeVisible()
  })
}

test('uses readable HTML element names and preserves old anchors', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/uilib/elements/horizontal-rule#horizontalrule')
  await waitForApp(page)
  await expect(page).toHaveURL(
    (url) =>
      url.pathname ===
        '/web/layout-and-typography/elements/horizontal-rule/' &&
      url.hash === '#horizontal-rule'
  )
  await expect(
    page.getByRole('heading', { name: 'Horizontal rule', exact: true })
  ).toBeVisible()
  const menu = page.getByRole('navigation', {
    name: 'Platform Content Menu',
  })
  await expect(
    menu.getByRole('link', { name: 'Horizontal rule', exact: true })
  ).toHaveAttribute('aria-current', 'page')
  await menu
    .getByRole('link', { name: 'Lead paragraph', exact: true })
    .click()
  await expect(page).toHaveURL('/web/layout-and-typography/elements/lead/')
  await expect(
    page.getByRole('heading', { name: 'Lead paragraph', exact: true })
  ).toBeVisible()
})

test('preserves a bookmarked component title anchor after renaming', async ({
  page,
}) => {
  await page.goto('/uilib/components/date-picker#datepicker')
  await waitForApp(page)
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === '/web/components/date-picker/' &&
      url.hash === '#date-picker'
  )
  await expect(
    page.getByRole('heading', { name: 'Date picker', exact: true })
  ).toBeVisible()
})

test('opens the Vipps wallet button from Extensions without changing its URL', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/web/components/button')
  await waitForApp(page)
  const menu = page.getByRole('navigation', {
    name: 'Platform Content Menu',
  })
  await menu
    .getByRole('button', { name: 'Patterns and extensions', exact: true })
    .click()
  await menu
    .getByRole('link', { name: 'Vipps wallet button', exact: true })
    .click()
  await expect(page).toHaveURL(
    '/web/patterns-and-extensions/vipps-wallet-button/'
  )
  await expect(
    page.getByRole('heading', { name: 'Vipps wallet button', exact: true })
  ).toBeVisible()
  await expect(
    menu.getByRole('link', { name: 'Vipps wallet button', exact: true })
  ).toHaveAttribute('aria-current', 'page')
})

for (const url of [
  '/web/components/date-picker/properties?from=bookmark#datepicker',
  '/uilib/components/date-picker/properties?from=bookmark#datepicker',
]) {
  test(`preserves the selected tab for ${url}`, async ({ page }) => {
    await page.goto(url)
    await waitForApp(page)
    await expect(page).toHaveURL(
      (url) =>
        url.pathname === '/web/components/date-picker/properties/' &&
        url.search === '?from=bookmark' &&
        url.hash === '#date-picker'
    )
    await expect(
      page.getByRole('tab', { name: 'Properties', exact: true })
    ).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('#date-picker')).toBeVisible()
  })
}
