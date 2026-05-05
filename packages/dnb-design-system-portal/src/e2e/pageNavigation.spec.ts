import { test, expect } from '@playwright/test'
import isDev from './shared/isDev'
import isVite from './shared/isVite'
import waitForApp from './shared/waitForApp'

test.describe('Page Navigation', () => {
  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.waitForURL('**/')
    })

    test('noscript element should be visible', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }
      if (await isVite(page)) {
        return // Vite build does not inject <noscript>
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
      if (await isVite(page)) {
        expect(title).toContain('Button | Eufemia')
      } else {
        expect(title).toContain('Button → Demos | Eufemia')
      }

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test('components page should include summary list of components', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }
      if (await isVite(page)) {
        return // Vite SSR does not include component summary links
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

      // Vite sidebar links omit the trailing slash
      const href = (await isVite(page))
        ? '/uilib/components/button'
        : '/uilib/components/button/'
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

    test('click on first main menu card should open /design-system', async ({
      page,
    }) => {
      const titleBeforeClick = await page.title()
      expect(titleBeforeClick).toContain('DNB Design System | Eufemia')

      await page.click('main nav a')
      await page.waitForURL('**/design-system/')
      await waitForApp(page)

      if (await isVite(page)) {
        // Vite SPA may not update document.title synchronously
        await page.waitForFunction(
          () => !document.title.includes('DNB Design System')
        )
      }

      const titleAfterClick = await page.title()
      expect(titleAfterClick).toContain('About Eufemia | Eufemia')
    })

    test('click on button page should open /uilib/components/button', async ({
      page,
    }) => {
      await page.goto('/uilib/components/')
      await waitForApp(page)

      const vite = await isVite(page)

      if (vite) {
        // In Vite, sidebar items may require expanding first
        const expandButtons = page.locator(
          '.dnb-sidebar-menu__expand-button'
        )
        const count = await expandButtons.count()
        for (let i = 0; i < count; i++) {
          await expandButtons.nth(i).click()
        }
      }

      // Vite links have no trailing slash
      const href = vite
        ? '/uilib/components/button'
        : '/uilib/components/button/'
      const buttonLink = page.locator(
        `#portal-sidebar-menu a[href="${href}"]`
      )
      await buttonLink.first().waitFor({ state: 'visible' })
      await buttonLink.first().click()
      await page.waitForURL('**/uilib/components/button**')
      await waitForApp(page)

      if (vite) {
        // Vite SPA may not update document.title synchronously
        await page.waitForFunction(() => document.title.includes('Button'))
      }

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })

    test('click on demos tab should open /uilib/components/button/demos and include tab name in title', async ({
      page,
    }) => {
      if (await isVite(page)) {
        // Vite renders all component content on a single page without tabs
        return
      }

      await page.goto('/uilib/components/button/')
      await waitForApp(page)
      const demosLink = page.locator(
        'a[href="/uilib/components/button/demos/"]'
      )
      await demosLink.first().waitFor({ state: 'visible', timeout: 10000 })
      await demosLink.first().click()
      await page.waitForURL('**/uilib/components/button/demos/')
      await waitForApp(page)

      const title = await page.title()
      expect(title).toContain('Button → Demos | Eufemia')

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test('components page should include summary list of components', async ({
      page,
    }) => {
      if (await isVite(page)) {
        // Vite does not render component summary links on the listing page
        return
      }

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
