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

  test('shows the requested Web navigation structure', async ({
    page,
  }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })

    await expect(menu.getByRole('combobox')).toHaveAccessibleName(
      'Platform Web'
    )
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

  test('keeps the sidebar visible on Home with mobile navigation in the drawer', async ({
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
    await expect(
      page.locator('#portal-sidebar-menu a[title="Go to Eufemia home"]')
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Resize sidebar' })
    ).toBeVisible()

    await page.goto('/')
    await waitForApp(page)

    const homeLayout = await page.evaluate(() => {
      const home = document.querySelector('[data-portal-home]')
      const content = document.querySelector('.dnb-app-content')
      const homeRect = home.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      return {
        viewportWidth: window.innerWidth,
        contentLeft: contentRect.left,
        contentWidth: contentRect.width,
        homeTop: homeRect.top,
        homeCenter: homeRect.left + homeRect.width / 2,
      }
    })

    expect(homeLayout.contentLeft).toBeGreaterThan(0)
    expect(homeLayout.contentWidth).toBeLessThan(homeLayout.viewportWidth)
    expect(homeLayout.homeTop).toBe(0)
    expect(homeLayout.homeCenter).toBeCloseTo(
      homeLayout.contentLeft + homeLayout.contentWidth / 2,
      0
    )
    await expect(
      page.getByRole('heading', { name: 'Welcome to Eufemia' })
    ).toBeVisible()
    await expect(page.getByRole('link', { name: /Design/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Develop/ })).toBeVisible()
    await expect(
      page.locator('[aria-label="Get started"] .dnb-card')
    ).toHaveCount(2)
    const cardLayout = await page
      .locator('[aria-label="Get started"] .dnb-card-action')
      .evaluateAll((cards) =>
        cards.map((card) => {
          const artwork = card.querySelector(
            '[class*="actionArtworkStyle"]'
          )
          const heading = card.querySelector('h2')
          const paragraph = card.querySelector('p')
          const cardRect = card.getBoundingClientRect()
          const artworkRect = artwork.getBoundingClientRect()
          const headingRect = heading.getBoundingClientRect()
          const paragraphRect = paragraph.getBoundingClientRect()

          return {
            cardHeight: cardRect.height,
            artworkRight: artworkRect.right,
            cardRight: cardRect.right,
            headingLeft: headingRect.left,
            paragraphLeft: paragraphRect.left,
          }
        })
      )
    expect(cardLayout[0].cardHeight).toBe(cardLayout[1].cardHeight)
    for (const card of cardLayout) {
      expect(card.artworkRight).toBeCloseTo(card.cardRight - 24, 0)
      expect(card.headingLeft).toBeCloseTo(card.paragraphLeft, 0)
    }
    await expect(
      page.getByRole('heading', { name: 'Resources' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Highlights' })
    ).toHaveCount(0)
    await expect(page.locator('[data-portal-home]')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)'
    )
    await expect(page.locator('header.sticky-menu')).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
    await expect(page.locator('footer')).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0)'
    )

    const designCard = page.getByRole('link', { name: /Design/ })
    const positionBeforeHover = await designCard.boundingBox()
    await designCard.hover()
    const positionAfterHover = await designCard.boundingBox()
    expect(positionAfterHover.x).toBe(positionBeforeHover.x)
    expect(positionAfterHover.y).toBe(positionBeforeHover.y)

    await page.evaluate(() => {
      const existing = JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
      window.localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ ...existing, colorScheme: 'dark' })
      )
    })
    await page.reload()
    await waitForApp(page)

    await expect(page.locator('[data-portal-home]')).toHaveCSS(
      'background-color',
      'rgb(0, 0, 0)'
    )
    await expect(page.locator('header.sticky-menu')).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
    await expect(page.locator('footer')).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
    await expect(
      page.getByRole('heading', { name: 'Welcome to Eufemia' })
    ).toHaveCSS('color', 'rgb(255, 255, 255)')

    await page.setViewportSize({ width: 375, height: 667 })
    const menuButton = page.getByRole('button', {
      name: 'Open section content menu',
    })
    await expect(menuButton).toBeVisible()
    await menuButton.click()
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

  test('switches between platform menus with a dropdown', async ({
    page,
  }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    const trigger = menu.getByRole('combobox')
    const triggerIcon = trigger.locator(
      '.dnb-sidebar-menu__section-label .dnb-icon'
    )

    await expect(trigger).toHaveCSS('border-radius', '24px')
    await expect(trigger).toHaveCSS('padding', '8px 16px')
    await expect(triggerIcon).toHaveCSS('width', '16px')

    await trigger.click()
    const options = page.getByRole('option')
    await expect(options).toHaveCount(3)
    for (const name of ['Web', 'iOS', 'Android']) {
      await expect(
        page
          .getByRole('option', { name, exact: true })
          .locator('.dnb-sidebar-menu__section-label .dnb-icon')
      ).toHaveCSS('width', '16px')
    }

    await page.getByRole('option', { name: 'iOS', exact: true }).click()
    await expect(page.getByRole('listbox')).toBeHidden()
    await expect(triggerIcon).toHaveCSS('width', '16px')
    await expect(
      menu.getByText('iOS overview', { exact: true })
    ).toBeVisible()
    await expect(
      menu.getByText('Components', { exact: true })
    ).toHaveCount(0)
    await expect(trigger).toHaveAccessibleName('Platform iOS')

    await trigger.click()
    const listbox = page.getByRole('listbox')
    await expect(listbox).toBeVisible()
    await listbox
      .getByRole('option', { name: 'Android', exact: true })
      .click()
    await expect(
      menu.getByText('Android overview', { exact: true })
    ).toBeVisible()
  })
})
