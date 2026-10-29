import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [1440, 390]) {
  test(
    'uses the proposed component structure at ' + width + 'px',
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
      const initialUrl = page.url()
      await expect(
        menu.getByRole('link', { name: 'All components A–Z', exact: true })
      ).toHaveAttribute('href', '/web/components')
      await expect(
        menu.getByRole('link', {
          name: 'Components by category',
          exact: true,
        })
      ).toHaveAttribute('href', '/web/components/overview')
      for (const name of [
        'General',
        'Formatting and typography',
        'Accessibility',
        'Utilities',
      ]) {
        await expect(
          menu.getByRole('list', { name, exact: true })
        ).toBeVisible()
      }
      const buttons = menu.getByRole('button', {
        name: 'Buttons',
        exact: true,
      })
      await buttons.click()
      await expect(page).toHaveURL(initialUrl)
      for (const name of ['Button', 'Help button', 'Toggle button']) {
        await expect(
          menu.getByRole('link', { name, exact: true })
        ).toBeVisible()
      }
      const inputs = menu.getByRole('button', {
        name: 'Inputs',
        exact: true,
      })
      await inputs.press('Enter')
      await expect(page).toHaveURL(initialUrl)
      await expect(
        menu.getByRole('link', { name: 'Input', exact: true })
      ).toBeVisible()
      await menu
        .getByRole('link', { name: 'Masked input', exact: true })
        .click()
      await expect(page).toHaveURL('/web/components/input-masked')
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
      await menu
        .getByRole('link', { name: 'Country flags', exact: true })
        .click()
      await expect(page).toHaveURL('/web/components/country-flag')
      await expect(
        page.getByRole('heading', { name: 'Country flags', exact: true })
      ).toBeVisible()
      await page
        .getByRole('tab', { name: 'Properties', exact: true })
        .click()
      await expect(page).toHaveURL(
        '/web/components/country-flag/properties'
      )
      await expect(page.locator('.dnb-tab-bar > h1')).toHaveAccessibleName(
        'Country flags'
      )
    }
  )
}

test('uses readable HTML element names and preserves old anchors', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/uilib/elements/horizontal-rule#horizontalrule')
  await waitForApp(page)
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === '/web/elements/horizontal-rule/' &&
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
  await expect(page).toHaveURL('/web/elements/lead')
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
    .getByRole('button', { name: 'Extensions', exact: true })
    .click()
  await menu
    .getByRole('link', { name: 'Vipps wallet button', exact: true })
    .click()
  await expect(page).toHaveURL('/web/extensions/vipps-wallet-button')
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
