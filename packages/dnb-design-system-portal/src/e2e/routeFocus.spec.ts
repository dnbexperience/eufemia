import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Route Focus', () => {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`should position hash targets without client scripts (${reducedMotion})`, async ({
      page,
    }) => {
      await page.route('**/*.js', (route) => {
        return route.abort()
      })
      await page.addInitScript(() => {
        const positions: number[] = []
        Object.assign(window, { nativeHashPositions: positions })
        window.addEventListener('scroll', () => {
          const target = document.getElementById('responsive-navigation')
          if (target && window.scrollY > 0) {
            positions.push(target.getBoundingClientRect().top)
          }
        })
      })
      await page.emulateMedia({ reducedMotion })

      await page.goto(
        '/uilib/extensions/sidebar-menu/demos/#responsive-navigation'
      )
      await page.waitForFunction(
        () =>
          (window as unknown as { nativeHashPositions: number[] })
            .nativeHashPositions.length > 0
      )

      expect(
        await page.locator('html').getAttribute('data-portal-ready')
      ).toBeNull()
      const positions = await page.evaluate(
        () =>
          (window as unknown as { nativeHashPositions: number[] })
            .nativeHashPositions
      )
      for (const top of positions) {
        expect(top).toBeGreaterThanOrEqual(0)
        expect(top).toBeLessThan(300)
      }
      expect(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior
        )
      ).toBe('auto')
    })
  }

  test('should keep smooth scrolling for links within the current page', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const scrollIntoView = HTMLElement.prototype.scrollIntoView
      HTMLElement.prototype.scrollIntoView = function (options) {
        scrollIntoView.call(this, options)
        if (this.id === 'scss-utilities') {
          Object.assign(window, {
            clickedHashTop: this.getBoundingClientRect().top,
          })
        }
      }
    })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/contribute/getting-started/')
    await waitForApp(page)

    await page
      .getByRole('link', { name: 'SCSS utilities', exact: true })
      .click()
    const target = page.locator('#scss-utilities')

    await expect
      .poll(() =>
        target.evaluate((element) => element.getBoundingClientRect().top)
      )
      .toBeLessThan(300)
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { clickedHashTop: number }).clickedHashTop
      )
    ).toBeGreaterThan(300)
  })

  test('should position hash targets immediately on arrival and refresh', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const positions: { scrollY: number; targetTop: number }[] = []
      Object.assign(window, { hashScrollPositions: positions })
      const scroll = window.scroll.bind(window)
      window.scroll = ((options: ScrollToOptions) => {
        scroll(options)
        if (options?.top > 0) {
          positions.push({
            scrollY: window.scrollY,
            targetTop: document
              .getElementById('relevant-links')
              ?.getBoundingClientRect().top,
          })
        }
      }) as typeof window.scroll

      const scrollIntoView = HTMLElement.prototype.scrollIntoView
      HTMLElement.prototype.scrollIntoView = function (options) {
        scrollIntoView.call(this, options)
        if (this.id === 'relevant-links') {
          positions.push({
            scrollY: window.scrollY,
            targetTop: this.getBoundingClientRect().top,
          })
        }
      }
    })

    await page.goto('/uilib/components/accordion#relevant-links')

    for (let i = 0; i < 3; i++) {
      await waitForApp(page)
      const target = page.locator('#relevant-links')
      await expect
        .poll(() =>
          target.evaluate((element) => element.getBoundingClientRect().top)
        )
        .toBeLessThan(300)

      const finalPosition = await page.evaluate(() => window.scrollY)
      expect(finalPosition).toBeGreaterThan(300)
      const positions = await page.evaluate(
        () =>
          (
            window as unknown as {
              hashScrollPositions: { scrollY: number; targetTop: number }[]
            }
          ).hashScrollPositions
      )
      expect(positions.length).toBeGreaterThan(0)
      for (const position of positions) {
        expect(position.scrollY).toBeGreaterThan(300)
        expect(position.targetTop).toBeGreaterThanOrEqual(0)
        expect(position.targetTop).toBeLessThan(300)
      }

      if (i === 0) {
        await page.reload()
      } else if (i === 1) {
        await page.getByRole('tab', { name: 'Demos' }).click()
        await expect(page).toHaveURL(/accordion.*demos/)
        await expect(
          page.locator('.dnb-app-content h1').first()
        ).toBeFocused()
        await page.goBack({ waitUntil: 'networkidle' })
      }
    }
  })

  test('should keep the next tab stop near the linked section on direct hash load', async ({
    page,
  }) => {
    await page.goto('/uilib/components/accordion#relevant-links')
    await waitForApp(page)

    const figmaLink = page
      .getByRole('tabpanel', { name: 'Info' })
      .getByRole('link', { name: 'Figma', exact: true })
    const headingLink = page.getByRole('link', {
      name: 'Link to Relevant links',
    })
    const skipLink = page.locator('.dnb-skip-link')

    await page.keyboard.press('Tab')

    await expect(headingLink).toBeFocused()
    await expect(skipLink).not.toBeFocused()

    await page.keyboard.press('Tab')

    await expect(figmaLink).toBeFocused()
    await expect(skipLink).not.toBeFocused()
  })

  test('should focus content when no hash is given', async ({ page }) => {
    await page.goto('/uilib/components/accordion')
    await waitForApp(page)

    const skipLink = page.locator('.dnb-skip-link')

    await page.keyboard.press('Tab')

    await expect(skipLink).toBeFocused()
  })

  test('should focus content when navigating to a route without hash', async ({
    page,
  }) => {
    await page.goto('/uilib/components/')
    await waitForApp(page)

    await page
      .locator('a[href="/uilib/components/accordion"]')
      .first()
      .click()

    await expect(page).toHaveURL('/uilib/components/accordion')

    const pageHeading = page.locator('.dnb-app-content h1').first()
    const headingLink = page.getByRole('link', {
      name: 'Link to Accordion',
      exact: true,
    })
    const tabList = page.locator('.dnb-tabs__tabs__tablist')

    await expect(pageHeading).toBeFocused()

    await page.keyboard.press('Tab')

    await expect(headingLink).toBeFocused()

    await page.keyboard.press('Tab')

    await expect
      .poll(() =>
        tabList.evaluate((element) =>
          element.contains(document.activeElement)
        )
      )
      .toBe(true)
  })

  test('should remove the current hash and focus content when navigating to another tab', async ({
    page,
  }) => {
    await page.goto('/uilib/components/accordion#relevant-links')
    await waitForApp(page)

    await page.getByRole('tab', { name: 'Demos' }).click()

    await expect(page).toHaveURL('/uilib/components/accordion/demos')

    const pageHeading = page.locator('.dnb-app-content h1').first()

    await expect(pageHeading).toBeFocused()
  })

  test('should load the demos tab route directly', async ({ page }) => {
    await page.goto('/uilib/components/accordion/demos')
    await waitForApp(page)

    await expect(page).toHaveURL('/uilib/components/accordion/demos/')
    await expect(page.getByRole('tab', { name: 'Demos' })).toBeVisible()
  })

  test('should not focus the selected tab after refreshing a tab route', async ({
    page,
  }) => {
    // Keep both routes in the partial E2E build.
    await page.goto('/uilib/components/list/demos/')
    await waitForApp(page)

    await page.goto('/uilib/components/list/')
    await waitForApp(page)

    const demosTab = page.getByRole('tab', { name: 'Demos' })
    await demosTab.click()
    await expect(page).toHaveURL('/uilib/components/list/demos')

    await page.reload()
    await waitForApp(page)

    await expect(demosTab).not.toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('.dnb-skip-link')).toBeFocused()
  })

  test('should preserve the current hash when entering fullscreen', async ({
    page,
  }) => {
    await page.goto('/uilib/components/accordion#relevant-links')
    await waitForApp(page)

    await page.getByRole('link', { name: 'Fullscreen' }).click()

    await expect(page).toHaveURL(
      '/uilib/components/accordion/?fullscreen#relevant-links'
    )
  })
})
