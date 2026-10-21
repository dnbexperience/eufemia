import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import type { Page } from '@playwright/test'

async function selectPlatform(page: Page, name: string) {
  const option = page.getByRole('option', { name, exact: true })
  await option.waitFor({ state: 'visible' })
  await option.evaluate(async (element) => {
    const list = element.closest('.dnb-drawer-list')
    await Promise.all(
      list
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => undefined))
    )
  })
  await option.click()
}

test.describe('SidebarMenu documentation tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/extensions/sidebar-menu')
    await waitForApp(page)
  })

  test('navigates to properties and events', async ({ page }) => {
    const properties = page.getByRole('tab', {
      name: 'Properties',
      exact: true,
    })
    await properties.click()

    await expect(page).toHaveURL('/web/extensions/sidebar-menu/properties')
    await expect(properties).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Root',
        exact: true,
      })
    ).toBeVisible()

    const events = page.getByRole('tab', {
      name: 'Events',
      exact: true,
    })
    await events.click()

    await expect(page).toHaveURL('/web/extensions/sidebar-menu/events')
    await expect(events).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Root Events',
        exact: true,
      })
    ).toBeVisible()
  })

  test('loads properties and events directly', async ({ page }) => {
    await page.goto('/web/extensions/sidebar-menu/properties')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Root',
        exact: true,
      })
    ).toBeVisible()

    await page.goto('/web/extensions/sidebar-menu/events')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Root Events',
        exact: true,
      })
    ).toBeVisible()
  })
})

test('reopens the selected page accordion after reload', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/web/layout/flex')
  await waitForApp(page)
  const menu = page.getByRole('navigation', {
    name: 'Platform Content Menu',
  })
  const layout = menu.getByRole('button', { name: 'Layout', exact: true })
  await expect(layout).toHaveAttribute('aria-expanded', 'true')
  const flex = menu.getByRole('link', {
    name: 'Using Flex',
    exact: true,
  })
  await expect(flex).toHaveAttribute('aria-current', 'page')
  await flex.click()
  await page.reload()
  await waitForApp(page)
  await expect(layout).toHaveAttribute('aria-expanded', 'true')
  await expect(
    menu.getByRole('button', { name: 'Flex', exact: true })
  ).toHaveAttribute('aria-expanded', 'true')
})

test('opens Components on the first click from the Layout page', async ({
  page,
}) => {
  await page.goto('/web/layout')

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
  await expect(menu.locator('#web-components-content')).toBeVisible()
})

test.describe('Portal SidebarMenu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/web/components')
    await waitForApp(page)
  })

  test('shows the proposed shared and platform navigation', async ({
    page,
  }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    for (const name of [
      'About',
      'Getting started',
      'Design language',
      'Working with AI',
      'Contribute',
    ]) {
      await expect(
        menu.getByRole('button', { name, exact: true })
      ).toBeVisible()
    }
    await menu
      .getByRole('button', { name: 'Design language', exact: true })
      .click()
    for (const name of [
      'Design tokens',
      'Design principles',
      'Motion',
      'Color',
      'Typography',
      'Iconography',
      'Layout & spacing',
      'Accessibility',
      'Brand & logos',
    ]) {
      await expect(
        menu.getByRole(
          ['Design tokens', 'Design principles'].includes(name)
            ? 'link'
            : 'button',
          { name, exact: true }
        )
      ).toBeVisible()
    }
    const platform = page.getByRole('navigation', {
      name: 'Platform Content Menu',
    })
    await platform
      .getByRole('button', { name: 'Get started', exact: true })
      .click()
    await expect(
      platform.getByRole('link', { name: "What's new", exact: true })
    ).toHaveAttribute('href', '/web/whats-new')
    await expect(platform.getByRole('combobox')).toHaveAccessibleName(
      'Platform Web'
    )
    await expect(
      platform.getByRole('button', { name: 'Extensions', exact: true })
    ).toBeVisible()
  })

  test('aligns editorial page headings with their sidebar links', async ({
    page,
  }) => {
    async function expectTitle(title: string) {
      await waitForApp(page)
      await expect(
        page.getByRole('heading', { level: 1 })
      ).toHaveAccessibleName(title)
      const link = page
        .locator('.dnb-sidebar-menu')
        .getByRole('link', { name: title, exact: true })
      await expect(link).toHaveAttribute('aria-current', 'page')
    }
    await page.goto('/web/usage/best-practices/for-testing')
    await expectTitle('Testing frontend code')
    await page.goto('/contribute/first-contribution')
    await expectTitle('Your first contribution')
    await page.goto('/contribute/getting-started')
    await expectTitle('Local development workflow')
    await page.goto('/contribute/deploy')
    await expectTitle('Release process')
    await page.goto('/icons/primary')
    await expectTitle('Primary icons')
    await page.goto('/icons/secondary')
    await expectTitle('Secondary icons')
    await page.goto('/brand')
    await expectTitle('Brand guidelines')
  })

  test('gives getting started pages descriptive names without overview labels', async ({
    page,
  }) => {
    await page.goto('/web/getting-started')
    await waitForApp(page)
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    const quickStart = menu.getByRole('link', {
      name: 'Quick start',
      exact: true,
    })
    await expect(quickStart).toHaveAttribute('aria-current', 'page')
    await expect(quickStart).toHaveAttribute(
      'href',
      '/web/getting-started'
    )
    const design = menu.getByRole('button', {
      name: 'Design',
      exact: true,
    })
    await design.click()
    await expect(
      menu.getByRole('link', { name: 'Start designing', exact: true })
    ).toHaveAttribute('href', '/quickguide-designer')
    await expect(
      menu.locator(
        '[data-sidebar-menu-id=quickguide-designer] .dnb-sidebar-menu__item__icon'
      )
    ).toHaveCount(0)
    await expect(
      menu.getByRole('link', { name: /overview/i })
    ).toHaveCount(0)
  })

  test('combines Installation and First steps with compatible URLs and no nested icons', async ({
    page,
  }) => {
    await page.goto('/web/usage/first-steps')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toHaveAccessibleName('Installation and first steps')
    const platform = page.getByRole('navigation', {
      name: 'Platform Content Menu',
    })
    await expect(
      platform.getByRole('link', { name: 'Installation', exact: true })
    ).toHaveCount(0)
    await expect(
      platform.getByRole('link', {
        name: 'Installation and first steps',
        exact: true,
      })
    ).toHaveAttribute('aria-current', 'page')
    await expect(
      platform.locator(
        '[data-sidebar-menu-id=web-usage-first-steps] .dnb-sidebar-menu__item__icon'
      )
    ).toHaveCount(0)
    await expect(page.locator('main')).toContainText(
      'npm i @dnb/eufemia react react-dom'
    )
    await expect(page.locator('main')).toContainText(
      'Supported Browsers and Platforms'
    )
    await page.goto('/uilib/usage#installation')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toHaveAccessibleName('Installation and first steps')
    for (const path of ['/web/usage', '/uilib/usage']) {
      await page.goto(path + '?from=old#supported-browsers-and-platforms')
      await waitForApp(page)
      await expect(page).toHaveURL(
        (url) =>
          url.pathname.replace(/[/]$/, '') === '/web/usage/first-steps' &&
          url.search === '?from=old' &&
          url.hash === '#supported-browsers-and-platforms'
      )
    }
  })

  test('moves the library overview into existing Web pages and preserves old URLs', async ({
    page,
  }) => {
    for (const path of ['/web/about-the-lib', '/uilib/about-the-lib']) {
      await page.goto(path + '?from=old')
      await waitForApp(page)
      await expect(page).toHaveURL(
        (url) =>
          url.pathname.replace(/[/]$/, '') === '/web/introduction' &&
          url.search === '?from=old'
      )
      await expect(page.locator('main')).toContainText(
        'What the library provides'
      )
      await expect(page.locator('main')).toContainText(
        'Design and development'
      )
    }
    await page.goto('/web/usage')
    await waitForApp(page)
    await page.goto('/uilib/about-the-lib#technical-aspects')
    await waitForApp(page)
    await expect(page).toHaveURL(
      (url) =>
        url.pathname.replace(/[/]$/, '') === '/web/usage/first-steps' &&
        url.hash === '#technical-foundation'
    )
    await expect(page.locator('main')).toContainText(
      'intended for internal DNB development only'
    )
    await expect(page.locator('main')).toContainText(
      'production JavaScript is transpiled'
    )
  })

  test('organizes About pages and preserves the merged page URLs', async ({
    page,
  }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    await menu.getByRole('button', { name: 'About', exact: true }).click()
    const about = menu.locator('[data-sidebar-menu-id="about"]')
    const firstLink = about.getByRole('link').first()
    await expect(firstLink).toHaveText('About Eufemia')
    await expect(
      menu.getByRole('link', { name: 'About the library', exact: true })
    ).toHaveCount(0)
    for (const name of ['About Eufemia', 'Contact']) {
      const link = about.getByRole('link', { name, exact: true })
      await expect(
        link.locator('.dnb-sidebar-menu__item__icon')
      ).toHaveCount(0)
      await expect(
        about.getByRole('button', { name, exact: true })
      ).toHaveCount(0)
    }
    await about
      .getByRole('button', { name: 'Core principles', exact: true })
      .click()
    await expect(
      about.getByRole('link', {
        name: 'Living system overview',
        exact: true,
      })
    ).toHaveCount(0)
    await expect(
      about.getByRole('link', { name: 'Living system', exact: true })
    ).toHaveCount(1)
    const license = about.locator('[data-sidebar-menu-id="license"]')
    await license
      .getByRole('button', { name: 'License & credits', exact: true })
      .click()
    await expect(
      license.getByRole('link', { name: 'Licens', exact: true })
    ).toHaveAttribute('href', '/license')
    const privacy = license.getByRole('link', {
      name: 'Privacy',
      exact: true,
    })
    await expect(
      privacy.locator('.dnb-sidebar-menu__item__icon')
    ).toHaveCount(0)
    await privacy.click()
    await expect(page).toHaveURL('/design-system/privacy')
    await page.goto('/contribute/contact?from=old#developers')
    await waitForApp(page)
    await expect(page).toHaveURL(
      /\/design-system\/contact\/?\?from=old#developers$/
    )
    await expect(page.locator('main')).toContainText('tobias.hoegh@dnb.no')
    for (const name of [
      '#eufemia-web',
      '#eufemia-web-announcements',
      '#eufemia-design',
      '#frontend',
    ]) {
      await expect(
        page.locator('main').getByRole('link', { name, exact: true })
      ).toHaveCount(1)
    }
    await page.goto('/contribute/contact?from=old#slack-channel')
    await waitForApp(page)
    await expect(page).toHaveURL(
      /\/design-system\/contact\/?\?from=old#slack-channel-on-dnb-it$/
    )
    await page.goto(
      '/design-system/about/living-system?from=old#consistency'
    )
    await waitForApp(page)
    await expect(page).toHaveURL(
      /\/web\/about-the-lib\/living-system\/?\?from=old#consistency$/
    )
    await expect(
      page.getByRole('heading', { name: 'Consistency', exact: true })
    ).toBeVisible()
  })

  test('opens Patterns without navigating and selects the status icon page', async ({
    page,
  }) => {
    const platform = page.getByRole('navigation', {
      name: 'Platform Content Menu',
    })
    const patterns = platform.getByRole('button', {
      name: 'Patterns',
      exact: true,
    })
    await patterns.click()
    await expect(page).toHaveURL(/\/web\/components\/?$/)
    await expect(patterns).toHaveAttribute('aria-expanded', 'true')
    await expect(
      platform.getByRole('link', {
        name: 'Patterns overview',
        exact: true,
      })
    ).toHaveCount(0)
    const statusIcon = platform.getByRole('link', {
      name: 'Status icon pattern',
      exact: true,
    })
    await statusIcon.click()
    await expect(page).toHaveURL('/web/patterns/status-icon')
    await expect(statusIcon).toHaveAttribute('aria-current', 'page')
    await expect(
      page.getByRole('heading', {
        name: 'Status icon pattern',
        exact: true,
      })
    ).toBeVisible()
    await page.reload()
    await waitForApp(page)
    await expect(patterns).toHaveAttribute('aria-expanded', 'true')
    await expect(statusIcon).toHaveAttribute('aria-current', 'page')
  })

  test('keeps the moved pages accessible and versions out of the sidebar', async ({
    page,
  }) => {
    await page.goto('/whats-new/upgrade')
    await waitForApp(page)
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    await expect(
      menu.getByRole('link', { name: "What's new", exact: true })
    ).toHaveAttribute('aria-current', 'page')
    await menu
      .getByRole('button', { name: 'Design language', exact: true })
      .click()
    await expect(
      menu.getByRole('link', { name: 'Design tokens', exact: true })
    ).toHaveAttribute(
      'href',
      '/web/usage/customisation/theming/design-tokens'
    )
    await menu
      .getByRole('button', { name: 'Iconography', exact: true })
      .click()
    await expect(
      menu.getByRole('link', { name: 'Icon details', exact: true })
    ).toHaveAttribute('href', '/icons/details')
    await menu
      .getByRole('button', { name: 'Brand & logos', exact: true })
      .click()
    await expect(
      menu.getByRole('button', { name: 'Collections', exact: true })
    ).toHaveAttribute('aria-expanded', 'false')
    await menu
      .getByRole('button', { name: 'Contribute', exact: true })
      .click()
    await menu
      .getByRole('button', { name: 'How to contribute', exact: true })
      .click()
    await expect(
      menu.getByRole('link', { name: 'Reproduce an issue', exact: true })
    ).toHaveAttribute('href', '/issue')
    await expect(
      menu.locator('a[href*="/releases/eufemia/"]')
    ).toHaveCount(0)
    await expect(
      menu.locator('a[href*="/releases/dnb-ui-lib/"]')
    ).toHaveCount(0)
  })

  test('keeps the sidebar visible after navigating Home with shared groups available', async ({
    page,
  }) => {
    await page
      .locator('#portal-sidebar-menu')
      .getByRole('link', { name: 'Go to Eufemia home' })
      .click()

    await expect(page).toHaveURL('/')
    const menuAfterNavigation = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    await expect(menuAfterNavigation).toBeVisible()
    await expect(
      menuAfterNavigation.getByRole('button', {
        name: 'About',
        exact: true,
      })
    ).toBeVisible()
  })

  test('keeps the sidebar visible throughout the intro', async ({
    page,
  }) => {
    await page.goto('/web/intro')
    await waitForApp(page)

    await expect(
      page.getByRole('navigation', { name: 'Section Content Menu' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Developer intro course',
        level: 1,
      })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Get started', exact: true })
    ).toHaveAttribute('aria-expanded', 'true')

    await page
      .getByRole('link', { name: 'Next - Common Design Patterns' })
      .click()
    await expect(page).toHaveURL('/web/intro/02-common-patterns')
    await expect(
      page.getByRole('navigation', { name: 'Section Content Menu' })
    ).toBeVisible()
  })

  test('keeps the exact sidebar scroll position after reload', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/design-system/about')
    await waitForApp(page)

    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    const guides = menu.getByRole('button', {
      name: 'Getting started',
      exact: true,
    })
    await guides.click()
    await expect(guides).toHaveAttribute('aria-expanded', 'true')
    await expect(
      menu.locator(
        '[data-sidebar-menu-id="getting-started"] > .dnb-height-animation'
      )
    ).not.toHaveClass(/dnb-height-animation--animating/)

    const scrollView = page.locator(
      '#portal-sidebar-menu .portal-sidebar-scroll-view'
    )
    const storageKey = await menu.getAttribute(
      'data-scroll-position-storage-key'
    )
    if (!storageKey) {
      throw new Error('SidebarMenu scroll storage key is missing')
    }
    await scrollView.evaluate((element) => {
      element.scrollTop = 89
      element.dispatchEvent(new Event('scroll'))
    })
    await expect
      .poll(() =>
        page.evaluate((key) => sessionStorage.getItem(key), storageKey)
      )
      .toBe('89')

    await page.reload()
    await waitForApp(page)

    const reloadedMenu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    const reloadedGuides = reloadedMenu.getByRole('button', {
      name: 'Getting started',
      exact: true,
    })
    await expect(reloadedGuides).toHaveAttribute('aria-expanded', 'true')
    await expect(
      reloadedMenu.locator(
        '[data-sidebar-menu-id="getting-started"] > .dnb-height-animation'
      )
    ).not.toHaveClass(/dnb-height-animation--animating/)
    await expect
      .poll(() => scrollView.evaluate((element) => element.scrollTop))
      .toBe(89)
  })

  test('switches only the platform tree and keeps shared navigation open', async ({
    page,
  }) => {
    const menu = page.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    const about = menu.getByRole('button', { name: 'About', exact: true })
    await about.click()
    await expect(
      menu.locator('.dnb-height-animation--animating')
    ).toHaveCount(0)
    const platform = page.getByRole('navigation', {
      name: 'Platform Content Menu',
    })
    await platform.getByRole('combobox').click()
    await selectPlatform(page, 'iOS')
    await expect(about).toHaveAttribute('aria-expanded', 'true')
    await expect(
      menu.getByRole('link', { name: 'About Eufemia', exact: true })
    ).toBeVisible()
    await platform
      .getByRole('button', { name: 'Get started', exact: true })
      .click()
    await expect(
      platform.getByRole('button', { name: 'Installation', exact: false })
    ).toBeDisabled()
    await expect(
      platform.getByRole('button', { name: /Liquid Glass/ })
    ).toBeVisible()
    await expect(
      menu.locator('.dnb-height-animation--animating')
    ).toHaveCount(0)
    await platform.getByRole('combobox').click()
    await selectPlatform(page, 'Android')
    await expect(
      platform.getByRole('button', { name: /Liquid Glass/ })
    ).toHaveCount(0)
    await expect(about).toHaveAttribute('aria-expanded', 'true')
    await menu
      .getByRole('link', { name: 'About Eufemia', exact: true })
      .click()
    await expect(page).toHaveURL('/design-system/about')
    await expect(
      menu.getByRole('link', { name: 'About Eufemia', exact: true })
    ).toHaveAttribute('aria-current', 'page')
    await expect(platform.getByRole('combobox')).toHaveAccessibleName(
      'Platform Android'
    )
    await page.reload()
    await waitForApp(page)
    await expect(platform.getByRole('combobox')).toHaveAccessibleName(
      'Platform Android'
    )
    await page.goto('/web/components/button')
    await waitForApp(page)
    await expect(platform.getByRole('combobox')).toHaveAccessibleName(
      'Platform Web'
    )
  })

  test('switches platforms inside the mobile Drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/design-system/about')
    await waitForApp(page)
    await page.locator('#toggle-sidebar-menu').click()
    const drawer = page.locator('.dnb-sidebar-menu-responsive-drawer')
    await expect(drawer).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
    await expect(
      drawer.locator('.dnb-height-animation--animating')
    ).toHaveCount(0)
    const shared = drawer.getByRole('navigation', {
      name: 'Section Content Menu',
    })
    const platform = drawer.getByRole('navigation', {
      name: 'Platform Content Menu',
    })
    await platform.getByRole('combobox').click()
    await selectPlatform(page, 'iOS')
    await platform
      .getByRole('button', { name: 'Get started', exact: true })
      .click()
    await expect(
      platform.getByRole('button', { name: /Installation/ })
    ).toBeDisabled()
    await expect(
      shared.getByRole('link', { name: 'About Eufemia', exact: true })
    ).toBeVisible()
    await drawer.locator('.dnb-modal__close-button').click()
    await expect(drawer).toHaveCount(0)
    await page.locator('#toggle-sidebar-menu').click()
    await expect(platform.getByRole('combobox')).toHaveAccessibleName(
      'Platform iOS'
    )
  })

  test('keeps Drawer scroll position across repeated opens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/web/extensions/sidebar-menu/demos/')
    await waitForApp(page)

    const trigger = page.locator('#toggle-sidebar-menu')
    const drawer = page.locator('.dnb-sidebar-menu-responsive-drawer')
    const expectedScrollTop = 120
    const positions: number[] = []

    for (let index = 0; index < 4; index += 1) {
      await trigger.click()
      await drawer.waitFor({ state: 'visible' })
      await expect(drawer).toHaveCSS(
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)'
      )
      await expect(
        drawer.locator('.dnb-height-animation--animating')
      ).toHaveCount(0)
      if (index === 0) {
        await drawer.evaluate((element, scrollTop) => {
          element.scrollTo({ top: scrollTop, behavior: 'instant' })
          element.dispatchEvent(new Event('scroll'))
        }, expectedScrollTop)
      }
      await expect
        .poll(() => drawer.evaluate((el) => el.scrollTop), {
          message: 'Drawer position on open ' + index,
        })
        .toBe(expectedScrollTop)
      positions.push(await drawer.evaluate((el) => el.scrollTop))
      await drawer.locator('.dnb-modal__close-button').click()
      await expect(drawer).toHaveCount(0)
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    }

    expect(new Set(positions).size).toBe(1)
  })
})
