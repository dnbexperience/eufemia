import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('SidebarMenu documentation tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/extensions/sidebar-menu')
    await waitForApp(page)
  })

  test('navigates to properties and events', async ({ page }) => {
    const properties = page.getByRole('tab', {
      name: 'Properties',
      exact: true,
    })
    await properties.click()

    await expect(page).toHaveURL(
      '/uilib/extensions/sidebar-menu/properties'
    )
    await expect(properties).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Container',
        exact: true,
      })
    ).toBeVisible()

    const events = page.getByRole('tab', {
      name: 'Events',
      exact: true,
    })
    await events.click()

    await expect(page).toHaveURL('/uilib/extensions/sidebar-menu/events')
    await expect(events).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Container Events',
        exact: true,
      })
    ).toBeVisible()
  })

  test('loads properties and events directly', async ({ page }) => {
    await page.goto('/uilib/extensions/sidebar-menu/properties')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Container',
        exact: true,
      })
    ).toBeVisible()

    await page.goto('/uilib/extensions/sidebar-menu/events')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Container Events',
        exact: true,
      })
    ).toBeVisible()
  })
})

test('reopens the selected page accordion after reload', async ({
  page,
}) => {
  await page.goto('/uilib/layout')
  await waitForApp(page)

  const menu = page.getByRole('navigation', {
    name: 'Section Content Menu',
  })
  const layout = menu.getByRole('link', {
    name: 'Layout & spacing',
    exact: true,
  })

  await expect(
    menu.getByRole('button', { name: 'Foundations' })
  ).toHaveAttribute('aria-expanded', 'true')
  await expect(layout).toHaveAttribute('aria-expanded', 'true')
  await expect(layout).not.toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)'
  )
  await expect(layout).not.toHaveCSS('box-shadow', 'none')
  await page.keyboard.press('Tab')
  await layout.focus()
  await expect(layout).toHaveCSS('color', 'rgb(39, 106, 206)')
  await expect(menu.locator('#uilib-layout-content')).toBeVisible()

  await layout.click()
  await expect(layout).toHaveAttribute('aria-expanded', 'false')

  await page.reload()
  await waitForApp(page)

  const reloadedMenu = page.getByRole('navigation', {
    name: 'Section Content Menu',
  })
  await expect(
    reloadedMenu.getByRole('link', {
      name: 'Layout & spacing',
      exact: true,
    })
  ).toHaveAttribute('aria-expanded', 'true')
  await expect(reloadedMenu.locator('#uilib-layout-content')).toBeVisible()
})

test('opens Components on the first click from the Layout page', async ({
  page,
}) => {
  await page.goto('/uilib/layout')

  const menu = page.getByRole('navigation', {
    name: 'Section Content Menu',
  })
  const components = menu.getByRole('button', {
    name: 'Components',
    exact: true,
  })

  await expect(components).toHaveAttribute('aria-expanded', 'false')
  await components.click()

  await expect(components).toHaveAttribute('aria-expanded', 'true')
  await expect(menu.locator('#uilib-components-content')).toBeVisible()
})

test.describe('Portal SidebarMenu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components')
    await waitForApp(page)
  })

  test('shows the requested navigation structure', async ({ page }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })

    await expect(menu.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    )
    await expect(
      menu.getByRole('link', { name: "What's new" })
    ).toHaveAttribute('href', '/uilib/changelog')
    await expect(
      menu.getByRole('button', { name: 'Expand Getting started' })
    ).toHaveCount(0)

    await menu.getByRole('button', { name: 'Foundations' }).click()
    for (const name of [
      'Design tokens',
      'Colors',
      'Typography',
      'Icons',
      'Theming & brands',
      'Layout & spacing',
    ]) {
      await expect(
        menu.getByRole('link', { name, exact: true })
      ).toBeVisible()
    }

    await menu.getByRole('button', { name: 'Guides' }).click()
    for (const name of [
      'Quick intro',
      'Developer guide',
      'Requirements',
      'Designer guide',
      'Accessibility',
      'Best practices',
      'Platform comparison',
    ]) {
      await expect(
        menu.getByRole('link', { name, exact: true })
      ).toBeVisible()
    }

    await menu.getByRole('button', { name: 'Contribute' }).click()
    await expect(menu.locator('a[href="/contribute"]')).toHaveText(
      'Getting started'
    )
    await expect(
      menu.locator('a[href="/contribute/getting-started"]')
    ).toHaveText('Development setup')

    await menu.getByRole('button', { name: 'About Eufemia' }).click()
    await expect(
      menu.locator('a[href="/uilib/about-the-lib"]')
    ).toHaveText('About the library')
  })

  test('keeps the sidebar visible after navigating Home', async ({
    page,
  }) => {
    const menuBeforeNavigation = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    await menuBeforeNavigation.getByRole('link', { name: 'Home' }).click()

    await expect(page).toHaveURL('/')
    await expect(
      page.getByRole('navigation', { name: 'Section Content Menu' })
    ).toBeVisible()
  })

  test('keeps the sidebar visible on the intro', async ({ page }) => {
    await page.goto('/uilib/intro')
    await waitForApp(page)

    await expect(
      page.getByRole('navigation', { name: 'Section Content Menu' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Eufemia Design System' })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Guides' })
    ).toHaveAttribute('aria-expanded', 'true')
  })

  test('omits the platform selector without other platforms', async ({
    page,
  }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })

    await expect(menu.getByRole('combobox')).toHaveCount(0)
    await expect(
      menu.getByRole('button', { name: 'Components', exact: true })
    ).toBeVisible()
  })
})
