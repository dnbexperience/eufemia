import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

if (process.env.PLAYWRIGHT_BASE_URL) {
  test.use({ baseURL: process.env.PLAYWRIGHT_BASE_URL })
}

test.describe("What's new", () => {
  test('links to the release overview from the main menu', async ({
    page,
  }) => {
    await page.goto('/')
    await waitForApp(page)
    await page.locator('main nav a[href="/web/whats-new/"]').click()
    await expect(page).toHaveURL(/\/web\/whats-new\/?$/)
    await expect(
      page.getByRole('heading', { name: "What's new", exact: true })
    ).toBeVisible()
  })

  test('combines releases, change log and upgrade guides in route-based tabs', async ({
    page,
  }) => {
    await page.goto('/web/whats-new')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', { name: "What's new", exact: true })
    ).toBeVisible()
    for (const name of ['Releases', 'Change log', 'Upgrade']) {
      await expect(
        page.getByRole('tab', { name, exact: true })
      ).toBeVisible()
    }
    await expect(
      page.getByRole('tab', { name: 'Releases', exact: true })
    ).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('region', { name: 'Eufemia release history' })
    ).toBeVisible()
    await page
      .getByRole('tab', { name: 'Change log', exact: true })
      .click()
    await expect(page).toHaveURL('/web/whats-new/change-log')
    await expect(
      page.getByRole('tab', { name: 'Change log', exact: true })
    ).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('main')).toContainText('New component:')
    await expect(
      page
        .locator('main')
        .getByRole('link', { name: 'details about releases' })
        .first()
    ).toHaveAttribute('href', '/web/whats-new/upgrade')
    await page.getByRole('tab', { name: 'Upgrade', exact: true }).click()
    await expect(page).toHaveURL('/web/whats-new/upgrade')
    await expect(
      page.locator('main a[href*="form-set-row-deprecation-v11"]')
    ).toHaveCount(0)
    await expect(
      page.locator('main').getByRole('link', { name: 'v11', exact: true })
    ).toBeVisible()
    await page
      .locator('main')
      .getByRole('link', { name: 'v11', exact: true })
      .click()
    await expect(page).toHaveURL(
      '/web/about-the-lib/releases/eufemia/v11-info'
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
    await expect(page).toHaveURL('/web/whats-new/upgrade')
    const sidebar = page.locator('#portal-sidebar-menu')
    await expect(
      sidebar.locator('a[href*="/releases/eufemia/"]')
    ).toHaveCount(0)
    await expect(
      sidebar.locator('a[href*="/releases/dnb-ui-lib/"]')
    ).toHaveCount(0)
  })

  for (const path of [
    '/web/whats-new/change-log',
    '/web/whats-new/upgrade',
  ]) {
    const tab = path.endsWith('/upgrade') ? 'Upgrade' : 'Change log'
    test(
      'loads ' + path + ' directly and after reload',
      async ({ page }) => {
        await page.goto(path)
        await waitForApp(page)
        await expect(
          page.getByRole('heading', { name: "What's new", exact: true })
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
    '/whats-new/upgrade',
  ]) {
    test('redirects ' + path + ' to the web section', async ({ page }) => {
      await page.goto(path)
      const target =
        path === '/whats-new/info' ? '/web/whats-new' : '/web' + path
      await expect(page).toHaveURL(new RegExp(target + '/?$'))
      await waitForApp(page)
      await expect(
        page.getByRole('heading', { name: "What's new", exact: true })
      ).toBeVisible()
    })
  }

  test('keeps the previous page URLs available', async ({ page }) => {
    const headings = {
      '/uilib/changelog': "What's new",
      '/design-system': 'Change log of Eufemia',
      '/uilib/about-the-lib/releases': 'Releases and versions',
    }
    for (const path of [
      '/web/changelog',
      '/design-system',
      '/web/about-the-lib/releases',
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
    await page.goto('/web/about-the-lib/releases/eufemia/v11-info')
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
      /\/uilib\/about-the-lib\/releases\/eufemia\/v11-info\/?(#deprecation)?$/
    )
    await waitForApp(page)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'v11'
    )
  })
})
