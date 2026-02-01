import { test, expect } from '@playwright/test'
import isDev from './shared/isDev'

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

    test('components page should include summary list of components', async ({
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
  })

  test.describe('with JavaScript', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.waitForURL('**/')
      await page.waitForSelector('#eufemia-portal-root', {
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
      await page.waitForSelector('#eufemia-portal-root', {
        state: 'attached',
      })

      const titleAfterClick = await page.title()
      expect(titleAfterClick).toContain('About Eufemia | Eufemia')
    })

    test('click on button page should open /uilib/components/button', async ({
      page,
    }) => {
      await page.goto('/uilib/components/')
      await page.waitForSelector('#eufemia-portal-root', {
        state: 'attached',
      })
      const buttonLink = page.locator(
        '#portal-sidebar-menu a[href="/uilib/components/button/"]'
      )
      await buttonLink.first().waitFor({ state: 'visible' })
      await buttonLink.first().click()
      await page.waitForURL('**/uilib/components/button/')
      await page.waitForSelector('#eufemia-portal-root', {
        state: 'attached',
      })

      const title = await page.title()
      expect(title).toContain('Button | Eufemia')

      const heading = await page.textContent('h1')
      expect(heading).toContain('Button')
    })

    test('click on demos tab should open /uilib/components/button/demos and include tab name in title', async ({
      page,
    }) => {
      await page.goto('/uilib/components/button/')
      await page.waitForSelector('#eufemia-portal-root', {
        state: 'attached',
      })
      const demosLink = page.locator(
        'a[href="/uilib/components/button/demos/"]'
      )
      await demosLink.first().waitFor({ state: 'visible' })
      await demosLink.first().click()
      await page.waitForURL('**/uilib/components/button/demos/')
      await page.waitForSelector('#eufemia-portal-root', {
        state: 'attached',
      })

      const title = await page.title()
      expect(title).toContain('Button → Demos | Eufemia')

      const heading = await page.textContent('h2')
      expect(heading).toContain('Demos')
    })

    test('components page should include summary list of components', async ({
      page,
    }) => {
      await page.goto('/uilib/components/')
      await page.waitForSelector('#eufemia-portal-root', {
        state: 'attached',
      })

      const heading = await page.textContent('h1')
      expect(heading).toContain('Components')

      const accordionLinkText = await page.textContent(
        'a[href="/uilib/components/accordion/"]'
      )
      expect(accordionLinkText).toContain('Accordion')
    })
  })
})
