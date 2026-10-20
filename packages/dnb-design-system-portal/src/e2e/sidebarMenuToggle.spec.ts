import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('SidebarMenu toggle', () => {
  test('remembers desktop dismissal after reload and leaves the mobile Drawer closed', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const embedded = inline.locator('.dnb-sidebar-menu-toggle')
    const external = example.locator('.dnb-sidebar-menu-toggle').last()
    await embedded.click()
    await expect(inline).toHaveCSS('width', '0px')
    await page.reload()
    await waitForApp(page)
    await expect(inline).toHaveCSS('width', '0px')
    await expect(inline).toHaveAttribute('inert', '')
    await expect(external).toHaveAttribute('aria-expanded', 'false')
    await external.click()
    await expect(inline).toHaveCSS('width', '288px')
    await page.reload()
    await waitForApp(page)
    await expect(inline).toHaveCSS('width', '288px')
    await page.setViewportSize({ width: 500, height: 900 })
    await external.click()
    await expect(page.locator('#toggle-example-drawer')).toBeVisible()
    await page.reload()
    await waitForApp(page)
    await expect(page.locator('#toggle-example-drawer')).not.toBeVisible()
    await expect(external).toHaveAttribute('aria-expanded', 'false')
  })

  test('keeps compact expansion separate from desktop dismissal', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const embedded = inline.locator('.dnb-sidebar-menu-toggle')
    const external = example.locator('.dnb-sidebar-menu-toggle').last()
    await expect(inline).toHaveCSS('width', '64px')
    await embedded.focus()
    await embedded.press('Enter')
    await expect(embedded).toHaveAttribute('aria-expanded', 'true')
    await expect(inline).not.toHaveAttribute('inert', '')
    await expect(inline).toHaveCSS('width', '64px')
    await external.focus()
    await external.press('Enter')
    await expect(inline).toHaveCSS('width', '0px')
    await external.click()
    await expect(inline).toHaveCSS('width', '64px')
    await expect(embedded).toHaveAttribute('aria-expanded', 'false')
  })

  test('opens the mobile Drawer and returns focus on dismissal', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const toggle = example.locator('.dnb-sidebar-menu-toggle')
    await expect(toggle).toHaveAttribute('aria-haspopup', 'dialog')
    await toggle.click()
    const drawer = page.locator('#toggle-example-drawer')
    await expect(drawer).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-hidden', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })

  test('animates from the resized width and restores the default width', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)

    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const embedded = inline.locator('.dnb-sidebar-menu-toggle')
    const external = example.locator('.dnb-sidebar-menu-toggle').last()
    const handle = inline.getByRole('separator')
    const defaultWidth = await inline.evaluate(
      (element) => element.getBoundingClientRect().width
    )

    await handle.focus()
    await handle.press('ArrowRight')
    await expect
      .poll(() =>
        inline.evaluate((element) => element.getBoundingClientRect().width)
      )
      .toBe(defaultWidth + 16)
    await embedded.focus()
    await inline.evaluate((element) => {
      element.addEventListener('transitionrun', (event) => {
        if (
          event instanceof TransitionEvent &&
          event.target === element &&
          event.propertyName === 'width'
        ) {
          const widths = element
            .getAnimations()
            .filter(
              (animation) =>
                animation instanceof CSSTransition &&
                animation.transitionProperty === 'width'
            )
            .flatMap((animation) =>
              (animation.effect as KeyframeEffect)
                .getKeyframes()
                .map((frame) => frame.width)
            )
          element.setAttribute(
            'data-test-collapse-widths',
            JSON.stringify(widths)
          )
        }
      })
    })
    await embedded.press('Enter')
    await expect(inline).toHaveAttribute('inert', '')
    const restore = external
    await expect(restore).toBeFocused()
    await expect(inline).toHaveCSS('transition-duration', '0.24s')
    await expect(inline).toHaveAttribute(
      'data-test-collapse-widths',
      JSON.stringify([`${defaultWidth + 16}px`, '0px'])
    )
    await expect(inline).toHaveCSS('width', '0px')
    await restore.click()
    await expect(inline).not.toHaveAttribute('inert', '')
    await expect
      .poll(() =>
        inline.evaluate((element) => element.getBoundingClientRect().width)
      )
      .toBe(defaultWidth)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await external.click()
    expect(
      await inline.evaluate((element) =>
        parseFloat(getComputedStyle(element).transitionDuration)
      )
    ).toBeLessThan(0.001)
    await expect(inline).toHaveCSS('width', '0px')
  })
})
