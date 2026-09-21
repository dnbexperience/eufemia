import { test, expect } from '@playwright/test'
import type { ConsoleMessage, Page } from '@playwright/test'
import isDev from './shared/isDev'
import waitForApp from './shared/waitForApp'

function captureConsoleErrors(page: Page) {
  const errors: Array<Promise<string[]>> = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(readConsoleMessage(message))
    }
  })

  return async () => (await Promise.all(errors)).flat()
}

async function readConsoleMessage(message: ConsoleMessage) {
  const args = message.args()
  if (args.length === 0) {
    return [message.text()]
  }

  return Promise.all(
    args.map(async (argument) => {
      try {
        return await argument.evaluate((value) =>
          value instanceof Error ? value.message : String(value)
        )
      } catch {
        return message.text()
      }
    })
  )
}

async function markCurrentDocument(page) {
  await page.evaluate(() => {
    ;(
      window as Window & { portalNavigationMarker?: boolean }
    ).portalNavigationMarker = true
  })
}

async function expectCurrentDocument(page) {
  expect(
    await page.evaluate(
      () =>
        (window as Window & { portalNavigationMarker?: boolean })
          .portalNavigationMarker
    )
  ).toBe(true)
}

test('home page hydrates without recoverable errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  await page.goto('/')
  await waitForApp(page)

  expect(errors.filter((message) => message.includes('#418'))).toEqual([])
})

test.describe('Page Navigation', () => {
  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.waitForURL('**/')
    })

    test.skip('noscript element should be visible', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      const noscript = page.locator('noscript')
      await expect(noscript).toHaveCount(1)
      await expect(noscript).toBeAttached()
    })

    test('should not be able to open portal tools', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/')
      await page.click('#portal-tools', { force: true })
      expect(await page.locator('#switch-grid').count()).toBe(0)
    })

    test('should contain page title and heading', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/button/')

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })

    test('should contain button demos page with tab name in title', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/button/demos/')

      const title = await page.title()
      expect(title).toContain('Button → Demos | Eufemia')

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test.skip('components page should include summary list of components', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Components')

      const accordionLinkText = await page.textContent(
        'a[href="/uilib/components/accordion/"]'
      )
      expect(accordionLinkText).toContain('Accordion')
    })

    test('should navigate to a sub-page via link click', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/')

      const href = '/uilib/components/button'
      const link = page.locator(`a[href="${href}"]`).first()
      await link.click()

      await page.waitForURL('**/uilib/components/button/')

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })
  })

  test.describe('with JavaScript', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.waitForURL('**/')
      await waitForApp(page)
    })

    test('uses client-side navigation for the Design card', async ({
      page,
    }) => {
      await markCurrentDocument(page)
      await page.getByRole('link', { name: /Design/ }).click()
      await expect(page).toHaveURL('/quickguide-designer')
      await expectCurrentDocument(page)
    })

    test('uses client-side navigation for the Develop card', async ({
      page,
    }) => {
      await markCurrentDocument(page)
      await page.getByRole('link', { name: /Develop/ }).click()
      await expect(page).toHaveURL('/uilib/getting-started/')
      await expect(
        page.getByRole('heading', { name: 'Getting Started' })
      ).toBeVisible()
      await expectCurrentDocument(page)
    })

    test('prerendered content should stay visible during JS hydration', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }

      // Go directly to a sub-page (full page load, not SPA navigation)
      await page.goto('/uilib/components/button/', {
        waitUntil: 'domcontentloaded',
      })

      // The prerendered <h1> should be visible immediately and never
      // flash away while React mounts.
      const heading = page.locator('h1')
      await expect(heading).toContainText('Button', { timeout: 10000 })

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')
    })

    test('hydrates a Portal page without recoverable errors', async ({
      page,
    }) => {
      const getConsoleErrors = captureConsoleErrors(page)

      await page.goto('/uilib/components/button/')
      await waitForApp(page)

      expect(
        (await getConsoleErrors()).filter((message) =>
          message.includes('#418')
        )
      ).toEqual([])
    })

    test('home page should show the sidebar menu', async ({ page }) => {
      const sidebar = page.getByRole('navigation', {
        name: 'Section Content Menu',
      })

      await expect(
        sidebar.getByRole('link', { name: 'Home' })
      ).toBeVisible()
      await expect(
        sidebar.getByRole('button', { name: 'Foundations' })
      ).toBeVisible()
      await expect(
        page.getByRole('link', { name: 'Suggest an edit' })
      ).toHaveCount(0)
    })

    test('should contain a Suggest an edit link', async ({ page }) => {
      await page.goto('/uilib/components/button/')
      await waitForApp(page)

      const editLink = page.getByRole('link', { name: 'Suggest an edit' })

      await expect(editLink).toHaveAttribute(
        'href',
        '/contribute/suggest-edit/?page=%2Fuilib%2Fcomponents%2Fbutton%2F&source=packages%2Fdnb-design-system-portal%2Fsrc%2Fdocs%2Fuilib%2Fcomponents%2Fbutton%2Finfo.mdx'
      )
    })

    test('click on Design should open the designer guide', async ({
      page,
    }) => {
      const titleBeforeClick = await page.title()
      expect(titleBeforeClick).toContain('DNB Design System | Eufemia')

      await page.getByRole('link', { name: /Design/ }).click()
      await expect(page).toHaveURL('/quickguide-designer')
      await waitForApp(page)
      await expect(
        page.getByRole('heading', { name: 'Quick Guide - Designers' })
      ).toBeVisible()
    })

    test('click on button page should open /uilib/components/button', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto('/uilib/components/')
      await waitForApp(page)

      await page
        .locator(
          '.dnb-sidebar-menu__accordion__toggle[aria-expanded="false"]'
        )
        .evaluateAll((buttons: HTMLButtonElement[]) => {
          buttons.forEach((button) => button.click())
        })

      const href = '/uilib/components/button'
      const buttonLink = page.locator(
        `#portal-sidebar-menu a[href="${href}"]`
      )
      await buttonLink.first().waitFor({ state: 'visible' })
      await buttonLink.first().click()
      await page.waitForURL('**/uilib/components/button**')
      await waitForApp(page)

      await page.waitForFunction(() => document.title.includes('Button'))

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })

    test.skip('click on demos tab should open /uilib/components/button/demos and include tab name in title', async ({
      page,
    }) => {
      // Vite renders all component content on a single page without tabs.

      await page.goto('/uilib/components/button/')
      await waitForApp(page)
      const demosLink = page.locator(
        'a[href="/uilib/components/button/demos/"]'
      )
      await demosLink.first().waitFor({
        state: 'visible',
        timeout: 10000,
      })
      await demosLink.first().click()
      await page.waitForURL('**/uilib/components/button/demos/')
      await waitForApp(page)

      const title = await page.title()
      expect(title).toContain('Button → Demos | Eufemia')

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test.skip('components page should include summary list of components', async ({
      page,
    }) => {
      // Vite does not render component summary links on the listing page.

      await page.goto('/uilib/components/')
      await waitForApp(page)

      const heading = await page.textContent('h1')
      expect(heading).toContain('Components')

      const accordionLinkText = await page.textContent(
        'a[href="/uilib/components/accordion/"]'
      )
      expect(accordionLinkText).toContain('Accordion')
    })
  })
})
