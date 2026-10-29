import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const javaScriptEnabled of [false, true]) {
  test.describe(
    javaScriptEnabled ? 'hydrated navigation' : 'before hydration',
    () => {
      test.use({
        javaScriptEnabled,
        contextOptions: { reducedMotion: 'reduce' },
      })

      for (const width of [600, 900, 1200, 1500]) {
        test(
          'keeps independent custom breakpoints and RTL at ' +
            width +
            'px',
          async ({ page }) => {
            await page.setViewportSize({ width, height: 900 })
            await page.goto(
              '/uilib/extensions/sidebar-menu/visual-tests/first-paint'
            )
            if (javaScriptEnabled) {
              await waitForApp(page)
              await page.mouse.move(width - 1, 899)
            } else {
              test.skip(
                (await page.title()).includes('Vite Dev'),
                'Requires prerendered output'
              )
            }
            for (const id of [
              'first-paint-ltr',
              'first-paint-rtl',
              'first-paint-wide',
            ]) {
              const fixture = page.locator(
                '[data-visual-test="' + id + '"]'
              )
              const inline = fixture.locator(
                '.dnb-sidebar-menu-responsive-inline'
              )
              const compact =
                width > 640 &&
                width <= (id === 'first-paint-wide' ? 1440 : 1120)
              const trigger = fixture.locator(
                '.dnb-sidebar-menu-responsive-trigger'
              )
              if (width <= 640) {
                await expect(trigger).toBeVisible()
                await expect(inline).not.toBeVisible()
              } else {
                await expect(trigger).not.toBeVisible()
                await expect(inline).toBeVisible()
                if (compact) {
                  await expect(inline).toHaveCSS('width', '64px')
                  const selector = inline.locator('.dnb-dropdown__trigger')
                  await expect(selector).toHaveCSS('width', '44px')
                  await expect(selector).toHaveCSS('height', '44px')
                  await expect(
                    inline.locator('.dnb-sidebar-menu__item__text').first()
                  ).toHaveCSS('opacity', '0')
                  const content = inline.locator(
                    '.dnb-sidebar-menu-responsive-inline__content'
                  )
                  await expect(content).toHaveCSS(
                    'clip-path',
                    id === 'first-paint-rtl'
                      ? 'inset(0px 0px 0px 240px)'
                      : 'inset(0px 240px 0px 0px)'
                  )
                } else {
                  await expect(
                    inline.locator('.dnb-sidebar-menu__item__text').first()
                  ).toHaveCSS('opacity', '1')
                }
              }
            }
          }
        )
      }
    }
  )
}
