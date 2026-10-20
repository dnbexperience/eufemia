import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const scheme of ['light', 'dark'] as const) {
  test(
    'keeps the section icon stationary while compact hover opens and closes in ' +
      scheme,
    async ({ page }) => {
      await page.emulateMedia({
        colorScheme: scheme,
        reducedMotion: 'no-preference',
      })
      await page.setViewportSize({ width: 1200, height: 900 })
      await page.goto('/uilib/extensions/sidebar-menu/demos/')
      await waitForApp(page)
      const shell = page.locator('[data-sidebar-menu-responsive-example]')
      await shell.scrollIntoViewIfNeeded()
      await page.mouse.move(1190, 10)
      const inline = shell.locator('.dnb-sidebar-menu-responsive-inline')
      const trigger = inline.locator(
        '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
      )
      const icon = trigger.locator('.dnb-sidebar-menu__item__icon svg')
      await expect(trigger).toHaveCSS('width', '44px')
      const initial = await icon.boundingBox()
      const measureMovement = () =>
        icon.evaluate(async (element, initial) => {
          const movement = { x: 0, y: 0 }
          const start = performance.now()

          while (performance.now() - start < 400) {
            await new Promise(requestAnimationFrame)
            const position = element.getBoundingClientRect()
            movement.x = Math.max(
              movement.x,
              Math.abs(position.x - initial.x)
            )
            movement.y = Math.max(
              movement.y,
              Math.abs(position.y - initial.y)
            )
          }

          return movement
        }, initial)
      const [opening] = await Promise.all([
        measureMovement(),
        inline.hover({ position: { x: 20, y: 80 } }),
      ])

      expect(opening.x).toBeLessThanOrEqual(0.1)
      expect(opening.y).toBeLessThanOrEqual(0.1)
      await expect(inline).toHaveClass(
        /dnb-sidebar-menu-responsive-inline--expanded/
      )
      const [closing] = await Promise.all([
        measureMovement(),
        page.mouse.move(1190, 10),
      ])

      expect(closing.x).toBeLessThanOrEqual(0.1)
      expect(closing.y).toBeLessThanOrEqual(0.1)
      await expect(trigger).toHaveCSS('width', '44px')
    }
  )

  test(
    'keeps the compact section selector circular and its icon visible in ' +
      scheme,
    async ({ page }) => {
      await page.emulateMedia({
        colorScheme: scheme,
        reducedMotion: 'reduce',
      })
      await page.setViewportSize({ width: 1200, height: 900 })
      await page.goto('/uilib/extensions/sidebar-menu/demos/')
      await waitForApp(page)
      const shell = page.locator('[data-sidebar-menu-responsive-example]')
      const trigger = shell.locator(
        '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
      )
      await page.mouse.move(1190, 890)
      await expect(
        shell.locator('.dnb-sidebar-menu-responsive-inline')
      ).toHaveAttribute('data-sidebar-menu-responsive-compact', 'true')
      const geometry = await trigger.evaluate((element) => {
        const text = element.querySelector('.dnb-dropdown__text')
        const icon = element.querySelector(
          '.dnb-sidebar-menu__item__icon svg'
        )
        const label = element.querySelector(
          '.dnb-sidebar-menu__section-label'
        )
        const iconWrapper = element.querySelector(
          '.dnb-sidebar-menu__item__icon'
        )
        const rect = element.getBoundingClientRect()
        const textRect = text.getBoundingClientRect()
        const iconRect = icon.getBoundingClientRect()
        return {
          width: rect.width,
          height: rect.height,
          clippingLeft: textRect.left - iconRect.left,
          clippingRight: iconRect.right - textRect.right,
          centerOffset: Math.abs(
            iconRect.left + iconRect.width / 2 - rect.left - rect.width / 2
          ),
          labelWidth: label.getBoundingClientRect().width,
          iconWrapperWidth: iconWrapper.getBoundingClientRect().width,
          radius: parseFloat(
            getComputedStyle(element).borderTopLeftRadius
          ),
        }
      })
      expect(geometry.width).toBe(44)
      expect(geometry.height).toBe(44)
      expect(geometry.radius).toBeGreaterThanOrEqual(22)
      expect(geometry.clippingLeft).toBeLessThanOrEqual(0.1)
      expect(geometry.clippingRight).toBeLessThanOrEqual(0.1)
      expect(geometry.centerOffset).toBeLessThanOrEqual(0.1)
      expect(geometry.labelWidth).toBeGreaterThanOrEqual(
        geometry.iconWrapperWidth
      )
      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await expect(trigger).toHaveCSS('height', '44px')
      await expect(trigger).toContainText('Personal')
      await expect(trigger.locator('.dnb-dropdown__icon')).toBeVisible()
      const business = page.getByRole('option', {
        name: 'Business',
        exact: true,
      })
      await business.evaluate(async (element) => {
        await Promise.all(
          element
            .closest('.dnb-drawer-list')
            .getAnimations({ subtree: true })
            .map((animation) => animation.finished.catch(() => undefined))
        )
      })
      await business.click()
      await expect(trigger).toContainText('Business')
      await shell
        .locator('.dnb-sidebar-menu-responsive-inline__toggle')
        .click()
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger.locator('.dnb-dropdown__icon')).toBeVisible()
      await page.mouse.move(1190, 890)
      await expect(trigger).toHaveCSS('width', '44px')
      await expect(trigger).toHaveCSS('height', '44px')

      await page.setViewportSize({ width: 1600, height: 900 })
      await expect(trigger).toHaveCSS('height', '40px')
    }
  )
}

test.describe('compact selector before hydration', () => {
  test.use({
    javaScriptEnabled: false,
    viewport: { width: 1200, height: 900 },
  })

  test('renders a circular selector with a complete icon before JavaScript runs', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/sidebar-menu/demos/')
    test.skip(
      (await page.title()).includes('Vite Dev'),
      'Requires prerendered output'
    )
    const trigger = page.locator(
      '[data-sidebar-menu-responsive-example] .dnb-sidebar-menu__sections .dnb-dropdown__trigger'
    )
    const geometry = await trigger.evaluate((element) => {
      const text = element
        .querySelector('.dnb-dropdown__text')
        .getBoundingClientRect()
      const icon = element
        .querySelector('.dnb-sidebar-menu__item__icon svg')
        .getBoundingClientRect()
      const rect = element.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
        radius: parseFloat(getComputedStyle(element).borderTopLeftRadius),
        left: icon.left - text.left,
        right: text.right - icon.right,
      }
    })
    expect(geometry.width).toBe(44)
    expect(geometry.height).toBe(44)
    expect(geometry.radius).toBeGreaterThanOrEqual(22)
    expect(geometry.left).toBeGreaterThanOrEqual(-0.1)
    expect(geometry.right).toBeGreaterThanOrEqual(-0.1)
  })
})
