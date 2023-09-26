import { test, expect } from '@playwright/test'
import isDev from './shared/isDev'

test.describe('Page Navigation', () => {
  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false })

    test.beforeEach(async ({ page, browser }) => {
      await page.goto('/')
      await page.waitForURL('**/')
    })

    test('noscript element should be visible', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await expect(page.locator('noscript').first()).toHaveCSS(
        'display',
        'block',
      )
    })

    test('should not be able to open portal tools', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib')
      await page.click('#portal-tools')
      expect(await page.locator('#switch-grid').count()).toBe(0)
    })

    test('should contain page title and heading', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/button')

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })

    test('should contain button demos page', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components/button/demos')

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test('components page should include summary list of components', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/uilib/components')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Components')

      const accordionLinkText = await page.textContent(
        'a[href="/uilib/components/accordion/"]',
      )
      expect(accordionLinkText).toContain('Accordion')
    })
  })

  test.describe('with JavaScript', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.waitForURL('**/')
      await page.waitForSelector('#dnb-drawer-list__portal', {
        state: 'attached',
      })
    })

    test('click on first main menu card should open /design-system', async ({
      page,
    }) => {
      const titleBeforeClick = await page.title()
      expect(titleBeforeClick).toContain('DNB Design System | Eufemia')

      await page.click('main nav a')
      await page.waitForURL('**/design-system/')
      await page.waitForSelector('#dnb-drawer-list__portal', {
        state: 'attached',
      })

      const titleAfterClick = await page.title()
      expect(titleAfterClick).toContain('About Eufemia | Eufemia')
    })

    test('click on button page should open /uilib/components/button', async ({
      page,
    }) => {
      const element = (await page.locator('main nav a').all()).at(1)
      await element?.click()
      await page.click('nav a[href="/uilib/components/button/"]')
      await page.waitForURL('**/uilib/components/button/')
      await page.waitForSelector('#dnb-drawer-list__portal', {
        state: 'attached',
      })

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })

    test('click on demos tab should open /uilib/components/button/demos', async ({
      page,
    }) => {
      const element = (await page.locator('main nav a').all()).at(1)
      await element?.click()
      await page.click('nav a[href="/uilib/components/button/"]')
      await page.click('main a[href="/uilib/components/button/demos/"]')
      await page.waitForURL('**/uilib/components/button/demos/')
      await page.waitForSelector('#dnb-drawer-list__portal', {
        state: 'attached',
      })

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test('components page should include summary list of components', async ({
      page,
    }) => {
      const element = (await page.locator('main nav a').all()).at(1)
      await element?.click()
      await page.click('nav a[href="/uilib/components/"]')
      await page.waitForURL('**/uilib/components/')
      await page.waitForSelector('#dnb-drawer-list__portal', {
        state: 'attached',
      })

      const heading = await page.textContent('h1')
      expect(heading).toContain('Components')

      const accordionLinkText = await page.textContent(
        'a[href="/uilib/components/accordion/"]',
      )
      expect(accordionLinkText).toContain('Accordion')
    })
  })
})
