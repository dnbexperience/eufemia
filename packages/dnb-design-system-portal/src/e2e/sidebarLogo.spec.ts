import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.addInitScript(() => {
    sessionStorage.setItem(
      'portal-sidebar-menu-open-items-shared',
      JSON.stringify(['about', 'design-foundations'])
    )
    sessionStorage.setItem(
      'portal-sidebar-menu-open-items-platform',
      JSON.stringify(['web-get-started', 'web-components'])
    )
  })
})

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [1440, 1200, 390]) {
    test(`focuses the outer logo ring before and after scrolling at ${width}px in ${colorScheme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/web/components/overview/')
      await waitForApp(page)
      const desktop = width === 1440
      const logo = page
        .locator(desktop ? '#portal-sidebar-menu' : 'header.sticky-menu')
        .getByTitle('Go to Eufemia home')
      const ring = desktop ? logo : logo.locator('..')
      const scrollTo = async (top: number) => {
        await page.evaluate(
          ({ desktop, top }) => {
            if (desktop) {
              document.querySelector(
                '.portal-sidebar-scroll-view'
              ).scrollTop = top
            } else {
              window.scrollTo(0, top)
            }
          },
          { desktop, top }
        )
      }
      await scrollTo(0)
      await logo.focus()
      await logo.press('Shift+Tab')
      await page.keyboard.press('Tab')
      await expect(logo).toBeFocused()

      for (const top of [0, 500]) {
        await scrollTo(top)
        await expect(logo).toHaveCSS('box-shadow', 'none')
        const styles = await ring.evaluate((element) => {
          const background = getComputedStyle(element, '::before')
          const focus = getComputedStyle(element, '::after')
          return {
            backgroundInset: background.inset,
            backgroundRadius: background.borderRadius,
            focusInset: focus.inset,
            focusRadius: focus.borderRadius,
            focusShadow: focus.boxShadow,
          }
        })
        expect(styles.focusInset).toBe(styles.backgroundInset)
        expect(styles.focusRadius).toBe(styles.backgroundRadius)
        expect(styles.focusShadow).not.toBe('none')
      }

      await page.emulateMedia({ forcedColors: 'active' })
      expect(
        await ring.evaluate(
          (element) => getComputedStyle(element, '::after').outlineStyle
        )
      ).toBe('solid')
      await page.keyboard.press('Tab')
      expect(
        await ring.evaluate(
          (element) => getComputedStyle(element, '::after').content
        )
      ).toBe('none')
    })
  }

  test(`keeps the logo stationary with the compact background only while scrolled in ${colorScheme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('/web/components/overview/')
    await waitForApp(page)
    await page.setViewportSize({ width: 1200, height: 900 })
    const compactBackground = await page
      .locator('header span[data-compact="true"]')
      .evaluate((element) => {
        const style = getComputedStyle(element, '::before')
        return {
          border: style.border,
          borderRadius: style.borderRadius,
          backgroundColor: style.backgroundColor,
        }
      })
    await page.setViewportSize({ width: 1440, height: 900 })

    const sidebar = page.locator('#portal-sidebar-menu')
    const view = sidebar.locator('.portal-sidebar-scroll-view')
    const logo = view.getByTitle('Go to Eufemia home')
    const row = logo.locator('..')
    await view.evaluate((element) => {
      element.scrollTop = 0
    })
    const initial = await logo.boundingBox()
    const backgroundStyle = () =>
      logo.evaluate((element) => {
        const style = getComputedStyle(element, '::before')
        return {
          border: style.border,
          borderRadius: style.borderRadius,
          backgroundColor: style.backgroundColor,
          opacity: style.opacity,
        }
      })

    for (const top of [1, 4, 50, 900, 0]) {
      await view.evaluate((element, top) => {
        element.scrollTop = top
      }, top)
      await expect
        .poll(() =>
          logo.evaluate((element) => element.getBoundingClientRect().y)
        )
        .toBe(initial.y)
      await expect.poll(backgroundStyle).toEqual({
        ...compactBackground,
        opacity: top > 0 ? '1' : '0',
      })
      await expect(row).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
      await expect(row).toHaveCSS('border-bottom-width', '0px')
    }

    await view.hover()
    await page.mouse.wheel(0, 900)
    await expect
      .poll(() => view.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(300)
    await logo.click({ trial: true })
    await page.reload()
    await waitForApp(page)
    await expect
      .poll(() => view.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(300)
    await expect(logo).toBeInViewport()
    expect((await logo.boundingBox()).y).toBe(initial.y)
    await expect.poll(backgroundStyle).toEqual({
      ...compactBackground,
      opacity: '1',
    })
  })

  test(`scrolls the platform dropdown underneath the logo in ${colorScheme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('/web/components/overview/')
    await waitForApp(page)
    const sidebar = page.locator('#portal-sidebar-menu')
    const view = sidebar.locator('.portal-sidebar-scroll-view')
    await view.evaluate((element) => {
      const dropdown = element.querySelector('.dnb-dropdown__trigger')
      element.scrollTop += dropdown.getBoundingClientRect().top - 20
    })
    const logo = sidebar.getByTitle('Go to Eufemia home')
    await expect
      .poll(() =>
        logo.evaluate((element) => {
          const box = element.getBoundingClientRect()
          return element.contains(
            document.elementFromPoint(
              box.x + box.width / 2,
              box.y + box.height / 2
            )
          )
        })
      )
      .toBe(true)
  })
}
