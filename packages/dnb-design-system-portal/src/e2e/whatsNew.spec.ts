import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

if (process.env.PLAYWRIGHT_BASE_URL) {
  test.use({ baseURL: process.env.PLAYWRIGHT_BASE_URL })
}

test.describe('Releases and upgrades', () => {
  test('links to the release overview from the sidebar menu', async ({
    page,
  }) => {
    await page.goto('/')
    await waitForApp(page)
    const menu = page.getByRole('navigation', {
      name: 'Platform Content Menu',
    })
    await menu
      .getByRole('link', { name: 'Releases and upgrades', exact: true })
      .click()
    await expect(page).toHaveURL(/\/web\/releases-and-upgrades\/?$/)
    await expect(
      page.getByRole('heading', {
        name: 'Releases and upgrades',
        exact: true,
      })
    ).toBeVisible()
  })

  test('combines releases, change log and upgrade guides in route-based tabs', async ({
    page,
  }) => {
    test.setTimeout(60_000)
    await page.goto('/web/releases-and-upgrades')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', {
        name: 'Releases and upgrades',
        exact: true,
      })
    ).toBeVisible()
    for (const [index, name] of [
      'Change log',
      'Releases',
      'Upgrade',
    ].entries()) {
      await expect(
        page.getByRole('tab', { name, exact: true })
      ).toBeVisible()
      await expect(page.getByRole('tab').nth(index)).toHaveAccessibleName(
        name
      )
    }
    await expect(
      page.getByRole('tab', { name: 'Change log', exact: true })
    ).toHaveAttribute('aria-selected', 'true')
    await expect(
      page
        .getByRole('tabpanel')
        .getByText("See what's new in Eufemia's design system", {
          exact: false,
        })
    ).toBeVisible()
    await page.getByRole('tab', { name: 'Releases', exact: true }).click()
    // Lazy route content can commit after the URL and selected tab update.
    await expect(
      page.getByRole('region', { name: 'Eufemia release history' })
    ).toBeVisible({ timeout: 15_000 })
    await expect(page).toHaveURL('/web/releases-and-upgrades/releases')
    await expect(
      page.getByRole('tab', { name: 'Releases', exact: true })
    ).toHaveAttribute('aria-selected', 'true')
    await expect(
      page
        .getByRole('tabpanel')
        .getByRole('link', { name: 'Upgrade', exact: true })
    ).toHaveAttribute('href', '/web/releases-and-upgrades/upgrade/')
    await page.getByRole('tab', { name: 'Upgrade', exact: true }).click()
    await expect(
      page.locator('main').getByRole('link', { name: 'v11', exact: true })
    ).toBeVisible({ timeout: 15_000 })
    await expect(page).toHaveURL('/web/releases-and-upgrades/upgrade')
    await expect(
      page.locator('main a[href*="form-set-row-deprecation-v11"]')
    ).toHaveCount(0)
    await page
      .locator('main')
      .getByRole('link', { name: 'v11', exact: true })
      .click()
    await expect(page).toHaveURL(
      '/web/releases-and-upgrades/versions/eufemia/v11-info'
    )
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'v11'
    )
    await expect(
      page.locator('.dnb-breadcrumb [aria-current="page"]')
    ).toHaveText('v11')
    await page
      .locator('.dnb-breadcrumb')
      .getByRole('link', { name: 'Upgrade', exact: true })
      .click()
    await expect(page).toHaveURL('/web/releases-and-upgrades/upgrade')
    const sidebar = page.locator('#portal-sidebar-menu')
    await expect(
      sidebar.locator('a[href*="/releases/eufemia/"]')
    ).toHaveCount(0)
    await expect(
      sidebar.locator('a[href*="/releases/dnb-ui-lib/"]')
    ).toHaveCount(0)
  })

  test('lists the pages of the web section in the sidebar on large and small screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/web/releases-and-upgrades')
    await waitForApp(page)
    const sidebar = page.locator('#portal-sidebar-menu')
    const currentPage = sidebar.getByRole('link', {
      name: 'Releases and upgrades',
      exact: true,
    })
    const otherPage = sidebar.getByRole('link', {
      name: /Status indicators$/,
      exact: true,
    })
    await expect(currentPage).toBeVisible()
    await expect(currentPage).toHaveAttribute('aria-current', 'page')
    await sidebar
      .getByRole('button', {
        name: 'Patterns and extensions',
        exact: true,
      })
      .click()
    await expect(otherPage).toBeVisible()

    await page.setViewportSize({ width: 375, height: 667 })
    await expect(sidebar).toBeHidden()
    await page.locator('#toggle-sidebar-menu').click()
    const menu = page.getByRole('dialog', { name: 'Menu', exact: true })
    await expect(
      menu.getByRole('link', {
        name: 'Releases and upgrades',
        exact: true,
      })
    ).toHaveAttribute('aria-current', 'page')
    await expect(
      menu.getByRole('link', { name: /Status indicators$/ })
    ).toBeVisible()
  })

  for (const path of [
    '/web/releases-and-upgrades/releases',
    '/web/releases-and-upgrades/upgrade',
  ]) {
    const tab = path.endsWith('/upgrade') ? 'Upgrade' : 'Releases'
    test(
      'loads ' + path + ' directly and after reload',
      async ({ page }) => {
        await page.goto(path)
        await waitForApp(page)
        await expect(
          page.getByRole('heading', {
            name: 'Releases and upgrades',
            exact: true,
          })
        ).toBeVisible()
        await expect(
          page.getByRole('tab', { name: tab, exact: true })
        ).toHaveAttribute('aria-selected', 'true')
        await page.reload()
        await waitForApp(page)
        await expect(
          page.getByRole('tab', { name: tab, exact: true })
        ).toHaveAttribute('aria-selected', 'true')
      }
    )
  }

  for (const path of [
    '/whats-new',
    '/whats-new/info',
    '/whats-new/change-log',
    '/web/releases-and-upgrades/change-log',
    '/whats-new/upgrade',
  ]) {
    test('redirects ' + path + ' to the web section', async ({ page }) => {
      await page.goto(path)
      const target =
        path.endsWith('/info') || path.endsWith('/change-log')
          ? '/web/releases-and-upgrades'
          : '/web/releases-and-upgrades' + path.slice('/whats-new'.length)
      await expect(page).toHaveURL(new RegExp(target + '/?$'))
      await waitForApp(page)
      await expect(
        page.getByRole('heading', {
          name: 'Releases and upgrades',
          exact: true,
        })
      ).toBeVisible()
    })
  }

  test('keeps the previous page URLs available', async ({ page }) => {
    const headings = {
      '/web/releases-and-upgrades/change-log-history': "What's new",
      '/design-system': 'Change log of Eufemia',
      '/web/releases-and-upgrades/versions': 'Releases and versions',
    }
    for (const path of [
      '/web/releases-and-upgrades/change-log-history',
      '/design-system',
      '/web/releases-and-upgrades/versions',
    ]) {
      await page.goto(path)
      await waitForApp(page)
      await expect(
        page.getByRole('heading', {
          level: 1,
          name: headings[path],
          exact: true,
        })
      ).toBeVisible()
    }
  })

  test('keeps version guides directly accessible without sidebar entries', async ({
    page,
  }) => {
    await page.goto('/web/releases-and-upgrades/versions/eufemia/v11-info')
    await waitForApp(page)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'v11'
    )
    await expect(
      page.locator('#portal-sidebar-menu a[href*="/releases/eufemia/"]')
    ).toHaveCount(0)
  })

  test('includes the FormSet and FormRow migration examples in v11', async ({
    page,
  }) => {
    await page.goto(
      '/uilib/about-the-lib/releases/eufemia/v11-info#removal-of-formrow-and-formset'
    )
    await waitForApp(page)
    await expect(
      page.getByRole('heading', { name: 'Removal of FormRow and FormSet' })
    ).toBeVisible()
    await expect(
      page.locator('main').getByLabel('Label A', { exact: true })
    ).toHaveCount(2)
    await expect(
      page.locator('main').getByLabel('Label B', { exact: true })
    ).toHaveCount(2)
  })

  test('redirects the old FormSet and FormRow guide to v11', async ({
    page,
  }) => {
    await page.goto(
      '/uilib/about-the-lib/releases/eufemia/form-set-row-deprecation-v11#deprecation'
    )
    await expect(page).toHaveURL(
      /\/web\/releases-and-upgrades\/versions\/eufemia\/v11-info\/?(#deprecation)?$/
    )
    await waitForApp(page)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'v11'
    )
  })
})
